import type { ExperimentInfoSidebarData } from '../components/ExperimentInfoSidebar';


export const experiment8SidebarData = {
  experimentLabel: 'Experiment 08',
  title: "Experiment Information",
  safety: [
    "Keep cells in an ice bath throughout competent cell preparation.",
    "Control heat-shock time and temperature precisely.",
    "Sterilize and cool the spreader before plating.",
    "Sterilize waste containing bacteria or plasmids before disposal.",
    "Wear a lab coat and gloves during the experiment.",
  ],
  principle:
    "CaCl₂ treatment increases membrane permeability to facilitate DNA uptake. Heat shock promotes plasmid entry into cells. Antibiotic selection allows plasmid-bearing cells to grow on kanamycin plates and isolates candidate transformants.",
  questions: [
    {
      id: 1,
      question: "What is the main effect of competent cell treatment?",
      options: ["Increase cell membrane permeability", "Reduce cell metabolism"],
      correctIndex: 0,
    },
    {
      id: 2,
      question: "Why are antibiotic plates used after transformation?",
      options: ["Select cells carrying a plasmid", "Increase bacterial growth rate"],
      correctIndex: 0,
    },
  ],
  instruments: [
    { id: 'pcr-amplifier', name: "Thermal Cycler", englishName: 'PCR Amplifier', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/pcr-amplifier.avif` },
    { id: 'pipette', name: "Pipette", englishName: 'Pipette', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/pipette.avif` },
    { id: 'power-supply', name: "Electrophoresis Power Supply", englishName: 'Electrophoresis Power Supply', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/power-supply.avif` },
    { id: 'microwave', name: "Microwave", englishName: 'Microwave Oven', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/microwave.avif` },
    { id: 'pipette-tip', name: "Pipette Tips", englishName: 'Pipette Tip', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/pipette-tip.avif` },
    { id: 'gel-comb', name: "Gel Comb", englishName: 'Gel Comb', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/gel-comb.avif` },
    { id: 'chamber', name: "Electrophoresis Tank", englishName: 'Electrophoresis Chamber', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/chamber.avif` },
    { id: 'gel-imager', name: "UV Gel Imaging System", englishName: 'UV Gel Imaging System', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/gel-imager.avif` },
    { id: 'spatula', name: "Spatula", englishName: 'Spatula', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/spatula.avif` },
    { id: 'ep-tube', name: "Microcentrifuge Tube", englishName: 'EP Tube', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/ep-tube.avif` },
    { id: 'ep-tube-rack', name: "Microcentrifuge Tube Rack", englishName: 'EP Tube Rack', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/ep-tube-rack.avif` },
  ],
  instrumentTrayOrder: [
    'gel-comb',
    'pcr-amplifier',
    'ep-tube',
    'microwave',
    'pipette-tip',
    'power-supply',
    'spatula',
    'gel-imager',
    'chamber',
    'pipette',
    'ep-tube-rack',
  ],
  reagents: [
    {
      id: 'recombinant-plasmid',
      name: "Recombinant pET-28a-GFP plasmid (Experiment 7 product)",
      englishName: 'Recombinant Plasmid pET-28a-GFP (Product of Experiment 7)',
      image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/recombinant-plasmid.avif`,
    },
    {
      id: 'dh5a-colony',
      name: "Activated E. coli DH5α colony (Experiment 1 product)",
      englishName: 'Activated Single Colony of Escherichia coli DH5α (Product of Experiment 1)',
      image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/dh5a-colony.avif`,
    },
    {
      id: 'lb-liquid-medium',
      name: "LB broth (without antibiotics)",
      englishName: 'LB Liquid Medium (Antibiotic-Free)',
      image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/lb-liquid-medium.avif`,
    },
    {
      id: 'glycerol-cacl2',
      name: "Calcium chloride solution (with 15% sterile glycerol)",
      englishName: 'CaCl₂ Solution (containing 15% Sterile Glycerol)',
      image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/glycerol-cacl2.avif`,
    },
    {
      id: 'kanamycin-lb-plate',
      name: "LB agar plate with kanamycin",
      englishName: 'Kanamycin Resistant LB Solid Medium Plate',
      image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/kanamycin-lb-plate.avif`,
    },
    {
      id: 'cacl2',
      name: "Calcium chloride solution",
      englishName: 'CaCl₂ Solution',
      image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment8/sidebar/cacl2.avif`,
    },
  ],
} satisfies ExperimentInfoSidebarData;
