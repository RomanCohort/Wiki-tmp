import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";
import { visualDesignFigures } from "./visualDesignAssets";

/**
 * Visual Design page structured content.
 *
 * Provenance: 文案集/project/art/Visual Design.md
 *
 * Bridges authentic visual brand aesthetics with front-end engineering rigor.
 * Figures are delivered via the official iGEM static CDN in next-generation AVIF format.
 */

export const visualDesignPage: WikiPageContent = {
  route: "/visual-design",
  category: "project",
  chapter: "Project / 05 of 07",
  eyebrow: "Visual Design & Wiki Engineering",
  title: "Visual Design",
  lede: "CirCure's visual identity, cross-module color systems, interactive physics, and decoupled web engineering architecture.",
  boundary:
    "Design specifications, visual system principles, interactive physics models, and engineering infrastructure developed for the CirCure project.",
  visual: "resource-library",
  visualLabel: "CirCure visual design and illustration system",
  visualSteps: ["identity", "palette", "interactive", "architecture", "interfaces", "modules", "games"],
  facts: [
    { label: "Assets", value: "35 high-resolution AVIF artworks." },
    { label: "Palette", value: "Five bespoke cross-module color themes." },
    { label: "Interactivity", value: "Physics-based adaptive Lumi mascot cursor." },
    { label: "Architecture", value: "Strict 4-layer decoupled TypeScript pipeline." },
  ],
  sections: [
    {
      id: "brand-identity",
      index: "01",
      kicker: "01 / Brand Identity",
      navLabel: "Brand Identity",
      title: "Brand Identity",
      summary:
        "Visual symbols grounding our synthetic biology research in clinical oncology, patient hope, and rigorous engineering.",
      blocks: [
        {
          type: "subheading",
          id: "project-logo",
          index: "1.1",
          title: "Project Logo",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The **project logo** takes its outer ring from the **closed-loop structure of circRNA**, the molecule at the core of our vaccine design. The continuous circle represents both the **stability of circRNA** and the ongoing cycle of research and life. At the center, a **woman’s profile wears a pink ribbon**, the international symbol of breast cancer awareness, bringing human warmth to an otherwise technical subject. **Olive branches** on both sides stand for **recovery and hope**. The logo brings together **scientific rigor, patient care and hope**, the three ideas our project is built on.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.projectLogo,
        },
        {
          type: "subheading",
          id: "team-logo",
          index: "1.2",
          title: "Team Logo",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The **team logo** centers on the main building of the **First Bethune Hospital of Jilin University**, grounding our work in its clinical setting and its mission to save lives. The rooftop merges the number “1” with the letters “FBH”, the hospital’s initials, expressing our aim to excel at the **interface of medicine and engineering**. A portrait of **Norman Bethune** reminds us to put patients first. A **DNA double helix** on the left stands for synthetic biology and the **interlocking gears** on the right for engineering; together they show how the two disciplines reinforce each other. The team name **“JLU-FBH”** anchors the base. As a whole, the logo states our commitment: to solve medical problems with synthetic biology, carrying the hospital’s legacy forward while pushing into new territory.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.teamLogo,
        },
        {
          type: "subheading",
          id: "team-flag",
          index: "1.3",
          title: "Team Flag",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The **team flag** uses a **pale pink ground**: gentle and approachable, and at the same time a statement of resolve in the fight against breast cancer. The **team logo** sits on the left and the **mascot** on the right, presenting our identity from two sides. The result is composed but not solemn, and carries a quiet optimism.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.teamFlag,
        },
        {
          type: "subheading",
          id: "lumi-mascot",
          index: "1.4",
          title: "Lumi, Our Mascot",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "She is **Lumi**, the mascot of our TNBC vaccine project. Her **soft fleece** stands for the warmth, delicacy and vitality of breast tissue, and her **rounded silhouette** is drawn from the structure of the mammary gland, giving her the feel of a guardian. The **pink petals blooming on her head** take their shape from the breast and represent life in bloom, women’s health and hope; the stamens at the flower’s center stand for scientific innovation and the steady development of new strategies against cancer. **Dark spots on her legs** mark the abnormal changes of cancerous cells, a reminder to pay attention to breast health, early screening and diagnosis. The **pink ribbon across her chest** is the internationally recognized breast cancer awareness symbol, standing for unity, compassion and determination. Lumi is more than a charming lamb: with **vaccine technology as her shield and immunity as her sword**, she stands beside patients and researchers in the fight against TNBC, working to give more lives another chance to bloom.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.lumiThreeView,
        },
        {
          type: "figure",
          ...visualDesignFigures.lumiCircle,
        },
      ],
    },
    {
      id: "color-system",
      index: "02",
      kicker: "02 / Color System",
      navLabel: "Color System",
      title: "Cross-Module Palette Architecture",
      summary:
        "Bespoke double-ink hierarchies and watercolor base surfaces anchoring five distinctive research dimensions.",
      blocks: [
        {
          type: "subheading",
          id: "palette-philosophy",
          index: "2.1",
          title: "Design Rationale & Hierarchy",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "Color is not merely decorative across the CirCure wiki; it acts as an **emotional compass and a cognitive scaffold** across five research dimensions. Rather than imposing a single monotonous corporate hue, we architected a bespoke **double-ink typography hierarchy (H2 deep ink + H3 warm accent ink)** and **soft parchment foundations** for each module.",
            "Each module's chromatic identity is deliberately rooted in the biological and human narrative of its work. **Project** embraces **Leaf Green and Moss Forest**, evoking cellular vitality, regenerative growth, and the hope of cancer remission. **Wet Lab** draws upon **Ice Blue and Marine Navy**, reflecting aqueous buffers, benchtop precision, and the sterile clarity of molecular assays. In contrast, **Dry Lab** is guided by **Mint Green and Pine Slate**, embodying algorithmic lucidity, data matrices, and computational RNA biophysics.",
            "Moving from bench to society, **Engagement** radiates with **Warm Ochre and Coffee Brown**, expressing empathy, open dialogue, and human warmth across patient interviews and public education. Finally, **Team** is anchored in **Bronze Gold and Burgundy**, celebrating academic camaraderie, institutional heritage, and the humanitarian medical legacy of Norman Bethune and the First Bethune Hospital.",
            "This cross-hue contract preserves **strict WCAG AAA contrast compliance** for long-form reading while giving each section a recognizable, immersive identity as the reader navigates through our scientific journey.",
          ],
        },
        {
          type: "feature",
          key: "palette-swatches",
        },
      ],
    },
    {
      id: "interactive-experience",
      index: "03",
      kicker: "03 / Interactive Aesthetics",
      navLabel: "Interactive UX",
      title: "Interactive Aesthetics & Motion",
      summary:
        "Physics-based pointer interactions, procedural watercolor rendering, and hardware-accelerated biomolecular visualization.",
      blocks: [
        {
          type: "subheading",
          id: "adaptive-cursor",
          index: "3.1",
          title: "Adaptive Mascot Cursor: Lumi in Motion",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "To bridge the gap between serious clinical oncology and an engaging digital experience, our mascot **Lumi travels with the reader as an interactive mouse cursor**. Built upon fine pointer physics, Lumi dynamically reflects both reader actions and the surrounding page atmosphere.",
            "Under standard navigation, Lumi runs beside the cursor in an **alert resting state**. The moment the pointer glides over any interactive anchor, button, or disclosure, Lumi seamlessly winks into a **joyful hover state** accompanied by a delicate **glass specular sheen (`GlassSheen`)**.",
            "When clicked, Lumi undergoes **inertia spring recoil**, triggering twin circular ripples and emitting an explosive burst of **18 spark particles**. Remarkably, these sparkles do not use hardcoded colors: our dynamic color resolver (`resolveSparkPalette`) reads the active module's heading inks in real time, causing sparks to bloom in **Forest Green on Project, Marine Navy on Wet Lab, and Warm Ochre on Engagement**.",
          ],
        },
        {
          type: "feature",
          key: "lumi-cursor-showcase",
        },
        {
          type: "subheading",
          id: "watercolor-engine",
          index: "3.2",
          title: "Watercolor Components & Wash Aesthetics",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "Biomedical websites often suffer from cold, clinical sterility—rigid rectangular cards, harsh drop shadows, and synthetic neon gradients. In contrast, CirCure adopts an **oriental ink-and-wash aesthetic**, translating traditional watercolor bleeding into **procedural SVG components**.",
            "Our custom **`WatercolorCircle` component** discards uniform borders in favor of organic, breathing contours. By coupling radial transparency gradients with procedural SVG filters (**`<feTurbulence>` for fractal paper fiber noise** and **`<feDisplacementMap>` for liquid edge dispersion**), each disc renders as if hand-brushed onto wet rice paper.",
            "We deploy this organic visual language across two central communication structures: the **Tripartite Venn Architecture (Why, What, How)** and the **Five-Node Problem-Solution Orbit** encircling the core circular RNA platform.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.watercolorVenn,
        },
        {
          type: "figure",
          ...visualDesignFigures.watercolorOrbit,
        },
        {
          type: "subheading",
          id: "molecular-motion-engine",
          index: "3.3",
          title: "Open-Source Visualization: Mol* & GSAP",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "Scientific visualization is elevated through industry-grade open-source libraries. In our Wet Lab and Modeling pages, **Mol* provides real-time 3D biomolecular structure inspection**, allowing judges to rotate circular RNA constructs, evaluate binding pockets, and examine Trop-2 antigen-antibody docking interfaces.",
            "Page transitions and figure entrances utilize **hardware-accelerated GSAP timelines and ScrollTrigger**. Subtle reveal triggers (**`data-wiki-reveal`**) ensure illustrations and data tables gently surface as the reader scrolls, avoiding repetitive distraction and maintaining an uninterrupted reading cadence.",
          ],
        },
      ],
    },
    {
      id: "engineering-rigor",
      index: "04",
      kicker: "04 / Engineering Rigor",
      navLabel: "Web Architecture",
      title: "Decoupled Web Engineering Architecture",
      summary:
        "A four-layer clean engineering pipeline ensuring strict data decoupling, academic attribution, and next-generation media delivery.",
      blocks: [
        {
          type: "subheading",
          id: "four-layer-pipeline",
          index: "4.1",
          title: "Four-Layer Decoupling Pipeline",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "A world-class visual design requires an equally rigorous engineering architecture. Following our **golden engineering paradigm**, the CirCure wiki enforces a strict **four-layer separation of concerns**: separating raw manuscript sources, pure TypeScript data models, decoupled asset/panel sockets, and ultra-thin route assemblers.",
            "This architecture guarantees that **scientific research copy is preserved 100% verbatim** without presentation drift, while preventing code bloating and layout-entangled debt.",
          ],
        },
        {
          type: "feature",
          key: "architecture-flowchart",
        },
        {
          type: "subheading",
          id: "citation-delivery",
          index: "4.2",
          title: "Academic Citations & Resilient Media Delivery",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "Honoring scientific attribution, our citation architecture provides an academic reading experience inspired by premier journals. Hovering over any in-text citation marker (**`[1]`, `[2]`**) immediately summons an **interactive preview card** displaying authors, title, journal, volume, and year. Clicking the marker initiates smooth inertial scrolling directly to the bibliography with a glowing pulse, while **backlink pills** allow readers to jump effortlessly back to the exact paragraph where the paper was referenced.",
            "To guarantee rapid global loading for iGEM judges, all visual artworks are delivered via the official iGEM static CDN in **next-generation AVIF format**, saving over 60% bandwidth. Coupled with automated **200 OK link health probing** and **pure CSS dynamic figure counter badges (`[FIG. XX]`)**, the wiki achieves absolute link integrity and pristine visual fidelity.",
          ],
        },
      ],
    },
    {
      id: "core-interfaces",
      index: "05",
      kicker: "05 / Core Interfaces",
      navLabel: "Core Interfaces",
      title: "Core Interfaces & Narrative Experience",
      summary:
        "Translating clinical dilemmas into accessible storytelling through watercolor tones and metaphor.",
      blocks: [
        {
          type: "subheading",
          id: "loading-screen",
          index: "5.1",
          title: "Loading Screen",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "Our mascot sits at the center of the frame, held by a **pair of cupped hands**, an image of **life being protected**. Behind her, the pink ribbon, the global symbol of breast cancer awareness, is paired with soft floral elements that echo the theme of our outreach on breast cancer. Painted in **warm watercolor**, the illustration creates a calm, healing atmosphere. It uses a few seconds of waiting time to say what our project is about: **care for people, and science explained gently**.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.loading,
        },
        {
          type: "subheading",
          id: "home-interface",
          index: "5.2",
          title: "Home Interface",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "This interface opens the project story through the eyes of a medical student. **Ward scenes and doctor-patient conversations** are drawn in soft watercolor with calm blue-purple tones, turning hard clinical facts into something a reader can follow as a story. It begins with the question patients ask after treatment — **“What if it comes back?”** — and uses it to name the two clinical pain points of TNBC: **the absence of clear targets and a high risk of recurrence**. Thought bubbles then carry the reader from the problem to our solution, a cancer vaccine built on the **circRNA platform**. Its mechanism is explained with a single metaphor, **changing a key**, which shows how antigens can be swapped in a modular, plug-and-play way. The narrative closes by extending the platform from TNBC to other solid tumors: a therapy that evolves alongside the tumor.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.homeP1,
        },
      ],
    },
    {
      id: "subpage-illustrations",
      index: "06",
      kicker: "06 / Subpage Illustrations",
      navLabel: "Subpage System",
      title: "Wiki Subpage Illustration System",
      summary:
        "A cohesive visual language tailored to each module—from laboratory adventures to community dialogues.",
      blocks: [
        {
          type: "subheading",
          id: "team-subpages",
          index: "6.1",
          title: "Team Subpages",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The **team cover turns a serving plate into a Petri dish**, the same round form that carries our project logo and the circRNA backbone, so the page opens in the visual language used across the wiki. Arranged on the plate are our members: **students and clinicians from medicine, biology, engineering and design**, plated the way a dish is composed, each element distinct and none of them interchangeable. The metaphor is deliberate. A culture is what lets anything grow, and this team is the culture CirCure grew in. Warm tones and soft shading keep the gentle, welcoming mood of the series, while the act of serving carries a second meaning for a team based in a hospital: **the science here is prepared for someone, and handed to them**.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.teamActivities,
        },
        {
          type: "figure",
          ...visualDesignFigures.teamRoster,
        },
        {
          type: "figure",
          ...visualDesignFigures.teamAttribution,
        },
        {
          type: "subheading",
          id: "project-subpages",
          index: "6.2",
          title: "Project Subpages",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The **Project subpage adopts a bright, cheerful, nature-inspired cartoon style** in lime green, pale yellow, cream and soft olive. The atmosphere is lively and optimistic, echoing the curiosity and inventive spirit of the research itself. **Layered green mountains, rolling hills, clouds and a warm sun** build a playful landscape that gives the page a strong identity. A bold rounded title in cream with a dark green outline sits at the center: easy to read at a glance, and friendly rather than formal. Sunbeams radiate from the upper background and lead the eye inward, adding a sense of energy and discovery. Simplified trees, small flowers, winding paths and light decorative patterns fill the surroundings with depth while keeping the scene uncluttered. Flat colors, soft curves, exaggerated shapes and minimal shading hold the illustration together and match the project’s wider visual language. Unlike a conventional scientific interface, this page leans on storytelling and immersion, turning the Project page into a welcoming place to explore the motivation, background, objectives, experimental design and expected outcomes of the work. The open space around the title also leaves room for navigation, an introduction and project illustrations. Combining natural scenery, a clean layout and playful typography, the subpage becomes an inviting entry point to our project and encourages visitors to follow the ideas and the journey behind it.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.projectArt,
        },
        {
          type: "figure",
          ...visualDesignFigures.projectSafety,
        },
        {
          type: "figure",
          ...visualDesignFigures.projectEngineering,
        },
        {
          type: "figure",
          ...visualDesignFigures.projectContributions,
        },
        {
          type: "figure",
          ...visualDesignFigures.projectNotebook,
        },
        {
          type: "figure",
          ...visualDesignFigures.projectResults,
        },
        {
          type: "subheading",
          id: "wet-lab-subpages",
          index: "6.3",
          title: "Wet Lab Subpages",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The **Wet Lab subpage is built on a warm, friendly flat-illustration style** that sets aside the cold, rigid image people usually associate with a laboratory. Cream, light sky blue and warm orange dominate, with rounded hand-drawn lines and a pale wavy cloud background creating a relaxed, explorative mood. Core wet-lab elements are scattered across the scene as small characters: flagellated bacteria, cells of different shapes and swimming amoebas on one side, Erlenmeyer flasks, test tubes, pipettes, Petri dishes and molecular models on the other. Bubbles, hearts and “!?” marks add motion and a touch of humour. The composition is circular and leaves a large open area, so the rounded “Wet Lab” title and the “JLU” signature read immediately; the enclosing shape also recalls a Petri dish. The page is meant to convey **iGEM’s spirit of happy science** — every pipetting, culture and observation as a small colorful adventure — and its approachability helps close the gap between the public and synthetic biology.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.wetAlternativePlatform,
        },
        {
          type: "figure",
          ...visualDesignFigures.wetDesign,
        },
        {
          type: "figure",
          ...visualDesignFigures.wetMeasurement,
        },
        {
          type: "figure",
          ...visualDesignFigures.wetExperiments,
        },
        {
          type: "subheading",
          id: "dry-lab-subpages",
          index: "6.4",
          title: "Dry Lab Subpages",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "The **Dry Lab subpage uses a fresh, soft and slightly playful cartoon style** with a quiet technological undertone. Mint green, light cyan, cream and white form the palette, giving a friendly feel that still reads as biotechnology. A computer monitor sits at the center of the composition, standing for what the Dry Lab actually does: **working with experimental data, mathematical modeling, computational simulation and theoretical analysis**. Its rounded edges, clean geometry, subtle highlights and diagonal accents add depth without cluttering the page. Cells, microorganisms and molecular networks drift across the background at different scales and transparencies, adding depth while staying behind the content. Cartoon microorganisms on both sides of the screen carry speech bubbles and arrows that hint at interaction and make abstract modeling concepts easier to grasp. Rounded shapes, smooth curves and flat areas of color are used throughout, with sharp edges, heavy textures and strong lighting kept to a minimum so the page stays consistent. The central area holds the section’s theme, research goals and navigation, while the surrounding illustrations act as visual cues; the layout also leaves room for models, simulations, algorithm analyses and data visualizations. Balancing rigor and innovation with creativity and approachability, the design gives our Dry Lab work a recognizable identity and invites visitors to explore it in an intuitive way.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.dryModel,
        },
        {
          type: "figure",
          ...visualDesignFigures.drySoftware,
        },
        {
          type: "figure",
          ...visualDesignFigures.dryHardware,
        },
        {
          type: "subheading",
          id: "engagement-subpages",
          index: "6.5",
          title: "Engagement Subpages",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "This interface continues the **warm, reassuring flat-illustration style** of the series, in cream, warm orange and coral red. A radiating composition draws the eye inward to the large **“Engagement”** title at the center: light beams spread outward while speech bubbles, a chain of figures passing hearts along, and a pair of cupped hands circle around it. The beams stand for the energy and reach that public participation brings, and the cupped hands repeat a motif from the rest of the series, here lifting scientific knowledge and handing it to the public. Inside the rounded speech bubbles, faint silhouettes of people of different ages and professions suggest a team that listens to many voices rather than speaking alone. Our mascot appears with a megaphone, or high-fiving a passer-by, which keeps the tone light. Gears, magnifying glasses and puzzle pieces are scattered through the scene as a reminder that **public participation actively drives a synthetic biology project forward**. Generous white space around the bold, rounded title keeps the focus clear while the surrounding figures give the page a sense of activity from all sides. The design carries a simple claim: **science should not be an island, but a conversation open to everyone**.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.engagementEntrepreneurship,
        },
        {
          type: "figure",
          ...visualDesignFigures.engagementHumanPractice,
        },
        {
          type: "figure",
          ...visualDesignFigures.engagementSustainability,
        },
        {
          type: "figure",
          ...visualDesignFigures.engagementInclusivity,
        },
        {
          type: "subheading",
          id: "sustainability-artwork",
          index: "6.6",
          title: "Sustainability Section",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "This illustration was created for the **Sustainability section**. It depicts an **ideal community where research, public education and everyday life coexist**, with several **UN Sustainable Development Goals (SDGs)** embedded in the buildings and street scenes. The buildings, market stalls, river and passers-by correspond to specific goals: **good health and well-being, industry and innovation, quality education, responsible consumption and others**. Our mascot stands in the central square, tying the scene together. Rendered in a soft, warm style, the artwork places synthetic biology inside a modern urban community and gives visual form to our position that **innovation has to stay people-centered and sustainable** if it is to leave a lasting social impact.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.sustainability,
        },
      ],
    },
    {
      id: "educational-games",
      index: "07",
      kicker: "07 / Educational Games",
      navLabel: "Educational Games",
      title: "Educational Games & Hands-On Experience",
      summary:
        "Transforming abstract molecular biology concepts into tangible board games and interactive lab environments.",
      blocks: [
        {
          type: "subheading",
          id: "bio-memory-match",
          index: "7.1",
          title: "Bio Memory Match",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "**Bio Memory Match**. This is the cover illustration of our educational board game, Bio Memory Match. Our mascot holds a magnifying glass, a nod to the game’s spirit of exploration, against a lush jungle that frames biology as something to be discovered in the living world. The three cards in the scene, **DNA, enzymes and antibodies**, mirror the actual game content and carry the core biology of our project into the artwork. Molecular concepts that are usually abstract are redrawn here as something a child can hold and play with.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.bioMemoryMatch,
        },
        {
          type: "subheading",
          id: "virtual-lab",
          index: "7.2",
          title: "Virtual Lab",
          level: 3,
        },
        {
          type: "prose",
          paragraphs: [
            "**Virtual Lab**. This illustration is the cover of our Virtual Lab game. It reconstructs a working biology laboratory, with microscopes, test tubes, flasks, laptops and everyday lab supplies; chemical structures and Petri-dish diagrams on the screens enrich the molecular biology setting. Soft lavender tones and a simple cartoon style take the edge off the seriousness of research and shorten the distance between the audience and our project, inviting players into the hands-on experience the game is built around.",
          ],
        },
        {
          type: "figure",
          ...visualDesignFigures.virtualLab,
        },
      ],
    },
  ],
  links: [
    { path: "/description", label: "Project Narrative" },
    { path: "/games", label: "Interactive Experience" },
    { path: "/contribution", label: "Scientific Contributions" },
    { path: "/notebook", label: "Laboratory Notebook" },
  ],
  next: {
    path: "/notebook",
    label: "Notebook",
    title: "Every Polished Result Has a Day-One Entry",
    description: "Behind elegant diagrams and clean layouts lie months of benchside persistence. Trace our raw daily logs, protocol adjustments, and troubleshooting chronicles.",
  },
};
