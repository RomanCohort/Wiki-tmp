import type { ExperimentInfoSidebarData } from '../components/ExperimentInfoSidebar';

export const experiment1SidebarData = {
  experimentLabel: 'Experiment 01',
  title: "Experiment Information",
  safety: [
    "Wear a lab coat and gloves throughout and use aseptic technique.",
    "Handle the alcohol lamp carefully to prevent fires and ethanol spills.",
    "Sterilize all equipment that has contacted bacteria before disposal.",
    "Do not eat or drink in the laboratory. Avoid microbial contamination.",
  ],
  principle:
    "Glycerol protects cell structures during freezing, allowing dormant bacteria to resume growth under suitable conditions. LB medium supplies nutrients for growth. Successive streaking dilutes the inoculum to obtain isolated colonies and a pure culture. Aseptic technique prevents contamination.",
  questions: [
    {
      id: 1,
      question: "What is the main purpose of glycerol in bacterial storage?",
      options: ["Prevent ice crystals from damaging cells", "Provide nutrients"],
      correctIndex: 0,
    },
    {
      id: 2,
      question: "What is the main purpose of plate streaking?",
      options: ["Obtain isolated colonies", "Increase the culture concentration"],
      correctIndex: 0,
    },
  ],
  instruments: [
    { id: 'clean-bench', name: "Laminar Flow Cabinet", englishName: 'Laminar Flow Cabinet', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08241.avif' },
    { id: 'pipette', name: "Pipette", englishName: 'Pipette', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08253.avif' },
    { id: 'ice-box', name: "Ice Box", englishName: 'Ice Box', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/ice-box.avif' },
    { id: 'alcohol-lamp', name: "Alcohol Lamp", englishName: 'Alcohol Lamp', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08254.avif' },
    { id: 'inoculating-loop', name: "Inoculation Loop", englishName: 'Inoculating Loop', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/loop2.avif' },
    { id: 'freezer', name: "Ultra-low Temperature Freezer", englishName: 'Ultra-low Temperature Freezer', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08242.avif' },
    { id: 'incubator', name: "Incubator", englishName: 'Constant Temperature Incubator', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08243.avif' },
  ],
  instrumentTrayOrder: [
    'ice-box',
    'freezer',
    'inoculating-loop',
    'clean-bench',
    'incubator',
    'pipette',
    'alcohol-lamp',
  ],
  reagents: [
    {
      id: 'dh5a',
      name: "E. coli DH5α glycerol stock",
      englishName: 'Escherichia coli DH5α Strain',
      image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08251.avif',
    },
    {
      id: 'lb-solid-medium',
      name: "LB agar medium",
      englishName: 'LB Solid Medium',
      image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08252.avif',
    },
  ],
} satisfies ExperimentInfoSidebarData;
