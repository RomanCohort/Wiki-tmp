import { useStepSnapshots } from '../hooks/use-step-snapshots';
import { RestartExperimentButton, ExperimentCompletion } from '../components/ExperimentControls';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, Lightbulb, X } from 'lucide-react';
import gsap from 'gsap';

import { StepIndicator } from '../components/StepIndicator';
import { Experiment5InfoPanel } from '../components/Experiment5InfoPanel';
import type { ExperimentStep } from '../types';

interface ExperimentPageProps {
  experimentId?: string;
  onBack: () => void;
  onRestart: () => void;
}

type Target =
  | 'pipette' | 'tipBox' | 'pcrTube' | 'centrifuge' | 'pcrMachine'
  | 'balance' | 'flask' | 'microwave' | 'comb' | 'gelTray'
  | 'tweezers' | 'chamber' | 'power' | 'imager' | 'taeJug' | 'benchBox' | 'largeBottle' | 'brownBottle' | 'gelCastFrame';

type SceneKind = 'pcr' | 'centrifuge' | 'amplification' | 'gel' | 'electrophoresis' | 'uv';

interface Action {
  target: Target;
  instruction: string;
  result: string;
  duration?: number;
  timed?: 'pcr' | 'gel' | 'electrophoresis';
  requiresClick?: boolean;
}

interface StepDefinition {
  title: string;
  description: string;
  scene: SceneKind;
  actions: Action[];
}

interface SceneSnapshot {
  tubeLevel: number;
  tipBoxOpen: boolean;
  benchBoxOpen: boolean;
  flask: 'empty' | 'powder' | 'clear' | 'pink' | 'cloudy' | 'blue';
  gel: 'none' | 'liquid' | 'solid' | 'wells' | 'chamber' | 'loaded';
  chamberBuffer: boolean;
  chamberCovered: boolean;
  pcrComplete: boolean;
}

const IMG = {
  background: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/bg.avif',
  bench: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/cleanbench-part.avif',
  table: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/blue-table.avif',
  pipette: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette.avif',
  pipetteWithTip: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image0.avif',
  tipBox: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tip-box.avif',
  tipBoxOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxopen1.avif',
  pcrTube: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/pcr-tube-ppt.avif',
  dntpTubeClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image1.avif',
  bufferTubeClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image2.avif',
  bufferTubeOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image3.avif',
  dntpTubeOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image4.avif',
  primerReverseTubeOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image6.avif',
  primerForwardTubeOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image5.avif',
  primerForwardTubeClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image9.avif',
  templateTubeOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image8.avif',
  taqTubeOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image7.avif',
  pcrProductTubeOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image10.avif',
  rack: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/tuberackblueempty.avif',
  pptRack: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tube-rack-blue.avif',
  rackFullGlow: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/rack-full-glow.avif',
  rackPartial: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/rack-partial.avif',
  rackTubeHighlight: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/rack-tube-highlight.avif',
  centrifuge: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/mini-centrifuge.avif',
  pcrMachine: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/pcr-machine.avif',
  balance: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/balance.avif',
  flask: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/erlenmeyerflask.avif',
  flaskPowder: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/erlenmeyerflaskpowder.avif',
  flaskPink: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/erlenmeyerflaskred.avif',
  flaskBlue: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/flask-blue-realistic.avif',
  microwaveClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/microwaveovenclosed.avif',
  microwaveOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/microwaveovenopen.avif',
  comb: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/comb.avif',
  gelCastFrame: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-cast-frame-transparent.avif',
  gelCastFrameStep9: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-cast-frame-v2.avif',
  gelCastFrameV3: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-cast-frame-v3.avif',
  gelCombGreen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-comb-green-transparent.avif',
  gelCombStep9: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-comb-v2.avif',
  gelTray: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/gel-tray.avif',
  redGel: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/red-gel.avif',
  gelLanes: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/gel-lanes.avif',
  tweezers: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/tweezers.avif',
  chamber: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/electrophoresischamber.avif',
  chamberConnected: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/electrophoresischamberconnected.avif',
  power: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/electrophoresispowersupply.avif',
  imager: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/uvgelimagingsystem.avif',
  imagerOn: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/gel-imager-on.avif',
  dnaBand: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/dna-band.avif',
  ladder: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/gel-dna-ladder.avif',
  uvCabinet: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/uvcabinet.webp',
  labTable: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/labtable.webp',
  cleanBench: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/cleanbenchsmall.webp',
  beaker: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/beaker.avif',
  metalTray: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/metaltray.avif',
  hospitalLogo: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/hospital-logo.avif',
  igemLogo: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/igem-logo.avif',
  benchBoxLeft: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/bench-box-left.avif',
  benchBoxRight: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/bench-box-right.avif',
  benchBoxOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxopen1.avif',
  benchBlueRack: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/bench-blue-rack.avif',
  benchTubes: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/bench-tubes.avif',
  brownBottle: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/brown-bottle.avif',
  brownBottleOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentbottleamberopen.avif',
  whiteBottle: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/white-bottle.avif',
  whiteBottleOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image11.avif',
  swab: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/swab.avif',
  taeJug: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentcarboyblue.avif',
  taeJugPouring: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentcarboypouring.avif',
  largeBottle: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/white-bottle.avif',
  tipsBoxClosed: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/tips-box-closed.avif',
  tipsBoxOpen: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/tips-box-open.avif',
  powerSupply: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/power-supply.avif',
  benchFull: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/bench-full.avif',
  benchGelComb: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/bench-gel-comb.avif',
  benchGelWells: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/bench-gel-wells.avif',
  benchTaeFront: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/bench-tae-front.avif',
  electrophoresisConnected: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/electrophoresis-connected.avif',
  gelCastFrameNew: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-cast-frame-new.avif',
  gelCombGreenNew: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-comb-green-new.avif',
  gelTrayWithGel: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-tray-with-gel.avif',
  gelTrayWithComb: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-tray-with-comb.avif',
  gelRedSolid: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-red-solid.avif',
  gelSolidified: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image12.avif',
  gelCombFlat: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-comb-flat.avif',
  gelWellsFrame: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-wells-frame.avif',
  gelRedWells: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-red-wells.avif',
  gelFrameEmpty: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-frame-empty.avif',
  tubeBlueFull: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tube-blue-full.avif',
  tubeLightSmall: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tube-light-small.avif',
  tubeBlueBottom: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tube-blue-bottom.avif',
  tubePurpleBlock: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tube-purple-block.avif',
  tubeSample1: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tube-sample-1.avif',
  tubeSample2: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tube-sample-2.avif',
  sampleMixTube13: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image13.avif',
  sampleMixTube14: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image14.avif',
  loadingTube15: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image15.avif',
  loadingTube16: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image16.avif',
  sdspagePrinciple: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/sdspage-principle.avif',
  transferApparatus: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/transfer-apparatus.avif',
  transferApparatusClicked: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/image17.avif',
  electrophoresisConnectedNew: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/electrophoresis-connected-new.avif',
  gelElectrophoresisProgress: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-electrophoresis-progress.avif',
  transferApparatusFinal: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/transfer-apparatus-final.avif',
  electrophoresisSetup: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/electrophoresis-setup.avif',
  electrophoresisText: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/electrophoresis-text.avif',
  gelProgress23: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/gel-progress-23.avif',
  tubeLeftNew: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tube-left-new.avif',
  tubeRightNew: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/tube-right-new.avif',
  uvGelReference: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment5/uv-gel-reference.avif',
} as const;

const DESK_TUBE_SETS = [
  { hiddenIds: ['dntp', 'buffer'], tubes: [{ color: 'transparent', label: "PCR Tube", isPCR: true }, { color: '#90f5a5', label: 'dNTP' }, { color: '#c4cbd2', label: 'Buffer' }] },
  { hiddenIds: ['primer-r', 'primer-f'], tubes: [{ color: 'transparent', label: "PCR Tube", isPCR: true }, { color: '#d20b91', label: "Reverse primer" }, { color: '#225dae', label: "Forward primer" }] },
  { hiddenIds: ['taq', 'template'], tubes: [{ color: 'transparent', label: "PCR Tube", isPCR: true }, { color: '#90f5a5', label: "Taq Polymerase" }, { color: '#333333', label: "Template DNA" }] },
  { hiddenIds: [], tubes: [{ color: 'transparent', label: "PCR Tube", isPCR: true }, { color: '#ed7226', label: "PCR Product" }] },
  { hiddenIds: [], tubes: [{ color: 'transparent', label: "PCR Tube", isPCR: true }, { color: '#2471a3', label: "Sample 13" }, { color: '#39a8da', label: "Sample 14" }] },
  { hiddenIds: [], tubes: [{ color: '#2471a3', label: "Loading Sample 15" }, { color: '#39a8da', label: 'DNA Marker 16' }] },
];

const STEPS: StepDefinition[] = [
  {
    title: "Add Buffer and dNTPs", scene: 'pcr',
    description: "Add PCR buffer and dNTP mix to a 0.2 mL PCR tube in sequence, changing the tip after each addition.",
    actions: [
      { target: 'tipBox', instruction: "Click the tip box to attach a sterile tip", result: "Tip changed" },
      { target: 'pipette', instruction: "Aspirate buffer and dispense into the PCR tube", result: "PCR buffer added" },
      { target: 'tipBox', instruction: "Click the tip box to attach a sterile tip", result: "Tip changed" },
      { target: 'pipette', instruction: "Aspirate dNTPs and dispense into the PCR tube", result: "dNTP mix added" },
    ],
  },
  {
    title: "Add Primers", scene: 'pcr',
    description: "Add the forward (F) and reverse (R) primers in sequence, changing the tip after each addition.",
    actions: [
      { target: 'tipBox', instruction: "Click the tip box to attach a sterile tip", result: "Tip changed" },
      { target: 'pipette', instruction: "Aspirate forward primer (F) and dispense into the PCR tube", result: "Forward primer (F) added" },
      { target: 'tipBox', instruction: "Click the tip box to attach a sterile tip", result: "Tip changed" },
      { target: 'pipette', instruction: "Aspirate reverse primer (R) and dispense into the PCR tube", result: "Reverse primer (R) added" },
    ],
  },
  {
    title: "Add Template and Enzyme", scene: 'pcr',
    description: "Add template DNA and Taq DNA polymerase, then add sterile water (ddH₂O) to a total volume of 25 μL.",
    actions: [
      { target: 'tipBox', instruction: "Click the tip box to attach a sterile tip", result: "Tip changed" },
      { target: 'pipette', instruction: "Aspirate template DNA and dispense into the PCR tube", result: "Template DNA added" },
      { target: 'tipBox', instruction: "Click the tip box to attach a sterile tip", result: "Tip changed" },
      { target: 'pipette', instruction: "Aspirate Taq and sterile water and dispense into the PCR tube", result: "Taq DNA polymerase and ddH₂O added" },
    ],
  },
  {
    title: "Mix PCR Product", scene: 'pcr',
    description: "Transfer PCR product to a new PCR tube and briefly centrifuge to collect the liquid at the bottom.",
    actions: [
      { target: 'benchBox', instruction: "Click the consumables box and open it to change the tip", result: "Tip changed" },
      { target: 'pipette', instruction: "Transfer PCR product to a new PCR tube with the pipette", result: "PCR product transferred" },
      { target: 'centrifuge', instruction: "Click the centrifuge to briefly spin the liquid down", result: "Brief Centrifugation" },
    ],
  },
  {
    title: "Load the Thermal Cycler", scene: 'amplification',
    description: "Place the briefly centrifuged PCR tube in the thermal cycler heating block, ready for amplification.",
    actions: [
      { target: 'pcrMachine', instruction: "Click the thermal cycler to load the PCR tube", result: "PCR tube loaded into the heating block" },
      { target: 'pcrMachine', instruction: "Click the thermal cycler again to review the program", result: "PCR program confirmed" },
    ],
  },
  {
    title: "PCR Amplification", scene: 'amplification',
    description: "Set 94°C for 3 min; 30 cycles of 94°C denaturation, 55–60°C annealing and 72°C extension; 72°C final extension for 5 min; hold at 4°C.",
    actions: [
      { target: 'pcrMachine', instruction: "Check the PCR settings and click Run", result: "PCR complete; product held at 4°C", timed: 'pcr', duration: 3.2 },
    ],
  },
  {
    title: "Measure and Mix", scene: 'gel',
    description: "Weigh agarose with the spatula into a flask, then add TAE buffer and mix.",
    actions: [
      { target: 'largeBottle', instruction: "Click the agarose powder bottle", result: "Spatula positioned above the agarose bottle" },
      { target: 'tweezers', instruction: "Click the spatula to scoop agarose powder", result: "Agarose powder measured" },
      { target: 'flask', instruction: "Move the spatula above the flask and click the flask to add the powder", result: "Agarose powder transferred to the flask" },
      { target: 'taeJug', instruction: "Click the TAE container to pour into the flask", result: "TAE buffer added to the flask" },
    ],
  },
  {
    title: "Microwave to Dissolve", scene: 'gel',
    description: "Microwave the flask until the agarose dissolves completely, then remove and cool to approximately 60°C.",
    actions: [
      { target: 'microwave', instruction: "Click the microwave to heat, dissolve and remove the flask", result: "Agarose fully dissolved; cooling to 60°C" },
    ],
  },
  {
    title: "Add Stain", scene: 'gel',
    description: "After cooling to approximately 60°C, add GelRed and gently swirl to mix.",
    actions: [
      { target: 'brownBottle', instruction: "Click the GelRed bottle to move the flask left and open the bottle", result: "Flask positioned and stain bottle opened" },
      { target: 'benchBox', instruction: "Click the tip box to change the tip", result: "Tip changed" },
      { target: 'brownBottle', instruction: "Aspirate GelRed and add it to the flask", result: "GelRed added; the solution is red", duration: 1.0 },
    ],
  },
  {
    title: "Cast the Gel", scene: 'gel',
    description: "Insert the comb and pour the agarose into the casting tray. Leave for 30 min at room temperature, remove the comb and cover the gel with TAE buffer.",
    actions: [
      { target: 'gelTray', instruction: "Click the casting tray to pour in agarose", result: "Agarose poured and comb inserted", timed: 'gel', duration: 2.5 },
      { target: 'comb', instruction: "Click the comb to remove it", result: "Gel set and comb removed" },
      { target: 'taeJug', instruction: "Click the TAE container to fill the tank", result: "TAE buffer covers the gel surface" },
    ],
  },
  {
    title: "Mix the Sample", scene: 'gel',
    description: "Remove samples 13 and 14 from the rack and add them sequentially to the PCR tube to mix.",
    actions: [
      { target: 'pipette', instruction: "Aspirate sample 13 and add it to the PCR tube", result: "Sample 13 added to the PCR tube" },
      { target: 'pipette', instruction: "Aspirate sample 14 and add it to the PCR tube", result: "Sample 14 added; mixing complete" },
    ],
  },
  {
    title: "Prepare Electrophoresis", scene: 'gel',
    description: "Load the sample into a gel well and a DNA ladder into an adjacent well. Run at 120 V for 25 min.",
    actions: [
      { target: 'tipBox', instruction: "Click the tip box to fit a new pipette tip", result: "New tip attached" },
      { target: 'pipette', instruction: "Aspirate sample 15 and load the gel", result: "Sample 15 loaded into a gel well" },
      { target: 'tipBox', instruction: "Click the tip box again to change the tip", result: "New tip fitted" },
      { target: 'pipette', instruction: "Aspirate sample 16 and load the gel", result: "Sample 16 loaded into an adjacent well" },
      { target: 'chamber', instruction: "Click the transfer assembly to assemble the electrophoresis equipment", result: "Electrophoresis assembly complete", requiresClick: true },
      { target: 'chamber', instruction: "Electrophoresis in progress…", result: "Bromophenol blue has reached two-thirds of the gel", timed: 'electrophoresis', duration: 3 },
    ],
  },
  {
    title: "Gel Imaging", scene: 'uv',
    description: "Transfer the gel to the UV imager, turn on UV and observe the target band at 720 bp.",
    actions: [
      { target: 'imager', instruction: "Click the UV imager to insert the gel", result: "Gel placed in the UV imager", requiresClick: true },
      { target: 'imager', instruction: "Click the UV imager to turn on UV and observe", result: "Clear band observed at 720 bp", requiresClick: true },
    ],
  },
];

const TARGET_ID: Record<Target, string> = {
  pipette: 'exp5-pipette', tipBox: 'exp5-tip-box', pcrTube: 'exp5-pcr-tube',
  centrifuge: 'exp5-centrifuge', pcrMachine: 'exp5-pcr-machine', balance: 'exp5-balance',
  flask: 'exp5-flask', microwave: 'exp5-microwave', comb: 'exp5-comb', gelTray: 'exp5-gel-tray',
  tweezers: 'exp5-tweezers', chamber: 'exp5-chamber', power: 'exp5-power', imager: 'exp5-imager',
  taeJug: 'exp5-tae-jug', benchBox: 'exp5-bench-box', largeBottle: 'exp5-large-bottle',
  brownBottle: 'exp5-brown-bottle', gelCastFrame: 'exp5-gel-cast-frame',
};

const DYNAMIC_SELECTOR = Object.values(TARGET_ID).map((id) => `#${id}`).join(',');
const GLOW = 'brightness-125 drop-shadow-[0_0_8px_rgba(255,238,120,1)] drop-shadow-[0_0_18px_rgba(255,205,55,0.95)]';

function restoreStateForStep(stepIndex: number): SceneSnapshot {
  return {
    tubeLevel: stepIndex === 0 || stepIndex === 10 ? 0 : stepIndex === 1 ? 2 : stepIndex === 2 ? 4 : 5,
    tipBoxOpen: false,
    benchBoxOpen: false,
    flask: stepIndex < 7 ? 'empty' : stepIndex === 7 ? 'cloudy' : stepIndex === 8 ? 'blue' : 'pink',
    gel: stepIndex < 9 ? 'none' : stepIndex === 9 ? 'solid' : stepIndex <= 11 ? 'wells' : 'loaded',
    chamberBuffer: stepIndex >= 10,
    chamberCovered: stepIndex >= 12,
    pcrComplete: stepIndex >= 6,
  };
}

function EquipmentButton({
  target, active, revision, className, children, onActivate, label,
}: {
  target: Target; active: boolean; revision: number; className: string;
  children: React.ReactNode; onActivate: (target: Target) => void; label: string;
}) {
  return (
    <button
      key={`${target}-${revision}`}
      id={TARGET_ID[target]}
      type="button"
      aria-label={label}
      disabled={!active}
      onClick={() => onActivate(target)}
      className={`absolute z-20 border-0 bg-transparent p-0 transition-[filter,opacity] duration-300 ${className} ${active ? `${GLOW} cursor-pointer hover:brightness-125` : 'cursor-default'} disabled:opacity-100`}
    >
      {children}
    </button>
  );
}

function Asset({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} draggable={false} className={`h-full w-full object-contain ${className}`} />;
}

function PipetteVisual({ withTip }: { withTip: boolean }) {
  return <Asset src={withTip ? IMG.pipetteWithTip : IMG.pipette} alt={withTip ? "Pipette with Sterile Tip" : "Pipette"} />;
}

function PptReagentRack({ canClick, onClick, rackClickCount }: { canClick: boolean; onClick: () => void; rackClickCount: number }) {
  const rackImg = canClick && rackClickCount === 0 ? IMG.rackFullGlow : IMG.rackPartial;
  const glowClass = canClick ? GLOW : '';

  if (canClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Click the tube rack to retrieve reagents"
        className={`absolute left-[1%] top-[74%] z-20 h-[24%] w-[24%] border-0 bg-transparent p-0 transition-[filter] duration-300 cursor-pointer hover:brightness-125 ${glowClass}`}
        style={{ pointerEvents: 'auto' }}
      >
        <img src={rackImg} className="h-full w-full object-contain" alt="PCR Reagent Rack" draggable={false} />
      </button>
    );
  }

  return (
    <div className="pointer-events-none absolute left-[1%] top-[74%] z-20 h-[24%] w-[24%]">
      <img src={rackImg} className="h-full w-full object-contain" alt="PCR Reagent Rack" draggable={false} />
    </div>
  );
}

function DeskTubes({ tubes, activeIdx, openedIdx, onTubeClick, pcrTubeLevel, sceneRevision, disableClick, forceMicrotube, stepIndex }: {
  tubes: { color: string; label: string; isPCR?: boolean }[];
  activeIdx: number | null;
  openedIdx: number | null;
  onTubeClick: (idx: number) => void;
  pcrTubeLevel: number;
  sceneRevision: number;
  disableClick?: boolean;
  forceMicrotube?: boolean;
  stepIndex?: number;
}) {
  const positions = tubes.length === 2
    ? [
      { left: '28%', top: '81%', h: '11%', w: '2%' },
      { left: '31%', top: '81%', h: '11%', w: '2%' },
    ]
    : [
      { left: '25%', top: '81%', h: '11%', w: '2%' },
      { left: '28%', top: '81%', h: '11%', w: '2%' },
      { left: '31%', top: '81%', h: '11%', w: '2%' },
    ];
  const sampleMixTubeImages = [undefined, IMG.sampleMixTube13, IMG.sampleMixTube14];
  const loadingTubeImages = [IMG.loadingTube15, IMG.loadingTube16];
  return (
    <>
      {tubes.map((tube, idx) => {
        const pos = positions[idx];
        const isActive = activeIdx === idx;
        const isOpened = openedIdx === idx;
        const stepOneReagentImg = stepIndex === 0 && !tube.isPCR
          ? idx === 1
            ? (isOpened ? IMG.dntpTubeOpen : IMG.dntpTubeClosed)
            : (isOpened ? IMG.bufferTubeOpen : IMG.bufferTubeClosed)
          : undefined;
        const stepTwoImg = stepIndex === 1 && !tube.isPCR
          ? idx === 1
            ? (isOpened ? IMG.primerReverseTubeOpen : undefined)
            : (isOpened ? IMG.primerForwardTubeOpen : IMG.primerForwardTubeClosed)
          : undefined;
        const stepThreeOpenImg = stepIndex === 2 && isOpened && !tube.isPCR
          ? idx === 1 ? IMG.templateTubeOpen : IMG.taqTubeOpen
          : undefined;
        const stepFourOpenImg = stepIndex === 3 && isOpened && !tube.isPCR
          ? IMG.pcrProductTubeOpen
          : undefined;
        const laterStepImg = stepIndex === 10
          ? sampleMixTubeImages[idx]
          : stepIndex === 11
            ? loadingTubeImages[idx]
            : undefined;
        const customImg = stepOneReagentImg ?? stepTwoImg ?? stepThreeOpenImg ?? stepFourOpenImg ?? laterStepImg;
        return (
          <button key={`desk-${idx}-${sceneRevision}`} id={tube.isPCR ? TARGET_ID.pcrTube : undefined} data-desk-tube={idx} type="button" disabled={disableClick || !isActive} onClick={() => onTubeClick(idx)} aria-label={tube.label}
            className={`absolute z-30 border-0 bg-transparent p-0 transition-[filter,opacity] duration-300 ${isActive ? `${GLOW} ${disableClick ? '' : 'cursor-pointer hover:brightness-125'}` : 'cursor-default'} ${disableClick ? 'pointer-events-none' : ''}`}
            style={{ left: pos.left, top: pos.top, height: pos.h, width: pos.w, transform: 'scale(1.5)', transformOrigin: 'bottom center' }}>
            <div className="relative h-full w-full">
              {customImg ? (
                <img src={customImg} className="h-full w-full object-contain" alt={tube.label} draggable={false} />
              ) : (
                <>
                  <img src={isOpened ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/tube-open.avif" : (tube.isPCR || forceMicrotube) ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/microtube-clear.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/sample-clear.avif"} className="h-full w-full object-contain" alt={tube.label} draggable={false} />
                  {!tube.isPCR && !isOpened && <span className="absolute left-[36%] top-[47%] h-[16%] w-[28%] border-[0.5px] border-slate-800/80" style={{ backgroundColor: tube.color }} />}
                  {tube.isPCR && pcrTubeLevel > 0 && !isOpened && <span className="absolute bottom-[15%] left-[36%] h-[5%] w-[28%] rounded-full bg-cyan-300/80" style={{ transform: `scaleY(${Math.max(pcrTubeLevel, 1) / 5})`, transformOrigin: 'bottom' }} />}
                  {tube.isPCR && pcrTubeLevel > 0 && isOpened && <span className="absolute bottom-[15%] left-[36%] h-[5%] w-[28%] rounded-full bg-cyan-300/80" style={{ transform: `scaleY(${Math.max(pcrTubeLevel, 1) / 5})`, transformOrigin: 'bottom' }} />}
                </>
              )}
            </div>
          </button>
        );
      })}
    </>
  );
}

export function ExperimentPage5({ onBack, onRestart }: ExperimentPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [phase, setPhase] = useState(0);
  const [sceneRevision, setSceneRevision] = useState(0);
  const [snapshot, setSnapshot] = useState<SceneSnapshot>(() => restoreStateForStep(0));
  const [isAnimating, setIsAnimating] = useState(false);
  const [, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [showUvResult, setShowUvResult] = useState(false);
  const [showCentrifugeDisplay, setShowCentrifugeDisplay] = useState(false);
  const showInfo = true;
  const [rackClickCount, setRackClickCount] = useState(0);
  const [openedTubeIdx, setOpenedTubeIdx] = useState<number | null>(null);
  const [pendingStepAdvance, setPendingStepAdvance] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const openedTubeIdxRef = useRef<number | null>(null);

  const step = STEPS[Math.min(currentStep, STEPS.length - 1)];
  const action = currentStep < STEPS.length ? step.actions[phase] : undefined;
  const finished = currentStep >= STEPS.length;

  const deskTubeSet = currentStep === 3
    ? DESK_TUBE_SETS[3]
    : currentStep === 10 && rackClickCount >= 4
    ? DESK_TUBE_SETS[4]
    : currentStep === 11 && rackClickCount >= 4
      ? DESK_TUBE_SETS[5]
      : rackClickCount > 0 && rackClickCount <= 3
        ? DESK_TUBE_SETS[rackClickCount - 1]
        : null;
  const deskTubes = deskTubeSet ? deskTubeSet.tubes : [];
  const needsRackClick = pendingStepAdvance !== null || (currentStep === 0 && rackClickCount === 0) || (currentStep === 1 && rackClickCount === 1) || (currentStep === 2 && rackClickCount === 2) || (currentStep === 10 && rackClickCount === 3);

  const activeDeskTubeIdx = useMemo(() => {
    if (!action || deskTubes.length === 0) return null;
    if (action.target === 'pipette') {
      if (currentStep <= 2) {
        if (phase === 1) return deskTubes.length === 2 ? 1 : 2;
        if (phase === 3) return 1;
      }
      if (currentStep === 3) return 1;
      if (currentStep === 10) {
        const seq = [1, 2];
        return phase < seq.length ? seq[phase] : null;
      }
    }
    return null;
  }, [action, phase, deskTubes.length, currentStep]);

  const stopRuntime = useCallback(() => {
    timersRef.current.forEach((timer) => {
      window.clearTimeout(timer);
      window.clearInterval(timer);
    });
    timersRef.current = [];
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  }, []);

  const clearAnimations = useCallback(() => {
    const elements = sceneRef.current?.querySelectorAll(DYNAMIC_SELECTOR);
    if (!elements) return;
    gsap.killTweensOf(elements);
    gsap.set(elements, { clearProps: 'all' });
  }, []);

  const restore = useCallback((stepIndex: number) => {
    stopRuntime();
    clearAnimations();
    setIsAnimating(false);
    setPhase(0);
    setProgress(0);
    setMessage('');
    setShowUvResult(false);
    setShowCentrifugeDisplay(false);
    setOpenedTubeIdx(null);
    setSnapshot(restoreStateForStep(stepIndex));
    setSceneRevision((revision) => revision + 1);
  }, [clearAnimations, stopRuntime]);

    const stepSnapshots = useStepSnapshots(currentStep, isAnimating,
    () => ({ currentStep, completedSteps, phase, snapshot, isAnimating, message, showUvResult, showCentrifugeDisplay, rackClickCount, openedTubeIdx, pendingStepAdvance }),
    (state) => {
    setCurrentStep(state.currentStep);
    setCompletedSteps(state.completedSteps);
    setPhase(state.phase);
    setSnapshot(state.snapshot);
    setIsAnimating(state.isAnimating);
    setMessage(state.message);
    setShowUvResult(state.showUvResult);
    setShowCentrifugeDisplay(state.showCentrifugeDisplay);
    setRackClickCount(state.rackClickCount);
    setOpenedTubeIdx(state.openedTubeIdx);
    setPendingStepAdvance(state.pendingStepAdvance);
    setHoveredStep(null);
    setSceneRevision((revision) => revision + 1);
  });

const handleStepNavigation = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= STEPS.length || stepIndex > currentStep || isAnimating) return;
    stopRuntime();
    if (stepSnapshots.restore(stepIndex)) return;
    restore(stepIndex);
    setCurrentStep(stepIndex);
    setCompletedSteps(Array.from({ length: stepIndex }, (_, index) => index));
  }, [currentStep, isAnimating, restore, stepSnapshots, stopRuntime]);

  const finishStep = useCallback(() => {
    const nextStep = currentStep + 1;
    setCompletedSteps(Array.from({ length: nextStep }, (_, index) => index));
    if (nextStep < STEPS.length) {
      if ((currentStep === 0 && rackClickCount < 2) || (currentStep === 1 && rackClickCount < 3)) {
        setPendingStepAdvance(nextStep);
        setIsAnimating(false);
        return;
      }
      restore(nextStep);
      setCurrentStep(nextStep);
    } else {
      stopRuntime();
      setIsAnimating(false);
      setCurrentStep(STEPS.length);
    }
  }, [currentStep, restore, stopRuntime, rackClickCount]);

  const animateTarget = useCallback((target: Target, actionIndex: number, duration: number) => {
    const element = sceneRef.current?.querySelector(`#${TARGET_ID[target]}`);
    if (!element) return gsap.timeline();
    const timeline = gsap.timeline();

    const isPcrScene = currentStep <= 3 || currentStep === 10;
    const pipetteEl = sceneRef.current?.querySelector(`#${TARGET_ID.pipette}`);

    if (target === 'pipette') {
      if (currentStep === 11) {
        const tubeIndex = actionIndex === 1 ? 0 : 1;
        const sourceLeft = tubeIndex === 0 ? '48.6%' : '53.6%';
        const sourceTop = '60%';
        const gelLeft = '68.6%';
        const gelTop = '52%';
        if (pipetteEl) {
          timeline.to(element, { left: sourceLeft, top: sourceTop, rotation: -4, duration: 0.55, ease: 'power2.inOut' })
            .to(element, { top: '54%', duration: 0.2, yoyo: true, repeat: 1 })
            .to(element, { left: gelLeft, top: gelTop, rotation: -4, duration: 0.55, ease: 'power2.inOut' })
            .to(element, { top: '54%', duration: 0.2, yoyo: true, repeat: 1 })
            .to(element, { left: '60%', top: '45%', rotation: 0, duration: 0.5, ease: 'power2.inOut' });
        } else {
          timeline.to(element, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
        }
      } else if (isPcrScene) {
        const activeTubeIdx = openedTubeIdxRef.current ?? 1;
        const tubeLefts = currentStep === 3 ? [28, 31] : [25, 28, 31];
        const reagentLeft = currentStep === 10 && activeTubeIdx === 2
          ? '33.6%'
          : `${tubeLefts[activeTubeIdx] + 1 - 2.4}%`;
        const pcrLeft = `${tubeLefts[0] + 1 - 2.4}%`;
        const tubeTop = '52%';
        timeline.to(element, { left: reagentLeft, top: tubeTop, rotation: -6, duration: 0.5, ease: 'power2.inOut' })
          .to(element, { top: '54%', duration: 0.15, yoyo: true, repeat: 1 })
          .to(element, { left: pcrLeft, top: tubeTop, rotation: -6, duration: 0.45, ease: 'power2.inOut' })
          .to(element, { top: '54%', duration: 0.15, yoyo: true, repeat: 1 })
          .to(element, { left: '63.6%', top: '45.2%', rotation: 0, duration: 0.4, ease: 'power2.inOut' });
      } else {
        timeline.to(element, { x: actionIndex % 2 ? 150 : -70, y: actionIndex % 2 ? -45 : 28, rotation: -10, duration: 0.55, ease: 'power2.inOut' })
          .to(element, { y: '+=12', duration: 0.18, yoyo: true, repeat: 1 });
      }
    } else if (target === 'tipBox' && (isPcrScene || currentStep === 11) && pipetteEl) {
      const homeLeft = currentStep === 11 ? '60%' : '63.6%';
      const homeTop = currentStep === 11 ? '45%' : '45.2%';
      timeline.to(pipetteEl, { left: '56%', top: '48%', x: 0, y: 0, rotation: -6, duration: 0.4, ease: 'power2.inOut' }, 0)
        .to(pipetteEl, { top: '50%', duration: 0.12, yoyo: true, repeat: 1 })
        .to(pipetteEl, { left: homeLeft, top: homeTop, rotation: 0, duration: 0.3, ease: 'power2.inOut' });
      timeline.to(element, { scale: 1.04, duration: Math.min(0.35, duration / 3), yoyo: true, repeat: 1 }, 0);
    } else if (target === 'benchBox' && currentStep === 8 && pipetteEl) {
      const benchBoxRect = element.getBoundingClientRect();
      const pipetteRect = pipetteEl.getBoundingClientRect();
      const xOffset = (benchBoxRect.left + benchBoxRect.width / 2) - (pipetteRect.left + pipetteRect.width / 2);
      timeline.to(pipetteEl, { x: xOffset, y: 25, rotation: -6, duration: 0.4, ease: 'power2.inOut' }, 0)
        .to(pipetteEl, { y: '+=12', duration: 0.12, yoyo: true, repeat: 1 })
        .to(pipetteEl, { x: 0, y: 0, rotation: 0, duration: 0.3, ease: 'power2.inOut' });
      timeline.to(element, { scale: 1.04, duration: Math.min(0.35, duration / 3), yoyo: true, repeat: 1 }, 0);
    } else if (target === 'benchBox' && isPcrScene && pipetteEl) {
      const benchBoxRect = element.getBoundingClientRect();
      const pipetteRect = pipetteEl.getBoundingClientRect();
      const xOffset = (benchBoxRect.left + benchBoxRect.width / 2) - (pipetteRect.left + pipetteRect.width / 2);
      if (actionIndex === 0) {
        timeline.to(pipetteEl, { x: xOffset, y: 25, rotation: -6, duration: 0.4, ease: 'power2.inOut' }, 0)
          .to(pipetteEl, { y: '+=12', duration: 0.12, yoyo: true, repeat: 1 })
          .to(pipetteEl, { x: 0, y: 0, rotation: 0, duration: 0.3, ease: 'power2.inOut' });
        timeline.to(element, { scale: 1.04, duration: Math.min(0.35, duration / 3), yoyo: true, repeat: 1 }, 0);
      } else {
        timeline.to(element, { scale: 1.04, duration: Math.min(0.35, duration / 3), yoyo: true, repeat: 1 });
      }
    } else if (target === 'pcrTube') {
      if (isPcrScene) {
        const pipetteEl = sceneRef.current?.querySelector(`#${TARGET_ID.pipette}`);
        if (pipetteEl) timeline.to(pipetteEl, { x: -200, y: 18, rotation: -6, duration: 0.3, ease: 'power2.inOut' }, 0)
          .to(pipetteEl, { x: 0, y: 0, rotation: 0, duration: 0.3, ease: 'power2.inOut' });
        timeline.to(element, { x: -3, duration: 0.06, yoyo: true, repeat: 5, ease: 'none' }, 0.3);
      } else {
        timeline.to(element, { x: -5, duration: 0.06, yoyo: true, repeat: 7, ease: 'none' });
      }
    } else if (target === 'centrifuge') {
      const pcrTubeEl = currentStep === 3 ? sceneRef.current?.querySelector('[data-desk-tube="0"]') : null;
      if (pcrTubeEl) {
        const tubeRect = pcrTubeEl.getBoundingClientRect();
        const centrifugeRect = element.getBoundingClientRect();
        const machineEl = sceneRef.current?.querySelector('#exp5-pcr-machine-background');
        const xOffset = (centrifugeRect.left + centrifugeRect.width / 2) - (tubeRect.left + tubeRect.width / 2);
        const yOffset = (centrifugeRect.top + centrifugeRect.height * 0.2) - (tubeRect.top + tubeRect.height / 2);
        timeline.to(pcrTubeEl, { x: xOffset, y: yOffset, duration: 0.65, ease: 'power2.inOut' })
          .to(element, { rotation: -2, duration: 0.08, yoyo: true, repeat: 9 }, '<')
          .to(pcrTubeEl, { duration: 1.0 });
        if (machineEl) {
          const machineRect = machineEl.getBoundingClientRect();
          const machineX = (machineRect.left + machineRect.width * 0.55) - (tubeRect.left + tubeRect.width / 2);
          const machineY = (machineRect.top + machineRect.height * 0.55) - (tubeRect.top + tubeRect.height / 2);
          timeline.call(() => setMessage("PCR tube loaded into the heating block"))
            .to(pcrTubeEl, { x: machineX, y: machineY, duration: 0.8, ease: 'power2.inOut' });
        }
      } else {
        timeline.to(element, { rotation: -2, duration: 0.08, yoyo: true, repeat: 9 });
      }
    } else if (target === 'microwave' && currentStep === 7) {
      if (actionIndex === 0) {
        timeline.to(element, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
      } else if (actionIndex === 1) {
        timeline.to(element, { x: '+=2', duration: 0.04, yoyo: true, repeat: 25, ease: 'none' });
      } else {
        timeline.to(element, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
      }
    } else if (target === 'brownBottle') {
      if (currentStep === 8) {
        const pipetteEl = sceneRef.current?.querySelector(`#${TARGET_ID.pipette}`);
        if (actionIndex === 0) {
          timeline.to(element, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
        } else if (actionIndex === 2 && pipetteEl) {
          const bottleRect = element.getBoundingClientRect();
          const pipetteRect = pipetteEl.getBoundingClientRect();
          const xOffset = (bottleRect.left + bottleRect.width / 2) - (pipetteRect.left + pipetteRect.width / 2);
          const yOffset = (bottleRect.top + bottleRect.height * 0.15) - (pipetteRect.top + pipetteRect.height / 2);
          const flaskEl = sceneRef.current?.querySelector(`#${TARGET_ID.flask}`);
          let flaskX = 0, flaskY = 0;
          if (flaskEl) {
            const flaskRect = flaskEl.getBoundingClientRect();
            flaskX = (flaskRect.left + flaskRect.width / 2) - (pipetteRect.left + pipetteRect.width / 2);
            flaskY = (flaskRect.top + flaskRect.height * 0.15) - (pipetteRect.top + pipetteRect.height / 2);
          }
          timeline.to(pipetteEl, { x: xOffset, y: yOffset, rotation: -6, duration: 0.5, ease: 'power2.inOut' }, 0)
            .to(pipetteEl, { y: '+=20', duration: 0.15, yoyo: true, repeat: 1 }, 0.5)
            .to(pipetteEl, { x: flaskX, y: flaskY, rotation: -6, duration: 0.5, ease: 'power2.inOut' }, 0.8)
            .to(pipetteEl, { y: '+=20', duration: 0.15, yoyo: true, repeat: 1 }, 1.3)
            .to(pipetteEl, { x: 0, y: 0, rotation: 0, duration: 0.4, ease: 'power2.inOut' }, 1.6);
        }
      }
    } else if (target === 'gelTray' && currentStep === 9) {
      timeline.to(element, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
    } else if (target === 'comb') {
      if (currentStep === 9) {
        if (actionIndex === 0) {
          const trayEl = sceneRef.current?.querySelector('#exp5-gel-tray') || sceneRef.current?.querySelector('[data-gel-tray]');
          let combX = -340;
          if (trayEl) {
            const combRect = element.getBoundingClientRect();
            const trayRect = trayEl.getBoundingClientRect();
            combX = (trayRect.left + trayRect.width / 2) - (combRect.left + combRect.width / 2);
          }
          timeline.to(element, { x: combX, y: -5, duration: 0.6, ease: 'power2.inOut' });
        } else {
          timeline.to(element, { x: 180, y: 20, duration: 0.6, ease: 'power2.inOut' });
        }
      } else {
        timeline.to(element, { y: 28, duration: '0.7', ease: 'power2.inOut' });
      }
    } else if (target === 'flask') {
      if (currentStep === 6) {
        const swabEl = sceneRef.current?.querySelector(`#${TARGET_ID.tweezers}`);
        if (swabEl) {
          const flaskRect = element.getBoundingClientRect();
          const swabRect = swabEl.getBoundingClientRect();
          const xOffset = (flaskRect.left + flaskRect.width / 2) - (swabRect.left + swabRect.width / 2);
          const yOffset = (flaskRect.top + flaskRect.height * 0.1) - (swabRect.top + swabRect.height / 2);
          timeline.to(swabEl, { x: `+=${xOffset}`, y: `+=${yOffset}`, duration: 0.5, ease: 'power2.inOut' })
            .to(swabEl, { rotation: 60, duration: 0.2, ease: 'power2.inOut' })
            .to(swabEl, { x: `+=20`, y: '+=30', rotation: 50, duration: 0.25, ease: 'power2.in' })
            .to(swabEl, { x: `-=${20}`, y: `-=${30}`, rotation: 60, duration: 0.25, ease: 'power2.out' })
            .to(swabEl, { rotation: 0, duration: 0.2, ease: 'power2.inOut' })
            .to(swabEl, { x: 0, y: 0, duration: 0.4, ease: 'power2.inOut' });
        }
        timeline.to(element, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
      } else if (currentStep === 8) {
        const pipetteEl = sceneRef.current?.querySelector(`#${TARGET_ID.pipette}`);
        if (pipetteEl) {
          const flaskRect = element.getBoundingClientRect();
          const pipetteRect = pipetteEl.getBoundingClientRect();
          const xOffset = (flaskRect.left + flaskRect.width / 2) - (pipetteRect.left + pipetteRect.width / 2);
          const yOffset = (flaskRect.top + flaskRect.height * 0.15) - (pipetteRect.top + pipetteRect.height / 2);
          timeline.to(pipetteEl, { x: xOffset, y: yOffset, rotation: -6, duration: 0.5, ease: 'power2.inOut' }, 0)
            .to(pipetteEl, { y: '+=20', duration: 0.15, yoyo: true, repeat: 1 }, 0.5)
            .to(pipetteEl, { x: 0, y: 0, rotation: 0, duration: 0.4, ease: 'power2.inOut' }, 0.8);
        }
        timeline.to(element, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
      } else {
        timeline.to(element, { rotation: -18, x: 28, duration: 0.45 }).to(element, { rotation: 0, x: 0, duration: 0.45 });
      }
    } else if (target === 'taeJug') {
      if (currentStep === 6) {
        const flaskEl = sceneRef.current?.querySelector(`#${TARGET_ID.flask}`);
        let xOff = -200, yOff = 80;
        if (flaskEl) {
          const jugRect = element.getBoundingClientRect();
          const flaskRect = flaskEl.getBoundingClientRect();
          // 水桶从右上方倾斜倒入，壶嘴对准瓶口
          const flaskMouthX = flaskRect.left + flaskRect.width / 2;
          const flaskMouthY = flaskRect.top + flaskRect.height * 0.05;
          const jugPivotX = jugRect.left + jugRect.width / 2;
          const jugPivotY = jugRect.top + jugRect.height * 0.85;
          // 倾斜角度
          const tiltAngle = -50; // 向左倾斜50度
          const rotRad = tiltAngle * Math.PI / 180;
          // 壶嘴相对于旋转中心的位置（水桶壶嘴在左上角，更靠左）
          const spoutRelX = -jugRect.width * 0.45;
          const spoutRelY = -jugRect.height * 0.5;
          // 旋转后的壶嘴位置
          const spoutX = spoutRelX * Math.cos(rotRad) - spoutRelY * Math.sin(rotRad);
          const spoutY = spoutRelX * Math.sin(rotRad) + spoutRelY * Math.cos(rotRad);
          // 计算移动偏移，使壶嘴对准瓶口（往右调整）
          xOff = (flaskMouthX - spoutX) - jugPivotX + jugRect.width * 0.4;
          yOff = (flaskMouthY - spoutY) - jugPivotY;
        }
        // 先移动到瓶口斜上方，然后倾斜倾倒
        timeline.to(element, { x: xOff, y: yOff, duration: 0.5, ease: 'power2.inOut' })
          .to(element, { rotation: -50, duration: 0.4, ease: 'power2.inOut', transformOrigin: '50% 85%' })
          .to(element, { rotation: -50, duration: 0.6, transformOrigin: '50% 85%' })
          .to(element, { rotation: 0, duration: 0.4, ease: 'power2.inOut', transformOrigin: '50% 85%' })
          .to(element, { x: 0, y: 0, duration: 0.4, ease: 'power2.inOut' });
      } else if (currentStep === 9) {
        const trayEl = sceneRef.current?.querySelector('#exp5-gel-tray') || sceneRef.current?.querySelector('[data-gel-tray]');
        let xOff = 170, yOff = 100;
        if (trayEl) {
          const jugRect = element.getBoundingClientRect();
          const trayRect = trayEl.getBoundingClientRect();
          const trayPourX = trayRect.left + trayRect.width * 0.5;
          const trayPourY = trayRect.top + trayRect.height * 0.05;
          const jugSpoutX = jugRect.left + jugRect.width * 0.15;
          const jugSpoutY = jugRect.top + jugRect.height * 0.18;
          xOff = trayPourX - jugSpoutX;
          yOff = trayPourY - jugSpoutY;
        }
        timeline.to(element, { x: xOff, y: yOff, duration: 0.5, ease: 'power2.inOut' })
          .to(element, { rotation: -40, duration: 0.3, ease: 'power2.inOut' })
          .to(element, { rotation: -40, duration: 0.5 })
          .to(element, { rotation: 0, duration: 0.3, ease: 'power2.out' })
          .to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
      } else {
        timeline.to(element, { x: -90, y: 140, duration: 0.3, ease: 'power2.inOut' })
          .to(element, { rotation: -40, duration: 0.2, ease: 'power2.inOut' })
          .to(element, { rotation: -40, duration: 0.25 })
          .to(element, { rotation: 0, duration: 0.2, ease: 'power2.inOut' })
          .to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
      }
    } else if (target === 'largeBottle' && currentStep === 6) {
      timeline.to(element, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
    } else if (target === 'tweezers') {
      if (currentStep === 6) {
        const bottleEl = sceneRef.current?.querySelector(`#${TARGET_ID.largeBottle}`);
        if (bottleEl) {
          const swabRect = element.getBoundingClientRect();
          const bottleRect = bottleEl.getBoundingClientRect();
          const xOffset = (bottleRect.left + bottleRect.width / 2) - (swabRect.left + swabRect.width / 2);
          const yOffset = (bottleRect.top + bottleRect.height * 0.12) - (swabRect.top + swabRect.height / 2);
          timeline.to(element, { x: `+=${xOffset}`, y: `+=${yOffset}`, rotation: 90, duration: 0.55, ease: 'power2.inOut' })
            .to(element, { y: '+=25', duration: 0.2, ease: 'power2.in' })
            .to(element, { y: '-=70', duration: 0.35, ease: 'power2.out' });
        }
      } else {
        timeline.to(element, { x: 90, y: -45, rotation: -12, duration: 0.75 });
      }
    } else {
      timeline.to(element, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 });
    }
    return timeline;
  }, [currentStep]);

  const applyVisualState = useCallback((stepIndex: number, nextPhase: number, target: Target) => {
    setSnapshot((previous) => {
      const next = { ...previous };
      if (target === 'tipBox') next.tipBoxOpen = true;
      if (target === 'pipette' && previous.tipBoxOpen) next.tipBoxOpen = false;
      if (target === 'benchBox' && stepIndex === 8 && nextPhase >= 1) next.benchBoxOpen = true;
      if (stepIndex <= 2 && (nextPhase === 2 || nextPhase === 4)) next.tubeLevel = Math.min(5, next.tubeLevel + 1);
      if (stepIndex === 5 && nextPhase >= 1) next.pcrComplete = true;
      if (stepIndex === 6 && nextPhase >= 4) next.flask = 'cloudy';
      if (stepIndex === 7) next.flask = nextPhase >= 1 ? 'blue' : 'cloudy';
      if (stepIndex === 8) {
        if (target === 'benchBox' && nextPhase >= 1) next.benchBoxOpen = true;
        if (nextPhase >= 3) next.flask = 'pink';
      }
      if (stepIndex === 9) {
        if (nextPhase >= 1) next.gel = 'solid';
        if (nextPhase >= 2) next.gel = 'wells';
        if (nextPhase >= 3) next.chamberBuffer = true;
      }
      if (stepIndex === 11 && nextPhase >= 4) next.gel = 'loaded';
      if (stepIndex === 11 && nextPhase >= 6) next.chamberCovered = true;
      return next;
    });
  }, []);

  const runTimedAction = useCallback((_kind: NonNullable<Action['timed']>, duration: number, done: () => void) => {
    setProgress(0);
    let value = 0;
    const interval = window.setInterval(() => {
      value += 2;
      setProgress(Math.min(value, 100));
      if (value >= 100) {
        window.clearInterval(interval);
        done();
      }
    }, (duration * 1000) / 50);
    timersRef.current.push(interval);
  }, []);

  const handleEquipment = useCallback((target: Target) => {
    if (needsRackClick) return;
    if (!action || target !== action.target || isAnimating) return;
    setIsAnimating(true);
    setMessage(action.result);
    const nextPhase = phase + 1;
    const finishAction = () => {
      applyVisualState(currentStep, nextPhase, action.target);
      setPhase(nextPhase);
      setIsAnimating(false);
      setOpenedTubeIdx(null);
      if (currentStep === 12 && nextPhase === step.actions.length) {
        setShowUvResult(true);
        return;
      }
      if (nextPhase === step.actions.length) {
        const timer = window.setTimeout(finishStep, currentStep === 12 ? 900 : 550);
        timersRef.current.push(timer);
      }
    };
    animateTarget(target, phase, action.duration ?? 0.9).eventCallback('onComplete', () => {
      if (action.timed) runTimedAction(action.timed, action.duration ?? 3, finishAction);
      else {
        const timer = window.setTimeout(finishAction, Math.max(0, ((action.duration ?? 0.9) - 0.7) * 1000));
        timersRef.current.push(timer);
      }
    });
  }, [action, animateTarget, applyVisualState, currentStep, finishStep, isAnimating, needsRackClick, phase, runTimedAction, step.actions.length]);

  const handleRackClick = useCallback(() => {
    if (needsRackClick) {
      const newCount = rackClickCount + 1;
      setRackClickCount(newCount);
      setOpenedTubeIdx(null);
      if (pendingStepAdvance !== null) {
        const advanceStep = pendingStepAdvance;
        setPendingStepAdvance(null);
        const delay = currentStep === 10 || currentStep === 11 ? 1200 : 0;
        const timer = window.setTimeout(() => {
          restore(advanceStep);
          setCurrentStep(advanceStep);
        }, delay);
        timersRef.current.push(timer);
      }
    }
  }, [needsRackClick, rackClickCount, pendingStepAdvance, restore, currentStep]);

  const handleDeskTubeClick = useCallback((idx: number) => {
    if (!action || isAnimating) return;
    if (activeDeskTubeIdx !== idx) return;
    setOpenedTubeIdx(idx);
    const target = action.target;
    if (target) {
      const timer = window.setTimeout(() => handleEquipment(target), 500);
      timersRef.current.push(timer);
    }
  }, [action, isAnimating, activeDeskTubeIdx, handleEquipment]);

  useEffect(() => { openedTubeIdxRef.current = openedTubeIdx; }, [openedTubeIdx]);

  useEffect(() => {
    if (currentStep !== 10 || rackClickCount !== 4 || needsRackClick || isAnimating || !action || action.target !== 'pipette' || activeDeskTubeIdx === null) return;
    const delay = phase === 0 ? 800 : 500;
    const timer = window.setTimeout(() => {
      setOpenedTubeIdx(activeDeskTubeIdx);
      handleEquipment('pipette');
    }, delay);
    timersRef.current.push(timer);
  }, [currentStep, rackClickCount, needsRackClick, isAnimating, action, activeDeskTubeIdx, handleEquipment, phase]);

  useEffect(() => {
    if (currentStep !== 11 || needsRackClick || isAnimating || !action || action.target !== 'pipette' || action.requiresClick) return;
    const timer = window.setTimeout(() => handleEquipment('pipette'), 600);
    timersRef.current.push(timer);
  }, [currentStep, needsRackClick, isAnimating, action, handleEquipment, phase]);

  useEffect(() => {
    if (currentStep !== 5 || needsRackClick || isAnimating || !action || action.target !== 'pcrMachine') return;
    const timer = window.setTimeout(() => handleEquipment('pcrMachine'), 800);
    timersRef.current.push(timer);
  }, [currentStep, needsRackClick, isAnimating, action, handleEquipment]);

  useEffect(() => {
    if (currentStep !== 11 || needsRackClick || isAnimating || !action || action.target !== 'chamber' || action.requiresClick) return;
    const timer = window.setTimeout(() => handleEquipment('chamber'), 1200);
    timersRef.current.push(timer);
  }, [currentStep, needsRackClick, isAnimating, action, handleEquipment]);

  useEffect(() => () => {
    stopRuntime();
    clearAnimations();
  }, [clearAnimations, stopRuntime]);

  const flaskSource = snapshot.flask === 'pink' ? IMG.flaskPink : snapshot.flask === 'powder' ? IMG.flaskPowder : snapshot.flask === 'cloudy' ? IMG.flaskPowder : snapshot.flask === 'blue' ? IMG.flaskBlue : IMG.flask;
  const indicatorSteps = useMemo<ExperimentStep[]>(() => STEPS.map((item, index) => ({
    id: index + 1, title: item.title, description: item.description,
    highlightItems: [], animationType: 'move', completed: completedSteps.includes(index),
  })), [completedSteps]);
  const sidebarStepData = STEPS[hoveredStep ?? (currentStep === 0 ? 0 : Math.min(currentStep - 1, STEPS.length - 1))];
  const showPipetteTip = action?.target === 'pipette' || (currentStep === 8 && phase === 2);
  const sceneEquipment = useMemo(() => {
    const activeTarget = needsRackClick ? null : (action?.target === 'pipette' && (activeDeskTubeIdx !== null || (currentStep === 11 && !action?.requiresClick)) ? null : action?.target);
    return {
    pcr: (
      <>
        <EquipmentButton target="tipBox" active={activeTarget === 'tipBox'} revision={sceneRevision} onActivate={handleEquipment} label="Tip Box" className="left-[55.2%] top-[66.5%] h-[15%] w-[6.3%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><Asset src={snapshot.tipBoxOpen ? IMG.tipBoxOpen : IMG.tipBox} alt={snapshot.tipBoxOpen ? "Open Tip Box" : "Tip Box"} /></div></EquipmentButton>
        <EquipmentButton target="benchBox" active={activeTarget === 'benchBox'} revision={sceneRevision} onActivate={handleEquipment} label="Consumables Box" className="left-[65.3%] top-[67%] h-[15%] w-[6.3%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><Asset src={snapshot.benchBoxOpen ? IMG.benchBoxOpen : IMG.benchBoxRight} alt={snapshot.benchBoxOpen ? "Open Consumables Box" : "Consumables Box"} /></div></EquipmentButton>
        {currentStep <= 3 && deskTubes.length > 0 && <DeskTubes tubes={deskTubes} activeIdx={activeDeskTubeIdx} openedIdx={openedTubeIdx} onTubeClick={handleDeskTubeClick} pcrTubeLevel={snapshot.tubeLevel} sceneRevision={sceneRevision} stepIndex={currentStep} />}
        {currentStep <= 3 && <EquipmentButton target="pipette" active={activeTarget === 'pipette'} revision={sceneRevision} onActivate={handleEquipment} label="Pipette" className="left-[63.6%] top-[45.2%] h-[33.6%] w-[4.8%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><PipetteVisual withTip={showPipetteTip} /></div></EquipmentButton>}
        {currentStep === 3 && phase === 2 && <EquipmentButton target="centrifuge" active={activeTarget === 'centrifuge'} revision={sceneRevision} onActivate={handleEquipment} label="Centrifuge" className="left-[76%] top-[67.5%] h-[21%] w-[6.5%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><Asset src={IMG.centrifuge} alt="Mini Centrifuge" /></div></EquipmentButton>}
      </>
    ),
    centrifuge: (
      <>
        <EquipmentButton target="centrifuge" active={activeTarget === 'centrifuge'} revision={sceneRevision} onActivate={handleEquipment} label="Centrifuge" className="left-[76%] top-[67.5%] h-[21%] w-[6.5%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><Asset src={IMG.centrifuge} alt="Mini Centrifuge" /></div></EquipmentButton>
        <EquipmentButton target="pcrMachine" active={activeTarget === 'pcrMachine'} revision={sceneRevision} onActivate={handleEquipment} label="Thermal Cycler" className="left-[52%] top-[18%] h-[16%] w-[10%]"><Asset src={IMG.pcrMachine} alt="Thermal Cycler" /></EquipmentButton>
        <div className="absolute left-[67%] top-[67%] text-xs text-slate-800">Balance opposite positions · Brief spin</div>
      </>
    ),
    amplification: (
      <>
        <EquipmentButton target="pcrMachine" active={activeTarget === 'pcrMachine'} revision={sceneRevision} onActivate={handleEquipment} label="Thermal Cycler" className="left-[52%] top-[18%] h-[16%] w-[10%]"><Asset src={IMG.pcrMachine} alt="Thermal Cycler" /></EquipmentButton>
        {currentStep === 4 && <div id="exp5-pcr-transfer-tube" className="pointer-events-none absolute left-[55.5%] top-[18%] z-30 h-[8%] w-[3%]"><Asset src={IMG.pcrTube} alt="PCR Tube" /></div>}
        {currentStep === 5 && (
          <>
            <div className="pointer-events-none absolute left-[64%] top-[12%] z-30 h-[8%] w-[3%]"><Asset src={IMG.pcrTube} alt="PCR Tube" /></div>
            <div className="absolute left-[18%] top-[38%] z-[90] w-[34%] border border-black bg-[#f37b2b] p-3 font-mono text-[10px] text-black shadow-xl">
              <p className="mb-3 text-sm font-bold text-orange-300">PCR Program</p>
              <div className="space-y-2"><p>94°C · Initial denaturation, 3 min</p><p>30×: 94°C denaturation</p><p>55–60°C annealing</p><p>72°C extension</p><p>72°C · Final extension, 5 min</p><p>4°C · Hold</p></div>
            </div>
            <div className="absolute right-[8%] top-[5%] z-30 flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] border-slate-800 bg-white shadow-lg">
              <div className="relative h-full w-full">
                <div className="absolute left-1/2 top-1/2 h-[2px] w-[40%] origin-left bg-slate-800" style={{ transform: 'rotate(0deg)', transformOrigin: 'left center' }} />
                <div className="absolute left-1/2 top-1/2 h-[2px] w-[30%] origin-left bg-red-600" style={{ transform: 'rotate(0deg)', transformOrigin: 'left center' }} />
                <div className="absolute left-1/2 top-1/2 h-[3px] w-[3px] rounded-full bg-slate-800" />
              </div>
            </div>
          </>
        )}
      </>
    ),
    gel: (
      <>
        {currentStep === 6 ? (
          <>
            <EquipmentButton target="largeBottle" active={activeTarget === 'largeBottle'} revision={sceneRevision} onActivate={handleEquipment} label="Agarose Powder Bottle" className="left-[29.6%] top-[55%] h-[20%] w-[6.2%]"><Asset src={phase === 1 ? IMG.whiteBottleOpen : IMG.whiteBottle} alt={phase === 1 ? "Open Agarose Powder Bottle" : "Agarose Powder Bottle"} /></EquipmentButton>
            <EquipmentButton target="tweezers" active={activeTarget === 'tweezers'} revision={sceneRevision} onActivate={handleEquipment} label="Spatula" className="left-[39.15%] top-[74.8%] h-[12%] w-[1.5%]"><Asset src={IMG.swab} alt="Spatula" /></EquipmentButton>
            <EquipmentButton target="flask" active={activeTarget === 'flask'} revision={sceneRevision} onActivate={handleEquipment} label="Erlenmeyer Flask" className="left-[14%] top-[59.5%] h-[20%] w-[10%]"><Asset src={flaskSource} alt="Erlenmeyer Flask" /></EquipmentButton>
            <EquipmentButton target="taeJug" active={activeTarget === 'taeJug'} revision={sceneRevision} onActivate={handleEquipment} label="TAE Buffer Container" className="left-[23.7%] top-[30.4%] h-[22%] w-[4.6%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><Asset src={IMG.taeJug} alt="TAE Buffer Container" /></div></EquipmentButton>
          </>
        ) : currentStep === 7 ? (
          <>
            <div className="absolute left-[31.5%] top-[11%] z-30 text-lg font-bold text-slate-800">{phase === 0 ? "Microwave Heating" : "Cool to 60°C"}</div>
            <EquipmentButton target="microwave" active={activeTarget === 'microwave'} revision={sceneRevision} onActivate={handleEquipment} label="Microwave" className="left-[39%] top-[15%] h-[18%] w-[12%]"><Asset src={phase >= 1 ? IMG.microwaveOpen : IMG.microwaveClosed} alt="Microwave" /></EquipmentButton>
            <div className="pointer-events-none absolute left-[25.2%] top-[15%] z-20 h-[20%] w-[10%]"><Asset src={flaskSource} alt="Erlenmeyer Flask" /></div>
          </>
        ) : currentStep === 8 ? (
          <>
            <div id="exp5-flask" className="pointer-events-none absolute left-[14%] top-[59.5%] z-20 h-[20%] w-[10%]"><Asset src={flaskSource} alt="Erlenmeyer Flask" /></div>
            <EquipmentButton target="brownBottle" active={activeTarget === 'brownBottle'} revision={sceneRevision} onActivate={handleEquipment} label="GelRed Stain Bottle" className="left-[23.2%] top-[63.8%] h-[17%] w-[4.8%]"><Asset src={phase >= 1 ? IMG.brownBottleOpen : IMG.brownBottle} alt="GelRed Stain Bottle" /></EquipmentButton>
            <EquipmentButton target="benchBox" active={activeTarget === 'benchBox'} revision={sceneRevision} onActivate={handleEquipment} label="Tip Box" className="left-[55%] top-[66%] h-[15%] w-[6.3%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><Asset src={snapshot.benchBoxOpen ? IMG.benchBoxOpen : IMG.benchBoxRight} alt="Tip Box" /></div></EquipmentButton>
            {phase >= 1 && <EquipmentButton target="pipette" active={activeTarget === 'pipette'} revision={sceneRevision} onActivate={handleEquipment} label="Pipette" className="left-[63.6%] top-[45.2%] h-[33.6%] w-[4.8%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><PipetteVisual withTip={showPipetteTip} /></div></EquipmentButton>}
          </>
        ) : currentStep === 9 ? (
          <>
            {phase === 0 && <div id="exp5-flask" className="pointer-events-none absolute left-[48%] top-[76%] z-20 h-[20%] w-[10%]"><Asset src={flaskSource} alt="Erlenmeyer Flask" /></div>}
            {phase === 0 ? (
              <EquipmentButton target="gelTray" active={activeTarget === 'gelTray'} revision={sceneRevision} onActivate={handleEquipment} label="Gel Casting Tray" className="left-[64%] top-[77%] h-[21%] w-[14%]"><img src={IMG.gelCastFrameNew} className="h-full w-full object-contain" alt="Gel Casting Tray" draggable={false} /></EquipmentButton>
            ) : (
              <>
                {phase === 1 ? (
                  <>
                    <div id="exp5-gel-tray" className="pointer-events-none absolute left-[64%] top-[77%] z-20 h-[21%] w-[14%]"><img src={IMG.gelCastFrameNew} className="h-full w-full object-contain" alt="Gel Casting Assembly" draggable={false} /></div>
                    <div className="pointer-events-none absolute left-[64%] top-[77%] z-[21] h-[21%] w-[14%]"><img src={IMG.gelRedSolid} className="h-full w-full object-contain" alt="Red Agarose Solution" draggable={false} /></div>
                  </>
                ) : (
                  <div id="exp5-gel-tray" className="pointer-events-none absolute left-[64%] top-[77%] z-20 h-[21%] w-[14%]"><img src={IMG.gelSolidified} className="h-full w-full object-contain" alt="Casting Assembly with Set Gel" draggable={false} /></div>
                )}
                {phase === 1 && <EquipmentButton target="comb" active={activeTarget === 'comb'} revision={sceneRevision} onActivate={handleEquipment} label="Gel Comb" className="left-[65%] top-[79%] z-[22] h-[10%] w-[14%]"><img src={IMG.gelCombFlat} className="h-full w-full object-contain" alt="Gel Comb" draggable={false} /></EquipmentButton>}
                {phase === 2 && <EquipmentButton target="taeJug" active={activeTarget === 'taeJug'} revision={sceneRevision} onActivate={handleEquipment} label="TAE Buffer Container" className="left-[23.7%] top-[30.4%] h-[22%] w-[4.6%]"><Asset src={IMG.taeJug} alt="TAE Buffer Container" /></EquipmentButton>}
              </>
            )}
          </>
        ) : currentStep === 10 ? (
          <>
            <div id="exp5-gel-tray" className="pointer-events-none absolute left-[64%] top-[77%] z-20 h-[21%] w-[14%]"><img src={IMG.gelSolidified} className="h-full w-full object-contain" alt="Casting Assembly with Set Gel" draggable={false} /></div>
            {deskTubes.length > 0 && <DeskTubes tubes={deskTubes} activeIdx={activeDeskTubeIdx} openedIdx={openedTubeIdx} onTubeClick={handleDeskTubeClick} pcrTubeLevel={snapshot.tubeLevel} sceneRevision={sceneRevision} stepIndex={currentStep} />}
            <EquipmentButton target="pipette" active={activeTarget === 'pipette'} revision={sceneRevision} onActivate={handleEquipment} label="Pipette" className="left-[63.6%] top-[45.2%] h-[33.6%] w-[4.8%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><PipetteVisual withTip={showPipetteTip} /></div></EquipmentButton>
          </>
        ) : currentStep === 11 ? (
          <>
            {phase < 5 && <div id="exp5-gel-tray" className="pointer-events-none absolute left-[64%] top-[77%] z-20 h-[21%] w-[14%]"><img src={IMG.gelSolidified} className="h-full w-full object-contain" alt="Casting Assembly with Set Gel" draggable={false} /></div>}
            <div data-gel-tube="0" className={`pointer-events-none absolute left-[50%] top-[81%] z-20 h-[11%] w-[2%] ${phase === 1 ? GLOW : ''}`} style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><img src={IMG.loadingTube15} className="h-full w-full object-contain" alt="Loading Sample 15" draggable={false} /></div>
            <div data-gel-tube="1" className={`pointer-events-none absolute left-[55%] top-[81%] z-20 h-[11%] w-[2%] ${phase === 3 ? GLOW : ''}`} style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><img src={IMG.loadingTube16} className="h-full w-full object-contain" alt="DNA Marker 16" draggable={false} /></div>
            {phase < 4 && <EquipmentButton target="tipBox" active={activeTarget === 'tipBox'} revision={sceneRevision} onActivate={handleEquipment} label="Tip Box" className="left-[55.2%] top-[66.5%] h-[15%] w-[6.3%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><Asset src={snapshot.tipBoxOpen ? IMG.tipBoxOpen : IMG.tipBox} alt="Tip Box" /></div></EquipmentButton>}
            {phase < 4 && <EquipmentButton target="pipette" active={activeTarget === 'pipette'} revision={sceneRevision} onActivate={handleEquipment} label="Pipette" className="left-[60%] top-[45%] h-[33.6%] w-[4.8%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><PipetteVisual withTip={showPipetteTip} /></div></EquipmentButton>}
            {phase === 4 && <EquipmentButton target="chamber" active={activeTarget === 'chamber'} revision={sceneRevision} onActivate={handleEquipment} label="Transfer Assembly" className="left-[42%] top-[56%] h-[39%] w-[34%]"><Asset src={IMG.transferApparatus} alt="Transfer Assembly" /></EquipmentButton>}
            {phase >= 5 && <EquipmentButton target="chamber" active={activeTarget === 'chamber'} revision={sceneRevision} onActivate={handleEquipment} label="Assembled Electrophoresis Equipment" className="left-[42%] top-[56%] h-[39%] w-[34%]"><Asset src={IMG.transferApparatusClicked} alt="Assembled Electrophoresis Equipment" /></EquipmentButton>}
            {phase >= 5 && <div className="absolute right-[5%] bottom-[11%] rounded-lg bg-slate-950/80 px-4 py-2 text-center text-xs text-cyan-100"><b className="text-lg text-yellow-300">120 V</b><br />25 min</div>}
          </>
        ) : null}
      </>
    ),
    electrophoresis: (
      <>
        <EquipmentButton target="pipette" active={activeTarget === 'pipette'} revision={sceneRevision} onActivate={handleEquipment} label="Pipette" className="left-[63.6%] top-[45.2%] h-[33.6%] w-[4.8%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><PipetteVisual withTip={showPipetteTip} /></div></EquipmentButton>
        <EquipmentButton target="tweezers" active={activeTarget === 'tweezers'} revision={sceneRevision} onActivate={handleEquipment} label="Gel Lifting Plate and Clamp" className="left-[34%] top-[82%] h-[10%] w-[11%]"><Asset src={IMG.tweezers} alt="Clamp" /></EquipmentButton>
        <EquipmentButton target="comb" active={activeTarget === 'comb'} revision={sceneRevision} onActivate={handleEquipment} label="Gel Comb" className="left-[80%] top-[85%] h-[8%] w-[9%]"><Asset src={IMG.comb} alt="Gel Comb" /></EquipmentButton>
        <EquipmentButton target="chamber" active={activeTarget === 'chamber'} revision={sceneRevision} onActivate={handleEquipment} label="Electrophoresis Tank" className="left-[51%] top-[72%] h-[21%] w-[18%]"><Asset src={snapshot.chamberCovered ? IMG.chamberConnected : IMG.chamber} alt="Electrophoresis Tank" /></EquipmentButton>
        {snapshot.gel !== 'none' && <div key={`gel-${sceneRevision}`} className="absolute left-[54%] top-[76%] z-30 h-[14%] w-[13%]"><Asset src={snapshot.gel === 'loaded' ? IMG.gelLanes : IMG.redGel} alt="Agarose Gel" /></div>}
        <EquipmentButton target="power" active={activeTarget === 'power'} revision={sceneRevision} onActivate={handleEquipment} label="Electrophoresis Power Supply" className="left-[87%] top-[72%] h-[15%] w-[10%]"><div className="h-full w-full" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><Asset src={IMG.power} alt="Electrophoresis Power Supply" /></div></EquipmentButton>
        {currentStep === 11 && <div className="absolute right-[5%] bottom-[11%] rounded-lg bg-slate-950/80 px-4 py-2 text-center text-xs text-cyan-100"><b className="text-lg text-yellow-300">120 V</b><br />25 min</div>}
      </>
    ),
    uv: (
      <>
        <EquipmentButton target="imager" active={activeTarget === 'imager'} revision={sceneRevision} onActivate={handleEquipment} label="UV Gel Imager" className="left-[5.8%] top-[10.5%] w-[12.7%]"><Asset src={IMG.uvCabinet} alt="UV Gel Imager" /></EquipmentButton>
        {/* 红色凝胶图片在紫外成像仪右侧 */}
        <div className="pointer-events-none absolute left-[20%] top-[16%] z-30 h-[14%] w-[8%]">
          <img src={IMG.uvGelReference} className="h-full w-full object-contain" alt="Gel" draggable={false} />
        </div>
        {/* 箭头指向紫外成像仪 */}
        <div className="pointer-events-none absolute left-[18%] top-[20%] z-30 text-4xl text-orange-500 font-bold">←</div>
        {phase >= 1 && (
          <div className="pointer-events-none absolute left-[5.8%] top-[10.5%] z-20 w-[12.7%]" style={{ filter: 'drop-shadow(0 0 8px rgba(255,238,120,1)) drop-shadow(0 0 18px rgba(255,205,55,0.95)) brightness-125' }}>
            <Asset src={IMG.uvCabinet} alt="UV Gel Imager" />
          </div>
        )}
      </>
    ),
  };
  }, [action?.requiresClick, action?.target, activeDeskTubeIdx, currentStep, deskTubes, flaskSource, handleDeskTubeClick, handleEquipment, needsRackClick, openedTubeIdx, phase, sceneRevision, showPipetteTip, snapshot.benchBoxOpen, snapshot.chamberCovered, snapshot.gel, snapshot.tipBoxOpen, snapshot.tubeLevel]);

  return (
    <div className="experiment-shell experiment-page-5 flex h-screen w-screen flex-col overflow-hidden text-white">
      <header className="flex h-12 shrink-0 items-center justify-between lab-topbar px-3">
        <div className="flex min-w-0 items-center gap-2">
          <button type="button" onClick={onBack} className="grid h-8 w-8 shrink-0 place-items-center lab-icon-button" aria-label="Back to Experiment Catalog"><ChevronLeft className="h-4 w-4" /></button>
          <div className="min-w-0"><h1 className="truncate text-sm font-semibold text-white">Experiment 5: GFP PCR and Agarose Gel Electrophoresis</h1><p className="truncate text-[10px] text-blue-200">PCR amplification and electrophoresis verification</p></div>
        </div>
        <RestartExperimentButton onRestart={onRestart} />
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden lg:flex flex-col w-64 p-3 lab-steps-rail shrink-0 overflow-y-auto">
          {sidebarStepData && !finished && (
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
          <StepIndicator steps={indicatorSteps} currentStep={Math.min(currentStep, STEPS.length - 1)} completedSteps={completedSteps} onStepClick={handleStepNavigation} onStepHover={setHoveredStep} />
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-2 overflow-hidden lab-bench p-3">
          <div className="flex w-full flex-none items-center justify-center">
          <div ref={sceneRef} id="experiment5-canvas" className="relative aspect-video h-auto w-full max-h-full max-w-full flex-none overflow-clip bg-[#4774c1] lab-canvas-frame">
            <div className="absolute inset-x-0 top-[35%] bottom-[28%] border-t border-slate-500 bg-[#d9dee7]" />
            <div className="absolute inset-x-0 top-[71%] bottom-0 border-t border-slate-500 bg-[#eeeeee] [clip-path:polygon(4%_0,96%_0,100%_100%,0_100%)]" />
            {step.scene !== 'uv' && <img src={IMG.uvCabinet} className="pointer-events-none absolute left-[5.8%] top-[10.5%] z-20 w-[12.7%] object-contain" alt="UV Gel Imaging Cabinet" />}
            {currentStep !== 6 && currentStep !== 9 && <img src={IMG.taeJug} className="pointer-events-none absolute left-[25.2%] top-[30.4%] z-20 w-[4.6%] object-contain" alt="TAE Buffer Container" draggable={false} style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }} />}
            <img src={IMG.labTable} className="pointer-events-none absolute left-[33.7%] top-[26.9%] z-10 w-[32.2%] object-contain" alt="Laboratory Bench" />
            {currentStep !== 7 && <img src={IMG.microwaveClosed} className="pointer-events-none absolute left-[39%] top-[15%] z-20 h-[18%] w-[12%] object-contain" alt="Microwave" draggable={false} />}

            {step.scene !== 'amplification' && <img id="exp5-pcr-machine-background" src={IMG.pcrMachine} className="pointer-events-none absolute left-[52%] top-[18%] z-20 h-[16%] w-[10%] object-contain" alt="Thermal Cycler" draggable={false} />}
            <img src={IMG.cleanBench} className="pointer-events-none absolute left-[78.7%] top-[6.9%] z-20 w-[13.5%] object-contain" alt="Laminar Flow Cabinet" />
            <img src={IMG.benchBoxLeft} className="pointer-events-none absolute left-[81.25%] top-[25.3%] z-30 w-[1.65%] object-contain" alt="Left Box in Laminar Flow Cabinet" draggable={false} />
            <img src={IMG.benchBoxRight} className="pointer-events-none absolute left-[84.25%] top-[25.3%] z-30 w-[1.65%] object-contain" alt="Right Box in Laminar Flow Cabinet" draggable={false} />
            <img src={IMG.benchBlueRack} className="pointer-events-none absolute left-[86.6%] top-[25.55%] z-30 w-[2.05%] object-contain" alt="Blue Well Plate in Laminar Flow Cabinet" draggable={false} />
            <img src={IMG.benchTubes} className="pointer-events-none absolute left-[89.15%] top-[23.7%] z-30 h-[4.2%] w-[2.1%] object-contain" alt="Tube in Laminar Flow Cabinet" draggable={false} />
            <img src={IMG.hospitalLogo} className="pointer-events-none absolute left-[82.75%] top-[-0.73%] z-30 w-[6.98%] object-contain" alt="First Hospital of Jilin University Emblem" draggable={false} />
            <img src={IMG.igemLogo} className="pointer-events-none absolute left-[91.37%] top-[1.05%] z-30 w-[7.84%] object-contain" alt="iGEM Logo" draggable={false} />
            <PptReagentRack canClick={needsRackClick} onClick={handleRackClick} rackClickCount={rackClickCount} />
            {step.scene !== 'gel' && <img src={flaskSource} className="pointer-events-none absolute left-[14%] top-[59.5%] z-20 w-[10%] object-contain" alt="Erlenmeyer Flask" />}
            {currentStep !== 8 && <img src={IMG.brownBottle} className="pointer-events-none absolute left-[23.2%] top-[63.8%] z-20 h-[17%] w-[4.8%] object-contain" alt="Brown Liquid Reagent Bottle" draggable={false} />}
            {currentStep !== 6 && <img src={IMG.whiteBottle} className="pointer-events-none absolute left-[29.6%] top-[60.8%] z-20 h-[20%] w-[6.2%] object-contain" alt="White Powder Bottle" draggable={false} />}
            <img src={IMG.metalTray} className="pointer-events-none absolute left-[35.5%] top-[75.3%] z-20 w-[8.8%] object-contain" alt="Metal Tray" draggable={false} />
            {currentStep !== 6 && <img src={IMG.swab} className="pointer-events-none absolute left-[39.15%] top-[74.8%] z-20 h-[12%] w-[1.5%] object-contain" alt="Spatula" draggable={false} />}
            {step.scene !== 'uv' && <img src={IMG.beaker} className="pointer-events-none absolute left-[46.2%] top-[65%] z-20 w-[5.8%] object-contain" alt="TAE Buffer" draggable={false} />}
            {step.scene !== 'pcr' && currentStep !== 8 && currentStep !== 11 && <div className="pointer-events-none absolute left-[55.2%] top-[66.5%] z-20 h-[15%] w-[6.3%]" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }}><img src={snapshot.tipBoxOpen ? IMG.tipBoxOpen : IMG.tipBox} className="h-full w-full object-contain" alt="Tip Box" draggable={false} /></div>}
            {step.scene !== 'pcr' && <img src={IMG.benchBoxRight} className="pointer-events-none absolute left-[65.3%] top-[67%] z-20 h-[15%] w-[6.3%] object-contain" alt="Right Consumables Box" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }} />}
            {step.scene !== 'amplification' && !(currentStep === 3 && phase === 2) && <img src={IMG.centrifuge} className="pointer-events-none absolute left-[76%] top-[67.5%] z-20 h-[21%] w-[6.5%] object-contain" alt="Mini Centrifuge" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }} />}
            {(currentStep !== 11 || phase < 5) && <img src={IMG.power} className="pointer-events-none absolute left-[87.2%] top-[70.5%] z-20 w-[10.5%] object-contain" alt="Electrophoresis Power Supply" style={{ transform: 'scale(1.5)', transformOrigin: 'bottom center' }} draggable={false} />}

            {!finished && sceneEquipment[step.scene]}

            {message && !showUvResult && !showCentrifugeDisplay && <div className="absolute right-4 top-3 z-50 max-w-[34%] rounded-lg bg-emerald-950/85 px-3 py-2 text-center text-[11px] text-emerald-100 shadow-lg">{message}</div>}

            {showUvResult && (
              <div className="absolute inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm">
                <div className="relative max-h-full max-w-[420px] overflow-hidden rounded-2xl border-2 border-blue-400 bg-blue-600 p-6 shadow-2xl">
                  <button type="button" onClick={() => { setShowUvResult(false); finishStep(); }} className="absolute right-3 top-3 z-10 rounded-full bg-blue-800 p-1 text-blue-100" aria-label="Close results and complete experiment"><X size={17} /></button>
                  <div className="flex flex-col gap-1 text-center text-white">
                    <p className="text-sm font-bold">[TOP] ← Loading wells (negative electrode)</p>
                    <p className="text-[11px] text-blue-200">(Blank area; large fragments retained here)</p>
                    <div className="my-1 border-t border-blue-300/40" />
                    <p className="text-sm font-bold">[DL2000 LADDER BANDS]</p>
                    <p className="text-xs">2000 bp</p>
                    <p className="text-xs">1000 bp</p>
                    <p className="text-xs">750 bp</p>
                    <p className="text-sm font-bold text-yellow-300">[TARGET BAND] ← 720 bp</p>
                    <p className="text-xs">500 bp</p>
                    <p className="text-xs">250 bp</p>
                    <p className="text-xs">100 bp ← Lowest</p>
                    <div className="my-1 border-t border-blue-300/40" />
                    <p className="text-sm font-bold">[BOTTOM] ← Positive electrode (dye front)</p>
                  </div>
                </div>
              </div>
            )}

            {showCentrifugeDisplay && (
              <div className="absolute inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm">
                <div className="relative flex max-h-full max-w-full flex-col items-center gap-4 overflow-hidden rounded-2xl border border-cyan-400/40 bg-slate-900 p-6 shadow-2xl">
                  <button type="button" onClick={() => { setShowCentrifugeDisplay(false); finishStep(); }} className="absolute right-3 top-3 z-10 rounded-full bg-slate-800 p-1 text-slate-300" aria-label="Close and continue"><X size={17} /></button>
                  <p className="text-lg font-bold text-cyan-300">Brief Centrifugation</p>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/microtube-clear.avif" alt="PCR Tube" className="h-24 w-auto object-contain" draggable={false} />
                      <span className="text-xs text-slate-400">PCR Tube</span>
                    </div>
                    <div className="text-2xl text-orange-400">→</div>
                    <div className="flex flex-col items-center gap-2">
                      <img src={IMG.centrifuge} alt="Mini Centrifuge" className="h-28 w-auto object-contain" draggable={false} />
                      <span className="text-xs text-slate-400">Mini Centrifuge</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">Place the PCR tube in the centrifuge and briefly spin the liquid down</p>
                </div>
              </div>
            )}

            {finished && <ExperimentCompletion onRestart={onRestart} onBack={onBack} />}
          </div></div>

          {!finished && (
            <div className="w-full min-h-[112px] flex-1 px-1 pt-1 text-left">
              <div className="lab-step-caption mb-2 flex items-center gap-2 text-sm font-bold">
                <span className="text-blue-400">Step {currentStep + 1}/{STEPS.length}</span>
                <span className="text-blue-500">|</span>
                <span className="text-blue-400">{step.title}</span>
              </div>
              <div className="flex h-[calc(100%-30px)] items-center justify-center lab-note-card px-4 py-3 text-center text-xs leading-relaxed">
                {needsRackClick ? "Click the tube rack at the far left to retrieve the reagents for the next step" : (action?.instruction ?? step.description)}
              </div>
              <div className="mt-2 flex justify-end" />
            </div>
          )}
        </main>
        {showInfo && (
          <aside className="hidden xl:flex flex-col w-80 p-3 lab-info-rail shrink-0 overflow-y-auto">
            <Experiment5InfoPanel />
          </aside>
        )}
      </div>
    </div>
  );
}

export const ExperimentPage = ExperimentPage5;
