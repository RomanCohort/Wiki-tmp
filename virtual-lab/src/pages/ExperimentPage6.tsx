import { useStepSnapshots } from '../hooks/use-step-snapshots';
import { RestartExperimentButton, ExperimentCompletion } from '../components/ExperimentControls';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, Lightbulb } from 'lucide-react';

import { StepIndicator } from '../components/StepIndicator';
import { Experiment6InfoPanel } from '../components/Experiment6InfoPanel';
import { LabeledTubeArtwork, type TubeLabelShape } from '../components/LabeledTubeArtwork';
import type { ExperimentStep } from '../types';
import gsap from 'gsap';

interface ExperimentPageProps {
  onBack: () => void;
  onRestart: () => void;
}

const pptAssets = {
  tipBoxBlueClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-75fb523d39d18568.webp',
  tipBoxBlueOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-17db739bc400d7ce.webp',
  tipBoxWhiteOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-3de241e5208e7d39.webp',
  flaskPowder: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-1d706b2ea8208a80.webp',
  flaskSolution: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-9002171b0b0b29af.webp',
  flaskRed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-103be167040efd4c.webp',
  gelMold: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-9f92c4ae674f3513.webp',
  gelTank: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-0a2f99f832c22e79.webp',
  loadingGuide: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-380d68185189ff16.webp',
  gelExploded: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-3d614d4d4223bcd5.webp',
  gelPowered: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-43f5b8fe4cebd34a.webp',
  gelLoaded: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-01c488dfe88b2ce0.webp',
  gelBands: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-fee590d9f52bbec3.webp',
  agaroseBottle: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-347ce2986cf73531.webp',
  bamHI: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-93ba2cef2750032e.webp',
  bindingBuffer: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-bf7cd3cf580630f3.webp',
  ddH2O: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-56b12eb83efff1a6.webp',
  dnaMarker: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-ad990e63e245c581.webp',
  doubleBuffer: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-684eddaf874b7848.webp',
  elutionBuffer: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-de63299dfd9739e3.webp',
  gelRedBottle: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-60e910ce2190cd70.webp',
  gfpProduct: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-56b12eb83efff1a6.webp',
  hindIII: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-06fd4748007e1d6c.webp',
  pet28a: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-dd769cf8c0d4b5ba.webp',
  reactionTube: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/reactiontube.webp',
  uvCabinet: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/uvcabinet.webp',
  washBuffer: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-8ab00e2c1464fd31.webp',
  centrifuge: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/centrifuge.webp',
  comb: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-ceec7239e57c86a5.webp',
  pipette: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/pipette.webp',
  powerSupply: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-2dafaca3f11b7891.webp',
  tubeRack: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-40b2da8d46edd157.webp',
  waterBath: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-8aec11027accff2d.webp',
  gelApparatus: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-e8c78eb474b39664.webp',
  iceBox: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-8fa414a62f6c3555.webp',
  labTable: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/labtable.webp',
  metalTray: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-913d57913476a4f1.webp',
  spinColumn: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-85b78c17135d161c.webp',
  spoon: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-a30ed5e7f99759f1.webp',
  taeBeaker: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-bb541d2ac2db466a.webp',
  taeJug: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-e3b51416ae732e11.webp',
  tipsOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-24d6381d3cac3112.webp',
  cleanBenchSmall: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-f576e70290416287.webp',
  tipsClosedSmall: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-64669b0fd48e03fe.webp',
} as const;

const stepReagentAssets = {
  washBuffer: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/embedded/experiment6-inline-ce13a51e0fe3a99c.avif',
  elutionBuffer: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/image20.avif',
} as const;

void stepReagentAssets;

const experiment3Assets = {
  pipette: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette.avif',
  pipetteBodyBlue: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette1-1.avif',
  pipetteTipBlue: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette1-2.avif',
  pipetteBodyWhite: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette3-1.avif',
  pipetteTipWhite: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette3-2.avif',
  tipBoxBlueClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxclosed1.avif',
  tipBoxBlueOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxopen1.avif',
  tipBoxWhiteClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxclosed3.avif',
  tipBoxWhiteOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxopen3.avif',
  columnEmpty: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/16.avif',
  columnCartridge: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/13.avif',
  emptyTube: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubeempty.avif',
  liquidTube: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubeblue.avif',
  spoon: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/41.avif',
  powderClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentbottlefilled.avif',
  powderOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/42.avif',
  dyeClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentbottleambercapped.avif',
  dyeOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/46.avif',
  measuringCylinder: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/beaker30ml.avif',
  castingBase: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/48.avif',
  castingCover: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/49.avif',
  castingFilled: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/50.avif',
  castingSolid: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/51.avif',
  shows1: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/shows1.avif',
  shows2: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/shows2.avif',
  shows3: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/shows3.avif',
} as const;

type Experiment6Detail = 'loading90' | 'assembly91' | 'electrophoresisResult' | 'bandGuide' | null;
type Step8Phase = 'powder' | 'water' | 'bath' | 'dye' | 'pourGel' | 'cover' | 'uncover' | 'fillChamber' | 'done';
type Step9Phase = 'loadSamples' | 'showLoading' | 'run' | 'done';
type Step10Phase = 'transferGel' | 'openResult' | 'done';

function getGelCoverPlacement() {
  const cover = document.querySelector<HTMLElement>('#gel-comb');
  const rig = document.querySelector<HTMLElement>('#gel-tray');
  if (!cover || !rig) return { x: 0, y: 0, scale: 1.57 };
  const coverRect = cover.getBoundingClientRect();
  const rigRect = rig.getBoundingClientRect();
  const scale = 1.57;
  const coverCenterX = coverRect.left + coverRect.width / 2;
  const coverCenterY = coverRect.top + coverRect.height / 2;
  const visibleCenterX = coverRect.left + coverRect.width * 0.4286;
  const visibleCenterY = coverRect.top + coverRect.height * 0.4364;
  const scaledVisibleCenterX = coverCenterX + (visibleCenterX - coverCenterX) * scale;
  const scaledVisibleCenterY = coverCenterY + (visibleCenterY - coverCenterY) * scale;
  return {
    x: rigRect.left + rigRect.width * 0.5 - scaledVisibleCenterX,
    y: rigRect.top + rigRect.height * 0.4 - scaledVisibleCenterY,
    scale,
  };
}

const experiment6StateAssets = {
  sampleLiquid: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/8171.avif',
  reactionEmpty: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/81720.avif',
  reactionLiquid: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/81721.avif',
  reactionComplete: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/8710.avif',
  splitCollectionTube: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/8711.avif',
  columnLoaded: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/8712.avif',
  loadingBuffer: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/81756.avif',
} as const;

interface ReagentTubeProps {
  id?: string;
  alt: string;
  className: string;
  color: string;
  title?: string;
  imageSrc?: string;
  labelShape?: TubeLabelShape;
}

function ReagentTube({
  id, alt, className, color, title,
  imageSrc = 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/sample-clear.avif',
  labelShape = 'square',
}: ReagentTubeProps) {
  return (
    <div id={id} className={`absolute ${className}`} title={title}>
      <LabeledTubeArtwork
        imageSrc={imageSrc}
        alt={alt}
        labelColor={color}
        labelShape={labelShape}
        className="h-full w-full"
      />
    </div>
  );
}

type IncubationDisplay = {
  temperature: string;
  duration: string;
} | null;

type StepDefinition = ExperimentStep & {
  shortTitle: string;
  actionLabel: string;
  targetName: string;
  targetId: string;
};

const steps: StepDefinition[] = [
  {
    id: 1,
    title: "Prepare Digestion Mix",
    shortTitle: "Prepare Mix",
    description: "Add DNA, buffer, BamHI, HindIII and ddH₂O to a 1.5 mL tube to a total of 20 μL. Change tips after every reagent.",
    highlightItems: ['DNA', 'Buffer', 'BamHI', 'HindIII', 'ddH2O'],
    animationType: 'move',
    completed: false,
    actionLabel: "Use the pipette to prepare the digestion mix",
    targetName: "Reagent Rack",
    targetId: 'tube-rack',
  },
  {
    id: 2,
    title: "Digest at 37°C",
    shortTitle: "Water Bath Digestion",
    description: "Mix and briefly centrifuge. Incubate the tube in a 37°C water bath for 1.5–2 h.",
    highlightItems: ['centrifuge', 'water-bath'],
    animationType: 'heat',
    completed: false,
    actionLabel: "Briefly centrifuge and incubate at 37°C",
    targetName: "Centrifuge",
    targetId: 'reaction-tube',
  },
  {
    id: 3,
    title: "Chill on Ice",
    shortTitle: "Ice Bath",
    description: "Remove the tube from the water bath and leave on ice for 5 min.",
    highlightItems: ['ice-box'],
    animationType: 'cool',
    completed: false,
    actionLabel: "Place the tube on ice",
    targetName: "Ice Bath Box",
    targetId: 'reaction-tube',
  },
  {
    id: 4,
    title: "Solubilize and Purify",
    shortTitle: "Solubilize",
    description: "Add 3 volumes of solubilization buffer to the digestion reaction, mix and incubate at 55°C for 5 min.",
    highlightItems: ['binding-buffer', 'water-bath'],
    animationType: 'heat',
    completed: false,
    actionLabel: "Add solubilization buffer and incubate at 55°C",
    targetName: "Gel solubilization buffer",
    targetId: 'binding-buffer',
  },
  {
    id: 5,
    title: "Column Centrifugation",
    shortTitle: "Load Column",
    description: "Transfer all of the mixture to a silica column, centrifuge at 12,000 rpm for 30 s and discard the flow-through.",
    highlightItems: ['spin-column', 'centrifuge'],
    animationType: 'move',
    completed: false,
    actionLabel: "Transfer the mixture to the silica column and centrifuge",
    targetName: "Silica Column",
    targetId: 'spin-column',
  },
  {
    id: 6,
    title: "Wash and Dry",
    shortTitle: "Wash",
    description: "Add 600 μL wash buffer to the column and spin for 30 s; repeat once. Spin the empty column for 2 min to remove ethanol.",
    highlightItems: ['wash-buffer', 'centrifuge'],
    animationType: 'wait',
    completed: false,
    actionLabel: "Add wash buffer and complete washing and drying",
    targetName: "Wash buffer",
    targetId: 'wash-buffer',
  },
  {
    id: 7,
    title: "Elute and Collect",
    shortTitle: "Elute",
    description: "Place the column in a new tube, add 30–50 μL elution buffer, leave for 2 min and spin for 2 min to collect.",
    highlightItems: ['elution-buffer', 'spin-column'],
    animationType: 'place',
    completed: false,
    actionLabel: "Add elution buffer and centrifuge to collect",
    targetName: "Silica Column",
    targetId: 'spin-column',
  },
  {
    id: 8,
    title: "Prepare Gel Electrophoresis",
    shortTitle: "Cast Gel",
    description: "Prepare a 1% agarose gel with nucleic acid stain. Place in the tank and add 1× TAE buffer to cover the gel.",
    highlightItems: ['agarose', 'TAE', 'GelRed'],
    animationType: 'move',
    completed: false,
    actionLabel: "Prepare the agarose gel and assemble the tank",
    targetName: "Agarose",
    targetId: 'agarose-flask',
  },
  {
    id: 9,
    title: "Load and Run",
    shortTitle: "Load",
    description: "Mix 5 μL purified product with 1 μL loading buffer and load. Add ladder to an adjacent well and run at 120 V for 25 min.",
    highlightItems: ['loading-buffer', 'marker', 'electrophoresis'],
    animationType: 'move',
    completed: false,
    actionLabel: "Mix the sample, load and run electrophoresis",
    targetName: "Pipette",
    targetId: 'pipette',
  },
  {
    id: 10,
    title: "UV Observation",
    shortTitle: "Observe",
    description: "Transfer the gel to the UV imager and turn on the light to observe the 5.3 kb vector and 720 bp GFP bands.",
    highlightItems: ['uv-imager'],
    animationType: 'wait',
    completed: false,
    actionLabel: "Turn on the UV imager to observe bands",
    targetName: "UV Gel Imager",
    targetId: 'gel-tray',
  },
];

const defaultOperationNotes: Array<string | null> = [
  null,
  null,
  null,
  '55℃\n5min',
  '12000rpm\n30s',
  null,
  null,
  null,
  null,
  null,
];

const animatedSceneTargets = [
  '#pipette', '#pipette-body-empty', '#pipette-body-blue', '#pipette-body-white',
  '#pipette-tip-blue', '#pipette-tip-white',
  '#reaction-tube', '#reaction-state-open', '#reaction-state-closed', '#reaction-state-liquid',
  '#reaction-state-complete', '#rack-reagents', '#working-reagents',
  '#reagent-hindiii', '#reagent-water', '#reagent-buffer', '#reagent-bamhi',
  '#reagent-marker', '#reagent-pet', '#reagent-gfp',
  '#work-hindiii', '#work-water', '#work-buffer', '#work-bamhi', '#work-binding', '#work-wash', '#work-elution', '#work-marker', '#work-pet', '#work-gfp',
  '#tips-blue-open', '#tips-blue-closed', '#tips-white-open', '#tips-white-closed',
  '#binding-buffer', '#spin-column', '#spin-state-empty', '#spin-state-loaded',
  '#spin-state-spun', '#spin-state-cartridge', '#spin-state-clean',
  '#wash-buffer', '#elution-buffer', '#flowthrough-tube', '#flowthrough-liquid',
  '#collection-tube', '#agarose-flask', '#agarose-closed', '#agarose-open', '#flask-empty', '#flask-powder',
  '#flask-solution', '#flask-red', '#waste-cylinder', '#tae-jug', '#spoon',
  '#gel-red-closed', '#gel-red-open',
  '#gel-tray', '#gel-state-filled', '#gel-state-mold', '#gel-state-solid', '#gel-state-tank',
  '#gel-state-powered', '#gel-state-loaded', '#gel-state-bands', '#gel-comb', '#gel-red-board',
  '#loading-buffer', '#loading-guide', '#gel-exploded', '#power-supply', '#purified-product', '#loading-sample',
  '#uv-door', '#uv-target', '#uv-gel-transfer', '#uv-result',
].join(', ');

export function ExperimentPage({ onBack, onRestart }: ExperimentPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const showInfo = true;
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [operationNote, setOperationNote] = useState<string | null>(null);
  const [incubationDisplay, setIncubationDisplay] = useState<IncubationDisplay>(null);
  const [detail, setDetail] = useState<Experiment6Detail>(null);
  const [step8Phase, setStep8Phase] = useState<Step8Phase>('powder');
  const [step9Phase, setStep9Phase] = useState<Step9Phase>('loadSamples');
  const [step10Phase, setStep10Phase] = useState<Step10Phase>('transferGel');
  const [sceneRevision, setSceneRevision] = useState(0);
  const motionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hoverResetTimerRef = useRef<number | null>(null);
  const pendingRestoreStepRef = useRef<number | null>(null);

  const currentStepData = steps[currentStep];
  const isCompleted = currentStep >= steps.length;
  const sidebarStepIndex = hoveredStep ?? (currentStep === 0
    ? 0
    : Math.min(currentStep - 1, steps.length - 1));
  const sidebarStepData = steps[sidebarStepIndex];
  const displayedOperationNote = (currentStep >= 2 && currentStep <= 6)
    ? operationNote
    : operationNote ?? defaultOperationNotes[currentStep] ?? null;
  const operationNotePosition = currentStep === 6 && operationNote?.includes("Leave to stand")
    ? 'left-[54%] top-[66%]'
    : currentStep === 7
      ? 'left-[34%] top-[7%]'
      : currentStep === 8
        ? 'left-[73%] top-[62%]'
        : 'left-[60.5%] top-[7%]';

  const activeTargetId = currentStep === 7
    ? ({
      powder: 'agarose-bottle', water: 'tae-jug', bath: 'agarose-flask', dye: 'gel-red-bottle',
      pourGel: 'agarose-flask', cover: 'gel-comb', uncover: 'gel-comb', fillChamber: 'tae-jug', done: '',
    } satisfies Record<Step8Phase, string>)[step8Phase]
    : currentStep === 8
      ? ({ loadSamples: 'pipette', showLoading: 'gel-red-board', run: 'gel-tray', done: '' } satisfies Record<Step9Phase, string>)[step9Phase]
      : currentStep === 9
        ? ({ transferGel: 'uv-gel-transfer', openResult: 'uv-result', done: '' } satisfies Record<Step10Phase, string>)[step10Phase]
        : currentStepData?.targetId ?? '';

  const isTarget = useCallback((itemId: string) => (
    !isAnimating && !isCompleted && !detail && activeTargetId === itemId
  ), [activeTargetId, detail, isAnimating, isCompleted]);

  const targetGlowStyle = {
    filter: 'drop-shadow(0 0 3px #fff8a6) drop-shadow(0 0 9px #ffd52e) drop-shadow(0 0 14px rgba(255,190,0,0.82))',
  };

  const compactTargetGlowStyle = {
    ...targetGlowStyle,
  };

  const restoreSceneForStep = useCallback((stepIndex: number) => {
    const reactionState = stepIndex === 0
      ? { left: '65.5%', top: '82.5%', scale: 1, opacity: 0, yPercent: 0 }
      : stepIndex <= 4
        ? { left: '65.5%', top: '82.5%', scale: 1, opacity: 1, yPercent: 0 }
        : { left: '18.7%', top: '80.91%', scale: 1, opacity: 0, yPercent: 0 };
    const spinState = stepIndex >= 7
      ? '#spin-state-spun'
      : '#spin-state-empty';
    const flaskState = '#flask-empty';
    const gelState = stepIndex >= 9
      ? '#gel-state-bands'
      : stepIndex === 8
        ? '#gel-state-tank'
        : stepIndex === 7
          ? '#gel-state-mold'
          : '#gel-state-filled';

    gsap.set('#pipette', {
      left: '62.5%', top: '54%', x: 0, y: 0, rotation: 0, yPercent: 0,
      scale: 1, opacity: stepIndex === 8 ? 1 : 0, zIndex: 30,
    });
    gsap.set(['#pipette-tip-blue', '#pipette-tip-white'], { opacity: 0 });
    gsap.set(['#pipette-body-blue', '#pipette-body-white'], { opacity: 0 });
    gsap.set('#pipette-body-empty', { opacity: 1 });
    gsap.set(['#tips-blue-open', '#tips-white-open'], { opacity: 0 });
    gsap.set(['#tips-blue-closed', '#tips-white-closed'], { opacity: 1 });
    gsap.set('#rack-reagents', { opacity: 1 });
    gsap.set('#working-reagents', { opacity: 0 });
    gsap.set('#rack-reagents > *', { x: 0, y: 0, scale: 1 });
    gsap.set([
      '#reagent-hindiii', '#binding-buffer', '#reagent-buffer',
      '#wash-buffer', '#reagent-bamhi', '#reagent-water',
    ], { opacity: 1 });
    gsap.set('#working-reagents > *', { opacity: 0, x: 0, y: 0, scale: 1 });
    if (stepIndex >= 1) gsap.set(['#reagent-pet', '#reagent-gfp'], { opacity: 0 });

    gsap.set('#reaction-tube', {
      ...reactionState,
      x: 0,
      y: 0,
      rotation: 0,
      zIndex: 30,
    });
    gsap.set(['#reaction-state-open', '#reaction-state-liquid', '#reaction-state-complete'], { opacity: 0 });
    gsap.set('#reaction-state-closed', { opacity: stepIndex === 0 ? 1 : 0 });
    gsap.set('#reaction-state-liquid', { opacity: stepIndex === 0 ? 0 : 1 });
    if (stepIndex >= 5) gsap.set('#reaction-tube', { opacity: 0 });

    gsap.set('#flowthrough-tube', {
      left: '55.5%', top: '82.2%', rotation: 0, yPercent: 0,
      opacity: 0, zIndex: 30, transformOrigin: '67% 20%',
    });
    gsap.set('#flowthrough-liquid', { opacity: 1 });
    gsap.set('#flowthrough-empty', { opacity: 0 });
    gsap.set('#spin-column', {
      left: stepIndex === 6 ? '50.2%' : '55.2%',
      top: '80%',
      x: stepIndex === 4 ? 72 : 0,
      y: stepIndex === 4 ? -54 : 0,
      rotation: 0, yPercent: 0, scale: 1, zIndex: 30,
      opacity: stepIndex >= 5 && stepIndex <= 6 ? 1 : 0,
    });
    gsap.set([
      '#spin-state-empty', '#spin-state-loaded', '#spin-state-spun',
      '#spin-state-cartridge', '#spin-state-clean',
    ], { opacity: 0 });
    gsap.set(spinState, { opacity: 1 });

    gsap.set('#agarose-flask', {
      x: 0, y: 0, rotation: 0, yPercent: 0, scale: 1, opacity: 1, zIndex: 30,
    });
    gsap.set(['#flask-empty', '#flask-powder', '#flask-solution', '#flask-red'], { opacity: 0 });
    gsap.set(flaskState, { opacity: 1 });
    gsap.set('#tae-jug', {
      left: '23.7%', top: '30.4%', rotation: 0, yPercent: 0, scale: 1, zIndex: 20,
    });
    gsap.set('#waste-cylinder', {
      left: '50.3%', top: '66%', rotation: 0, yPercent: 0, scale: 1, zIndex: 30,
    });
    gsap.set('#spoon', {
      left: '37.3%', top: '88%', bottom: 'auto', x: 0, y: 0,
      rotation: 90, yPercent: 0, scale: 1, zIndex: 30,
    });
    gsap.set('#agarose-closed', { opacity: 1 });
    gsap.set('#agarose-open', { opacity: 0 });
    gsap.set('#gel-red-closed', { opacity: 1 });
    gsap.set('#gel-red-open', { opacity: 0 });

    gsap.set('#gel-tray', {
      left: '58.3%', top: '81.4%', rotation: 0, yPercent: 0,
      scale: 1,
      opacity: stepIndex === 9 ? 0 : stepIndex > 7 ? 1 : 0,
      x: stepIndex === 7 ? 72 : 0,
      y: stepIndex === 7 ? -54 : 0,
      zIndex: 30,
    });
    gsap.set([
      '#gel-state-filled', '#gel-state-mold', '#gel-state-solid', '#gel-state-tank',
      '#gel-state-powered', '#gel-state-loaded', '#gel-state-bands',
    ], { opacity: 0 });
    gsap.set(gelState, { opacity: 1 });
    gsap.set('#gel-comb', {
      opacity: 0,
      left: '70.2%', top: '82%',
      x: stepIndex === 7 ? 72 : 0,
      y: stepIndex === 7 ? -54 : 0,
      scale: 1,
      rotation: 0,
    });
    gsap.set(['#loading-guide', '#gel-exploded'], { opacity: 0 });
    gsap.set('#power-supply', { opacity: 1 });
    gsap.set('#uv-door', { opacity: 0, scaleY: 1, x: 0, y: 0 });
    gsap.set('#uv-target', { opacity: 0 });
    gsap.set('#uv-gel-transfer', { opacity: stepIndex === 9 ? 1 : 0, x: 0, y: 0, scale: 1, left: '58.3%', top: '81.4%' });
    gsap.set('#uv-result', { opacity: 0 });
    gsap.set('#purified-product', {
      left: '70.3%', top: '80%',
      x: stepIndex === 8 ? 72 : 0,
      y: stepIndex === 8 ? -54 : 0,
      scale: 1, rotation: 0,
      opacity: 0, zIndex: 40,
    });
    gsap.set('#loading-sample', {
      left: '79.5%', top: '77.5%',
      x: stepIndex === 8 ? 72 : 0,
      y: stepIndex === 8 ? -54 : 0,
      scale: 1, rotation: 0,
      opacity: 0, zIndex: 40,
    });
  }, []);

  useLayoutEffect(() => {
    const stepIndex = pendingRestoreStepRef.current;
    if (stepIndex === null) return;

    restoreSceneForStep(stepIndex);
    if (stepIndex === 4) {
      gsap.set('#spin-column', {
        opacity: 0,
        x: 72,
        y: -54,
        left: '55.2%',
        top: '80%',
        scale: 1,
        rotation: 0,
        zIndex: 90,
      });
      gsap.to('#spin-column', {
        opacity: 1, x: 0, y: 0, duration: 0.58, ease: 'power2.out',
      });
    }
    if (stepIndex === 7) {
      gsap.set('#gel-comb', {
        opacity: 0,
        x: 72,
        y: -54,
        left: '70.2%',
        top: '82%',
        scale: 1,
        rotation: 0,
      });
      gsap.to('#gel-tray', {
        opacity: 1, x: 0, y: 0, duration: 0.58, ease: 'power2.out',
      });
      gsap.to('#gel-comb', {
        opacity: 1, x: 0, y: 0, duration: 0.58, ease: 'power2.out',
      });
    }
    if (stepIndex === 8) {
      gsap.set('#purified-product', {
        opacity: 0, x: 72, y: -54, left: '70.3%', top: '80%', scale: 1, rotation: 0, zIndex: 90,
      });
      gsap.set('#loading-sample', {
        opacity: 0, x: 72, y: -54, left: '79.5%', top: '77.5%', scale: 1, rotation: 0, zIndex: 90,
      });
      gsap.to('#purified-product', {
        opacity: 1, x: 0, y: 0, duration: 0.58, ease: 'power2.out',
      });
      gsap.to('#loading-sample', {
        opacity: 1, x: 0, y: 0, duration: 0.58, ease: 'power2.out',
      });
    }
    pendingRestoreStepRef.current = null;
  }, [restoreSceneForStep, sceneRevision]);

  const markStepCompleted = useCallback((stepIndex: number) => {
    setCompletedSteps((completed) => (
      completed.includes(stepIndex)
        ? completed
        : [...completed, stepIndex].sort((a, b) => a - b)
    ));
  }, []);

  

  const executeStepAnimation = useCallback((stepIndex: number) => {
    if (isAnimating || stepIndex >= steps.length) return;
    setIsAnimating(true);
    motionTimelineRef.current?.kill();

    let finishTimeline: (() => void) | null = null;
    const timeline = gsap.timeline({
      onComplete: () => {
        setOperationNote(null);
        setIncubationDisplay(null);
        setIsAnimating(false);
        if (finishTimeline) {
          finishTimeline();
          return;
        }
        markStepCompleted(stepIndex);
        pendingRestoreStepRef.current = stepIndex + 1;
        setCurrentStep(stepIndex + 1);
        setSceneRevision((revision) => revision + 1);
      },
    });
    motionTimelineRef.current = timeline;

    const tipSelectors = ['#pipette-tip-blue', '#pipette-tip-white'];
    const flaskSelectors = ['#flask-empty', '#flask-powder', '#flask-solution', '#flask-red'];
    const spinSelectors = [
      '#spin-state-empty', '#spin-state-loaded', '#spin-state-spun',
      '#spin-state-cartridge', '#spin-state-clean',
    ];
    const gelSelectors = [
      '#gel-state-filled', '#gel-state-mold', '#gel-state-solid', '#gel-state-tank',
      '#gel-state-powered', '#gel-state-loaded', '#gel-state-bands',
    ];

    const crossfadeState = (selectors: string[], activeSelector: string, duration = 0.16) => {
      const inactiveSelectors = selectors.filter((selector) => selector !== activeSelector);
      timeline
        .to(inactiveSelectors, { opacity: 0, duration, ease: 'sine.out' })
        .to(activeSelector, { opacity: 1, duration, ease: 'sine.inOut' }, '<');
    };

    const movePipetteTipTo = (
      targetSelector: string,
      xRatio = 0.5,
      yRatio = 0.16,
      duration = 0.42,
    ) => {
      timeline.to('#pipette', {
        x: () => {
          const pipette = document.querySelector<HTMLElement>('#pipette');
          const target = document.querySelector<HTMLElement>(targetSelector);
          if (!pipette || !target) return 0;
          const pipetteRect = pipette.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const currentX = Number(gsap.getProperty(pipette, 'x')) || 0;
          return currentX + targetRect.left + targetRect.width * xRatio
            - (pipetteRect.left + pipetteRect.width * 0.5);
        },
        y: () => {
          const pipette = document.querySelector<HTMLElement>('#pipette');
          const target = document.querySelector<HTMLElement>(targetSelector);
          if (!pipette || !target) return 0;
          const pipetteRect = pipette.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const currentY = Number(gsap.getProperty(pipette, 'y')) || 0;
          return currentY + targetRect.top + targetRect.height * yRatio
            - (pipetteRect.top + pipetteRect.height * 0.98);
        },
        duration,
        ease: 'power2.inOut',
      });
    };

    const transferWithFreshTip = (
      sourceSelector: string,
      destinationSelector: string,
      tip: 'blue' | 'white' = 'white',
      sourceYRatio = 0.18,
      destinationYRatio = 0.11,
      onDispensed?: () => void,
      sourceXRatio = 0.5,
      destinationXRatio = 0.47,
    ) => {
      const tipSelector = tip === 'blue' ? '#pipette-tip-blue' : '#pipette-tip-white';
      const bodySelector = tip === 'blue' ? '#pipette-body-blue' : '#pipette-body-white';
      const boxClosedSelector = tip === 'blue' ? '#tips-blue-closed' : '#tips-white-closed';
      const boxOpenSelector = tip === 'blue' ? '#tips-blue-open' : '#tips-white-open';
      const boxSelector = tip === 'blue' ? '#tips-blue-box' : '#tips-white-box';
      timeline
        .set('#pipette', { zIndex: 90, rotation: 0, x: 0, y: 0, yPercent: 0, opacity: 1 })
        .set(tipSelectors, { opacity: 0 })
        .set(boxClosedSelector, { opacity: 0 })
        .set(boxOpenSelector, { opacity: 1 });
      movePipetteTipTo(boxSelector, 0.5, 0.32, 0.5);
      timeline
        .to('#pipette', { yPercent: 4, duration: 0.12, ease: 'sine.in' })
        .set('#pipette-body-empty', { opacity: 0 })
        .set(bodySelector, { opacity: 1 })
        .set(tipSelector, { opacity: 1 })
        .to('#pipette', { yPercent: 0, duration: 0.12, ease: 'sine.out' });
      movePipetteTipTo(sourceSelector, sourceXRatio, sourceYRatio);
      timeline.to('#pipette', { yPercent: 4, duration: 0.12, repeat: 1, yoyo: true, ease: 'sine.inOut' });
      movePipetteTipTo(destinationSelector, destinationXRatio, destinationYRatio);
      timeline.to('#pipette', { yPercent: 4, duration: 0.12, repeat: 1, yoyo: true, ease: 'sine.inOut' });
      if (onDispensed) timeline.call(onDispensed);
      movePipetteTipTo(boxSelector, 0.5, 0.32, 0.46);
      timeline
        .to('#pipette', { yPercent: 4, duration: 0.1, ease: 'sine.in' })
        .set(tipSelector, { opacity: 0 })
        .set(bodySelector, { opacity: 0 })
        .set('#pipette-body-empty', { opacity: 1 })
        .set(boxOpenSelector, { opacity: 0 })
        .set(boxClosedSelector, { opacity: 1 })
        .to('#pipette', { x: 0, y: 0, yPercent: 0, duration: 0.48, ease: 'power2.out' });
    };

    const transferRackReagent = (
      sourceSelector: string,
      workSelector: string,
      destinationSelector = '#reaction-tube',
      tip: 'blue' | 'white' = 'blue',
      restoreSource: boolean | 'leave' = true,
      onDispensed?: () => void,
      sourceYRatio = 0.18,
      destinationYRatio = 0.11,
      destinationXRatio = 0.47,
    ) => {
      timeline
        .set('#working-reagents', { opacity: 0 })
        .set('#rack-reagents', { zIndex: 85 })
        .set(sourceSelector, { opacity: 1, zIndex: 90, x: 0, y: 0, scale: 1 })
        .to(sourceSelector, {
          x: () => {
            const source = document.querySelector<HTMLElement>(sourceSelector);
            const work = document.querySelector<HTMLElement>(workSelector);
            if (!source || !work) return 0;
            const sourceRect = source.getBoundingClientRect();
            const workRect = work.getBoundingClientRect();
            const currentX = Number(gsap.getProperty(source, 'x')) || 0;
            return currentX + workRect.left + workRect.width / 2
              - (sourceRect.left + sourceRect.width / 2);
          },
          y: () => {
            const source = document.querySelector<HTMLElement>(sourceSelector);
            const work = document.querySelector<HTMLElement>(workSelector);
            if (!source || !work) return 0;
            const sourceRect = source.getBoundingClientRect();
            const workRect = work.getBoundingClientRect();
            const currentY = Number(gsap.getProperty(source, 'y')) || 0;
            return currentY + workRect.top + workRect.height / 2
              - (sourceRect.top + sourceRect.height / 2);
          },
          duration: 0.58,
          ease: 'power2.inOut',
        });
      transferWithFreshTip(
        sourceSelector,
        destinationSelector,
        tip,
        sourceYRatio,
        destinationYRatio,
        onDispensed,
        0.5,
        destinationXRatio,
      );
      if (restoreSource === true) {
        timeline
          .to(sourceSelector, { x: 0, y: 0, duration: 0.52, ease: 'power2.inOut' })
          .set(sourceSelector, { zIndex: 30 });
      } else if (restoreSource === 'leave') {
        timeline.set(sourceSelector, { zIndex: 80 });
      } else {
        timeline
          .set(sourceSelector, { zIndex: 125 })
          .to(sourceSelector, {
            x: () => (Number(gsap.getProperty(sourceSelector, 'x')) || 0) + 72,
            y: () => (Number(gsap.getProperty(sourceSelector, 'y')) || 0) - 54,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.in',
          })
          .set(sourceSelector, { x: 0, y: 0, scale: 1, opacity: 0, zIndex: 30 });
      }
      timeline.set('#rack-reagents', { zIndex: 30 });
    };

    const transferBenchTube = (
      sourceSelector: string,
      workSelector: string,
      destinationSelector: string,
      onDispensed?: () => void,
      sourceYRatio = 0.18,
      destinationYRatio = 0.13,
      destinationXRatio = 0.5,
    ) => {
      timeline
        .set('#rack-reagents', { zIndex: 85 })
        .set(sourceSelector, { opacity: 1, zIndex: 90, x: 0, y: 0, scale: 1 })
        .to(sourceSelector, {
          x: () => {
            const source = document.querySelector<HTMLElement>(sourceSelector);
            const work = document.querySelector<HTMLElement>(workSelector);
            if (!source || !work) return 0;
            const sourceRect = source.getBoundingClientRect();
            const workRect = work.getBoundingClientRect();
            const currentX = Number(gsap.getProperty(source, 'x')) || 0;
            return currentX + workRect.left + workRect.width / 2
              - (sourceRect.left + sourceRect.width / 2);
          },
          y: () => {
            const source = document.querySelector<HTMLElement>(sourceSelector);
            const work = document.querySelector<HTMLElement>(workSelector);
            if (!source || !work) return 0;
            const sourceRect = source.getBoundingClientRect();
            const workRect = work.getBoundingClientRect();
            const currentY = Number(gsap.getProperty(source, 'y')) || 0;
            return currentY + workRect.top + workRect.height / 2
              - (sourceRect.top + sourceRect.height / 2);
          },
          duration: 0.58,
          ease: 'power2.inOut',
        });
      transferWithFreshTip(
        sourceSelector,
        destinationSelector,
        'white',
        sourceYRatio,
        destinationYRatio,
        onDispensed,
        0.5,
        destinationXRatio,
      );
      timeline
        .to(sourceSelector, { x: 0, y: 0, duration: 0.52, ease: 'power2.inOut' })
        .set(sourceSelector, { zIndex: 30 })
        .set('#rack-reagents', { zIndex: 30 });
    };

    const moveElementCenterTo = (
      sourceSelector: string,
      targetSelector: string,
      scale = 0.7,
      duration = 0.72,
    ) => {
      timeline.to(sourceSelector, {
        x: () => {
          const source = document.querySelector<HTMLElement>(sourceSelector);
          const target = document.querySelector<HTMLElement>(targetSelector);
          if (!source || !target) return 0;
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const currentX = Number(gsap.getProperty(source, 'x')) || 0;
          return currentX + targetRect.left + targetRect.width / 2
            - (sourceRect.left + sourceRect.width / 2);
        },
        y: () => {
          const source = document.querySelector<HTMLElement>(sourceSelector);
          const target = document.querySelector<HTMLElement>(targetSelector);
          if (!source || !target) return 0;
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const currentY = Number(gsap.getProperty(source, 'y')) || 0;
          return currentY + targetRect.top + targetRect.height / 2
            - (sourceRect.top + sourceRect.height / 2);
        },
        scale,
        duration,
        ease: 'power2.inOut',
      });
    };

    const moveElementPointTo = (
      sourceSelector: string,
      targetSelector: string,
      sourceXRatio: number,
      sourceYRatio: number,
      targetXRatio: number,
      targetYRatio: number,
      duration = 0.72,
    ) => {
      timeline.to(sourceSelector, {
        x: () => {
          const source = document.querySelector<HTMLElement>(sourceSelector);
          const target = document.querySelector<HTMLElement>(targetSelector);
          if (!source || !target) return 0;
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const currentX = Number(gsap.getProperty(source, 'x')) || 0;
          return currentX + targetRect.left + targetRect.width * targetXRatio
            - (sourceRect.left + sourceRect.width * sourceXRatio);
        },
        y: () => {
          const source = document.querySelector<HTMLElement>(sourceSelector);
          const target = document.querySelector<HTMLElement>(targetSelector);
          if (!source || !target) return 0;
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const currentY = Number(gsap.getProperty(source, 'y')) || 0;
          return currentY + targetRect.top + targetRect.height * targetYRatio
            - (sourceRect.top + sourceRect.height * sourceYRatio);
        },
        duration,
        ease: 'power2.inOut',
      });
    };

    const moveElementAnchorTo = (
      sourceSelector: string,
      sourceAnchorSelector: string,
      targetAnchorSelector: string,
      duration = 0.72,
    ) => {
      timeline.to(sourceSelector, {
        x: () => {
          const source = document.querySelector<HTMLElement>(sourceSelector);
          const sourceAnchor = document.querySelector<HTMLElement>(sourceAnchorSelector);
          const targetAnchor = document.querySelector<HTMLElement>(targetAnchorSelector);
          if (!source || !sourceAnchor || !targetAnchor) return 0;
          const sourceAnchorRect = sourceAnchor.getBoundingClientRect();
          const targetAnchorRect = targetAnchor.getBoundingClientRect();
          const currentX = Number(gsap.getProperty(source, 'x')) || 0;
          return currentX + targetAnchorRect.left + targetAnchorRect.width / 2
            - (sourceAnchorRect.left + sourceAnchorRect.width / 2);
        },
        y: () => {
          const source = document.querySelector<HTMLElement>(sourceSelector);
          const sourceAnchor = document.querySelector<HTMLElement>(sourceAnchorSelector);
          const targetAnchor = document.querySelector<HTMLElement>(targetAnchorSelector);
          if (!source || !sourceAnchor || !targetAnchor) return 0;
          const sourceAnchorRect = sourceAnchor.getBoundingClientRect();
          const targetAnchorRect = targetAnchor.getBoundingClientRect();
          const currentY = Number(gsap.getProperty(source, 'y')) || 0;
          return currentY + targetAnchorRect.top + targetAnchorRect.height / 2
            - (sourceAnchorRect.top + sourceAnchorRect.height / 2);
        },
        duration,
        ease: 'power2.inOut',
      });
    };

    const moveReactionBottomTo = (
      targetSelector: string,
      targetXRatio: number,
      targetYRatio: number,
      duration = 0.72,
    ) => {
      timeline.to('#reaction-tube', {
        x: () => {
          const tube = document.querySelector<HTMLElement>('#reaction-tube');
          const anchor = document.querySelector<HTMLElement>('#reaction-bottom-anchor');
          const target = document.querySelector<HTMLElement>(targetSelector);
          if (!tube || !anchor || !target) return 0;
          const anchorRect = anchor.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const currentX = Number(gsap.getProperty(tube, 'x')) || 0;
          return currentX + targetRect.left + targetRect.width * targetXRatio
            - (anchorRect.left + anchorRect.width / 2);
        },
        y: () => {
          const tube = document.querySelector<HTMLElement>('#reaction-tube');
          const anchor = document.querySelector<HTMLElement>('#reaction-bottom-anchor');
          const target = document.querySelector<HTMLElement>(targetSelector);
          if (!tube || !anchor || !target) return 0;
          const anchorRect = anchor.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const currentY = Number(gsap.getProperty(tube, 'y')) || 0;
          return currentY + targetRect.top + targetRect.height * targetYRatio
            - (anchorRect.top + anchorRect.height / 2);
        },
        duration,
        ease: 'power2.inOut',
      });
    };

    const getContainedImagePoint = (
      selector: string,
      xRatio: number,
      yRatio: number,
    ) => {
      const image = document.querySelector<HTMLImageElement>(selector);
      if (!image) return null;
      const rect = image.getBoundingClientRect();
      const naturalWidth = image.naturalWidth || rect.width;
      const naturalHeight = image.naturalHeight || rect.height;
      const fitScale = Math.min(rect.width / naturalWidth, rect.height / naturalHeight);
      const renderedWidth = naturalWidth * fitScale;
      const renderedHeight = naturalHeight * fitScale;
      return {
        x: rect.left + (rect.width - renderedWidth) / 2 + renderedWidth * xRatio,
        y: rect.top + (rect.height - renderedHeight) / 2 + renderedHeight * yRatio,
      };
    };

    const alignVisibleAxis = (
      sourceContainer: string,
      sourceImage: string,
      sourceRatio: number,
      targetImage: string,
      targetRatio: number,
    ) => {
      timeline.set(sourceContainer, {
        x: () => {
          const source = getContainedImagePoint(sourceImage, sourceRatio, 0.5);
          const target = getContainedImagePoint(targetImage, targetRatio, 0.5);
          if (!source || !target) return Number(gsap.getProperty(sourceContainer, 'x')) || 0;
          const currentX = Number(gsap.getProperty(sourceContainer, 'x')) || 0;
          return currentX + target.x - source.x;
        },
      });
    };

    const takeAway = (
      sourceSelector: string,
      duration = 0.55,
      xDelta = 72,
      yDelta = -54,
    ) => {
      timeline
        .set(sourceSelector, { zIndex: 125 })
        .to(sourceSelector, {
          x: () => (Number(gsap.getProperty(sourceSelector, 'x')) || 0) + xDelta,
          y: () => (Number(gsap.getProperty(sourceSelector, 'y')) || 0) + yDelta,
          opacity: 0,
          duration,
          ease: 'power2.in',
        })
        .set(sourceSelector, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 0,
          zIndex: 30,
          transformOrigin: '50% 50%',
        });
    };

    const pourInto = (
      sourceSelector: string,
      targetSelector: string,
      counterClockwise = false,
      onPoured?: () => void,
      restoreSource = true,
    ) => {
      timeline
        .set(sourceSelector, {
          zIndex: 125,
          transformOrigin: counterClockwise ? '0% 0%' : '100% 0%',
        })
        .to(sourceSelector, {
          x: () => {
            const source = document.querySelector<HTMLElement>(sourceSelector);
            const target = document.querySelector<HTMLElement>(targetSelector);
            if (!source || !target) return 0;
            const sourceRect = source.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const currentX = Number(gsap.getProperty(source, 'x')) || 0;
            const sourcePoint = counterClockwise ? sourceRect.left : sourceRect.right;
            const targetPoint = targetRect.left + targetRect.width * (counterClockwise ? 0.62 : 0.12);
            return currentX + targetPoint - sourcePoint;
          },
          y: () => {
            const source = document.querySelector<HTMLElement>(sourceSelector);
            const target = document.querySelector<HTMLElement>(targetSelector);
            if (!source || !target) return 0;
            const sourceRect = source.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const currentY = Number(gsap.getProperty(source, 'y')) || 0;
            return currentY + targetRect.top - sourceRect.top;
          },
          duration: 0.72,
          ease: 'power2.inOut',
        })
        .to(sourceSelector, {
          rotation: counterClockwise ? -120 : 120,
          duration: 0.64,
          ease: 'power2.inOut',
        })
        .to({}, { duration: 0.36 })
        .call(() => onPoured?.());
      if (restoreSource) {
        timeline
          .to(sourceSelector, {
            rotation: 0, x: 0, y: 0, duration: 0.62, ease: 'power2.out',
          })
          .set(sourceSelector, { zIndex: 30, transformOrigin: '50% 50%' });
      } else {
        timeline.to(sourceSelector, {
          rotation: 0,
          duration: 0.28,
          ease: 'power2.out',
        });
        takeAway(sourceSelector);
      }
    };

    const discardFlowthrough = (cartridgeSelector = '#spin-state-cartridge', reassemble = true) => {
      timeline
        .set('#flowthrough-tube', {
          left: '52.2%', top: '82.2%', x: 0, y: 0, rotation: 0, yPercent: 0,
          transformOrigin: '67% 20%', opacity: 0, zIndex: 75,
        })
        .set('#flowthrough-liquid', { opacity: 1 })
        .set('#flowthrough-empty', { opacity: 0 })
        .to('#flowthrough-tube', { opacity: 1, duration: 0.14, ease: 'sine.out' });
      crossfadeState(spinSelectors, cartridgeSelector, 0.16);
      alignVisibleAxis('#flowthrough-tube', '#flowthrough-liquid', 0.452, cartridgeSelector, 0.461);
      timeline
        .to('#spin-column', { y: -34, duration: 0.42, ease: 'power2.out' });
      pourInto('#flowthrough-tube', '#waste-cylinder', true, () => {
        gsap.set('#flowthrough-liquid', { opacity: 0 });
        gsap.set('#flowthrough-empty', { opacity: 1 });
      });
      alignVisibleAxis('#flowthrough-tube', '#flowthrough-empty', 0.477, cartridgeSelector, 0.461);
      if (reassemble) {
        timeline
          .to('#spin-column', { y: 0, duration: 0.42, ease: 'power2.in' })
          .set('#flowthrough-tube', {
            opacity: 0, x: 0, y: 0, rotation: 0, scale: 1, zIndex: 30,
          });
        crossfadeState(spinSelectors, '#spin-state-empty', 0.16);
      }
    };

    const moveColumnToCentrifuge = () => {
      timeline.set('#spin-column', { zIndex: 125 });
      moveElementCenterTo('#spin-column', '#centrifuge', 0.66);
    };

    const returnColumnToBench = () => {
      timeline
        .to('#spin-column', { rotation: 0, x: 0, y: 0, scale: 1, duration: 0.62, ease: 'power2.out' })
        .set('#spin-column', { zIndex: 80 });
    };

    switch (stepIndex) {
      case 0:
        timeline
          .set('#rack-reagents', { opacity: 1 })
          .set('#working-reagents', { opacity: 0 })
          .set('#working-reagents > *', { opacity: 0 })
          .set('#reaction-tube', { left: '65.5%', top: '82.5%', scale: 1, opacity: 1, zIndex: 85 })
          .set(['#reaction-state-closed', '#reaction-state-liquid', '#reaction-state-complete'], { opacity: 0 })
          .set('#reaction-state-open', { opacity: 1 })
          .to('#reaction-tube', { filter: 'brightness(1.12)', duration: 0.24, repeat: 1, yoyo: true });
        transferRackReagent(
          '#reagent-hindiii',
          '#work-hindiii',
          '#reaction-tube',
          'blue',
          true,
          () => {
            gsap.set(['#reaction-state-closed', '#reaction-state-open', '#reaction-state-complete'], { opacity: 0 });
            gsap.set('#reaction-state-liquid', { opacity: 1 });
          },
        );
        transferRackReagent('#reagent-buffer', '#work-buffer');
        transferRackReagent('#reagent-bamhi', '#work-bamhi');
        transferRackReagent('#reagent-water', '#work-water');
        transferRackReagent('#reagent-pet', '#work-pet', '#reaction-tube', 'blue', false, undefined, 0.22, 0.11, 0.47);
        transferRackReagent('#reagent-gfp', '#work-gfp', '#reaction-tube', 'blue', false, undefined, 0.22, 0.11, 0.47);
        timeline
          .set(['#reaction-state-open', '#reaction-state-complete'], { opacity: 0 })
          .set('#reaction-state-liquid', { opacity: 1 })
          .to('#reaction-tube', { left: '65.5%', top: '82.5%', scale: 1, duration: 0.55, ease: 'power2.inOut' })
          .set('#working-reagents', { opacity: 0 })
          .set('#rack-reagents', { opacity: 1 })
          .to('#pipette', { x: 0, y: 0, rotation: 0, yPercent: 0, duration: 0.5, ease: 'power2.inOut' })
          .set('#pipette', { opacity: 0 })
          .set(['#pipette', '#reaction-tube'], { zIndex: 30 });
        break;
      case 1:
        timeline
          .call(() => setOperationNote("Brief Centrifugation"))
          .set('#reaction-tube', { zIndex: 125 });
        moveElementCenterTo('#reaction-tube', '#centrifuge', 1);
        timeline
          .to('#reaction-tube', { rotation: 1440, duration: 1.05, ease: 'none' })
          .to('#reaction-tube', { rotation: 0, x: 0, y: 0, scale: 1, duration: 0.62, ease: 'power2.out' })
          .call(() => setOperationNote(null));
        moveReactionBottomTo('#water-bath', 0.5, 0.2);
        timeline
          .call(() => setIncubationDisplay({ temperature: '37℃', duration: '1.5–2 h' }))
          .to({}, { duration: 1.1 })
          .call(() => setIncubationDisplay(null))
          .to('#reaction-tube', { left: '65.5%', top: '82.5%', x: 0, y: 0, yPercent: 0, duration: 0.7, ease: 'power2.inOut' })
          .set('#reaction-tube', { zIndex: 30 });
        break;
      case 2:
        timeline
          .set('#reaction-tube', { zIndex: 80 });
        moveReactionBottomTo('#ice-box', 0.62, 0.36, 0.9);
        timeline
          .call(() => setIncubationDisplay({ temperature: "Ice Bath", duration: '5 min' }))
          .to('#reaction-tube', { yPercent: 2, duration: 0.25, repeat: 1, yoyo: true, ease: 'sine.inOut' })
          .to({}, { duration: 0.9 })
          .call(() => setIncubationDisplay(null))
          .to('#reaction-tube', { left: '65.5%', top: '82.5%', x: 0, y: 0, yPercent: 0, duration: 0.7, ease: 'power2.inOut' })
          .set('#reaction-tube', { zIndex: 30 });
        break;
      case 3:
        timeline
          .set('#reaction-tube', { zIndex: 80 })
          .to('#reaction-tube', { left: '63.95%', top: '80%', x: 0, y: 0, yPercent: 0, scale: 1, duration: 0.65, ease: 'power2.inOut' })
          .set(['#reaction-state-closed', '#reaction-state-open', '#reaction-state-liquid'], { opacity: 0 })
          .set('#reaction-state-complete', { opacity: 1 });
        transferRackReagent('#binding-buffer', '#work-binding', '#reaction-tube', 'white', 'leave');
        timeline
          .set('#reaction-state-open', { opacity: 0 })
          .set('#reaction-state-complete', { opacity: 1 })
          .to('#reaction-tube', { x: 0, y: 0, yPercent: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
        moveReactionBottomTo('#water-bath', 0.5, 0.2, 0.8);
        timeline
          .call(() => setIncubationDisplay({ temperature: '55℃', duration: '5 min' }))
          .to('#reaction-tube', { filter: 'brightness(1.35)', duration: 0.2, repeat: 3, yoyo: true })
          .to({}, { duration: 0.8 })
          .call(() => setIncubationDisplay(null))
          .to('#reaction-tube', { left: '65.5%', top: '82.5%', x: 0, y: 0, scale: 1, filter: 'none', duration: 0.75, ease: 'power2.inOut' })
          .to('#binding-buffer', { x: 0, y: 0, scale: 1, duration: 0.55, ease: 'power2.inOut' })
          .set('#binding-buffer', { zIndex: 30 })
          .to('#pipette', { x: 0, y: 0, duration: 0.55, ease: 'power2.inOut' })
          .set('#pipette', { opacity: 0 })
          .set(['#reaction-tube', '#pipette'], { zIndex: 30 });
        break;
      case 4:
        timeline
          .set('#spin-column', { opacity: 1, left: '55.2%', top: '80%', x: 0, y: 0, scale: 1, rotation: 0, zIndex: 80 })
          .to('#spin-column', { left: '52.2%', top: '82.2%', scale: 1, duration: 0.45, ease: 'power2.out' })
          .to('#reaction-tube', { left: '63.95%', top: '84.7%', scale: 1, zIndex: 80, duration: 0.6, ease: 'power2.inOut' }, '<');
        timeline.set(['#reaction-state-closed', '#reaction-state-open'], { opacity: 0 }).set('#reaction-state-complete', { opacity: 1 });
        transferWithFreshTip('#reaction-tube', '#spin-column', 'white', 0.18, 0.13, () => {
          gsap.set(spinSelectors, { opacity: 0 });
          gsap.set('#spin-state-loaded', { opacity: 1 });
        }, 0.47, 0.5);
        timeline
          .set(['#reaction-tube', '#spin-column'], { zIndex: 80 })
        takeAway('#reaction-tube');
        timeline
          .call(() => setOperationNote('12000 rpm\n30 s'));
        moveColumnToCentrifuge();
        timeline
          .to('#spin-column', { rotation: 1440, duration: 1.05, ease: 'none' })
          .set(spinSelectors, { opacity: 0 })
          .set('#spin-state-spun', { opacity: 1 });
        returnColumnToBench();
        timeline.call(() => setOperationNote(null));
        discardFlowthrough();
        timeline
          .set(spinSelectors, { opacity: 0 })
          .set('#spin-state-empty', { opacity: 1 })
          .to('#spin-column', { left: '55.2%', top: '83%', rotation: 0, scale: 1, duration: 0.55, ease: 'power2.inOut' })
          .to('#pipette', { x: 0, y: 0, duration: 0.55, ease: 'power2.inOut' })
          .set('#pipette', { opacity: 0 })
          .set(['#reaction-tube', '#spin-column', '#flowthrough-tube'], { zIndex: 30 });
        break;
      case 5:
        timeline
          .set('#spin-column', { zIndex: 80 })
          .to('#spin-column', { left: '52.2%', top: '82.2%', scale: 1, rotation: 0, duration: 0.65, ease: 'power2.inOut' })
          .set(spinSelectors, { opacity: 0 })
          .set('#spin-state-empty', { opacity: 1 });
        transferBenchTube(
          '#wash-buffer',
          '#work-wash',
          '#spin-column',
          () => {
            gsap.set(spinSelectors, { opacity: 0 });
            gsap.set('#spin-state-loaded', { opacity: 1 });
          },
        );
        timeline.call(() => setOperationNote('12000rpm\n30s'));
        moveColumnToCentrifuge();
        timeline
          .to('#spin-column', { rotation: 1440, duration: 1.05, ease: 'none' });
        crossfadeState(spinSelectors, '#spin-state-spun', 0.14);
        returnColumnToBench();
        timeline.call(() => setOperationNote(null));
        discardFlowthrough();
        transferBenchTube(
          '#wash-buffer',
          '#work-wash',
          '#spin-column',
          () => {
            gsap.set(spinSelectors, { opacity: 0 });
            gsap.set('#spin-state-loaded', { opacity: 1 });
          },
        );
        timeline.call(() => setOperationNote('12000rpm\n30s'));
        moveColumnToCentrifuge();
        timeline
          .to('#spin-column', { rotation: 1440, duration: 1.05, ease: 'none' });
        crossfadeState(spinSelectors, '#spin-state-spun', 0.14);
        returnColumnToBench();
        timeline.call(() => setOperationNote(null));
        discardFlowthrough('#spin-state-cartridge', false);
        timeline
          .call(() => setOperationNote('12000rpm\n2min'));
        moveColumnToCentrifuge();
        timeline
          .to('#spin-column', { rotation: 1440, duration: 1.15, ease: 'none' });
        crossfadeState(spinSelectors, '#spin-state-clean', 0.16);
        returnColumnToBench();
        timeline
          .call(() => setOperationNote(null))
          .to('#spin-column', { y: 0, duration: 0.32, ease: 'power2.in' })
          .set('#flowthrough-tube', {
            opacity: 0, x: 0, y: 0, rotation: 0, scale: 1, zIndex: 30,
          })
          .set(spinSelectors, { opacity: 0 })
          .set('#spin-state-empty', { opacity: 1 });
        takeAway('#reaction-tube');
        timeline
          .to('#spin-column', { left: '50.2%', top: '82.2%', rotation: 0, scale: 1, duration: 0.65, ease: 'power2.inOut' })
          .to('#pipette', { x: 0, y: 0, duration: 0.55, ease: 'power2.inOut' })
          .set('#pipette', { opacity: 0 })
          .set(['#pipette', '#spin-column'], { zIndex: 30 });
        break;
      case 6:
        setOperationNote(null);
        timeline
          .set('#spin-column', { left: '50.2%', top: '82.2%', rotation: 0, scale: 1, zIndex: 80 })
          .set(spinSelectors, { opacity: 0 })
          .set('#spin-state-empty', { opacity: 1 })
          .set('#collection-tube', { opacity: 0 });
        transferBenchTube(
          '#elution-buffer',
          '#work-elution',
          '#spin-column',
          () => {
            gsap.set(spinSelectors, { opacity: 0 });
            gsap.set('#spin-state-loaded', { opacity: 1 });
          },
        );
        timeline
          .call(() => setOperationNote("Leave for 2 min"))
          .to({}, { duration: 0.75 })
          .call(() => setOperationNote('12000rpm\n2min'));
        moveColumnToCentrifuge();
        timeline
          .to('#spin-column', { rotation: 1440, duration: 1.05, ease: 'none' });
        crossfadeState(spinSelectors, '#spin-state-spun', 0.16);
        returnColumnToBench();
        timeline
          .call(() => setOperationNote(null))
          .to('#spin-column', { left: '55.2%', top: '82.2%', rotation: 0, scale: 1, duration: 0.75, ease: 'power2.inOut' })
          .to('#pipette', { x: 0, y: 0, duration: 0.55, ease: 'power2.inOut' })
          .set('#pipette', { opacity: 0 })
          .set(['#pipette', '#spin-column', '#elution-buffer'], { zIndex: 125 });
        takeAway('#spin-column');
        takeAway('#elution-buffer');
        timeline.set(['#pipette', '#spin-column', '#elution-buffer'], { zIndex: 30 });
        break;
      case 7:
        if (step8Phase === 'powder') {
          finishTimeline = () => setStep8Phase('water');
          timeline
            .set('#agarose-open', { opacity: 1 })
            .set('#agarose-closed', { opacity: 0 })
            .set('#spoon', { zIndex: 105, rotation: 90 });
          moveElementAnchorTo('#spoon', '#spoon-tip-anchor', '#agarose-mouth-anchor', 0.62);
          timeline.to('#spoon', { yPercent: 7, duration: 0.12, repeat: 1, yoyo: true });
          moveElementAnchorTo('#spoon', '#spoon-tip-anchor', '#flask-mouth-anchor', 0.62);
          timeline
            .to('#spoon', { yPercent: 7, duration: 0.12, repeat: 1, yoyo: true })
            .to('#spoon', { x: 0, y: 0, yPercent: 0, duration: 0.58, ease: 'power2.out' })
            .set('#spoon', { zIndex: 30 })
            .set('#agarose-open', { opacity: 0 })
            .set('#agarose-closed', { opacity: 1 });
          break;
        }
        if (step8Phase === 'water') {
          finishTimeline = () => setStep8Phase('bath');
          pourInto('#tae-jug', '#agarose-flask', true, () => {
            gsap.set(flaskSelectors, { opacity: 0 });
            gsap.set('#flask-powder', { opacity: 1 });
          });
          break;
        }
        if (step8Phase === 'bath') {
          finishTimeline = () => setStep8Phase('dye');
          moveElementPointTo('#agarose-flask', '#water-bath', 0.5, 0.9, 0.5, 0.2, 0.84);
          timeline
            .call(() => setOperationNote("Dissolve until clear"))
            .to('#agarose-flask', { filter: 'brightness(1.4)', duration: 0.22, repeat: 4, yoyo: true })
            .set(flaskSelectors, { opacity: 0 })
            .set('#flask-solution', { opacity: 1 })
            .to('#agarose-flask', {
              x: () => {
                const flask = document.querySelector<HTMLElement>('#agarose-flask');
                const currentX = Number(gsap.getProperty('#agarose-flask', 'x')) || 0;
                const bodyWidth = flask?.getBoundingClientRect().width || 48;
                return currentX - bodyWidth * 2;
              },
              filter: 'none',
              duration: 0.62,
              ease: 'power2.out',
            })
            .call(() => setOperationNote("Cool to 60°C"))
            .to({}, { duration: 0.55 })
            .to('#agarose-flask', { x: 0, y: 0, duration: 0.72, ease: 'power2.inOut' })
            .call(() => setOperationNote(null));
          break;
        }
        if (step8Phase === 'dye') {
          finishTimeline = () => setStep8Phase('pourGel');
          timeline
            .call(() => setOperationNote(null))
            .set('#gel-red-closed', { opacity: 0 })
            .set('#gel-red-open', { opacity: 1 });
          transferWithFreshTip('#gel-red-mouth-anchor', '#flask-mouth-anchor', 'blue', 0.5, 0.5, () => {
            gsap.set(flaskSelectors, { opacity: 0 });
            gsap.set('#flask-red', { opacity: 1 });
          });
          timeline
            .set('#gel-red-open', { opacity: 0 })
            .set('#gel-red-closed', { opacity: 1 });
          break;
        }
        if (step8Phase === 'pourGel') {
          finishTimeline = () => setStep8Phase('cover');
          pourInto('#agarose-flask', '#gel-tray', false, () => {
            gsap.set(gelSelectors, { opacity: 0 });
            gsap.set('#gel-state-filled', { opacity: 1 });
          }, false);
          break;
        }
        if (step8Phase === 'cover') {
          finishTimeline = () => setStep8Phase('uncover');
          timeline
            .set('#gel-comb', { zIndex: 100 })
            .to('#gel-comb', { ...getGelCoverPlacement(), duration: 0.62, ease: 'power2.inOut' })
            .to('#gel-tray', { filter: 'brightness(1.12)', duration: 0.2, repeat: 1, yoyo: true });
          break;
        }
        if (step8Phase === 'uncover') {
          finishTimeline = () => setStep8Phase('fillChamber');
          timeline
            .to('#gel-comb', { x: 0, y: 0, scale: 1, duration: 0.56, ease: 'power2.out' });
          takeAway('#gel-comb');
          timeline
            .set(gelSelectors, { opacity: 0 })
            .set('#gel-state-tank', { opacity: 1 })
            .to('#gel-tray', { filter: 'brightness(1.12)', duration: 0.18, repeat: 1, yoyo: true });
          break;
        }
        finishTimeline = () => {
          setStep8Phase('done');
          markStepCompleted(7);
          pendingRestoreStepRef.current = 8;
          setCurrentStep(8);
          setSceneRevision((revision) => revision + 1);
        };
        pourInto('#tae-jug', '#gel-tray', true);
        break;
      case 8:
        if (step9Phase === 'loadSamples') {
          finishTimeline = () => setStep9Phase('showLoading');
          transferWithFreshTip('#purified-product', '#gel-well-anchor', 'blue', 0.18, 0.5, undefined, 0.5, 0.5);
          transferWithFreshTip('#loading-sample', '#gel-well-anchor', 'blue', 0.36, 0.5, undefined, 0.5, 0.5);
          takeAway('#purified-product');
          takeAway('#loading-sample');
          timeline
            .set(gelSelectors, { opacity: 0 })
            .set('#gel-state-tank', { opacity: 1 })
            .set('#pipette', { opacity: 0 });
          break;
        }
        if (step9Phase === 'showLoading') {
          finishTimeline = () => undefined;
          timeline.call(() => setDetail('loading90'));
          break;
        }
        finishTimeline = () => undefined;
        timeline
          .call(() => setOperationNote('120 V\n25 min'))
          .to('#gel-tray', { filter: 'drop-shadow(0 0 6px rgba(255,225,0,.9))', duration: 0.3, repeat: 2, yoyo: true })
          .to({}, { duration: 1.1 })
          .call(() => setDetail('electrophoresisResult'));
        break;
      case 9:
        if (step10Phase === 'openResult') {
          finishTimeline = () => undefined;
          timeline.call(() => setDetail('bandGuide'));
          break;
        }
        finishTimeline = () => setStep10Phase('openResult');
        timeline.set('#uv-gel-transfer', { opacity: 1, zIndex: 130 });
        takeAway('#gel-tray');
        timeline
          .to('#uv-target', { opacity: 1, duration: 0.18 })
          .to('#uv-gel-transfer', { x: () => {
            const source = document.querySelector<HTMLElement>('#uv-gel-transfer');
            const target = document.querySelector<HTMLElement>('#uv-target');
            if (!source || !target) return 0;
            const sr = source.getBoundingClientRect(); const tr = target.getBoundingClientRect();
            return tr.left + tr.width / 2 - (sr.left + sr.width / 2);
          }, y: () => {
            const source = document.querySelector<HTMLElement>('#uv-gel-transfer');
            const target = document.querySelector<HTMLElement>('#uv-target');
            if (!source || !target) return 0;
            const sr = source.getBoundingClientRect(); const tr = target.getBoundingClientRect();
            return tr.top + tr.height / 2 - (sr.top + sr.height / 2);
          }, scale: 0.48, duration: 1.1, ease: 'power2.inOut' })
          .to('#uv-gel-transfer', { opacity: 0, duration: 0.32, ease: 'power2.in' })
          .to('#uv-result', { opacity: 1, duration: 0.55, ease: 'power2.out' })
          .to('#uv-result', { filter: 'brightness(1.6) drop-shadow(0 0 18px rgba(34,211,238,.8))', duration: 0.3, repeat: 3, yoyo: true });
        break;
    }
  }, [isAnimating, markStepCompleted, step10Phase, step8Phase, step9Phase]);

  const handleItemClick = useCallback((itemId: string) => {
    if (isAnimating || isCompleted || detail || activeTargetId !== itemId) return;
    executeStepAnimation(currentStep);
  }, [activeTargetId, currentStep, detail, executeStepAnimation, isAnimating, isCompleted]);

  const closeDetail = useCallback(() => {
    if (detail === 'loading90') {
      setDetail('assembly91');
      return;
    }
    if (detail === 'assembly91') {
      setDetail(null);
      gsap.set([
        '#gel-state-filled', '#gel-state-mold', '#gel-state-solid', '#gel-state-tank',
        '#gel-state-loaded', '#gel-state-bands',
      ], { opacity: 0 });
      gsap.set('#gel-state-powered', { opacity: 1 });
      gsap.set('#power-supply', { opacity: 1 });
      setStep9Phase('run');
      return;
    }
    if (detail === 'electrophoresisResult') {
      setDetail(null);
      setStep9Phase('done');
      markStepCompleted(8);
      pendingRestoreStepRef.current = 9;
      setCurrentStep(9);
      setSceneRevision((revision) => revision + 1);
      return;
    }
    if (detail === 'bandGuide') {
      setDetail(null);
      setStep10Phase('done');
      markStepCompleted(9);
      setCurrentStep(10);
      return;
    }
    setDetail(null);
  }, [detail, markStepCompleted]);

    const stepSnapshots = useStepSnapshots(currentStep, isAnimating,
    () => ({ currentStep, completedSteps, isAnimating, operationNote, incubationDisplay, detail, step8Phase, step9Phase, step10Phase }),
    (state) => {
    setCurrentStep(state.currentStep);
    setCompletedSteps(state.completedSteps);
    setIsAnimating(state.isAnimating);
    setOperationNote(state.operationNote);
    setIncubationDisplay(state.incubationDisplay);
    setDetail(state.detail);
    setStep8Phase(state.step8Phase);
    setStep9Phase(state.step9Phase);
    setStep10Phase(state.step10Phase);
    setHoveredStep(null);
    setSceneRevision((revision) => revision + 1);
  });

const handleStepNavigation = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length || stepIndex > currentStep || isAnimating) return;
    if (hoverResetTimerRef.current !== null) { window.clearTimeout(hoverResetTimerRef.current); hoverResetTimerRef.current = null; }
    if (stepSnapshots.restore(stepIndex)) return;

    motionTimelineRef.current?.kill();
    motionTimelineRef.current = null;
    gsap.killTweensOf(animatedSceneTargets);

    if (hoverResetTimerRef.current !== null) {
      window.clearTimeout(hoverResetTimerRef.current);
      hoverResetTimerRef.current = null;
    }

    setIsAnimating(false);
    setHoveredStep(null);
    setOperationNote(null);
    setIncubationDisplay(null);
    setDetail(null);
    setStep8Phase('powder');
    setStep9Phase('loadSamples');
    setStep10Phase('transferGel');
    setCompletedSteps(Array.from({ length: stepIndex }, (_, index) => index));
    pendingRestoreStepRef.current = stepIndex;
    setCurrentStep(stepIndex);
    setSceneRevision((revision) => revision + 1);
  }, [currentStep, isAnimating, stepSnapshots]);

  const handleStepHover = useCallback((stepIndex: number | null) => {
    if (hoverResetTimerRef.current !== null) {
      window.clearTimeout(hoverResetTimerRef.current);
      hoverResetTimerRef.current = null;
    }

    if (stepIndex === null) {
      hoverResetTimerRef.current = window.setTimeout(() => {
        setHoveredStep(null);
        hoverResetTimerRef.current = null;
      }, 140);
      return;
    }

    setHoveredStep(stepIndex);
  }, []);

  useEffect(() => {
    return () => {
      motionTimelineRef.current?.kill();
      if (hoverResetTimerRef.current !== null) {
        window.clearTimeout(hoverResetTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="experiment-shell experiment-page-6 flex h-screen w-screen flex-col overflow-hidden text-white">
      <header className="flex h-12 shrink-0 items-center justify-between lab-topbar px-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="grid h-8 w-8 shrink-0 place-items-center lab-icon-button"
            aria-label="Back to Experiment Catalog"
            title="Back to Experiment Catalog"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-white">
              Experiment 6: Double Digestion of pET-28a and GFP
            </h1>
            <p className="truncate text-[10px] text-blue-200">Double digestion, column purification and gel verification</p>
          </div>
        </div>
        <RestartExperimentButton onRestart={onRestart} />
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden lg:flex flex-col w-64 p-3 lab-steps-rail shrink-0 overflow-y-auto">
          {sidebarStepData && !isCompleted && (
            <div className="h-[118px] overflow-hidden lab-hint-card p-3 mb-4 shrink-0">
              <div className="flex items-center gap-2 text-blue-200 mb-1">
                <Lightbulb className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {hoveredStep !== null
                    ? `STEP ${hoveredStep + 1}`
                    : currentStep === 0
                      ? 'STEP 1'
                      : `Previous · STEP${currentStep}`}
                </span>
              </div>
              <h3 className="text-xs font-bold mb-1 text-white">{sidebarStepData.title}</h3>
              <p className="max-h-[60px] overflow-hidden text-[11px] text-blue-200 leading-relaxed">{sidebarStepData.description}</p>
            </div>
          )}
          <StepIndicator
            steps={steps}
            currentStep={Math.min(currentStep, steps.length - 1)}
            completedSteps={completedSteps}
            onStepClick={handleStepNavigation}
            onStepHover={handleStepHover}
            tone="exp3"
          />
        </aside>

        <main className="flex-1 lab-bench flex flex-col items-center gap-3 p-3 relative overflow-hidden min-w-0">
          <div className="flex max-h-[72%] min-h-0 w-full shrink-0 items-center justify-center">
            <div
              id="experiment6-canvas"
              className="relative aspect-video w-full max-w-full flex-none shadow-2xl bg-[#1e293b] overflow-clip lab-canvas-frame"
              style={{ width: 'min(100%, calc((100vh - 72px) * 0.72 * 16 / 9))' }}
            >
            <div key={`experiment6-scene-${sceneRevision}`} className="absolute inset-0 overflow-clip bg-[#4774c1]">
              <div className="absolute inset-x-0 top-[35%] bottom-[28%] border-t border-slate-500 bg-[#d9dee7]" />
              <div className="absolute inset-x-0 top-[71%] bottom-0 border-t border-slate-500 bg-[#eeeeee] [clip-path:polygon(4%_0,96%_0,100%_100%,0_100%)]" />

              <img src={pptAssets.uvCabinet} className="pointer-events-none absolute left-[5.8%] top-[10.5%] z-20 w-[12.7%]" alt="UV Imaging Equipment" draggable={false} />
              <div id="uv-door" className="pointer-events-none absolute left-[7.6%] top-[17.5%] z-30 h-[16%] w-[9.1%] rounded-sm border border-[#65696c] bg-[#505457] opacity-0 shadow-inner">
                <span className="absolute right-[5%] top-1/2 h-[18%] w-[3%] -translate-y-1/2 rounded-full bg-slate-300" />
              </div>
              <div id="uv-target" className="pointer-events-none absolute left-[8.5%] top-[20%] z-[45] h-[10%] w-[7.2%] opacity-0" />
              <img id="uv-gel-transfer" src={experiment3Assets.shows3} onClick={() => handleItemClick('uv-gel-transfer')} className={`absolute left-[58.3%] top-[81.4%] z-[130] h-[18%] w-[12%] object-contain opacity-0 transition-[filter] ${isTarget('uv-gel-transfer') ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'}`} style={isTarget('uv-gel-transfer') ? targetGlowStyle : undefined} alt="Gel Backing at Two-thirds" draggable={false} />
              <div id="uv-result" onClick={() => handleItemClick('uv-result')} className={`absolute left-[8.5%] top-[20%] z-40 h-[10%] w-[7.2%] opacity-0 bg-[#090d19] shadow-inner transition-[filter] ${isTarget('uv-result') ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'}`} style={isTarget('uv-result') ? targetGlowStyle : undefined}>
                <span className="absolute left-[20%] top-[18%] h-[3%] w-[58%] bg-cyan-200" />
                <span className="absolute left-[30%] top-[42%] h-[5%] w-[38%] bg-violet-300" />
                <span className="absolute left-[14%] top-[69%] h-[4%] w-[66%] bg-cyan-300" />
              </div>

              <img id="tae-jug" src={pptAssets.taeJug} onClick={() => handleItemClick('tae-jug')} className={`absolute left-[23.7%] top-[30.4%] z-20 w-[4.6%] transition-[filter] ${isTarget('tae-jug') ? 'pointer-events-auto z-[90] cursor-pointer' : 'pointer-events-none'}`} style={isTarget('tae-jug') ? targetGlowStyle : undefined} alt="TAE Buffer Container" draggable={false} />
              <img src={pptAssets.labTable} className="pointer-events-none absolute left-[33.7%] top-[26.9%] z-10 w-[32.2%]" alt="Laboratory Bench" draggable={false} />
              <img id="water-bath" src={pptAssets.waterBath} className="pointer-events-none absolute left-[39%] top-[14.4%] z-20 w-[9.2%]" alt="Water Bath" draggable={false} />
              <img id="centrifuge" src={pptAssets.centrifuge} className="pointer-events-none absolute left-[55%] top-[12.5%] z-20 w-[5.1%]" alt="Centrifuge" draggable={false} />
              <img src={pptAssets.cleanBenchSmall} className="pointer-events-none absolute left-[78.7%] top-[6.9%] z-20 w-[13.5%]" alt="Laminar Flow Cabinet" draggable={false} />
              <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/hospital-logo.avif" className="pointer-events-none absolute left-[82.75%] top-[-0.73%] z-30 w-[6.98%]" alt="First Hospital of Jilin University Emblem" draggable={false} />
              <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/igem-logo.avif" className="pointer-events-none absolute left-[91.37%] top-[1.05%] z-30 w-[7.84%]" alt="iGEM Logo" draggable={false} />

              {incubationDisplay && (
                <div id="incubation-timer" className={`pointer-events-none absolute z-[70] flex items-center gap-2 text-black ${incubationDisplay.temperature === "Ice Bath" ? 'left-[70%] top-[56%]' : 'left-[47.5%] top-[5%]'}`}>
                  <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/hours.avif" className="w-14 shrink-0 drop-shadow-[0_0_10px_rgba(255,220,80,0.8)]" alt="Experiment Timer" draggable={false} />
                  <div className="font-mono text-xl font-semibold italic leading-tight">
                    <div>{incubationDisplay.temperature}</div>
                    <div>{incubationDisplay.duration}</div>
                  </div>
                </div>
              )}

              {displayedOperationNote && (
                <div className={`pointer-events-none absolute ${operationNotePosition} z-[70] whitespace-pre-line text-center font-mono text-lg font-semibold italic leading-tight text-black`}>
                  {displayedOperationNote}
                </div>
              )}

              <img
                id="tube-rack"
                src={pptAssets.tubeRack}
                onClick={() => handleItemClick('tube-rack')}
                className={`absolute left-[6.4%] top-[82%] z-20 w-[14.7%] pointer-events-auto transition-[filter] duration-200 ${isTarget('tube-rack') ? 'z-[90] cursor-pointer' : ''}`}
                style={isTarget('tube-rack') ? targetGlowStyle : undefined}
                role="button"
                aria-label="Reagent Rack"
                alt="Centrifuge Tube Rack"
                draggable={false}
              />
              <div id="rack-reagents" className={`pointer-events-none absolute inset-0 ${isTarget('tube-rack') ? 'z-[95]' : 'z-30'}`}>
                <ReagentTube id="reagent-hindiii" alt="HindIII" title="HindIII" color="#0f766e" className="left-[7.2%] top-[77.4%] h-[14.55%] w-[2.15%]" />
                <div id="binding-buffer" onClick={() => handleItemClick('binding-buffer')} className={`absolute left-[9.55%] top-[78.2%] h-[14.55%] w-[2.15%] ${isTarget('binding-buffer') ? 'pointer-events-auto z-[90] cursor-pointer' : ''}`} style={isTarget('binding-buffer') ? compactTargetGlowStyle : undefined}>
                  <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/sample-clear.avif" className="h-full w-full object-contain" alt="Gray Binding Buffer Tube" draggable={false} />
                  <span className="pointer-events-none absolute left-[36%] top-[47%] h-[16%] w-[28%] border-[0.5px] border-slate-800/80 bg-[#C0C0C0]" />
                </div>
                <ReagentTube id="reagent-buffer" alt="Double-digestion Buffer" title="Double-digestion Buffer" color="#f97316" className="left-[11.9%] top-[75.4%] h-[14.55%] w-[2.15%]" />
                <div id="wash-buffer" onClick={() => handleItemClick('wash-buffer')} className={`absolute left-[14.25%] top-[75.9%] h-[14.55%] w-[2.15%] ${isTarget('wash-buffer') ? 'pointer-events-auto z-[90] cursor-pointer' : ''}`} style={isTarget('wash-buffer') ? compactTargetGlowStyle : undefined}>
                  <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/sample-clear.avif" className="h-full w-full object-contain" alt="Dark Green Wash Buffer Tube" draggable={false} />
                  <span className="pointer-events-none absolute left-[36%] top-[47%] h-[16%] w-[28%] border-[0.5px] border-slate-800/80 bg-emerald-900" />
                </div>
                <ReagentTube id="reagent-bamhi" alt="BamHI" title="BamHI" color="#581c87" className="left-[16.6%] top-[74.8%] h-[14.55%] w-[2.15%]" />
                <ReagentTube id="reagent-water" alt="ddH2O" title="ddH2O" color="#98FF98" className="left-[18.95%] top-[74.5%] h-[14.55%] w-[2.15%]" />
                {currentStep === 0 && <ReagentTube id="reagent-pet" alt="pET-28a plasmid" title="pET-28a plasmid" color="#1d4ed8" imageSrc={experiment6StateAssets.sampleLiquid} labelShape="circle" className="left-[76.5%] top-[62.5%] h-[22.95%] w-[3.83%]" />}
                {currentStep === 0 && <ReagentTube id="reagent-gfp" alt="GFP PCR product" title="GFP PCR product" color="#ea580c" imageSrc={experiment6StateAssets.sampleLiquid} labelShape="circle" className="left-[81%] top-[62.2%] h-[22.95%] w-[3.83%]" />}
              </div>

              <div id="working-reagents" className="pointer-events-none absolute inset-0 z-[85] opacity-0">
                <ReagentTube id="work-hindiii" alt="HindIII in Use" color="#0f766e" className="left-[58.5%] top-[80.5%] h-[13%] w-[3.1%]" />
                <ReagentTube id="work-water" alt="ddH₂O in Use" color="#98FF98" className="left-[58.5%] top-[80.5%] h-[13%] w-[3.1%]" />
                <ReagentTube id="work-buffer" alt="Double-digestion Buffer in Use" color="#f97316" className="left-[58.5%] top-[80.5%] h-[13%] w-[3.1%]" />
                <ReagentTube id="work-bamhi" alt="BamHI in Use" color="#581c87" className="left-[58.5%] top-[80.5%] h-[13%] w-[3.1%]" />
                <ReagentTube id="work-binding" alt="Gray Binding Buffer in Use" color="#C0C0C0" className="left-[58.5%] top-[80.5%] h-[13%] w-[3.1%]" />
                <ReagentTube id="work-wash" alt="Dark Green Wash Buffer in Use" color="#064e3b" className="left-[47.5%] top-[78.5%] h-[13%] w-[3.1%]" />
                <ReagentTube id="work-elution" alt="Elution Buffer in Use" color="#c71585" className="left-[60.5%] top-[78%] h-[13%] w-[3.1%]" />
                <ReagentTube id="work-pet" alt="pET-28a Plasmid in Use" color="#1d4ed8" imageSrc={experiment6StateAssets.sampleLiquid} labelShape="circle" className="left-[58.5%] top-[79%] h-[15%] w-[3.1%]" />
                <ReagentTube id="work-gfp" alt="GFP PCR Product in Use" color="#ea580c" imageSrc={experiment6StateAssets.sampleLiquid} labelShape="circle" className="left-[58.5%] top-[79%] h-[15%] w-[3.1%]" />
              </div>

              <div id="gel-red-bottle" onClick={() => handleItemClick('gel-red-bottle')} className={`absolute left-[23.7%] top-[67%] z-20 h-[11%] w-[3.8%] transition-[filter] ${isTarget('gel-red-bottle') ? 'pointer-events-auto z-[90] cursor-pointer' : 'pointer-events-none'}`} style={isTarget('gel-red-bottle') ? targetGlowStyle : undefined}>
                <img id="gel-red-closed" src={experiment3Assets.dyeClosed} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Closed GelRed Bottle" draggable={false} />
                <img id="gel-red-open" src={experiment3Assets.dyeOpen} className="absolute inset-0 h-full w-full object-contain object-bottom opacity-0" alt="Open GelRed Bottle" draggable={false} />
                <span id="gel-red-mouth-anchor" className="pointer-events-none absolute left-[50%] top-[12%] h-px w-px" />
              </div>
              <div id="agarose-bottle" onClick={() => handleItemClick('agarose-bottle')} className={`absolute left-[30.4%] top-[63%] z-20 h-[15%] w-[4.8%] transition-[filter] ${isTarget('agarose-bottle') ? 'pointer-events-auto z-[90] cursor-pointer' : 'pointer-events-none'}`} style={isTarget('agarose-bottle') ? targetGlowStyle : undefined}>
                <img id="agarose-closed" src={experiment3Assets.powderClosed} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Closed Agarose Bottle" draggable={false} />
                <img id="agarose-open" src={experiment3Assets.powderOpen} className="absolute inset-0 h-full w-full object-contain object-bottom opacity-0" alt="Open Agarose Bottle" draggable={false} />
                <span id="agarose-mouth-anchor" className="pointer-events-none absolute left-[65.1%] top-[8.8%] h-px w-px" />
              </div>
              <div id="waste-cylinder" className="pointer-events-none absolute left-[50.3%] top-[66%] z-30 h-[12%] w-[4.8%]">
                <img src={experiment3Assets.measuringCylinder} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Graduated Cylinder" draggable={false} />
              </div>
              <div id="tips-blue-box" className="pointer-events-none absolute left-[56.9%] top-[67.2%] z-20 h-[14%] w-[6%]">
                <img id="tips-blue-closed" src={experiment3Assets.tipBoxWhiteClosed} className="absolute inset-0 h-full w-full object-contain" alt="Closed Large White Tip Box" draggable={false} />
                <img id="tips-blue-open" src={experiment3Assets.tipBoxWhiteOpen} className="absolute inset-0 h-full w-full object-contain opacity-0" alt="Open Large White Tip Box" draggable={false} />
              </div>
              <div id="tips-white-box" className="pointer-events-none absolute left-[65.8%] top-[67.2%] z-20 h-[14%] w-[6%]">
                <img id="tips-white-closed" src={experiment3Assets.tipBoxBlueClosed} className="absolute inset-0 h-full w-full object-contain" alt="Closed Small Blue Tip Box" draggable={false} />
                <img id="tips-white-open" src={experiment3Assets.tipBoxBlueOpen} className="absolute inset-0 h-full w-full object-contain opacity-0" alt="Open Small Blue Tip Box" draggable={false} />
              </div>
              <img id="metal-tray" src={pptAssets.metalTray} className="pointer-events-none absolute left-[35.18%] top-[75.8%] z-20 w-[9.3%] origin-bottom scale-[0.6667]" alt="Metal Tray" draggable={false} />
              <div id="spoon" className="pointer-events-none absolute left-[37.3%] top-[88%] z-30 w-[5%] rotate-90" style={{ aspectRatio: '265 / 68' }}>
                <img src={experiment3Assets.spoon} className="absolute inset-0 h-full w-full object-contain" alt="Spatula" draggable={false} />
                <span id="spoon-tip-anchor" className="absolute left-[90.19%] top-[64%] h-px w-px" />
              </div>
              <img id="ice-box" src={pptAssets.iceBox} className="pointer-events-none absolute left-[74.4%] top-[72%] z-20 w-[12.4%]" alt="Ice Box" draggable={false} />
              <img id="power-supply" src={pptAssets.powerSupply} className="pointer-events-none absolute left-[87.8%] top-[72%] z-20 w-[9%] opacity-100" alt="Electrophoresis Power Supply" draggable={false} />
              <img id="gel-comb" src={experiment3Assets.castingCover} onClick={() => handleItemClick('gel-comb')} className={`absolute left-[70.2%] top-[82%] z-40 w-[7%] opacity-0 transition-[filter] ${isTarget('gel-comb') ? 'pointer-events-auto z-[90] cursor-pointer' : 'pointer-events-none'}`} style={isTarget('gel-comb') ? targetGlowStyle : undefined} alt="Green Casting Cover" draggable={false} />

              <div
                id="pipette"
                onClick={() => handleItemClick('pipette')}
                className={`absolute left-[62.5%] top-[54%] w-[5.2%] overflow-visible opacity-0 transition-[filter,opacity] duration-200 ${isTarget('pipette') ? 'pointer-events-auto z-[90] cursor-pointer' : 'pointer-events-none z-30'}`}
                style={isTarget('pipette') ? targetGlowStyle : undefined}
                role="button"
                aria-label="Pipette"
              >
                <img id="pipette-body-empty" src={experiment3Assets.pipette} className="pointer-events-none block w-full object-contain" alt="Pipette" draggable={false} />
                <img id="pipette-body-blue" src={experiment3Assets.pipetteBodyWhite} className="pointer-events-none absolute inset-0 w-full object-contain opacity-0" alt="Pipette with Large White Tip from Left Box" draggable={false} />
                <img id="pipette-body-white" src={experiment3Assets.pipetteBodyBlue} className="pointer-events-none absolute inset-0 w-full object-contain opacity-0" alt="Pipette with Small Blue Tip from Right Box" draggable={false} />
                <img id="pipette-tip-blue" src={experiment3Assets.pipetteTipWhite} className="pointer-events-none absolute left-1/2 top-[92%] h-[16%] w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-0" alt="Large White Tip from Left Box" draggable={false} />
                <img id="pipette-tip-white" src={experiment3Assets.pipetteTipBlue} className="pointer-events-none absolute left-1/2 top-[92%] h-[16%] w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-0" alt="Small Blue Tip from Right Box" draggable={false} />
              </div>
              <div
                id="reaction-tube"
                onClick={() => handleItemClick('reaction-tube')}
                className={`absolute left-[65.5%] top-[82.5%] h-[15%] w-[7%] opacity-0 pointer-events-auto transition-[filter,outline-color,opacity] duration-200 ${isTarget('reaction-tube') ? 'z-[90] cursor-pointer' : 'z-30'}`}
                style={isTarget('reaction-tube') ? compactTargetGlowStyle : undefined}
                role="button"
                aria-label="Digestion Reaction Tube"
              >
                <img id="reaction-state-closed" src={experiment6StateAssets.reactionEmpty} className="pointer-events-none absolute left-[47.02%] top-[11.82%] h-[78.665%] w-auto max-w-none -translate-x-1/2" alt="Empty Conical Tube" draggable={false} />
                <img id="reaction-state-open" src={experiment6StateAssets.reactionEmpty} className="pointer-events-none absolute left-[47.02%] top-[11.82%] h-[78.665%] w-auto max-w-none -translate-x-1/2 opacity-0" alt="Conical Tube During Mixing" draggable={false} />
                <img id="reaction-state-liquid" src={experiment6StateAssets.reactionLiquid} className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0" alt="Conical Tube with Liquid" draggable={false} />
                <img id="reaction-state-complete" src={experiment6StateAssets.reactionComplete} className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0" alt="Prepared Digestion Reaction Tube" draggable={false} />
                <span id="reaction-bottom-anchor" className="pointer-events-none absolute left-[45.97%] top-[78.66%] h-px w-px -translate-x-1/2" />
              </div>
              <div id="flowthrough-tube" className="pointer-events-none absolute left-[55.5%] top-[82.2%] z-30 h-[15%] w-[7%] opacity-0">
                <img id="flowthrough-liquid" src={experiment6StateAssets.splitCollectionTube} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Separated Collection Tube with Waste" draggable={false} />
                <img id="flowthrough-empty" src={experiment3Assets.emptyTube} className="absolute inset-0 h-full w-full object-contain object-bottom opacity-0" alt="Empty Tube After Discarding Waste" draggable={false} />
              </div>
              <img
                id="collection-tube"
                src={experiment3Assets.emptyTube}
                className="pointer-events-none absolute left-[54.1%] top-[82%] z-30 h-[15%] w-[7%] object-contain object-bottom opacity-0"
                alt="New Collection Tube"
                draggable={false}
              />
              <div
                id="spin-column"
                onClick={() => handleItemClick('spin-column')}
                className={`absolute ${currentStep === 6 ? 'left-[50.2%] top-[80%]' : currentStep >= 7 ? 'left-[55.2%] top-[80%]' : 'left-[55.2%] top-[80%]'} h-[17%] w-[6.5%] opacity-0 transition-[filter,outline-color] duration-200 ${isTarget('spin-column') ? 'pointer-events-auto z-[90] cursor-pointer' : 'pointer-events-none z-30'}`}
                style={isTarget('spin-column') ? compactTargetGlowStyle : undefined}
                role="button"
                aria-label="Silica Column"
              >
                <img id="spin-state-empty" src={experiment3Assets.columnEmpty} className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom" alt="Empty Column in Collection Tube" draggable={false} />
                <img id="spin-state-loaded" src={experiment6StateAssets.columnLoaded} className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom opacity-0" alt="Loaded Purification Column" draggable={false} />
                <img id="spin-state-spun" src={experiment6StateAssets.columnLoaded} className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom opacity-0" alt="Column After Centrifugation" draggable={false} />
                <img id="spin-state-cartridge" src={experiment3Assets.columnCartridge} className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom opacity-0" alt="Column Removed from Collection Tube" draggable={false} />
                <img id="spin-state-clean" src={experiment3Assets.columnCartridge} className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom opacity-0" alt="Dried Empty Column" draggable={false} />
              </div>
              <div
                id="elution-buffer"
                onClick={() => handleItemClick('elution-buffer')}
                className={`absolute left-[63%] top-[83%] h-[9.2%] w-[3.1%] transition-[filter,outline-color,opacity] duration-200 ${currentStep === 6 ? 'opacity-100' : 'opacity-0'} ${isTarget('elution-buffer') ? 'pointer-events-auto z-[90] cursor-pointer' : 'pointer-events-none z-30'}`}
                style={isTarget('elution-buffer') ? compactTargetGlowStyle : undefined}
                role="button"
                aria-label="Elution buffer"
              >
                <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/image20.avif" className="pointer-events-none absolute inset-0 h-full w-full object-contain" alt="Complete Elution Tube" draggable={false} />
                <span className="pointer-events-none absolute left-[34%] top-[52%] h-[18%] w-[32%] border-[0.5px] border-slate-700/70 bg-[#c71585]" />
              </div>
              <div
                id="agarose-flask"
                onClick={() => handleItemClick('agarose-flask')}
                className={`absolute left-[14.58%] top-[61.19%] h-[17.42%] w-[8.33%] transition-[filter] duration-200 ${isTarget('agarose-flask') ? 'pointer-events-auto z-[90] cursor-pointer' : 'pointer-events-none z-30'}`}
                style={isTarget('agarose-flask') ? targetGlowStyle : undefined}
                role="button"
                aria-label="Agarose Flask"
              >
                <img id="flask-empty" src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/img17.avif" className="pointer-events-none absolute inset-0 h-full w-full object-contain" alt="Empty Flask" draggable={false} />
                <img id="flask-powder" src={pptAssets.flaskPowder} className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0" alt="Flask Containing Agarose" draggable={false} />
                <img id="flask-solution" src={pptAssets.flaskSolution} className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0" alt="Dissolved Agarose Solution" draggable={false} />
                <img id="flask-red" src={pptAssets.flaskRed} className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0" alt="Flask After Adding Nucleic Acid Stain" draggable={false} />
                <span id="flask-mouth-anchor" className="pointer-events-none absolute left-[51.1%] top-[8.1%] h-px w-px" />
              </div>
              <img id="purified-product" src={experiment3Assets.columnEmpty} className="pointer-events-none absolute left-[70.3%] top-[80%] z-40 h-[17%] w-[6.5%] object-contain object-bottom opacity-0" alt="Purified Product Container" draggable={false} />
              <img id="loading-sample" src={experiment6StateAssets.loadingBuffer} className="pointer-events-none absolute left-[79.5%] top-[77.5%] z-40 h-[18%] w-[3.15%] object-contain object-bottom opacity-0" alt="81756 Loading Solution" draggable={false} />
              <div
                id="gel-tray"
                onClick={() => handleItemClick('gel-tray')}
                className={`absolute left-[58.3%] top-[81.4%] h-[18%] w-[12%] opacity-0 transition-[filter] duration-200 ${isTarget('gel-tray') ? 'pointer-events-auto z-[90] cursor-pointer' : 'pointer-events-none z-30'}`}
                style={isTarget('gel-tray') ? targetGlowStyle : undefined}
                role="button"
                aria-label="Gel Electrophoresis Assembly"
              >
                <span id="gel-well-anchor" className="pointer-events-none absolute left-[50%] top-[34%] h-px w-px" />
                <img id="gel-state-filled" src={experiment3Assets.castingFilled} className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom" alt="Green Casting Tray with Red Gel" draggable={false} />
                <img id="gel-state-mold" src={experiment3Assets.castingBase} className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom opacity-0" alt="Green Casting Tray" draggable={false} />
                <div id="gel-state-solid" className="pointer-events-none absolute inset-0 opacity-0">
                  <img src={experiment3Assets.castingBase} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Green Casting Frame" draggable={false} />
                  <div className="pointer-events-none absolute bottom-[21%] left-[27.5%] h-[42%] w-[45%] overflow-hidden">
                    <img
                      src={experiment3Assets.castingSolid}
                      className="absolute max-w-none"
                      style={{ width: '134.09%', height: '260.62%', left: '-17.45%', top: '-126.6%' }}
                      alt="Red Gel Backing"
                      draggable={false}
                    />
                  </div>
                </div>
                <div id="gel-state-tank" className="pointer-events-none absolute inset-0 opacity-0">
                  <img src={experiment3Assets.castingBase} className="absolute inset-0 z-10 h-full w-full object-contain object-bottom" alt="Green Electrophoresis Tank Frame" draggable={false} />
                  <div
                    id="gel-red-board"
                    onClick={() => handleItemClick('gel-red-board')}
                    className={`pointer-events-none absolute bottom-[21%] left-[27.5%] z-20 h-[42%] w-[45%] overflow-hidden transition-[filter] ${isTarget('gel-red-board') ? 'pointer-events-auto cursor-pointer' : ''}`}
                    style={isTarget('gel-red-board') ? targetGlowStyle : undefined}
                    role="button"
                    aria-label="Red Gel Backing"
                  >
                    <img
                      src={experiment3Assets.castingSolid}
                      className="pointer-events-none absolute max-w-none"
                      style={{ width: '134.09%', height: '260.62%', left: '-17.45%', top: '-126.6%' }}
                      alt="Red Gel Backing"
                      draggable={false}
                    />
                  </div>
                </div>
                <img id="gel-state-powered" src={pptAssets.gelPowered} className="pointer-events-none absolute bottom-0 left-1/2 w-[150%] max-w-none -translate-x-1/2 object-contain opacity-0" alt="Powered Electrophoresis Assembly" draggable={false} />
                <img id="gel-state-loaded" src={pptAssets.gelLoaded} className="pointer-events-none absolute bottom-0 left-1/2 h-full -translate-x-1/2 object-contain opacity-0" alt="Loaded Gel" draggable={false} />
                <div id="gel-state-bands" className="pointer-events-none absolute inset-0 opacity-0">
                  <img src={experiment3Assets.castingBase} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Green Gel Frame" draggable={false} />
                </div>
              </div>

              <img id="loading-guide" src={experiment3Assets.shows1} className="pointer-events-none absolute left-[29%] top-[31%] z-[120] h-[52%] w-[42%] object-contain opacity-0 drop-shadow-xl" alt="Gel Loading Procedure" draggable={false} />
              <img id="gel-exploded" src={experiment3Assets.shows2} className="pointer-events-none absolute left-[58%] top-[28%] z-[120] h-[52%] w-[34%] object-contain opacity-0 drop-shadow-xl" alt="Electrophoresis Tank Assembly" draggable={false} />

            </div>

            {detail && (
              <div className="absolute inset-0 z-[200] flex items-center justify-center pointer-events-auto">
                <button type="button" aria-label="Close enlarged image" className="absolute inset-0 cursor-pointer lab-scrim" onClick={closeDetail} />
                {detail === 'bandGuide' ? (
                  <div className="relative z-10 max-h-[88%] w-[min(680px,86%)] overflow-auto lab-chalk-sheet px-8 py-6">
                    <h3 className="mb-4 text-center text-lg font-black text-blue-200">Interpret Digested Fragment Bands</h3>
                    <div className="relative mx-auto max-w-[560px] border-l-2 border-dashed border-blue-300/70 pl-7 text-sm leading-6 text-blue-50">
                      <div className="mb-4 font-bold">[TOP] ← Loading wells (negative electrode)</div>
                      <div className="mb-8 rounded-md border border-cyan-300/40 bg-cyan-400/10 px-4 py-3">
                        <span className="font-bold text-cyan-200">[LINEARIZED pET-28a]</span>
                        <span> ← 5.3 kb, near the top</span>
                      </div>
                      <div className="mb-7 text-blue-200/60">(Blank area)</div>
                      <div className="mb-4 border-l-4 border-emerald-400 pl-4">
                        <div className="mb-2 font-bold text-emerald-200">【DL2000 Marker】</div>
                        <div className="font-black text-white">2000 bp</div>
                        <div>1000 bp</div>
                        <div>750 bp</div>
                        <div className="my-1 font-black text-cyan-200">[GFP FRAGMENT] ← Bright band at 720 bp</div>
                        <div>500 bp</div><div>250 bp</div><div>100 bp</div>
                      </div>
                      <div className="text-lg text-blue-200">↓</div>
                      <div className="font-bold">[BOTTOM] ← Positive electrode (dye front)</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex max-h-[88%] max-w-[86%] items-center gap-7 lab-chalk-sheet p-6">
                    <img src={detail === 'loading90' ? experiment3Assets.shows1 : detail === 'assembly91' ? experiment3Assets.shows2 : experiment3Assets.shows3} className={`max-h-[56vh] object-contain ${detail === 'assembly91' ? 'w-[300px]' : detail === 'loading90' ? 'w-[440px]' : 'w-[360px]'}`} alt="Experiment 6 Procedure View" draggable={false} />
                    <div className="max-w-[280px] border-l-4 border-blue-500 pl-4 text-sm leading-relaxed text-slate-200">
                      <h3 className="mb-3 text-lg font-black text-blue-300">{detail === 'loading90' ? "Confirm Loading Positions" : detail === 'assembly91' ? "Electrophoresis Tank Structure" : "Electrophoresis Image"}</h3>
                      <p>{detail === 'loading90' ? "Purified sample and DL2000 ladder loaded into adjacent wells." : detail === 'assembly91' ? "This exploded view illustrates the tank layers and disappears when closed." : "Electrophoresis complete. Transfer the gel backing to the UV imager."}</p>
                      <p className="mt-4 text-[10px] text-blue-300/70">Click the dark background to continue</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isCompleted && !detail && <ExperimentCompletion onRestart={onRestart} onBack={onBack} />}
            </div>
          </div>

          {(currentStepData || isCompleted) && (
            <div className="w-full min-h-[112px] flex-1 px-1 pt-1 text-left">
              <div className="lab-step-caption mb-2 flex items-center gap-2 text-sm font-bold">
                <span className="text-blue-400">Step {Math.min(currentStep + 1, steps.length)}/{steps.length}</span>
                <span className="text-blue-500">|</span>
                <span className="text-blue-400">{(currentStepData ?? steps[steps.length - 1]).title}</span>
              </div>
              <div className="flex h-[calc(100%-30px)] items-center justify-center lab-note-card px-4 py-3 text-center text-xs leading-relaxed">
                {(currentStepData ?? steps[steps.length - 1]).description}
              </div>
              <div className="mt-2 flex justify-end" />
            </div>
          )}
        </main>

        {showInfo && (
          <aside className="hidden xl:flex flex-col w-80 p-3 lab-info-rail shrink-0 overflow-y-auto">
            <Experiment6InfoPanel />
          </aside>
        )}
      </div>

      <div className="fixed inset-0 z-[2000] lab-rotate-overlay flex flex-col items-center justify-center lg:hidden portrait:flex hidden px-8 text-center text-white">
        <div className="w-16 h-16 mb-4 animate-bounce text-4xl">🔄</div>
        <h2 className="text-xl font-bold">Rotate Your Device to Landscape</h2>
      </div>
    </div>
  );
}
