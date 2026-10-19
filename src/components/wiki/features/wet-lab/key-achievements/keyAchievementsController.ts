import type { KeyAchievement } from "../../../../../data/wet-lab/keyAchievementsData";

interface ScreenRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Native interaction engine. Its return value is the React effect cleanup. */
export function mountKeyAchievements(
  root: HTMLElement,
  achievements: readonly KeyAchievement[],
  imageId: string,
): () => void {
  const document = root.ownerDocument;
  const view = document.defaultView;
  if (!view || achievements.length === 0) return () => {};

  const find = <T extends Element>(name: string): T => {
    const element = root.querySelector<T>(`[data-cc="${name}"]`);
    if (!element) throw new Error(`Missing Key Achievements element: ${name}`);
    return element;
  };
  const itemAt = (index: number): KeyAchievement => {
    const item = achievements[index];
    if (!item) throw new RangeError(`Unknown achievement index: ${index}`);
    return item;
  };

  const rotor = find<HTMLElement>("rotor");
  const centre = find<HTMLButtonElement>("overview-button");
  const panel = find<HTMLElement>("content");
  const overview = find<HTMLElement>("overview");
  const detail = find<HTMLElement>("detail");
  const crop = find<SVGSVGElement>("detail-image");
  const figureArea = find<HTMLElement>("figure-area");
  const overviewImage = find<SVGSVGElement>("overview-image");
  const copy = find<HTMLElement>("copy");
  const detailTitle = find<HTMLElement>("detail-title");
  const detailText = find<HTMLElement>("detail-text");
  const cropTitle = find<SVGTitleElement>("crop-title");
  const announcement = find<HTMLElement>("announcement");
  const dialog = find<HTMLDialogElement>("image-dialog");
  const dialogTitle = find<HTMLElement>("dialog-title");
  const dialogImage = find<SVGSVGElement>("dialog-image");
  const closeDialog = find<HTMLButtonElement>("close-dialog");
  const figure = figureArea.querySelector<HTMLElement>(".cc-figure");
  if (!figure) throw new Error("Missing Key Achievements figure");

  const controller = new AbortController();
  const { signal } = controller;
  // Keep the reader's page-navigation listener from hijacking button keys.
  root.addEventListener(
    "keydown",
    (event) => {
      if (
        [
          " ",
          "Home",
          "End",
          "PageUp",
          "PageDown",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
        ].includes(event.key) &&
        event.target instanceof Element &&
        event.target.closest("button, dialog")
      ) {
        event.stopPropagation();
      }
    },
    { signal },
  );
  const reducedMotion = view.matchMedia("(prefers-reduced-motion: reduce)");
  const svgNamespace = "http://www.w3.org/2000/svg";
  const step = 360 / achievements.length;
  let selected = -1;
  let animationVersion = 0;
  let active = true;
  let running: Animation[] = [];

  // The scaffold gives this engine exclusive ownership of these two containers.
  rotor.replaceChildren();
  detailText.replaceChildren();
  const buttons = achievements.map((item, index) => {
    const angle = -90 + index * step;
    const position = document.createElement("div");
    position.className = "cc-node-position";
    position.style.left = `${37.3 * Math.cos((angle * Math.PI) / 180)}cqw`;
    position.style.top = `${37.3 * Math.sin((angle * Math.PI) / 180)}cqw`;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "cc-bubble";
    button.dataset.achievement = item.id;
    button.setAttribute("aria-pressed", "false");
    if (panel.id) button.setAttribute("aria-controls", panel.id);
    button.setAttribute("aria-label", item.name);
    const label = document.createElement("span");
    item.label.forEach((line, lineIndex) => {
      if (lineIndex) label.append(document.createElement("br"));
      label.append(document.createTextNode(line));
    });
    button.append(label);
    button.addEventListener("click", () => select(index), { signal });
    button.addEventListener(
      "keydown",
      (event) => {
        let target: number | undefined;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          target = (index + 1) % achievements.length;
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          target = (index + achievements.length - 1) % achievements.length;
        }
        if (event.key === "Home" || event.key === "Escape") {
          event.preventDefault();
          centre.focus();
          select(-1);
          return;
        }
        if (target !== undefined) {
          event.preventDefault();
          buttons[target]?.focus();
        }
      },
      { signal },
    );
    position.append(button);
    rotor.append(position);
    return button;
  });

  centre.addEventListener("click", () => select(-1), { signal });
  centre.addEventListener(
    "keydown",
    (event) => {
      if (event.key.startsWith("Arrow")) {
        event.preventDefault();
        buttons[0]?.focus();
      }
    },
    { signal },
  );

  const modulo = (value: number): number => ((value % 360) + 360) % 360;
  function rotateTo(index: number): void {
    // Start at the currently visible angle even when a prior turn is interrupted.
    const transform = view!.getComputedStyle(rotor).transform;
    const matrix = new DOMMatrixReadOnly(
      transform === "none" ? undefined : transform,
    );
    const current = (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI;
    const wanted = index < 0 ? 0 : 90 - index * step;
    let delta = modulo(wanted - current + 180) - 180;
    if (Math.abs(delta) < 0.001) delta = 0;
    root.classList.add("cc-rebase");
    root.style.setProperty("--cc-rotation", `${current}deg`);
    void rotor.getBoundingClientRect();
    root.classList.remove("cc-rebase");
    const rotation = current + delta;
    root.style.setProperty("--cc-rotation", `${rotation}deg`);
    rotor.dataset.rotation = String(rotation);
    rotor.dataset.from = String(current);
    rotor.dataset.delta = String(delta);
  }

  function animate(
    element: Element,
    frames: Keyframe[],
    options: KeyframeAnimationOptions,
  ): Promise<void> {
    const animation = element.animate(frames, options);
    running.push(animation);
    return animation.finished.then(
      () => {},
      () => {},
    );
  }

  function clearTransitions(): void {
    animationVersion += 1;
    running.forEach((animation) => animation.cancel());
    running = [];
    root
      .querySelectorAll(".cc-flight, .cc-outgoing")
      .forEach((element) => element.remove());
    overview.style.opacity = "";
    figureArea.style.opacity = "";
  }

  function overviewRowRect(item: KeyAchievement): ScreenRect {
    // Preserve the SVG's image-to-screen mapping, including any letterboxing.
    const matrix = overviewImage.getScreenCTM();
    if (!matrix) return overviewImage.getBoundingClientRect();
    const first = new DOMPoint(0, item.y).matrixTransform(matrix);
    const last = new DOMPoint(1394, item.y + item.h).matrixTransform(matrix);
    return {
      left: first.x,
      top: first.y,
      width: last.x - first.x,
      height: last.y - first.y,
    };
  }

  function flyRow(
    item: KeyAchievement,
    from: ScreenRect,
    to: ScreenRect,
    version: number,
  ): void {
    const ghost = document.createElement("div");
    ghost.className = "cc-flight";
    ghost.setAttribute("aria-hidden", "true");
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("viewBox", `0 ${item.y} 1394 ${item.h}`);
    const use = document.createElementNS(svgNamespace, "use");
    use.setAttribute("href", `#${imageId}`);
    svg.append(use);
    ghost.append(svg);
    root.append(ghost);
    const origin = root.getBoundingClientRect();
    const frame = (rect: ScreenRect): Keyframe => ({
      left: `${rect.left - origin.left}px`,
      top: `${rect.top - origin.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
    Object.assign(ghost.style, frame(to));
    void animate(ghost, [frame(from), frame(to)], {
      duration: 1020,
      easing: "cubic-bezier(.34,0,.16,1)",
      fill: "both",
    }).then(() => {
      if (!active || version !== animationVersion) return;
      ghost.remove();
      figureArea.style.opacity = "";
    });
  }

  function render(index: number): void {
    const isOverview = index < 0;
    overview.hidden = !isOverview;
    detail.hidden = isOverview;
    centre.setAttribute("aria-pressed", String(isOverview));
    buttons.forEach((button, buttonIndex) => {
      button.setAttribute("aria-pressed", String(buttonIndex === index));
    });
    const item = isOverview ? null : itemAt(index);
    panel.setAttribute("aria-label", item ? item.name : "Achievement overview");
    root.dataset.selection = item ? item.id : "overview";
    if (item) {
      detailTitle.textContent = item.name;
      detailText.replaceChildren(
        ...item.paragraphs.map((runs) => {
          const paragraph = document.createElement("p");
          runs.forEach((run) => {
            if (run.format) {
              const formatted = document.createElement(run.format);
              formatted.textContent = run.text;
              paragraph.append(formatted);
            } else {
              paragraph.append(document.createTextNode(run.text));
            }
          });
          return paragraph;
        }),
      );
      crop.setAttribute("viewBox", `0 ${item.y} 1394 ${item.h}`);
      crop.style.aspectRatio = `1394 / ${item.h}`;
      crop.setAttribute("aria-label", item.alt);
      cropTitle.textContent = item.alt;
    }
    announcement.textContent = item
      ? `${item.name}. ${item.paragraphs.map((runs) => runs.map((run) => run.text).join("")).join(" ")}`
      : "Visual overview of all seven achievements.";
  }

  function select(index: number): void {
    if (!active || index === selected) return;
    const previous = selected;
    const previousHeight = panel.getBoundingClientRect().height;
    clearTransitions();
    const version = animationVersion;
    const outgoing = previous < 0 ? overview : detail;
    const snapshot = outgoing.cloneNode(true) as HTMLElement;
    snapshot.removeAttribute("id");
    snapshot.removeAttribute("data-cc");
    snapshot.querySelectorAll("[id], [data-cc]").forEach((element) => {
      element.removeAttribute("id");
      element.removeAttribute("data-cc");
    });
    snapshot.setAttribute("aria-hidden", "true");
    snapshot.setAttribute("inert", "");
    snapshot.classList.add("cc-outgoing");
    snapshot.style.height = `${outgoing.getBoundingClientRect().height}px`;
    const item = itemAt(index < 0 ? previous : index);
    const from =
      previous < 0 ? overviewRowRect(item) : crop.getBoundingClientRect();
    selected = index;
    rotateTo(index);
    render(index);
    if (reducedMotion.matches) return;

    const targetHeight = panel.getBoundingClientRect().height;
    if (Math.abs(targetHeight - previousHeight) > 1) {
      void animate(
        panel,
        [{ height: `${previousHeight}px` }, { height: `${targetHeight}px` }],
        { duration: 650, easing: "cubic-bezier(.2,0,.2,1)" },
      );
    }
    panel.append(snapshot);
    void animate(
      snapshot,
      [{ opacity: 1 }, { opacity: 0, transform: "translateY(-7px)" }],
      { duration: 340, easing: "ease-out", fill: "forwards" },
    ).then(() => snapshot.remove());

    if (previous < 0 && index >= 0) {
      figureArea.style.opacity = "0";
      const to = crop.getBoundingClientRect();
      void animate(
        copy,
        [
          { opacity: 0, transform: "translateY(-9px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { delay: 170, duration: 540, easing: "ease-out", fill: "backwards" },
      );
      void animate(figure!, [{ opacity: 0 }, { opacity: 1 }], {
        delay: 650,
        duration: 300,
        fill: "backwards",
      });
      flyRow(item, from, to, version);
    } else if (index < 0) {
      const to = overviewRowRect(item);
      void animate(overview, [{ opacity: 0 }, { opacity: 1 }], {
        delay: 200,
        duration: 650,
        fill: "backwards",
      });
      flyRow(item, from, to, version);
    } else {
      void animate(
        copy,
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 500, delay: 80, easing: "ease-out", fill: "backwards" },
      );
      void animate(
        figureArea,
        [
          { opacity: 0, transform: "translateY(-14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 650,
          delay: 110,
          easing: "cubic-bezier(.2,0,.2,1)",
          fill: "backwards",
        },
      );
    }
  }

  root
    .querySelectorAll<HTMLButtonElement>("[data-expand]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const item =
            button.dataset.expand === "overview" || selected < 0
              ? null
              : itemAt(selected);
          dialogTitle.textContent = item ? item.name : "Visual overview";
          dialogImage.setAttribute(
            "viewBox",
            item ? `0 ${item.y} 1394 ${item.h}` : "0 5 1394 2092",
          );
          dialogImage.style.aspectRatio = item
            ? `1394 / ${item.h}`
            : "1394 / 2092";
          dialogImage.setAttribute(
            "aria-label",
            item
              ? item.alt
              : "Enlarged visual overview of all seven achievements",
          );
          if (!dialog.open) dialog.showModal();
        },
        { signal },
      );
    });
  closeDialog.addEventListener("click", () => dialog.close(), { signal });
  dialog.addEventListener(
    "click",
    (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    },
    { signal },
  );
  view.addEventListener("resize", clearTransitions, { passive: true, signal });
  view.addEventListener(
    "scroll",
    () => {
      if (root.querySelector(".cc-flight")) clearTransitions();
    },
    { passive: true, signal },
  );
  reducedMotion.addEventListener("change", clearTransitions, { signal });
  root.style.setProperty("--cc-rotation", "0deg");
  render(-1);

  return () => {
    if (!active) return;
    active = false;
    controller.abort();
    clearTransitions();
    if (dialog.open) dialog.close();
    selected = -1;
    render(-1);
    rotor.replaceChildren();
    detailText.replaceChildren();
    detailTitle.textContent = "";
    cropTitle.textContent = "";
    announcement.textContent = "";
    crop.setAttribute("viewBox", "0 5 1394 329");
    crop.style.aspectRatio = "";
    crop.removeAttribute("aria-label");
    root.classList.add("cc-rebase");
    root.style.removeProperty("--cc-rotation");
    void rotor.getBoundingClientRect();
    root.classList.remove("cc-rebase");
    delete rotor.dataset.rotation;
    delete rotor.dataset.from;
    delete rotor.dataset.delta;
  };
}
