import { RestartExperimentButton, ExperimentCompletion } from '../components/ExperimentControls';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Lightbulb } from 'lucide-react';
import { Experiment9InfoPanel } from '../components/Experiment9InfoPanel';
import { StepIndicator } from '../components/StepIndicator';
import type { ExperimentStep } from '../types';
import publishedPages from '../data/experiment9Published.json';

interface ExperimentPageProps {
  experimentId?: string;
  onBack: () => void;
  onRestart: () => void;
}

const steps: ExperimentStep[] = [
  { id: 1, title: "Prepare PCR Mix", description: "Add ddH₂O, forward primer, reverse primer and 2× Taq PCR Master Mix to a sterile PCR tube. Mix gently and change tips after each reagent.", highlightItems: ['tip-box'], animationType: 'move', completed: false },
  { id: 2, title: "Pick a Colony as Template", description: "Flame-sterilize and cool the loop, then pick a candidate colony and dip it into the PCR mix. Include negative and positive controls.", highlightItems: ['alcohol-lamp'], animationType: 'move', completed: false },
  { id: 3, title: "PCR Amplification", description: "Load the thermal cycler: 94°C for 5 min; 30 cycles of 94°C, 58°C and 72°C for 30 s each; 72°C for 10 min; hold at 4°C.", highlightItems: ['pcr-machine'], animationType: 'heat', completed: false },
  { id: 4, title: "Verify by Electrophoresis", description: "Mix PCR product with loading buffer and run agarose gel electrophoresis at 120 V for 25 min with a DL2000 ladder. Image under UV.", highlightItems: ['electrophoresis'], animationType: 'move', completed: false },
  { id: 5, title: "IPTG Induction", description: "Inoculate a positive clone into 5 mL LB with kanamycin. Shake at 37°C to OD600 0.6–0.8, then add IPTG and induce for 4–6 h.", highlightItems: ['shaker'], animationType: 'wait', completed: false },
  { id: 6, title: "Observe Fluorescence", description: "Place 10 μL induced culture on a slide and add a coverslip. Observe green fluorescence with 488 nm excitation and compare with an uninduced control.", highlightItems: ['microscope'], animationType: 'place', completed: false },
  { id: 7, title: "Prepare Protein Sample", description: "Centrifuge 1 mL induced culture, resuspend in 100 μL saline, add 25 μL 5× SDS loading buffer and boil for 10 min.", highlightItems: ['centrifuge'], animationType: 'move', completed: false },
  { id: 8, title: "Prepare SDS-PAGE Gel", description: "Cast a 12% resolving gel followed by a 5% stacking gel. Assemble the tank using the standard procedure, add 1× SDS running buffer and insert the comb.", highlightItems: ['gel-caster'], animationType: 'move', completed: false },
  { id: 9, title: "Load and Run Proteins", description: "Load 20 μL protein sample and a protein ladder. Run at 80 V then 120 V until the dye front reaches the bottom.", highlightItems: ['electrophoresis'], animationType: 'move', completed: false },
  { id: 10, title: "Stain, Destain and Observe", description: "Stain with Coomassie Brilliant Blue R-250 for 2 h, then destain and observe the GFP band at approximately 27 kDa.", highlightItems: ['staining-tray'], animationType: 'wait', completed: false },
];

const stepStarts = [0,2,8,9,29,37,42,57,61,65];
const crop = { x: 148, y: 0, width: 985, height: 558 };
interface FrameMetrics { left: number; top: number; width: number }

export function ExperimentPage({ onBack, onRestart }: ExperimentPageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pendingSlideRef = useRef<number | null>(null);
  const detachFrameRef = useRef<() => void>(() => undefined);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [frameStartSlide, setFrameStartSlide] = useState(0);
  const [experimentComplete, setExperimentComplete] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [revision, setRevision] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(crop.width);
  const [metrics, setMetrics] = useState<FrameMetrics>({ left: 8, top: 8, width: 1280 });
  const currentPage = publishedPages[slideIndex] ?? publishedPages[0];
  const currentStep = currentPage.step;
  const completedSteps = Array.from({ length: experimentComplete ? steps.length : currentStep }, (_, index) => index);
  const sidebarStepIndex = hoveredStep ?? (currentStep === 0 ? 0 : Math.min(currentStep - 1, steps.length - 1));
  const sidebarStepData = steps[sidebarStepIndex];
  const slideScale = metrics.width / 1280;
  const scale = viewportWidth / (crop.width * slideScale);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const resize = () => setViewportWidth(viewport.clientWidth);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === 'experiment9-player-error') { setLoadFailed(true); return; }
      if (data?.type !== 'experiment9-player') return;
      if (Number.isInteger(data.index) && data.index >= 0 && data.index < publishedPages.length) {
        setSlideIndex(data.index);
      }
      if (data.metrics?.width > 0) {
        setMetrics((previous) => previous.left === data.metrics.left && previous.top === data.metrics.top
          && previous.width === data.metrics.width ? previous : data.metrics);
        if (data.ready === true) setReady(true);
        setLoadFailed(false);
        if (pendingSlideRef.current !== null) {
          event.source?.postMessage({ type: 'experiment9-goto', index: pendingSlideRef.current }, { targetOrigin: window.location.origin });
          pendingSlideRef.current = null;
        }
      }
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, []);

  const goToStep = (index: number) => {
    if (index < 0 || index >= steps.length || index > currentStep || !ready) return;
    const target = stepStarts[index];
    detachFrameRef.current();
    pendingSlideRef.current = null;
    setReady(false);
    setLoadFailed(false);
    setExperimentComplete(false);
    setHoveredStep(null);
    setSlideIndex(target);
    setFrameStartSlide(target);
    setRevision((value) => value + 1);
  };
  const handleFrameLoad = () => {
    detachFrameRef.current();
    const frame = iframeRef.current;
    const document = frame?.contentDocument;
    if (!frame || !document) return;
    frame.contentWindow?.focus();
    const readCanvas = () => {
      const canvas = document.getElementById('playerView');
      const rect = canvas?.getBoundingClientRect();
      const hasImage = Array.from(canvas?.querySelectorAll('img') ?? []).some((image) => image.getBoundingClientRect().width > 0);
      if (!rect || rect.width === 0 || !hasImage) return;
      setMetrics({ left: rect.left, top: rect.top, width: rect.width });
      setLoadFailed(false);
      if (pendingSlideRef.current !== null) {
        frame.contentWindow?.postMessage({ type: 'experiment9-goto', index: pendingSlideRef.current }, window.location.origin);
        pendingSlideRef.current = null;
      }
      detachFrameRef.current();
    };
    const observer = new MutationObserver(readCanvas);
    observer.observe(document.body, { childList: true, subtree: true });
    const poll = window.setInterval(readCanvas, 100);
    detachFrameRef.current = () => { observer.disconnect(); window.clearInterval(poll); };
    readCanvas();
  };
  useEffect(() => () => detachFrameRef.current(), []);

  

  return (
    <div className="experiment-shell flex h-screen w-screen flex-col overflow-hidden font-sans text-white">
      <header className="z-50 flex h-12 shrink-0 items-center justify-between lab-topbar px-4">
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" aria-label="Back" onClick={onBack}><ChevronLeft className="h-5 w-5 text-blue-200" /></button>
          <h1 className="truncate text-xs font-bold text-white">Experiment 9: Colony PCR, GFP Fluorescence and Protein Expression</h1>
        </div>
        <RestartExperimentButton onRestart={onRestart} />
      </header>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto lab-steps-rail p-3 lg:flex">
          {!experimentComplete && (
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
          <StepIndicator steps={steps} currentStep={currentStep} completedSteps={completedSteps} onStepClick={goToStep} onStepHover={setHoveredStep} />
        </aside>
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto lab-bench p-3">
          <div ref={viewportRef} className="relative w-full shrink-0 overflow-hidden bg-[#4472c4] lab-canvas-frame" style={{ aspectRatio: crop.width + ' / ' + crop.height }}>
            {!ready && <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment9/preview/first-frame.avif" alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 h-full w-full object-fill" />}
            <iframe key={revision} ref={iframeRef} src={`./experiment9-assets/ispring/index.html?v=6&resume=0&startslide=${frameStartSlide}`} onLoad={handleFrameLoad} title="Experiment 9 Interactive Procedure" allow="autoplay; fullscreen" className="absolute max-w-none border-0" style={{
              width: 1296, height: 864, transformOrigin: '0 0', transform: 'scale(' + scale + ')',
              left: -(metrics.left + crop.x * slideScale) * scale,
              top: -(metrics.top + crop.y * slideScale) * scale,
              opacity: ready ? 1 : 0,
              pointerEvents: ready ? 'auto' : 'none',
            }} />
            {!ready && <div role="status" className="absolute bottom-3 left-1/2 -translate-x-1/2 lab-toast px-4 py-2 text-xs">{loadFailed ? "Experiment failed to load. Click Restart in the top-right corner." : 'Loading experiment…'}</div>}
            {ready && slideIndex === publishedPages.length - 1 && !experimentComplete && (
              <button type="button" aria-label="Finish experiment" onClick={() => setExperimentComplete(true)} className="absolute inset-0 z-20 flex items-end justify-center pb-3">
                <span className="lab-toast px-4 py-2 text-xs">Click the result to finish the experiment</span>
              </button>
            )}
            {experimentComplete && <ExperimentCompletion onRestart={onRestart} onBack={onBack} />}
          </div>
          {!experimentComplete && <div className="mt-3 flex min-h-[120px] flex-1 flex-col gap-2">
            <div className="lab-step-caption flex items-center justify-between text-sm font-bold">
              <span>Step {currentStep + 1}/{steps.length} · {steps[currentStep].title}</span>
              <span className="text-xs font-normal text-blue-200">{slideIndex + 1}/{publishedPages.length}</span>
            </div>
            <div className="flex flex-1 items-center justify-center lab-note-card px-6 py-4 text-center text-sm leading-relaxed">{currentStep === 2 ? steps[2].description : currentPage.prompt}</div>
          </div>}
        </main>
        <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto lab-info-rail p-3 xl:flex"><Experiment9InfoPanel /></aside>
      </div>
      <div className="fixed inset-0 z-[2000] hidden flex-col items-center justify-center lab-rotate-overlay px-8 text-center text-white portrait:flex lg:hidden"><div className="mb-4 text-4xl">🔄</div><h2 className="text-xl font-bold">Rotate Your Device to Landscape</h2></div>
    </div>
  );
}

