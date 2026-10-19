import { RestartExperimentButton, ExperimentCompletion } from '../components/ExperimentControls';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, Lightbulb } from 'lucide-react';
import { Experiment4InfoPanel } from '../components/Experiment4InfoPanel';
import { StepIndicator } from '../components/StepIndicator';
import type { ExperimentStep } from '../types';

interface ExperimentPageProps {
  experimentId?: string;
  onBack: () => void;
  onRestart: () => void;
}

interface FrameLayout {
  scaleX: number;
  scaleY: number;
}

const steps: ExperimentStep[] = [
  {
    id: 1,
    title: "Locate and Excise the Band",
    description: "Place the gel in the imager, locate the 720 bp band under UV, cut it out with a blade, trim excess gel and transfer to a tube.",
    highlightItems: [],
    animationType: 'move',
    completed: false,
  },
  {
    id: 2,
    title: "Dissolve the Gel",
    description: "Add solubilization buffer at a 1:3 ratio. Heat at 55°C and mix every 2 min until the gel dissolves and the solution is clear.",
    highlightItems: [],
    animationType: 'heat',
    completed: false,
  },
  {
    id: 3,
    title: "Bind and Centrifuge",
    description: "Transfer the solution to a binding column, leave for 2 min, spin for 30 s, discard the flow-through and return the column to its tube.",
    highlightItems: [],
    animationType: 'move',
    completed: false,
  },
  {
    id: 4,
    title: "Wash and Remove Ethanol",
    description: "Add 600 μL wash buffer, spin for 30 s and discard the flow-through. Spin the empty column for 2 min to remove ethanol.",
    highlightItems: [],
    animationType: 'wait',
    completed: false,
  },
  {
    id: 5,
    title: "Elute and Collect DNA",
    description: "Place the column in a new tube. Add 15–30 μL elution buffer at 55°C, leave for 5 min and spin for 2 min to collect purified DNA.",
    highlightItems: [],
    animationType: 'place',
    completed: false,
  },
];

const pptActions = [
  "Move the gel to the gel imager",
  "Start imaging and locate the 720 bp target band",
  "Cut out the target band with a clean blade",
  "Trim excess gel and place the gel slice in a tube",
  "Confirm excision and proceed to gel dissolution",
  "Select solubilization buffer and a micropipette",
  "Add solubilization buffer at a 1:3 ratio",
  "Place the sample in a 55°C water bath",
  "Mix every 2 min until the gel dissolves completely",
  "Confirm the solution is clear and proceed to binding",
  "Transfer all dissolved sample to the binding column",
  "Leave for 2 min to allow DNA binding",
  "Place the column and collection tube in the centrifuge",
  "Centrifuge for 30 s",
  "Remove the column and collection tube",
  "Discard the flow-through and return the column to the tube",
  "Add 600 μL wash buffer to the column",
  "Place the washed column in the centrifuge",
  "Centrifuge for 30 s to complete washing",
  "Remove the column and collection tube",
  "Discard the wash flow-through and return the column to the tube",
  "Spin the empty column for 2 min to remove residual ethanol",
  "Move the column to a new collection tube",
  "Preheat elution buffer to 55°C",
  "Add 15–30 μL elution buffer",
  "Leave for 5 min",
  "Centrifuge for 2 min to collect the eluate",
  "Remove the column and retain the eluate in the collection tube",
  "Aspirate the eluate with a pipette",
  "Collect and confirm purified DNA",
] as const;

const stageThresholds = [5, 10, 16, 22, 30];
const totalPptActions = pptActions.length;
const pptTargetAssets = [
  'img26.avif',
  'img26.avif',
  'img39.avif',
  'img42.avif',
  'img45.avif',
  'img42.avif',
  'img50.avif',
  'img53.avif',
  'img58.avif',
  'img42.avif',
  'img50.avif',
  'img62.avif',
  'img63.avif',
  'img65.avif',
  'img66.avif',
  'img42.avif',
  'img50.avif',
  'img63.avif',
  'img65.avif',
  'img66.avif',
  'img63.avif',
  'img42.avif',
  'img42.avif',
  'img53.avif',
  'img77.avif',
  'img79.avif',
  'img63.avif',
  'img42.avif',
  'img77.avif',
  'img87.avif',
] as const;

// 原 PPT 播放器画布为 960 × 540；裁掉其左侧步骤栏和底部说明栏，
// 中间实验区保持 PPT 原始坐标、图层与动画。
const pptCrop = {
  x: 118,
  y: 12,
  width: 742,
  height: 416,
};

// React recognizes the legacy camelCase prop but does not emit it. Passing the
// lowercase attribute through a spread preserves the iframe transparency flag.
const transparentIframeProps = {
  allowtransparency: 'true',
} as const;

function stageFromInteractionCount(count: number) {
  const stage = stageThresholds.findIndex((threshold) => count < threshold);
  return stage === -1 ? steps.length - 1 : stage;
}

export function ExperimentPage({ onBack, onRestart }: ExperimentPageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sceneViewportRef = useRef<HTMLDivElement>(null);
  const detachFrameListenerRef = useRef<() => void>(() => undefined);
  const [frameRevision, setFrameRevision] = useState(0);
  const [frameStartAction, setFrameStartAction] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [interactionCount, setInteractionCount] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [frameBusy, setFrameBusy] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const [frameLayout, setFrameLayout] = useState<FrameLayout>({
    scaleX: 1,
    scaleY: 1,
  });

  const experimentComplete = interactionCount >= totalPptActions;
  const currentActionNumber = Math.min(interactionCount + 1, totalPptActions);
  const currentActionTitle = experimentComplete
    ? "Purified DNA collected. Experiment complete."
    : pptActions[currentActionNumber - 1];
  const currentStepData = steps[Math.min(currentStep, steps.length - 1)];
  const sidebarStepIndex = hoveredStep ?? (currentStep === 0 ? 0 : Math.min(currentStep - 1, steps.length - 1));
  const sidebarStepData = steps[sidebarStepIndex];

  const syncPlayerPosition = useCallback((actionIndex: number) => {
    const next = Math.min(totalPptActions, Math.max(0, actionIndex));
    const nextStage = stageFromInteractionCount(next);
    setInteractionCount(next);
    setCurrentStep(nextStage);
    setCompletedSteps(next >= totalPptActions ? steps.map((_, index) => index) : Array.from({ length: nextStage }, (_, index) => index));
  }, []);

  const handleFrameLoad = useCallback(() => {
    detachFrameListenerRef.current();
    setFrameReady(false);
    const frame = iframeRef.current;
    if (!frame) return;

    try {
      const frameDocument = frame.contentDocument;
      if (!frameDocument) return;
      frame.contentWindow?.focus();

      const existingStyle = frameDocument.getElementById('experiment-four-fullscreen-overrides');
      if (!existingStyle) {
        const style = frameDocument.createElement('style');
        style.id = 'experiment-four-fullscreen-overrides';
        style.textContent = `
          #playerView .slide > *:has(img[src$="/img5.avif"]) {
            z-index: 2147483000 !important;
          }

          #experiment-four-click-gate {
            position: absolute;
            inset: 0;
            z-index: 2147483646;
            cursor: default;
          }

          #experiment-four-target-hotspot {
            position: absolute;
            padding: 0;
            border: 0;
            cursor: pointer;
            background: transparent;
          }

          #experiment-four-target-hotspot:disabled {
            cursor: default;
          }
        `;
        frameDocument.head.appendChild(style);
      }

      const playerView = frameDocument.querySelector<HTMLElement>('#playerView');
      if (!playerView) return;
      playerView.style.position = 'relative';

      const clickGate = frameDocument.createElement('div');
      clickGate.id = 'experiment-four-click-gate';
      const targetHotspot = frameDocument.createElement('button');
      targetHotspot.id = 'experiment-four-target-hotspot';
      targetHotspot.type = 'button';
      targetHotspot.setAttribute('aria-label', "Current yellow-highlighted interaction target");
      clickGate.appendChild(targetHotspot);
      clickGate.addEventListener('click', (event) => event.stopPropagation());
      playerView.appendChild(clickGate);

      let frameActionIndex = frameStartAction;
      const findCurrentTarget = () => {
        const expectedAsset = pptTargetAssets[frameActionIndex];
        if (!expectedAsset) return undefined;

        return Array.from(
          frameDocument.querySelectorAll<HTMLImageElement>('#playerView .slide img'),
        ).filter((image) => {
          const style = frame.contentWindow?.getComputedStyle(image);
          const rect = image.getBoundingClientRect();
          const assetName = image.src.split('/').pop() ?? '';
          return assetName === expectedAsset
            && style?.display !== 'none'
            && style?.visibility !== 'hidden'
            && style?.opacity !== '0'
            && rect.width > 0
            && rect.height > 0;
        }).at(-1);
      };

      let clickLocked = false;
      let unlockTimer = 0;
      const lockTargetHotspot = (delay: number) => {
        clickLocked = true;
        setFrameBusy(true);
        targetHotspot.disabled = true;
        window.clearTimeout(unlockTimer);
        unlockTimer = window.setTimeout(() => {
          clickLocked = false;
          setFrameBusy(false);
          refreshTargetHotspot();
        }, delay);
      };
      const refreshTargetHotspot = () => {
        const target = findCurrentTarget();
        targetHotspot.hidden = !target;
        targetHotspot.disabled = clickLocked || !target;
        if (!target) return;

        const targetRect = target.getBoundingClientRect();
        const playerRect = playerView.getBoundingClientRect();
        const padding = 8;
        targetHotspot.style.left = `${targetRect.left - playerRect.left - padding}px`;
        targetHotspot.style.top = `${targetRect.top - playerRect.top - padding}px`;
        targetHotspot.style.width = `${targetRect.width + padding * 2}px`;
        targetHotspot.style.height = `${targetRect.height + padding * 2}px`;
      };

      targetHotspot.addEventListener('click', (event) => {
        event.stopPropagation();
        if (clickLocked) return;
        const target = findCurrentTarget();
        if (!target) return;

        lockTargetHotspot(1100);
        const targetRect = target.getBoundingClientRect();
        target.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: frame.contentWindow,
          clientX: targetRect.left + targetRect.width / 2,
          clientY: targetRect.top + targetRect.height / 2,
        }));
      });

      refreshTargetHotspot();
      const readSlideId = () => frameDocument.querySelector<HTMLElement>('#playerView .slide')?.id ?? null;
      let frameRevealScheduled = false;
      let frameRevealTimer = 0;
      const revealFrameIfReady = () => {
        if (frameRevealScheduled || !initialSlideReady || !readSlideId() || !findCurrentTarget()) return;
        frameRevealScheduled = true;
        frameRevealTimer = window.setTimeout(() => {
          requestAnimationFrame(() => setFrameReady(true));
        }, 2000);
      };
      let initialSlideReady = false;
      const refreshFrameState = () => {
        const controller = (frame.contentWindow as Window & { experiment4Controller?: { currentSlideIndex: () => number } } | null)?.experiment4Controller;
        const index = controller?.currentSlideIndex();
        if (index === undefined || !Number.isInteger(index) || index < 0 || index > totalPptActions) return;
        if (!initialSlideReady && index !== frameStartAction) return;
        initialSlideReady = true;
        if (index !== frameActionIndex) {
          frameActionIndex = index;
          syncPlayerPosition(index);
          const delay = index === 7 || index === 11 ? 6500 : [9, 17, 25, 29].includes(index) ? 4500 : 3000;
          lockTargetHotspot(delay);
        }
        refreshTargetHotspot();
        revealFrameIfReady();
      };
      const observer = new MutationObserver(refreshFrameState);
      observer.observe(frameDocument.body, { childList: true, subtree: true });
      const readinessPoll = window.setInterval(refreshFrameState, 100);
      detachFrameListenerRef.current = () => {
        observer.disconnect();
        window.clearInterval(readinessPoll);
        window.clearTimeout(unlockTimer);
        window.clearTimeout(frameRevealTimer);
        clickGate.remove();
      };
      refreshFrameState();
    } catch {
      detachFrameListenerRef.current = () => undefined;
      setFrameReady(true);
    }
  }, [syncPlayerPosition, frameStartAction]);

  useEffect(() => () => detachFrameListenerRef.current(), []);

  useEffect(() => {
    const viewport = sceneViewportRef.current;
    if (!viewport) return;

    const updateFrameLayout = () => {
      setFrameLayout({
        scaleX: viewport.clientWidth / pptCrop.width,
        scaleY: viewport.clientHeight / pptCrop.height,
      });
    };

    updateFrameLayout();
    const observer = new ResizeObserver(updateFrameLayout);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const handleStepNavigation = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length || stepIndex > currentStep || !frameReady || frameBusy) return;
    const targetAction = stepIndex === 0 ? 0 : stageThresholds[stepIndex - 1];
    detachFrameListenerRef.current();
    setFrameReady(false);
    setFrameStartAction(targetAction);
    setInteractionCount(targetAction);
    setCurrentStep(stepIndex);
    setCompletedSteps(Array.from({ length: stepIndex }, (_, index) => index));
    setHoveredStep(null);
    setFrameRevision((revision) => revision + 1);
  };

  const stepItems = useMemo(
    () => steps.map((step, index) => ({
      ...step,
      active: index === currentStep,
      complete: completedSteps.includes(index),
    })),
    [completedSteps, currentStep],
  );

  return (
    <div className="experiment-shell flex h-screen w-screen flex-col overflow-hidden font-sans text-white">
      <header className="z-50 flex h-12 shrink-0 items-center justify-between lab-topbar px-4">
        <div className="flex min-w-0 items-center gap-3">
          <ChevronLeft className="shrink-0 cursor-pointer text-blue-200 hover:text-white" onClick={onBack} />
          <h1 className="truncate text-xs font-bold uppercase tracking-widest text-white">
            Experiment 4: Gel Extraction of the GFP Gene Fragment
          </h1>
        </div>
        <RestartExperimentButton onRestart={onRestart} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto lab-steps-rail p-3 lg:flex">
          {!experimentComplete && sidebarStepData && (
            <div className="mb-4 shrink-0 lab-hint-card p-3">
              <div className="mb-1 flex items-center gap-2 text-blue-200">
                <Lightbulb className="h-3 w-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {hoveredStep !== null ? `STEP ${hoveredStep + 1}` : currentStep === 0 ? 'STEP 1' : `Previous · STEP ${currentStep}`}
                </span>
              </div>
              <h3 className="mb-1 text-xs font-bold text-white">{sidebarStepData.title}</h3>
              <p className="text-[11px] leading-relaxed text-blue-200">{sidebarStepData.description}</p>
            </div>
          )}
          <StepIndicator
            steps={stepItems}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepNavigation}
            onStepHover={setHoveredStep}
          />
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col items-center justify-start gap-2 overflow-hidden lab-bench p-3">
          <div
            ref={sceneViewportRef}
            data-testid="experiment-ppt-viewport"
            className="relative w-full max-w-full shrink-0 overflow-hidden bg-[#4f83d1] lab-canvas-frame"
            style={{ aspectRatio: `${pptCrop.width} / ${pptCrop.height}` }}
          >
            <div
              data-testid="experiment-scene-canvas"
              className="absolute overflow-hidden"
              style={{
                left: 0,
                top: 0,
                width: pptCrop.width,
                height: pptCrop.height,
                transformOrigin: '0 0',
                transform: `scale(${frameLayout.scaleX}, ${frameLayout.scaleY})`,
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  {...transparentIframeProps}
                  ref={iframeRef}
                  key={frameRevision}
                  src={`./experiment4_html/index.html?startslide=${frameStartAction}&resume=0`}
                  data-testid="experiment-ppt-frame"
                  className={`absolute max-w-none border-0 transition-opacity duration-150 ${
                    frameReady ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                  style={{
                    left: -pptCrop.x,
                    top: -pptCrop.y,
                    width: 984,
                    height: 564,
                  }}
                  title="Virtual Laboratory Experiment 4: GFP Gel Extraction"
                  allow="autoplay; fullscreen"
                  onLoad={handleFrameLoad}
                />
                <img
                  src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/preview/first-frame.avif"
                  alt=""
                  aria-hidden="true"
                  fetchPriority="high"
                  className={`pointer-events-none absolute inset-0 z-10 h-full w-full object-fill transition-opacity duration-150 ${
                    frameReady || frameStartAction !== 0 ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>
            </div>
            {experimentComplete && <ExperimentCompletion onRestart={onRestart} onBack={onBack} />}
          </div>

          {currentStepData && !experimentComplete && (
            <div className="flex min-h-[145px] w-full flex-1 flex-col px-1 pt-1 text-left">
              <div className="lab-step-caption mb-2 flex items-center gap-2 text-sm font-bold">
                <span className="text-blue-400">Step {currentStep + 1}/{steps.length}</span>
                <span className="text-blue-500">|</span>
                <span className="text-blue-400">{currentStepData.title}</span>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center lab-note-card px-6 py-5 text-center text-base leading-relaxed">
                {currentActionTitle}
              </div>
            </div>
          )}
        </main>

        <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto lab-info-rail p-3 xl:flex">
          <Experiment4InfoPanel />
        </aside>
      </div>

      <div className="fixed inset-0 z-[2000] hidden flex-col items-center justify-center lab-rotate-overlay px-8 text-center text-white portrait:flex lg:hidden">
        <div className="mb-4 text-4xl">🔄</div>
        <h2 className="text-xl font-bold">Rotate Your Device to Landscape</h2>
      </div>
    </div>
  );
}
