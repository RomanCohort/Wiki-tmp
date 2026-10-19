import type { WikiSection } from "../../components/wiki/wikiPageTypes";

import { educationAssetUrl, replaceEducationAssetLinks } from "./educationRemoteAssets";

// Generated from education-source.md by scripts/import-education.py.
const rawSections: WikiSection[] = [
  {
    "id": "overview",
    "index": "1",
    "kicker": "Education",
    "title": "Overview",
    "summary": "",
    "masthead": {
      "quote": "Education, therefore, is a process of living and not a preparation for future living.",
      "attribution": "John Dewey",
      "attributionRole": "My Pedagogic Creed, 1897"
    },
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "Synthetic biology education does not address a single, homogeneous “public.” Different people may face different barriers arising from gaps in prior knowledge, perceptions of risk, access to resources, lived experiences, or opportunities for participation. We therefore began with a simple conviction: Different barriers require different educational responses."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Throughout the year, we brought Education into classrooms, laboratory settings, public spaces, creative and narrative environments, and digital platforms. Our practices included classroom teaching, public health education, laboratory learning, games, medical humanities, and sustained digital engagement. Rather than expecting everyone to learn in the same way, we sought to create different entry points for people of different ages, backgrounds, and circumstances."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our approach began with understanding the people we hoped to reach and the contexts in which they learn. These encounters guided us in choosing educational approaches, preserving meaningful experiences and relationships, and adapting our designs to real-world constraints. As participants asked questions, made choices, and engaged with our resources, their responses also informed how our Education could continue to develop."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The figure below illustrates the overall relationships within our Education work throughout the year. Different learning contexts provide learners with different points of entry. Throughout the learning process, connection and support, dialogue and co-creation, exploration and practice, and reflection interact with one another. Knowledge, skills, attitudes, community participation, and further real-world action represent different dimensions of educational outcomes."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/education-overview-map.png",
        "width": 1536,
        "height": 1024,
        "alt": "Education overview map"
      },
      {
        "type": "prose",
        "paragraphs": [
          "At the same time, supporting conditions—including resources, safety, accessibility, and relationships—along with continuous feedback, remain present throughout the process, allowing Education to evolve in response to how it is actually experienced and used."
        ]
      }
    ]
  },
  {
    "id": "education-framework",
    "index": "2",
    "kicker": "Education",
    "title": "Education Framework",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "**Who are we designing for?**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**What should we preserve as Education expands?**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**How can we respond within real-world constraints?**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Together, these questions reflect a central conviction: **Doing more does not necessarily mean educating better.**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Effective education depends on understanding learners and their contexts, preserving the experiences and relationships that matter to them, and choosing approaches that can genuinely work in practice."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We address these questions through three connected design considerations. **Recursive Care** guides what should be preserved as Education expands. **Community & Educational Functions** helps us understand learners through Audience × Context and identify the learning functions most relevant to each setting. **Education Portfolio Optimization** brings these needs together with available resources and essential requirements to select an appropriate combination of educational approaches."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These are not three independent theories or successive stages that every educational activity must complete. They are interconnected ways of thinking through the same design problem: understanding real people, identifying meaningful learning needs, and responding responsibly within the conditions of a particular setting."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/recursive-care-spiral.png",
        "width": 1536,
        "height": 1024,
        "alt": "Recursive care spiral"
      },
      {
        "type": "subheading",
        "id": "recursive-care",
        "index": "2.1",
        "title": "Recursive Care"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Education begins with a person, not a blank learner."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A child discussing vaccines may already remember needles, pain, and explanations offered by their parents. An adult entering a breast health activity may carry concerns about work, family responsibilities, and health information encountered in the past. A student entering the Virtual Laboratory brings their own expectations about experiments, mistakes, and learning."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These experiences do not begin when an educational activity starts. They are already part of the learner."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore developed **Recursive Care** around three dimensions that can expand outward without replacing one another."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Self-Care** begins with the learner's own body, experiences, concerns, choices, and agency. It recognizes that learning can begin from what a person already knows, feels, or considers important."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Mutual Care** emerges as learning enters relationships. Through dialogue, mutual learning, and support, participants can question, respond, explain, and contribute rather than simply receive information."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Access** concerns the conditions that allow learning to continue. Educational resources, teachers, professional guidance, language, experimental facilities, and opportunities to return all influence whether people can meaningfully participate."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These dimensions are not a fixed sequence. An activity may engage all three at once, while another may place greater emphasis on one according to its context."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What matters is that expanding educational opportunities should not erase the experiences, relationships, safety, or agency established earlier."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We use the **Golden Spiral** as a visual metaphor for this relationship. As new participants, resources, and learning opportunities enter the process, its outer reach can grow while preserving what has already developed within."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Expansion without erasure.**"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-1"
      },
      {
        "type": "subheading",
        "id": "community-educational-functions",
        "index": "2.2",
        "title": "Community & Educational Functions"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Recursive Care reminds us what should be preserved, but educational design must also respond to the people and circumstances immediately in front of us."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Age alone cannot determine the most appropriate educational approach. The needs of secondary school students attending an introductory lecture may differ from those of students performing experiments, even when they belong to the same age group. Similarly, a public health activity may involve participants who want basic information, others who have personal concerns, and others who need access to professional support."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore begin with **Audience × Context**: understanding who is participating and the environment in which learning takes place."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Within that context, we consider three complementary **Educational Functions**:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Cognitive** — developing conceptual understanding, scientific reasoning, and the ability to interpret or design biological systems."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Affective** — connect knowledge with personal experiences, relationships, attitudes, and values."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Experiential** — engaging learners through operations, experiments, choices, collaboration, and creative activities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These functions are not separate stages or competing theories. They describe different aspects of learning that may be more or less important in particular situations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For example, an introductory synthetic biology lecture may primarily support Cognitive learning, while a narrative health game can combine Cognitive understanding with Affective reflection. A laboratory course may place greater emphasis on Experiential learning while still requiring accurate scientific explanations and opportunities for discussion."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The purpose of this distinction is not to assign every activity a rigid label. It is to help us understand what an educational experience should enable learners to do, understand, or reflect upon."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Rather than choosing a familiar activity first and then finding a reason to use it, we begin with the learners and the setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The interactive **Community & Educational Function Map** allows readers to explore this relationship. By selecting different audiences and contexts, visitors can examine how the relative emphasis on Cognitive, Affective, and Experiential functions changes, and which practices in our Education portfolio address similar needs."
        ]
      },
      {
        "type": "feature",
        "key": "education-interactive-map"
      },
      {
        "type": "subheading",
        "id": "education-portfolio-optimization",
        "index": "2.3",
        "title": "Education Portfolio Optimization"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Once Audience, Context, and Educational Functions have been identified, the next step is not to search for the single “best activity.” Instead, we ask: Which combination of educational formats is most appropriate for this particular context?"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A single educational format can rarely fulfill every learning objective."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For example, in a high school course that requires both an understanding of biological mechanisms and experimental experience, a lecture can establish the conceptual foundation, a wet lab provides direct experience with experimental procedures and errors, the Virtual Laboratory helps learners explore a connected sequence of experiments that cannot be fully covered within the available classroom time or equipment, and plasmid design extends learning toward engineering judgment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These approaches are not competing alternatives."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What matters is how they complement one another within the available time, personnel, equipment, and space, and whether their combination can address the Cognitive, Affective, and Experiential functions most relevant to the setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We refer to this selection process as Education Portfolio Optimization."
        ]
      },
      {
        "type": "subheading",
        "id": "from-functions-to-portfolio",
        "index": "2.3.1",
        "title": "From Functions to Portfolio"
      },
      {
        "type": "prose",
        "paragraphs": [
          "After identifying Audience, Context, and Educational Functions, we still need to answer a practical question: Which educational formats should be included in the same portfolio when time, personnel, equipment, and space are limited?"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We are not searching for one educational format that is universally superior. Instead, we compare the functions different formats can serve and consider whether combining them can better respond to the needs of the current context."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "First, let $x_i$ indicate whether educational format $i$ is selected:"
        ]
      },
      {
        "type": "feature",
        "key": "education-equation-1"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Different formats provide different levels of coverage for Cognitive, Affective, and Experiential functions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Let $a_{ik}$ represent the extent to which educational format $i$ covers function $k$, and let $y_k$ represent the overall coverage of that function achieved by the final portfolio:"
        ]
      },
      {
        "type": "feature",
        "key": "education-equation-2"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Here, $w_k$ represents the relative need for Educational Function $k$ within the current Audience × Context."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In other words, our priority is to address the learning needs that matter most in a particular setting, rather than simply increasing the number of activities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For example, in a course that requires both an understanding of biological mechanisms and experimental experience, lectures can establish conceptual foundations, wet labs provide authentic hands-on experience with procedures and errors, the Virtual Laboratory helps learners explore experimental sequences that cannot be fully experienced under time and equipment constraints, and plasmid design introduces engineering judgment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Each format contributes something different, which is precisely why they can complement one another."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, an Education portfolio cannot expand indefinitely."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Let $c_{ir}$ represent the amount of resource $r$ required by educational format $i$, and let $C_r$ represent the amount of that resource currently available:"
        ]
      },
      {
        "type": "feature",
        "key": "education-equation-3"
      },
      {
        "type": "prose",
        "paragraphs": [
          "In practical terms, no matter how many activities we would like to organize, their combined requirements cannot exceed the time, personnel, equipment, and space actually available."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Scientific Accuracy, Safety, Privacy, and Accessibility are not treated as scoring criteria whose shortcomings can be offset by strengths elsewhere. Instead, they are essential conditions that must be satisfied before educational portfolios are compared."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Full variable definitions, model explanations, and further discussion are provided in WP02 — From Community to Portfolio: Needs Assessment and Education Portfolio Optimization."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To move this selection logic beyond mathematical expressions, the Education Design Board below transforms it into an interactive design tool."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Readers can adjust the target audience, learning context, educational needs, and available resources, then observe how the recommended Education portfolio changes in response."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-2"
      },
      {
        "type": "feature",
        "key": "education-interactive-design-board"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Yet design is only the beginning."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Once Education enters real classrooms, public spaces, and digital platforms, participants' questions, judgments, and ways of engaging with educational resources generate new information. These insights can then influence subsequent courses, tools, and activities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Design explains why we begin in a particular way; real participation shapes how we continue."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Ideas become Education only when they meet real people, places and constraints. Only when educational design encounters real people, specific contexts, and practical constraints does it truly become Education."
        ]
      }
    ]
  },
  {
    "id": "education-in-practice",
    "index": "3",
    "kicker": "Education",
    "title": "Education in Practice",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "*Ideas become Education only when they meet real people, places, and constraints.*"
        ]
      },
      {
        "type": "subheading",
        "id": "practice-map-where-education-happened",
        "index": "3.1",
        "title": "Practice Map：Where Education Happened"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our educational practices did not begin as a list of activities. They emerged from different learning contexts, where different people encountered different barriers, resources, and opportunities for participation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The framework presented above helps us determine what Education should accomplish. The Practice Map below shows how these considerations eventually took shape in real educational activities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For ease of navigation, we organize our practices into five categories according to their primary learning contexts: Classroom & Guided Learning, Laboratory & Interactive Learning, Public Health & Mobile Learning, Creative & Reflective Learning, and Digital & Long-term Participation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These categories are not rigid boundaries. Some practices were deliberately designed to cross multiple contexts. The classification simply indicates where each practice originally or primarily took place, rather than restricting it to a single educational format."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Nor do we attempt to force every Education practice into the same shape. Educational practices should be like rivers flowing through different landscapes, each with its own starting point, direction, and changes along the way. Pursuing structural uniformity for its own sake may obscure the differences that actually emerged in practice."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We are also cautious about constructing memorable names by first arranging initials into an acronym and then asking real practices to fit those predetermined concepts. A useful framework should grow out of actual educational practice, rather than requiring practice to conform to the framework."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore adopt a flexible organizational approach, using Context, Design, Participation, Evidence, and Continuation as reading cues. They are signposts on a map, not rails that every practice must follow. They help readers understand each activity without requiring identical structures, sequences, or lengths."
        ]
      },
      {
        "type": "table",
        "headers": [
          "Primary Learning Context",
          "Who Often Enters Here",
          "What This Context Enables",
          "Practices"
        ],
        "rows": [
          ["Classroom & Guided Learning", "School learners", "Structured entry, guided discussion and progressive learning", "Winter Outreach · Vaccine Classroom · Air-to-Bread Classroom · Synbio Classroom"],
          ["Experimental & Interactive Learning", "Learners entering experimental processes", "Practice, operation and procedural understanding", "Virtual Laboratory"],
          ["Public Health & Mobile Learning", "Public participants and young adults", "Accessible health information, action and professional support", "Xinghua Festival · Health Run"],
          ["Creative & Reflective Learning", "Learners entering through narrative, emotion and expression", "Reflection, values, personal connection and judgement", "Music Festival · Breast Guardian · Letters to My Body · Ethics Debate"],
          ["Digital & Long-term Participation", "Distributed and returning learners", "Re-entry, repeated learning, response and contribution", "105 Days Digital Engagement · Bio Memory Match · Digital Content"]
        ]
      },
      {
        "type": "subheading",
        "id": "laboratory-interactive-learning",
        "index": "3.2",
        "title": "Laboratory & Interactive Learning"
      },
      {
        "type": "subheading",
        "id": "virtual-laboratory",
        "index": "3.2.1",
        "title": "Virtual Laboratory"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**2026 · 9 Connected Experiments · 3 Learning Contexts · 4 Confirmed Uses**"
        ]
      },
      {
        "type": "subheading",
        "id": "context",
        "index": "3.2.1.1",
        "title": "CONTEXT："
      },
      {
        "type": "subheading",
        "id": "when-time-and-space-break-the-experiment-apart",
        "index": "3.2.1.1.1",
        "title": "When Time and Space Break the Experiment Apart"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Experimental learning is inherently constrained by real-world conditions. Laboratories require suitable facilities, equipment, consumables, and professional supervision. Some molecular biology experiments take several hours or even days to complete, while a typical school lesson lasts only a few dozen minutes. To finish a course on schedule, teachers often need to complete cultivation, preparation, or intermediate procedures in advance, leaving students with only a fragment of the overall research process. Laboratory conditions also vary considerably between schools, while safety regulations and laboratory access requirements further determine which procedures can actually be included in classroom teaching."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These constraints affect more than whether students can perform experiments. They also influence whether learners can understand how different experiments connect."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A student may have encountered PCR, gel electrophoresis, restriction digestion, ligation, and transformation as separate concepts, or even performed some of these procedures, yet still struggle to experience the complete progression from initial experimental materials to the verification of a final construct. Time divides a continuous research process into individual lessons, while space and resources determine which parts of that process can actually be made accessible."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To reconnect this fragmented pathway, we developed the Virtual Laboratory."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "It allows learners to become familiar with experimental procedures before entering a real laboratory, explore a connected experimental sequence that cannot be completed within ordinary classroom hours, and revisit procedures after conducting actual experiments."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The digital environment therefore offers a capability that is difficult to reproduce in a physical laboratory: the same experiment can be paused, revisited, and repeated, while the relationships between successive experiments remain visible within a single learning environment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This also gives Access a particularly concrete meaning within the Virtual Laboratory. For learners who cannot yet participate in a complete experimental process, engaging with science can begin by seeing the entire workflow, understanding the role of each step, and practicing repeatedly."
        ]
      },
      {
        "type": "subheading",
        "id": "design",
        "index": "3.2.1.2",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "nine-experiments-one-course",
        "index": "3.2.1.2.1",
        "title": "Nine Experiments, One Course"
      },
      {
        "type": "prose",
        "paragraphs": [
          "To preserve the continuity of authentic scientific research, we did not organize the nine experiments as separate exercises around isolated knowledge points. Instead, we connected them through a single GFP molecular cloning and verification workflow."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The initial stage focuses on preparing and checking experimental materials. The intermediate stages involve obtaining the vector and target DNA fragment, followed by PCR, restriction digestion, and ligation. The resulting candidate constructs are then introduced into a cloning host for positive-clone identification. Once verified, the constructs proceed to a suitable T7 expression host for GFP expression and verification."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The results generated at each stage become conditions for subsequent experiments."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "All nine experiments therefore share a common scientific pathway within the platform."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Learners need to understand where their current operation fits into the overall process, what previous experiments have provided, and how the results of the present step will influence later decisions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "PCR, electrophoresis, restriction digestion, and transformation are no longer simply experimental terms to be memorized separately. They begin to form a connected workflow."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We also preserve a central principle from our earlier course design: because experiments in real scientific research depend on one another, experimental education should help learners understand these relationships of interdependence."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/virtual-laboratory-nine-experiments.png",
        "width": 1536,
        "height": 1024,
        "alt": "Virtual laboratory nine experiments"
      },
      {
        "type": "subheading",
        "id": "from-watching-to-operating",
        "index": "3.2.1.2.2",
        "title": "From Watching to Operating"
      },
      {
        "type": "prose",
        "paragraphs": [
          "To ensure that the digital environment supports experimental learning rather than merely displaying experiments, we developed the Virtual Laboratory as a first-person interactive program."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Learners enter a virtual laboratory constructed from approximately 160 experimental visual assets and directly interact with instruments and reagents using a mouse."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The current operation is displayed at the bottom of the interface, while complete step-by-step navigation remains available on the left. During each experimental action, the relevant equipment is highlighted with a fixed yellow outline. Learners can also review previous steps to confirm the experimental procedure from their current position."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This interaction design addresses the question of how learners can begin operating within the environment. However, completing a series of clicks does not necessarily mean understanding an experiment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To connect operation with understanding, we incorporated Theory, Safety, Instruments, Reagents, and knowledge-reinforcement content into the same learning environment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When learners encounter a particular procedure, they can simultaneously examine why the step is necessary, which materials or instruments are being used, and what precautions should be taken. Scientific explanations are therefore connected to specific experimental contexts rather than postponed until after the experiment has ended."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Safety follows the same design logic."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To connect laboratory standards with actual procedures, we placed safety reminders at the steps where they become relevant. Aseptic technique, microbial cultivation, laboratory cleanup, and waste disposal are addressed within their corresponding experimental contexts."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Safety thus accompanies the experimental process instead of remaining confined to a single introductory page."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For us, the central interaction principle of the Virtual Laboratory can be summarized in one sentence:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Learning happens through participation, not observation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Learners must carry out key operations, observe results, and advance through the experimental workflow themselves."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The platform provides necessary navigation and explanations, but it is the learners' own actions that help them establish relationships between experimental steps."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/virtual-laboratory-interface.png",
        "width": 1536,
        "height": 1024,
        "alt": "Virtual laboratory interface"
      },
      {
        "type": "subheading",
        "id": "a-door-to-the-real-laboratory",
        "index": "3.2.1.2.3",
        "title": "A Door to the Real Laboratory"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Digital environments can extend learning time and overcome spatial barriers, but they cannot reproduce real laboratory practice in its entirety."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Actual pipetting involves physical handling and experimental error. Reagents carry real hazards. Cultures can become contaminated. Experiments require waiting, and several hours of work may ultimately produce results entirely different from those expected."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "An operation on a screen can be restarted, but real experimental materials and results cannot be restored simply by clicking a back button."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore maintain a clear boundary between the Virtual Laboratory and real experimental practice:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Virtual Laboratory is not a replacement for the laboratory; it is a door to the real laboratory."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "It can help beginners become familiar with laboratory environments and procedures before their first practical experience. It can allow students to see how experiments separated by classroom schedules connect to one another. It can also help those who have already conducted experiments revisit particular steps and reconsider why they were necessary."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Once learners enter a real laboratory, however, the material nature of experiments, uncertainty, safety responsibilities, and experimental failure must still be experienced firsthand."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Digital learning expands opportunities to engage with the experimental process while helping learners prepare for future practical work."
        ]
      },
      {
        "type": "subheading",
        "id": "continuation",
        "index": "3.2.1.3",
        "title": "CONTINUATION："
      },
      {
        "type": "subheading",
        "id": "hailun-first-engagement-introducing-an-early-experiment",
        "index": "3.2.1.3.1",
        "title": "Hailun-First Engagement: Introducing an Early Experiment"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our connection with Hailun No. 1 Senior High School began during Winter Outreach. Alongside the introductory activities on synthetic biology and iGEM, we brought an early version of the Virtual Laboratory to the school, introducing students to the first experiment available at that stage of development."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This initial experience marked an early opportunity to bring the digital laboratory into a real educational setting. Although the platform had not yet developed into its complete nine-experiment course, the activity allowed the Virtual Laboratory to become part of an existing school community rather than remaining solely a resource developed within our team."
        ]
      },
      {
        "type": "subheading",
        "id": "hailun-second-engagement-returning-with-a-developed-resource",
        "index": "3.2.1.3.2",
        "title": "Hailun-Second Engagement: Returning with a Developed Resource"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Several months later, the Virtual Laboratory returned to Hailun in a more developed form."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "After reconnecting with the school on May 20, our team provided the updated resource for further classroom use. On May 21, without team members present, a teacher projected the program onto a large classroom screen and guided students through shared viewing and operation. The teacher continued using the resource and collecting feedback during subsequent self-study periods."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This second engagement revealed something that the initial demonstration alone could not establish: the educational resource could be taken up and used independently by a teacher within the school's own learning environment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Making a digital tool available is only the first step. When teachers can understand its structure, integrate it into their lessons, and sustain its use without the developers being present, **Access** moves beyond resource provision toward genuine educational use."
        ]
      },
      {
        "type": "subheading",
        "id": "a-relationship-that-developed-across-two-stages",
        "index": "3.2.1.3.3",
        "title": "A Relationship That Developed Across Two Stages"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The two engagements with Hailun represent different stages in the relationship between our Virtual Laboratory and a real learning community."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The first introduced an early experimental resource. The second returned with a more developed tool and created an opportunity for independent classroom use."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We do not treat these two engagements alone as evidence of two completed product-iteration cycles. Instead, they demonstrate how the development of an educational resource and its use within a community can progress together."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Within our **Education Lineage**, Hailun therefore represents **Continuity**: an initial connection established through Winter Outreach became a pathway for later digital learning, while the teacher gained an active role in sustaining that learning beyond our team's direct involvement."
        ]
      },
      {
        "type": "subheading",
        "id": "evidence",
        "index": "3.2.1.4",
        "title": "EVIDENCE："
      },
      {
        "type": "subheading",
        "id": "pilu-town",
        "index": "3.2.1.4.1",
        "title": "Pilu Town"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our educational outreach in Pilu Town in July brought further changes to the Virtual Laboratory itself."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Second-grade and fourth-grade students used the same Gram Staining experiment. Younger students relied more heavily on colors, touchscreen interactions, and immediate prompts to advance through the procedure. Fourth-grade students more frequently paused to confirm relationships among the laboratory environment, instruments, reagents, and experimental steps."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Although the two age groups interacted with the program differently, their experiences revealed a more fundamental issue."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Before learners began operating the program, it implicitly assumed that they already understood where they were, why the experiment needed to be performed, and what roles the materials in front of them served."
        ]
      },
      {
        "type": "subheading",
        "id": "two-classroom-bridges-before-the-screen",
        "index": "3.2.1.4.2",
        "title": "Two Classroom Bridges Before the Screen"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Students in Pilu Town did not begin their learning experience by immediately clicking the first button in the Virtual Laboratory."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Before entering the digital experiment, we introduced two sets of classroom materials designed for younger learners, each providing a different entry point into life science."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-3"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Little Scientist: Giving Bacteria an ID was directly connected to the subsequent Gram Staining experiment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Beginning with questions such as “What are bacteria?” and observations of bacterial colonies, the lesson gradually introduced inoculating loops, microscope slides, crystal violet, iodine solution, decolorizing agents, safranin, and microscopic observation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Previously unfamiliar laboratory materials and staining procedures were transformed into a sequence of recognizable tasks."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Students then entered the corresponding experiment in the Virtual Laboratory, allowing their classroom understanding to continue into digital operations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Alongside this lesson, Life Science Adventure provided a broader introduction to life science."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Beginning with the idea that “not all bacteria are bad,” the course used familiar contexts such as food and human health to introduce life, DNA, synthetic biology, and iGEM."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Finally, students were encouraged to imagine how biotechnology might contribute to medicine, plants, the environment, animal protection, and future exploration."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This lesson did not directly teach a particular laboratory procedure. Instead, it helped children discover that life science could be understood, imagined, and even creatively explored."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These two sets of classroom materials also helped us identify a more specific issue during the Pilu Town sessions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Separate preparatory lessons can support learners before they enter an experiment, but the digital tool itself must still take responsibility for providing sufficient orientation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The pauses students encountered after entering the program were therefore not attributed simply to age. Instead, they prompted us to move Safety, Theory, Instruments, and Reagents to the beginning of each experiment in the Virtual Laboratory."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Initially, we interpreted some of the students' hesitation as differences associated with age and reading ability. Our attention therefore focused first on text length and interface prompts."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, comparing how the two grade levels used the program revealed that the issue extended beyond these factors."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Even with more visible buttons and clearer prompts, learners still needed to understand the experimental purpose, environment, materials, and safety boundaries before performing their first operation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To begin learning at the point where understanding was genuinely needed, we moved Safety, Theory, Instruments, and Reagents into the introductory stage of each experiment while retaining access to these materials for review during operation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Younger learners could rely more heavily on recognition, color, and procedural sequence, while older learners could engage more deeply with principles, variables, and relationships within the workflow."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Both groups nevertheless continued to encounter the same scientific core of the experiment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This process became the clearest example of DBTL within the Virtual Laboratory."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our initial design concentrated primarily on experimental operations. After completing the program and introducing it to real learners, the Pilu Town sessions exposed a problem with the structure of the experimental entry point."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These observations informed a revised design, moving the starting point of instruction earlier in the learning process."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What participants ultimately changed was not simply a sentence or a button, but what learners encountered first when entering the Virtual Laboratory."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The revised structure was subsequently used in later teaching contexts. Pilu Town therefore became a case we could explicitly document as Shape."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "From our initial goal of overcoming the temporal and spatial limitations of experimental learning, to connecting nine experiments into a complete course, and finally to revising the platform's entry structure in response to real use, the Virtual Laboratory developed into an experimental learning environment that learners can enter, revisit, examine, and continue improving."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "It still opens the same door: allowing those who cannot yet experience a complete experimental process to approach science, while helping those who eventually enter a real laboratory better understand why their work begins where it does."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-4"
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/pilu-town-iteration.png",
        "width": 1536,
        "height": 1024,
        "alt": "Pilu town iteration"
      },
      {
        "type": "feature",
        "key": "education-gallery-virtual-laboratory"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Easy / Intermediate / Advanced"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "[Explore our games](/games)"
        ]
      },
      {
        "type": "subheading",
        "id": "synbio-classroom",
        "index": "3.2.2",
        "title": "Synbio Classroom"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**9 Aug 2026 · 16 Rising Grade 11 Students · Wet Lab + Process Game + Plasmid Design + Virtual Laboratory**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-2",
        "index": "3.2.2.1",
        "title": "CONTEXT："
      },
      {
        "type": "subheading",
        "id": "from-textbook-knowledge-to-real-research",
        "index": "3.2.2.1.1",
        "title": "From Textbook Knowledge to Real Research"
      },
      {
        "type": "prose",
        "paragraphs": [
          "When the 16 students entered Synbio Classroom, they had already encountered DNA, genetic information, and gene expression in their high school biology courses."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore built upon their existing knowledge, allowing textbook concepts to enter real experimental practice, scientific reasoning, and synthetic biology design."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The program consisted of five connected lessons: laboratory safety, PCR and electrophoresis, crude DNA extraction, Life Science Monopoly, and plasmid design."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/synbio-classroom.png",
        "width": 1536,
        "height": 1024,
        "alt": "Synbio classroom"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Together, these lessons guided students from recognizing and interpreting biological information toward designing biological systems."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Synbio Classroom was also the Education activity with the most extensive involvement from our faculty advisors."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Professional guidance, experimental facilities, and sustained supervision together formed the Access provided by this course, allowing students to enter an authentic scientific research environment."
        ]
      },
      {
        "type": "subheading",
        "id": "design-2",
        "index": "3.2.2.2",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "five-lessons-one-learning-route",
        "index": "3.2.2.2.1",
        "title": "Five Lessons, One Learning Route"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The five lessons were not designed as isolated activities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "PCR and electrophoresis helped students understand how DNA information can be amplified and analyzed. Crude DNA extraction transformed genetic material from an abstract textbook concept into something students could observe through their own hands-on work."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Real experiments also introduced pipetting errors, contamination risks, laboratory safety standards, and uncertainty in experimental results."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Life Science Monopoly then brought previously learned concepts back into the broader research process."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The 16 students were divided into four teams. Through alternating responses, team decisions, research-related events, and exchanges between teams, students continued applying the knowledge they had acquired."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Individual judgments were preserved as the starting point, then brought into dialogue / mutual learning through cooperation within teams and communication between groups."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Self-Care and Mutual Care therefore coexisted within the same task."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Individual judgment was not replaced by collective discussion. Instead, it was explained, questioned, and reconsidered through relationships with others."
        ]
      },
      {
        "type": "subheading",
        "id": "designing-under-constraints",
        "index": "3.2.2.2.2",
        "title": "Designing Under Constraints"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The final plasmid design lesson placed students in the position of making engineering decisions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Different tasks required them to combine promoters, ribosome binding sites (RBS), coding sequences (CDS), and terminators while working within constraints involving resource points, expression strength, host burden, and stability."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The objective was not to identify the single “strongest” combination, but to explain why a particular design was appropriate for a specific goal."
        ]
      },
      {
        "type": "subheading",
        "id": "evidence-2",
        "index": "3.2.2.3",
        "title": "EVIDENCE："
      },
      {
        "type": "subheading",
        "id": "when-dialogue-changed-the-route",
        "index": "3.2.2.3.1",
        "title": "When Dialogue Changed the Route"
      },
      {
        "type": "prose",
        "paragraphs": [
          "In the original teaching plan, the Virtual Laboratory was intended to provide only one virtual exercise related to PCR and electrophoresis."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, after completing plasmid design, students continued asking how their designs would proceed through amplification, restriction digestion, ligation, transformation, and verification."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The original arrangement could no longer adequately address the direction in which their questions had developed."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The instructors therefore adjusted the lesson on site, expanding the single virtual exercise into a complete nine-experiment guided walkthrough."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The nine-experiment Virtual Laboratory had already been developed before this session. What changed that day was the teaching route and the role of the Virtual Laboratory within the classroom."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through their questions and judgments, students participated and contributed."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When these inputs led to a concrete change in the teaching arrangement, and the revised approach was immediately put into practice and examined through continued interaction with the same students, the process became an instance of Shape that we could clearly document."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Synbio Classroom thus brought our earlier framework into a real classroom."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Learning began with students' existing knowledge, expanded through authentic relationships and cooperation, and was supported by access to experimental resources and professional guidance."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When participants pushed learning beyond the original design, the course continued to change in response."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-5"
      },
      {
        "type": "feature",
        "key": "education-gallery-synbio-classroom"
      },
      {
        "type": "chapter-link",
        "target": "build-upon-continue-from-here",
        "label": "Unlock reusable resources",
        "imageSrc": "__BASE__assets/education/reusable-resources-icon.png",
        "imageAlt": "Unlock reusable resources"
      },
      {
        "type": "subheading",
        "id": "bio-heroes",
        "index": "3.2.3",
        "title": "Bio-Heroes"
      },
      {
        "type": "subheading",
        "id": "design-3",
        "index": "3.2.3.1",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "turning-biological-relationships-into-game-rules",
        "index": "3.2.3.1.1",
        "title": "Turning Biological Relationships into Game Rules"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Bio-Heroes transforms concepts, biological components, and relationships from synthetic biology into an interconnected system of competitive game rules."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The game supports two to four players and features two opposing factions: the Prokaryotic Alliance and the Eukaryotic Federation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The current rules include eight character cards and 108 game cards. Players use basic cards, skill cards, equipment cards, and faction abilities to gradually defeat the opposing faction."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Its most valuable feature is not simply giving conventional playing cards a biological appearance. Rather, the game attempts to embed different biological relationships directly into its rules."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For example, Bacteriocin serves as an attack mechanism, while Resistance can counteract attacks and Culture Medium restores health points."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Restriction Digestion can disrupt an opponent's resources, Horizontal Gene Transfer allows players to obtain cards from others, and PCR Amplification provides additional resources."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In this way, players do not encounter terms such as PCR, resistance, and horizontal gene transfer as isolated facts to memorize. Instead, they repeatedly encounter these concepts through relationships embedded in gameplay."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The two factions also have distinct cooperation mechanisms."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For example, the prokaryotic faction can transfer resources through Plasmid Conjugation, while the eukaryotic faction has its own methods of organizing resources."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The game also incorporates faction-wide bonuses and cooperative mechanisms such as Signal Amplification, making collaboration between players part of the rules themselves."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The reason Bio-Heroes belongs within Education is therefore that it offers an entry point for understanding scientific concepts through relationships expressed as game rules."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Players must continually consider what a particular mechanism can accomplish, how it interacts with other mechanisms, how resources should be allocated, when cooperation is beneficial, and when a cost must be accepted."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-6"
      },
      {
        "type": "prose",
        "paragraphs": [
          "At the same time, its limitations must remain explicit."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Card mechanics are educational abstractions, not one-to-one simulations of real cellular behavior."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Analogies within the game should therefore be accompanied by scientific explanations. Whenever a game effect simplifies an actual biological mechanism for the sake of playability, learners should also be able to recognize where that simplification occurs."
        ]
      },
      {
        "type": "subheading",
        "id": "classroom-guided-learning",
        "index": "3.3",
        "title": "Classroom & Guided Learning"
      },
      {
        "type": "subheading",
        "id": "winter-outreach",
        "index": "3.3.1",
        "title": "Winter Outreach"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**24 Jan – 4 Mar 2026 · 5 Schools · China & Italy · ~308 Students**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-3",
        "index": "3.3.1.1",
        "title": "CONTEXT:"
      },
      {
        "type": "subheading",
        "id": "bringing-synthetic-biology-beyond-the-university",
        "index": "3.3.1.1.1",
        "title": "Bringing Synthetic Biology Beyond the University"
      },
      {
        "type": "prose",
        "paragraphs": [
          "During the winter vacation of 2026, our team brought introductory synthetic biology and iGEM education to five schools across China and Italy."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The outreach reached approximately 308 students at Hailun No. 1 Senior High School in Heilongjiang, Yanbian No. 1 Senior High School in Jilin, Chengnan Middle School in Dazu District, Chongqing, Confucius Senior High School in Jining, Shandong, and Technical Institute Avogadro in Turin, Italy."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our aim was not simply to introduce another scientific topic beyond the school curriculum. We wanted students to discover that synthetic biology connects familiar biological knowledge with engineering design, scientific research, and problems encountered in everyday life."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For many secondary school students, biology is first encountered through textbooks, examinations, and established scientific facts. Modern biotechnology, however, also involves making decisions, designing biological systems, working across disciplines, and learning from unsuccessful attempts."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Winter Outreach provided an opportunity to introduce this broader perspective."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Although the five sessions shared common scientific themes, they took place in different school communities. We therefore treated the students' existing knowledge and questions as starting points rather than assuming that all learners would approach synthetic biology in exactly the same way."
        ]
      },
      {
        "type": "subheading",
        "id": "design-4",
        "index": "3.3.1.2",
        "title": "DESIGN:"
      },
      {
        "type": "subheading",
        "id": "understanding-synthetic-biology-through-familiar-ideas",
        "index": "3.3.1.2.1",
        "title": "Understanding Synthetic Biology Through Familiar Ideas"
      },
      {
        "type": "prose",
        "paragraphs": [
          "We began by introducing synthetic biology as an interdisciplinary field that combines biological understanding with engineering approaches to designing and modifying biological systems."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To make this idea more approachable, we used the analogy of building blocks."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Just as individual building blocks can be assembled into different structures, biological components can be considered, combined, and organized to achieve particular functions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This analogy provided an accessible entry point into concepts such as biological parts, genetic elements, modular design, and engineered biological systems."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, biological systems are not simply collections of interchangeable pieces. Their behavior depends on interactions, regulation, biological context, and experimental conditions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The building-block analogy therefore served as a starting point for understanding engineering design rather than a complete description of living systems."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We then explored how synthetic biology can connect with familiar aspects of everyday life."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Examples from medicine, environmental protection, food production, and industrial biotechnology illustrated how biological research can contribute to addressing practical challenges."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Scientific applications were not presented as guaranteed solutions. Instead, they provided opportunities to discuss what biological technologies might make possible, what limitations remain, and why experimental evidence matters."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These examples helped extend the discussion beyond individual biological concepts toward the relationship between scientific research and society."
        ]
      },
      {
        "type": "subheading",
        "id": "discovering-igem-and-the-engineering-cycle",
        "index": "3.3.1.2.2",
        "title": "Discovering iGEM and the Engineering Cycle"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Building on this introduction, we presented the International Genetically Engineered Machine competition, or iGEM, as an opportunity for students to encounter synthetic biology through collaborative project development."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We introduced the origins and development of iGEM, its international community, different participation categories, and the ways students from different educational backgrounds can become involved."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The presentation also introduced the broad structure of an iGEM season, from initial project exploration and design to experimental development, community engagement, documentation, and final presentation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Rather than describing iGEM only as a competition, we emphasized the process through which a scientific idea develops into a project."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A central part of this introduction was the **Design–Build–Test–Learn (DBTL) cycle**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Students were invited to consider how researchers move from identifying a problem to proposing a design, constructing a biological system, evaluating its performance, and using experimental findings to improve subsequent designs."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The cycle also provided a way to explain why scientific research rarely proceeds exactly as planned."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Unexpected results, unsuccessful experiments, and changing assumptions are not necessarily the end of a project. They can become information that informs the next round of design."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through examples of synthetic biology projects, we introduced the relationship between biological mechanisms, engineering decisions, and iterative improvement."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We also introduced the wider iGEM project environment, including experimental work, computational approaches, Human Practices, Education, communication, and Wiki development."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These activities illustrate why participation in synthetic biology is not limited to students majoring in biology."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Medicine, pharmacy, chemistry, physics, computer science, engineering, education, art, economics, and other disciplines can all contribute different skills and perspectives to an interdisciplinary team."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The discussion also covered opportunities to communicate and exchange ideas through regional and national synthetic biology events, such as CCiC, SynBioPunk, and regional meetups."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Together, these examples presented iGEM as a collaborative environment in which scientific design, communication, and social engagement can develop alongside one another."
        ]
      },
      {
        "type": "subheading",
        "id": "learning-through-real-igem-projects",
        "index": "3.3.1.2.3",
        "title": "Learning Through Real iGEM Projects"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Beyond explaining the structure of the competition, we introduced examples of projects developed by iGEM teams."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The examples explored how synthetic biology can be applied to biomedical challenges, molecular monitoring, environmental protection, and engineered biological systems."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Rather than presenting these projects as isolated technological achievements, we used them to illustrate a broader research process."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A meaningful project begins with a problem worth investigating. It then requires an understanding of the biological mechanisms involved, an appropriate design strategy, and a plan for testing whether the proposed system works."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Different examples also demonstrated how a project may involve laboratory experiments, computational analysis, hardware or software development, social considerations, and public communication."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These cases helped students connect the biological knowledge they had already encountered with the wider range of questions that can arise in actual research."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "They also introduced two values central to the iGEM community: **collaboration and open sharing**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Scientific progress does not depend only on what one team can accomplish independently. Published methods, documented designs, shared resources, and previous research provide starting points for future work."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through the ideas of **Open Source, Build Upon, and collaborative development**, we introduced the importance of making scientific knowledge understandable, accessible, and reusable."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Wiki was presented not simply as a record of competition results, but as a place where teams can explain their design choices, document their work, and enable others to learn from or build upon it."
        ]
      },
      {
        "type": "subheading",
        "id": "participation",
        "index": "3.3.1.3",
        "title": "PARTICIPATION:"
      },
      {
        "type": "subheading",
        "id": "five-schools-five-learning-settings",
        "index": "3.3.1.3.1",
        "title": "Five Schools, Five Learning Settings"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The five outreach sessions shared a common educational foundation, while reaching students in different school communities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Hailun No. 1 Senior High School, Heilongjiang, China — Approximately 50 students**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In Hailun, the introductory scientific content was accompanied by **Dream circRNA**, a hands-on creative activity inspired by the circular appearance of circRNA."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Students used colorful circular segments to express hopes, experiences, and things they wished to achieve or preserve in the future."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The activity did not attempt to model the molecular mechanisms of circRNA. Instead, it allowed students to connect an unfamiliar scientific shape with their own experiences and aspirations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Hailun subsequently became an important example of how an initial outreach connection could continue beyond a single visit."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Yanbian No. 1 Senior High School, Jilin, China — Approximately 100 students**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Yanbian session formed part of our broader introduction to synthetic biology, interdisciplinary research, and iGEM."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "By connecting foundational biological concepts with engineering thinking and examples of contemporary biotechnology, the outreach offered students another perspective on the relationship between school biology and scientific research."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Chengnan Middle School, Dazu District, Chongqing, China — Approximately 60 students**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In Chongqing, the outreach introduced the broader possibilities of synthetic biology and collaborative scientific projects."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The presentation connected biological knowledge with applications in medicine, the environment, and biotechnology, illustrating how scientific concepts can contribute to questions beyond the classroom."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Confucius Senior High School, Jining, Shandong, China — Approximately 48 students**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Jining session introduced students to synthetic biology and the interdisciplinary nature of iGEM projects."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through explanations of engineering thinking, project examples, and scientific collaboration, the outreach presented biology not only as a subject to study but also as a field in which new systems and solutions can be explored."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Technical Institute Avogadro, Turin, Italy — Approximately 50 students**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our outreach also reached Technical Institute Avogadro in Turin, extending the introductory themes of synthetic biology and iGEM to a school community outside China."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This session formed part of our effort to bring educational resources and scientific ideas into different learning environments while preserving a shared foundation of scientific accuracy and accessibility."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These five sessions were not five entirely different educational programs."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "They shared central scientific themes, but the different school settings reminded us that a common presentation does not necessarily produce an identical learning experience."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The value of reaching multiple communities was therefore not simply the number of locations visited, but the opportunity to introduce accessible scientific content in settings where learners brought different backgrounds and questions."
        ]
      },
      {
        "type": "subheading",
        "id": "from-scientific-knowledge-to-personal-questions",
        "index": "3.3.1.3.2",
        "title": "From Scientific Knowledge to Personal Questions"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The outreach did not aim to leave students with a list of new scientific terms."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "By connecting synthetic biology with everyday applications, scientific projects, engineering cycles, and interdisciplinary collaboration, we hoped to make scientific research more understandable as an activity that people can participate in."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The discussion of iGEM was particularly useful in this respect."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Students could see that designing a biological system involves more than performing experiments. A project may also require communicating with communities, evaluating practical needs, producing educational materials, documenting methods, designing software, or presenting findings."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This broader picture challenged the assumption that scientific participation belongs exclusively to a narrow group of specialists."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The outreach also reflected an important principle of **Recursive Care**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Learners do not enter a classroom without prior experiences or expectations. Their interests, academic backgrounds, and ideas about the future influence how they encounter scientific information."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Activities such as Dream circRNA made this connection visible by allowing personal experiences to become part of the learning process."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "At the same time, introducing interdisciplinary collaboration and openly shared scientific resources expanded the range of ways students could imagine participating in science."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These were opportunities for **Cognitive** learning through concepts and examples, **Affective** engagement through personal interests and future aspirations, and, where hands-on activities were available, **Experiential** learning through direct participation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The relative importance of these functions depended on the particular activity and learning context rather than a fixed sequence applied to every school."
        ]
      },
      {
        "type": "subheading",
        "id": "continuation-2",
        "index": "3.3.1.4",
        "title": "CONTINUATION:"
      },
      {
        "type": "subheading",
        "id": "what-remained-after-the-outreach",
        "index": "3.3.1.4.1",
        "title": "What Remained After the Outreach"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The most immediate measurable outcome of Winter Outreach was its reach: five schools across China and Italy, with approximately 308 students participating."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, attendance alone cannot determine how much students learned or whether their interests and decisions changed in the long term."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What the outreach established was a series of opportunities for students to encounter synthetic biology, engineering thinking, interdisciplinary research, and the collaborative culture of iGEM."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "One of these connections continued in a particularly concrete way."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "On May 21, following renewed communication with our team, a teacher at Hailun No. 1 Senior High School independently brought the Virtual Laboratory into the classroom."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Without team members present, the teacher projected the program onto a large screen, guided students through shared viewing and operation, and continued using the resource and collecting feedback during subsequent self-study periods."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The educational relationship therefore extended beyond the original winter lecture."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The same school community returned to a new learning resource, and the teacher became an independent user of that resource."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Within our **Education Lineage**, we document this relationship as **Continuity**."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For us, Winter Outreach demonstrated that the significance of introductory science education need not end with the final slide of a presentation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "An accessible first encounter can open the possibility of further questions, renewed connections, and continued participation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The important question is not merely how many places Education reaches, but whether the people and relationships encountered along the way can remain part of what happens next."
        ]
      },
      {
        "type": "feature",
        "key": "education-gallery-winter-outreach"
      },
      {
        "type": "chapter-link",
        "target": "build-upon-continue-from-here",
        "label": "Unlock reusable resources",
        "imageSrc": "__BASE__assets/education/reusable-resources-icon.png",
        "imageAlt": "Unlock reusable resources"
      },
      {
        "type": "subheading",
        "id": "air-to-bread-classroom",
        "index": "3.3.2",
        "title": "Air-to-Bread Classroom"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**23 Apr 2026 · World Book Day · Jilin University Affiliated Middle School · 203 Students**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-4",
        "index": "3.3.2.1",
        "title": "CONTEXT："
      },
      {
        "type": "subheading",
        "id": "starting-from-bread",
        "index": "3.3.2.1.1",
        "title": "Starting from Bread"
      },
      {
        "type": "prose",
        "paragraphs": [
          "For junior high school students, synthetic biology, carbon fixation, and biomanufacturing may still be unfamiliar concepts. Bread, plants, and air, however, are not."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Rather than beginning with scientific terminology, we introduced a seemingly simple question:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Could we make bread without growing wheat?"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Starting with bread and wheat, students revisited what they had already learned about plant growth and photosynthesis. From there, they gradually explored where organic matter comes from, how microorganisms can participate in material transformation, and why researchers are investigating ways to use living systems to produce useful substances."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Familiar everyday experiences thus became an entry point into unfamiliar scientific questions."
        ]
      },
      {
        "type": "subheading",
        "id": "design-5",
        "index": "3.3.2.2",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "from-everyday-analogies-to-biological-systems",
        "index": "3.3.2.2.1",
        "title": "From Everyday Analogies to Biological Systems"
      },
      {
        "type": "prose",
        "paragraphs": [
          "To make abstract processes more understandable for junior high school students, we used three limited and clearly defined analogies:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "- Cell → Micro Factory"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "- DNA → Instruction Manual"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "- Metabolic Pathway → Production Line"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These analogies helped students establish initial relationships between concepts, but they were not intended to replace actual biological mechanisms."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The lesson subsequently returned to biological systems, explaining that regulation, biochemical reactions, and material exchange in real cells are far more complex than factories and production lines."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "“Air to Bread” itself was also preserved as a question for exploration rather than a literal conclusion. Food is not produced directly “from air” without additional material and energy inputs."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Whether emerging biomanufacturing approaches genuinely conserve resources also depends on their specific production conditions and actual inputs."
        ]
      },
      {
        "type": "subheading",
        "id": "participation-2",
        "index": "3.3.2.3",
        "title": "PARTICIPATION："
      },
      {
        "type": "subheading",
        "id": "questions-before-answers",
        "index": "3.3.2.3.1",
        "title": "Questions Before Answers"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The lesson did not ask students simply to accept a predetermined conclusion."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Questions such as “How can air be connected to food?” and “What can microorganisms help us accomplish?” were left open for students to consider and discuss."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Raised hands, follow-up questions, and exchanges between teachers and students continually moved the classroom from instruction toward shared reasoning."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "World Book Day provided another entry point for the lesson. When encountering an intriguing scientific headline, we can continue asking: How was the research conducted? What evidence supports its conclusions? What conditions must be satisfied before the technology can be applied in practice?"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What we hoped students would take away, therefore, was not merely the surprising idea of making “bread from air,” but a way of approaching emerging science: continuing to ask questions, seeking evidence, and recognizing the limits of scientific claims."
        ]
      },
      {
        "type": "feature",
        "key": "education-gallery-air-to-bread-classroom"
      },
      {
        "type": "prose",
        "paragraphs": [
          "[Explore the Air-to-Bread sustainability analysis in the Sustainability section →](/sustainability)"
        ]
      },
      {
        "type": "chapter-link",
        "target": "build-upon-continue-from-here",
        "label": "Unlock reusable resources",
        "imageSrc": "__BASE__assets/education/reusable-resources-icon.png",
        "imageAlt": "Unlock reusable resources"
      },
      {
        "type": "subheading",
        "id": "vaccine-classroom",
        "index": "3.3.3",
        "title": "Vaccine Classroom"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**15 May 2026 · Jilin University Affiliated Primary School · ~50 Students**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-5",
        "index": "3.3.3.1",
        "title": "CONTEXT："
      },
      {
        "type": "subheading",
        "id": "children-already-had-a-vaccine-story",
        "index": "3.3.3.1.1",
        "title": "Children Already Had a Vaccine Story"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The children were not encountering the idea of vaccines for the first time in this classroom."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "They remembered needles and pain. They knew that vaccination could sometimes be followed by a fever. Adults had told them that vaccines were given to help prevent illness."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These memories were incomplete, but they had already become the starting point from which the children understood vaccination."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore did not begin with a slide defining what a vaccine is."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The first two parts of the lesson allowed these experiences to enter the classroom before gradually introducing pathogens, the body's defenses, immune recognition, and why vaccination can help the body prepare in advance."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The final teaching presentation consisted of four connected parts. The first two established the scientific foundations, the third introduced a group-based judgment game, and the fourth returned to scientific explanations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This sequence was particularly important for children."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "If a child already knows that someone can still become ill after vaccination, simply telling them that “vaccines prevent disease” does not automatically resolve their uncertainty."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Instead, the child may naturally ask another question: If vaccination does not always prevent illness, why should we still get vaccinated?"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Education needs to engage with questions that already exist, rather than assuming they have never been asked."
        ]
      },
      {
        "type": "subheading",
        "id": "design-6",
        "index": "3.3.3.2",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "the-wanted-poster",
        "index": "3.3.3.2.1",
        "title": "The Wanted Poster"
      },
      {
        "type": "prose",
        "paragraphs": [
          "In the third part of the lesson, we placed the task of making judgments directly in the students' hands."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The children were divided into groups and entered a game called “Sheriff Catches the Bad Guys.”"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Two rounds focused on the same recognition task. In one round, students had no clear clues from a “wanted poster.” In the other, additional distinguishing information was provided to help them make decisions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Students had to make choices based on the clues available to them and explain their reasoning to their group members."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A clear difference emerged between the two rounds. After the wanted-poster clues were introduced, students collectively identified more targets."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This was precisely the experience we wanted the game to provide: when the body has already received information about a target, subsequent recognition can become more effective."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The result meant that “preparation in advance” was no longer simply something explained by the teacher. It became an experience students could directly compare through their own decisions across the two rounds."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The wanted poster ultimately served a limited but clearly defined purpose: obtaining recognition-related information in advance can improve subsequent identification."
        ]
      },
      {
        "type": "subheading",
        "id": "a-metaphor-is-useful-only-if-it-knows-where-to-stop",
        "index": "3.3.3.2.2",
        "title": "A Metaphor Is Useful Only If It Knows Where to Stop"
      },
      {
        "type": "prose",
        "paragraphs": [
          "A compelling story can make a children's lesson easier to enter. For precisely this reason, the limitations of a metaphor must be designed alongside the metaphor itself."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The sheriff, the bad guys, and the wanted poster make advance recognition intuitive. However, the sheriff is not a complete representation of an immune cell, and the bad guys cannot capture all the complex relationships among pathogens, infection, and disease."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The fourth part of the lesson therefore did not allow the story to expand indefinitely. Instead, it deliberately brought students back to scientific language."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Vaccination can help the immune system prepare for recognition and defense, but this does not mean that infection will never occur after vaccination, nor does it mean that all diseases can be prevented through the same mechanism."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This distinction was especially important to us."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "If an analogy helps students remember something but cannot guide them back toward a more accurate explanation, it may remain no more than a memorable story."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Education needs to accomplish more. It should allow learners to enter through a story, while also helping them move beyond that story when a more precise scientific understanding is needed."
        ]
      },
      {
        "type": "subheading",
        "id": "participation-3",
        "index": "3.3.3.3",
        "title": "PARTICIPATION："
      },
      {
        "type": "subheading",
        "id": "when-hands-went-up",
        "index": "3.3.3.3.1",
        "title": "When Hands Went Up"
      },
      {
        "type": "prose",
        "paragraphs": [
          "We reserved time for open questions at the end of the lesson."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The sheriff and wanted poster from the game now led back to real-world experiences of needles, pain, fever, protection, and the question of why illness can still occur after vaccination."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The children did not wait until they were completely certain before participating. They raised their hands first, then gradually refined their expressions through responses from teachers, team members, and classmates."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This naturally connects with the starting point of Self-Care within Recursive Care."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The bodily memories children brought into the classroom were not “incorrect prior knowledge” that needed to be erased."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The pain was real. The fear was real. The words their parents had previously spoken were also part of their real experiences."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The task of science education is to help learners develop more reliable explanations for these experiences, rather than requiring them to leave their experiences outside the classroom."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "At the same time, when a child began explaining to a classmate, “This is why I made that choice,” understanding had already moved beyond individual experience into Mutual Care."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Knowledge began moving between people through discussion, questioning, and response."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What this lesson ultimately made clear to us was that age-appropriate education is not simply about making scientific content easier. It is about finding a path that children can enter, along which they can make judgments, and through which they can ultimately return to the boundaries of scientific explanation."
        ]
      },
      {
        "type": "subheading",
        "id": "continuation-3",
        "index": "3.3.3.4",
        "title": "CONTINUATION："
      },
      {
        "type": "subheading",
        "id": "a-classroom-we-could-hand-over",
        "index": "3.3.3.4.1",
        "title": "A Classroom We Could Hand Over"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The lesson ultimately left behind more than photographs and a record of one classroom session."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Its four-part structure, wanted-poster game, return to scientific explanation, and teaching materials were organized into a reusable Teaching Pack."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This allowed the activity to move beyond a single teaching session and become an educational resource that teachers or future teams could deploy again."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What can be inherited through Build Upon is a more fundamental design logic:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Begin with learners' existing experiences."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Allow learners to make genuine judgments."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Give analogies a limited and clearly defined purpose."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Finally, return to scientific language."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Different teachers can replace the examples, visual materials, and interactive activities while continuing to use this underlying approach."
        ]
      },
      {
        "type": "feature",
        "key": "education-gallery-vaccine-classroom"
      },
      {
        "type": "chapter-link",
        "target": "build-upon-continue-from-here",
        "label": "Unlock reusable resources",
        "imageSrc": "__BASE__assets/education/reusable-resources-icon.png",
        "imageAlt": "Unlock reusable resources"
      },
      {
        "type": "subheading",
        "id": "public-health-mobile-learning",
        "index": "3.4",
        "title": "Public Health & Mobile Learning"
      },
      {
        "type": "subheading",
        "id": "xinghua-festival",
        "index": "3.4.1",
        "title": "Xinghua Festival"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**19 Apr 2026 · Public Health Outreach · Campus Festival · 500+ Participants**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-6",
        "index": "3.4.1.1",
        "title": "CONTEXT："
      },
      {
        "type": "subheading",
        "id": "public-space-changes-the-format",
        "index": "3.4.1.1.1",
        "title": "Public Space Changes the Format"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Xinghua Festival presented a very different set of time constraints from the classroom activities described earlier. Participants were constantly moving through the event. Some were willing to stop for only a few minutes, others stayed longer because they had specific questions, and some wanted to speak directly with a doctor from the outset."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To make breast health education suitable for this open public setting, we needed to transform a relatively long learning pathway into an on-site experience that people could enter quickly while still having opportunities to explore more deeply."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The microscopic breast world developed in Breast Guardian provided the content foundation for this activity, but a lengthy narrative game could not simply be transferred to a festival setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore reorganized its content—including basic breast health knowledge, risks and warning signs, treatment, and the immune environment—into a tri-fold brochure that participants could unfold, take away, and read again."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Knowledge that had previously been encountered through the progression of a game narrative was thus transformed into a printed resource suited to public spaces."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This also reflected a fundamental principle of Education Portfolio Optimization: when the context changes, educational formats must be reconsidered in response to real-world conditions."
        ]
      },
      {
        "type": "subheading",
        "id": "design-7",
        "index": "3.4.1.2",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "a-guided-core-with-open-choices",
        "index": "3.4.1.2.1",
        "title": "A Guided Core with Open Choices"
      },
      {
        "type": "prose",
        "paragraphs": [
          "To help first-time visitors understand where to begin, we designed a clear central route through the activity."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants first colored bookmarks, then moved on to a breast health quiz. After completing five core questions, they could leave their own messages on sticky notes or ribbons at the Care Wall."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Coloring and hands-on creation lowered the threshold for beginning an interaction. The quiz brought attention back to health knowledge, while the final opportunity for personal expression allowed participants to reconnect what they had just learned with their own lives and relationships."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Beyond this central route, medical consultations, educational tri-fold brochures, and light activities such as beanbag games remained available throughout the event."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants did not have to complete every activity before asking a question. They could choose where to spend their time according to their interests, schedules, and actual needs."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This design preserved an important aspect of Self-Care: Education can provide direction while allowing learners to retain control over how they enter and navigate the learning experience."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/xinghua-festival.png",
        "width": 1536,
        "height": 1024,
        "alt": "Xinghua festival"
      },
      {
        "type": "subheading",
        "id": "participation-4",
        "index": "3.4.1.3",
        "title": "PARTICIPATION："
      },
      {
        "type": "subheading",
        "id": "when-questions-crossed-the-display-board",
        "index": "3.4.1.3.1",
        "title": "When Questions Crossed the Display Board"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Genuine dialogue / mutual learning soon emerged beyond the content we had prepared in advance."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "One child asked, “Can breast cancer spread to me?”"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Other participants asked about health risks on behalf of their mothers, friends, and family members. Some older visitors brought information about treatments or health products they had encountered through unofficial sources and wanted to know how to evaluate its reliability."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These questions involved scientific knowledge, fear, and real-life relationships at the same time. Simply adding another educational display board would not have been enough to address them fully."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our team could explain that breast cancer is not contagious through proximity to a patient, discuss common warning signs, and introduce reliable sources of health information."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Faculty advisors and clinical doctors also participated in on-site consultations, allowing questions requiring further professional judgment to be directed toward appropriate medical support."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For individual health decisions beyond the scope of public science communication, we maintained a clear boundary between education and professional medical diagnosis and treatment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Access therefore came to mean more than distributing educational materials."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The tri-fold brochure allowed information to be taken home. Team members provided explanations. Doctors could respond to questions requiring further expertise. Participants could also understand where to seek help when on-site education could no longer provide an adequate answer."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "By connecting resources, understanding, and professional support within the same public space, knowledge had a genuine opportunity to move from something merely displayed to something people could actually use."
        ]
      },
      {
        "type": "subheading",
        "id": "from-self-care-to-mutual-care",
        "index": "3.4.1.3.2",
        "title": "From Self-Care to Mutual Care"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The messages left on the Care Wall further shaped the direction of the event."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Many participants did not write only about their own bodies or health. Instead, they addressed their messages to mothers, friends, patients, and family members."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Some arrived with personal concerns but left behind a wish or blessing for someone else."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This made the outward expansion of Recursive Care particularly visible within the activity."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Self-Care allowed individuals to begin with their own bodily experiences and questions. Mutual Care extended understanding into relationships with family members, friends, and patients. Doctors, educational materials, and pathways to appropriate professional help further contributed to Access."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These three dimensions were not tasks completed in sequence. They continually intersected within the same event."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A question about one's own health could turn toward a family member. A brochure taken home for someone else could, in turn, bring new personal questions back into the conversation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants therefore did more than receive information."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through their questions, family experiences, and messages on the Care Wall, they participated and contributed, allowing the voices of the community to become part of the public health education experience."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We did not classify these ordinary forms of participation as Shape. What they demonstrated, first and foremost, was that dialogue and relationships had genuinely entered the Education process itself."
        ]
      },
      {
        "type": "subheading",
        "id": "continuation-4",
        "index": "3.4.1.4",
        "title": "CONTINUATION ："
      },
      {
        "type": "subheading",
        "id": "knowledge-moved-again",
        "index": "3.4.1.4.1",
        "title": "Knowledge Moved Again"
      },
      {
        "type": "prose",
        "paragraphs": [
          "After Xinghua Festival, the educational content did not remain confined to the tri-fold brochures and festival booth."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Health Run on May 1 continued to use the breast health knowledge developed for Xinghua Festival, but the public setting changed once again."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants were no longer gathering around a stationary booth. Instead, they were moving along a running route and passing through different locations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To adapt to these new conditions of time and space, we divided the content of the tri-fold brochure into separate checkpoints along the route, where different team members provided explanations and interactive activities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Thus, from the digital world of Breast Guardian to the tri-fold brochures at Xinghua Festival and finally to the checkpoints of Health Run, the same knowledge was not simply reproduced and redistributed."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Its medium and the actions through which participants encountered it were redesigned for each new setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We later recorded this process as Migration within our Education Lineage."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What needed to be preserved was the underlying knowledge, its relationships, and its educational purpose. The specific format could be redesigned in response to the real context."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-7"
      },
      {
        "type": "feature",
        "key": "education-gallery-xinghua-festival"
      },
      {
        "type": "chapter-link",
        "target": "build-upon-continue-from-here",
        "label": "Unlock reusable resources",
        "imageSrc": "__BASE__assets/education/reusable-resources-icon.png",
        "imageAlt": "Unlock reusable resources"
      },
      {
        "type": "subheading",
        "id": "health-run",
        "index": "3.4.2",
        "title": "Health Run"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**1 May 2026 · 5.4 km · Campus Health Event**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-7",
        "index": "3.4.2.1",
        "title": "CONTEXT："
      },
      {
        "type": "subheading",
        "id": "when-knowledge-began-to-move",
        "index": "3.4.2.1.1",
        "title": "When Knowledge Began to Move"
      },
      {
        "type": "prose",
        "paragraphs": [
          "After Xinghua Festival, we did not create an entirely new set of breast health educational content."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The foundational knowledge, information about risks and warning signs, healthy behaviors, and pathways to professional medical support developed for the tri-fold brochure were all retained."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, May 1 presented a different public setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants were completing a 5.4 km health run. They were unlikely to remain in front of a display board or table for an extended period. Instead, learning took place through continuous movement, brief stops, and repeated departures."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To accommodate this rhythm, we divided the information previously concentrated in the tri-fold brochure into different checkpoints along the route."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Team members provided explanations and interactive activities at each checkpoint."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Each station covered only part of the educational content. After a brief interaction, participants continued along the route, with successive stations collectively forming a complete health education pathway."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Information that had previously required continuous reading on a single sheet of paper was thus given a rhythm suited to physical movement."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/health-run.png",
        "width": 1536,
        "height": 1024,
        "alt": "Health run"
      },
      {
        "type": "subheading",
        "id": "participation-5",
        "index": "3.4.2.2",
        "title": "PARTICIPATION："
      },
      {
        "type": "subheading",
        "id": "health-questions-in-a-young-adult-context",
        "index": "3.4.2.2.1",
        "title": "Health Questions in a Young Adult Context"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The main participants in Health Run were university students, young adults, and campus staff, bringing breast health into a different everyday context from Xinghua Festival."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "On-site discussions more readily touched on body image, weight management, staying up late, stress, and everyday lifestyle habits."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For many younger participants, breast health was not a distant subject concerned only with disease. It was connected to their daily routines, emotions, exercise habits, and ways of understanding their own bodies."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore did not design the checkpoints as a simple relay of knowledge quizzes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "While introducing breast health information, team members also responded to questions raised by participants along the route."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This allowed Cognitive and Affective functions to operate together within the activity."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants could gain information about health risks and healthy behaviors while also relating that information to their own everyday choices."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Here, Self-Care was reflected in a renewed awareness of one's body and lifestyle, while discussions among running companions, friends, and team members naturally brought these questions into Mutual Care."
        ]
      },
      {
        "type": "subheading",
        "id": "design-8",
        "index": "3.4.2.3",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "the-route-became-part-of-the-learning",
        "index": "3.4.2.3.1",
        "title": "The Route Became Part of the Learning"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The most valuable change in Health Run came from the medium itself."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "At Xinghua Festival, a tri-fold brochure could be unfolded, read, examined, and taken home."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Along the running route, however, information had to be divided into shorter segments. Participants' physical movement began to determine when and in what order learning occurred."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Different locations on campus provided a connected series of spatial points for these brief encounters."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Successive checkpoints together created a health education pathway that unfolded as participants moved through the physical environment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We did not construct artificial one-to-one correspondences between campus landmarks and microscopic breast structures."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What truly shaped the design was the manner of movement."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Knowledge no longer waited for participants to remain in one place and finish reading. Instead, it was divided, revisited, and reconnected as participants moved."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In this way, the Experiential function did not arise simply from “taking part in a running event.”"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "It emerged because physical movement itself changed how participants encountered health knowledge."
        ]
      },
      {
        "type": "subheading",
        "id": "continuation-5",
        "index": "3.4.2.4",
        "title": "CONTINUATION："
      },
      {
        "type": "subheading",
        "id": "migration-means-redesign",
        "index": "3.4.2.4.1",
        "title": "Migration Means Redesign"
      },
      {
        "type": "prose",
        "paragraphs": [
          "From Breast Guardian to Xinghua Festival and then to Health Run, we gradually established a clear relationship of Migration."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The game allowed players to spend extended periods exploring, making choices, and revisiting previous experiences."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The tri-fold brochure emphasized quick access to information, face-to-face explanation, and the ability to take educational materials away."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The running route transformed continuous reading into a series of brief encounters distributed across physical space."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The core knowledge was preserved, while the actions through which participants engaged with it changed according to the context."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This pathway also reflected Expansion without erasure, the principle expressed through the Golden Spiral as a visual metaphor within Recursive Care."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "New media did not require previous formats to disappear."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Instead, elements that remained useful were preserved, while new ways of engaging with the content were introduced to suit the needs of each community."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For Health Run, what we preserved was breast health knowledge, Self-Care, and the boundaries of professional medical guidance."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What changed was how that knowledge was organized and experienced."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Health Run therefore extended our understanding of Access into another dimension."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Accessibility depends not only on whether educational materials are available, but also on whether information can adapt to the time, space, and ways of moving available to participants in a particular moment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When knowledge can move with people, it can truly become part of their context."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-8"
      },
      {
        "type": "feature",
        "key": "education-gallery-health-run"
      },
      {
        "type": "chapter-link",
        "target": "build-upon-continue-from-here",
        "label": "Unlock reusable resources",
        "imageSrc": "__BASE__assets/education/reusable-resources-icon.png",
        "imageAlt": "Unlock reusable resources"
      },
      {
        "type": "subheading",
        "id": "creative-reflective-learning",
        "index": "3.5",
        "title": "Creative & Reflective Learning"
      },
      {
        "type": "subheading",
        "id": "music-festival",
        "index": "3.5.1",
        "title": "Music Festival"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**16 May 2026 · Campus Music Festival · Rhythm + Color + Voice**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-8",
        "index": "3.5.1.1",
        "title": "CONTEXT："
      },
      {
        "type": "subheading",
        "id": "science-can-be-entered-through-the-senses",
        "index": "3.5.1.1.1",
        "title": "Science Can Be Entered Through the Senses"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The campus music festival took place in another continuously moving public space, but its rhythm was different from that of Health Run."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants came primarily for music, social interaction, and relaxation. Rather than compressing a complete course into a shorter lecture, we chose entry points that naturally belonged to the event itself: rhythm, color, and sound."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For university students and young adults, these approaches made it easier to transform science from something that required stopping to read into something they could immediately participate in. They also allowed Experiential and Affective functions to play more prominent roles in this educational setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Based on this idea, we designed three main activities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Molecular Rhythm transformed experimental procedures into rhythms that participants could follow physically. Transcript Plan used musical notes, sequences, and coloring to establish visual connections between science and emotional expression. Gene Jukebox invited participants to begin conversations through familiar songs, everyday experiences, and personal feelings."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The three activities did not serve identical purposes. Together, they provided different ways of entering science."
        ]
      },
      {
        "type": "subheading",
        "id": "design-9",
        "index": "3.5.1.2",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "molecular-rhythm",
        "index": "3.5.1.2.1",
        "title": "Molecular Rhythm"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Molecular Rhythm drew directly from the experimental content of our Virtual Laboratory."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We selected procedures from Experiment 3, including sample loading, centrifugation, PCR, and electrophoresis, and rearranged them into a fixed rhythmic sequence."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants used both hands to follow the rhythm and tap corresponding images of laboratory instruments in sequence."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Experimental interactions that had originally taken place through clicks on a screen were therefore given a new physical form. The sequence of experimental procedures was experienced again through rhythm and bodily coordination."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What we preserved was the order and relationship of the experimental steps."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The music festival provided a low-barrier opportunity for initial engagement, so we did not expect a single rhythm challenge to accomplish the work of complete experimental instruction."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When participants became interested in a particular procedure, the Virtual Laboratory and additional experimental resources remained available as pathways for further exploration."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Here, Access meant increasing the number of possible entry points. The same scientific content could be approached through a physical laboratory, a digital platform, or even a bodily movement lasting only a few dozen seconds."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/molecular-rhythm.png",
        "width": 1536,
        "height": 1024,
        "alt": "Molecular rhythm"
      },
      {
        "type": "subheading",
        "id": "transcript-plan",
        "index": "3.5.1.2.2",
        "title": "Transcript Plan"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our second entry point came through color."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Transcript Plan used the directional flow of the central dogma as the basis for a creative activity. Musical notes were arranged into sequences, which participants then interpreted and colored to express their emotions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To achieve this, we preserved the structural relationship in which information is read in a particular direction and gives rise to a new form of expression. At the same time, participants were free to complete their bookmarks according to their own feelings."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This analogy maintained clear scientific boundaries."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Musical notes are not equivalent to nucleotides, and the interpretation of music does not simulate actual transcription and translation inside a cell."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The analogy served as an entry point, connecting an abstract biological process with participants' familiar experiences of music before offering interested learners a path back to accurate scientific explanations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Color also created space for Self-Care."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The same template could be completed in entirely different colors by different participants. The scientific structure provided a common starting point, while the finished creations preserved each person's emotions and individual expression."
        ]
      },
      {
        "type": "subheading",
        "id": "participation-6",
        "index": "3.5.1.3",
        "title": "PARTICIPATION："
      },
      {
        "type": "subheading",
        "id": "gene-jukebox",
        "index": "3.5.1.3.1",
        "title": "Gene Jukebox"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Gene Jukebox brought personal expression further into interpersonal communication."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants could begin with a familiar song, discuss the everyday situations, emotions, or memories associated with it, and leave behind their own written reflections."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Some entered the activity through experimental rhythms. Others preferred to spend time with colors. Still others did not begin expressing themselves until they started talking about a particular song."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This allowed dialogue / mutual learning to emerge in a relaxed, informal setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our team provided scientific themes and an activity structure, while participants brought their own musical experiences, emotions, and interpretations into the interaction."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Mutual Care did not depend on a formal discussion-based lesson. It could begin with listening to another person's expression, responding to a melody, or sharing one's own understanding."
        ]
      },
      {
        "type": "subheading",
        "id": "continuation-6",
        "index": "3.5.1.4",
        "title": "CONTINUATION："
      },
      {
        "type": "subheading",
        "id": "a-mechanism-that-travelled",
        "index": "3.5.1.4.1",
        "title": "A Mechanism That Travelled"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Molecular Rhythm did not remain on the festival lawn after May 16."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "On July 25, the same fixed rhythmic sequence and core interactive mechanism were introduced into a new setting at CCiC / SynBioPunk, where they were deployed again under different organizational arrangements and venue conditions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For us, this represented a clear instance of Redeployment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The core scientific relationships and interaction mechanism were preserved, while the context of use and the ways participants engaged with the activity could be rearranged to suit the new setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This second use also added another type of relationship to our Education Lineage."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Migration emphasizes how educational content is redesigned for a new medium. Redeployment, by contrast, demonstrates how a relatively stable mechanism can be brought into another setting and used again."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Both reflect Expansion without erasure, expressed visually through the Golden Spiral: expansion does not require earlier formats to disappear. New opportunities for participation can continue to develop while preserving the essential relationships that made earlier practices meaningful."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The music festival ultimately offered us a simple reminder: different people do not have to enter science through the same doorway."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Some prefer to operate something, others enjoy coloring, and still others want to tell their own stories."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For Education, the value of creating additional entry points lies in allowing more people to begin with familiar perceptions and experiences, and then decide whether to continue toward a deeper scientific understanding."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-9"
      },
      {
        "type": "feature",
        "key": "education-gallery-music-festival"
      },
      {
        "type": "chapter-link",
        "target": "build-upon-continue-from-here",
        "label": "Unlock reusable resources",
        "imageSrc": "__BASE__assets/education/reusable-resources-icon.png",
        "imageAlt": "Unlock reusable resources"
      },
      {
        "type": "subheading",
        "id": "breast-guardian",
        "index": "3.5.2",
        "title": "Breast Guardian"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Built & Piloted · 3 Life-Stage Routes · N=24 Paired Evaluation · 42.5 min Average Playtime**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-9",
        "index": "3.5.2.1",
        "title": "CONTEXT:"
      },
      {
        "type": "subheading",
        "id": "the-same-knowledge-enters-different-lives",
        "index": "3.5.2.1.1",
        "title": "The Same Knowledge Enters Different Lives"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Breast health knowledge can be organized into a consistent set of medical facts. However, when that knowledge enters everyday life, it encounters different pressures, relationships, and choices."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Children may understand breast health through their mothers, peers, and the bodily changes associated with growing up."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Young and middle-aged adults face pressures involving work, sleep, social obligations, self-perception, and bodily signals."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For older adults, decisions may be intertwined with postponed health examinations, family communication, unreliable health information, and concerns about becoming a burden to their families."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To bring these differences into Education, Breast Guardian was designed around three complete life-stage routes: childhood, young and middle adulthood, and older adulthood."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Themes that had repeatedly emerged during our earlier public activities—including family communication, work and life pressures, body image, aging, and screening—were reorganized into the narrative and nine memory nodes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The three routes therefore shared core medical knowledge while presenting different everyday contexts."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This design continued a fundamental principle of Recursive Care: learners can begin with experiences that feel familiar before gradually developing an understanding of other people's circumstances."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Self-Care provides a recognizable starting point, while the three life stages place health questions within family and intergenerational relationships, making Mutual Care part of the narrative itself."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/breast-guardian.png",
        "width": 1536,
        "height": 1024,
        "alt": "Breast guardian"
      },
      {
        "type": "subheading",
        "id": "design-10",
        "index": "3.5.2.2",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "choices-need-consequences",
        "index": "3.5.2.2.1",
        "title": "Choices Need Consequences"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Breast Guardian combines visual novel storytelling with role-playing game (RPG) mechanics."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Players begin with conflicts drawn from everyday life and enter the brain's memory center, where they confront choices made in the past."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These choices continue to influence abilities, Symptom Boss encounters, the microscopic breast city, and the final medical report."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Later in the game, Future Hospital brings triple-negative breast cancer (TNBC), synthetic biology, and circular RNA (circRNA) into the same fictional world."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Choices in the story are always shaped by real-life circumstances."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A person may understand that staying up late can be harmful to health while still facing work that must be completed the next day. Someone may recognize the importance of medical examinations while worrying about the burden that illness could place on their family."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To encourage players to reflect on these tensions, we first allow everyday situations to create pressure. We then reconnect the narrative with health knowledge and possible real-world actions through Memory, Choice, Consequence, and Recognition."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Affective and Cognitive learning therefore take place within the same process."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The narrative situates medical information within a particular person's life, while medical knowledge helps players reinterpret the consequences they have just experienced."
        ]
      },
      {
        "type": "subheading",
        "id": "first-playthrough-second-playthrough",
        "index": "3.5.2.2.2",
        "title": "First Playthrough, Second Playthrough"
      },
      {
        "type": "prose",
        "paragraphs": [
          "During the first playthrough, certain choices cannot be immediately undone. Players must continue the story while carrying the consequences of their earlier decisions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The second playthrough gradually opens opportunities to revisit previous events and make different choices."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We eventually summarized this design in one sentence:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The first playthrough gives choices weight; the second gives reflection room."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This design allows players to deliberately experiment with different choices and return to the same questions after seeing their consequences."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "One participant wrote in the open-ended feedback:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "> “I deliberately chose the wrong options to see the bad endings, and ended up remembering those consequences.” > >"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For us, this comment captured the educational value of the second playthrough."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Mistakes can leave behind experiences, while the opportunity to choose again allows those experiences to inform subsequent judgments."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The three life-stage routes are also not restricted according to the player's actual age."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A familiar life stage may provide an initial entry point, but the other two routes remain available, allowing players to explore health decisions shaped by different ages, family relationships, and real-world constraints."
        ]
      },
      {
        "type": "subheading",
        "id": "evidence-3",
        "index": "3.5.2.3",
        "title": "EVIDENCE："
      },
      {
        "type": "subheading",
        "id": "what-24-players-told-us",
        "index": "3.5.2.3.1",
        "title": "What 24 Players Told Us"
      },
      {
        "type": "prose",
        "paragraphs": [
          "To evaluate the complete game experience, we adopted a paired pre-test → full gameplay → post-test design."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Of the 26 questionnaires collected, 24 formed valid matched pairs, giving a valid response rate of 92.3%."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The same participants completed all three life-stage routes and Future Hospital."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The average gameplay duration was 42.5 minutes, with a standard deviation of 9.8 minutes and a range of 28–65 minutes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Across six core knowledge questions, the mean percentage of correct answers increased from 57.6% to 83.3%, an improvement of 25.7 percentage points."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For knowledge concerning TNBC targets, correct responses increased from 37.5% to 79.2%."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Except for the question concerning appropriate professional medical care, which already had a relatively high pre-test score, the pre-test to post-test differences for the other five knowledge questions all reached p < 0.05."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Self-reported results from Future Hospital also indicated that 22 of 24 participants reported gaining at least some new relevant understanding after the experience."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Among them, 15 of 24 reported that their understanding had deepened considerably or more."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The mean self-reported understanding of the role of synthetic biology in breast cancer treatment increased from 3.04 to 3.63, while perceptions of the potential value of RNA-based medicines, including circRNA, increased from 2.71 to 3.46."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Open-ended responses provided additional context for these numerical results."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A sense of responsibility for family health appeared in 13 of 24 responses. Memories related to Symptom Boss encounters appeared in 11 of 24. Reflections on lifestyle habits such as staying up late and consuming alcohol appeared in 10 of 24, while new understanding of synthetic biology or circRNA appeared in 7 of 24."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Together, these findings allowed us to examine how real players interpreted health knowledge, health-related judgments, family relationships, and game mechanics without reducing these complex experiences to a single score."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To make this evidence accessible beyond a written summary, we developed an interactive Breast Guardian Evidence Room, bringing together the paired questionnaire results, open-ended feedback, key findings, and limitations of the evidence."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Evidence Room does not introduce additional conclusions. Instead, it provides an interactive presentation of the evidence discussed in this section, allowing visitors to explore the data, interpretations, and limitations by topic."
        ]
      },
      {
        "type": "feature",
        "key": "education-interactive-evidence-room"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Breast Guardian ultimately brought personal experience, real-life choices, and future medicine into a single world that players could enter, fail within, and revisit."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "It also became an important source of content for subsequent public health Education."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When this knowledge moved beyond the screen into Xinghua Festival and Health Run, the narrative format changed, but its central concerns—bodies, relationships, risks, and access to professional medical support—continued to be preserved."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-10"
      },
      {
        "type": "prose",
        "paragraphs": [
          "[Explore our games](/games)"
        ]
      },
      {
        "type": "subheading",
        "id": "letters-to-my-body",
        "index": "3.5.3",
        "title": "Letters to My Body"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Completed Digital Literary Work · Medical Footnotes · Anonymous Reader Feedback**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-10",
        "index": "3.5.3.1",
        "title": "CONTEXT:"
      },
      {
        "type": "subheading",
        "id": "a-body-built-through-reading",
        "index": "3.5.3.1.1",
        "title": "A Body Built Through Reading"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Education offered by Letters to My Body begins at a different pace from classrooms and games."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The novel transforms the human body into an inhabited world of roads, walls, gardens, rivers, residents, and systems of order."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Disease, immunity, memory, and relationships within the body enter the narrative through characters and events."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Readers do not need to begin with a complete anatomical diagram. Instead, they gradually assemble this world as they read, developing a more personal connection between the body, its characters, and their own experiences."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This is also why we chose literary storytelling to serve an Affective educational function."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Images can quickly establish recognizable objects, while a novel allows certain meanings to remain open."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Themes such as the body and identity, vulnerability, loss, self-love, and the rebuilding of one's relationship with oneself require readers to develop their own understanding over a longer period of engagement."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For Letters to My Body, Self-Care therefore becomes a position from which to read: science and disease can first be approached through how a person experiences their own body, while personal experience remains part of the process of understanding."
        ]
      },
      {
        "type": "subheading",
        "id": "design-11",
        "index": "3.5.3.2",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "literature-and-medical-footnotes",
        "index": "3.5.3.2.1",
        "title": "Literature and Medical Footnotes"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Literature can bring people closer to a subject, but the fictional bodily world must still remain connected to accurate medical explanations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To preserve both the integrity of the narrative and its scientific boundaries, we developed a system of medical footnotes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Characters, spaces, and conflicts carry the story, while footnotes at key points explain receptors, signaling, immunity, blood vessels, the tumor microenvironment, and related medical concepts."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Readers may remain within the story or turn to a footnote when a question arises, before returning to the main text."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This structure connects Affective and Cognitive functions within a single work."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Emotion provides a reason to approach a question, while medical explanations help readers refine their understanding."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The two reading paths remain parallel. Scientific knowledge can exist without interrupting the story, and the story does not have to carry explanatory responsibilities beyond its literary capacity."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Within the earlier Community & Educational Functions section, Letters to My Body represents precisely this combination."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "It first establishes a connection between readers and scientific questions through narrative, then leaves a reliable pathway into medical knowledge for those who wish to explore further."
        ]
      },
      {
        "type": "subheading",
        "id": "the-unmarked",
        "index": "3.5.3.2.2",
        "title": "The Unmarked"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Within the novel, the Unmarked became an important figure connecting literature with the science of our project."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Triple-negative breast cancer cells lack several commonly used receptor markers. In the novel, this scientific characteristic was transformed into the image of beings who had “lost the marks of their identity.”"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This image first brings receptor absence, difficulties of recognition, and the circumstances of disease into the story."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The medical footnotes then return readers to the scientific background of TNBC."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This approach also preserves the complexity that literature requires."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Unmarked are connected to disease mechanisms, but readers may also interpret them as a metaphor for identity, namelessness, vulnerability, and the experience of being defined by others."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Scientific explanations establish the medical boundaries, while literature allows the same image to carry the experiences of different readers."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through this combination, a specialized scientific concept gains an emotional space in which readers can pause and reflect, while still retaining a pathway back to science."
        ]
      },
      {
        "type": "subheading",
        "id": "participation-7",
        "index": "3.5.3.3",
        "title": "PARTICIPATION："
      },
      {
        "type": "subheading",
        "id": "when-the-book-reached-its-readers",
        "index": "3.5.3.3.1",
        "title": "When the Book Reached Its Readers"
      },
      {
        "type": "prose",
        "paragraphs": [
          "After completing the work, we collected reader feedback through an anonymous email channel."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Different readers focused on different aspects of the novel."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Some remembered the Unmarked most vividly, connecting the experience of being unable to be named with their own exhaustion, uncertainty, or bodily experiences."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Others were more interested in the order and interdependence of the body's internal world."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Still others entered through the literary narrative before following the medical footnotes to learn more about TNBC, receptors, and immune mechanisms."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These responses did not converge on one standardized “correct interpretation.” Instead, they allowed dialogue / mutual learning to emerge between writers and readers."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Some readers reflected on vulnerability, self-love, and caring for themselves. Others were more interested in the relationship between being defined and having no name."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The characters and passages that attracted readers' attention did not always match the creators' original expectations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These differences became part of the feedback itself."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our team provided the literary text and its medical pathways, while readers brought their own experiences, questions, and new points of attention back into the conversation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What began as one-way reading therefore developed into dialogue."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Letters to My Body offered a relatively quiet form of Education within our work throughout the year."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "It did not depend on attendance numbers, competition results, or repeated physical operations to create opportunities for participation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Instead, reading itself became a way of entering science."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Affective learning helped readers approach the body and disease. Cognitive learning continued through the medical footnotes. Anonymous feedback then brought individual reading experiences into mutual learning."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The same bodily world was first written by its authors, but continued to find new meanings through the understandings of different readers."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-11"
      },
      {
        "type": "subheading",
        "id": "ethics-debate",
        "index": "3.5.4",
        "title": "Ethics Debate"
      },
      {
        "type": "prose",
        "paragraphs": [
          "**12 Apr 2026 · 8 Debaters · 3 Judges · ~40 Audience Members**"
        ]
      },
      {
        "type": "subheading",
        "id": "context-11",
        "index": "3.5.4.1",
        "title": "CONTEXT："
      },
      {
        "type": "subheading",
        "id": "when-science-meets-a-value-choice",
        "index": "3.5.4.1.1",
        "title": "When Science Meets a Value Choice"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Synthetic biology is increasingly able to answer questions about how life can be changed."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Yet technological capability alone cannot determine how we should choose to act."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To bring this kind of judgment into Education, we organized a campus debate around a central proposition:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Should humanity favor reshaping nature or adapting to it?"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Students were encouraged to develop and examine their positions through evidence, risk, responsibility, and underlying value assumptions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The debate primarily served two Educational Functions: Cognitive and Affective."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Students needed to understand the scientific facts involved in different cases, while also explaining their views on the limits of technological intervention, potential consequences, and human responsibilities toward nature."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A position therefore could not remain a simple statement of support or opposition. It needed reasons that others could question and examine."
        ]
      },
      {
        "type": "subheading",
        "id": "design-12",
        "index": "3.5.4.2",
        "title": "DESIGN："
      },
      {
        "type": "subheading",
        "id": "testing-an-argument-with-real-cases",
        "index": "3.5.4.2.1",
        "title": "Testing an Argument with Real Cases"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Vaccines, gene therapy, and ecological intervention involving water hyacinths became recurring examples throughout the debate."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Vaccines brought the discussion into disease prevention and proactive intervention."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Gene therapy raised further questions about the boundaries of directly modifying biological processes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The ecological example extended the discussion beyond the human body into complex environmental systems."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When the same principle of “reshaping” or “adapting” was applied to different contexts, definitions that initially appeared stable began to face new challenges."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The side favoring active intervention placed greater emphasis on the responsibility to act."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When technology can reduce disease or respond to existing ecological problems, choosing not to intervene may also have consequences."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The opposing side continually questioned unpredictability, irreversibility, the dignity of life, and who has the authority to define what counts as an improvement."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These exchanges moved the discussion beyond factual recall toward the use of evidence and judgments about boundaries."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "They also helped students recognize that the same scientific facts can lead to different conclusions when interpreted through different value assumptions."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/ethics-debate.png",
        "width": 1536,
        "height": 1024,
        "alt": "Ethics debate",
        "className": "wiki-figure--ethics-poster"
      },
      {
        "type": "subheading",
        "id": "participation-8",
        "index": "3.5.4.3",
        "title": "PARTICIPATION："
      },
      {
        "type": "subheading",
        "id": "dialogue-without-a-standard-position",
        "index": "3.5.4.3.1",
        "title": "Dialogue Without a Standard Position"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Throughout the debate, students needed to respond to opposing arguments, revise their own definitions, and explain why a principle might be appropriate in one case but encounter difficulties in another."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Dialogue / mutual learning therefore took place across different positions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participants did not merely express their own judgments. They also needed to understand what evidence others relied upon, what concerns informed their arguments, and whether their disagreements arose from different interpretations of facts or different underlying values."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We did not define reaching a final consensus as the goal of the activity."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The ability to seek evidence, identify value assumptions, understand how different conclusions emerge, and provide reasons for one's provisional position is itself an important part of participating in scientific and social issues."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through the debate, students participated and contributed their arguments."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Their differing perspectives also opened directions for discussion that our team could not have fully provided in advance."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The debate added another distinct form of participation to our Education work."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Virtual Laboratory allowed students to enter experimental processes through direct operations."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Breast Guardian allowed choices to produce consequences within a narrative."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Ethics Debate placed judgment itself within public discussion."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Science education thus extended beyond understanding a technology toward developing the ability to form one's own judgments amid evidence, uncertainty, and competing values."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/participation-dialogue-without-a-standard-position-photo-61.png",
        "width": 1016,
        "height": 1548,
        "alt": "Illustration for Dialogue Without a Standard Position"
      },
      {
        "type": "feature",
        "key": "education-gallery-ethics-debate"
      },
      {
        "type": "chapter-link",
        "target": "build-upon-continue-from-here",
        "label": "Unlock reusable resources",
        "imageSrc": "__BASE__assets/education/reusable-resources-icon.png",
        "imageAlt": "Unlock reusable resources"
      },
      {
        "type": "subheading",
        "id": "digital-long-term-participation",
        "index": "3.6",
        "title": "Digital & Long-term Participation"
      },
      {
        "type": "subheading",
        "id": "long-term-digital-participation",
        "index": "3.6.1",
        "title": "Long-term Digital Participation"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Offline activities have clearly defined beginnings and endings, while digital platforms allow Education to continue over longer periods."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A reader may first encounter our work through a social media post, then return several weeks later through a comment, a submission, or another form of media."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore regard our new media work as a continuous learning pathway. Content should help people understand scientific ideas while gradually creating opportunities for response, creation, and shared expression."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The three Educational Functions introduced earlier—Cognitive, Affective, and Experiential—remain relevant here."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Diagrams, visual articles, and knowledge-based posts primarily help learners establish conceptual understanding. Narratives, picture books, and medical humanities content can bring scientific questions closer to personal experiences. Games, comments, polls, creative activities, and collaborative editing further increase opportunities for learners to participate directly."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Different media can serve multiple functions simultaneously."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The choice of digital content therefore returns to the same fundamental question: What should this format enable learners to experience or accomplish in this particular context?"
        ]
      },
      {
        "type": "subheading",
        "id": "continuation-7",
        "index": "3.6.1.1",
        "title": "CONTINUATION:"
      },
      {
        "type": "subheading",
        "id": "105-days-of-learning",
        "index": "3.6.1.1.1",
        "title": "105 Days of Learning"
      },
      {
        "type": "prose",
        "paragraphs": [
          "The Xiaohongshu initiative \"Synthetic Biology Notes Relay\" was the longest-running component of this digital participation pathway."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We organized 105 activity days into five 21-day units."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "From April 1 to April 21, Learn introduced fundamental concepts."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "From April 27 to May 17, Design explored plasmids, promoters, restriction enzymes, and ligases."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "From May 25 to June 14, Fail & Retry brought unsuccessful electrophoresis results, experimental problems, and repeated attempts into the learning process."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "From June 22 to July 12, the initiative further opened opportunities for credited contributions, voting, and collaborative page creation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Finally, from August 3 to August 23, Pass It On brought together reflections on the year's activities and encouraged the continuation of the relay into another season."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The 21-day units were simply periods used to organize content. Together, the five stages described how readers gradually gained more opportunities to participate along this learning pathway."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This progression also allowed digital Education to move beyond one-way publication toward dialogue / mutual learning."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Early content was primarily organized by our team to communicate scientific information. Over time, an increasing number of questions began to give readers more opportunities to express their own ideas."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Under open-ended prompts such as \"If I had a gene printer,\" readers imagined glowing plants, immunity to every poison, stable emotional states, collectible memories, and genes that could help people recover from alcohol consumption."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Our team subsequently selected and organized some of these actual comments into publicly available creative works, including A Field Guide to Wild Learning."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Individual expressions therefore moved from the comment section back into shared public content."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-12"
      },
      {
        "type": "subheading",
        "id": "participation-9",
        "index": "3.6.1.2",
        "title": "PARTICIPATION："
      },
      {
        "type": "subheading",
        "id": "from-reading-to-contribution",
        "index": "3.6.1.2.1",
        "title": "From Reading to Contribution"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Digital platforms offer different depths of participation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Some people read an educational post and leave. Others ask questions in the comments, participate in polls, or submit their own ideas and creative works."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore distinguish between actions that actually occurred: Receive, Respond, Create / Contribute, and Re-publication."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This allows participation to be described through observable actions rather than treated as a single undifferentiated category."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For example, content about unsuccessful experiments brought aspects of scientific research that are often hidden from public view into the open."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Unsuccessful electrophoresis results, laboratory records, traces left by gloved hands, and the process of trying again collectively demonstrated that scientific practice involves repeated judgment and revision."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Other open-ended prompts invited readers to reorganize scientific possibilities through their own language and imagination."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When these contributions were selected, organized, and published again by the team, a complete pathway of Respond → Contribute → Re-publication emerged."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Here, we maintain a strict distinction concerning Shape."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Comments and collaborative creation can demonstrate that participants have contributed. However, we only record an input as Shape when it leads to an identifiable change in a course, tool, or subsequent design, and when the result of that change can be traced."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This boundary allows Digital Engagement to demonstrate genuine depth of participation without presenting every interaction as a product iteration."
        ]
      },
      {
        "type": "subheading",
        "id": "design-13",
        "index": "3.6.1.3",
        "title": "DESIGN:"
      },
      {
        "type": "subheading",
        "id": "different-media-different-entries",
        "index": "3.6.1.3.1",
        "title": "Different Media, Different Entries"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Long-term digital participation did not take place exclusively on social media platforms."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Long-form visual articles published through our official WeChat account, circRNA educational materials, breast health content, visual explanations of the central dogma, and the children's picture book A Seed Planted in the Heart together provided another set of digital entry points."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For topics requiring learners to establish a knowledge structure quickly, we made greater use of diagrams and long-form visual content."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When age-appropriate visual expression was needed, picture books used characters and illustrations to make science more approachable for children."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When learners needed more time to explore bodily experiences and complex emotions, Letters to My Body offered greater space for language, imagination, and medical footnotes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This division of roles was consistent with the earlier Education Portfolio Optimization framework."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The number of formats has no inherent value. A medium is worth retaining only when it serves a clear educational function."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "An important judgment established in our earlier design continues to apply here: images, writing, games, and digital tools change how learners approach educational content."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The same topic can therefore have multiple entry points, provided that each format serves a distinct purpose."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Build Upon Resources**"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-13"
      },
      {
        "type": "subheading",
        "id": "bio-memory-match",
        "index": "3.6.1.3.2",
        "title": "Bio Memory Match"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Lightweight digital tools serve shorter learning tasks that learners can return to repeatedly."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Bio Memory Match is built around memory-matching mechanics. It supports switching between Chinese and English, accommodates one to four players, and offers different game sizes with 8, 16, 20, or 36 cards."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Eighteen categories of life science and synthetic biology concepts are represented through matching cards."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Players must rely on spatial memory to locate corresponding cards. As the difficulty increases, they need to remember more card positions and associated information simultaneously."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To help learners move beyond memorization toward understanding, the Field Guide provides additional biological explanations for each category."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "After developing initial familiarity through repeated card matching, players can return to the Field Guide to explore concepts such as ribosomes, DNA, RNA, plasmids, promoters, proteins, enzymes, biosensors, fluorescent proteins, metabolic pathways, antibodies, vaccines, and genetic circuits."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Multiplayer mode introduces another layer of observation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Players must remember not only the cards they reveal themselves but also information exposed by other players, using it to adjust their subsequent decisions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Memory, competition, and observation of peers therefore become part of the same game experience."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Beyond the online version, we also adapted the same mechanism into physical playing cards and used them in real-world exchange activities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The digital version supports bilingual use, adjustable difficulty, and independent practice, while the physical version is more suitable for face-to-face participation among multiple players."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For a tool of this kind, we do not need to expand it into a separate, large-scale Education project."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Its value lies precisely in serving a clearly defined learning task: giving fundamental scientific concepts more opportunities to be encountered, remembered, and understood through lightweight, repeatable gameplay."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/design-photo-65.png",
        "width": 2400,
        "height": 1855,
        "alt": "Illustration for Bio Memory Match"
      },
      {
        "type": "prose",
        "paragraphs": [
          "[Explore our games](/games)"
        ]
      },
      {
        "type": "subheading",
        "id": "circrna-bomb-cat",
        "index": "3.6.1.3.3",
        "title": "circRNA Bomb Cat"
      },
      {
        "type": "prose",
        "paragraphs": [
          "How can we make the logic underlying therapeutic vaccines something learners must actively judge and respond to, rather than merely read about?"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "circRNA Bomb Cat is a strategic card game developed around our TNBC circRNA vaccine project."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Players take on the role of teams developing and protecting therapeutic strategies. Within the deck, they encounter hidden Tumor Outbreak cards, limited supplies of circRNA Vaccine, immune escape, and constantly changing risks."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The game does not attempt to simulate real clinical treatment in its entirety."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Instead, it transforms selected key relationships from our project into game mechanics that players can choose, discuss, and experience."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "During each turn, players may use action cards, combine biological components, interfere with other players, or prepare for future risks. They must then draw a card from the deck."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "If a player draws a Tumor Outbreak card without possessing a circRNA Vaccine, they are eliminated."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "If they use a vaccine, the immediate crisis can be temporarily resolved. However, the used vaccine enters the Immune Memory Zone and does not return to the deck."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Protection is therefore not a button that can be pressed indefinitely. It is a limited resource."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The game's construction system further introduces engineering thinking."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Individual biological components have limited effects on their own. Once a player assembles three core components, they can form a more complete construct."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Adding LNP delivery can further enhance the construct's targeting capability within the game's rules."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through these mechanisms, players can encounter concepts such as modular design, delivery, tumor heterogeneity, immune escape, monitoring, and uncertainty in treatment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The interface also displays the number of remaining Tumor Outbreak cards and the current size of the deck."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Risk is therefore no longer entirely hidden. It becomes something players can observe, compare, and incorporate into their decisions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Multiplayer mode brings judgment further into relationships between participants."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Players must observe opponents, anticipate risks, discuss strategies, and revise their decisions through repeated successes and failures."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, the educational value here does not lie in assuming that multiplayer gameplay automatically constitutes Mutual Care."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Rather, it lies in bringing scientific concepts into choices, consequences, judgment, and communication."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "[Explore our games](/games)"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Digital Engagement ultimately extended the duration of Education and increased the number of ways participants could enter it."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "After a classroom session ends, learning can begin again through a post, a comment, a card, or a collaboratively created work."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Scientific knowledge published by the team can also find new forms of expression through readers' responses."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For us, the Access expanded by digital platforms lies precisely in this possibility: people can return to science at different times, through different formats, and at different depths of engagement."
        ]
      }
    ]
  },
  {
    "id": "recursive-development",
    "index": "4",
    "kicker": "Education",
    "title": "Recursive Development",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "Once an Education practice enters a real-world setting, participants bring back new questions, ways of engaging, and judgments."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What truly matters is whether these inputs inform what happens next: how they are interpreted, whether they lead to changes in a course, tool, or approach to implementation, and whether those changes subsequently return to real settings for further use or examination."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We therefore apply strict criteria when using the term Shape."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Participate means that learners genuinely engage in an activity or learning process. Contribute means that they offer questions, judgments, creative works, or suggestions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Only when these inputs can be traced to an identifiable subsequent change, and the revised design continues into real-world use or evaluation, do we record the process as Shape."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This evidence chain helps us distinguish between “someone provided feedback” and “participants actually changed the Education design.”"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-14"
      },
      {
        "type": "subheading",
        "id": "participation-that-changed-the-design",
        "index": "4.1",
        "title": "Participation That Changed the Design"
      },
      {
        "type": "subheading",
        "id": "pilu-town-2",
        "index": "4.1.1",
        "title": "Pilu Town"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Second-grade and fourth-grade students in Pilu Town used the same Gram Staining experiment in the Virtual Laboratory."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The two age groups interacted with the program differently. Younger students relied more heavily on colors, touchscreen interactions, and immediate prompts, while older students more frequently paused to examine relationships among the laboratory environment, instruments, reagents, and experimental steps."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When we compared these two experiences, we found that the underlying problem was concentrated at the same point: before performing their first operation, learners had not yet developed a sufficient understanding of the experimental purpose, environment, materials, and safety boundaries."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To address this issue, we moved Safety, Theory, Instruments, and Reagents to the introductory stage of each experiment while retaining access to these materials for review during the experimental process."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This changed where learning began within the platform. Experimental education no longer started with the first click. It now began with what learners needed to understand before entering the experiment itself."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The revised structure subsequently entered further teaching contexts, allowing participants' actual use of the platform to form a traceable chain of Shape."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This case also demonstrates that the value of feedback does not depend on whether participants can directly propose a product solution."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The students did not tell us to “move the four modules to the beginning.” Instead, their pauses, attempts to locate information, and ways of operating the program revealed a problem with the entry structure."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "It was the responsibility of the designers to interpret these observations and translate that interpretation into a concrete change that could be used again."
        ]
      },
      {
        "type": "subheading",
        "id": "synbio-classroom-2",
        "index": "4.1.2",
        "title": "Synbio Classroom"
      },
      {
        "type": "prose",
        "paragraphs": [
          "A different form of Shape emerged in Synbio Classroom."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "On August 9, after completing wet-lab experiments, a research-process game, and plasmid design activities, 16 students preparing to enter Grade 11 continued asking how their choices of biological components would affect subsequent amplification, restriction digestion, ligation, transformation, and verification."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The original teaching plan included only one virtual exercise related to PCR and electrophoresis."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "However, the students' questions had taken the class beyond what the planned final session could adequately address."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The instructors therefore adjusted the course on site, expanding the single exercise into a complete nine-experiment guided walkthrough."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The nine-experiment Virtual Laboratory had already been completed before this session."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "What changed that day was the teaching route, the pace of instruction, and the role the tool played within the classroom."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The revised route was immediately introduced to the same group of students. As they progressed through the complete workflow, they continued asking which experimental steps could be affected by particular design choices and where they should begin investigating when an experiment failed."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Pilu Town changed the product's entry structure. Synbio Classroom changed how the product was used in teaching."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These two evidence chains operated at different levels, but they shared the same principle: real participation generated new information, the team made changes in response, and those changes continued into subsequent learning processes."
        ]
      },
      {
        "type": "subheading",
        "id": "education-lineage",
        "index": "4.2",
        "title": "Education Lineage"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Change does not occur only within an individual product."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Throughout the year, some forms of knowledge, educational resources, and interactive mechanisms moved beyond their original settings and continued to be used in new communities and media."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We use Education Lineage to document these connections, allowing us to trace what an educational practice leaves behind and where those outcomes go next."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The progression from Breast Guardian → Xinghua Festival → Health Run formed a clear example of Migration."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When the breast health knowledge and relationships between risks and actions developed in the game entered Xinghua Festival, they were reorganized into a tri-fold brochure that allowed participants to locate information quickly, receive face-to-face explanations, and take the material home."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "At Health Run, the same content was divided again into checkpoints distributed along the running route."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The core knowledge was preserved, while the actions through which participants encountered it changed according to the setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The relationship between the Virtual Laboratory and Hailun represented Continuity."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "After the initial connection established through Winter Outreach, a teacher in Hailun independently introduced the Virtual Laboratory into the classroom without our team being present, and continued using it during subsequent self-study periods."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The most important change occurred on the side of the users."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The same community gained another opportunity to engage with Education, while the teacher moved beyond participating in an activity to becoming an active user of the educational resource."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Molecular Rhythm provided an example of Redeployment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The fixed rhythmic sequence and core interactive mechanism used during the campus music festival in May were brought into a new setting at CCiC / SynBioPunk on July 25."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The mechanism itself remained stable, while the venue, participants, and organizational arrangements changed."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These relationships gradually transformed our educational practices throughout the year into a network with identifiable origins and directions of change."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Migration records how content is redesigned for new settings."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Continuity records how the same community continues to engage with Education."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Redeployment records how an established mechanism is brought into another environment."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Iteration and Shape further document how participants' inputs lead to changes in products or courses."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Together, these relationships constitute our Education Lineage."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-15"
      },
      {
        "type": "subheading",
        "id": "dbtl-recursion",
        "index": "4.2.1",
        "title": "DBTL & Recursion"
      },
      {
        "type": "prose",
        "paragraphs": [
          "These relationships ultimately return to DBTL — Design, Build, Test, Learn."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In the Virtual Laboratory, the use of the program in Pilu Town allowed a round of Test to generate new Learn outcomes, which subsequently informed the next round of Design."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "In Synbio Classroom, the real classroom likewise provided information beyond what had been anticipated in the original plan, leading to an immediate adjustment of the teaching design."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Here, DBTL describes a concrete pathway for iteration. It allows information generated by participants to inform subsequent design decisions."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Recursive Development, however, describes a broader set of relationships."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "One activity can generate materials for another. A product can become part of a new course. A community can return to resources it has previously encountered. An established interactive mechanism can be deployed again in a different setting."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "An earlier educational practice therefore does not lose its significance when the activity ends."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The knowledge, relationships, tools, and questions it leaves behind may all become conditions for what happens next."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "At this point, the three strands of design discussed earlier come together again."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Recursive Care helps us determine whose experiences, relationships, and conditions of access should continue to be preserved as Education expands."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Education Portfolio Optimization helps us select and combine educational formats according to the needs and constraints of specific contexts."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Recursive Development documents how those designs continue to change after encountering real participation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The cycle of Education therefore comes full circle through a simple question:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When real people enter the process, what changes because of their participation?"
        ]
      },
      {
        "type": "subheading",
        "id": "external-reflection-expert-consultation",
        "index": "4.2.2",
        "title": "External Reflection & Expert Consultation"
      },
      {
        "type": "prose",
        "paragraphs": [
          "Real participation helps us examine whether courses and tools actually work."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "External exchanges offer another way to examine our approach: when we attempt to define what constitutes good Education, can our judgments withstand questions from people with different educational experiences?"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "On July 12, during a discussion at the CCiF Poster Session, Ambassador Teri raised a question that had a direct influence on our work."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The quality of Education cannot be demonstrated simply by accumulating more activities. More importantly, we need to examine whether participants' feedback has genuinely informed subsequent design."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This question prompted us to adopt stricter evidence standards."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "From that point onward, we no longer used “receiving feedback” as a general description for every interaction."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Instead, we distinguished between participate, contribute, and shape."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Only when participants' inputs could be traced to a specific change, and that change continued into subsequent use or examination, did we record it as Shape."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Under these criteria, Pilu Town and Synbio Classroom became the two clearest examples presented in this chapter."
        ]
      },
      {
        "type": "subheading",
        "id": "mid-apr-2026-expert-consultation-medical-education-medical-humanities",
        "index": "4.2.2.1",
        "title": "Mid-Apr 2026 · Expert Consultation · Medical Education & Medical Humanities"
      },
      {
        "type": "prose",
        "paragraphs": [
          "For medical education itself, we also wanted to examine a more fundamental question."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "When we emphasize learners' experiences, bodies, and agency, can these genuinely serve as a sound starting point for the design of medical education?"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To explore this question, we sought a dedicated consultation on medical education and medical humanities with Professor Yu Shuangcheng."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Professor Yu is a professor at the School of Public Health, Jilin University, a Distinguished Teaching Expert of Jilin Province, and a member of the Ministry of Education's Teaching Steering Committee for Medical Humanities Education and General Practice. He has long been involved in teaching and research related to medical education and the medical humanities."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "We introduced him to the overall direction of our Education work and invited him to review our thinking on learners' experiences, medical humanities, and educational design."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "During the consultation, Professor Yu particularly agreed with a statement central to our approach:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "> “Medical education is directed first toward real people, rather than abstract recipients of knowledge.” > >"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "His feedback helped us further clarify the starting point of Self-Care within Recursive Care."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Before learners enter medicine or science, they already carry their own bodily experiences, relationships, concerns, and judgments."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Educational design should therefore first make room for these experiences before expanding toward scientific knowledge, other people, and professional resources."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "This understanding subsequently informed our continued examination of Vaccine Classroom, Breast Guardian, public health activities, and the Virtual Laboratory."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Where learners begin, whether they retain the ability to make choices, and whether they can access the understanding and support needed to move forward are all matters that deserve deliberate design, just as scientific knowledge itself does."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The questions raised at CCiF encouraged us to apply stricter standards when determining whether participation had genuinely changed Education."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Professor Yu's consultation helped us further clarify the kind of person from whom Education should begin."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These two forms of external feedback ultimately converged on the same principle:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Education must listen to real people, and what it hears must have the opportunity to inform what happens next."
        ]
      }
    ]
  },
  {
    "id": "build-upon-continue-from-here",
    "index": "5",
    "kicker": "Education",
    "title": "Build Upon｜Continue from Here",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "The resources below collect the frameworks, guides, teaching materials and open tools developed throughout our Education practice. Each resource is first introduced in its original context; This page provides a consolidated entry point for reuse and further adaptation."
        ]
      },
      {
        "type": "subheading",
        "id": "methods-guides",
        "index": "5.0.1",
        "title": "Methods & Guides"
      },
      {
        "type": "prose",
        "paragraphs": [
          "This section brings together resources that explain why particular educational approaches were designed and how others can continue using them."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These include five thematic Education Whitepapers, two design and implementation guides, and the Virtual Laboratory White Paper and implementation documentation."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Together, these documents record our design principles, approaches to decision-making, boundaries of evidence, and methods that can be adapted to different educational contexts."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-16"
      },
      {
        "type": "subheading",
        "id": "implementation-packages",
        "index": "5.0.2",
        "title": "Implementation Packages"
      },
      {
        "type": "prose",
        "paragraphs": [
          "For six major educational practices, we further prepared implementation packages designed to support future redeployment:"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Winter Outreach；Vaccine Classroom；Synbio Classroom；Xinghua Festival；Health Run；Music Festival。"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These packages preserve the original learning contexts, educational objectives, design logic, preparation methods, and implementation processes."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "They also distinguish between documented historical practices and parameters that future users need to determine according to their own environments."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-17"
      },
      {
        "type": "subheading",
        "id": "teaching-materials",
        "index": "5.0.3",
        "title": "Teaching Materials"
      },
      {
        "type": "prose",
        "paragraphs": [
          "This section contains classroom teaching resources that others can directly use or adapt."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "To help teachers and other teams quickly identify materials suitable for their learners, we organize them according to their primary educational stages."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Some resources can be used across different age groups. During actual teaching, the depth of explanation can be adjusted according to students' prior knowledge, available classroom time, and learning objectives."
        ]
      },
      {
        "type": "subheading",
        "id": "primary-school",
        "index": "5.0.3.1",
        "title": "Primary School"
      },
      {
        "type": "prose",
        "paragraphs": [
          "- **Vaccine Classroom PPT**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "- **Little Scientist: Giving Bacteria an ID**"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-18"
      },
      {
        "type": "prose",
        "paragraphs": [
          "- **Life Science Adventure**"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-19"
      },
      {
        "type": "subheading",
        "id": "junior-high-school",
        "index": "5.0.3.2",
        "title": "Junior High School"
      },
      {
        "type": "prose",
        "paragraphs": [
          "- **Air-to-Bread Classroom PPT**"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-20"
      },
      {
        "type": "subheading",
        "id": "senior-high-school",
        "index": "5.0.3.3",
        "title": "Senior High School"
      },
      {
        "type": "prose",
        "paragraphs": [
          "- **Synbio Classroom**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "- Lesson 1 — Laboratory Safety & Introduction"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-21"
      },
      {
        "type": "prose",
        "paragraphs": [
          "- Lesson 2 — PCR"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-22"
      },
      {
        "type": "prose",
        "paragraphs": [
          "- Lesson 3 — Crude DNA Extraction"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-23"
      },
      {
        "type": "prose",
        "paragraphs": [
          "- Lesson 4 — Life Science Monopoly / Research Process Game"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-24"
      },
      {
        "type": "prose",
        "paragraphs": [
          "- Lesson 5 — Plasmid Design"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-25"
      },
      {
        "type": "prose",
        "paragraphs": [
          "- Winter Outreach presentations"
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-26"
      },
      {
        "type": "subheading",
        "id": "creative-reflective-works",
        "index": "5.0.4",
        "title": "Creative & Reflective Works"
      },
      {
        "type": "prose",
        "paragraphs": [
          "This section brings together Education works that can be independently read, viewed, and used as starting points for further discussion and reflection."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These include Letters to My Body, educational picture books, and digital publications developed through long-term digital participation, along with other creative and medical humanities works."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "These resources are not intended to guide learners through a fixed sequence of instructional steps."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Instead, through literature, storytelling, visual narratives, and sustained reading, they allow slower and more open connections to develop between the body, health, science, and personal experience."
        ]
      },
      {
        "type": "feature",
        "key": "education-media-group-27"
      },
      {
        "type": "subheading",
        "id": "open-tools-games",
        "index": "5.0.5",
        "title": "Open Tools & Games"
      },
      {
        "type": "prose",
        "paragraphs": [
          "We have further transformed selected Education content into digital tools and games that learners can directly experience, revisit, and continue exploring."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Unlike one-way reading, these works incorporate operations, choices, feedback, and repeated attempts, making the learning process itself part of the experience."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Virtual Laboratory** An interactive virtual laboratory environment built around molecular biology workflows, connecting experimental procedures with safety, scientific principles, and knowledge of instruments and reagents."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Breast Guardian**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A health-focused narrative game structured around different life stages."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Through memory, choices, behavioral consequences, and challenges, it encourages players to reconsider breast health and lifestyle habits."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Bio Memory Match** A lightweight educational game that transforms synthetic biology concepts into a learning experience through matching, memory, and repeated recognition."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**circRNA Bomb Cat**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A multiplayer strategy card game designed around circRNA vaccines, tumor immune escape, and key scientific concepts from our project."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "It incorporates risk, resource management, and construct design into gameplay-based learning."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "[Explore our games](/games)"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For complete source code and reusable project files that cannot be directly hosted on the Wiki, we have organized the relevant resources in our team's project repository on GitLab."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Those interested in further development or reuse can find the corresponding materials in the JLU-FBH GitLab project."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "**Used or adapted something? Tell us.**"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "If you reuse, translate, adapt or test one of these resources, we would like to hear what changed in your context."
        ]
      },
      {
        "type": "figure",
        "src": "__BASE__assets/education/education-feedback-invitation.png",
        "width": 1560,
        "height": 1560,
        "alt": "Education feedback invitation"
      }
    ]
  },
  {
    "id": "conclusion",
    "index": "6",
    "kicker": "Education",
    "title": "Conclusion",
    "summary": "",
    "blocks": [
      {
        "type": "prose",
        "paragraphs": [
          "Throughout this year, we began with a simple conviction: Different barriers require different educational responses."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Education therefore entered classrooms, laboratories, public spaces, stories, games, and digital platforms. It also became part of the everyday lives of people with different ages, experiences, and relationships."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Recursive Care reminds us that as Education expands into more communities, people's experiences, relationships, and conditions of access should not be erased."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Education Portfolio Optimization helps us select appropriate educational responses according to the needs of specific communities and the constraints of real-world settings."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Genuine dialogue / mutual learning allows participants not only to enter the learning process, but also to contribute through their questions, judgments, and creative works. When a clear chain of evidence can be established, these contributions may further shape educational courses and tools."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "For us, Education therefore has no truly fixed endpoint."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "A question can change the next lesson. A single experience of using a tool can lead to changes in the product itself. An educational resource can also leave our hands and continue to grow through the work of another teacher, student, or team."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "The teaching materials, methods, and tools developed through our practices therefore remain open, creating opportunities for others to adopt, modify, and use them again."
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "As Dewey wrote at the beginning of this Wiki, “Education is a process of living.”"
        ]
      },
      {
        "type": "prose",
        "paragraphs": [
          "Education takes place within life itself, and it continues to evolve as real people enter the process."
        ]
      }
    ]
  }
];

export const educationSections: WikiSection[] = rawSections.map((section) => ({
  ...section,
  blocks: section.blocks?.map((block) => block.type === "figure"
    ? { ...block, src: educationAssetUrl(block.src) }
    : block.type === "chapter-link" && block.imageSrc
      ? { ...block, imageSrc: educationAssetUrl(block.imageSrc) }
    : block.type === "prose"
      ? { ...block, paragraphs: block.paragraphs.map(replaceEducationAssetLinks) }
      : block),
}));
