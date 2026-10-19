import { useStepSnapshots } from '../hooks/use-step-snapshots';
import { RestartExperimentButton, ExperimentCompletion } from '../components/ExperimentControls';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Lightbulb } from 'lucide-react';
import gsap from 'gsap';
import { Experiment8InfoPanel } from '../components/Experiment8InfoPanel';
import { StepIndicator } from '../components/StepIndicator';
import type { ExperimentStep } from '../types';
const lbBottleBenchImg = 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image53.avif';

interface ExperimentPageProps {
  experimentId?: string;
  onBack: () => void;
  onRestart: () => void;
}


const assets = {
  labTable: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image3.avif`,
  sideTable: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image4.avif`,
  pipette: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image5.avif`,
  pipetteWithTip: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image72.avif`,
  vent: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image6.avif`,
  fluorescentLamp: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image8.avif`,
  hospitalLogo: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image9.avif`,
  igemLogo: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image10.avif`,
  incubator: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image11.avif`,
  colonyPlate: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image12.avif`,
  metalTray: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image13.avif`,
  shaker: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image14.avif`,
  shakerLoadedOpen: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image36.avif`,
  shakerLoadedClosed: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image39.avif`,
  centrifuge: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image15.avif`,
  miniCentrifuge: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image17.avif`,
  ultrasonicCleaner: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image18.avif`,
  beaker: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image19.avif`,
  lbBottle: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image20.avif`,
  lbBottleBench: lbBottleBenchImg,
  inoculatingLoop: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image21.avif`,
  spreader: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image22.avif`,
  alcoholLampOff: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/6.avif',
  alcoholLampOn: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/26.avif',
  flask: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image24.avif`,
  iceBox: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image25.avif`,
  centrifugeTube: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image26.avif`,
  centrifugeTubeOpen: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image40.avif`,
  centrifugeTubeLiquid: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image49.avif`,
  centrifugeTubeFilled: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image70.avif`,
  centrifugeTubePurple: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image71.avif`,
  tubeRack: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image27.avif`,
  microtube: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image28.avif`,
  iceMicrotube: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image52.avif`,
  reagentBottle: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image29.avif`,
  tipBoxPink: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image30.avif`,
  tipBoxGray: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image31.avif`,
  tipBoxGrayOpen: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image37.avif`,
  tipBoxBeige: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image32.avif`,
  plate: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image34.avif`,
  iceReagentOrange: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image47.avif`,
  iceReagentBlue: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image48.avif`,
  iceReagentOrangeCapped: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image76.avif`,
  iceReagentBlueCapped: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image75.avif`,
  iceTubeOrange: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image42.avif`,
  iceTubeOpen: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image43.avif`,
  plasmidTubeBlue: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image73.avif`,
  plasmidTubeBench: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image74.avif`,
  pourTube: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image43.avif`,
  pouredTube: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image44.avif`,
  iceBathTube: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image41.avif`,
  centrifugedTube: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image42.avif`,
  iceTubeEmpty: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image44.avif`,
  resultPlate: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image56.avif`,
  resultPlatePhoto: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/image57.avif`,
} as const;

const steps: ExperimentStep[] = [
  {
    id: 1,
    title: "Inoculate and Culture",
    description: "Pick a DH5α colony with a sterile loop and inoculate 5 mL LB broth. Shake at 37°C for 12–16 h.",
    highlightItems: ['metal-tray'],
    animationType: 'move',
    completed: false,
  },
  {
    id: 2,
    title: "Expand the Culture",
    description: "Inoculate 50 mL fresh LB with the seed culture at 1:100. Shake at 37°C to early logarithmic growth.",
    highlightItems: ['shaker'],
    animationType: 'move',
    completed: false,
  },
  {
    id: 3,
    title: "Chill the Culture",
    description: "Transfer the culture to a sterile chilled 50 mL tube and leave on ice for 30 min.",
    highlightItems: ['ice-box'],
    animationType: 'cool',
    completed: false,
  },
  {
    id: 4,
    title: "Pellet the Cells",
    description: "Centrifuge at 4°C and 4000 rpm for 10 min. Remove all supernatant and retain the cell pellet.",
    highlightItems: ['centrifuge'],
    animationType: 'move',
    completed: false,
  },
  {
    id: 5,
    title: "Calcium Chloride Treatment",
    description: "Add 10 mL chilled CaCl₂ to the pellet, gently mix by pipetting and leave on ice for 30 min.",
    highlightItems: ['calcium-chloride'],
    animationType: 'cool',
    completed: false,
  },
  {
    id: 6,
    title: "Centrifuge Again",
    description: "Centrifuge at 4°C and 4000 rpm for 10 min. Discard the supernatant and retain the pellet.",
    highlightItems: ['centrifuge'],
    animationType: 'move',
    completed: false,
  },
  {
    id: 7,
    title: "Resuspend and Aliquot",
    description: "Resuspend cells in 2 mL chilled CaCl₂ with 15% glycerol. Dispense 100 μL per tube.",
    highlightItems: ['pipette'],
    animationType: 'place',
    completed: false,
  },
  {
    id: 8,
    title: "Add Plasmid",
    description: "Add 5 μL recombinant plasmid to 100 μL competent cells, gently mix and leave on ice for 30 min.",
    highlightItems: ['plasmid'],
    animationType: 'move',
    completed: false,
  },
  {
    id: 9,
    title: "Heat-shock Transformation",
    description: "Heat-shock at 42°C for 90 s, then immediately transfer to ice for 2 min.",
    highlightItems: ['water-bath'],
    animationType: 'heat',
    completed: false,
  },
  {
    id: 10,
    title: "Recovery Culture",
    description: "Add 900 μL fresh LB broth, gently mix and shake at 37°C for 1 h.",
    highlightItems: ['shaker'],
    animationType: 'wait',
    completed: false,
  },
  {
    id: 11,
    title: "Plate for Selection",
    description: "Spread 200 μL culture evenly onto an LB kanamycin plate with a sterile spreader. Leave at room temperature for 10 min.",
    highlightItems: ['plate'],
    animationType: 'streak',
    completed: false,
  },
  {
    id: 12,
    title: "Incubate and Observe",
    description: "Invert the plate and incubate at 37°C for 12–16 h. Observe colony growth.",
    highlightItems: ['incubator'],
    animationType: 'wait',
    completed: false,
  },
];

type StageAction =
  | 'prepare-sterile-tools' | 'pick-colony' | 'prepare-seed-flask' | 'move-to-shaker' | 'incubate'
  | 'transfer-seed' | 'move-large-flask' | 'grow-to-log' | 'prepare-50ml-tube' | 'pour-culture' | 'ice-30'
  | 'move-to-centrifuge' | 'centrifuge' | 'discard-supernatant'
  | 'prepare-cacl2' | 'change-tip' | 'resuspend-ten-times' | 'ice-cacl2'
  | 'move-to-centrifuge-again' | 'centrifuge-again' | 'discard-supernatant-again'
  | 'prepare-glycerol-cacl2' | 'change-tip-again' | 'resuspend'
  | 'take-rack-tube' | 'change-tip-and-transfer' | 'take-plasmid-tube'
  | 'prepare-plasmid' | 'add-plasmid' | 'ice-plasmid' | 'heat-shock' | 'ice-two-minutes' | 'finish-cooling'
  | 'prepare-lb' | 'add-lb'
  | 'spread-plate' | 'incubate-plate' | 'return-plate';

interface PptStage {
  slide: number;
  majorStep: number;
  target: string;
  action: StageAction;
  prompt: string;
}

const pptStages: PptStage[] = [
  { slide: 3, majorStep: 0, target: 'metal-tray', action: 'prepare-sterile-tools', prompt: "Click the metal tray holding the loop to prepare for flame sterilization." },
  { slide: 5, majorStep: 0, target: 'colony-plate', action: 'pick-colony', prompt: "Click the plate to pick a single colony with the loop." },
  { slide: 6, majorStep: 0, target: 'seed-flask', action: 'prepare-seed-flask', prompt: "Click the flask with 5 mL LB. Dip the loop twice to inoculate, return it to the tray and flame the flask opening." },
  { slide: 8, majorStep: 0, target: 'shaker', action: 'move-to-shaker', prompt: "Click the incubator shaker to load the inoculated flask." },
  { slide: 9, majorStep: 0, target: 'shaker', action: 'incubate', prompt: "Click the shaker to culture at 37°C and 200 rpm for 12–16 h." },
  { slide: 10, majorStep: 1, target: 'pipette', action: 'transfer-seed', prompt: "Click the pipette, fit a sterile tip and transfer seed culture into 50 mL fresh LB at 1:100. Change tips between different samples." },
  { slide: 11, majorStep: 1, target: 'shaker', action: 'move-large-flask', prompt: "Click the shaker to load the expanded culture flask." },
  { slide: 12, majorStep: 1, target: 'shaker', action: 'grow-to-log', prompt: "Click the shaker to grow the culture to early logarithmic phase." },
  { slide: 13, majorStep: 2, target: 'working-tube', action: 'prepare-50ml-tube', prompt: "Click the sterile 50 mL tube to prepare for culture transfer." },
  { slide: 14, majorStep: 2, target: 'large-flask', action: 'pour-culture', prompt: "Click the flask to transfer the culture into the sterile 50 mL tube." },
  { slide: 15, majorStep: 2, target: 'ice-box', action: 'ice-30', prompt: "Click the ice box to chill the tube for 30 min." },
  { slide: 16, majorStep: 3, target: 'centrifuge', action: 'move-to-centrifuge', prompt: "Click the refrigerated centrifuge to load the tube into the rotor." },
  { slide: 17, majorStep: 3, target: 'centrifuge', action: 'centrifuge', prompt: "Click the centrifuge to spin at 4°C and 4000 rpm for 10 min." },
  { slide: 18, majorStep: 3, target: 'beaker', action: 'discard-supernatant', prompt: "Click the beaker to discard all supernatant and retain the cell pellet." },
  { slide: 19, majorStep: 4, target: 'calcium-chloride', action: 'prepare-cacl2', prompt: "Click the chilled CaCl₂ solution in the ice box." },
  { slide: 20, majorStep: 4, target: 'tip-box', action: 'change-tip', prompt: "Click the tip box to fit a new pipette tip." },
  { slide: 21, majorStep: 4, target: 'pipette', action: 'resuspend-ten-times', prompt: "Click the pipette to gently mix by pipetting 10 times." },
  { slide: 22, majorStep: 4, target: 'ice-box', action: 'ice-cacl2', prompt: "Click the ice box to leave the sample on ice for 30 min." },
  { slide: 23, majorStep: 5, target: 'centrifuge', action: 'move-to-centrifuge-again', prompt: "Click the refrigerated centrifuge to load the tube again." },
  { slide: 24, majorStep: 5, target: 'centrifuge', action: 'centrifuge-again', prompt: "Click the centrifuge to spin at 4°C and 4000 rpm for 10 min." },
  { slide: 25, majorStep: 5, target: 'beaker', action: 'discard-supernatant-again', prompt: "Click the beaker to discard the supernatant and retain the pellet." },
  { slide: 26, majorStep: 6, target: 'blue-reagent', action: 'prepare-glycerol-cacl2', prompt: "Click the blue-labeled chilled CaCl₂ solution with 15% glycerol in the ice box." },
  { slide: 27, majorStep: 6, target: 'tip-box', action: 'change-tip-again', prompt: "Click the tip box to fit a new sterile tip." },
  { slide: 28, majorStep: 6, target: 'pipette', action: 'resuspend', prompt: "Click the pipette to gently resuspend the cells." },
  { slide: 29, majorStep: 6, target: 'tube-rack', action: 'take-rack-tube', prompt: "Click the blue rack on the right to place microcentrifuge tube 1 on the bench." },
  { slide: 31, majorStep: 6, target: 'tip-box', action: 'change-tip-and-transfer', prompt: "Click the gray tip box to change tips and transfer the resuspended culture into tube 1." },
  { slide: 32, majorStep: 7, target: 'ice-box', action: 'take-plasmid-tube', prompt: "Click the ice box to retrieve the blue-labeled recombinant plasmid tube." },
  { slide: 36, majorStep: 7, target: 'tip-box', action: 'prepare-plasmid', prompt: "Click the gray tip box to fit a new tip for plasmid transfer." },
  { slide: 37, majorStep: 7, target: 'pipette', action: 'add-plasmid', prompt: "Click the pipette to add 5 μL recombinant plasmid and gently mix." },
  { slide: 38, majorStep: 7, target: 'ice-box', action: 'ice-plasmid', prompt: "Click the ice box to chill the competent cells for 30 min." },
  { slide: 39, majorStep: 8, target: 'water-bath', action: 'heat-shock', prompt: "Click the 42°C water bath to heat-shock for 90 s." },
  { slide: 40, majorStep: 8, target: 'ice-box', action: 'ice-two-minutes', prompt: "Click the ice box to immediately chill for 2 min." },
  { slide: 41, majorStep: 9, target: 'transform-tube', action: 'finish-cooling', prompt: "Click the competent cell tube to end chilling and prepare for recovery." },
  { slide: 42, majorStep: 9, target: 'lb-bottle', action: 'prepare-lb', prompt: "Click the fresh LB broth." },
  { slide: 43, majorStep: 9, target: 'pipette', action: 'add-lb', prompt: "Click the pipette to add 900 μL fresh LB." },
  { slide: 44, majorStep: 10, target: 'metal-tray', action: 'spread-plate', prompt: "Click the metal tray to retrieve the sterile spreader. Flame-sterilize it, cool it, dip it into the culture and spread evenly onto the plate at the far right." },
  { slide: 48, majorStep: 11, target: 'incubator', action: 'incubate-plate', prompt: "Click the incubator to invert the plate and incubate at 37°C for 12–16 h." },
  { slide: 49, majorStep: 11, target: 'plate', action: 'return-plate', prompt: "Click the plate to retrieve the culture and observe the results." },
];

interface SceneImageProps {
  src: string;
  alt: string;
  className: string;
  id?: string;
  active?: boolean;
  onClick?: () => void;
}

const targetGlowStyle = {
  filter: 'brightness(1.18) drop-shadow(0 0 8px #fff8a6) drop-shadow(0 0 20px #ffd400)',
};

function SceneImage({ src, alt, className, id, active = false, onClick }: SceneImageProps) {
  return (
    <img
      id={id}
      src={src}
      alt={alt}
      className={`absolute object-contain transition-[filter,transform] duration-200 ${active ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'} ${className}`}
      style={active ? targetGlowStyle : undefined}
      onClick={active ? onClick : undefined}
      role={active ? 'button' : undefined}
      draggable={false}
    />
  );
}

interface SceneProps {
  stageIndex: number;
  activeTarget: string;
  isAnimating: boolean;
  isCompleted: boolean;
  lampLit: boolean;
  pipetteHasTip: boolean;
  calciumChlorideOnBench: boolean;
  blueReagentOnBench: boolean;
  transformTubeOnBench: boolean;
  transformTubeInIce: boolean;
  plasmidOnBench: boolean;
  lbOnBench: boolean;
  workingTubeVisual: 'closed-empty' | 'open-empty' | 'closed-filled' | 'ice-bath' | 'centrifuged' | 'pouring' | 'poured' | 'resuspended';
  shakerVisual: 'empty' | 'loaded-open' | 'loaded-closed';
  onAction: (item: string) => void;
}

function Scene({ stageIndex, activeTarget, isAnimating, isCompleted, lampLit, pipetteHasTip, calciumChlorideOnBench, blueReagentOnBench, transformTubeOnBench, transformTubeInIce, plasmidOnBench, lbOnBench, workingTubeVisual, shakerVisual, onAction }: SceneProps) {
  const target = (item: string) => activeTarget === item && !isAnimating && !isCompleted;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#4b78c4]">
      <div className="absolute inset-x-0 top-[31.5%] bottom-[56%] border-t border-slate-500 bg-[#d6dce6]" />

      <SceneImage src={assets.labTable} alt="Central Laboratory Bench" className="left-[5.5%] top-[13.6%] z-30 w-[55%] origin-top scale-y-[0.72]" />
      <SceneImage src={assets.sideTable} alt="Right Laboratory Bench" className="left-[66%] top-[16.8%] z-10 w-[30%]" />

      <SceneImage
        id="exp8-centrifuge"
        src={assets.centrifuge}
        alt="High-speed Refrigerated Centrifuge"
        className="left-[9.7%] top-[8.8%] z-40 w-[11.5%]"
        active={target('centrifuge')}
        onClick={() => onAction('centrifuge')}
      />
      <SceneImage
        id="exp8-water-bath"
        src={assets.ultrasonicCleaner}
        alt="Water Bath"
        className="left-[20.7%] top-[8.6%] z-40 w-[13.2%]"
        active={target('water-bath')}
        onClick={() => onAction('water-bath')}
      />
      <SceneImage src={assets.miniCentrifuge} alt="Mini Centrifuge" className="left-[32.5%] top-[8.3%] z-40 w-[7.5%]" />
      <SceneImage
        id="exp8-shaker"
        src={
          shakerVisual === 'loaded-open'
            ? assets.shakerLoadedOpen
            : shakerVisual === 'loaded-closed'
              ? assets.shakerLoadedClosed
              : assets.shaker
        }
        alt="Incubator Shaker"
        className="left-[41%] top-[9.1%] z-40 w-[7%]"
        active={target('shaker')}
        onClick={() => onAction('shaker')}
      />
      <SceneImage
        id="exp8-incubator"
        src={assets.incubator}
        alt="Incubator"
        className="left-[50.6%] top-[9.8%] z-40 w-[7.2%]"
        active={target('incubator')}
        onClick={() => onAction('incubator')}
      />

      <SceneImage
        id="exp8-ice-box"
        src={assets.iceBox}
        alt="Ice Box"
        className="left-[69.6%] top-[19.5%] z-40 w-[10.5%]"
        active={target('ice-box')}
        onClick={() => onAction('ice-box')}
      />
      <SceneImage
        id="exp8-blue-reagent"
        src={blueReagentOnBench ? assets.iceReagentBlue : assets.iceReagentBlueCapped}
        alt="Blue-labeled Reagent in Ice Box"
        className="left-[72.2%] top-[19.2%] z-50 w-[1.9%]"
        active={target('blue-reagent')}
        onClick={() => onAction('blue-reagent')}
      />
      <SceneImage src={assets.iceTubeOrange} alt="Orange-capped Reagent in Ice Box" className="left-[73.5%] top-[19.2%] z-50 w-[0%]" />
      <SceneImage
        id="exp8-plasmid"
        src={plasmidOnBench ? assets.plasmidTubeBench : assets.plasmidTubeBlue}
        alt="Recombinant Plasmid"
        className="left-[77.3%] top-[20.3%] z-50 w-[2.2%]"
        active={target('plasmid')}
        onClick={() => onAction('plasmid')}
      />
      <SceneImage
        id="exp8-calcium-chloride"
        src={calciumChlorideOnBench ? assets.iceReagentOrange : assets.iceReagentOrangeCapped}
        alt="Chilled Calcium Chloride Solution"
        className="left-[75%] top-[17.4%] z-50 w-[2.2%]"
        active={target('calcium-chloride')}
        onClick={() => onAction('calcium-chloride')}
      />
      <SceneImage
        src={assets.iceBox}
        alt=""
        className="left-[69.6%] top-[19.5%] z-[60] w-[10.5%] [clip-path:inset(31%_0_0_0)]"
      />
      <SceneImage
        id="exp8-lb-bottle"
        src={lbOnBench ? assets.lbBottleBench : assets.lbBottle}
        alt="LB Broth"
        className="left-[82.8%] top-[17%] z-40 w-[3.8%]"
        active={target('lb-bottle')}
        onClick={() => onAction('lb-bottle')}
      />
      <SceneImage
        id="exp8-beaker"
        src={assets.beaker}
        alt="Beaker"
        className="left-[90.2%] top-[18.5%] z-40 w-[3.8%]"
        active={target('beaker')}
        onClick={() => onAction('beaker')}
      />

      <div className="absolute inset-x-0 bottom-0 h-[56%] bg-[length:100%_100%] bg-bottom bg-no-repeat z-10 pointer-events-none" style={{ backgroundImage: "url('https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/cleanbench-part.avif')" }} />

      <SceneImage
        id="exp8-pipette"
        src={pipetteHasTip ? assets.pipetteWithTip : assets.pipette}
        alt="Micropipette"
        className="left-[7.5%] top-[56.2%] z-40 w-[6.5%]"
        active={target('pipette')}
        onClick={() => onAction('pipette')}
      />
      <SceneImage
        id="exp8-metal-tray"
        src={assets.metalTray}
        alt="Metal Tray"
        className="left-[11.8%] top-[72.2%] z-30 w-[9.4%] origin-bottom scale-y-[0.72]"
        active={target('metal-tray')}
        onClick={() => onAction('metal-tray')}
      />
      <SceneImage
        id="exp8-loop"
        src={assets.inoculatingLoop}
        alt="Sterile Inoculation Loop"
        className="left-[11.2%] top-[82.2%] z-[70] w-[8.7%] origin-center rotate-[270deg]"
        active={target('loop')}
        onClick={() => onAction('loop')}
      />
      <SceneImage
        id="exp8-spreader"
        src={assets.spreader}
        alt="Sterile Spreader"
        className="left-[16.1%] top-[82%] z-40 w-[4%]"
        active={target('spreader')}
        onClick={() => onAction('spreader')}
      />
      <SceneImage
        id="exp8-colony-plate"
        src={assets.colonyPlate}
        alt="DH5α Colony Plate"
        className="left-[22.8%] top-[72%] z-30 w-[7.5%]"
        active={target('colony-plate')}
        onClick={() => onAction('colony-plate')}
      />
      <SceneImage
        id="exp8-alcohol-lamp"
        src={lampLit ? assets.alcoholLampOn : assets.alcoholLampOff}
        alt="Alcohol Lamp"
        className="left-[29.3%] top-[74.5%] z-30 w-[4.3%]"
        active={target('alcohol-lamp')}
        onClick={() => onAction('alcohol-lamp')}
      />
      <SceneImage src={assets.tipBoxBeige} alt="Beige Tip Box" className="left-[42.4%] top-[69.5%] z-30 w-[8.2%]" />
      <SceneImage
        id="exp8-transfer-tip-box"
        src={stageIndex === 5 ? assets.tipBoxGrayOpen : assets.tipBoxGray}
        alt="Gray Tip Box"
        className={`left-[50.2%] z-30 ${stageIndex === 5 ? 'top-[66.5%] w-[7.6%]' : 'top-[70%] w-[6.9%]'}`}
      />
      <SceneImage
        id="exp8-tip-box"
        src={assets.tipBoxPink}
        alt="Pink Tip Box"
        className="left-[57.7%] top-[70%] z-30 w-[7.8%]"
        active={target('tip-box')}
        onClick={() => onAction('tip-box')}
      />
      <SceneImage
        id="exp8-seed-flask"
        src={assets.flask}
        alt="5 mL Seed Culture Flask"
        className="left-[70.8%] top-[69.2%] z-[45] w-[4.2%] origin-center"
        active={target('seed-flask')}
        onClick={() => onAction('seed-flask')}
      />
      <SceneImage
        id="exp8-large-flask"
        src={assets.flask}
        alt="50 mL Expanded Culture Flask"
        className="left-[64.7%] top-[67%] z-[45] w-[5.3%] origin-center"
        active={target('large-flask')}
        onClick={() => onAction('large-flask')}
      />
      <SceneImage
        id="exp8-tube-rack"
        src={assets.tubeRack}
        alt="Blue Centrifuge Tube Rack"
        className="left-[76.5%] top-[70%] z-30 w-[13.5%]"
        active={target('tube-rack')}
        onClick={() => onAction('tube-rack')}
      />
      <SceneImage
        id="exp8-transform-tube"
        src={transformTubeInIce ? assets.iceMicrotube : transformTubeOnBench ? assets.microtube : assets.centrifugeTubePurple}
        alt="Competent Cell Tube"
        className="left-[80.3%] top-[78%] z-50 w-[1.6%] opacity-100"
        active={target('transform-tube')}
        onClick={() => onAction('transform-tube')}
      />
      <SceneImage src={assets.centrifugeTubePurple} alt="Centrifuge Tube 2" className="left-[82.3%] top-[78.5%] z-50 w-[1.4%]" />
      <SceneImage
        id="exp8-work-plate"
        src={stageIndex === pptStages.length - 1 ? assets.resultPlate : assets.plate}
        alt={stageIndex === pptStages.length - 1 ? "Transformant Colony Results" : "LB Kanamycin Plate"}
        className="left-[84%] top-[83.5%] z-30 w-[7.3%]"
        active={target('plate')}
        onClick={() => onAction('plate')}
      />
      <SceneImage
        id="exp8-working-tube"
        src={
          workingTubeVisual === 'ice-bath'
            ? assets.iceBathTube
            : workingTubeVisual === 'centrifuged'
              ? assets.centrifugedTube
              : workingTubeVisual === 'pouring'
                ? assets.pourTube
                : workingTubeVisual === 'poured'
                  ? assets.pouredTube
                  : workingTubeVisual === 'open-empty'
                    ? assets.centrifugeTubeOpen
                    : workingTubeVisual === 'resuspended'
                      ? assets.centrifugeTubeLiquid
                      : workingTubeVisual === 'closed-filled'
                        ? assets.centrifugeTubeFilled
                        : assets.centrifugeTube
        }
        alt="50 mL Centrifuge Tube"
        className={`left-[73.7%] top-[17.2%] z-[55] w-[1.7%] ${stageIndex > 28 ? 'opacity-0' : 'opacity-100'}`}
        active={target('working-tube')}
        onClick={() => onAction('working-tube')}
      />

      <SceneImage src={assets.hospitalLogo} alt="First Hospital of Jilin University Emblem" className="right-[7.5%] top-[1.4%] z-40 w-[5.7%]" />
      <SceneImage src={assets.igemLogo} alt="iGEM Logo" className="right-[1%] top-[2.2%] z-40 w-[6.5%]" />
    </div>
  );
}

export function ExperimentPage({ onBack, onRestart }: ExperimentPageProps) {
  const [sceneRevision, setSceneRevision] = useState(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [lampLit, setLampLit] = useState(false);
  const [pipetteHasTip, setPipetteHasTip] = useState(false);
  const [calciumChlorideOnBench, setCalciumChlorideOnBench] = useState(false);
  const [blueReagentOnBench, setBlueReagentOnBench] = useState(false);
  const [transformTubeOnBench, setTransformTubeOnBench] = useState(false);
  const [transformTubeInIce, setTransformTubeInIce] = useState(false);
  const [plasmidOnBench, setPlasmidOnBench] = useState(false);
  const [lbOnBench, setLbOnBench] = useState(false);
  const [observationReady, setObservationReady] = useState(false);
  const [showColonyDetail, setShowColonyDetail] = useState(false);
  const [workingTubeVisual, setWorkingTubeVisual] = useState<'closed-empty' | 'open-empty' | 'closed-filled' | 'ice-bath' | 'centrifuged' | 'pouring' | 'poured' | 'resuspended'>('closed-empty');
  const [shakerVisual, setShakerVisual] = useState<'empty' | 'loaded-open' | 'loaded-closed'>('empty');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [message, setMessage] = useState(pptStages[0].prompt);

  const currentStage = pptStages[Math.min(stageIndex, pptStages.length - 1)];
  const currentStep = currentStage.majorStep;
  const currentStepData = steps[currentStep];
  const completedSteps = isCompleted
    ? steps.map((_, index) => index)
    : Array.from({ length: currentStep }, (_, index) => index);
  const sidebarIndex = hoveredStep ?? (currentStep === 0 ? 0 : Math.min(currentStep - 1, steps.length - 1));
  const sidebarStep = steps[sidebarIndex];

  const finishStage = () => {
    setIsAnimating(false);
    const nextStage = stageIndex + 1;
    if (nextStage >= pptStages.length) {
      // 最后一步：平板取回后台面待命，需再次点击培养皿才展示菌落（参考实验2）
      setObservationReady(true);
      setMessage("Click the plate to enlarge the colony view.");
      return;
    }
    setStageIndex(nextStage);
    setMessage(pptStages[nextStage].prompt);
  };

  const handleAction = (item: string) => {
    // 平板取回后的观察阶段：点击培养皿弹出菌落详情（参考实验2）
    if (observationReady) {
      if (item === 'plate') setShowColonyDetail(true);
      return;
    }
    if (isAnimating || isCompleted || item !== currentStage.target) return;

    setIsAnimating(true);
    setMessage(`In progress:${currentStage.prompt.replace(/^点击[^，。]*[，。]?/, '') || currentStage.prompt}`);
    timelineRef.current?.kill();
    const timeline = gsap.timeline({
      defaults: { duration: 0.48, ease: 'power2.inOut' },
      onComplete: finishStage,
    });
    timelineRef.current = timeline;

    switch (currentStage.action) {
      case 'prepare-sterile-tools':
        timeline
          .to('#exp8-metal-tray', { scale: 1.06, duration: 0.18, repeat: 1, yoyo: true })
          .call(() => setLampLit(true))
          .to('#exp8-loop', { rotation: '+=142.4', duration: 0.4, ease: 'none' })
          .to('#exp8-loop', { left: '26.5%', top: '68.5%', width: '7.7%', duration: 0.5, ease: 'power2.inOut' })
          .to('#exp8-loop', { xPercent: -30, duration: 0.2, repeat: 5, yoyo: true, ease: 'power1.inOut' })
          .to('#exp8-loop', { xPercent: 0, duration: 0.3, ease: 'back.out(1)' });
        break;
      case 'pick-colony':
        timeline
          .to('#exp8-loop', { left: '21.5%', top: '69.5%', width: '7.7%', xPercent: 0, duration: 0.7, ease: 'power2.inOut' })
          .to('#exp8-loop', { y: 6, duration: 0.15, repeat: 3, yoyo: true })
          .to('#exp8-loop', { y: 0, duration: 0.2 });
        break;
      case 'prepare-seed-flask':
        timeline
          // 第一步：培养瓶移到台中偏右的操作位（远离酒精灯），倾斜开口
          .to('#exp8-seed-flask', { left: '39%', top: '69%', width: '4.2%', rotation: -25, duration: 0.5, ease: 'power2.inOut' })
          // 第二步：接种环移到瓶口上方（瓶子静止不动）
          .to('#exp8-loop', { left: '35.8%', top: '66%', duration: 0.5, ease: 'power2.inOut' })
          // 在瓶内蘸取两下
          .to('#exp8-loop', { top: '70%', duration: 0.24, ease: 'power2.in' })
          .to('#exp8-loop', { top: '66%', duration: 0.22, ease: 'power2.out' })
          .to('#exp8-loop', { top: '70%', duration: 0.24, ease: 'power2.in' })
          .to('#exp8-loop', { top: '66%', duration: 0.22, ease: 'power2.out' })
          // 第三步：接种环放回托盘初始位置
          .to('#exp8-loop', { left: '11.2%', top: '82.2%', width: '8.7%', rotation: 270, x: 0, y: 0, duration: 0.62, ease: 'power2.inOut' })
          // 第四步：培养瓶口移到火焰上灼烧
          .to('#exp8-seed-flask', { left: '31.2%', top: '70.8%', rotation: -75, duration: 0.5, ease: 'power2.inOut' })
          .to({}, { duration: 0.45 })
          // 瓶子回位、熄灯
          .to('#exp8-seed-flask', { left: '35.4%', top: '69.2%', rotation: 0, duration: 0.6, ease: 'power2.inOut' })
          .call(() => setLampLit(false));
        break;
      case 'move-to-shaker':
        timeline
          .call(() => setShakerVisual('empty'))
          .to('#exp8-shaker', { scale: 1.04, duration: 0.2, repeat: 1, yoyo: true })
          .to('#exp8-seed-flask', { left: '43.1%', top: '13.8%', width: '3.1%', rotation: 0, duration: 0.78 })
          .to('#exp8-seed-flask', { opacity: 0, duration: 0.16 })
          .call(() => setShakerVisual('loaded-open'));
        break;
      case 'move-large-flask':
        timeline
          .call(() => setShakerVisual('empty'))
          .to('#exp8-shaker', { scale: 1.04, duration: 0.2, repeat: 1, yoyo: true })
          .to('#exp8-large-flask', { left: '42.7%', top: '12.6%', width: '3.7%', rotation: 0, duration: 0.78 })
          .to('#exp8-large-flask', { opacity: 0, duration: 0.16 })
          .call(() => setShakerVisual('loaded-open'));
        break;
      case 'incubate':
        timeline
          .call(() => setShakerVisual('loaded-closed'))
          .fromTo('#exp8-shaker', { opacity: 0.72 }, { opacity: 1, duration: 0.3 })
          .to('#exp8-shaker', { x: 3, duration: 0.07, repeat: 14, yoyo: true })
          .to({}, { duration: 0.45 })
          .call(() => setShakerVisual('empty'))
          .fromTo(
            '#exp8-seed-flask',
            { left: '43.1%', top: '13.8%', width: '3.1%', x: 0, opacity: 0 },
            { left: '70.8%', top: '69.2%', width: '4.2%', opacity: 1, duration: 0.72 },
          )
          .to('#exp8-pipette', { left: '7.5%', top: '56.2%', width: '6.5%', duration: 0.4 }, '<0.05');
        break;
      case 'grow-to-log':
        timeline
          .call(() => setShakerVisual('loaded-closed'))
          .fromTo('#exp8-shaker', { opacity: 0.72 }, { opacity: 1, duration: 0.3 })
          .to('#exp8-shaker', { x: 3, duration: 0.07, repeat: 14, yoyo: true })
          .to({}, { duration: 0.45 })
          .call(() => setShakerVisual('empty'))
          .fromTo(
            '#exp8-large-flask',
            { left: '42.7%', top: '12.6%', width: '3.7%', x: 0, opacity: 0 },
            { left: '60.5%', top: '10.8%', width: '4.2%', opacity: 1, duration: 0.75 },
          );
        break;
      case 'transfer-seed':
        timeline
          .call(() => { setShakerVisual('empty'); setMessage("Retrieving seed culture and fitting a new sterile tip… Change tips between different samples."); })
          // 种子瓶直接出现在台面原位（无移动动画）
          .set('#exp8-seed-flask', { left: '70.8%', top: '69.2%', width: '4.2%', opacity: 1 })
          // 移液枪到吸头盒取新吸头，换上带吸头的图片
          .to('#exp8-pipette', { left: '51.8%', top: '58.8%', width: '4.8%', duration: 0.7 })
          .to('#exp8-pipette', { y: 6, duration: 0.16, repeat: 1, yoyo: true })
          .to('#exp8-transfer-tip-box', { scale: 1.05, duration: 0.16, repeat: 1, yoyo: true }, '<')
          .call(() => { setPipetteHasTip(true); setMessage("Aspirating 5 mL seed culture…"); })
          // 在小瓶（种子瓶）中蘸一下
          .to('#exp8-pipette', { left: '70.6%', top: '52.2%', y: 0, duration: 0.7 })
          .to('#exp8-pipette', { y: 7, duration: 0.2, repeat: 1, yoyo: true })
          .call(() => setMessage("Adding to 50 mL fresh LB…"))
          // 在大瓶（50 mL 培养瓶）中蘸一下
          .to('#exp8-pipette', { left: '65.1%', top: '50.4%', y: 0, duration: 0.7 })
          .to('#exp8-pipette', { y: 7, duration: 0.2, repeat: 1, yoyo: true })
          // 回到初始位置
          .to('#exp8-pipette', { left: '7.5%', top: '56.2%', width: '6.5%', y: 0, duration: 0.82 })
          .call(() => setPipetteHasTip(false));
        break;
      case 'prepare-50ml-tube':
        timeline
          .to('#exp8-working-tube', { scale: 1.06, duration: 0.18, repeat: 1, yoyo: true })
          .to('#exp8-working-tube', { left: '66.5%', top: '14.5%', width: '1.8%', duration: 0.55, ease: 'power2.inOut' })
          .call(() => setWorkingTubeVisual('open-empty'))
          .to('#exp8-large-flask', { left: '63.3%', top: '10%', width: '4.2%', rotation: 64, duration: 0.72 })
          .to('#exp8-working-tube', { left: '66.5%', top: '14.5%', width: '1.8%', duration: 0.45 }, '<0.22');
        break;
      case 'pour-culture':
        timeline
          .to('#exp8-large-flask', { rotation: 68, x: 0, y: 2, duration: 0.35 })
          .to('#exp8-working-tube', { x: 3, duration: 0.12, repeat: 2, yoyo: true })
          .call(() => setWorkingTubeVisual('ice-bath'))
          .to('#exp8-working-tube', { left: '72.7%', top: '17%', width: '1.75%', x: 0, duration: 0.82 })
          .to('#exp8-large-flask', { opacity: 0, y: 0, duration: 0.25 }, '<0.2');
        break;
      case 'ice-30':
        timeline
          .to('#exp8-ice-box', { scale: 1.04, duration: 0.2, repeat: 1, yoyo: true })
          .to({}, { duration: 0.8 });
        break;
      case 'ice-cacl2':
        timeline
          .to('#exp8-working-tube', { left: '73.7%', top: '18.3%', width: '1.7%', duration: 0.6, ease: 'power2.inOut' })
          // 进入冰盒后换用冰浴贴图（image41）
          .call(() => setWorkingTubeVisual('ice-bath'))
          .to({}, { duration: 0.65 })
          // 氯化钙处理结束：试剂瓶（image47）直接消失
          .to('#exp8-calcium-chloride', { opacity: 0, duration: 0.3 });
        break;
      case 'move-to-centrifuge':
      case 'move-to-centrifuge-again':
        timeline
          .to('#exp8-working-tube', { left: '14.2%', top: '12.5%', width: '1.6%' });
        break;
      case 'centrifuge':
      case 'centrifuge-again':
        timeline
          .to('#exp8-centrifuge', { x: 3, duration: 0.065, repeat: 16, yoyo: true })
          // 离心完成，换用离心后贴图（image42）
          .call(() => setWorkingTubeVisual('centrifuged'))
          .set('#exp8-working-tube', { left: '14.2%', top: '12.5%', width: '2.8%' })
          .to({}, { duration: 0.45 });
        break;
      case 'take-rack-tube':
        timeline
          // 先切换为微量离心管贴图（image28），再从架上取出
          .call(() => setTransformTubeOnBench(true))
          // 试剂架反馈脉冲
          .to('#exp8-tube-rack', { scale: 1.04, duration: 0.2, repeat: 1, yoyo: true })
          // 一号管（感受态细胞管）从架上取出，放到原蓝色试剂瓶（image48）的位置
          .to('#exp8-transform-tube', { left: '64%', top: '85%', width: '3%', duration: 0.7, ease: 'power2.inOut' });
        break;
      case 'change-tip-and-transfer':
        timeline
          // 换新吸头：吸头盒与移液枪反馈
          .to('#exp8-tip-box', { scale: 1.1, duration: 0.22, repeat: 1, yoyo: true })
          .to('#exp8-pipette', { scale: 1.06, duration: 0.2, repeat: 1, yoyo: true })
          .call(() => setPipetteHasTip(true))
          // 大离心管换用含菌液贴图（image49）
          .call(() => setWorkingTubeVisual('resuspended'))
          // 移液枪到大离心管上方，下插吸取重悬菌液
          .to('#exp8-pipette', { left: '59.5%', top: '66%', width: '4.8%', duration: 0.7, ease: 'power2.inOut' })
          .to('#exp8-pipette', { y: 8, duration: 0.2, repeat: 1, yoyo: true })
          // 再移到 1 号微量离心管上方，加入菌液
          .to('#exp8-pipette', { left: '63.5%', top: '66%', y: 0, duration: 0.6, ease: 'power2.inOut' })
          .to('#exp8-pipette', { y: 9, duration: 0.2, repeat: 1, yoyo: true })
          .to('#exp8-transform-tube', { y: 6, duration: 0.12, repeat: 2, yoyo: true }, '<')
          // 回到初始位置
          .to('#exp8-pipette', { left: '7.5%', top: '56.2%', width: '6.5%', y: 0, duration: 0.8 })
          .call(() => setPipetteHasTip(false));
        break;
      case 'discard-supernatant':
      case 'discard-supernatant-again':
        timeline
          // 离心管从离心机移到烧杯上方（保持竖直）
          .to('#exp8-working-tube', { left: '87.8%', top: '15.5%', width: '1.8%', duration: 0.7, ease: 'power2.inOut' })
          // 拧开瓶盖：切换为倒液贴图（image43）
          .call(() => setWorkingTubeVisual('pouring'))
          .to({}, { duration: 0.3 })
          // 再倾斜倒出上清液
          .to('#exp8-working-tube', { rotation: 65, duration: 0.35, ease: 'power2.inOut' })
          .to('#exp8-beaker', { scale: 1.08, duration: 0.2, repeat: 1, yoyo: true })
          // 倒完变为空管贴图（image44），放回台面
          .call(() => setWorkingTubeVisual('poured'))
          .to('#exp8-working-tube', { left: '61%', top: '82.5%', width: '3.2%', rotation: 0 });
        break;
      case 'prepare-cacl2':
        timeline
          // 氯化钙从冰盒拿到台面上（放在离心管旁边）
          .to('#exp8-calcium-chloride', { left: '64%', top: '80%', width: '3.3%', duration: 0.6, ease: 'power2.inOut' })
          .call(() => setCalciumChlorideOnBench(true))
          .to('#exp8-calcium-chloride', { scale: 1.14, duration: 0.22, repeat: 1, yoyo: true });
        break;
      case 'prepare-glycerol-cacl2':
        timeline
          // 含甘油氯化钙（蓝色标签试剂，image48）从冰盒拿到台面上
          .to('#exp8-blue-reagent', { left: '64%', top: '80%', width: '3.3%', duration: 0.6, ease: 'power2.inOut' })
          .call(() => setBlueReagentOnBench(true))
          .to('#exp8-blue-reagent', { scale: 1.14, duration: 0.22, repeat: 1, yoyo: true });
        break;
      case 'change-tip':
      case 'change-tip-again':
        timeline
          .to('#exp8-tip-box', { scale: 1.1, duration: 0.22, repeat: 1, yoyo: true })
          .to('#exp8-pipette', { scale: 1.06, duration: 0.2, repeat: 1, yoyo: true })
          .call(() => setPipetteHasTip(true));
        break;
      case 'resuspend-ten-times':
      case 'resuspend':
        timeline
          // 移液枪先移到试剂瓶上方，下插吸取
          .to('#exp8-pipette', { left: '63%', top: '65.5%', width: '4.8%', duration: 0.7, ease: 'power2.inOut' })
          .to('#exp8-pipette', { y: 8, duration: 0.2, repeat: 1, yoyo: true })
          // 再移到试管上方，加入氯化钙并吹打混匀
          .to('#exp8-pipette', { left: '60%', top: '66%', y: 0, duration: 0.6, ease: 'power2.inOut' })
          .to('#exp8-working-tube', { y: 7, duration: 0.1, repeat: currentStage.action === 'resuspend-ten-times' ? 9 : 4, yoyo: true })
          // 回到初始位置
          .to('#exp8-pipette', { left: '7.5%', top: '56.2%', width: '6.5%', y: 0, duration: 0.8 })
          .call(() => setPipetteHasTip(false));
        if (currentStage.action === 'resuspend') {
          // 重悬完成：台面上的蓝色试剂瓶（image48）消失，下一步从试剂架取管
          timeline.to('#exp8-blue-reagent', { opacity: 0, duration: 0.3 });
        }
        break;
      case 'take-plasmid-tube':
        timeline
          // 冰盒反馈脉冲
          .to('#exp8-ice-box', { scale: 1.04, duration: 0.2, repeat: 1, yoyo: true })
          // 冰盒最右侧带蓝色小标签的试管（image73）移到台面一号管右侧
          .to('#exp8-plasmid', { left: '67%', top: '83%', width: '4.4%', duration: 0.7, ease: 'power2.inOut' })
          // 到台面后换成 image74 贴图，同时大离心管（image49）收起
          .call(() => setPlasmidOnBench(true))
          .to('#exp8-working-tube', { opacity: 0, duration: 0.25 });
        break;
      case 'prepare-plasmid':
        // 换新吸头：吸头盒与移液枪反馈
        timeline
          .to('#exp8-tip-box', { scale: 1.1, duration: 0.22, repeat: 1, yoyo: true })
          .to('#exp8-pipette', { scale: 1.06, duration: 0.2, repeat: 1, yoyo: true })
          .call(() => setPipetteHasTip(true));
        break;
      case 'add-plasmid':
        timeline
          // 移液枪先到台面上的重组质粒管（image74）上方，下插吸取
          .to('#exp8-pipette', { left: '66.8%', top: '66%', width: '4.8%' })
          .to('#exp8-pipette', { y: 8, duration: 0.2, repeat: 1, yoyo: true })
          // 移到台面上的一号管（原试剂瓶位置）上方加入质粒
          .to('#exp8-pipette', { left: '63.5%', top: '66%' })
          .to('#exp8-pipette', { y: 9, duration: 0.2, repeat: 1, yoyo: true })
          .to('#exp8-pipette', { left: '7.5%', top: '56.2%', width: '6.5%', y: 0 })
          .call(() => setPipetteHasTip(false));
        break;
      case 'ice-plasmid':
      case 'ice-two-minutes':
        timeline
          .to('#exp8-transform-tube', { left: '73.8%', top: '18.5%', width: '1.4%' })
          // 到达冰盒后贴图换成 image52
          .call(() => setTransformTubeInIce(true))
          .to({}, { duration: 0.65 });
        break;
      case 'heat-shock':
        timeline
          // 热激开始：台面质粒管收起，不再出现
          .to('#exp8-plasmid', { opacity: 0, duration: 0.3 })
          .to('#exp8-transform-tube', { left: '25.6%', top: '12.5%', width: '3.4%' })
          .to({}, { duration: 0.75 });
        break;
      case 'finish-cooling':
        timeline.to('#exp8-transform-tube', { left: '61%', top: '83%', width: '3.6%' });
        break;
      case 'prepare-lb':
        timeline
          // LB 培养基瓶从顶层架子移到台面
          .to('#exp8-lb-bottle', { left: '55%', top: '79%', width: '3.8%', duration: 0.7, ease: 'power2.inOut' })
          // 到达台面后贴图换成 image53
          .call(() => setLbOnBench(true));
        break;
      case 'add-lb':
        timeline
          .call(() => setPipetteHasTip(true))
          .to('#exp8-pipette', { left: '54%', top: '65%', width: '4.8%' })
          .to('#exp8-pipette', { left: '60%', top: '67%' })
          .to('#exp8-transform-tube', { y: 7, duration: 0.12, repeat: 3, yoyo: true })
          .to('#exp8-pipette', { left: '7.5%', top: '56.2%', width: '6.5%' })
          .call(() => setPipetteHasTip(false));
        break;
      case 'spread-plate':
        timeline
          // 托盘反馈脉冲，点亮酒精灯
          .to('#exp8-metal-tray', { scale: 1.06, duration: 0.18, repeat: 1, yoyo: true })
          .call(() => setLampLit(true))
          // 涂布棒从托盘移到酒精灯火焰上灼烧
          .to('#exp8-spreader', { left: '29.2%', top: '65.5%', width: '4.4%', rotation: -15, duration: 0.62, ease: 'power2.inOut' })
          .to('#exp8-spreader', { x: 3, duration: 0.09, repeat: 7, yoyo: true })
          .to({}, { duration: 0.35 })
          // 移到感受态离心管上方，下插蘸取培养液
          .to('#exp8-spreader', { left: '61%', top: '76.5%', width: '3.4%', rotation: 0, x: 0, duration: 0.66, ease: 'power2.inOut' })
          .to('#exp8-spreader', { y: 10, duration: 0.22, repeat: 1, yoyo: true })
          .to('#exp8-transform-tube', { y: 4, duration: 0.1, repeat: 1, yoyo: true }, '<')
          // 移到最右侧培养基上方来回涂布
          .to('#exp8-spreader', { left: '86%', top: '80%', y: 0, duration: 0.6, ease: 'power2.inOut' })
          .to('#exp8-work-plate', { scale: 1.06, duration: 0.22, repeat: 1, yoyo: true })
          .to('#exp8-spreader', { x: -18, duration: 0.28, repeat: 4, yoyo: true })
          // 涂布棒放回托盘初始位置，熄灭酒精灯
          .to('#exp8-spreader', { left: '16.1%', top: '82%', width: '4%', x: 0, duration: 0.72, ease: 'power2.inOut' })
          .call(() => setLampLit(false))
          // 涂布完成：感受态离心管收起
          .to('#exp8-transform-tube', { opacity: 0, y: 0, duration: 0.25 });
        break;
      case 'incubate-plate':
        timeline
          .to('#exp8-work-plate', { left: '51.2%', top: '12.8%', width: '5%' })
          .to({}, { duration: 0.8 })
          .to('#exp8-incubator', { filter: 'drop-shadow(0 0 12px #86efac)', duration: 0.35 });
        break;
      case 'return-plate':
        timeline
          // 平板取出：取消恒温培养箱的发光高亮
          .set('#exp8-incubator', { clearProps: 'filter' })
          .to('#exp8-work-plate', { left: '77%', top: '85%', width: '7.3%' })
          .to('#exp8-work-plate', { scale: 1.12, duration: 0.25, repeat: 1, yoyo: true });
        break;
      default:
        finishStage();
    }
  };

  // 参考实验7：点击左侧目录回退到之前已完成的大步骤。
  // 由于实验8的动画是累积式的（元素位置随阶段推进不断变化），
  // 回退时先清除全部 GSAP 内联样式，再按目标步骤开始前的场景快照恢复状态。
    const stepSnapshots = useStepSnapshots(currentStep, isAnimating,
    () => ({ stageIndex, lampLit, pipetteHasTip, calciumChlorideOnBench, blueReagentOnBench, transformTubeOnBench, transformTubeInIce, plasmidOnBench, lbOnBench, observationReady, showColonyDetail, workingTubeVisual, shakerVisual, isAnimating, isCompleted, message }),
    (state) => {
    setStageIndex(state.stageIndex);
    setLampLit(state.lampLit);
    setPipetteHasTip(state.pipetteHasTip);
    setCalciumChlorideOnBench(state.calciumChlorideOnBench);
    setBlueReagentOnBench(state.blueReagentOnBench);
    setTransformTubeOnBench(state.transformTubeOnBench);
    setTransformTubeInIce(state.transformTubeInIce);
    setPlasmidOnBench(state.plasmidOnBench);
    setLbOnBench(state.lbOnBench);
    setObservationReady(state.observationReady);
    setShowColonyDetail(state.showColonyDetail);
    setWorkingTubeVisual(state.workingTubeVisual);
    setShakerVisual(state.shakerVisual);
    setIsAnimating(state.isAnimating);
    setIsCompleted(state.isCompleted);
    setMessage(state.message);
    setHoveredStep(null);
    setSceneRevision((revision) => revision + 1);
  });

const handleStepNavigation = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length || stepIndex > currentStep || isAnimating) return;
    if (stepSnapshots.restore(stepIndex)) return;
    const targetStageIndex = pptStages.findIndex((stage) => stage.majorStep === stepIndex);
    if (targetStageIndex < 0) return;

    timelineRef.current?.kill();
    gsap.set(
      '#exp8-loop, #exp8-alcohol-lamp, #exp8-seed-flask, #exp8-large-flask, #exp8-working-tube, #exp8-transform-tube, #exp8-pipette, #exp8-spreader, #exp8-work-plate, #exp8-shaker, #exp8-centrifuge, #exp8-incubator, #exp8-metal-tray, #exp8-colony-plate, #exp8-calcium-chloride, #exp8-blue-reagent, #exp8-tip-box, #exp8-transfer-tip-box, #exp8-ice-box, #exp8-beaker, #exp8-lb-bottle, #exp8-plasmid',
      { clearProps: 'all' },
    );

    // 恢复目标步骤开始前的累积状态（与正向推进到该步骤时的场景一致）
    setLampLit(false);
    setPipetteHasTip(false);
    setCalciumChlorideOnBench(false);
    setBlueReagentOnBench(false);
    setTransformTubeOnBench(stepIndex >= 7);
    setTransformTubeInIce(stepIndex >= 8);
    setPlasmidOnBench(stepIndex >= 8);
    setLbOnBench(stepIndex >= 10);
    setShakerVisual('empty');
    setWorkingTubeVisual(
      stepIndex >= 7 ? 'resuspended'
        : stepIndex === 3 ? 'ice-bath'
          : stepIndex === 5 ? 'ice-bath'
            : stepIndex === 4 || stepIndex === 6 ? 'poured'
              : 'closed-empty',
    );

    if (stepIndex === 2) {
      // 扩大培养结束后：大瓶从摇床取回台面上方
      gsap.set('#exp8-large-flask', { left: '60.5%', top: '10.8%', width: '4.2%', rotation: 0, opacity: 1 });
    } else if (stepIndex >= 3) {
      // 菌液已倒入离心管，大瓶隐藏
      gsap.set('#exp8-large-flask', { opacity: 0 });
    }

    if (stepIndex >= 5) {
      // 第一次氯化钙处理结束：试剂瓶（image47）已收起，不再出现
      gsap.set('#exp8-calcium-chloride', { opacity: 0 });
    }
    if (stepIndex >= 7) {
      // 重悬分装结束：蓝色试剂（image48）已收起，不再出现
      gsap.set('#exp8-blue-reagent', { opacity: 0 });
    } else {
      // 重悬分装开始：新一瓶蓝色试剂（image48）位于冰盒
      gsap.set('#exp8-blue-reagent', { left: '71.2%', top: '18.2%', width: '1.9%' });
    }

    if (stepIndex >= 8) {
      // 热激开始：台面质粒管已收起，不再出现
      gsap.set('#exp8-plasmid', { opacity: 0 });
    }

    if (stepIndex >= 10) {
      // LB 培养基瓶已取到台面：使用 image53 贴图
      gsap.set('#exp8-lb-bottle', { left: '55%', top: '79%', width: '3.8%' });
    }

    const workingTubeEntry: Record<number, { left: string; top: string; width: string }> = {
      3: { left: '72.7%', top: '17%', width: '1.75%' }, // 冰浴结束，位于冰盒
      4: { left: '61%', top: '82.5%', width: '3.2%' }, // 弃上清后开盖置于台面
      5: { left: '73.7%', top: '18.3%', width: '1.7%' }, // 氯化钙处理后回到冰盒
      6: { left: '61%', top: '82.5%', width: '3.2%' }, // 再次弃上清后置于台面
    };
    if (stepIndex >= 8) {
      // 质粒管已收起；工作管（image49）已收起
      gsap.set('#exp8-working-tube', { left: '61%', top: '82.5%', width: '3.2%', opacity: 0 });
    } else if (stepIndex >= 7) {
      // 分装转移后：含菌液大离心管（image49）留在台面
      gsap.set('#exp8-working-tube', { left: '61%', top: '82.5%', width: '3.2%', opacity: 1 });
    } else if (workingTubeEntry[stepIndex]) {
      gsap.set('#exp8-working-tube', workingTubeEntry[stepIndex]);
    }

    if (stepIndex === 8 || stepIndex === 9) {
      // 加质粒/热激后：感受态离心管位于冰盒
      gsap.set('#exp8-transform-tube', { left: '73.8%', top: '18.5%', width: '1.4%', opacity: 1 });
    } else if (stepIndex === 10) {
      // 恢复培养结束：感受态离心管留在台面（结束冰浴后的位置），涂布棒在托盘上
      gsap.set('#exp8-transform-tube', { left: '61%', top: '83%', width: '3.6%', opacity: 1 });
    } else if (stepIndex === 11) {
      // 涂布完成：离心管隐藏，涂布棒放回托盘初始位置
      gsap.set('#exp8-transform-tube', { opacity: 0 });
      gsap.set('#exp8-spreader', { left: '16.1%', top: '82%', width: '4%' });
    } else if (stepIndex >= 7) {
      // 分装结束：一号管位于台面原试剂瓶位置
      gsap.set('#exp8-transform-tube', { left: '64%', top: '85%', width: '3%', opacity: 1 });
    }

    setStageIndex(targetStageIndex);
    setIsAnimating(false);
    setIsCompleted(false);
    setObservationReady(false);
    setShowColonyDetail(false);
    setHoveredStep(null);
    setMessage(pptStages[targetStageIndex].prompt);
  };

  

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  return (
    <div className="experiment-shell experiment-page-8 flex h-screen w-screen flex-col overflow-hidden text-white">
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
              Experiment 8: E. coli Competent Cell Preparation and Plasmid Transformation
            </h1>
            <p className="truncate text-[10px] text-blue-200">Competent cell preparation and recombinant plasmid transformation</p>
          </div>
        </div>
        <RestartExperimentButton onRestart={onRestart} />
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 flex-col lab-steps-rail p-3 lg:flex">
          <div className="mb-3 h-[118px] shrink-0 overflow-hidden lab-hint-card p-3">
            <div className="mb-1 flex items-center gap-2 text-blue-200">
              <Lightbulb className="h-3 w-3" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {hoveredStep !== null
                  ? `STEP ${hoveredStep + 1}`
                  : currentStep === 0
                    ? 'STEP 1'
                    : `Previous · STEP${currentStep}`}
              </span>
            </div>
            <h3 className="mb-1 text-xs font-bold text-white">{sidebarStep.title}</h3>
            <p className="max-h-[64px] overflow-hidden text-[11px] leading-relaxed text-blue-200">{sidebarStep.description}</p>
          </div>
          <div className="min-h-0 flex-1">
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepNavigation}
              onStepHover={setHoveredStep}
            />
          </div>
        </aside>

        <main className="flex-1 lab-bench flex flex-col items-center gap-3 p-3 relative overflow-hidden min-w-0">
          <div className="relative aspect-video w-auto h-[72%] shrink-0 max-w-full shadow-2xl overflow-hidden lab-canvas-frame">
            <div className="absolute inset-0 overflow-hidden bg-[#4774c1]">
              <Scene key={sceneRevision}
                stageIndex={stageIndex}
                activeTarget={currentStage.target}
                isAnimating={isAnimating}
                isCompleted={isCompleted}
                lampLit={lampLit}
                pipetteHasTip={pipetteHasTip}
                calciumChlorideOnBench={calciumChlorideOnBench}
                blueReagentOnBench={blueReagentOnBench}
                transformTubeOnBench={transformTubeOnBench}
                transformTubeInIce={transformTubeInIce}
                plasmidOnBench={plasmidOnBench}
                lbOnBench={lbOnBench}
                workingTubeVisual={workingTubeVisual}
                shakerVisual={shakerVisual}
                onAction={handleAction}
              />
              {showColonyDetail && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-4">
                  <div
                    className="absolute inset-0 cursor-pointer lab-scrim"
                    onClick={() => {
                      setShowColonyDetail(false);
                      setIsCompleted(true);
                      setMessage("Experiment complete: transformant colonies are visible. Continue with positive clone screening.");
                    }}
                  />
                  <div className="relative flex max-h-[88%] max-w-[88%] animate-in zoom-in items-center gap-5 overflow-hidden lab-chalk-sheet p-4 duration-300">
                    <div className="space-y-2 text-center">
                      <img src={assets.resultPlatePhoto} alt="Transformant Colony Distribution" className="max-h-[230px] w-auto max-w-[240px] rounded-xl border-2 border-white/30 object-contain shadow-2xl" />
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">Enlarged View</p>
                    </div>
                    <div className="flex max-w-[240px] flex-col gap-4">
                      <div className="space-y-3 border-l-4 border-blue-500 pl-4">
                        <h4 className="text-lg font-bold text-blue-400">Transformant Colony Characteristics</h4>
                        <div className="space-y-1 text-sm text-slate-300">
                          <p>● Size: small to medium</p>
                          <p>● Color: creamy white</p>
                          <p>● Edges: smooth and regular</p>
                          <p>● Surface: moist and glossy</p>
                        </div>
                      </div>
                      <p className="mt-4 animate-pulse text-[10px] text-blue-400/60">Colonies growing on the kanamycin plate are candidate transformants for further screening. Click the gray background to finish.</p>
                    </div>
                  </div>
                </div>
              )}
              {isCompleted && <ExperimentCompletion onRestart={onRestart} onBack={onBack} />}
            </div>
          </div>

          <div className="w-full flex-1 px-1 pt-1 text-left">
            <div className="lab-step-caption mb-2 flex items-center gap-2 text-sm font-bold">
              <span className="text-blue-400">Step {Math.min(currentStep + 1, steps.length)}/{steps.length}</span>
              <span className="text-blue-500">|</span>
              <span className="text-blue-400">{isCompleted ? "Experiment Complete" : currentStepData.title}</span>
            </div>
            <div className="flex h-[calc(100%-30px)] items-center justify-center lab-note-card px-4 py-3 text-center text-xs leading-relaxed">
              {isAnimating || isCompleted || observationReady ? message : currentStage.prompt}
            </div>
          </div>
        </main>

        <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto lab-info-rail p-3 xl:flex">
          <Experiment8InfoPanel />
        </aside>
      </div>
    </div>
  );
}
