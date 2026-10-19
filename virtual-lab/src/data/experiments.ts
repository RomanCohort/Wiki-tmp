import type { Experiment, LabItem } from '../types';

// ========== 实验1：大肠杆菌复苏与活化培养 ==========

// 实验1的器材 - 调整位置确保所有器材可见
export const experiment1Items: LabItem[] = [
  {
    id: 'freezer',
    name: "-80°C Freezer",
    nameEn: 'Ultra-low Temperature Freezer',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/freezer.avif',
    position: { x: 3, y: 10 },
    size: { width: 90, height: 120 },
    description: "Ultra-low temperature freezer for storing glycerol stocks"
  },
  {
    id: 'incubator',
    name: "Incubator",
    nameEn: 'Incubator',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/incubator.avif',
    position: { x: 85, y: 10 },
    size: { width: 90, height: 110 },
    description: "37°C incubator for bacterial culture"
  },
  {
    id: 'ice-box',
    name: "Ice Box",
    nameEn: 'Ice Box',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/ice-box.avif',
    position: { x: 15, y: 30 },
    size: { width: 70, height: 70 },
    description: "Keeps retrieved stocks cold and avoids repeated freeze–thaw cycles"
  },
  {
    id: 'alcohol-lamp',
    name: "Alcohol Lamp",
    nameEn: 'Alcohol Lamp',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/alcohol-lamp.avif',
    position: { x: 38, y: 35 },
    size: { width: 60, height: 75 },
    description: "Flame sterilization during aseptic work"
  },
  {
    id: 'tube',
    name: "Glycerol Stock Tube",
    nameEn: 'Glycerol Stock',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/tube.avif',
    position: { x: 22, y: 50 },
    size: { width: 30, height: 60 },
    description: "Storage tube containing an E. coli DH5α glycerol stock"
  },
  {
    id: 'inoculation-loop',
    name: "Inoculation Loop",
    nameEn: 'Inoculation Loop',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/inoculation-loop.avif',
    position: { x: 50, y: 45 },
    size: { width: 90, height: 30 },
    description: "Used to pick bacteria and streak agar plates"
  },
  {
    id: 'petri-dish',
    name: "LB Agar Plate",
    nameEn: 'LB Agar Plate',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/petri-dish.avif',
    position: { x: 68, y: 32 },
    size: { width: 75, height: 75 },
    description: "Petri dish containing solid LB medium"
  }
];

// 实验1：大肠杆菌复苏与活化培养
export const experiment1: Experiment = {
  id: 'exp1',
  title: "Experiment 1: Revival and Activation of E. coli DH5α (Introduction to Aseptic Technique)",
  titleEn: 'Resuscitation and Activation of E. coli DH5α',
  difficulty: 'easy',
  description: "Revive E. coli DH5α from a glycerol stock and streak it onto LB agar to practice aseptic handling, inoculation and incubation.",
  items: experiment1Items,
  steps: [
    {
      id: 1,
      title: "Retrieve Glycerol Stock",
      description: "Retrieve the DH5α glycerol stock from the -80°C freezer and immediately place it on ice. Avoid repeated freezing and thawing.",
      highlightItems: ['freezer', 'tube', 'ice-box'],
      animationType: 'move',
      completed: false
    },
    {
      id: 2,
      title: "Pick Bacteria",
      description: "Using aseptic technique beside the alcohol lamp, open the stock tube and gently pick a small amount of frozen bacteria with a sterile loop.",
      highlightItems: ['alcohol-lamp', 'tube', 'inoculation-loop'],
      animationType: 'move',
      completed: false
    },
    {
      id: 3,
      title: "Streak the Plate",
      description: "Immediately streak the plate; the glycerol stock does not need to thaw completely.",
      highlightItems: ['petri-dish', 'inoculation-loop'],
      animationType: 'streak',
      completed: false
    },
    {
      id: 4,
      title: "Flame the Loop",
      description: "Flame the inoculation loop until red-hot, then cool for a few seconds.",
      highlightItems: ['alcohol-lamp', 'inoculation-loop'],
      animationType: 'heat',
      completed: false
    },
    {
      id: 5,
      title: "Quadrant Streaking",
      description: "Use the four-quadrant streak method on LB agar. Apply bacteria to the first quadrant; flame and cool the loop before streaking each subsequent quadrant.",
      highlightItems: ['petri-dish', 'inoculation-loop'],
      animationType: 'streak',
      completed: false
    },
    {
      id: 6,
      title: "Incubate",
      description: "Place the inoculated plate upside down in the 37°C incubator.",
      highlightItems: ['petri-dish', 'incubator'],
      animationType: 'place',
      completed: false
    },
    {
      id: 7,
      title: "Observe Results",
      description: "Incubate for 14–18 h and observe colony growth.",
      highlightItems: ['incubator'],
      animationType: 'wait',
      completed: false
    }
  ],
  materials: [
    "E. coli DH5α glycerol stock (stored at -80°C)",
    "Sterile LB agar plates",
    "Alcohol Lamp",
    "Sterile inoculation loop / needle"
  ],
  reagents: [
    "LB agar: tryptone 10 g/L, yeast extract 5 g/L, NaCl 10 g/L, agar 15 g/L, deionized water to 1 L. Adjust pH to 7.0–7.4 and autoclave at 121°C for 20 min.",
    "75% ethanol (for bench and hand disinfection)",
    "Sterile distilled water (reserve)"
  ],
  equipment: [
    "Biosafety cabinet or aseptic workbench with an alcohol lamp",
    "Incubator (37°C)",
    "Ultra-low temperature freezer (-80°C)",
    "Micropipette (20–200 μL, optional)",
    "Disposable sterile pipette tips",
    "Lab coat and disposable gloves"
  ],
  results: "After incubation, well-separated colonies of similar size provide an active culture for subsequent experiments.",
  safety: [
    "Wear a lab coat and gloves throughout and follow aseptic technique.",
    "Prevent fires and ethanol spills when using the alcohol lamp.",
    "Treat tips, plates, loops and other materials that contact bacteria as biological waste; autoclave before disposal.",
    "Do not eat, drink or move unnecessarily in the laboratory; prevent microbial contamination."
  ]
};

// ========== 实验2：大肠杆菌菌落形态观察与革兰氏染色鉴定 ==========

// 实验2的器材
export const experiment2Items: LabItem[] = [
  {
    id: 'incubator',
    name: "Incubator",
    nameEn: 'Incubator',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/incubator.avif',
    position: { x: 55, y: 15 }, // 放在中间的蓝色桌子上
    size: { width: 60, height: 80 },
    description: "Temperature-controlled equipment for bacterial culture"
  },
  {
    id: 'microscope',
    name: "Light Microscope",
    nameEn: 'Optical Microscope',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/incubator.avif', // 暂时占位
    position: { x: 80, y: 15 }, // 放在右侧桌子上
    size: { width: 80, height: 80 },
    description: "Used to observe the morphology of stained bacteria"
  },
  {
    id: 'pipette',
    name: "Pipette",
    nameEn: 'Pipette',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/pipette.avif',
    position: { x: 15, y: 55 }, // 放在 Cleanbench 左侧
    size: { width: 35, height: 110 },
    description: "Used for precise liquid transfer"
  },
  {
    id: 'alcohol-lamp',
    name: "Alcohol Lamp",
    nameEn: 'Alcohol Lamp',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/alcohol-lamp.avif',
    position: { x: 48, y: 68 }, // 放在 Cleanbench 中间靠后
    size: { width: 55, height: 70 },
    description: "Used for heat fixation of smears"
  },
  {
    id: 'petri-dish',
    name: "LB Agar Plate",
    nameEn: 'LB Agar Plate',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/petri-dish.avif',
    position: { x: 35, y: 48 }, // 放在 Cleanbench 显眼位置
    size: { width: 90, height: 90 },
    description: "LB agar plate containing isolated colonies"
  },
  {
    id: 'stain-red',
    name: "Safranin solution",
    nameEn: 'Safranin',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/tube.avif',
    position: { x: 65, y: 65 },
    size: { width: 28, height: 55 },
    description: "Gram stain counterstain"
  },
  {
    id: 'stain-clear',
    name: "Destaining solution",
    nameEn: 'Decolorizer',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/tube.avif',
    position: { x: 70, y: 65 },
    size: { width: 28, height: 55 },
    description: "95% ethanol or an acetone–ethanol mixture"
  },
  {
    id: 'stain-brown',
    name: "Iodine solution",
    nameEn: 'Iodine',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/tube.avif',
    position: { x: 75, y: 65 },
    size: { width: 28, height: 55 },
    description: "Gram stain mordant"
  },
  {
    id: 'stain-purple',
    name: "Crystal violet",
    nameEn: 'Crystal Violet',
    image: 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/tube.avif',
    position: { x: 80, y: 65 },
    size: { width: 28, height: 55 },
    description: "Gram stain primary stain"
  }
];

// 实验2：大肠杆菌菌落形态观察与革兰氏染色鉴定
export const experiment2: Experiment = {
  id: 'exp2',
  title: "Experiment 2: E. coli Colony Morphology and Gram Staining",
  titleEn: 'Colony Morphology and Gram Staining',
  difficulty: 'easy',
  description: "Observe activated E. coli colonies and use Gram staining and microscopy to check characteristic features.",
  items: experiment2Items,
  steps: [
    {
      id: 1,
      title: "Retrieve Culture Plate",
      description: "Remove the cultured E. coli plate from the incubator and place it in the laminar flow cabinet.",
      highlightItems: ['incubator', 'petri-dish'],
      animationType: 'move',
      completed: false
    },
    {
      id: 2,
      title: "Observe Colony Morphology",
      description: "Observe colony size, shape, color, edges, surface and transparency with the naked eye.",
      highlightItems: ['petri-dish'],
      animationType: 'move',
      completed: false
    },
    {
      id: 3,
      title: "Prepare a Smear",
      description: "Add saline to a slide, pick a small amount of bacteria and prepare a smear. Air-dry, then heat-fix.",
      highlightItems: ['petri-dish', 'pipette'],
      animationType: 'move',
      completed: false
    },
    {
      id: 4,
      title: "Primary Stain",
      description: "Cover the fixed smear with crystal violet for 1 min, rinse with water and shake off excess water.",
      highlightItems: ['stain-purple'],
      animationType: 'move',
      completed: false
    },
    {
      id: 5,
      title: "Iodine Mordant",
      description: "Cover the smear with iodine for 1 min, rinse with water and shake off excess water.",
      highlightItems: ['stain-brown'],
      animationType: 'move',
      completed: false
    },
    {
      id: 6,
      title: "Ethanol decolorization",
      description: "Decolorize with ethanol for about 30 s. When the runoff is nearly colorless, immediately rinse and shake off excess water.",
      highlightItems: ['stain-clear'],
      animationType: 'move',
      completed: false
    },
    {
      id: 7,
      title: "Counterstain",
      description: "Cover the smear with basic fuchsin for 45 s, rinse with water and shake off excess water.",
      highlightItems: ['stain-red'],
      animationType: 'move',
      completed: false
    },
    {
      id: 8,
      title: "Microscopic Observation",
      description: "Allow the slide to air-dry, add cedarwood oil and observe cell morphology and staining with the oil-immersion objective.",
      highlightItems: ['microscope'],
      animationType: 'wait',
      completed: false
    }
  ],
  materials: [
    "E. coli DH5α colony obtained in Experiment 1",
    "Clean microscope slides",
    "Absorbent paper"
  ],
  reagents: [
    "Crystal violet solution (0.5% w/v)",
    "Gram iodine solution",
    "Decolorizer: acetone/ethanol (50:50 v/v)",
    "Safranin or basic fuchsin counterstain",
    "Sterile saline (0.85% NaCl)"
  ],
  equipment: [
    "Light microscope (100× oil-immersion objective)",
    "Alcohol Lamp",
    "Inoculation Loop",
    "Forceps",
    "Microscope slides and coverslips",
    "Lab coat and disposable gloves"
  ],
  results: "Short red rods indicate Gram-negative bacteria, consistent with the typical morphology of E. coli.",
  safety: [
    "Avoid overheating during fixation to preserve cell morphology.",
    "Avoid stain contact with skin and clothing.",
    "Clean the oil-immersion lens promptly after use.",
    "Dispose of used slides and inoculation tools as biological waste."
  ]
};

// 所有实验列表
export const allExperiments: Experiment[] = [
  experiment1,
  experiment2,
  {
    id: 'exp3',
    title: "Experiment 3: pET-28a Plasmid Miniprep and Agarose Gel Electrophoresis",
    titleEn: 'Plasmid Extraction and Gel Electrophoresis',
    difficulty: 'easy',
    description: "Extract the pET-28a plasmid from E. coli and examine it by agarose gel electrophoresis.",
    items: [],
    steps: []
  },
  {
    id: 'exp4',
    title: "Experiment 4: Gel Extraction of the GFP Gene Fragment",
    titleEn: 'GFP Gene Fragment Gel Extraction',
    difficulty: 'easy',
    description: "Recover the GFP gene fragment from an agarose gel.",
    items: [],
    steps: []
  },
  {
    id: 'exp5',
    title: "Experiment 5: GFP PCR Amplification and Agarose Gel Verification",
    titleEn: 'GFP Gene PCR Amplification and Electrophoresis',
    difficulty: 'medium',
    description: "Amplify GFP by PCR and verify a clear band at 720 bp by agarose gel electrophoresis.",
    items: [],
    steps: [
      { id: 1, title: "Add Buffer and dNTPs", description: "Add 2.5 μL buffer and 0.5 μL dNTP mix to a 0.2 mL PCR tube. Click the pipette to aspirate, dispense at the tube opening, then change the tip.", highlightItems: ['pipette'], animationType: 'move', completed: false },
      { id: 2, title: "Add Primers", description: "Add 1 μL each of the forward and reverse primers, changing tips between additions. Gently flick the tube to mix.", highlightItems: ['pipette'], animationType: 'move', completed: false },
      { id: 3, title: "Add Template and Enzyme", description: "Add 1 μL template DNA and 0.2 μL Taq, then add sterile water to a total volume of 25 μL.", highlightItems: ['pipette'], animationType: 'move', completed: false },
      { id: 4, title: "Brief Centrifugation", description: "Place the PCR tube in the benchtop centrifuge with a balancing tube opposite it. Close the lid and briefly spin to collect the liquid. Transfer the tube to the thermal cycler.", highlightItems: ['centrifuge'], animationType: 'move', completed: false },
      { id: 5, title: "PCR Amplification", description: "Set the thermal cycler: 94°C for 3 min; 30 cycles of 94°C denaturation, 55–60°C annealing and 72°C extension; 72°C for 5 min; hold at 4°C. Click Run.", highlightItems: ['pcr-machine'], animationType: 'wait', completed: false },
      { id: 6, title: "Prepare Agarose", description: "Weigh 1 g agarose into a flask. Measure and add 100 mL TAE, then microwave for 1–2 min until clear.", highlightItems: ['microwave'], animationType: 'heat', completed: false },
      { id: 7, title: "Cool and Add Stain", description: "Cool the flask to approximately 60°C, add 3 μL GelRed with a pipette and gently swirl. The solution turns pink.", highlightItems: ['pipette'], animationType: 'move', completed: false },
      { id: 8, title: "Cast the Gel", description: "Insert the comb into the casting tray, pour in the pink agarose and leave at room temperature for 30 min to set.", highlightItems: ['gel-tray'], animationType: 'place', completed: false },
      { id: 9, title: "Remove Comb and Transfer", description: "Pull the comb vertically to expose the wells. Transfer the gel into the electrophoresis tank and add TAE buffer to cover it.", highlightItems: ['gel-comb'], animationType: 'move', completed: false },
      { id: 10, title: "Mix the Sample", description: "In a new 0.2 mL PCR tube, mix 5 μL PCR product with 1 μL loading buffer by pipetting.", highlightItems: ['pipette'], animationType: 'move', completed: false },
      { id: 11, title: "Load and Run", description: "Load vertically into a gel well and add a DNA ladder to an adjacent well. Close the tank, connect the power and run at 120 V for 25 min.", highlightItems: ['pipette'], animationType: 'move', completed: false },
      { id: 12, title: "UV Observation", description: "Transfer the gel to the UV imager with forceps, close the door and turn on UV. Observe a clear band at 720 bp.", highlightItems: ['uv-imager'], animationType: 'wait', completed: false }
    ]
  },
  {
    id: 'exp6',
    title: "Experiment 6: Double Digestion of pET-28a and GFP",
    titleEn: 'Double Digestion of Plasmid and GFP',
    difficulty: 'medium',
    description: "Perform double restriction digestion of the pET-28a plasmid and GFP fragment.",
    items: [],
    steps: []
  },
  {
    id: 'exp7',
    title: "Experiment 7: Ligation of the Digested Vector and GFP Fragment",
    titleEn: 'Ligation of Vector and GFP Fragment',
    difficulty: 'medium',
    description: "Ligate the digested vector and GFP fragment.",
    items: [],
    steps: []
  },
  {
    id: 'exp8',
    title: "Experiment 8: E. coli Competent Cell Preparation and Plasmid Transformation",
    titleEn: 'Competent Cell Preparation and Transformation',
    difficulty: 'hard',
    description: "Prepare competent E. coli cells and transform them with the recombinant plasmid.",
    items: [],
    steps: []
  },
  {
    id: 'exp9',
    title: "Experiment 9: Colony PCR, GFP Fluorescence and Protein Expression",
    titleEn: 'Positive Clone Verification and GFP Expression',
    difficulty: 'hard',
    description: "Identify positive clones by PCR, observe GFP fluorescence and verify protein expression.",
    items: [],
    steps: []
  }
];

// 信息面板内容
export const infoContent = {
  principle: {
    title: "Experimental Principle",
    content: `## Glycerol Stock Revival
Glycerol is a cryoprotectant that reduces freezing damage. Place stocks from the -80°C freezer on ice immediately and avoid repeated freeze–thaw cycles.

## Plate Streaking
Successive streaking dilutes the inoculum to separate individual cells and obtain isolated colonies. Quadrant streaking provides a pure culture.

## Aseptic Technique
1. Work beside the alcohol lamp flame.
2. Flame-sterilize inoculation tools.
3. Work promptly to reduce contamination.`
  },
  instruments: {
    title: "Laboratory Equipment",
    content: `## Main Equipment
- **-80°C freezer**: long-term glycerol stock storage
- **Incubator**: bacterial culture at 37°C
- **Laminar flow cabinet**: aseptic working area
- **Alcohol lamp**: flame sterilization
- **Inoculation loop**: bacterial picking and transfer`
  },
  reagents: {
    title: "Laboratory Reagents",
    content: `## Main Reagents
- **DH5α glycerol stock**: E. coli DH5α cells
- **LB agar**: nutrients for bacterial growth
  - Tryptone: 10 g/L
  - Yeast extract: 5 g/L
  - NaCl: 10 g/L
  - Agar: 15 g/L
- **Glycerol**: cryoprotectant (15–20%)`
  }
};
