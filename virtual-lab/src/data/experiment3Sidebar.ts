import type { ExperimentInfoSidebarData } from '../components/ExperimentInfoSidebar';


export const experiment3SidebarData = {
  experimentLabel: 'Experiment 03',
  title: "Experiment Information",
  safety: [
    "Wear a lab coat, gloves and goggles; avoid contact with strong alkali and ethanol.",
    "Balance the centrifuge and close the lid before use.",
    "Do not look directly at ultraviolet light when viewing gels.",
    "Dispose of bacterial waste as biohazardous material.",
  ],
  principle:
    "Alkaline lysis separates plasmid DNA from chromosomal DNA through their different denaturation and renaturation behavior. During agarose gel electrophoresis, negatively charged DNA migrates toward the positive electrode. Migration depends on fragment size, allowing assessment of plasmid size and integrity.",
  questions: [
    {
      id: 1,
      question: "What enables plasmid separation by alkaline lysis?",
      options: ["Different denaturation and renaturation behavior", "Different DNA colors"],
      correctIndex: 0,
    },
    {
      id: 2,
      question: "In which direction does DNA migrate during electrophoresis?",
      options: ["From the negative to the positive electrode", "From the positive to the negative electrode"],
      correctIndex: 0,
    },
  ],
  instruments: [
    { id: 'centrifuge', name: "High-speed Centrifuge", englishName: 'High Speed Centrifuge', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/highspeedcentrifuge.avif` },
    { id: 'vortex', name: "Vortex Mixer", englishName: 'Vortex Oscillator', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/vortexoscillator.avif` },
    { id: 'water-bath', name: "Water Bath", englishName: 'Thermostatic Water Bath', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/water-bath.avif` },
    { id: 'flask', name: "Erlenmeyer Flask", englishName: 'Erlenmeyer Flask', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/erlenmeyerflask.avif` },
    { id: 'microwave', name: "Microwave", englishName: 'Microwave Oven', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/microwaveovenclosed.avif` },
    { id: 'power-supply', name: "Electrophoresis Power Supply", englishName: 'Electrophoresis Power Supply', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08251.avif` },
    { id: 'gel-comb', name: "Gel Comb", englishName: 'Gel Comb', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08252.avif` },
    { id: 'chamber', name: "Electrophoresis Tank", englishName: 'Electrophoresis Chamber', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/08243.avif` },
    { id: 'gel-imager', name: "UV Gel Imaging System", englishName: 'UV Gel Imaging System', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/uvgelimagingsystem.avif` },
    { id: 'silica-column', name: "Silica DNA Purification Column", englishName: 'DNA Purification Silica Column', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/08242.avif` },
  ],
  instrumentTrayOrder: [
    'gel-comb',
    'centrifuge',
    'silica-column',
    'microwave',
    'chamber',
    'vortex',
    'power-supply',
    'flask',
    'gel-imager',
    'water-bath',
  ],
  reagents: [
    { id: 'solution-i', name: "Resuspension buffer", englishName: 'Solution I', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08241.avif` },
    { id: 'solution-ii', name: "Lysis buffer", englishName: 'Solution II', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08242.avif` },
    { id: 'solution-iii', name: "Neutralization buffer", englishName: 'Solution III', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/10.avif` },
    { id: 'wash-solution', name: "Wash buffer", englishName: 'bleach wash solution', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08243.avif` },
    { id: 'eluent', name: "Elution buffer", englishName: 'eluent', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08244.avif` },
    { id: 'agarose', name: "Agarose powder", englishName: 'Agarose powder', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08245.avif` },
    { id: 'tae', name: "1× TAE electrophoresis buffer", englishName: '1×TAE Electrophoresis Buffer', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentcarboyblue.avif` },
    { id: 'gelred', name: "Nucleic acid gel stain", englishName: 'GelRed', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08246.avif` },
    { id: 'dl2000', name: "DL2000 DNA ladder", englishName: 'DL2000 DNA Marker', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08247.avif` },
    { id: 'loading-buffer', name: "6× DNA loading buffer", englishName: '6×DNA Loading Buffer', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08248.avif` },
  ],
} satisfies ExperimentInfoSidebarData;
