import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
const restingSheep = "https://static.igem.wiki/teams/6056/wiki/files/pages/shared/cursor-default.avif";
const happySheep = "https://static.igem.wiki/teams/6056/wiki/files/pages/shared/cursor-active.avif";
import { GlassSheen } from "./GlassSheen";

const INTERACTIVE =
  'a[href], button:not(:disabled), summary, label[for], select:not(:disabled), input[type="range"], input[type="checkbox"], input[type="radio"], [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="slider"]';
const NATIVE =
  'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable]:not([contenteditable="false"]), iframe, [draggable="true"], [data-native-cursor]';
const PARTICLE_COUNT = 18;

function detectIsDark(element: Element | null): boolean {
  let curr: Element | null = element;
  while (curr && curr !== document.documentElement) {
    if (curr.getAttribute("data-theme") === "dark" || curr.classList.contains("dark")) {
      return true;
    }
    const bg = window.getComputedStyle(curr).backgroundColor;
    if (bg && bg !== "transparent" && !bg.startsWith("rgba(0, 0, 0, 0)")) {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        return lum < 125;
      }
    }
    curr = curr.parentElement;
  }
  if (document.documentElement.dataset.homeIntro === "playing") return true;
  return false;
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(184, 82, 122, ${alpha})`;
}

interface SparkPalette {
  fill: string;
  glow: string;
  altFill: string;
}

function resolveSparkPalette(target: Element | null): SparkPalette {
  if (detectIsDark(target)) {
    return {
      fill: "#ffffff",
      glow: "rgba(255, 255, 255, 0.8)",
      altFill: "#d9f4ff",
    };
  }

  let sub = "";
  let head = "";
  if (target) {
    const cs = window.getComputedStyle(target);
    sub = cs.getPropertyValue("--route-subheading-ink").trim();
    head = cs.getPropertyValue("--route-heading-ink").trim();
  }
  if (!sub) {
    const bodyCs = window.getComputedStyle(document.body);
    sub = bodyCs.getPropertyValue("--route-subheading-ink").trim();
    head = bodyCs.getPropertyValue("--route-heading-ink").trim();
  }

  if (sub && sub !== "inherit") {
    return {
      fill: sub,
      glow: hexToRgba(sub, 0.45),
      altFill: head || sub,
    };
  }

  return {
    fill: "#b8527a",
    glow: "rgba(184, 82, 122, 0.45)",
    altFill: "#8e3b5e",
  };
}

/** Keep the hotspot exact; only the illustration's attitude has inertia. */
export function SheepCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  // Keep one portal tree while its host moves into an opted-in top-layer dialog.
  const [portalHost] = useState(() => {
    const host = document.createElement("div");
    host.style.display = "contents";
    return host;
  });

  useEffect(() => {
    document.body.append(portalHost);
    const layer = layerRef.current!;
    const follower = layer.querySelector<HTMLElement>(
      ".sheep-cursor__follower",
    )!;
    const tilt = layer.querySelector<HTMLElement>(".sheep-cursor__tilt")!;
    const sprite = layer.querySelector<HTMLElement>(".sheep-cursor__sprite")!;
    const halo = layer.querySelector<HTMLElement>(".sheep-cursor__halo")!;
    const sheens = [
      ...layer.querySelectorAll<HTMLElement>(".sheep-cursor__sheen"),
    ];
    const ripples = [
      ...layer.querySelectorAll<HTMLElement>(".sheep-cursor__ripple"),
    ];
    const particles = [
      ...layer.querySelectorAll<HTMLElement>(".sheep-cursor__spark"),
    ];
    const media = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const root = document.documentElement;
    let disposed = false;
    let ready = false;
    let visible = false;
    let pressed = false;
    let active: Element | null = null;
    let x = 0;
    let y = 0;
    let lastMove = 0;
    let lastShine = -1000;
    let angle = 0;
    let targetAngle = 0;
    let frame = 0;
    let frameTime = 0;
    let particleIndex = 0;
    let rippleIndex = 0;

    function spark(
      px: number,
      py: number,
      dx: number,
      dy: number,
      size: number,
      color: string,
      glow: string,
    ) {
      const particle = particles[particleIndex++ % PARTICLE_COUNT];
      particle.getAnimations().forEach((animation) => animation.cancel());
      particle.style.left = `${px}px`;
      particle.style.top = `${py}px`;
      particle.style.width = particle.style.height = `${size}px`;
      particle.style.setProperty("--spark-fill", color);
      particle.style.setProperty("--spark-glow", glow);
      particle.animate(
        [
          {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(.2) rotate(0deg)",
            offset: 0,
          },
          {
            opacity: 0.95,
            transform: `translate(calc(-50% + ${dx * 0.45}px), calc(-50% + ${dy * 0.45}px)) scale(1.1) rotate(25deg)`,
            offset: 0.25,
          },
          {
            opacity: 0.75,
            transform: `translate(calc(-50% + ${dx * 0.8}px), calc(-50% + ${dy * 0.8 + 8}px)) scale(.85) rotate(50deg)`,
            offset: 0.6,
          },
          {
            opacity: 0,
            transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy * 1.15 + 24}px)) scale(.15) rotate(90deg)`,
          },
        ],
        { duration: 520 + size * 16, easing: "cubic-bezier(0.25, 0.9, 0.4, 1)" },
      );
    }

    function triggerRipple(px: number, py: number, color: string) {
      if (!ripples.length) return;
      const rip = ripples[rippleIndex++ % ripples.length];
      rip.getAnimations().forEach((a) => a.cancel());
      rip.style.left = `${px}px`;
      rip.style.top = `${py}px`;
      rip.style.borderColor = color;
      rip.animate(
        [
          { transform: "scale(.25)", opacity: 0.8 },
          { transform: "scale(1.5)", opacity: 0 },
        ],
        { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }

    function shine() {
      const now = performance.now();
      if (!visible || pressed || now - lastShine < 850) return;
      lastShine = now;
      halo.getAnimations().forEach((animation) => animation.cancel());
      halo.animate(
        [
          { opacity: 0, transform: "scale(.7)" },
          { opacity: 0.42, transform: "scale(1)", offset: 0.35 },
          { opacity: 0, transform: "scale(1.18)" },
        ],
        { duration: 780, easing: "ease-out" },
      );
      sheens.forEach((sheen) => {
        sheen.getAnimations().forEach((animation) => animation.cancel());
        sheen.animate(
          [
            { maskPosition: "100% 0", opacity: 0 },
            { opacity: 0.9, offset: 0.25 },
            { opacity: 0.9, offset: 0.6 },
            { maskPosition: "0% 0", opacity: 0 },
          ],
          { duration: 700, easing: "ease-in-out" },
        );
      });
    }

    function settle(now: number) {
      frame = 0;
      const dt = Math.min(now - frameTime, 40);
      frameTime = now;
      if (now - lastMove > 60) targetAngle = 0;
      angle += (targetAngle - angle) * (1 - Math.exp(-dt / 75));
      tilt.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      if (Math.abs(angle) > 0.05 || now - lastMove < 80) {
        frame = requestAnimationFrame(settle);
      } else {
        tilt.style.transform = "rotate(0deg)";
      }
    }

    function hide() {
      visible = false;
      pressed = false;
      active = null;
      layer.dataset.visible = "false";
      layer.dataset.active = "false";
      root.classList.remove("has-sheep-cursor");
      cancelAnimationFrame(frame);
      frame = 0;
      angle = targetAngle = 0;
      tilt.style.transform = "rotate(0deg)";
      layer
        .getAnimations({ subtree: true })
        .forEach((animation) => animation.cancel());
    }

    function updateTarget(target: EventTarget | null) {
      const element = target instanceof Element ? target : null;
      const modal = element?.closest(":modal");
      // Native controls and dialogs without explicit opt-in retain their cursor.
      if (
        !element ||
        element.closest(NATIVE) ||
        element.closest('.games-experience') ||
        (modal && !modal.hasAttribute("data-sheep-cursor")) ||
        document.body.classList.contains("is-thread-dragging")
      ) {
        hide();
        return false;
      }
      // A body-level z-index cannot paint above the browser's modal top layer.
      const surface = modal ?? document.body;
      if (portalHost.parentElement !== surface) surface.append(portalHost);
      const next = element.closest(INTERACTIVE);
      const enabled =
        next && !next.matches('[disabled], [aria-disabled="true"]')
          ? next
          : null;
      layer.dataset.active = String(Boolean(enabled) || pressed);
      if (enabled && enabled !== active) shine();
      active = enabled;
      return true;
    }

    function move(event: PointerEvent) {
      if (!ready || !media.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }
      const now = performance.now();
      const elapsed = Math.max(8, now - lastMove);
      const dx = event.clientX - x;
      const distance = Math.hypot(dx, event.clientY - y);
      const wasVisible = visible;
      x = event.clientX;
      y = event.clientY;
      if (!updateTarget(event.target)) return;
      follower.style.transform = `translate3d(${x - 13}px, ${y - 12}px, 0)`;
      visible = true;
      layer.dataset.visible = "true";
      root.classList.add("has-sheep-cursor");
      // A quick gesture catches the light once, without a permanent glow loop.
      if (wasVisible && distance > 14 && distance / elapsed > 1.15) shine();
      targetAngle = Math.max(-9, Math.min(9, (dx / elapsed) * 5));
      lastMove = now;
      if (!frame) {
        frameTime = now;
        frame = requestAnimationFrame(settle);
      }
    }

    function down(event: PointerEvent) {
      if (event.button !== 0 || event.pointerType !== "mouse" || !visible)
        return;
      if (!updateTarget(event.target)) return;
      pressed = true;
      layer.dataset.active = "true";
      sprite.getAnimations().forEach((animation) => animation.cancel());
      sprite.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(.94, .9)", offset: 0.4 },
          { transform: "scale(1.04, 1.06)", offset: 0.72 },
          { transform: "scale(1)" },
        ],
        { duration: 380, easing: "ease-out" },
      );

      const targetEl =
        event.target instanceof Element
          ? event.target
          : document.elementFromPoint(x, y);
      const palette = resolveSparkPalette(targetEl);

      triggerRipple(x, y, palette.fill);

      const count = 6;
      for (let i = 0; i < count; i++) {
        const theta =
          (i * Math.PI * 2) / count - Math.PI / 2 + (Math.random() - 0.5) * 0.35;
        const dist = 24 + Math.random() * 12;
        const size = i % 2 === 0 ? 11 : 7;
        const color = i % 3 === 0 ? palette.altFill : palette.fill;
        spark(
          x,
          y,
          Math.cos(theta) * dist,
          Math.sin(theta) * dist,
          size,
          color,
          palette.glow,
        );
      }
    }

    function up() {
      pressed = false;
      if (visible) updateTarget(document.elementFromPoint(x, y));
    }

    function out(event: PointerEvent) {
      const relatedElement =
        event.relatedTarget instanceof Element ? event.relatedTarget : null;
      // Embedded documents (especially the browser's PDF viewer) own their
      // pointer stream. Stop tracking before the stream disappears into iframe.
      if (!relatedElement || relatedElement.closest("iframe")) hide();
    }

    function over(event: PointerEvent) {
      const element = event.target instanceof Element ? event.target : null;
      if (element?.closest("iframe")) hide();
    }

    function scroll() {
      if (visible) updateTarget(document.elementFromPoint(x, y));
    }

    function syncDialog(event: Event) {
      const dialog = event.target;
      if (!(dialog instanceof HTMLDialogElement)) return;
      if (!dialog.open && dialog.contains(portalHost)) {
        document.body.append(portalHost);
      }
      // Opening or closing a dialog can change the target under a still mouse.
      if (visible) updateTarget(document.elementFromPoint(x, y));
    }

    function key(event: KeyboardEvent) {
      if (event.key === "Tab" || event.key === "Escape") hide();
    }

    // Decode both poses before hiding the platform cursor, including after HMR.
    Promise.all(
      [restingSheep, happySheep].map((src) => {
        const image = new Image();
        image.src = src;
        return image.decode();
      }),
    )
      .then(() => {
        if (!disposed) ready = true;
      })
      .catch(() => {});

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("sheep-cursor-hide", hide);
    window.addEventListener("pointerdown", down, {
      passive: true,
      capture: true,
    });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointerout", out);
    window.addEventListener("pointerover", over, { capture: true });
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("dragstart", hide);
    window.addEventListener("keydown", key);
    window.addEventListener("scroll", scroll, { passive: true, capture: true });
    document.addEventListener("visibilitychange", hide);
    document.addEventListener("toggle", syncDialog, true);
    document.addEventListener("close", syncDialog, true);
    media.addEventListener("change", hide);
    return () => {
      disposed = true;
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("sheep-cursor-hide", hide);
      window.removeEventListener("pointerdown", down, true);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerout", out);
      window.removeEventListener("pointerover", over, true);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("dragstart", hide);
      window.removeEventListener("keydown", key);
      window.removeEventListener("scroll", scroll, true);
      document.removeEventListener("visibilitychange", hide);
      document.removeEventListener("toggle", syncDialog, true);
      document.removeEventListener("close", syncDialog, true);
      media.removeEventListener("change", hide);
      portalHost.remove();
    };
  }, [portalHost]);

  return createPortal(
    <div
      ref={layerRef}
      className="sheep-cursor"
      aria-hidden="true"
      data-visible="false"
    >
      <div className="sheep-cursor__follower">
        <div className="sheep-cursor__tilt">
          <span className="sheep-cursor__halo" />
          <div className="sheep-cursor__sprite">
            <img
              className="sheep-cursor__rest"
              src={restingSheep}
              alt=""
              draggable={false}
            />
            <img
              className="sheep-cursor__happy"
              src={happySheep}
              alt=""
              draggable={false}
            />
            <GlassSheen
              src={restingSheep}
              className="sheep-cursor__sheen sheep-cursor__sheen--rest"
            />
            <GlassSheen
              src={happySheep}
              className="sheep-cursor__sheen sheep-cursor__sheen--happy"
            />
          </div>
        </div>
      </div>
      <span className="sheep-cursor__ripple" />
      <span className="sheep-cursor__ripple" />
      {Array.from({ length: PARTICLE_COUNT }, (_, index) => (
        <i key={index} className="sheep-cursor__spark" />
      ))}
    </div>,
    portalHost,
  );
}
