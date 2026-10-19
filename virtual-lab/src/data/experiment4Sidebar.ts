import type { ExperimentInfoSidebarData } from '../components/ExperimentInfoSidebar';


export const experiment4SidebarData = {
  experimentLabel: 'Experiment 04',
  title: "Experiment Information",
  safety: [
    "Use UV shielding when viewing gels; do not look directly at UV light.",
    "Avoid skin and eye contact with reagents.",
    "Balance the samples and close the centrifuge lid before centrifugation.",
    "Dispose of experimental waste according to biohazard procedures.",
  ],
  principle:
    "Gel extraction relies on DNA binding to a silica membrane under high-salt conditions. Washing removes salts, ethanol and gel impurities. Low-salt elution buffer then releases the purified DNA, isolating the target gene fragment.",
  questions: [
    {
      id: 1,
      question: "What condition promotes DNA binding to the column?",
      options: ["High salt concentration", "Low salt concentration"],
      correctIndex: 0,
    },
    {
      id: 2,
      question: "What is the main purpose of gel extraction?",
      options: ["Purify a DNA fragment", "Amplify DNA"],
      correctIndex: 0,
    },
  ],
  instruments: [
    { id: 'power-supply', name: "Electrophoresis Power Supply", englishName: 'Electrophoresis Power Supply', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/power-supply.avif` },
    { id: 'beaker', name: "Beaker", englishName: 'Beaker', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/beaker.avif` },
    { id: 'flask', name: "Erlenmeyer Flask", englishName: 'Erlenmeyer Flask', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/flask.avif` },
    { id: 'centrifuge', name: "High-speed Centrifuge", englishName: 'High Speed Centrifuge', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/centrifuge.avif` },
    { id: 'gel-imager', name: "UV Gel Imager", englishName: 'Ultraviolet Imager', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/gel-imager.avif` },
    { id: 'water-bath', name: "Water Bath", englishName: 'Thermostatic Water Bath', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/water-bath.avif` },
    { id: 'balance', name: "Electronic Balance", englishName: 'Electronic Scales', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/balance.avif` },
    { id: 'comb', name: "Gel Comb", englishName: 'Gel Comb', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/comb.avif` },
    { id: 'chamber', name: "Electrophoresis Tank", englishName: 'Electrophoresis Chamber', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/electrophoresischamberconnected.avif' },
  ],
  instrumentTrayOrder: [
    'gel-imager',
    'beaker',
    'power-supply',
    'comb',
    'balance',
    'centrifuge',
    'chamber',
    'flask',
    'water-bath',
  ],
  reagents: [
    { id: 'sol-solution', name: "Gel solubilization buffer", englishName: 'Sol Solution', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/buffer-pink.svg` },
    { id: 'wash-solution', name: "Wash buffer", englishName: 'Bleach Wash Solution', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/buffer-orange.avif` },
    { id: 'eluent', name: "Elution buffer", englishName: 'Eluent', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/buffer-green.avif` },
  ],
} satisfies ExperimentInfoSidebarData;
