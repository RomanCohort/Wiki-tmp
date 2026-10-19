/* eslint-disable react-refresh/only-export-components */
import {
  useId,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { gsap } from "gsap";
import { rosterAssets } from "../../../../data/team/rosterAssets";
import {
  rosterCollections,
  rosterEpigraph,
  type RosterCollection,
  type RosterMember,
} from "../../../../data/team/rosterPage";
import { renderInlineFormatting } from "../../proseInline";
import "../../../../styles/features/roster-panels.css";

const groups = rosterCollections.filter(
  (collection) => collection.kind === "group",
);
const firstGroupIndex = rosterCollections.findIndex(
  (collection) => collection.kind === "group",
);

const memberCollectionMap: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  rosterCollections.forEach((collection) => {
    if (collection.kind === "teachers") return;
    collection.members.forEach((member) => {
      map[member.id] = collection.title;
    });
  });
  return map;
})();

export function RosterOpening() {
  return (
    <figure className="roster-opening">
      <div className="roster-opening__photo">
        <img
          src={rosterAssets["team-photo"]}
          alt="The CirCure team together"
          fetchPriority="high"
        />
      </div>
      <figcaption>
        <strong>{rosterEpigraph}</strong>
      </figcaption>
    </figure>
  );
}

function PersonCard({
  member,
  onOpen,
}: {
  member: RosterMember;
  onOpen?: (member: RosterMember, trigger: HTMLButtonElement) => void;
}) {
  const isLead = member.role.includes("Lead");
  const content = (
    <>
      <span className="roster-person__photo">
        <img
          src={rosterAssets[member.image]}
          alt={member.name}
          loading="lazy"
          decoding="async"
        />
        {onOpen ? (
          <span className="roster-person__open" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        ) : null}
      </span>
      <span className="roster-person__name">{member.name}</span>
      <span className="roster-person__role">{member.role}</span>
    </>
  );
  return onOpen ? (
    <button
      className={`roster-person${isLead ? " roster-person--lead" : ""}`}
      type="button"
      aria-label={`Meet ${member.name}, ${member.role}`}
      aria-haspopup="dialog"
      onClick={(event) => onOpen(member, event.currentTarget)}
    >
      {content}
    </button>
  ) : (
    <div className="roster-person roster-person--teacher">{content}</div>
  );
}

function TeacherSection({ collection }: { collection: RosterCollection }) {
  return (
    <section
      className="roster-collection"
      aria-labelledby={`roster-${collection.id}`}
    >
      <h3 id={`roster-${collection.id}`}>{collection.title}</h3>
      <div
        className={`roster-people roster-people--teachers${collection.members.length === 4 ? " roster-people--four" : ""}`}
      >
        {collection.members.map((member) => (
          <PersonCard member={member} key={member.id} />
        ))}
      </div>
    </section>
  );
}

/*
 * Accordion animation adapted from React Bits:
 * https://github.com/DavidHDev/react-bits/blob/main/src/content/Components/AccordionGallery/AccordionGallery.jsx
 */
function GroupGallery({
  onOpen,
}: {
  onOpen: (member: RosterMember, trigger: HTMLButtonElement) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shownIndex, setShownIndex] = useState(0);
  const id = useId();
  const galleryRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstRun = useRef(true);
  const group = groups[shownIndex];
  const roles = [...new Set(group.members.map((member) => member.role))];

  useLayoutEffect(() => {
    const root = galleryRef.current;
    if (!root) return;
    const panels = tabRefs.current.filter(
      (node): node is HTMLButtonElement => !!node,
    );
    const media = Array.from(
      root.querySelectorAll<HTMLElement>(".roster-gallery__media"),
    );
    const photos = media.map((item) => item.querySelector("img")!);
    const labels = panels.map(
      (panel) => panel.querySelector(".roster-gallery__label")!,
    );
    const strips = panels.map(
      (panel) => panel.querySelector(".roster-gallery__strip")!,
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeline: gsap.core.Timeline | undefined;
    let measuredWidth = 0;
    let resizeFrame = 0;
    const animated = !firstRun.current && !reducedMotion.matches;
    const reveal = window.setTimeout(
      () => setShownIndex(selectedIndex),
      animated ? 300 : 0,
    );

    const applyLayout = (animate: boolean) => {
      const width = root.clientWidth;
      if (!width) return;
      measuredWidth = width;
      const vertical = width < 540;
      const gap = vertical ? 8 : 12;
      const aspect =
        photos[selectedIndex].naturalWidth /
          photos[selectedIndex].naturalHeight || 4 / 3;
      const height = vertical
        ? width / aspect
        : Math.max(100, Math.min(460, (width - gap * 4 - 52 * 4) / aspect));
      const activeSize = vertical ? height : height * aspect;
      const stripSize = vertical ? 48 : (width - gap * 4 - activeSize) / 4;
      const galleryHeight = vertical ? height + 4 * (stripSize + gap) : height;
      root.style.height = `${galleryHeight}px`;
      root.dataset.orientation = vertical ? "vertical" : "horizontal";
      root.setAttribute(
        "aria-orientation",
        vertical ? "vertical" : "horizontal",
      );
      timeline?.kill();
      const duration = animate && !reducedMotion.matches ? 0.6 : 0;
      timeline = gsap.timeline({
        defaults: { duration, ease: "power3.out", overwrite: "auto" },
      });
      let offset = 0;
      panels.forEach((panel, index) => {
        const isActive = index === selectedIndex;
        const size = isActive ? activeSize : stripSize;
        const photoAspect =
          photos[index].naturalWidth / photos[index].naturalHeight || 4 / 3;
        const drift = Math.max(-1.5, Math.min(1.5, selectedIndex - index));
        gsap.set(media[index], {
          width: vertical ? width : height * photoAspect,
          height: vertical ? width / photoAspect : height,
        });
        timeline!.to(
          panel,
          {
            x: vertical ? 0 : offset,
            y: vertical ? offset : 0,
            width: vertical ? width : size,
            height: vertical ? size : height,
            rotateY: vertical || isActive ? 0 : index < selectedIndex ? 6 : -6,
          },
          0,
        );
        timeline!.to(
          media[index],
          {
            xPercent: -50,
            yPercent: -50,
            x: vertical || isActive ? 0 : drift * 18,
          },
          0,
        );
        timeline!.to(
          labels[index],
          isActive
            ? { opacity: 1, x: 0, duration: duration * 0.7, delay: duration * 0.3 }
            : { opacity: 0, x: -14, duration: duration * 0.25 },
          0,
        );
        timeline!.to(
          strips[index],
          isActive
            ? { opacity: 0, duration: duration * 0.2 }
            : { opacity: 1, duration: duration * 0.5, delay: duration * 0.4 },
          0,
        );
        offset += size + gap;
      });
    };
    applyLayout(animated);
    firstRun.current = false;
    const observer = new ResizeObserver(([entry]) => {
      if (Math.abs(entry.contentRect.width - measuredWidth) < 2) return;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => applyLayout(false));
    });
    const onReady = () => applyLayout(false);
    observer.observe(root);
    reducedMotion.addEventListener("change", onReady);
    photos.forEach((photo) => photo.addEventListener("load", onReady));
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", onReady);
      photos.forEach((photo) => photo.removeEventListener("load", onReady));
      cancelAnimationFrame(resizeFrame);
      window.clearTimeout(reveal);
      timeline?.kill();
    };
  }, [selectedIndex]);

  const selectWithKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % groups.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + groups.length - 1) % groups.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = groups.length - 1;
    else return;
    event.preventDefault();
    setSelectedIndex(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section
      className="roster-collection roster-groups"
      aria-labelledby={`${id}-heading`}
    >
      <h3 id={`${id}-heading`}>Meet Our Groups</h3>
      <div
        className="roster-gallery"
        ref={galleryRef}
        role="tablist"
        aria-label="Team groups"
      >
        {groups.map((item, index) => (
          <button
            type="button"
            role="tab"
            key={item.id}
            id={`${id}-tab-${item.id}`}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            aria-selected={index === selectedIndex}
            aria-controls={`${id}-members`}
            tabIndex={index === selectedIndex ? 0 : -1}
            className={`roster-gallery__item${index === selectedIndex ? " is-selected" : ""}`}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={(event) => selectWithKeyboard(event, index)}
          >
            <span className="roster-gallery__frame">
              <span className="roster-gallery__media">
                <img
                  src={rosterAssets[item.image!]}
                  alt={`${item.title} group photo`}
                  loading="lazy"
                  draggable={false}
                />
              </span>
            </span>
            <span className="roster-gallery__label">
              <span className="roster-gallery__bar" aria-hidden="true" />
              {item.title}
            </span>
            <span className="roster-gallery__strip" aria-hidden="true">
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${id}-members`}
        aria-labelledby={`${id}-tab-${group.id}`}
        tabIndex={0}
        className="roster-group-members"
      >
        <div key={group.id} className="roster-group-members__content">
          <h3>{group.title}</h3>
          <div className="roster-role-groups">
            {roles.map((role) => {
              const members = group.members.filter(
                (member) => member.role === role,
              );
              const label =
                role === "Team Member"
                  ? "Team Members"
                  : role === "Group Lead" && members.length > 1
                    ? "Group Leads"
                    : role;
              return (
                <section
                  className={`roster-role-group${roles.length > 2 && members.length === 1 ? " roster-role-group--paired-lead" : ""}`}
                  key={role}
                >
                  {roles.length > 1 ? <h4>{label}</h4> : null}
                  <div className="roster-people">
                    {members.map((member) => (
                      <PersonCard
                        key={member.id}
                        member={member}
                        onOpen={onOpen}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function RosterPanels() {
  const [active, setActive] = useState<RosterMember | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);

  // 鼠标 3D 视差控制器引用（零 React 重渲染）
  const quickPhotoX = useRef<gsap.QuickToFunc | null>(null);
  const quickPhotoY = useRef<gsap.QuickToFunc | null>(null);
  const quickMarkX = useRef<gsap.QuickToFunc | null>(null);
  const quickMarkY = useRef<gsap.QuickToFunc | null>(null);
  const dialogRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const collectionTitle = active
    ? memberCollectionMap[active.id]
    : undefined;

  const watermarkWord = active
    ? active.name.trim().split(/\s+/).slice(-1)[0]
    : "";

  const openMember = useCallback(
    (member: RosterMember, trigger: HTMLButtonElement) => {
      opener.current = trigger;
      isClosingRef.current = false;
      setActive(member);
    },
    [],
  );

  // 逆序分层退场：Step 1 文字与鎏金线先向上抽离淡出 -> Step 2 人物肖像推远虚化并与视窗合拢
  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;
    const dialog = dialogRef.current;
    const overlay = overlayRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!dialog || reduced) {
      setActive(null);
      return;
    }

    isClosingRef.current = true;
    dialogRectRef.current = null;
    dialog.style.pointerEvents = "none";
    quickPhotoX.current?.(0);
    quickPhotoY.current?.(0);
    quickMarkX.current?.(0);
    quickMarkY.current?.(0);

    const visualStage = dialog.querySelector("[data-anim='visual-stage']");
    const photo = dialog.querySelector("[data-anim='photo']");
    const shutter = dialog.querySelector("[data-anim='shutter']");
    const watermark = dialog.querySelector("[data-anim='watermark']");
    const titleInner = dialog.querySelector("[data-anim='title-inner']");
    const metaItems = dialog.querySelectorAll("[data-anim='meta-item']");
    const rules = dialog.querySelectorAll("[data-anim='rule']");
    const bioLines = dialog.querySelectorAll("[data-anim='bio-line']");
    const quoteBlock = dialog.querySelector("[data-anim='quote']");

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        isClosingRef.current = false;
        setActive(null);
      },
    });

    // 第一阶段（0.00s - 0.25s）：右侧文字层率先逆序向上消散，此时左侧人物依然定格
    if (quoteBlock) {
      tl.to(
        quoteBlock,
        { autoAlpha: 0, y: -14, duration: 0.2, ease: "power2.in" },
        0,
      );
    }
    if (bioLines.length) {
      tl.to(
        bioLines,
        {
          autoAlpha: 0,
          y: -14,
          duration: 0.2,
          stagger: { each: 0.02, from: "end" },
          ease: "power2.in",
        },
        0.02,
      );
    }
    if (rules.length) {
      tl.to(
        rules,
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.24,
          ease: "power3.in",
        },
        0.04,
      );
    }
    if (titleInner) {
      tl.to(
        titleInner,
        { yPercent: -110, duration: 0.26, ease: "power3.in" },
        0.05,
      );
    }
    if (metaItems.length) {
      tl.to(
        metaItems,
        { autoAlpha: 0, y: -10, duration: 0.2, ease: "power2.in" },
        0.05,
      );
    }
    if (watermark) {
      tl.to(
        watermark,
        { autoAlpha: 0, x: 40, duration: 0.25, ease: "power2.in" },
        0.04,
      );
    }

    // 第二阶段（0.20s - 0.52s）：文字散尽后，人物镜头推远，鎏金快门与画框横向收拢
    if (photo) {
      tl.to(
        photo,
        {
          scale: 1.18,
          filter: "blur(6px) brightness(1.06)",
          duration: 0.34,
          ease: "power3.in",
        },
        0.18,
      );
    }
    if (shutter) {
      tl.fromTo(
        shutter,
        { scaleX: 0, transformOrigin: "right center" },
        { scaleX: 1, duration: 0.28, ease: "expo.inOut" },
        0.2,
      );
    }
    if (visualStage) {
      tl.to(
        visualStage,
        {
          clipPath: "inset(0% 100% 0% 0%)",
          duration: 0.32,
          ease: "expo.inOut",
        },
        0.22,
      );
    }
    tl.to(
      dialog,
      {
        autoAlpha: 0,
        scale: 0.96,
        yPercent: -48,
        duration: 0.28,
        ease: "power3.inOut",
      },
      0.26,
    );
    if (overlay) {
      tl.to(
        overlay,
        { autoAlpha: 0, duration: 0.28, ease: "power2.inOut" },
        0.26,
      );
    }
  }, []);

  // 入场五阶段剧场编排：人物率先破幕推轨 -> 巨型水印横移 -> 标题遮罩破土 -> 鎏金线延伸 -> 传记与宣言层叠显现
  useLayoutEffect(() => {
    if (!active || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const overlay = overlayRef.current;
    dialog.style.pointerEvents = "";
    isClosingRef.current = false;

    const mm = gsap.matchMedia();
    mm.add(
      {
        motionOk: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduced } = context.conditions as {
          motionOk: boolean;
          reduced: boolean;
        };

        const visualStage = dialog.querySelector("[data-anim='visual-stage']");
        const photo = dialog.querySelector<HTMLElement>("[data-anim='photo']");
        const shutter = dialog.querySelector("[data-anim='shutter']");
        const watermark = dialog.querySelector<HTMLElement>(
          "[data-anim='watermark']",
        );
        const titleInner = dialog.querySelector("[data-anim='title-inner']");
        const metaItems = dialog.querySelectorAll("[data-anim='meta-item']");
        const rules = dialog.querySelectorAll("[data-anim='rule']");
        const bioLines = dialog.querySelectorAll("[data-anim='bio-line']");
        const quoteBlock = dialog.querySelector("[data-anim='quote']");

        if (reduced) {
          gsap.set(
            [
              overlay,
              dialog,
              visualStage,
              photo,
              watermark,
              titleInner,
              metaItems,
              rules,
              bioLines,
              quoteBlock,
            ].filter(Boolean),
            { clearProps: "all" },
          );
          if (shutter) gsap.set(shutter, { scaleX: 0 });
          return;
        }

        // 初始化鼠标视差通道
        if (photo) {
          quickPhotoX.current = gsap.quickTo(photo, "x", {
            duration: 0.7,
            ease: "power3.out",
          });
          quickPhotoY.current = gsap.quickTo(photo, "y", {
            duration: 0.7,
            ease: "power3.out",
          });
        }
        if (watermark) {
          quickMarkX.current = gsap.quickTo(watermark, "x", {
            duration: 0.9,
            ease: "power3.out",
          });
          quickMarkY.current = gsap.quickTo(watermark, "y", {
            duration: 0.9,
            ease: "power3.out",
          });
        }

        const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

        // Stage 0 (0.00s): 暗夜毛玻璃幕布与剧场外框升起
        if (overlay) {
          tl.fromTo(
            overlay,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.45, ease: "power2.out" },
            0,
          );
        }
        tl.fromTo(
          dialog,
          { autoAlpha: 0, xPercent: -50, yPercent: -48, scale: 0.94 },
          {
            autoAlpha: 1,
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            duration: 0.65,
            ease: "expo.out",
          },
          0,
        );

        // Stage 1 (0.04s): 人物率先破幕动作（横向裁切拉开 + 鎏金快门掠过 + 镜头慢推对焦）
        if (visualStage) {
          tl.fromTo(
            visualStage,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.82,
              ease: "expo.inOut",
            },
            0.04,
          );
        }
        if (shutter) {
          tl.fromTo(
            shutter,
            { scaleX: 1, transformOrigin: "right center" },
            { scaleX: 0, duration: 0.78, ease: "expo.inOut" },
            0.12,
          );
        }
        if (photo) {
          tl.fromTo(
            photo,
            {
              scale: 1.28,
              x: -24,
              filter: "blur(8px) brightness(1.06)",
            },
            {
              scale: 1.04,
              x: 0,
              filter: "blur(0px) brightness(1)",
              duration: 1.2,
              ease: "expo.out",
            },
            0.06,
          );
        }

        // Stage 2 (0.36s): 滞后于人物动作，右侧背景巨型姓氏水印滑入
        if (watermark) {
          tl.fromTo(
            watermark,
            { autoAlpha: 0, x: 72 },
            { autoAlpha: 1, x: 0, duration: 0.95, ease: "expo.out" },
            0.36,
          );
        }

        // Stage 3 (0.44s): 顶部档案栏点亮 + 姓名大标题从遮罩线下方破土而出 + 鎏金刻度线延展
        if (metaItems.length) {
          tl.fromTo(
            metaItems,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.52,
              stagger: 0.06,
              ease: "power3.out",
            },
            0.42,
          );
        }
        if (titleInner) {
          tl.fromTo(
            titleInner,
            { yPercent: 115, rotateZ: 1.5 },
            {
              yPercent: 0,
              rotateZ: 0,
              duration: 0.82,
              ease: "expo.out",
            },
            0.46,
          );
        }
        if (rules.length) {
          tl.fromTo(
            rules,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.72,
              stagger: 0.1,
              ease: "expo.out",
            },
            0.54,
          );
        }

        // Stage 4 (0.62s): 传记正文段落与底部宣言逐层呼吸浮现
        if (bioLines.length) {
          tl.fromTo(
            bioLines,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
              stagger: 0.075,
              ease: "power3.out",
            },
            0.62,
          );
        }
        if (quoteBlock) {
          tl.fromTo(
            quoteBlock,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" },
            0.78,
          );
        }
      },
      dialog,
    );

    return () => {
      mm.revert();
    };
  }, [active]);

  const handlePointerEnter = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (isClosingRef.current) return;
      const rect = event.currentTarget.getBoundingClientRect();
      dialogRectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (isClosingRef.current) return;
      let rect = dialogRectRef.current;
      if (!rect) {
        const domRect = event.currentTarget.getBoundingClientRect();
        rect = {
          left: domRect.left,
          top: domRect.top,
          width: domRect.width,
          height: domRect.height,
        };
        dialogRectRef.current = rect;
      }
      if (!rect.width || !rect.height) return;
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;

      quickPhotoX.current?.(relX * -14);
      quickPhotoY.current?.(relY * -10);
      quickMarkX.current?.(relX * 26);
      quickMarkY.current?.(relY * 16);
    },
    [],
  );

  const handlePointerLeave = useCallback(() => {
    dialogRectRef.current = null;
    quickPhotoX.current?.(0);
    quickPhotoY.current?.(0);
    quickMarkX.current?.(0);
    quickMarkY.current?.(0);
  }, []);

  return (
    <Dialog.Root
      open={active !== null}
      modal={false}
      onOpenChange={(open) => {
        if (!open) requestClose();
      }}
    >
      <div className="roster-panels">
        {rosterCollections.map((collection, index) => {
          if (collection.kind === "group")
            return index === firstGroupIndex ? (
              <GroupGallery key="groups" onOpen={openMember} />
            ) : null;
          if (collection.kind === "teachers")
            return (
              <TeacherSection key={collection.id} collection={collection} />
            );
          return (
            <section
              className="roster-collection"
              key={collection.id}
              aria-labelledby={`roster-${collection.id}`}
            >
              <h3 id={`roster-${collection.id}`}>{collection.title}</h3>
              <div className="roster-people">
                {collection.members.map((member) => (
                  <PersonCard
                    member={member}
                    key={member.id}
                    onOpen={openMember}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <Dialog.Portal>
        <div
          ref={overlayRef}
          className="roster-dialog-overlay"
          onClick={requestClose}
          aria-hidden="true"
        />
        <Dialog.Content
          ref={dialogRef}
          className="roster-dialog"
          aria-describedby={undefined}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onEscapeKeyDown={(event) => {
            event.preventDefault();
            requestClose();
          }}
          onPointerDownOutside={(event) => {
            event.preventDefault();
            requestClose();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus({ preventScroll: true });
          }}
        >
          {active ? (
            <>
              {/* 左侧栏：100% 零边距全出血肖像碑体（裁剪顶部空白天空，完整保留面部与底部院徽手牌） */}
              <aside
                data-anim="visual-stage"
                className="roster-dialog__visual"
              >
                <img
                  data-anim="photo"
                  className="roster-dialog__photo"
                  src={rosterAssets[active.image]}
                  alt={active.name}
                />
                <span
                  data-anim="shutter"
                  className="roster-dialog__shutter"
                  aria-hidden="true"
                />
              </aside>

              {/* 右侧栏：暗夜黑金高定人物志舞台 */}
              <div className="roster-dialog__editorial">
                <span
                  data-anim="watermark"
                  className="roster-dialog__watermark"
                  aria-hidden="true"
                >
                  {watermarkWord}
                </span>

                <div className="roster-dialog__topbar">
                  <div
                    data-anim="meta-item"
                    className="roster-dialog__kicker"
                  >
                    <span className="roster-dialog__kicker-role">
                      {collectionTitle &&
                      collectionTitle.toLowerCase() !==
                        active.role.toLowerCase()
                        ? `${collectionTitle} · ${active.role}`
                        : active.role}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="roster-dialog__close"
                    aria-label="Close profile"
                    onClick={requestClose}
                  >
                    <X size={18} />
                  </button>
                </div>

                <header className="roster-dialog__header">
                  <Dialog.Title className="roster-dialog__title-mask">
                    <span
                      data-anim="title-inner"
                      className="roster-dialog__title-inner"
                    >
                      {active.name}
                    </span>
                  </Dialog.Title>

                  {active.tagline ? (
                    <p
                      data-anim="meta-item"
                      className="roster-dialog__tagline"
                    >
                      {renderInlineFormatting(active.tagline)}
                    </p>
                  ) : null}

                  <div
                    data-anim="rule"
                    className="roster-dialog__rule"
                    aria-hidden="true"
                  />
                </header>

                <div className="roster-dialog__body" tabIndex={0}>
                  <div className="roster-dialog__bio">
                    {active.bio?.map((paragraph, index) => (
                      <p data-anim="bio-line" key={index}>
                        {renderInlineFormatting(paragraph)}
                      </p>
                    ))}
                  </div>
                </div>

                {active.quote ? (
                  <footer
                    data-anim="quote"
                    className="roster-dialog__manifesto"
                  >
                    <div
                      data-anim="rule"
                      className="roster-dialog__rule roster-dialog__rule--subtle"
                      aria-hidden="true"
                    />
                    <div className="roster-dialog__manifesto-inner">
                      <blockquote className="roster-dialog__quote">
                        {active.quote.split("\n").map((line, index) =>
                          line.startsWith("—") || line.startsWith("--") ? (
                            <cite key={index} className="roster-dialog__cite">
                              {renderInlineFormatting(line)}
                            </cite>
                          ) : (
                            <span
                              key={index}
                              className="roster-dialog__quote-text"
                            >
                              {renderInlineFormatting(line)}
                            </span>
                          ),
                        )}
                      </blockquote>
                    </div>
                  </footer>
                ) : null}
              </div>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function rosterFeatures(): Record<string, ReactNode> {
  return { roster: <RosterPanels /> };
}