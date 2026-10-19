import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
import { gsap } from "gsap";

const compile = (path, module = ts.ModuleKind.ES2022) => ts.transpileModule(
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8"),
  { compilerOptions: { module, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } },
).outputText;
const loaderSource = compile("src/utils/pageLoader.ts").replace(/^export /gm, "");
const tick = async () => {
  for (let i = 0; i < 16; i++) await new Promise(setImmediate);
};

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

function environment() {
  const requests = [];
  const embedTimers = new Set();
  const deadlineTimers = new Set();
  class Image extends EventTarget {
    #src = "";
    srcset = "";
    complete = false;
    naturalWidth = 0;
    loading = "lazy";
    crossOrigin = null;
    decodeCalls = 0;
    constructor(src) {
      super();
      if (src) this.src = src;
      else requests.push(this);
    }
    get src() { return this.#src; }
    set src(value) {
      if (value === this.#src) return;
      this.#src = value;
      this.complete = false;
      this.naturalWidth = 0;
    }
    decode() {
      this.decodeCalls++;
      return this.complete && this.naturalWidth > 0
        ? Promise.resolve()
        : Promise.reject(new Error("Image not ready"));
    }
    finish(success = true) {
      this.complete = true;
      this.naturalWidth = success ? 100 : 0;
      const event = new Event(success ? "load" : "error");
      this.dispatchEvent(event);
      if (success) this.onload?.(event);
      else this.onerror?.(event);
    }
  }
  class SvgImage extends EventTarget {
    holdNative = false;
    constructor(src) {
      super();
      this.href = { baseVal: src };
      const properties = new Map();
      this.style = {
        getPropertyValue: (name) => properties.get(name)?.value || "",
        getPropertyPriority: (name) => properties.get(name)?.priority || "",
        setProperty: (name, value, priority = "") => {
          properties.set(name, { value, priority });
          if (name === "opacity" && value === "1" && !this.holdNative)
            setImmediate(() => this.finish());
        },
        removeProperty: (name) => properties.delete(name),
      };
    }
    getAttribute() { return null; }
    finish(success = true) {
      const type = success ? "load" : "error";
      const capture = new Event(type);
      Object.defineProperty(capture, "target", { value: this });
      context.document.dispatchEvent(capture);
      this.dispatchEvent(new Event(type));
    }
  }
  class Video extends EventTarget {
    static HAVE_CURRENT_DATA = 2;
    readyState = 0;
    src = "animation.webm";
    currentSrc = "";
    poster = "";
    autoplay = true;
    preload = "none";
    error = null;
  }
  class Frame extends EventTarget {
    dataset = { pageEmbedReady: "false" };
    hasAttribute(name) { return name === "data-page-embed-ready"; }
    finish() {
      this.dataset.pageEmbedReady = "true";
      this.dispatchEvent(new Event("wiki-embed-ready"));
    }
  }
  const loader = Object.assign(new EventTarget(), {
    hidden: false,
    dataset: {},
    classList: (() => {
      const values = new Set(["is-playing"]);
      return {
        contains: (value) => values.has(value),
        add: (...items) => items.forEach((value) => values.add(value)),
        remove: (...items) => items.forEach((value) => values.delete(value)),
      };
    })(),
    getAnimations: () => [],
    contains: (element) => Boolean(element.insideLoader),
  });
  let elements = [];
  let portals = [];
  let hints = [];
  let styles = [];
  const nativeSvgProbes = [];
  const nativeSvgLayers = [];
  let holdNativeProbes = false;
  const loaderEvents = [];
  for (const name of ["loaderready", "loadererror", "loaderstatus"]) {
    loader.addEventListener(name, () => loaderEvents.push(name));
  }
  const context = vm.createContext({
    document: Object.assign(new EventTarget(), {
      body: { querySelector: () => null, querySelectorAll: () => [...elements, ...portals], append() {} },
      createElementNS: (_namespace, name) => {
        if (name === "svg") {
          const svg = { style: {}, removed: false, setAttribute() {}, append() {}, remove() { this.removed = true; } };
          nativeSvgLayers.push(svg);
          return svg;
        }
        const probe = new SvgImage("");
        probe.holdNative = holdNativeProbes;
        probe.setAttribute = (attribute, value) => {
          if (attribute !== "href") return;
          probe.href.baseVal = value;
          if (!probe.holdNative) setImmediate(() => probe.finish());
        };
        nativeSvgProbes.push(probe);
        return probe;
      },
      getElementById: (id) => id === "page-loader" ? loader : { querySelectorAll: () => elements },
      querySelectorAll: (selector) => selector.includes('as="image"') ? hints : styles,
      fonts: { ready: Promise.resolve() },
    }),
    window: {
      setTimeout: (fn, ms) => {
        if (ms === 12000) { embedTimers.add(fn); return fn; }
        if (ms > 12000) { deadlineTimers.add(fn); return fn; }
        return setImmediate(fn);
      },
      clearTimeout: (id) => {
        if (typeof id === "function") { embedTimers.delete(id); deadlineTimers.delete(id); }
        else clearImmediate(id);
      },
      matchMedia: () => ({ matches: true }),
    },
    requestAnimationFrame: (fn) => setImmediate(fn),
    getComputedStyle: (element, pseudo) => ({
      backgroundImage: "none", maskImage: "none", borderImageSource: "none",
      listStyleImage: "none", content: "normal", ...element.styles?.[pseudo ?? "base"],
    }),
    AbortController, Event, Promise, Image,
    HTMLImageElement: Image, SVGImageElement: SvgImage,
    HTMLVideoElement: Video, HTMLMediaElement: Video,
    HTMLIFrameElement: Frame,
  });
  vm.runInContext(loaderSource, context);
  return {
    context, loader, requests, Image, SvgImage, Video, Frame, embedTimers, deadlineTimers, loaderEvents, nativeSvgProbes, nativeSvgLayers,
    holdNativeProbes: () => { holdNativeProbes = true; },
    expireEmbeds: () => [...embedTimers].forEach((fn) => fn()),
    expireDeadline: () => [...deadlineTimers].forEach((fn) => fn()),
    page: (nextElements, nextHints = []) => { elements = nextElements; hints = nextHints; },
    portals: (nextPortals) => { portals = nextPortals; },
    styles: (nextStyles) => { styles = nextStyles; },
    fonts: (ready) => { context.document.fonts.ready = ready; },
    ready: () => context.hidePageLoaderWhenReady(),
  };
}

function rnaMorphEnvironment() {
  const env = environment();
  const frames = new Map();
  let frameId = 0;
  let samples = 0;
  let prepared = 0;
  const element = () => ({
    style: {}, dataset: {}, clientWidth: 10,
    append() {}, setAttribute() {}, remove() {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 10, height: 10 }),
    getContext() {
      return {
        drawImage() {}, putImageData() {}, clearRect() {},
        createImageData: (width, height) => ({ data: new Uint8ClampedArray(width * height * 4) }),
        getImageData: (_x, _y, width, height) => {
          samples++;
          return { data: new Uint8ClampedArray(width * height * 4).fill(255) };
        },
      };
    },
  });
  const target = Object.assign(new env.Image("fan.webp"), element(), {
    getAttribute: () => "lazy", removeAttribute() {}, naturalHeight: 1,
  });
  target.finish();
  target.naturalWidth = 1;
  const source = Object.assign(element(), {
    querySelector: () => ({ href: { baseVal: "ring.webp" } }),
  });
  const module = { exports: {} };
  const context = vm.createContext({
    module, exports: module.exports, Image: env.Image, Uint8ClampedArray,
    document: { createElement: element },
    window: { devicePixelRatio: 1 },
    ResizeObserver: class { observe() {} disconnect() {} },
    requestAnimationFrame: (fn) => { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: (id) => { frames.delete(id); },
    require: (name) => {
      if (name === "gsap") return { default: {
        parseEase: gsap.parseEase,
        utils: { clamp: (low, high) => (value) => Math.max(low, Math.min(high, value)) },
        getProperty: (_target, name) => name.startsWith("scale") ? 1 : 0,
      } };
      if (name === "gsap/ScrollTrigger") return { ScrollTrigger: {
        addEventListener() {}, removeEventListener() {},
      } };
      if (name === "../utils/pageLoader") return { trackPagePreparation: env.context.trackPagePreparation };
      if (name === "./homeMotion") {
        const dependency = { exports: {} };
        vm.runInNewContext(compile("src/hooks/homeMotion.ts", ts.ModuleKind.CommonJS), {
          module: dependency, exports: dependency.exports,
          require: () => ({ ScrollTrigger: {} }),
        });
        return dependency.exports;
      }
      throw new Error(`Unexpected RNA morph dependency: ${name}`);
    },
  });
  vm.runInContext(compile("src/hooks/createRnaRingMorph.ts", ts.ModuleKind.CommonJS), context);
  const morph = module.exports.createRnaRingMorph(element(), source, target, true, () => { prepared++; });
  const image = env.requests.find((request) => request.src === "ring.webp");
  return {
    ...env, morph, image, samples: () => samples, prepared: () => prepared,
    flushMorphFrames: () => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((fn) => fn());
    },
  };
}

function galleryMagnifierEnvironment() {
  const env = environment();
  env.holdNativeProbes();
  const module = { exports: {} };
  let paintedImage;
  const context = vm.createContext({
    module, exports: module.exports,
    document: {
      createElementNS: (namespace, name) => {
        const element = env.context.document.createElementNS(namespace, name);
        if (name === "svg") {
          element.classList = { add() {} };
          element.append = (image) => { paintedImage = image; };
        }
        return element;
      },
    },
  });
  vm.runInContext(compile("src/hooks/createThinkingGalleryInk.ts", ts.ModuleKind.CommonJS), context);
  module.exports.createThinkingGalleryMagnifier({
    src: "thinking-4.webp",
    currentSrc: "thinking-4-decoded.webp",
  });
  env.page([paintedImage]);
  return { ...env, paintedImage };
}

function inlineLoaderEnvironment() {
  const env = environment();
  const status = { textContent: "" };
  const wait = { hidden: true };
  const retry = Object.assign(new EventTarget(), { hidden: true });
  env.loader.classList.remove("is-playing");
  env.loader.querySelectorAll = () => [];
  env.loader.querySelector = (selector) => ({
    "[data-loader-status]": status,
    "[data-loader-wait]": wait,
    "[data-loader-retry]": retry,
    image: { getAttribute: () => "loader-ribbon.webp" },
  })[selector];
  let now = 0;
  let nextTimer = 0;
  let reloads = 0;
  const timers = new Map();
  const schedule = (fn, ms) => {
    const id = ++nextTimer;
    timers.set(id, { fn, due: now + ms });
    return id;
  };
  const unschedule = (id) => timers.delete(id);
  const browser = Object.assign(new EventTarget(), {
    setTimeout: schedule,
    clearTimeout: unschedule,
    location: { reload: () => { reloads++; } },
  });
  Object.assign(env.context, {
    window: browser,
    setTimeout: schedule,
    clearTimeout: unschedule,
    performance: { now: () => now },
    CSSAnimation: class {},
    requestAnimationFrame: (fn) => schedule(() => fn(now), 16),
    cancelAnimationFrame: unschedule,
  });
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const body = html.slice(html.indexOf("<body>"));
  const inlineScripts = [...body.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.equal(inlineScripts.length, 1, "execute the actual static loader script");
  vm.runInContext(inlineScripts[0][1], env.context);
  return {
    ...env, status, wait, retry, browser, timers,
    reloads: () => reloads,
    advance: async (ms) => {
      const until = now + ms;
      await tick();
      for (;;) {
        const next = [...timers].sort((a, b) => a[1].due - b[1].due)[0];
        if (!next || next[1].due > until) break;
        timers.delete(next[0]);
        now = next[1].due;
        next[1].fn();
        await tick();
      }
      now = until;
      await tick();
    },
  };
}

test("loader covers a cold page until hidden navigation, all body images and hero art are ready", async () => {
  const env = environment();
  const icon = new env.Image("nav-hardware.webp");
  const figure = new env.Image("hardware-fig6.webp");
  const hero = { styles: { "::before": { backgroundImage: 'url("hardware-hero.webp")' } } };
  env.page([icon, figure, hero]);
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(icon.loading, "eager");
  icon.finish();
  figure.finish();
  await tick();
  assert.equal(env.loader.hidden, false, "slow hero keeps the loading cover up");
  env.requests.find((image) => image.src === "hardware-hero.webp").finish();
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("image decode rejecting before loading cannot dismiss the cover", async () => {
  const env = environment();
  const image = new env.Image("slow-offscreen.webp");
  env.page([image]);
  env.ready();
  await tick();
  assert.equal(image.decodeCalls, 0);
  assert.equal(env.loader.hidden, false);
  image.finish();
  await tick();
  assert.equal(image.decodeCalls, 1);
  assert.equal(env.loader.hidden, true);
});

test("closed dialogs, SVG art and pseudo-element masks are ready before the intro is released", async () => {
  const env = environment();
  env.page([
    new env.SvgImage("home-ring.webp"),
    { styles: { "::after": { maskImage: 'url("home-mask.webp")' }, base: { maskImage: "url(#local-mask)" } } },
  ], [{ href: "interview-dialog.webp", crossOrigin: null }]);
  let introReleased = false;
  void env.context.whenPageLoaderLeaves().then(() => { introReleased = true; });
  env.ready();
  await tick();
  assert.deepEqual(env.requests.map((image) => image.src).sort(), ["home-mask.webp", "home-ring.webp", "interview-dialog.webp"]);
  for (const image of env.requests) image.finish();
  await tick();
  assert.equal(introReleased, true);
  assert.equal(env.loader.hidden, true);
});

test("body portal artwork is prepared while the loading illustration is excluded from the page scan", async () => {
  const env = environment();
  const portalImage = new env.Image("body-transfer.webp");
  const portalSvg = new env.SvgImage("body-card-symbols.png");
  const loaderImage = Object.assign(new env.Image("loader-only.webp"), { insideLoader: true });
  env.portals([env.loader, loaderImage, portalImage, portalSvg]);
  env.ready();
  await tick();
  assert.equal(portalImage.loading, "eager");
  assert.equal(loaderImage.loading, "lazy", "the loading illustration has its own readiness clock");
  assert.equal(env.loader.hidden, false);
  portalImage.finish();
  await tick();
  assert.equal(env.loader.hidden, false, "the body SVG portal still gates release");
  env.requests.find((image) => image.src === "body-card-symbols.png").finish();
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("a new SVG clone created by preparation gets its own decode gate even when its URL was seen", async () => {
  const env = environment();
  const original = new env.SvgImage("shared-symbols.png");
  env.page([original]);
  env.context.registerPagePreparation(() => {
    env.portals([new env.SvgImage("shared-symbols.png")]);
  });
  env.ready();
  await tick();
  assert.equal(env.requests.length, 1);
  env.requests[0].finish();
  await tick();
  assert.equal(env.requests.length, 2, "the new SVG element does not inherit the old node's completion");
  assert.equal(env.loader.hidden, false);
  assert.equal(env.requests[0].decodeCalls, 1, "the unchanged original is not probed again");
  env.requests[1].finish();
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("a stalled image that never loads or errors cannot hold the loader past the deadline", async () => {
  const env = environment();
  const stalled = new env.Image("stalled-body.avif");
  env.page([stalled]);
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(env.deadlineTimers.size, 1);
  env.expireDeadline();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(env.deadlineTimers.size, 0);
});

test("stalled fonts and page preparation also release at the deadline", async () => {
  const env = environment();
  env.fonts(new Promise(() => {}));
  env.context.registerPagePreparation(() => new Promise(() => {}));
  env.page([]);
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, false);
  env.expireDeadline();
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("the deadline starts only after the stylesheet applies", async () => {
  const env = environment();
  const style = Object.assign(new EventTarget(), {
    dataset: { styleState: "loading" }, href: "app.css", media: "print", sheet: null,
  });
  env.styles([style]);
  env.page([]);
  env.ready();
  await tick();
  assert.equal(env.deadlineTimers.size, 0, "an unstyled page is never released by time");
  assert.equal(env.loader.hidden, false);
  style.media = "all";
  style.dataset.styleState = "loaded";
  style.sheet = {};
  style.dispatchEvent(new Event("load"));
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("a failed image settles without leaving the visitor trapped behind the loader", async () => {
  const env = environment();
  const image = new env.Image("missing.webp");
  env.page([image]);
  env.ready();
  await tick();
  image.finish(false);
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("returning to a page can reuse images that are already loaded", async () => {
  const env = environment();
  const image = new env.Image("cached.webp");
  image.finish();
  env.page([image]);
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(image.decodeCalls, 1);
});

test("changing routes cancels the old page wait and gates only the new route", async () => {
  const env = environment();
  const oldImage = new env.Image("old-route.webp");
  const nextImage = new env.Image("new-route.webp");
  env.page([oldImage]);
  env.ready();
  await tick();
  env.context.showPageLoader();
  env.page([nextImage]);
  env.ready();
  await tick();
  oldImage.finish();
  await tick();
  assert.equal(env.loader.hidden, false);
  nextImage.finish();
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("autoplay artwork waits for its first frame while PDF and game links stay on demand", async () => {
  const env = environment();
  const video = new env.Video();
  env.page([video, { href: "large-document.pdf" }, { src: "game/index.html" }]);
  env.ready();
  await tick();
  assert.equal(video.preload, "auto");
  assert.equal(env.loader.hidden, false);
  assert.equal(env.requests.length, 0);
  video.readyState = 2;
  video.dispatchEvent(new Event("loadeddata"));
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("external form app shell loading cannot release the cover before its readiness message", async () => {
  const env = environment();
  const frame = new env.Frame();
  env.page([frame]);
  env.ready();
  await tick();
  frame.dispatchEvent(new Event("load"));
  await tick();
  assert.equal(env.loader.hidden, false);
  frame.finish();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(env.embedTimers.size, 0);
});

test("an embed already ready before the page scan does not need a second message", async () => {
  const env = environment();
  const frame = new env.Frame();
  frame.finish();
  env.page([frame]);
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(env.embedTimers.size, 0);
});

test("external embed timeout releases only that wait and still waits for ordinary images", async () => {
  const env = environment();
  const frame = new env.Frame();
  const image = new env.Image("slow-page.webp");
  env.page([frame, image]);
  env.ready();
  await tick();
  env.expireEmbeds();
  await tick();
  assert.equal(env.loader.hidden, false);
  image.finish();
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("changing routes cancels embed timers and ignores the old form readiness message", async () => {
  const env = environment();
  const frame = new env.Frame();
  env.page([frame]);
  env.ready();
  await tick();
  assert.equal(env.embedTimers.size, 1);
  env.context.showPageLoader();
  const nextImage = new env.Image("next-route.webp");
  env.page([nextImage]);
  env.ready();
  await tick();
  assert.equal(env.embedTimers.size, 0);
  frame.finish();
  await tick();
  assert.equal(env.loader.hidden, false);
  nextImage.finish();
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("async page preparation finishes before the cover leaves or the intro is released", async () => {
  const env = environment();
  const preparation = deferred();
  let started = false;
  let introReleased = false;
  env.context.registerPagePreparation(() => {
    started = true;
    return preparation.promise;
  });
  void env.context.whenPageLoaderLeaves().then(() => { introReleased = true; });
  env.ready();
  await tick();
  assert.equal(started, true);
  assert.equal(env.loader.hidden, false);
  assert.equal(introReleased, false);
  assert.equal(env.loaderEvents.includes("loaderready"), false);
  preparation.resolve();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(introReleased, true);
  assert.equal(env.loaderEvents.filter((name) => name === "loaderready").length, 1);
});

test("unmounting a component unregisters its page preparation", async () => {
  const env = environment();
  let calls = 0;
  const unregister = env.context.registerPagePreparation(() => { calls++; });
  unregister();
  env.ready();
  await tick();
  assert.equal(calls, 0);
  assert.equal(env.loader.hidden, true);
});

test("started scene decoding and CPU preparation keep both the loader and intro waiting", async () => {
  const env = environment();
  const preparation = deferred();
  let introReleased = false;
  env.context.trackPagePreparation(preparation.promise);
  void env.context.whenPageLoaderLeaves().then(() => { introReleased = true; });
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(introReleased, false);
  assert.equal(env.loaderEvents.includes("loaderready"), false);
  preparation.resolve();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(introReleased, true);
});

test("a layout rebuild replaces the original scene task with its new preparation", async () => {
  const env = environment();
  const original = deferred();
  const rebuilt = deferred();
  const disposeOriginal = env.context.trackPagePreparation(original.promise);
  let rebuilds = 0;
  env.context.registerPagePreparation(() => {
    rebuilds++;
    disposeOriginal();
    env.context.trackPagePreparation(rebuilt.promise);
  });
  env.ready();
  await tick();
  assert.equal(rebuilds, 1, "waiting for new tasks does not rebuild the page again");
  original.resolve();
  await tick();
  assert.equal(env.loader.hidden, false, "the replacement scene still needs its own CPU preparation");
  rebuilt.resolve();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(rebuilds, 1);
});

test("preparation tasks added during an existing wait are included before release", async () => {
  const env = environment();
  const first = deferred();
  const next = deferred();
  env.context.trackPagePreparation(first.promise);
  env.ready();
  await tick();
  env.context.trackPagePreparation(next.promise);
  first.resolve();
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(env.loaderEvents.includes("loaderready"), false);
  next.resolve();
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("disposing a pending scene settles the loader's captured task without waiting for its decode", async () => {
  const env = environment();
  const preparation = deferred();
  const dispose = env.context.trackPagePreparation(preparation.promise);
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, false);
  dispose();
  dispose();
  await tick();
  assert.equal(env.loader.hidden, true, "cleanup releases an already captured batch idempotently");
  preparation.resolve();
  await tick();
  assert.equal(env.loaderEvents.filter((name) => name === "loaderready").length, 1);
});

test("a cancelled route's tracked scene cannot release or block the next route", async () => {
  const env = environment();
  const oldPreparation = deferred();
  const nextPreparation = deferred();
  const disposeOld = env.context.trackPagePreparation(oldPreparation.promise);
  env.ready();
  await tick();
  env.context.showPageLoader();
  disposeOld();
  env.context.trackPagePreparation(nextPreparation.promise);
  env.ready();
  await tick();
  oldPreparation.reject(new Error("Old scene decode failed after unmount"));
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(env.loaderEvents.includes("loaderready"), false);
  assert.equal(env.loaderEvents.includes("loadererror"), false);
  nextPreparation.resolve();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(env.loaderEvents.filter((name) => name === "loaderready").length, 1);
});

test("a tracked scene's failed optional effect settles using its existing fallback", async () => {
  const env = environment();
  const preparation = deferred();
  env.context.trackPagePreparation(preparation.promise);
  env.ready();
  await tick();
  preparation.reject(new Error("Canvas sampling is unavailable"));
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(env.loaderEvents.includes("loadererror"), false);
});

test("the actual RNA morph waits for its pixel preparation frame after image decoding", async () => {
  const env = rnaMorphEnvironment();
  env.ready();
  await tick();
  env.image.finish();
  env.image.naturalWidth = env.image.naturalHeight = 1;
  await tick();
  assert.equal(env.loader.hidden, false, "decoded artwork has not generated its painted plates yet");
  assert.equal(env.samples(), 0);
  env.flushMorphFrames();
  await tick();
  assert.ok(env.samples() > 0, "the real morph performed pixel sampling");
  assert.equal(env.prepared(), 1);
  assert.equal(env.loader.hidden, true);
  env.morph.dispose();
});

test("disposing the actual RNA morph settles its captured wait and suppresses late decode work", async () => {
  const env = rnaMorphEnvironment();
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, false);
  env.morph.dispose();
  await tick();
  assert.equal(env.loader.hidden, true);
  env.image.finish();
  env.image.naturalWidth = env.image.naturalHeight = 1;
  await tick();
  env.flushMorphFrames();
  assert.equal(env.samples(), 0);
  assert.equal(env.prepared(), 0);
});

test("the carried magnifier waits for the reused SVG painting without a canvas sampling request", async () => {
  const env = galleryMagnifierEnvironment();
  env.ready();
  await tick();
  assert.equal(env.requests.length, 1, "only the ordinary SVG decode probe is needed");
  assert.equal(env.requests[0].src, "thinking-4-decoded.webp", "reuse the displayed source");
  assert.equal(env.requests[0].crossOrigin, null, "no detached anonymous canvas request");
  assert.equal(env.loader.hidden, false);
  env.requests[0].finish();
  await tick();
  assert.equal(env.loader.hidden, false, "the SVG's native load still gates the cover");
  env.nativeSvgProbes.forEach((probe) => probe.finish());
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("leaving the gallery cancels its pending native SVG wait without blocking the next route", async () => {
  const env = galleryMagnifierEnvironment();
  env.ready();
  await tick();
  const oldProbe = env.nativeSvgProbes.at(-1);
  const oldLayer = env.nativeSvgLayers.at(-1);
  assert.equal(env.loader.hidden, false);
  env.context.showPageLoader();
  env.page([]);
  env.ready();
  await tick();
  assert.equal(oldLayer.removed, true);
  assert.equal(env.loader.hidden, true);
  oldProbe.finish();
  env.requests.forEach((image) => image.finish());
  await tick();
  assert.equal(env.loaderEvents.filter((name) => name === "loaderready").length, 1);
});

test("images and background art added by scene preparation must load and decode before leaving", async () => {
  const env = environment();
  const original = new env.Image("original-scene.webp");
  original.finish();
  const added = new env.Image("prepared-scene-clone.webp");
  const decoded = deferred();
  added.decode = () => {
    added.decodeCalls++;
    return decoded.promise;
  };
  const background = { styles: { base: { backgroundImage: 'url("prepared-scene-background.webp")' } } };
  env.page([original]);
  env.context.registerPagePreparation(() => { env.page([original, added, background]); });
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(added.loading, "eager");
  const backgroundRequest = env.requests.find((image) => image.src === "prepared-scene-background.webp");
  assert.ok(backgroundRequest, "the preparation's new CSS artwork is requested");
  added.finish();
  await tick();
  assert.equal(added.decodeCalls, 1);
  assert.equal(env.loader.hidden, false);
  decoded.resolve();
  await tick();
  assert.equal(env.loader.hidden, false, "new background artwork still gates the cover");
  backgroundRequest.finish();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(original.decodeCalls, 1, "unchanged artwork is not decoded a second time");
});

test("scene preparation replacing an existing image source starts a new readiness wait", async () => {
  const env = environment();
  const image = new env.Image("before-preparation.webp");
  image.finish();
  env.page([image]);
  env.context.registerPagePreparation(() => { image.src = "after-preparation.webp"; });
  env.ready();
  await tick();
  assert.equal(image.src, "after-preparation.webp");
  assert.equal(image.complete, false);
  assert.equal(image.decodeCalls, 1, "the original source was decoded before preparation");
  assert.equal(env.loader.hidden, false);
  image.finish();
  await tick();
  assert.equal(image.decodeCalls, 2, "the replacement source receives its own decode");
  assert.equal(env.loader.hidden, true);
});

test("page preparation failure keeps the cover up and reports an error", async () => {
  const env = environment();
  const preparation = deferred();
  let started = false;
  let introReleased = false;
  env.context.registerPagePreparation(() => {
    started = true;
    return preparation.promise;
  });
  void env.context.whenPageLoaderLeaves().then(() => { introReleased = true; });
  env.ready();
  await tick();
  assert.equal(started, true);
  preparation.reject(new Error("The dynamic figure could not initialize"));
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(env.loader.classList.contains("is-leaving"), false);
  assert.equal(introReleased, false);
  assert.equal(env.loaderEvents.filter((name) => name === "loadererror").length, 1);
  assert.equal(env.loaderEvents.includes("loaderready"), false);
});

test("a cancelled route's late preparation result cannot release the new page", async () => {
  const env = environment();
  const oldPreparation = deferred();
  let started = false;
  const unregister = env.context.registerPagePreparation(() => {
    started = true;
    return oldPreparation.promise;
  });
  env.ready();
  await tick();
  assert.equal(started, true);
  unregister();
  env.context.showPageLoader();
  const nextImage = new env.Image("new-route-still-loading.webp");
  env.page([nextImage]);
  env.ready();
  await tick();
  oldPreparation.reject(new Error("Unmounted page initialization failed"));
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(env.loaderEvents.includes("loadererror"), false);
  assert.equal(env.loaderEvents.includes("loaderready"), false);
  nextImage.finish();
  await tick();
  assert.equal(env.loader.hidden, true);
});

test("a stalled font cannot hold layout past its own budget", async () => {
  const env = environment();
  const image = new env.Image("figure-that-triggers-layout.webp");
  const lateFont = deferred();
  let prepared = false;
  env.context.registerPagePreparation(() => { prepared = true; });
  env.page([image]);
  env.ready();
  await tick();
  assert.equal(image.loading, "eager", "the page resource scan has started");
  env.fonts(lateFont.promise);
  image.finish();
  await tick();
  // Every site font uses font-display: swap. The loader waits briefly for
  // final metrics, then releases layout rather than racing the 15 s deadline.
  lateFont.resolve();
  await tick();
  assert.equal(prepared, true);
  assert.equal(env.loader.hidden, true);
});

test("CSS that failed before readiness starts reports failure without waiting for another event", async () => {
  const env = environment();
  const style = Object.assign(new EventTarget(), {
    dataset: { styleState: "error" },
    href: "missing-app.css",
    media: "print",
    sheet: {},
  });
  style.dispatchEvent(new Event("error"));
  env.styles([style]);
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(env.loader.classList.contains("is-leaving"), false);
  assert.equal(env.loaderEvents.filter((name) => name === "loadererror").length, 1);
  assert.equal(env.loaderEvents.includes("loaderready"), false);
});

test("a CSS sheet object does not mean print-media styles have applied to the page", async () => {
  const env = environment();
  const style = Object.assign(new EventTarget(), {
    dataset: { styleState: "loading" },
    href: "app.css",
    media: "print",
    sheet: {},
  });
  let prepared = false;
  env.context.registerPagePreparation(() => { prepared = true; });
  env.styles([style]);
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, false);
  assert.equal(prepared, false);
  assert.equal(env.loaderEvents.includes("loaderready"), false);
  style.media = "all";
  style.dataset.styleState = "loaded";
  style.dispatchEvent(new Event("load"));
  await tick();
  assert.equal(prepared, true);
  assert.equal(env.loader.hidden, true);
});

test("the HTML loader stays visible beyond ten seconds and offers recovery for a long wait", async () => {
  const env = inlineLoaderEnvironment();
  await env.advance(11000);
  assert.equal(env.loader.hidden, false);
  assert.equal(env.loader.classList.contains("is-leaving"), false);
  assert.equal(env.wait.hidden, true);
  await env.advance(1000);
  assert.equal(env.wait.hidden, false);
  assert.equal(env.retry.hidden, true);
  await env.advance(18000);
  assert.equal(env.loader.hidden, false);
  assert.equal(env.loader.classList.contains("is-leaving"), false);
  assert.equal(env.retry.hidden, false);
  env.retry.dispatchEvent(new Event("click"));
  assert.equal(env.reloads(), 1);
});

test("successful readiness clears the HTML waiting timers and feedback", async () => {
  const env = inlineLoaderEnvironment();
  await env.advance(12000);
  assert.equal(env.wait.hidden, false);
  env.loader.dispatchEvent(new Event("loaderready"));
  assert.equal(env.wait.hidden, true);
  assert.equal(env.retry.hidden, true);
  assert.equal(env.timers.size, 0);
  await env.advance(30000);
  assert.equal(env.wait.hidden, true);
  assert.equal(env.retry.hidden, true);
});

test("a route replay starts its own waiting timers without inheriting the previous route's clock", async () => {
  const env = inlineLoaderEnvironment();
  await env.advance(8000);
  env.loader.dispatchEvent(new Event("loaderready"));
  assert.equal(env.timers.size, 0);
  await env.advance(23000);
  env.loader.dispatchEvent(new Event("loaderstart"));
  await env.advance(11999);
  assert.equal(env.wait.hidden, true);
  assert.equal(env.retry.hidden, true);
  await env.advance(1);
  assert.equal(env.wait.hidden, false);
  await env.advance(18000);
  assert.equal(env.retry.hidden, false);
  assert.equal(env.loader.hidden, false);
});

test("a failed app module exposes retry without revealing the incomplete page", async () => {
  const env = inlineLoaderEnvironment();
  await env.advance(1000);
  const error = new Event("error");
  Object.defineProperty(error, "target", { value: { tagName: "SCRIPT", type: "module" } });
  env.browser.dispatchEvent(error);
  assert.equal(env.loader.hidden, false);
  assert.equal(env.loader.classList.contains("is-leaving"), false);
  assert.equal(env.retry.hidden, false);
  assert.equal(env.wait.hidden, true);
  assert.match(env.status.textContent, /could not load/i);
  assert.equal(env.timers.size, 0);
});

test("page image metadata includes nested DBTL and split figures and excludes document links", () => {
  const source = compile("src/components/wiki/wikiPageImages.ts").replace(/^export /gm, "");
  const context = vm.createContext({});
  vm.runInContext(source, context);
  const sources = context.wikiPageImages({ sections: [{ blocks: [
    { type: "figure", src: "body.webp" },
    { type: "dbtl", stages: [{ blocks: [{ type: "figure", src: "inactive-stage.webp" }] }] },
    { type: "split", prose: [{ type: "figure", src: "body.webp" }], aside: { type: "figure", src: "aside.webp" } },
    { type: "references", items: [{ href: "large-document.pdf" }] },
  ] }] });
  assert.deepEqual(Array.from(sources), ["body.webp", "inactive-stage.webp", "aside.webp"]);
});

test("React puts interaction-only page image declarations in the head as resource hints", async () => {
  const source = compile("src/components/common/PageImagePreloads.tsx", ts.ModuleKind.CommonJS);
  const jsx = await import("react/jsx-runtime");
  const module = { exports: {} };
  vm.runInNewContext(source, { module, exports: module.exports, require: () => jsx });
  const markup = renderToStaticMarkup(jsx.jsx("html", {
    children: [jsx.jsx("head", {}, "head"), jsx.jsx("body", {
      children: jsx.jsx("main", {
        children: jsx.jsx(module.exports.PageImagePreloads, { sources: ["dialog.webp", undefined, "dialog.webp"] }),
      }),
    }, "body")],
  }));
  assert.equal((markup.match(/rel="preload"/g) ?? []).length, 1);
  assert.match(markup, /as="image"/);
  assert.match(markup, /href="dialog.webp"/);
  assert.match(markup, /<head>.*href="dialog.webp".*<\/head>/);
  assert.doesNotMatch(markup.match(/<body>.*<\/body>/)[0], /rel="preload"/);
});

test("a transparent SVG waits for its own native load after its decode probe is ready", async () => {
  const env = environment();
  const art = new env.SvgImage("transparent-symbols.png");
  env.holdNativeProbes();
  art.style.setProperty("opacity", "0");
  env.page([art]);
  env.ready();
  await tick();
  env.requests.forEach((image) => image.finish());
  await tick();
  assert.equal(env.loader.classList.contains("is-leaving"), false);
  assert.equal(art.style.getPropertyValue("opacity"), "0");
  env.nativeSvgProbes.forEach((probe) => probe.finish());
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(art.style.getPropertyValue("opacity"), "0");
  assert.equal(art.style.getPropertyPriority("opacity"), "");
});

test("cancelling a native SVG wait preserves its pose and releases the old route", async () => {
  const env = environment();
  const art = new env.SvgImage("old-symbols.png");
  env.holdNativeProbes();
  art.style.setProperty("opacity", "0.25", "important");
  env.page([art]);
  env.ready();
  await tick();
  env.requests.forEach((image) => image.finish());
  env.context.showPageLoader();
  env.page([]);
  env.ready();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(art.style.getPropertyValue("opacity"), "0.25");
  assert.equal(art.style.getPropertyPriority("opacity"), "important");
  art.finish(false);
  await tick();
  assert.equal(env.loaderEvents.filter((name) => name === "loaderready").length, 1);
});

test("restarting readiness without showing the loader again creates a fresh native SVG wait", async () => {
  const env = environment();
  env.holdNativeProbes();
  env.page([new env.SvgImage("restarted-symbols.png")]);
  env.ready();
  await tick();
  env.requests.forEach((image) => image.finish());
  await tick();
  assert.equal(env.nativeSvgProbes.length, 1);
  assert.equal(env.loader.hidden, false);

  env.ready();
  await tick();
  assert.equal(env.nativeSvgLayers[0].removed, true, "abort removes the old route preloader client");
  assert.equal(env.nativeSvgProbes.length, 2, "the aborted task cannot supply a resolved readiness result");
  env.requests.forEach((image) => image.finish());
  env.nativeSvgProbes[0].finish();
  await tick();
  assert.equal(env.loader.hidden, false, "a late load from the aborted probe cannot release its replacement");
  assert.equal(env.loaderEvents.includes("loaderready"), false);
  env.nativeSvgProbes[1].finish();
  await tick();
  assert.equal(env.loader.hidden, true);
  assert.equal(env.nativeSvgLayers[1].removed, false, "the current route keeps its completed SVG resource warm");
  assert.equal(env.loaderEvents.filter((name) => name === "loaderready").length, 1);
});
