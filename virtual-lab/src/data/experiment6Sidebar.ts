import type { ExperimentInfoSidebarData } from '../components/ExperimentInfoSidebar';

const sampleTubeImage = `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/sample-clear.avif`;
const sampleTubeAspectRatio = 185 / 285;
const liquidSampleAspectRatio = 854 / 1228;

export const experiment6SidebarData = {
  experimentLabel: 'Experiment 06',
  title: "Experiment Information",
  safety: [
    "Keep enzyme reagents on ice throughout.",
    "Avoid repeated freeze–thaw cycles of reagents.",
    "Prevent DNA contamination during the procedure.",
  ],
  principle:
    "Restriction endonucleases recognize and cut specific DNA sequences. Double digestion uses two different enzymes to create specific ends and obtain the desired fragments. Electrophoresis checks fragment sizes to assess digestion.",
  questions: [
    {
      id: 1,
      question: "What is the main purpose of double digestion?",
      options: ["Obtain specific DNA fragments", "Increase the amount of DNA"],
      correctIndex: 0,
    },
    {
      id: 2,
      question: "What indicates successful digestion?",
      options: ["DNA bands of the expected sizes", "Complete disappearance of DNA"],
      correctIndex: 0,
    },
  ],
  instruments: [
    { id: 'water-bath', name: "Water Bath", englishName: 'Thermostatic Water Bath', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment4/ppt/water-bath.avif` },
    { id: 'microcentrifuge', name: "Microcentrifuge", englishName: 'Handheld Mini Centrifuge', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/image17.avif` },
    { id: 'power-supply', name: "Electrophoresis Power Supply", englishName: 'Electrophoresis Power Supply', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08251.avif` },
    { id: 'gel-comb', name: "Gel Comb", englishName: 'Gel Comb', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/08252.avif` },
    { id: 'chamber', name: "Electrophoresis Tank", englishName: 'Electrophoresis Chamber', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/08243.avif` },
    { id: 'gel-imager', name: "UV Gel Imaging System", englishName: 'UV Gel Imaging System', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/uvgelimagingsystem.avif` },
    { id: 'pipette', name: "Pipette", englishName: 'Pipette', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/image24.avif` },
    { id: 'pipette-tip', name: "Pipette Tips", englishName: 'Pipette Tip', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/08241.avif` },
    { id: 'silica-column', name: "Silica DNA Purification Column", englishName: 'DNA Purification Silica Column', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/08242.avif` },
  ],
  instrumentTrayOrder: [
    'water-bath',
    'microcentrifuge',
    'power-supply',
    'gel-comb',
    'chamber',
    'gel-imager',
    'pipette',
    'pipette-tip',
    'silica-column',
  ],
  reagents: [
    {
      id: 'bamhi', name: "BamHI restriction enzyme", englishName: 'Restriction Endonuclease BamHI', image: sampleTubeImage,
      labelOverlay: { color: '#581c87', shape: 'square', aspectRatio: sampleTubeAspectRatio },
    },
    {
      id: 'hindiii', name: "HindIII restriction enzyme", englishName: 'Restriction Endonuclease HindIII', image: sampleTubeImage,
      labelOverlay: { color: '#98FF98', shape: 'square', aspectRatio: sampleTubeAspectRatio },
    },
    {
      id: 'digestion-buffer', name: "10× double-digestion buffer", englishName: '10× Double Digestion Buffer', image: sampleTubeImage,
      labelOverlay: { color: '#0f766e', shape: 'square', aspectRatio: sampleTubeAspectRatio },
    },
    {
      id: 'sterile-water', name: "Sterile deionized water", englishName: 'Sterile Deionized Water (ddH₂O)', image: sampleTubeImage,
      labelOverlay: { color: '#f97316', shape: 'square', aspectRatio: sampleTubeAspectRatio },
    },
    { id: 'loading-buffer', name: "6× DNA loading buffer", englishName: '6×DNA Loading Buffer', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/082415.avif` },
    {
      id: 'pet28a', name: "pET-28a plasmid", englishName: 'pET-28a Plasmid', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/8171.avif`,
      labelOverlay: { color: '#1d4ed8', shape: 'circle', aspectRatio: liquidSampleAspectRatio },
    },
    { id: 'tae', name: "1× TAE electrophoresis buffer", englishName: '1×TAE Electrophoresis Buffer', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentcarboyblue.avif` },
    { id: 'agarose', name: "Agarose powder", englishName: 'Agarose Powder', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentbottlefilled.avif` },
    { id: 'gelred', name: "Nucleic acid gel stain", englishName: 'GelRed', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentbottleambercapped.avif` },
    { id: 'dl2000', name: "DL2000 DNA ladder", englishName: 'DL2000 DNA Marker', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/08251.avif` },
    {
      id: 'gfp-pcr', name: "GFP PCR product", englishName: 'GFP PCR Product', image: `https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment6/8171.avif`,
      labelOverlay: { color: '#ea580c', shape: 'circle', aspectRatio: liquidSampleAspectRatio },
    },
  ],
} satisfies ExperimentInfoSidebarData;
