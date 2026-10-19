import type { ExperimentInfoSidebarData } from '../components/ExperimentInfoSidebar';

export const experiment2SidebarData = {
  experimentLabel: 'Experiment 02',
  title: "Experiment Information",
  safety: [
    "Wear a lab coat and gloves; avoid contact with bacteria and stains.",
    "Avoid overheating during heat fixation to protect the specimen.",
    "Clean up spilled stains promptly.",
    "Clean the microscope after use.",
    "Dispose of slides and similar materials as biological waste.",
  ],
  principle:
    "E. coli is Gram-negative and forms round, smooth, moist, translucent colonies. Gram staining distinguishes bacteria by cell wall structure: after decolorization and counterstaining, Gram-negative cells appear red and Gram-positive cells appear purple.",
  questions: [
    {
      id: 1,
      question: "Which step is critical for differentiation in Gram staining?",
      options: ["Ethanol decolorization", "Crystal violet staining"],
      correctIndex: 0,
    },
    {
      id: 2,
      question: "What color does E. coli appear after Gram staining?",
      options: ["Red", "Purple"],
      correctIndex: 0,
    },
  ],
  instruments: [
    { id: 'microscope', name: "Light Microscope", englishName: 'Light Microscope', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/microscope.avif' },
    { id: 'alcohol-lamp', name: "Alcohol Lamp", englishName: 'Alcohol Lamp', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/alcohol-lamp.avif' },
    { id: 'inoculating-loop', name: "Inoculation Loop", englishName: 'Inoculating Loop', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/inoculating-loop.avif' },
    { id: 'tweezers', name: "Forceps", englishName: 'Tweezers', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/tweezers.avif' },
    { id: 'beaker', name: "Beaker", englishName: 'Beaker', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/beaker.avif' },
    { id: 'glass-slide', name: "Microscope Slide", englishName: 'Glass Slide', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/glass-slide.avif' },
  ],
  instrumentTrayOrder: ['beaker', 'microscope', 'glass-slide', 'inoculating-loop', 'tweezers', 'alcohol-lamp'],
  reagents: [
    { id: 'crystal-violet', name: "Crystal violet solution", englishName: 'Crystalline violet dye solution', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/crystal-violet.avif' },
    { id: 'ethyl-alcohol', name: "Ethanol", englishName: 'ethyl alcohol', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/ethyl-alcohol.avif' },
    { id: 'safranin', name: "Basic fuchsin solution", englishName: 'Redness staining solution', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/safranin.avif' },
    { id: 'iodine', name: "Iodine solution", englishName: 'iodine solution', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/iodine.avif' },
    { id: 'normal-saline', name: "Saline", englishName: 'normal saline', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/normal-saline.avif' },
    { id: 'cedar-oil', name: "Cedarwood oil", englishName: 'cedar oil', image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/sidebar/cedar-oil.avif' },
  ],
} satisfies ExperimentInfoSidebarData;
