import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";
import {
  getSafetyFigure,
  type SafetyAssetKey,
  type SafetyLanguage,
} from "./safetyAssets";

// Manuscript: 文案集/project/safe/3.4 Safety and Security.md
export const safetyPage: WikiPageContent = {
  route: "/safety-and-security",
  category: "project",
  chapter: "Project / 07 of 07",
  eyebrow: "",
  title: "Safety and Security",
  lede: "",
  boundary: "",
  visual: "safety-boundary",
  visualLabel: "",
  visualSteps: [],
  facts: [],
  sections: [
    {
      id: "safety-overview",
      index: "",
      kicker: "",
      navLabel: "Overview",
      title: "Overview",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Before the experiment, we collaborated with professionals to develop the ***Laboratory Safety Standards White Paper***, the **White Paper on Implementation and Risk Prevention of Experimental Animal Model Technology**, the **White Paper on Compliance Management and System Construction of Laboratory Animal Models**, their corresponding appendices, and the **Laboratory Safety Equipment User Manual**. These documents provided a theoretical foundation for ensuring the safety and standardization of our experimental procedures. Throughout project implementation, safety requirements were not merely documented but actively integrated into our decision-making process. We conducted risk assessments targeting project-specific aspects, including experimental operations, biological materials, animal experiments, personnel competency, and AI-assisted design. These risks were controlled through measures such as pre-experiment review, personnel training and authorization, standardized procedures, risk classification, virtual pre-experiment practice, and continuous process monitoring. When conducting public engagement activities, we even proactively removed experimental plans with potential risks and redesigned the activity formats based on safety considerations. Through these practices, our Safety and Security contribution became concretely defined, practically implemented, and continuously evaluated and improved through training assessments, experimental records, inspection records, risk reviews, and stakeholder feedback.",
            "Meanwhile, we did not limit safety considerations to the laboratory environment. Through communication with industry professionals, patients, the public, and other iGEM teams, we further recognized that when synthetic biology enters real-world applications, it must address challenges beyond experimental safety, including technology translation, product safety, ethical responsibility, public understanding, and social acceptance. Therefore, we extended our safety concepts into scientific communication, public education, and future application scenarios, attempting to establish a complete connection from **existing knowledge, to project risk identification, to safety-by-design and implementation, and ultimately to real-world application**. We believe that a meaningful Safety and Security contribution is not simply about “preventing accidents”; rather, it enables safety to actively participate in scientific decision-making, be validated through practice, adapt to real-world contexts, and ultimately promote the development of synthetic biology in a safer, more responsible, and sustainable manner.",
          ],
        },
      ],
      hideSectionNumber: true,
      masthead: {
        quote:
          "Synthetic biology holds great promise, but we must always safeguard against accidental or deliberate misuse to uphold biosafety and biosecurity.",
        attribution: "Piers Millett",
        attributionRole: "",
      },
    },
    {
      id: "safety-safe-on-framework",
      index: "",
      kicker: "",
      navLabel: "SAFE ON Framework",
      title: "SAFE ON Framework",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "**SAFE ON** is a Safety and Security framework developed by the JLU-FBH iGEM team, designed to integrate safety principles throughout the entire project lifecycle, from personnel access and experimental design to laboratory operations, scientific communication, and real-world applications.",
            "We believe that safety is not a boundary that restricts scientific innovation, but rather the foundation supporting the responsible development of technology. Therefore, centered on risk prevention and continuous improvement, our team integrated existing laboratory safety standards, risk assessment approaches, biosafety and biosecurity principles, and experimental animal management requirements with our own project context to establish a comprehensive safety system covering **system management, risk assessment, safety facilities, experimental practice, personnel training, and social connection**.",
            "Within the **SAFE ON** framework, **System** establishes the organizational structure and operational mechanisms for safety management; **Assessment** identifies and evaluates Biosafety and Biosecurity risks associated with the project and incorporates assessment outcomes into project decision-making; **Facility** ensures a safe experimental environment through the configuration, maintenance, and proper use of safety equipment; **Experiment** implements safety requirements throughout Dry Lab, Wet Lab, and specific experimental procedures, while utilizing Virtual Laboratory to shift risk prevention earlier in the workflow; **Orientation** ensures that participants acquire safety competencies corresponding to their responsibilities through tiered training, assessments, and emergency drills; **Network** extends safety concepts beyond the laboratory to the scientific community, campus, and society, addressing safety, ethical considerations, and social responsibility as synthetic biology advances toward real-world applications.",
          ],
        },
        getSafetyFigure("0-0safe-on.avif"),
        {
          type: "prose",
          paragraphs: [
            "Through **SAFE ON**, we aim not only to “safely complete an experiment,” but also to ensure that safety is genuinely integrated into every decision regarding **what we do, why we choose to do it, and how we bring technologies into the real world**. In doing so, we seek to promote a closer, continuous, and practical connection between scientific innovation and safety responsibility in the development of synthetic biology.",
          ],
        },
        {
          type: "table",
          headers: ["Dimension", "Practices within SAFE ON", "Contribution"],
          rows: [
            [
              "🧩 System",
              "Establishing the organizational structure and operational mechanisms for safety management",
              "From Individual Safety Practices to Systematic Governance: Embedding Safety into Project Management",
            ],
            [
              "🔍 Assessment",
              "Identifying and assessing project risks, and incorporating the assessment outcomes into project decision-making",
              "From Risk Identification to Risk Management: Implementing Control Measures for Project-Specific Risks",
            ],
            [
              "🏢 Facility",
              "Ensuring a safe experimental environment through the configuration, maintenance, and proper use of safety equipment",
              "Providing Actionable Safety Assurance: Translating Institutional Requirements into the Experimental Environment",
            ],
            [
              "🧪 Experiment",
              "Implementing safety requirements throughout Dry Lab, Wet Lab, and specific experimental procedures",
              "Integrating Safety into Experimental Design: Identifying and Mitigating Potential Risks Before Experimentation",
            ],
            [
              "🎓 Orientation",
              "Tiered training, assessments, and emergency drills",
              "Ensuring Safety through Competency: Enabling the Proper Implementation of Safety Requirements",
            ],
            [
              "🌐 Network",
              "Extending safety concepts beyond the laboratory",
              "Connecting Research and Society: Addressing Safety and Responsibility as Synthetic Biology Enters the Real World",
            ],
          ],
        },
      ],
      hideSectionNumber: true,
    },
    {
      id: "safety-system",
      index: "1",
      kicker: "",
      navLabel: "System",
      title: "System",
      summary: "",
      blocks: [
        {
          type: "table",
          headers: ["Point", "Our Practices", "Values Reflected"],
          rows: [
            [
              "Contribution",
              "Establishing a comprehensive safety management system covering laboratories, animal management, and quality traceability throughout the entire process",
              "Transitioning from individual practices to systematic governance",
            ],
            [
              "Existing Knowledge",
              "Integrating and adapting existing tools and approaches, including regulations, laboratory safety standards, PDCA, and ISO 29993",
              "Transforming existing tools into practical project implementation",
            ],
            [
              "Risk Management",
              "Incorporating risk assessment, personnel management, equipment management, biological materials, and animal-related regulations into the project workflow",
              "Managing risks specific to our own project",
            ],
            [
              "Validation",
              "Ensuring the implementation of safety measures through training assessments, daily inspections, reviews, records, drills, and external audits",
              "Making safety measures executable, traceable, and continuously improvable",
            ],
            [
              "Real-world",
              "Establishing clear responsibilities, standardized procedures, and traceable mechanisms to provide references for future synthetic biology projects",
              "Promoting a safety management model that is practical and scalable",
            ],
          ],
        },
        {
          type: "subheading",
          id: "safety-system-construction",
          index: "1.0",
          title:
            "Safety System Construction: Establishing a Full-process Safety Management System",
        },
        {
          type: "prose",
          paragraphs: [
            "Traditional laboratory safety management often focuses on standardized experimental procedures and emergency responses after accidents occur. However, for synthetic biology projects, safety risks exist throughout multiple stages, including project design, experimental implementation, personnel management, equipment use, and future applications. Therefore, relying solely on safety measures at individual stages is insufficient to meet the requirements of modern synthetic biology research for **Biosafety** and **Biosecurity**.",
            "Based on this understanding, the JLU-FBH iGEM team integrated international laboratory safety management concepts, relevant regulatory requirements, and the characteristics of synthetic biology projects to establish a comprehensive safety management system covering the entire project lifecycle. Centered on **risk prevention**, this system transfers safety responsibilities from institutional management levels to experimental personnel, achieving multi-level coordinated management from system establishment and laboratory operations to individual practices.",
            "This safety system not only ensures the safe implementation of our own project experiments but also provides a reference model for future iGEM teams conducting synthetic biology research, offering a practical framework for responsible safety management.",
          ],
        },
        {
          type: "subheading",
          id: "safety-1-1",
          index: "1.1",
          title: "1.1 Laboratory Safety Management System",
        },
        {
          type: "prose",
          paragraphs: [
            "Before the start of our experiments, we recognized that laboratory safety is not a single control measure implemented at an individual stage, but rather a systematic safety framework jointly established through organizational management, laboratory operations, and individual behaviors. To shift laboratory safety management from **“response after accidents occur”** to **“prevention before accidents occur,”** the JLU-FBH iGEM team developed a three-level laboratory safety management system based on relevant regulations, international laboratory safety management principles, and the team’s practical needs, fostering a safety culture characterized by **“everyone participates and every level takes responsibility.”**",
            "This system consists of three levels:",
          ],
        },
        {
          type: "list",
          items: [
            "**Institutional Level**",
            "**Laboratory Level**",
            "**Individual Level**",
          ],
        },
        getSafetyFigure(
          "1-1-three-level-laboratory-safety-management-system.avif",
        ),
        {
          type: "subheading",
          id: "safety-1-1-1",
          index: "1.1.1",
          title:
            "1.1.1 Institutional Level — Top-Level Design of Safety Management",
        },
        {
          type: "prose",
          paragraphs: [
            "The **Institutional Level** is responsible for the overall planning, operational supervision, and continuous improvement of the laboratory safety system. The team established a **Laboratory Safety Management Committee** and achieved coordination among laboratory safety policy development, safety system supervision, training organization, and emergency response management through clearly defined responsibilities.",
            "The committee adopts the **PDCA (Plan-Do-Check-Act) cycle management model**, transforming laboratory safety management into a continuously optimized and dynamic process rather than a one-time safety requirement.",
            "The committee mainly consists of the following members:",
          ],
        },
        {
          type: "list",
          items: [
            "**Policy Maker**",
            "**Policy Implementers**",
            "**Specialists from the Logistics/Equipment  Department**",
            "**External Safety Experts (Consultants)**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The **Policy Maker** of the Laboratory Safety Management Committee are primarily responsible for the **Plan** and **Act** stages of the PDCA cycle. They regularly organize quarterly meetings and conduct emergency meetings when necessary to collect information regarding laboratory operations and safety conditions. Based on the feedback received, they update and improve laboratory safety policies in a timely manner. After approval by the committee, revised policies are publicly displayed on the official website and at laboratory entrances.",
            "Each version of the laboratory safety policy clearly specifies its implementation standards, version number, and effective date. Previous versions are formally withdrawn to prevent unintended use of outdated documents. Policy Makers also participated in the development of the **Laboratory Safety Standards White Paper**, thereby ensuring the continuous improvement and effective implementation of laboratory safety management.",
          ],
        },
        {
          type: "feature",
          key: "safety-white-paper-1",
        },
        {
          type: "prose",
          paragraphs: [
            "·The **Policy Implementers** of the Laboratory Safety Management Committee are primarily responsible for the **Do** and **Check** stages of the PDCA cycle. They supervise and conduct inspections of the implementation of laboratory safety policies. The inspections focus on identifying potential safety violations, including improper overnight storage of flammable materials, non-compliant disposal of laboratory waste, accumulation of unnecessary items in fume hoods, malfunctioning laboratory equipment, wearing laboratory coats outside designated laboratory areas, improper disposal of gloves, and other unsafe practices.",
            "After each inspection, Policy Implementers complete the **Laboratory Safety Inspection Checklist (Committee Random Inspection Version)** for evaluation and scoring. For laboratories that fail to meet safety requirements during inspections, Policy Implementers have the authority to temporarily suspend laboratory access and require corrective actions until safety standards are restored.",
            "In addition, members of the Laboratory Safety Management Committee are responsible for organizing safety training for relevant personnel. The training is conducted according to the **Four-Level Laboratory Safety Training System** (see the Orientation section for details). The entire process of training and assessment follows the requirements of **ISO 29993: Learning services — Requirements for non-formal education and training**, ensuring that training content is appropriate, procedures are transparent, and assessment methods are fair. Attendance records and assessment results during training are documented using the **Safety Training Sign-in and Assessment Record**.",
          ],
        },
        {
          type: "feature",
          key: "safety-folders-2",
        },
        {
          type: "prose",
          paragraphs: [
            "·**Specialists from the Logistics/Equipment  Department** are primarily responsible for the safe operation of laboratory infrastructure, full life-cycle management of laboratory equipment, and the provision of emergency supplies, ensuring that the physical laboratory environment meets safety standards.",
            "For **infrastructure safety maintenance**, Equipment Management Personnel regularly inspect the laboratory’s electrical systems, ventilation systems (including fume hood and biosafety cabinet exhaust systems), water supply and drainage systems, gas pipelines, and fire protection facilities to ensure that all systems operate properly and comply with national and industry safety standards.",
            "For **emergency supply management**, logistics personnel are responsible for the procurement, replenishment, and expiration-date inspection of emergency materials, including spill response kits, first aid kits, fire extinguishers, eyewash stations, and positive-pressure respirators. These measures ensure that emergency supplies remain available and ready for use whenever needed.",
            "·**External Safety Experts (Consultants)**provide technical consultation, independent review, and professional support for laboratory safety management from an objective and specialized perspective, addressing limitations in the internal team’s expertise and ensuring continuous improvement of the safety system.",
            "For **system auditing and compliance evaluation**, External Safety Experts (Consultants) conduct external audits of the laboratory safety management system at least once every six months. They evaluate its compliance with relevant requirements, including the Work Safety Law, the Laboratory Biosafety General Requirements (GB 19489), and iGEM Safety Policies, provide assessment reports, and propose improvement recommendations.",
            "For **technical review of high-risk projects**, External Safety Experts (Consultants) participate in safety evaluations of high-risk experimental projects involving emerging materials, highly pathogenic microorganisms, gene editing technologies, and other potentially hazardous areas. They identify potential risks from a professional perspective and assist in developing appropriate risk control measures.",
            "For **professional training and knowledge sharing**, External Safety Experts (Consultants) regularly provide specialized training for committee members and laboratory safety managers. Training topics include interpretation of updated laws and regulations, emerging risks such as synthetic biology ethics and AI tool safety, and advanced emergency response technologies.",
            "For **technical support during accident investigations**, External Safety Experts (Consultants) participate in independent investigations when major safety incidents or near-miss events occur. They assist in identifying root causes, provide technical corrective recommendations, and help prevent similar incidents from recurring.",
          ],
        },
        {
          type: "subheading",
          id: "safety-1-1-2",
          index: "1.1.2",
          title:
            "1.1.2 Laboratory Level —Implementation and Control of Safety Practices",
        },
        {
          type: "prose",
          paragraphs: [
            "The **Laboratory Level** is responsible for implementing safety management policies within the actual experimental environment, including laboratory area management, equipment safety management, biological material management, chemical management, waste disposal, and maintenance of emergency facilities.",
            "According to different experimental risks, the team established standardized experimental procedures and developed project-specific safety measures to ensure that all experimental activities are conducted within clearly defined risk boundaries and under appropriate control measures.",
            "Meanwhile, experimental animal-related research follows the principle of **full-process compliance management**, covering model selection, ethical review, experimental procedures, waste disposal, and post-experiment compliance review. This approach establishes a closed-loop management system throughout the entire animal research process.",
            "The **Laboratory Safety Officer** is responsible for:",
          ],
        },
        {
          type: "list",
          items: [
            "**Daily Safety Inspections and Experimental Equipment Maintenance**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For daily safety management, inspections, and equipment maintenance, the Laboratory Safety Officer conducts at least one laboratory safety inspection every day and performs regular inspections of laboratory safety equipment according to the specified schedule (see Section 3.2). All inspection and maintenance activities are documented in the **Equipment Maintenance and Inspection Record**.",
          ],
        },
        {
          type: "feature",
          key: "safety-folders-3",
        },
        {
          type: "list",
          items: ["**Experimental Risk Assessment Review**"],
        },
        {
          type: "prose",
          paragraphs: [
            "For experimental project risk assessments, the Laboratory Safety Officer must review the **Laboratory Risk Assessment Report** submitted by experimental personnel to ensure that its contents are complete and its proposed measures are feasible. For projects involving high-risk substances or new experimental procedures, the Laboratory Safety Officer may organize an ad hoc safety review. Experiments may begin only after approval, and the assessment report must be archived for future reference.",
          ],
        },
        {
          type: "feature",
          key: "safety-folders-4",
        },
        {
          type: "list",
          items: ["**Safety Incident Documentation**"],
        },
        {
          type: "prose",
          paragraphs: [
            "For incident documentation and preliminary investigation, the Laboratory Safety Officer is responsible for immediately recording any safety incidents, near-miss events, or identified safety hazards occurring in the laboratory. The **Laboratory Safety Incident or Near-Miss Record Form** should be completed, including information such as the time and location of the event, personnel involved, preliminary analysis of the causes, and corrective actions already taken.",
            "Major incidents must be reported to the Laboratory Safety Management Committee immediately, and the Laboratory Safety Officer should cooperate with subsequent investigations and follow-up corrective measures.",
          ],
        },
        {
          type: "feature",
          key: "safety-folders-5",
        },
        {
          type: "list",
          items: ["**Safety Training Organization**"],
        },
        {
          type: "prose",
          paragraphs: [
            "For training and drill organization, the Laboratory Safety Officer assists the Laboratory Safety Management Committee in organizing safety training sessions and assessments. In addition, the Laboratory Safety Officer conducts internal laboratory safety drills on a quarterly basis, including chemical spill response, fire evacuation procedures, and eyewash station operation.",
            "The Laboratory Safety Officer is responsible for documenting participation and evaluating the effectiveness of each drill, with all relevant information recorded in the **Safety Drill Record Form**.",
          ],
        },
        {
          type: "feature",
          key: "safety-folders-6",
        },
        {
          type: "list",
          items: ["**Safety Culture Development**"],
        },
        {
          type: "prose",
          paragraphs: [
            "For safety culture development, the Laboratory Safety Officer is responsible for displaying safety signs, operational procedures, and emergency contact information within the laboratory. Regular laboratory safety meetings should also be organized to communicate recent safety conditions and conduct case analyses.",
            "Furthermore, the Laboratory Safety Officer encourages experimental personnel to proactively report potential hazards, fostering a positive safety culture characterized by **“everyone participating in safety and every task following standardized procedures.”**",
          ],
        },
        {
          type: "subheading",
          id: "safety-1-1-3",
          index: "1.1.3",
          title:
            "1.1.3 Individual Level — Final Implementation of Safety Responsibilities",
        },
        {
          type: "prose",
          paragraphs: [
            "The **Individual Level** represents the direct implementation of the safety system by experimental personnel. Before entering the laboratory, all members are required to complete safety training and pass relevant assessments to obtain experimental qualifications.",
            "The training covers:",
          ],
        },
        {
          type: "list",
          items: [
            "**Basic laboratory safety practices**",
            "**Biosafety knowledge**",
            "**Chemical management**",
            "**Emergency response procedures**",
            "**Personal protective equipment (PPE) usage**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "In addition, experimental personnel are required to complete experimental risk assessments to identify potential hazards, preventive measures, and emergency response plans associated with their experimental procedures.",
            "Through personnel competency development, the team ensures that safety management relies not only on institutional requirements and procedural controls but also on active participation from all members to establish a strong safety culture.",
            "**Through the three-level safety management system, the team achieves comprehensive coverage from management policies to experimental implementation and individual behaviors, transforming safety management into a systematic process integrated throughout the entire research workflow.**",
          ],
        },
        {
          type: "subheading",
          id: "safety-1-2",
          index: "1.2",
          title: "1.2 Laboratory Animal Compliance Management System",
        },
        {
          type: "prose",
          paragraphs: [
            "For **experimental animal-related research**, the team established a **full-process compliance management system for laboratory animal use**.",
            "This system follows a closed-loop management process consisting of:",
            "**Experimental Application → Protocol Review → Experimental Implementation → Process Monitoring → Result Review**",
            "Through this approach, the team ensures continuous compliance management throughout the entire lifecycle of animal experiments.",
          ],
        },
        getSafetyFigure(
          "1-2-laboratory-animal-compliance-management-process.avif",
        ),
        {
          type: "prose",
          paragraphs: [
            "**Before** the experiment begins, experimental personnel are required to submit the rationale for animal model selection, experimental objectives, animal numbers, and the proposed animal use plan. The responsible person reviews the scientific validity and compliance of the experimental design, and animal models can only proceed to the experimental stage after approval.",
            "**During** the experimental process, risks are controlled through animal source management, experimental documentation, and standardized operating procedures.",
            "**After** completion of the experiment, record archiving and result review are conducted to ensure the traceability and compliance of the entire experimental process.",
          ],
        },
        {
          type: "feature",
          key: "safety-white-paper-7",
        },
        {
          type: "prose-linked",
          parts: [
            {
              text: "Based on the **Laboratory Animal Compliance Management System**, the team incorporated **scientific necessity, animal welfare, experimental design rationality, and ethical and regulatory requirements** into the pre-experiment review process, transforming these requirements into specific risk assessment criteria. The **Assessment** section further introduces how this compliance management system was applied to the animal experiment design of our project, and how the team conducted ethical and compliance evaluations to shift risk control from the experimental implementation stage to the design stage. ",
            },
            {
              text: "",
              target: "safety-2-1-2",
              label: "Click here to learn more",
            },
          ],
        },
        {
          type: "prose-linked",
          parts: [
            {
              text: "In the actual implementation of the **CirCure** project, we further applied this management system to two key stages: **experimental design and formal application**. First, we utilized the **Experimental Design Assistant (EDA)** to systematically evaluate the animal experiment protocol, incorporating considerations including scientific necessity, sample size determination, the **3R principles**, randomization and blinding, animal welfare, and **humane endpoints** into the early stage of experimental design. Based on this evaluation, we completed the **Animal Use Form** according to iGEM requirements for animal experiments, further confirming the necessity of animal use, experimental design, animal welfare considerations, and safety measures. Subsequent experiments were conducted only after obtaining formal approval. ",
            },
            {
              text: "",
              target: "safety-4-1-2-2",
              label: "Click here to learn more",
            },
          ],
        },
        {
          type: "subheading",
          id: "safety-1-3",
          index: "1.3",
          title: "1.3 Quality Control and Traceability System",
        },
        {
          type: "prose",
          paragraphs: [
            "To ensure the reliability of experimental results and reduce potential safety risks caused by untraceable experimental data, the team established an **Experimental Quality Control and Traceability System**.",
            "This system requires:",
          ],
        },
        {
          type: "list",
          items: [
            "**Recording the sources of experimental materials**",
            "**Maintaining standardized records of experimental procedures**",
            "**Preserving complete experimental results**",
            "**Ensuring the traceability of critical experimental information**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For experimental animal studies, the team records information including animal strain, age, sex, source, and experimental procedures.",
            "Meanwhile, potential impacts caused by variations in experimental conditions are minimized through environmental control, hygiene management, and quality monitoring.",
            "This system not only improves the reliability of experimental results but also provides support for data management and safety supervision in future synthetic biology research.",
          ],
        },
        {
          type: "prose-linked",
          parts: [
            {
              text: "Based on the **Quality Control and Traceability System**, the team applied documentation and quality control requirements to animal-related risk management. Information including **animal models, animal sources, health status, microbial quality, and experimental conditions** was systematically evaluated, and potential biosafety risks were identified and controlled based on the assessment results. The **Assessment** section further demonstrates how this quality control and traceability system was translated into a specific animal biosafety risk assessment workflow for our project. ",
            },
            {
              text: "",
              target: "safety-2-1-3",
              label: "Click here to learn more",
            },
          ],
        },
        {
          type: "subheading",
          id: "safety-1-4",
          index: "1.4",
          title: "1.4 Conclusion",
        },
        {
          type: "table",
          headers: ["Point", "Our Practices", "Values Reflected"],
          rows: [
            [
              "Contribution",
              "Establishing a comprehensive risk assessment system covering both Biosafety and Biosecurity throughout the entire project lifecycle",
              "Transitioning from risk identification to risk management",
            ],
            [
              "Existing Knowledge",
              "Applying the Bow-tie Model, iGEM Safety and Security principles, and integrating existing approaches with project-specific requirements",
              "Transforming existing tools into practical project implementation",
            ],
            [
              "Risk Management",
              "Conducting project-specific risk assessments targeting experimental procedures, animals, biological materials, personnel, and experimental information",
              "Managing real risks associated with our own projectc",
            ],
            [
              "Validation",
              "Continuously validating safety control measures through training, review, documentation, traceability, and risk reassessment",
              "Making risk assessment executable, traceable, and continuously improvable",
            ],
            [
              "Real-world",
              "Incorporating safety, ethical, and compliance requirements into experimental design while considering risks associated with future real-world applications",
              "Promoting responsible synthetic biology practices",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "By establishing a **three-level laboratory safety management system**, a **full-process compliance management system for laboratory animal use**, and a **quality control and traceability mechanism**, we integrated existing safety standards, management principles, and risk control approaches with the specific requirements of our project to develop a systematic safety management framework covering the **institutional, laboratory, and individual levels**.",
            "This framework not only clarifies safety responsibilities, risk assessment procedures, and supervision mechanisms, but also ensures that safety measures are effectively implemented and continuously validated through training, review, inspection, documentation, and continuous improvement.",
            "More importantly, we incorporated safety management into the early stages of project design and experimental implementation. By identifying and controlling project-specific risks associated with experimental procedures, personnel, equipment, biological materials, and animal research, we enabled Safety and Security to actively participate in project decision-making rather than serve as a supplementary measure after experiments begin.",
            "Through this approach, we aim to establish a practical, traceable, and continuously improvable safety management model, providing a reliable safety foundation for synthetic biology projects as they progress from laboratory research toward real-world applications.",
          ],
        },
      ],
    },
    {
      id: "safety-assessment",
      index: "2",
      kicker: "",
      navLabel: "Assessment",
      title: "Assessment",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Risk assessment is a critical component that transforms safety management from **“accident response”** to **“risk prevention.”** For synthetic biology projects, risks include not only potential injuries or unintended events during experimental procedures, but also risks arising from the improper use, loss of control, or misuse of biological materials, experimental information, and research activities.",
            "Therefore, the team divided risk assessment into two major components: **Biosafety Assessment** and **Biosecurity Assessment**. Throughout the entire project lifecycle, we integrated **risk identification, risk analysis, risk control, and risk review** to establish a comprehensive and continuous risk management process.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1",
          index: "2.1",
          title: "2.1 Biosafety Assessment",
        },
        {
          type: "subheading",
          id: "safety-2-1-1",
          index: "2.1.1",
          title: "2.1.1 Laboratory Operation Risk Assessment",
        },
        {
          type: "prose",
          paragraphs: [
            "Laboratory operational risks primarily refer to **unintended risks** caused by experimental procedures, equipment, materials, or environmental factors during laboratory activities.",
            "The team adopted a systematic risk assessment approach to identify and analyze potential hazards associated with experimental activities, including:",
          ],
        },
        {
          type: "list",
          items: [
            "Potential hazards that may arise during experiments;",
            "Causes contributing to risk occurrence;",
            "Possible consequences of incidents;",
            "Existing safety control measures;",
            "Additional preventive measures;",
            "Recovery measures after incidents occur.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "During the risk analysis process, the team applied the **Bow-tie Model**, a graphical risk management tool used to analyze and visualize the complete pathway from risk causes to potential consequences, while identifying corresponding risk control measures. The Bow-tie Model mainly consists of the following five components:",
          ],
        },
        {
          type: "list",
          items: [
            'Core: A critical "top event," which is the point at which the risk event occurs.',
            'Left Side (Causes): All possible causal pathways leading to the "top event."',
            'Right Side (Consequences): All potential adverse consequences that may result from the occurrence of the "Top Event."',
            'Left-Side Barriers: Preventive control measures designed to prevent "threats" from causing the "Top Event."',
            'Right-side barriers: Mitigating/recovery control measures designed to reduce the severity or scope of consequences after the "top event" occurs.',
          ],
          ordered: true,
          start: 1,
        },
        getSafetyFigure("2-1-1-bow-tie-model.avif"),
        {
          type: "prose",
          paragraphs: [
            "Through the analysis of numerous laboratory safety incidents worldwide, we recognized that most laboratory accidents occur due to the presence of underlying **threat factors**, which correspond to the **left side (causes)** of the Bow-tie Model. These threats can eventually lead to the occurrence of a **“top event,”** represented by the central part of the Bow-tie Model, and subsequently result in various adverse consequences (including potential consequences), which correspond to the **right side (consequences)** of the model.",
            "The causes of most laboratory safety incidents can be attributed to incomplete or missing **left-side barriers (preventive safety measures)** and **right-side barriers (recovery and mitigation measures)** within the Bow-tie Model. Therefore, based on the classification of laboratory safety incidents into the **cause, top event, and consequence** components of the Bow-tie Model, we further analyzed preventive barriers that can prevent the occurrence of top events and recovery barriers that can reduce their impacts after occurrence. This approach enabled the team to develop a systematic and comprehensive understanding of laboratory safety throughout the entire process.",
            "For systematic analysis, we categorized laboratory safety incidents into three major types:",
          ],
        },
        {
          type: "list",
          items: [
            "**Chemical Laboratory Safety Incidents**",
            "**Safety Incidents in Biological Laboratories**",
            "**Laboratory Safety Incidents Related to Personnel Behavior and the Safety Environment**",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1-1-1",
          index: "2.1.1.1",
          title: "Chemical Laboratory Safety Incidents",
        },
        {
          type: "prose",
          paragraphs: [
            "①**The tert-butyllithium Fire Incident at the University of California (2008)**",
          ],
        },
        getSafetyFigure(
          "2-1-1-1-the-tert-butyllithium-fire-incident-at-the-university-of-california-2008-bow-tie-model.avif",
        ),
        {
          type: "prose",
          paragraphs: [
            "②**Explosion and Fire at the Municipal and Environmental Engineering Laboratory, Beijing Jiaotong University (December 26, 2018)**",
          ],
        },
        getSafetyFigure(
          "2-1-1-1-explosion-and-fire-at-the-municipal-and-environmental-engineering-laboratory-beijing-jiaotong-university-december-26-2018-bow-tie-model.avif",
        ),
        {
          type: "prose",
          paragraphs: [
            "③**Taiyuan University of Science and Technology Explosion Incident (May 22, 2025)**",
          ],
        },
        getSafetyFigure(
          "2-1-1-1-taiyuan-university-of-science-and-technology-explosion-incident-may-22-2025-bow-tie-model.avif",
        ),
        {
          type: "subheading",
          id: "safety-2-1-1-2",
          index: "2.1.1.2",
          title: "Safety Incidents in Biological Laboratories",
        },
        {
          type: "prose",
          paragraphs: [
            "①**28 Faculty and Students at Northeast Agricultural University Contracted Infectious Diseases Due to Animal Experiments (December 19, 2010)**",
          ],
        },
        getSafetyFigure(
          "2-1-1-2-28-faculty-and-students-at-northeast-agricultural-university-contracted-infectious-diseases-due-to-animal-experiments-december-19-2010-bow-tie-model.avif",
        ),
        {
          type: "prose",
          paragraphs: [
            "②**A researcher at the University of Chicago was hospitalized due to a bacterial infection (September 2011)**",
          ],
        },
        getSafetyFigure(
          "2-1-1-2-a-researcher-at-the-university-of-chicago-was-hospitalized-due-to-a-bacterial-infection-september-2011-bow-tie-model.avif",
        ),
        {
          type: "subheading",
          id: "safety-2-1-1-3",
          index: "2.1.1.3",
          title:
            "Laboratory Safety Incidents Related to Personnel Behavior and the Safety Environment",
        },
        {
          type: "prose",
          paragraphs: [
            "**Death by Oxygen Deprivation of an Employee at Kanglong Chemical (Beijing) New Drug Technology Co., Ltd. in the Beijing Economic and Technological Development Zone (June 2025)**",
          ],
        },
        getSafetyFigure(
          "2-1-1-3-death-by-oxygen-deprivation-of-an-employee-at-kanglong-chemical-beijing-new-drug-technology-co-ltd-in-the-beijing-economic-and-technological-development-zone-june-2025-bow-tie-model.avif",
        ),
        {
          type: "subheading",
          id: "safety-2-1-1-4",
          index: "2.1.1.4",
          title: "Summary",
        },
        {
          type: "prose",
          paragraphs: [
            "Through the classification and Bow-tie Model analysis of laboratory safety incidents worldwide, we summarized the types of laboratory accidents that have occurred during various experimental activities, as well as the **strategies** for preventing these incidents or reducing their impacts after occurrence.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1-1-4-1",
          index: "2.1.1.4.1",
          title: "Chemical Laboratory Safety Incidents",
        },
        {
          type: "prose",
          paragraphs: [
            "Through case analysis, we found that chemical laboratory safety incidents mainly occur during experiments involving **flammable, explosive, pyrophoric, or water-reactive hazardous chemicals**.",
            "Common issues identified from these cases include:",
          ],
        },
        {
          type: "list",
          items: [
            "Insufficient risk assessment conducted by experimental personnel;",
            "Weak safety awareness;",
            "Lack of standardized operating procedures;",
            "Neglect of hazardous chemical properties and experimental environmental conditions.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Experiments involving such high-risk chemicals require not only strict technical competence and appropriate personal protective equipment from operators, but also higher standards for laboratory environment control, explosion-proof design of experimental systems, and emergency facility configuration. It is important to note that chemical laboratory accidents often occur suddenly and develop rapidly, potentially resulting in severe injuries and significant property losses.",
            "The Bow-tie Model analysis demonstrated that, compared with right-side **mitigative/recovery controls**, **left-side preventive controls** are more effective in reducing the likelihood of accidents.",
            "Therefore, greater emphasis should be placed on establishing preventive barriers:",
          ],
        },
        {
          type: "list",
          items: [
            "Systematic risk assessments must be conducted before experiments, accompanied by general safety access training and specialized technical training;",
            "Experimental equipment should incorporate inherently safe designs, such as explosion-proof motors and related safety features;",
            "Laboratories should be equipped with appropriate safety facilities, including emergency showers, fire alarm systems, automatic fire suppression systems, and fire-resistant doors;",
            "Experimental environmental conditions, such as humidity and ventilation, should be strictly monitored and controlled.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Only by establishing a comprehensive **prevention-oriented safety management system** can major chemical laboratory accidents be effectively prevented.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1-1-4-2",
          index: "2.1.1.4.2",
          title: "Safety Incidents in Biological Laboratories",
        },
        {
          type: "prose",
          paragraphs: [
            "Through case analysis, we found that the **core risk sources** of biological laboratory safety incidents mainly include:",
          ],
        },
        {
          type: "list",
          items: [
            "The pathogenic status of experimental biological materials, especially animals and microorganisms;",
            "Insufficient personnel protection and non-standardized operating procedures.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Through further analysis, we summarized the **common issues** revealed by biological laboratory safety incidents:",
          ],
        },
        {
          type: "list",
          items: [
            "Insufficient hazard assessment of experimental materials;",
            "Improper use of personal protective equipment;",
            "Lack of compatibility assessment between personnel health status and experimental activities.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Biological laboratory safety incidents are often characterized by **high concealment, long incubation periods, and the potential to affect multiple individuals**. Once exposure or infection occurs, the consequences may not only impact individual health but may also trigger broader public health events.",
            "The Bow-tie Model analysis demonstrated that **left-side preventive controls and right-side mitigative/recovery controls are equally important**.",
            "For the **left-side barriers**, the following preventive measures should be established:",
          ],
        },
        {
          type: "list",
          items: [
            "Before experiments begin, experimental animals or microorganisms must be obtained from clearly identified and qualified sources, with their potential hazard levels determined. Standardized operating procedures should then be developed based on risk assessment.",
            "During experiments, operators must correctly use personal protective equipment, including gloves, protective clothing, and goggles, while strictly following access requirements, such as ensuring that personnel do not participate in experiments with open wounds or damaged skin.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For the **right-side barriers**, mitigation and recovery capabilities should also be strengthened:",
          ],
        },
        {
          type: "list",
          items: [
            "Once exposure or infection occurs, emergency response procedures must be initiated immediately, including thorough cleaning and disinfection of exposed areas, prompt reporting to supervisors and safety departments, timely medical evaluation, and subsequent medical observation and treatment.",
            "Potentially contaminated laboratory areas should be isolated and subjected to terminal disinfection to prevent secondary transmission.",
            "Health monitoring and follow-up mechanisms should be established for laboratory personnel and students to achieve early detection, diagnosis, isolation, and treatment of potential infections.",
            "Laboratories should be equipped with comprehensive emergency facilities, including first aid kits, eyewash stations, emergency showers, and post-exposure prophylaxis plans for specific pathogens.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Only by establishing a full-chain prevention and control system of **“source control → process protection → emergency response → health monitoring”** can biological laboratory safety and biosecurity be fundamentally ensured. The left-side barriers prevent incidents from developing at the source, while the right-side barriers minimize consequences and interrupt potential transmission pathways.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1-1-4-3",
          index: "2.1.1.4.3",
          title:
            "Laboratory Safety Incidents Related to Personnel Behavior and the Safety Environment",
        },
        {
          type: "prose",
          paragraphs: [
            "Through case analysis, we found that safety incidents related to **personnel behavior and laboratory environments** are primarily caused by insufficient safety awareness among operators and the failure to identify potential environmental hazards in a timely manner.",
            "To address these types of laboratory safety incidents, operators should receive mandatory safety training before conducting experiments and develop a comprehensive understanding of both the experimental procedures and associated risks. In addition, regular laboratory safety drills should be conducted when necessary to ensure that operators are proficient in the use of **emergency equipment**, such as AEDs and positive-pressure respirators. When required, laboratories should also be equipped with environmental monitoring devices, such as oxygen concentration detectors and humidity sensors, to ensure a safe working environment for laboratory personnel.",
            "Based on these lessons learned, we **further strengthened** the **Orientation** component of the SAFE ON framework, ensuring that all personnel involved in experimental activities receive appropriate safety training and successfully complete relevant assessments before obtaining experimental authorization.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1-2",
          index: "2.1.2",
          title: "2.1.2 Biosafety Compliance and Ethical Assessment",
        },
        {
          type: "prose",
          paragraphs: [
            "The risks associated with requirements related to **animal welfare, scientific necessity, biosafety, and research compliance**. Therefore, the **JLU-FBH iGEM team** incorporated ethical and compliance requirements into pre-experiment risk assessment, treating them as a risk control mechanism during the experimental design stage rather than merely as post-experiment compliance checks.",
            "Before conducting experiments, the team performed a preliminary evaluation of experimental protocols based on relevant regulations and principles of laboratory animal management. The evaluation focused on the following aspects:",
          ],
        },
        {
          type: "list",
          items: [
            "Whether the experiment has clear and irreplaceable scientific necessity;",
            "Whether the experimental design can achieve the intended research objectives;",
            "Whether the number of experimental animals is scientifically and ethically justified;",
            "Whether necessary animal welfare protection measures are implemented;",
            "Whether potential risks and corresponding control measures during the experiment are clearly identified;",
            "Whether the experimental protocol complies with relevant laws, regulations, animal welfare principles, and research standards.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Based on the evaluation results, the team incorporated feedback into the experimental design process. Protocols with significant compliance issues, insufficient scientific justification, or inadequate risk control measures were not allowed to proceed to subsequent experimental stages until necessary modifications were completed and required approvals were obtained.",
            "This approach transformed ethical and compliance requirements into a **pre-emptive risk control barrier** during the experimental design stage. Before experiments begin, potential factors that may result in unnecessary animal use, compromised animal welfare, or non-compliant research practices are identified, and corresponding risks are reduced through protocol optimization.",
            "Meanwhile, the team documented the review outcomes and protocol modification processes, enabling full-process traceability through:",
            "**Risk Identification → Compliance Review → Protocol Optimization → Experimental Implementation → Result Review**",
            "This approach ensures that ethical considerations and compliance requirements are continuously integrated throughout the entire animal research workflow.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1-3",
          index: "2.1.3",
          title: "2.1.3 Laboratory Animal Biosafety Assessment",
        },
        {
          type: "prose",
          paragraphs: [
            "For experimental animal-related research, the JLU-FBH iGEM team integrated animal risk assessment into the experimental design stage, identifying potential risks from multiple aspects, including **animal model selection, animal sources, animal health status, microbial quality, and experimental procedures**.",
            "Rather than simply determining whether animal experiments are “compliant” based on existing regulations, the team transformed the risk control principles from the **White Paper on Compliance Management and System Construction of Laboratory Animal Models** and the **White Paper on Implementation and Risk Prevention of Experimental Animal Model Technology** into specific assessment criteria for our project. The assessment outcomes were then incorporated into animal model selection, experimental protocol design, and experimental implementation.",
            "The selection of an animal model directly affects scientific necessity, the number of animals used, experimental reliability, and potential risks throughout the research process.",
            "Therefore, during the experimental design stage, the team conducted a preliminary evaluation of animal models, focusing on the following aspects:",
          ],
        },
        {
          type: "list",
          items: [
            "Whether the animal model can fulfill the objectives of the study;",
            "Whether the use of this animal model has clear scientific necessity;",
            "Whether the number of animals is appropriate for the experimental objectives;",
            "Whether the animal source and basic information are clearly documented;",
            "Whether the model selection meets relevant ethical and safety requirements.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Only after confirming that the animal model has clear scientific necessity and satisfies source and compliance requirements can the experiment proceed to subsequent stages.",
            "By incorporating animal model selection into pre-experiment risk assessment, the team not only reduced risks caused by inappropriate model selection but also avoided unnecessary animal use, making **scientific necessity the first barrier for animal biosafety risk control**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1-3-1",
          index: "2.1.3.1",
          title: "Risks Associated with Animal Sources and Health Status",
        },
        {
          type: "prose",
          paragraphs: [
            "The source and health status of experimental animals directly influence animal welfare, experimental safety, and the reliability of experimental results. Therefore, before experiments, the team verified animal sources and health conditions and incorporated relevant information into experimental records.",
            "The evaluation included:",
          ],
        },
        {
          type: "list",
          items: [
            "Whether the animal source is clearly identified;",
            "Whether basic animal information is complete;",
            "Whether the animal health status meets experimental requirements;",
            "Whether animals comply with the corresponding microbial quality standards;",
            "Whether animal conditions may affect experimental results or personnel safety.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Through the documentation and review of animal sources and health status, the team can identify animals that do not meet requirements before experiments begin, preventing potential risks from being introduced into subsequent procedures.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1-3-2",
          index: "2.1.3.2",
          title: "Animal Microbial Quality Risk",
        },
        {
          type: "prose",
          paragraphs: [
            "Microorganisms carried by experimental animals may affect animal health, personnel safety, and experimental outcomes. Therefore, based on principles of laboratory animal microbial quality control, the team selected appropriate levels of experimental animals according to research requirements.",
            "According to the degree of microbiological control, laboratory animals can be classified into:",
          ],
        },
        {
          type: "list",
          items: [
            "**Conventional animals**;",
            "**Clean animals**;",
            "**Specific Pathogen-Free (SPF) animals**;",
            "**Germ-free animals**.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Different animal grades have different requirements for microbial control and applicable research scenarios. The team determined the appropriate animal grade based on experimental objectives and biosafety requirements, and recorded animal grade information and source details as part of the experimental documentation.",
            "Through microbial quality classification and management, the team established a control barrier against potential biological risks before experiments began, reducing the possibility of pathogen transmission while minimizing interference from variations in animal health status on experimental results.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-1-3-3",
          index: "2.1.3.3",
          title: "Risk Review and Project Feedback",
        },
        {
          type: "prose",
          paragraphs: [
            "Animal biosafety risk assessment is not a one-time review conducted only before experiments. When changes occur in animal sources, model selection, experimental protocols, or experimental conditions, the team reassesses related risks and adjusts control measures accordingly.",
            "Meanwhile, the team tracked the entire risk management process through animal source records, experimental records, and relevant review documents, enabling complete documentation from **risk identification and control to risk review**.",
            "Therefore, the team further transformed existing laboratory animal safety management principles into a project-specific risk assessment workflow, shifting from merely “complying with laboratory animal regulations” toward actively identifying and controlling animal biosafety risks throughout the research process.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2",
          index: "2.2",
          title: "2.2 Biosecurity Assessment",
        },
        {
          type: "prose",
          paragraphs: [
            "Unlike Biosafety, which primarily focuses on potential accidental injuries and unintended risks that may occur during experimental procedures, Biosecurity emphasizes the **appropriate management and control of biological materials, experimental access permissions, and related information**.",
            "Based on this understanding, the JLU-FBH iGEM team conducted Biosecurity risk assessments from three major aspects: **biological material management, personnel and experimental access control, and information management and full-process traceability**, integrating laboratory safety management requirements with the specific characteristics of our project.",
            "The team transformed existing principles of laboratory biosecurity management into concrete project management measures. By clarifying material sources, regulating personnel access permissions, maintaining experimental records, and establishing a full-process traceability mechanism, we reduced potential risks associated with the misuse, loss, or unauthorized access to biological materials.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2-1",
          index: "2.2.1",
          title: "2.2.1 Biological Material Security Assessment",
        },
        {
          type: "prose",
          paragraphs: [
            "Biological materials are essential components of synthetic biology experiments, and their sources, usage, storage, and disposal directly affect the controllability of experimental activities. Therefore, the team implemented **full-process management of biological materials** throughout the project and incorporated material management into the Biosecurity risk assessment framework.",
            "The team focused on evaluating the following aspects:",
          ],
        },
        {
          type: "list",
          items: [
            "Whether the sources of biological materials are clearly identified and traceable;",
            "Whether the use of biological materials is consistent with approved experimental objectives;",
            "Whether materials are handled only by trained experimental personnel;",
            "Whether storage conditions and locations are clearly defined;",
            "Whether the use of materials is properly documented;",
            "Whether materials are handled and disposed of according to laboratory requirements after experiments.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "By maintaining complete records of the source, usage, storage, and disposal processes of biological materials, the team can trace the movement and utilization of materials in the event of abnormal situations, thereby reducing risks associated with material loss, misuse, or unauthorized use.",
            "This management approach transforms biological materials from simple “experimental consumables” into **safety-controlled resources requiring clearly defined responsibilities and full-process traceability**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2-2",
          index: "2.2.2",
          title: "2.2.2 Access and Personnel Security Assessment",
        },
        {
          type: "prose",
          paragraphs: [
            "Personnel management is an essential component of Biosecurity risk control. Access to biological materials and experimental activities by individuals without sufficient training or authorization may increase the risks of material misuse and loss of experimental control.",
            "Therefore, the team established a management framework linking **personnel training, competency assessment, and experimental authorization**.",
            "Before entering the laboratory and conducting experiments, all members are required to complete relevant safety training and pass corresponding assessments. Their participation in experimental activities is determined based on the experimental content, operational requirements, and individual competency levels.",
            "The team established a personnel management process of:",
            "**Training → Assessment → Authorization → Experimentation**",
            "This process ensures that experimental access permissions are matched with individual capabilities, reducing the risk of untrained personnel accessing biological materials or performing inappropriate experimental procedures.",
            "Meanwhile, this mechanism is integrated with the team’s previously established safety training system, enabling personnel training to serve not only as an operational safety measure for Biosafety, but also as a key control measure for **personnel access and experimental authorization management** within Biosecurity.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2-3",
          index: "2.2.3",
          title: "2.2.3 Information and Traceability Security Assessment",
        },
        {
          type: "prose",
          paragraphs: [
            "Synthetic biology projects involve not only physical biological materials but also experimental protocols, material information, experimental records, and research data. Standardized documentation of critical experimental information helps clarify experimental procedures, material sources, and responsible personnel, while enabling traceability in the event of abnormal situations.",
            "Therefore, the team incorporated **experimental information management and material traceability** into the Biosecurity management system.",
            "The team focused on documenting:",
          ],
        },
        {
          type: "list",
          items: [
            "Sources and related information of biological materials;",
            "Usage records of experimental materials;",
            "Experimental procedures and operational processes;",
            "Information related to experimental animals;",
            "Experimental results and abnormal conditions;",
            "Safety incidents and corresponding responses.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Through standardized documentation, the team established a traceability chain:",
            "**Material Source → Experimental Use → Operational Process → Experimental Results**",
            "When abnormal materials, irregular experimental procedures, or safety incidents are identified, relevant records enable the team to trace material origins, usage processes, and responsible steps, thereby supporting subsequent investigations and risk control.",
            "It is important to emphasize that the team’s information management strategy is not limited to simply preserving experimental data. Instead, it strengthens the traceability and accountability of experimental activities** **through **establishing connections between information and biological materials**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2-4",
          index: "2.2.4",
          title: "2.2.4 Biosecurity Risk Review and Project Feedback",
        },
        {
          type: "prose",
          paragraphs: [
            "Biosecurity risk assessment is not a one-time process of material registration or personnel authorization, but rather a **dynamic management process** that evolves throughout the entire experimental workflow.",
            "The team conducts a **reassessment** of relevant Biosecurity risks under the following **circumstances**:",
          ],
        },
        {
          type: "list",
          items: [
            "Changes in biological materials;",
            "Changes in experimental protocols;",
            "Participation of new team members in experiments;",
            "Changes in experimental access permissions;",
            "Changes in material usage or storage conditions;",
            "Occurrence of material abnormalities or safety incidents.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Based on the reassessment results, the team promptly adjusts personnel access permissions, material management procedures, or documentation requirements.",
            "Through this approach, the team established a comprehensive **Biosecurity management loop** covering the entire experimental process. Starting from **risk identification**, potential risks are analyzed through **risk assessment**, and corresponding **safety control measures** are developed based on assessment outcomes. During experimental implementation, safety requirements are continuously enforced, while standardized **record tracking** ensures the traceability of experimental activities. After experiments are completed, **risk review** is conducted based on experimental records and safety events to identify emerging risks and further optimize safety measures, forming a continuously improving safety management mechanism.",
            "By integrating biological material management, personnel access control, and full-process traceability, the team applied existing Biosecurity management principles to its own project and established a Biosecurity risk assessment system characterized by **project specificity, traceability, and continuous improvement mechanisms**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2-5",
          index: "2.2.5",
          title: "2.2.5 Dual-Use Assessment of Our Project",
        },
        {
          type: "subheading",
          id: "safety-2-2-5-1",
          index: "2.2.5.1",
          title:
            "① Platform Level: Multi-Epitope Circular RNA Expression System",
        },
        {
          type: "prose",
          paragraphs: [
            "The core concept of CirCure is **a platform that enables the conversion of any coding sequence into circular RNA and supports stable protein translation in eukaryotic cells**. In principle, the same platform could be used to express various proteins, including toxins or virulence-enhancing factors. This represents an inherent dual-use potential shared by similar platform technologies, and we acknowledge this possibility.",
            "However, our project incorporates multiple limitations. All sequences constructed in this project have been fully disclosed and submitted through **Check-In**. The encoded components include eight 9-mer CTL epitopes, the minimal functional complement fragment P28, the tPA signal peptide, MITD, and the FLAG tag, with a total length of 359 amino acids. None of these components contain toxins, virulence factors, immune evasion proteins, or classical oncogenes. We neither construct, obtain, nor express any sequences with such functions, nor do we submit any Registry parts with these properties.",
            "The complete disclosure of our sequences itself serves as a biosecurity measure—it allows others to independently verify what we express rather than relying solely on our statements.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2-5-2",
          index: "2.2.5.2",
          title: "② Target Level: Immune Responses Against Self-Antigens",
        },
        {
          type: "prose",
          paragraphs: [
            "This represents the most important dual-use consideration of our project. **TROP2, B7-H4, Nectin-4, and LIV-1** are all **self-antigens** that are overexpressed in tumors. A platform capable of inducing strong cellular immune responses against self-antigens could, in principle, be misused to trigger autoimmune responses against normal tissues.",
            "However, this project does not introduce a previously unavailable misuse capability. These targets have already been investigated as targets for approved antibody-drug conjugates, and their epitope information can be obtained from public databases and prediction tools. We do not introduce novel target information or previously inaccessible design capabilities.",
            "The primary safeguard lies in our strict limitation of application scope. At no point will any formulation generated in this project be administered to humans, including team members. We will not conduct any form of human testing or provide formulations to any individuals or organizations.",
            "Furthermore, our experimental design includes direct evaluation of potential cytotoxicity toward normal cells, making the question of **“whether normal tissues could be affected”** a prerequisite that must be addressed before evaluating therapeutic efficacy.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2-5-3",
          index: "2.2.5.3",
          title: "③ Vector Level: VSV-G Pseudotyped Lentiviral Vector",
        },
        {
          type: "prose",
          paragraphs: [
            "VSV-G pseudotyping enables lentiviral vectors to infect a broad range of cell types, including human cells, which contributes to their widespread use and also represents a potential source of misuse.",
            "The limitations of our project are structural. We do not possess any packaging plasmids or maintain virus-producing cell lines, and therefore do not have the capability to independently produce viral vectors. We only purchased a limited amount of vector material for a single transduction experiment. The vector is neither amplified nor stored as a viral stock.",
            "All materials are aliquoted, stored in designated and labeled low-temperature storage facilities with restricted access, and individually recorded through inventory management. Neither the vector nor the engineered cell lines generated from it are provided to other research groups.",
            "Therefore, even if misuse was intended, this project neither provides vector production capability nor transferable material stocks.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2-5-4",
          index: "2.2.5.4",
          title: "④ Tool Level: AI-Assisted Epitope Prediction",
        },
        {
          type: "prose",
          paragraphs: [
            "During the Dry Lab stage, our project uses publicly available prediction tools, including **NetMHCpan** and **VaxiJen**, for epitope screening (see Section 4.1.1). In principle, similar workflows could be applied to design epitopes targeting normal tissue antigens.",
            "To address this possibility, we only use existing, publicly available, and widely validated tools. We do not develop new prediction algorithms, nor do we release automated pipelines or scripts that would lower the threshold for designing such applications.",
            "Our use of AI is limited to assisting candidate screening. All AI-generated predictions undergo three layers of evaluation: **sequence homology screening, human expert review, and experimental validation**. There is no direct pathway from algorithmic output to experimental implementation.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-2-5-5",
          index: "2.2.5.5",
          title: "⑤ Information Level: Disclosure of Sequences and Methodology",
        },
        {
          type: "prose",
          paragraphs: [
            "We chose to fully disclose the complete sequences of both plasmids, the safety assessment of each component, and all experimental methodologies. This decision is based on the consideration that, for our project, security through obscurity is not an effective strategy.",
            "The targets, prediction tools, and vector systems used in this project are already publicly accessible. Hiding our own sequences would not meaningfully increase the barrier to misuse, but would prevent reviewers and the scientific community from independently verifying our safety claims.",
            "Correspondingly, we do not disclose operational details specifically aimed at increasing cytotoxicity toward normal tissues or complete workflows that could be directly adapted for attacking self-antigens.",
            "Our disclosure focuses on **“what we developed and why it is safe,”** rather than **“how to make it more dangerous.”**",
            "**Misuse Scenario Comparison**",
          ],
        },
        {
          type: "table",
          headers: [
            "**Hypothetical Misuse Scenario**",
            "**Why It Does Not Apply / Our Mitigation Measures**",
          ],
          rows: [
            [
              "Using the platform to express toxins or virulence factors",
              "All sequences in this project have been fully disclosed and submitted through Check-In. The encoded components are limited to short epitopes, functional fragments, and tags, without any toxin or virulence-related genes. We neither obtain nor construct such sequences.",
            ],
            [
              "Using the vaccine platform to induce autoimmunity against normal tissues",
              "The target antigen information and epitope data used in this project are publicly available, and no novel capabilities are introduced. No formulation is administered to any individual, no human trials are conducted, and no materials are provided externally. The experimental design includes direct evaluation of potential cytotoxicity toward normal cells before therapeutic interpretation.",
            ],
            [
              "Using lentiviral vectors to generate infectious viruses",
              "We do not possess packaging plasmids or maintain virus-producing cell lines and therefore lack the capability to independently generate viral vectors. Only a limited amount of material is purchased for a single use, stored under controlled conditions with complete records, and not provided to other research groups.",
            ],
            [
              "Applying AI-based epitope prediction workflows to design harmful epitopes",
              "We only use publicly available existing tools and do not develop new tools or automated workflows that lower the threshold for harmful applications. AI-generated predictions undergo sequence homology screening, human review, and experimental validation before use.",
            ],
            [
              "Directly reusing publicly disclosed sequences and methods for harmful purposes",
              "The disclosed information focuses on project design, safety assessment, and validation rather than operational approaches for increasing harmful capabilities. Since the targets and tools used are already publicly available, transparency enables independent verification of our safety claims rather than increasing misuse potential.",
            ],
            [
              "Removing genetically modified materials from the laboratory without authorization",
              "All genetically modified materials are restricted to laboratory use and managed under controlled conditions. Any transfer of synthetic biology products must undergo prior Check-In submission and approval procedures.",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Based on the above assessment, we conclude that **this project does not introduce new misuse capabilities**. The targets used in this project have already been explored as targets of approved therapeutics, the prediction tools are publicly available, the vector system is commercially accessible, and the constructed sequences do not contain any harmful coding elements.Therefore, the focus of our **Biosecurity management** is not on protecting a dangerous secret, but rather on **ensuring that existing technologies are applied for legitimate purposes** and that this responsible use can be independently verified by external reviewers.This is also the reason why we chose to fully disclose our sequences and methodologies. Transparency, traceability, and external verification provide stronger security assurance than information concealment alone.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-3",
          index: "2.3",
          title: "2.3 Project-specific Risk Management",
        },
        {
          type: "prose",
          paragraphs: [
            "The purpose of risk assessment is not merely to create a formal list of potential risks, but to ensure that identified risks are effectively integrated into the design and implementation processes of the project. To ensure that the above Biosafety Assessment and Biosecurity Assessment can effectively reduce risks associated with our specific experiments, the team established a comprehensive project risk management process.",
            "For each experimental activity, the team follows the process:",
            "**Risk Identification → Risk Analysis → Control Measures → Experimental Implementation → Record Tracking → Risk Review**",
            "During project implementation, when experimental materials, procedures, or research plans are modified, the team reassesses the associated risks and adjusts control measures accordingly based on the reassessment results.Through this continuous risk management process, safety considerations are incorporated throughout the entire experimental lifecycle, ensuring that risk control is not only a preliminary assessment but also an ongoing mechanism for project optimization and improvement.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-4",
          index: "2.4",
          title: "2.4 Assessment Validation and Continuous Improvement",
        },
        {
          type: "prose",
          paragraphs: [
            "To prevent risk assessment from remaining only as documentation completed before experiments, the team continuously tracks the implementation and effectiveness of risk control measures through the following records:",
          ],
        },
        {
          type: "list",
          items: [
            "Experimental risk assessment records;",
            "Safety training and assessment records;",
            "Laboratory safety inspection records;",
            "Equipment maintenance records;",
            "Biological material management and experimental records;",
            "Safety incident and near-miss event records.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "When new risks are identified, existing control measures are found to be insufficient, or experimental conditions change, the team conducts a new risk assessment and adjusts corresponding control measures accordingly.",
            "Ultimately, the team established a dynamic risk management loop:",
            "**Risk Identification → Assessment → Mitigation → Implementation → Review**",
            "This continuous management process ensures that risk control is not limited to the initial planning stage, but remains integrated throughout the entire lifecycle of project implementation.",
          ],
        },
        {
          type: "subheading",
          id: "safety-2-5",
          index: "2.5",
          title: "2.5 Conclusion",
        },
        {
          type: "prose",
          paragraphs: [
            "By integrating established approaches, including the **Bow-tie Model, experimental animal risk management, biological material management, personnel access control, and full-process traceability**, with the specific requirements of our project, the team established a systematic risk assessment framework covering both **Biosafety and Biosecurity**.",
            "We not only identified project-specific risks associated with experimental procedures, animal research, biological materials, and personnel management, but also incorporated assessment outcomes into experimental design, personnel authorization, and safety control measures. Through training and assessment, risk review, record tracking, and continuous evaluation, we ensured that these control measures were effectively implemented and continuously improved.",
            "Therefore, risk assessment is no longer merely a document prepared after risks occur, but a **dynamic process integrated throughout project decision-making and experimental implementation**. This framework provides practical, traceable, and continuously improvable safety assurance for our project, while also offering a reference for the responsible development of synthetic biology research in real-world applications.",
          ],
        },
      ],
    },
    {
      id: "safety-facility",
      index: "3",
      kicker: "",
      navLabel: "Facility",
      title: "Facility",
      summary: "",
      blocks: [
        {
          type: "table",
          headers: ["Point", "Our Practices", "Values Reflected"],
          rows: [
            [
              "Contribution",
              "Established a multi-layer laboratory safety barrier system covering ventilation, fire prevention, spill control, emergency rescue, and protection facilities.",
              "Building a multi-level laboratory safety protection system.",
            ],
            [
              "Existing Knowledge",
              "Integrated existing safety standards with experimental risk requirements to configure corresponding facilities and develop equipment user manuals.",
              "Transforming safety standards into practical safety facilities.",
            ],
            [
              "Risk Management",
              "Configured safety facilities based on project-specific risks, including biological risks, chemical risks, fire risks, spill risks, and personnel exposure risks.",
              "Providing targeted control measures for actual risks.",
            ],
            [
              "Validation",
              "Ensured the effectiveness of safety facilities through regular inspections, maintenance, training, and equipment usage records.",
              "Making safety facilities available, verifiable, and traceable.",
            ],
            [
              "Real-world",
              "Established replicable laboratory safety practices through equipment management, standardized operations, and emergency response procedures.",
              "Providing a practical foundation for safe synthetic biology research.",
            ],
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1",
          index: "3.1",
          title: "3.1 Introduction to Laboratory Safety Equipment",
        },
        {
          type: "prose",
          paragraphs: [
            "*(Detailed structures and operating procedures are described in the Laboratory Safety Equipment User Manual section.)*",
            "To ensure personnel safety and the reliability of experimental results, the team configured and utilized appropriate safety equipment based on experimental requirements and potential risks. Laboratory safety equipment not only reduces potential hazards during experimental operations but also serves as an essential component of the overall laboratory safety management system.",
            "Before conducting experiments, all team members were required to complete safety training covering **biosafety equipment, personal protective equipment (PPE), and emergency response procedures**. In addition, safety instruction posters were placed around laboratory safety equipment to provide clear operational guidance and reminders. These measures ensured that safety equipment could be correctly understood, operated, and effectively utilized during experimental activities.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-1",
          index: "3.1.1",
          title: "3.1.1 Containment Facilities",
        },
        {
          type: "subheading",
          id: "safety-3-1-1-1",
          index: "3.1.1.1",
          title: "Biological Safety Cabinet and Chemical Fume Hood",
        },
        {
          type: "prose",
          paragraphs: [
            "**· Biological Safety Cabinet**",
            "The biosafety level of our experimental space is **Level 2 – moderate containment**. The **biological safety cabinet** is used to manage operational risks associated with biological materials. During the handling of biological materials, the team uses the biological safety cabinet as one of the designated areas for experimental procedures to reduce potential exposure risks and ensure safe operation.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-8",
        },
        {
          type: "prose",
          paragraphs: [
            "**· Chemical Fume Hood**",
            "During this project, the team handled various hazardous chemicals, including highly flammable chemicals, acids and corrosive substances, carcinogenic/teratogenic/mutagenic chemicals, and other hazardous chemical materials. The specific chemicals used include **ethanol, isopropanol, methanol, phenol, hydrochloric acid, ethidium bromide, acrylamide, chloroform, paraformaldehyde, dimethyl sulfoxide (DMSO)**, and others.The **chemical fume hood** is primarily used to manage risks associated with hazardous chemical handling. To control potential hazards during chemical operations, the experimental area is equipped with a chemical fume hood for procedures involving hazardous chemicals, reducing exposure risks caused by volatile substances, toxic fumes, or accidental chemical release.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-9",
        },
        {
          type: "subheading",
          id: "safety-3-1-2",
          index: "3.1.2",
          title: "3.1.2 Emergency Rinsing Facilities",
        },
        {
          type: "prose",
          paragraphs: [
            "Rinsing facilities are used for emergency treatment when experimental personnel experience accidental exposure to chemicals, biological materials, or other contaminants during laboratory procedures. They help minimize potential injuries by providing immediate decontamination of exposed areas.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-2-1",
          index: "3.1.2.1",
          title: "Combination Eyewash Station",
        },
        {
          type: "prose",
          paragraphs: [
            "The **combination eyewash station** is used to respond to situations where the eyes or body surface of laboratory personnel are exposed to contaminants. In the event of accidental exposure, personnel should immediately use the combination eyewash station and follow the laboratory emergency response procedures for reporting and subsequent management.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-10",
        },
        {
          type: "subheading",
          id: "safety-3-1-3",
          index: "3.1.3",
          title: "3.1.3 Fire Emergency Facilities",
        },
        {
          type: "prose",
          paragraphs: [
            "Fire emergency facilities are used to reduce fire risks during experimental activities and provide necessary emergency response capabilities during the early stages of a fire.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-3-1",
          index: "3.1.3.1",
          title: "Fire Extinguishers, Fire Blankets, and Fire Sand",
        },
        {
          type: "list",
          items: [
            "**Fire extinguishers** are used to extinguish initial-stage fires and serve as one of the fundamental fire protection facilities in laboratories.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-11",
        },
        {
          type: "list",
          items: [
            "**Fire blankets** are used for smothering flames during the early stages of a fire or assisting in controlling the spread of fire.",
            "**Fire sand** is used for emergency response in certain fire situations that may occur during experimental procedures.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-4",
          index: "3.1.4",
          title: "3.1.4 Leak Emergency Response Facilities",
        },
        {
          type: "prose",
          paragraphs: [
            "Leak emergency response facilities are used to assist in on-site containment and subsequent management when chemical or other experimental material leaks occur during laboratory activities.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-4-1",
          index: "3.1.4.1",
          title:
            "Spill Response Kits, Spill Containment Trays, and Sealed Waste Liquid Containers",
        },
        {
          type: "list",
          items: [
            "**Spill response kits** contain absorbent cotton, absorbent pillows, absorbent pads, neutralizing agents, and other materials used for emergency response to laboratory spill incidents.",
            "**Spill containment trays** are used to reduce the risk of liquid spill spread and contain accidental leakage during experimental operations.",
            "**Sealed waste liquid containers** are used for the collection and storage of experimental liquid waste, reducing the risk of waste exposure and ensuring safe waste management.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-5",
          index: "3.1.5",
          title: "3.1.5 Safety Signs and Alarm Systems",
        },
        {
          type: "prose",
          paragraphs: [
            "Safety signs and alarm systems help laboratory personnel identify potential hazards in the experimental environment and provide essential information during emergency situations.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-5-1",
          index: "3.1.5.1",
          title:
            "Emergency Alarm Devices, Emergency Lighting and Evacuation Signs, Safety Signs",
        },
        {
          type: "list",
          items: [
            "**Emergency alarm devices** are used to promptly alert laboratory personnel when abnormal situations occur.",
            "**Emergency lighting and evacuation signs** assist personnel in identifying evacuation routes and directions during emergency situations.",
            "**Safety signs** include hazard warning signs and evacuation route maps, which are used to clearly indicate hazardous areas and designated safety passages within the laboratory.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-6",
          index: "3.1.6",
          title: "3.1.6 First Aid and Medical Facilities",
        },
        {
          type: "prose",
          paragraphs: [
            "**First Aid and Medical Facilities**",
            "First aid and medical facilities are used to provide initial emergency response after laboratory accidents occur.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-6-1",
          index: "3.1.6.1",
          title: "First Aid Kits and Emergency Communication Equipment",
        },
        {
          type: "list",
          items: [
            "**First aid kits** provide basic medical supplies for initial treatment following laboratory accidents.",
            "**Emergency communication equipment** is used to promptly contact relevant personnel or obtain external support during emergency situations.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-7",
          index: "3.1.7",
          title: "3.1.7 Electrical and Equipment Safety Facilities",
        },
        {
          type: "prose",
          paragraphs: [
            "Electrical and equipment safety facilities are used to reduce electrical and mechanical risks associated with the operation of laboratory equipment.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-7-1",
          index: "3.1.7.1",
          title: "Emergency Power Supply and Emergency Stop Buttons",
        },
        {
          type: "list",
          items: [
            "**Emergency power supply** is used to maintain the operation of essential equipment or ensure laboratory safety under abnormal power conditions.",
            "**Emergency stop buttons** are used to quickly shut down equipment in the event of abnormal operation, reducing the risk of further escalation of accidents.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-1-8",
          index: "3.1.8",
          title: "3.1.8 Personal Protective Equipment (PPE)",
        },
        {
          type: "prose",
          paragraphs: [
            "Personal protective equipment (PPE) is one of the key measures for laboratory risk control in our project. The team uses PPE, including **lab coats, gloves, and safety goggles**, to reduce potential exposure risks during experimental procedures.",
          ],
        },
        {
          type: "subheading",
          id: "safety-3-2",
          index: "3.2",
          title: "3.2 Equipment Management and Maintenance",
        },
        {
          type: "prose",
          paragraphs: [
            "Laboratory equipment safety management is an essential component of the overall safety management system. The laboratory supervisor is responsible for inspecting and maintaining laboratory safety facilities according to the specified inspection schedules, ensuring that all relevant equipment and facilities remain functional. All inspection and maintenance activities are documented in the **Equipment Maintenance and Inspection Record.**",
          ],
        },
        getSafetyFigure(
          "3-2-laboratory-safety-facilities-and-inspection-schedule.avif",
        ),
        {
          type: "subheading",
          id: "safety-3-3",
          index: "3.3",
          title: "3.3 Laboratory Safety Equipment User Manual",
        },
        {
          type: "prose",
          paragraphs: [
            "To ensure that experimental personnel can correctly operate laboratory safety equipment, our team developed the **Laboratory Safety Equipment User Manual** and distributed it to all trained team members responsible for experimental tasks. This manual provides detailed descriptions of the functions, applicable scenarios, and basic operating procedures of major safety equipment.",
            "The manual covers five core types of safety equipment, including **combination eyewash stations, chemical fume hoods, biological safety cabinets, fire extinguishers, and first aid kits**.",
          ],
        },
        {
          type: "feature",
          key: "safety-folders-12",
        },
        {
          type: "subheading",
          id: "safety-3-4",
          index: "3.4",
          title: "3.4 Conclusion",
        },
        {
          type: "prose",
          paragraphs: [
            "Through comprehensive laboratory safety facility configuration, standardized equipment management procedures, and systematic safety training, our team established a safety assurance system covering the entire experimental process.",
            "From **containment facilities** to **emergency rinsing facilities, fire protection facilities, spill response facilities, and personal protective equipment (PPE)**, each type of safety equipment was configured and managed according to the potential risks associated with experimental activities. Meanwhile, the team established regular inspection and maintenance mechanisms to ensure that all safety facilities remain functional and effective.",
            "Through the development and implementation of the **Laboratory Safety Equipment User Manual**, team members were able to correctly understand and operate relevant safety facilities, thereby reducing experimental risks, ensuring personnel safety, and supporting the successful implementation of the project.",
          ],
        },
      ],
    },
    {
      id: "safety-experiment",
      index: "4",
      kicker: "",
      navLabel: "Experiment",
      title: "Experiment",
      summary: "",
      blocks: [
        {
          type: "table",
          headers: ["Point", "Our Practices", "Values Reflected"],
          rows: [
            [
              "Contribution",
              "Integrating safety requirements into the experimental design of both Dry Lab and Wet Lab, the team established a comprehensive safety management framework covering AI risk control, Safety-by-Design principles, animal experimental design, and the entire experimental lifecycle.",
              "Moving Safety and Security further upstream from the experimental operation stage to the stages of experimental design and technical route selection.",
            ],
            [
              "Existing Knowledge",
              "Based on existing approaches including AI risk control, the 3R principles, ARRIVE 2.0, SOPs, and other established methodologies, the team adapted these frameworks to our project requirements.",
              "Transforming existing tools and principles into practical project applications.",
            ],
            [
              "Risk Management",
              "The team conducted project-specific risk management targeting potential risks associated with AI, epitope screening, animal models, experimental procedures, and waste disposal. Safety considerations were incorporated into project decisions by avoiding unnecessary risk sources, such as selecting safer antigen designs, reducing unnecessary animal use, minimizing toxic reagents, and adopting alternative approaches including fixed-dose designs and safer reagents.",
              "Safety fundamentally influenced project decisions, enabling a transition from controlling risks after experiments to preventing risks through design.",
            ],
            [
              "Validation",
              "The team applied NetMHCpan, BLAST, EDA, and other supporting tools for risk identification, and validated experimental design through cell-based experiments, animal experiments, and safety evaluation experiments. Meanwhile, the applicability boundaries of experimental conclusions were clearly defined.",
              "Making project design and experimental procedures verifiable and traceable.",
            ],
            [
              "Real-world",
              "The team integrated safety, ethics, and responsibility considerations into research design and applied Virtual Laboratory to reduce practical operation risks and improve risk awareness before experiments.",
              "Promoting responsible synthetic biology practices",
            ],
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1",
          index: "4.1",
          title: "4.1 Experimental Design",
        },
        {
          type: "subheading",
          id: "safety-4-1-1",
          index: "4.1.1",
          title: "4.1.1 AI-assisted Design and Risk Management in Dry Lab",
        },
        {
          type: "prose",
          paragraphs: [
            "During the **Dry Lab design** phase of this project, artificial intelligence (AI) tools were used to assist with **antigen epitope screening, bioinformatics analysis, and research information organization**. However, the application of AI tools also introduces potential risks, including prediction reliability, data interpretation accuracy, and the authenticity of generated information. Therefore, the team established an **AI risk identification and control mechanism** during the project design stage to ensure that AI serves only as an auxiliary tool rather than replacing experimental validation or scientific decision-making.",
            "During the antigen epitope screening process, the team utilized computational prediction tools such as NetMHCpan to assist in identifying candidate antigen epitopes. Since AI algorithms generate predictions based on existing datasets and trained models, their outputs may contain certain limitations. For example, predicted epitopes may produce false-positive results, meaning that some identified epitopes may not induce effective immune responses in practice. In addition, certain candidate epitopes may exhibit high sequence homology with human proteins, which could theoretically increase the risk of immune off-target effects or potential autoimmune responses.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-1-1",
          index: "4.1.1.1",
          title: "7.21  Software Interview",
        },
        {
          type: "prose",
          paragraphs: [
            "Since the Dry Lab process involves the use of AI-based tools for epitope screening, potential risks may arise from software reliability, algorithm interpretation, and improper application. Therefore, the team placed great emphasis on safety considerations related to AI and software utilization.",
            "On **July 21, 2026**, the team conducted an interview and discussion activity focusing on **software development and technology applications**. Through this exchange, the team further explored issues related to software reliability, responsible use of computational tools, and risk control strategies for AI-assisted research, providing additional guidance for the safe application of AI tools in the project.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-13",
        },
        {
          type: "subheading",
          id: "safety-4-1-1-2",
          index: "4.1.1.2",
          title:
            "Implications of the Software Interview and AI Risk Control Measures",
        },
        {
          type: "prose",
          paragraphs: [
            "This interview further strengthened our understanding that **biosafety is not limited to experimental operations, but is also closely associated with information management, data standardization, and interdisciplinary technology integration**. Through this exchange, the team expanded its understanding of safety management and recognized that future biotechnology development requires collaboration across multiple fields to achieve more standardized, efficient, and secure scientific practices.",
            "The discussion also provided new perspectives for the team regarding **Dry Lab-related risk control**. Based on these insights, we summarized the following three measures:",
          ],
        },
        {
          type: "list",
          items: ["**(1) Bioinformatics-Based Safety Screening**"],
        },
        {
          type: "prose",
          paragraphs: [
            "Before candidate antigen epitopes are incorporated into subsequent experimental designs, the team does not directly select candidates solely based on AI prediction results. Instead, further sequence homology analysis is performed. By comparing predicted epitopes with the human proteome (e.g., through BLAST analysis), the team screens for sequences with high similarity to human proteins and excludes candidate targets with potential cross-reactivity risks, thereby reducing the possibility of immune off-target effects at the design stage.",
          ],
        },
        {
          type: "list",
          items: ["**(2) Wet Lab Validation**"],
        },
        {
          type: "prose",
          paragraphs: [
            "AI prediction results are used only as a reference for experimental design. The team further validates candidate epitopes through wet-lab experiments, including evaluation of antigen processing and presentation using dendritic cell/T cell co-culture systems, as well as comprehensive assessment of safety and efficacy through animal model experiments. These validation steps prevent experimental decisions from relying solely on computational predictions and reduce risks caused by algorithmic limitations.",
          ],
        },
        {
          type: "list",
          items: ["**(3) Human Review and Literature-Based Cross-Validation**"],
        },
        {
          type: "prose",
          paragraphs: [
            "For AI-generated information, analytical results, and AI-assisted research materials, all outputs are manually reviewed by team members and cross-validated using peer-reviewed scientific literature. Any unverified AI-generated information is not directly incorporated into experimental designs or used to support scientific conclusions.",
            "Through these measures, the team ensures that AI functions as an auxiliary design tool within the project while avoiding experimental design risks caused by algorithm limitations, inaccurate predictions, or unreliable information.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2",
          index: "4.1.2",
          title: "4.1.2 Safety-by-Design of the CirCure Vaccine",
        },
        {
          type: "subheading",
          id: "safety-4-1-2-1",
          index: "4.1.2.1",
          title: "Safety by Design in Wet Lab",
        },
        {
          type: "subheading",
          id: "safety-4-1-2-1-1",
          index: "4.1.2.1.1",
          title: "Safety Integration into Wet Lab Experimental Design",
        },
        {
          type: "prose",
          paragraphs: [
            "During the **Wet Lab experimental design** phase, the team incorporated safety requirements into the design process and considered them as essential factors in **vector selection, sequence design, material use, and technical route selection**. By analyzing potential risks associated with biological materials, molecular components, delivery materials, and experimental procedures, the team implemented corresponding risk mitigation strategies at the design stage.",
            "The following sections describe the specific design considerations from the perspectives of **chassis selection, component selection, material substitution, risk control, and safety validation**.",
            "**(1) Chassis Selection: Avoiding the Use of Living Organisms as Therapeutic Carriers**",
            "The final therapeutic form of **CirCure** is **in vitro synthesized circular RNA delivered by lipid nanoparticles (LNPs)**, which does not contain living cells or replication-competent vectors. The therapeutic material itself does not possess autonomous replication, host colonization, or transmission capabilities, thereby reducing the persistence and dissemination risks associated with living biological systems.",
            "During the experimental process, all living or viral materials involved are strictly separated from the final therapeutic product. Among them, *E. coli* DH5α is only used for plasmid template amplification and is a **Risk Group 1 laboratory strain listed in the White List**. Lentiviral vectors are only used for constructing tumor cell models at the cellular level and are not used as therapeutic materials or administered to animals or humans.",
            "By clearly distinguishing between **experimental model materials** and **final therapeutic materials**, the team further controlled the boundaries of biological material use throughout the workflow.",
            "**(2) Component Selection: Using the Minimum Functional Units Required for the Experimental Purpose**",
            "To reduce unnecessary biological functions and potential off-target effects, the team prioritized the use of **minimal functional components** sufficient to achieve the experimental objectives during construct design.",
          ],
        },
        {
          type: "list",
          items: ["**Using epitopes instead of full-length antigens**"],
        },
        {
          type: "prose",
          paragraphs: [
            "The four candidate target antigens, TROP2, B7-H4, Nectin-4, and LIV-1, exhibit different levels of physiological expression in normal tissues. To reduce the potential risk of non-specific immune responses, the team did not use full-length antigens. Instead, the design incorporated 9-mer CTL epitopes predicted by the IEDB NextGen Pipeline (NetMHCpan 4.1, HLA-A*02:01) and screened using VaxiJen (threshold = 0.5).",
          ],
        },
        {
          type: "list",
          items: ["**Using P28 instead of full-length C3d**"],
        },
        {
          type: "prose",
          paragraphs: [
            "For molecular adjuvant design, the team selected P28, the minimal functional fragment of C3d (4 copies), rather than the complete C3d protein, to minimize unnecessary additional biological functions.",
          ],
        },
        {
          type: "list",
          items: [
            "**Using signal peptide instead of full-length tPA protein**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The tPA component in the construct only contains the signal peptide and propeptide regions, without the serine protease catalytic domain. This design avoids introducing additional biological activity associated with fibrinolytic functions.",
          ],
        },
        {
          type: "list",
          items: ["**Avoiding unnecessary high-risk functional elements**"],
        },
        {
          type: "prose",
          paragraphs: [
            "The construct does not contain toxins, virulence factors, immune evasion proteins, or classical oncogenes.",
          ],
        },
        {
          type: "list",
          items: [
            "**Integrating homology screening as a prerequisite before experiments**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Before candidate epitopes entered subsequent experimental procedures, sequence homology analysis against the human proteome was performed to identify and exclude sequences with high similarity to normal human proteins, reducing potential cross-reactivity risks.",
          ],
        },
        {
          type: "list",
          items: ["**Considering safety factors during target selection**"],
        },
        {
          type: "prose",
          paragraphs: [
            "The expression patterns of candidate targets in normal tissues and relevant published studies were analyzed to provide a basis for subsequent evaluation of potential off-target effects in normal cell experiments.",
            "Through these design strategies, the team incorporated risk control into the construct design stage, rather than relying on supplementary evaluation after experiments were completed.",
            "**(3) Material and Technical Route Substitution: Reducing Operational Risks Through Design Optimization**",
            "During experimental planning, the team evaluated different technical approaches based on operational risks and experimental requirements, and replaced certain materials or procedures with safer alternatives.",
          ],
        },
        {
          type: "list",
          items: [
            "**Using commercial lentiviral products instead of in-house packaging**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For constructing TROP2-positive target cell models, the team selected commercially produced lentiviral vectors with confirmed titers instead of performing viral packaging in the laboratory. This approach eliminated additional procedures such as producer cell transfection, viral collection, filtration, and concentration.",
            "The quality of commercial products was verified using supporting documentation, including Certificates of Analysis (CoA), replication-competent lentivirus (RCL) reports, mycoplasma and sterility reports, and complete sequence information.",
          ],
        },
        {
          type: "list",
          items: [
            "**Using commercial PBMCs instead of volunteer blood collection**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The experiments used commercially available, de-identified PBMCs with completed HLA typing and donor serological screening. The team did not collect blood from team members or volunteers, thereby reducing risks associated with blood collection procedures and donor information management.",
          ],
        },
        {
          type: "list",
          items: [
            "**Using electroporation instead of lipid-based transfection for circRNA delivery**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "In dendritic cell experiments, the team selected **electroporation** for circRNA delivery instead of lipid-based transfection methods. This reduced potential interference from delivery materials and minimized additional risks associated with material handling.",
            "These modifications demonstrate that the team considered both experimental feasibility and safety requirements during technical route selection, reducing unnecessary high-risk procedures through design optimization.",
            "**(4) Kill-switch Consideration: Selecting Risk Controls Appropriate to Project Characteristics**",
            "Kill-switch systems are primarily designed for engineered organisms with autonomous replication capabilities or the potential to persist and spread beyond intended environments. Since CirCure uses **in vitro synthesized circular RNA as the therapeutic component**, which lacks autonomous replication and transmission capabilities, a Kill-switch mechanism is not applicable to this project.",
            "Instead, the team implemented risk control strategies corresponding to the characteristics of each experimental material:",
          ],
        },
        {
          type: "list",
          items: [
            "**Non-replicative vector design:** The commercially obtained lentiviral vectors are self-inactivating and replication-deficient, without HIV-1 accessory or virulence genes.",
            "**Post-transduction clearance and selection:** Following viral transduction, cells undergo standardized procedures including medium replacement, PBS washing, continued culture, puromycin selection, and flow cytometry sorting. Cells are further cultured before downstream experiments to reduce the possibility of residual viral material affecting subsequent procedures.",
            "**Dose control:** Before functional experiments, the safety range of LNPs was determined through a concentration gradient experiment (**0/50/100/200/400 ng**) combined with CCK-8 assays. Working doses were selected within the validated safety range, and fixed doses rather than dose escalation were used in animal experiments.",
            "**Animal experimental termination criteria:** Humane endpoints were predefined. When animals reached any established endpoint, experiments were terminated according to the predetermined procedures.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Therefore, rather than introducing a kill-switch that does not correspond to the actual risk profile, the team established control measures specifically matched to the characteristics of each biological material.",
            "**(5) Incorporating Safety Evaluation into Experimental Design**",
            "Safety assessment was integrated as an essential component of the experimental design rather than being considered only after efficacy evaluation. The team established multiple safety-related experiments, including:",
          ],
        },
        {
          type: "list",
          items: [
            "Comparison of circRNA and linear RNA stability to support subsequent dose and administration design;",
            "Evaluation of potential on-target/off-tumor risks through cytotoxicity assays using vaccine-sensitized T cells against normal cells;",
            "Determination of the safe dosage window of LNPs to define appropriate working concentrations for subsequent experiments.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For normal cell off-target evaluation, the team selected four normal cell lines: HLEC, LX-2, BEAS-2B, and MCF12A, covering major normal tissues potentially associated with the selected targets. All selected cells were confirmed to have an HLA-A*02:01 background.",
            "The experiments included MDA-MB-231 positive control target cells and were performed under effector-to-target ratios of 80:1 and 100:1 to improve the reliability of safety evaluation.",
            "Additionally, empty-vector controls were included during experimental design to distinguish antigen-specific immune effects from potential non-specific effects caused by adjuvants or delivery systems, preventing incorrect interpretation of experimental results.",
            "**(6) Implementing Safety Requirements Through Design Iteration**",
            "During the development of the experimental strategy, the team continuously refined the design based on safety evaluations. The major design changes are summarized below:",
          ],
        },
        {
          type: "table",
          headers: [
            "Original Feasible Approach",
            "Risk considerations",
            "Revised plan",
          ],
          rows: [
            [
              "Use full-length antigens as immunogens",
              "Normal tissues also express these antigens, and immune responses may be difficult to predict and control",
              "Use 9-mer HLA-A*02:01-restricted CTL epitopes",
            ],
            [
              "Use full-length C3d as an adjuvant",
              "Full-length C3d contains additional biological functions beyond the experimental requirements",
              "Use the minimal functional fragment P28 (4 copies)",
            ],
            [
              "Package lentivirus independently in the laboratory",
              "Introduces additional steps including viral packaging, collection, and concentration, increasing operational risks",
              "Purchase commercially available lentivirus with confirmed titer",
            ],
            [
              "Obtain PBMCs through blood collection from team members or volunteers",
              "Increases risks associated with blood collection procedures and donor information management",
              "Use commercially available, de-identified PBMCs with HLA typing and serological screening completed",
            ],
            [
              "Perform in vivo dose escalation studies",
              "Increases animal usage and experimental burden",
              "Use a fixed dosage without dose escalation",
            ],
            [
              "Administer the vaccine through intravenous injection",
              "Increases invasiveness and operational complexity, and may introduce differences in administration pathways",
              "Use subcutaneous injection at three sites",
            ],
            [
              "Deliver circRNA using lipid transfection reagents",
              "Delivery materials may interfere with dendritic cell activation and influence experimental interpretation",
              "Use electroporation-based circRNA delivery",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Through these iterative design improvements, safety considerations were integrated into concrete decisions regarding the vector system, molecular components, material selection, administration strategy, and experimental methodology.",
            "**（7）Defining the Scope and Limitations of Experimental Conclusions**",
            "Beyond experimental procedures themselves, the team also predefined the scope of interpretation for research conclusions to avoid extending conclusions beyond the evidence supported by experimental data.",
            "For example, since each time point in the stability experiment was analyzed using a single lane, no degradation model was fitted and no half-life was reported. Similarly, the LNP dose window experiment only evaluated in vitro cell viability within a 24-hour period using a single cell type; Therefore, the results cannot be used to infer repeated-dose toxicity or systemic toxicological effects.",
            "Furthermore, the epitopes used in this stage are all human HLA-A*02:01-restricted epitopes, whereas wild-type BALB/c mice possess an H-2d background. Therefore, the current animal experiments are primarily used as a proof-of-concept validation at the platform level, rather than a complete validation of antigen-specific immune efficacy. The team has included validation using HLA-A*02:01 transgenic mice or humanized mouse models in future research plans.",
            "By clearly defining the boundaries of research conclusions, the team avoids interpreting experimental results beyond the conditions currently supported by the experimental design, thereby reducing the risk of misinterpretation during subsequent research and potential applications.",
            "**Summary**",
            "Through the above design process, safety requirements were incorporated into the development of CirCure’s Wet Lab strategy and specifically implemented in multiple aspects, including vector selection, molecular component design, material substitution, technical route optimization, control design, dosage management, and safety evaluation.",
            "Combined with the risk identification and mitigation strategies established in Dry Lab (Section 4.1.1), the team further shifted safety management from the experimental operation stage to the experimental design stage, providing a safety-oriented foundation for subsequent animal experiments and laboratory implementation.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2",
          index: "4.1.2.2",
          title: "Safety by Design in animal experiment",
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-1",
          index: "4.1.2.2.1",
          title: "Experimental Design Assistant (EDA)",
        },
        {
          type: "prose",
          paragraphs: [
            "In the animal experiment design of CirCure, we incorporated safety considerations before the initiation of experiments rather than adding safety measures after experimental implementation. Therefore, we used the **Experimental Design Assistant (EDA)** to systematically design and evaluate the in vivo experimental scheme. Combined with the **ARRIVE Essential 10**, we reviewed key aspects of the experimental design, including research hypotheses, sample size, inclusion and exclusion criteria, randomization and blinding, outcome measures, statistical methods, and experimental animals.",
            "EDA does not simply assist in establishing experimental procedures. Instead, it transforms established experimental design principles into practical design checkpoints, ensuring that **scientific validity, animal welfare, and the rational use of animals become essential constraints in the design of CirCure animal experiments**. Through this process, our animal experiments were further developed from merely “evaluating vaccine efficacy” into a comprehensive research design with clearly defined hypotheses, measurable outcomes, predefined risk control strategies, and statistical analysis plans.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-1-1",
          index: "4.1.2.2.1.1",
          title: "From Existing Standards to Our Own Safety Practice",
        },
        {
          type: "prose",
          paragraphs: [
            "The design of our animal experiments was built upon existing standards for experimental design and animal research. EDA translates established research design requirements, such as the **ARRIVE Essential 10**, into actionable design assessments, helping us systematically consider experimental hypotheses, sample size determination, randomization, blinding, outcome measures, and statistical analysis.",
            "Based on these principles, we did not simply apply a general template. Instead, we further optimized the experimental design according to the specific research objectives of **CirCure**, including the selection of animal models, experimental grouping strategy, evaluation indicators, and animal welfare requirements.",
            "Therefore, EDA demonstrates how our team transformed existing knowledge and established standards into project-specific safety practices: by identifying potential risks in animal experiment design, improving the experimental strategy accordingly, and ultimately achieving a safer and more scientifically rigorous research process.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-1-2",
          index: "4.1.2.2.1.2",
          title: "Defining a Testable Hypothesis",
        },
        {
          type: "prose",
          paragraphs: [
            "EDA first requires us to clearly define the **Null Hypothesis** and **Alternative Hypothesis**.",
            "For the in vivo experiments of CirCure, we transformed the central research question into a testable scientific hypothesis:",
          ],
        },
        {
          type: "list",
          items: [
            "**Null hypothesis:** The combined circRNA vaccine has no significant effect on tumor growth;",
            "**Alternative hypothesis:** The combined circRNA vaccine can reduce tumor growth.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "This process transformed the broad objective of “evaluating vaccine efficacy through animal experiments” into a **scientifically testable question that can be evaluated using predefined experimental endpoints and statistical methods**.",
            "This is also essential for safety-oriented experimental design. By defining the primary hypothesis and outcome measures in advance, we avoided unnecessary increases in animal numbers or experimental procedures for the purpose of collecting additional information, thereby reducing unnecessary animal use.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-1-3",
          index: "4.1.2.2.1.3",
          title: "Evidence-based Reduction of Animal Use",
        },
        {
          type: "prose",
          paragraphs: [
            "The determination of animal numbers was not based on empirical estimation alone but was evaluated through EDA-based experimental design assessment.",
            "The final experimental groups of CirCure were designed as follows:",
          ],
        },
        {
          type: "list",
          items: [
            "**PBS vehicle control: n = 5**",
            "**Empty-vector circRNA control: n = 5**",
            "**Combined circRNA vaccine: n = 5**",
            "**Reserve mice: n = 3**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "EDA evaluated the sample size design by considering factors including **effect size, statistical power, and resource equation**. Under the current experimental conditions, the n=5 group design was considered sufficient to meet the requirements for experimental comparison while balancing animal usage and available resources.",
            "The reserve mice were not intended to expand the experimental scale. Instead, they were reserved for situations where animals met predefined exclusion criteria before or during inoculation, preventing the need to add more animals due to unexpected loss of experimental subjects.",
            "This design transformed the principle of **reduction** into a specific experimental decision:",
            "**We did not determine the number of animals first and then conduct experiments; Instead, we first defined the scientific question and statistical requirements, and then determined the minimum reasonable number of animals required.**",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-1-4",
          index: "4.1.2.2.1.4",
          title:
            "Reducing Experimental Bias Through Randomisation and Blinding",
        },
        {
          type: "prose",
          paragraphs: [
            "To improve experimental reliability and minimize bias caused by subjective judgment, we incorporated **Randomisation** and **Blinding** into the experimental design based on EDA recommendations.",
            "The specific measures included:",
          ],
        },
        {
          type: "list",
          items: [
            "Animals were randomly assigned to different treatment groups;",
            "Animals were managed using coded identifiers;",
            "Tumor volume measurements were performed by personnel blinded to treatment groups;",
            "Measurement sequences at different time points were randomly arranged;",
            "Flow cytometry and immunofluorescence samples were processed in a randomized order.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "These measures reduced the possibility of unconscious operational bias caused by prior knowledge of treatment allocation.",
            "Therefore, EDA not only improved the scientific rigor of our experimental design but also **reduced** the risk of **repeated experiments and unnecessary animal use** caused by experimental bias.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-1-5",
          index: "4.1.2.2.1.5",
          title: "Integrating Animal Welfare into Experimental Design",
        },
        {
          type: "prose",
          paragraphs: [
            "Animal welfare was not considered as a corrective measure after experiments began. Instead, it was incorporated into the CirCure animal experiment design from the beginning.",
            "EDA encouraged us to define in advance:",
          ],
        },
        {
          type: "list",
          items: [
            "Under what conditions animals could enter the experiment;",
            "Under what conditions animals should be excluded;",
            "Under what conditions experiments should be terminated early.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Therefore, we established predefined inclusion and exclusion criteria and developed **humane endpoints**, including body weight changes, health status, inoculation conditions, tumor size, ulceration or necrosis, mobility, food and water intake, and signs of severe distress.",
            "When animals reached predefined humane endpoints, experiments would be terminated according to established criteria rather than waiting until severe conditions occurred.",
            "This transformed **Refinement** into a concrete experimental decision-making mechanism:",
            "**Identify welfare risks → Define endpoints in advance → Monitor continuously → Intervene before severe distress**",
            "By incorporating animal welfare criteria at the design stage, we reduced unnecessary animal suffering and improved the controllability of the experimental process.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-1-6",
          index: "4.1.2.2.1.6",
          title: "Linking Experimental Design with Data Analysis",
        },
        {
          type: "prose",
          paragraphs: [
            "EDA also helped us establish the data analysis strategy before experiments began, ensuring consistency among **experimental design, outcome measures, and statistical methods**.",
            "In CirCure, **tumor volume** was selected as the primary outcome measure. In addition, immune-related indicators were included to evaluate vaccine-induced responses, including:",
          ],
        },
        {
          type: "list",
          items: [
            "Splenic immune cells and effector molecules;",
            "**CD8⁺ T cell infiltration**;",
            "**Granzyme B**;",
            "**CD8/Granzyme B co-localisation**.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Based on the three-group experimental design, EDA supported the use of **one-way ANOVA** for group comparisons. When data did not meet the required statistical assumptions, alternative approaches such as data transformation or the **Kruskal–Wallis test** would be considered.",
            "By defining primary outcomes and analysis methods before experimentation, we reduced the possibility of changing analytical strategies based on experimental results, thereby improving the interpretability and reproducibility of the findings.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-1-7",
          index: "4.1.2.2.1.7",
          title: "What EDA Changed in CirCure",
        },
        {
          type: "prose",
          paragraphs: [
            "Through EDA, we did not simply obtain an animal experiment protocol. Instead, we conducted a multi-level evaluation of the scientific validity and safety of CirCure’s in vivo experiments:",
          ],
        },
        {
          type: "table",
          headers: [
            "EDA-supported decision",
            "How it contributes to CirCure safety",
          ],
          rows: [
            [
              "Define clear null and alternative hypotheses",
              "Avoids unnecessary expansion of experimental scope",
            ],
            [
              "Evaluate sample size",
              "Minimizes animal use while meeting research requirements",
            ],
            [
              "Include reserve mice",
              "Reduces the possibility of repeated animal supplementation due to predefined exclusions",
            ],
            [
              "Randomisation",
              "Reduces experimental bias caused by group allocation",
            ],
            [
              "Blinding",
              "Reduces bias caused by subjective observation and measurement",
            ],
            [
              "Predefined inclusion/exclusion criteria",
              "Identifies experimental risks before implementation",
            ],
            ["Humane endpoints", "Reduces unnecessary animal suffering"],
            [
              "Predefine outcomes and statistical methods",
              "Improves reliability and reproducibility of experimental results",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Therefore, EDA enabled CirCure to establish a closed-loop framework from existing standards to project-specific implementation.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-1-8",
          index: "4.1.2.2.1.8",
          title: "From Laboratory Design to Real-world Responsibility",
        },
        {
          type: "prose",
          paragraphs: [
            "CirCure aims not only to demonstrate the potential efficacy of the combined circRNA vaccine in a laboratory setting. The data generated from animal experiments will also influence our evaluation of vaccine efficacy, immune responses, and future research directions.",
            "Therefore, we consider that the safety and scientific rigor of animal experiments themselves are essential components in the transition of future biomedical products toward real-world applications.",
            "By incorporating EDA, ARRIVE Essential 10, the 3R principles, randomisation, blinding, and humane endpoints before the initiation of animal experiments, we aimed to establish an **traceable, interpretable, and verifiable in vivo research workflow**.",
            "This approach enables CirCure’s safety design to focus not only on “whether the experiment can be completed”, but also on:",
            "**“Why was the experiment designed in this way, why were animals used in this manner, how were risks controlled in advance, and whether the experimental results can reliably support subsequent decisions.”**",
            "Through this process, we transformed animal experiment safety from a single requirement focused on animal welfare into a comprehensive design principle that connects **scientific validity, risk management, animal ethics, and real-world translation**.",
          ],
        },
        {
          type: "feature",
          key: "safety-document-14",
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2",
          index: "4.1.2.2.2",
          title: "Animal use form",
        },
        {
          type: "prose",
          paragraphs: [
            "iGEM requires teams planning to use vertebrates or higher-order invertebrates to complete an **Animal Use Form**. Animal experiments can only be conducted after the application has been reviewed and approved.Therefore, after further improving our animal experimental design through the **Experimental Design Assistant (EDA)**, we completed the **Animal Use Form** for CirCure and obtained official approval before conducting the relevant animal experiments.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-15",
        },
        {
          type: "prose",
          paragraphs: [
            "The Animal Use Form mainly includes the following contents:",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-1",
          index: "4.1.2.2.2.1",
          title: "Why Animal Experiments Are Necessary",
        },
        {
          type: "prose",
          paragraphs: [
            "The purpose of CirCure is not only to verify whether the vaccine can induce immune responses in vitro, but also to determine whether it can **generate systemic anti-tumor immunity and inhibit tumor growth within an intact immune system**. This process involves multiple biological events, including dendritic cell uptake, lymph node migration, CD8⁺ T cell activation and expansion, tumor infiltration, and cytotoxic effects within the tumor microenvironment, which cannot be fully reproduced by in vitro or computational models.",
            "Therefore, the team designed animal experiments as the **final validation step** of the entire project. Dry Lab analysis and human-derived in vitro experiments were completed first, and only the best-performing **Combined circRNA vaccine** candidate was selected for subsequent animal evaluation.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-2",
          index: "4.1.2.2.2.2",
          title: "Application of the 3R Principles in Animal Experiments",
        },
        {
          type: "prose",
          paragraphs: [
            "The team incorporated the principles of **Replacement, Reduction, and Refinement** throughout the entire experimental process:",
          ],
        },
        {
          type: "list",
          items: [
            "**Replacement:** Computational methods were used for antigen and epitope screening. Candidate epitope evaluation was further conducted using human-derived DC–T cell co-culture systems. Meanwhile, alternative approaches, including 3D tumor spheroids, organoids, and tumor-on-chip models, were considered as potential replacements for animal experiments.",
            "**Reduction:** Only one final vaccine candidate and three experimental groups were used. Tumor tissues and spleen samples for immunological analysis were collected from the same group of animals to maximize data acquisition while minimizing animal usage. The total number of animals was 18, including 15 experimental animals and 3 reserve animals.",
            "**Refinement:** A subcutaneous tumor model was selected instead of models requiring surgical procedures. Tumor progression was monitored non-invasively using calipers. Humane endpoints were predefined, and animals were not allowed to reach severe distress or terminal conditions.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-3",
          index: "4.1.2.2.2.3",
          title: "Animal Model and Experimental Design",
        },
        {
          type: "prose",
          paragraphs: [
            "The team selected **SPF-grade female BALB/cAnNCrl mice with a TROP2-overexpressing 4T1 tumor model**.",
            "The experimental groups were designed as follows:",
          ],
        },
        {
          type: "list",
          items: [
            "PBS vehicle control group (n = 5)",
            "Empty-vector circRNA control group (n = 5)",
            "Combined circRNA vaccine treatment group (n = 5)",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Animals were assigned through complete randomization. Although treatment personnel could not be fully blinded, **tumor measurements, immunological analyses, and image quantification were performed using coded samples under blinded conditions** to reduce subjective bias.",
            "The experiment included a maximum of five immunizations and lasted up to Day 35. If sufficient data were obtained earlier, the experiment could be terminated in advance without increasing the number of immunizations or extending animal burden.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-4",
          index: "4.1.2.2.2.4",
          title: "Animal Welfare and Safety Assurance",
        },
        {
          type: "prose",
          paragraphs: [
            "Animal experiments will be conducted in the SPF barrier facility of the Experimental Animal Center at the Institute of Translational Medicine, The First Hospital of Jilin University. Professional animal caretakers and veterinarians will provide support throughout the experiment. All personnel involved in animal procedures must complete relevant training and pass operational competency assessments before independently conducting animal experiments.",
            "Clear humane endpoints were established, including:",
          ],
        },
        {
          type: "list",
          items: [
            "Tumor diameter reaching 1.5 cm;",
            "Tumor ulceration, necrosis, impaired normal activity, or reduced food/water intake;",
            "Body condition score reaching the predefined threshold;",
            "Severe distress or abnormal behavior.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Once animals reached any predefined endpoint, humane euthanasia would be immediately performed rather than waiting until the scheduled experimental endpoint.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-5",
          index: "4.1.2.2.2.5",
          title: "What Can Be Learned from Animal Experiments",
        },
        {
          type: "prose",
          paragraphs: [
            "Animal experiments mainly address two key questions that cannot be fully answered through in vitro studies:",
          ],
        },
        {
          type: "list",
          items: [
            "**Whether CirCure can inhibit tumor growth in vivo;**",
            "**Whether this inhibition is associated with local and systemic CD8⁺ T cell immune activation.**",
          ],
        },
        {
          type: "prose",
          paragraphs: ["The main data obtained include:"],
        },
        {
          type: "list",
          items: [
            "Tumor growth dynamics and final tumor volume;",
            "CD8⁺ T cell infiltration and Granzyme B expression in tumors;",
            "Dendritic cell maturation, CD8⁺ T cell activation/memory, and effector molecule expression in spleens.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-6",
          index: "4.1.2.2.2.6",
          title: "Sample Size and Statistical Design",
        },
        {
          type: "prose",
          paragraphs: [
            "A three-group parallel experimental design was adopted, with each individual mouse considered as the experimental unit. A tumor growth inhibition (TGI) ≥ 50% was defined as a biologically meaningful effect threshold, and sample size estimation was performed based on expected variability.",
            "The final design of n = 5 mice per group represents a balance between statistical requirements, resource equation considerations, and minimizing animal use.",
            "The primary statistical analysis will use one-way ANOVA. Comparisons between Combined vaccine vs. empty-vector control and empty-vector control vs. PBS control were predefined. If statistical assumptions are not satisfied, data transformation or non-parametric methods will be considered.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-7",
          index: "4.1.2.2.2.7",
          title: "Project Value and Open Sharing",
        },
        {
          type: "prose",
          paragraphs: [
            "The team plans to report the animal experiments according to **ARRIVE 2.0 guidelines** and share the complete experimental design, EDA report, randomization and blinding procedures, animal data, as well as negative or uncertain results.",
            "This approach improves research transparency and enables future researchers to perform more accurate sample size estimation, thereby reducing unnecessary repeated animal experiments.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-8",
          index: "4.1.2.2.2.8",
          title: "Development of Experimental Animal White Papers",
        },
        {
          type: "prose",
          paragraphs: [
            "To ensure the safe and compliant implementation of animal experiments, the team developed **White Paper on Compliance Management and System Construction of Experimental Animal Models** (see Section 1.2) and **White Paper on Technical Implementation and Risk Prevention of Experimental Animal Models.**These documents provided guidance for animal experiment management and directly influenced the experimental design process, including animal model selection, risk assessment, welfare protection, and compliance management.",
          ],
        },
        {
          type: "feature",
          key: "safety-white-paper-16",
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-9",
          index: "4.1.2.2.2.9",
          title: "Animal Model Quality Control and Biological Risk Management",
        },
        {
          type: "prose",
          paragraphs: [
            "To ensure the reliability of experimental results and reduce potential biosafety risks, the team strictly monitored the source, health status, and microbiological quality of experimental animals.",
            "Based on the previously developed White Paper on Technical Implementation and Risk Prevention of Experimental Animal Models, the team classified experimental animals according to microbiological quality control standards into different levels, including Conventional (CV), Clean (CL), Specific Pathogen Free (SPF), and Germ Free (GF) animals. Different animal grades have distinct application ranges and management requirements.",
            "Among these, SPF-grade animals are widely used in formal scientific research because they are free from a variety of specific pathogens that may interfere with experimental outcomes. Their well-defined microbiological background improves the reliability, reproducibility, and comparability of experimental data.",
            "Therefore, during the experimental design stage, the team:",
          ],
        },
        {
          type: "list",
          items: [
            "Confirmed that the source of experimental animals was legitimate and traceable;",
            "Verified basic animal information, including strain, age, sex, and health status;",
            "Ensured that animals met the quality-grade requirements corresponding to the experimental objectives;",
            "Minimized potential bias caused by undetected infections or differences in animal health conditions.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Meanwhile, the team followed the ARRIVE 2.0 guidelines to record experimental animal information, including species, strain, sex, age, health status, and experimental procedures, ensuring transparency and reproducibility of the research.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-1-2-2-2-10",
          index: "4.1.2.2.2.10",
          title: "Ethical Review and Compliance Approval",
        },
        {
          type: "prose",
          paragraphs: [
            "Before conducting animal experiments, the team established an **animal experiment ethical review process** to further evaluate whether the planned animal study met ethical requirements.",
            "The animal experiment proposal included:",
          ],
        },
        {
          type: "list",
          items: [
            "The rationale for animal model selection;",
            "Experimental objectives and scientific necessity;",
            "Animal number design;",
            "Experimental procedures;",
            "Animal welfare protection measures;",
            "Potential risks and emergency response plans.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Only after review by the responsible personnel and ethical approval could the experiment proceed. The team strictly prohibited conducting animal experiments without approval or performing procedures beyond the approved experimental scope.",
            "In addition, all personnel involved in animal experiments were required to complete relevant training before participation. Training covered experimental animal welfare, biosafety requirements, and standardized operating procedures. Members who had not completed training or passed competency assessments were not permitted to participate in critical animal experiment operations.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-2",
          index: "4.2",
          title: "4.2 Experimental Operation",
        },
        {
          type: "subheading",
          id: "safety-4-2-1",
          index: "4.2.1",
          title: "Laboratory Operation Safety Management",
        },
        {
          type: "prose",
          paragraphs: [
            "To ensure that experimental procedures are conducted safely, consistently, and with full traceability, the team established a comprehensive laboratory operation safety management process based on the “Laboratory Safety Standards White Paper.” This framework was developed according to the Biosecurity Law of the People’s Republic of China, Laboratory Biosafety General Requirements (GB 19489-2008), Regulations on Safety Management of Genetic Engineering, Regulations on the Safety Management of Hazardous Chemicals, ISO 45001, ISO 15190:2020, OECD Waste Management Guidelines, and relevant iGEM biosafety requirements.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-2-1-1",
          index: "4.2.1.1",
          title: "Before Experiment: Risk Assessment and Preparation",
        },
        {
          type: "prose",
          paragraphs: [
            "Before starting any experiment, team members conduct a systematic risk assessment and complete the **Laboratory Risk Assessment Report.** The report includes the experimental objectives and procedures, potential risks associated with chemicals, biological materials, and equipment, risk classification, preventive measures, emergency response procedures, and required personal protective equipment (PPE). The report must be reviewed and approved by the laboratory safety supervisor before experimental activities can begin.",
            "After completing the risk assessment, experimental personnel conduct a pre-experiment safety inspection, including:",
          ],
        },
        {
          type: "list",
          items: [
            "Confirming that experimental reagents and consumables are sufficient and properly labeled;",
            "Checking the operational status of laboratory equipment, including the chemical fume hood, biological safety cabinet, centrifuges, and other relevant instruments;",
            "Verifying that personal protective equipment is complete and available;",
            "Ensuring that the experimental environment meets operational requirements.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For experiments involving animals, additional preparation is required before initiation, including confirmation of animal sources, health status verification, and validation of experimental conditions. Supervisors and relevant management personnel jointly confirm environmental parameters, sterilization status of experimental equipment, and the quality of reagents and consumables.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-2-1-2",
          index: "4.2.1.2",
          title:
            "During Experiment: Standardized Operation and Risk Monitoring",
        },
        {
          type: "prose",
          paragraphs: [
            "During experiments, all team members strictly follow established Standard Operating Procedures (SOPs) and are not allowed to modify experimental procedures without authorization. Personnel must continuously wear appropriate personal protective equipment, including laboratory coats, protective gloves, and safety goggles. Gloves that may be contaminated must not be used to touch public areas or shared equipment. Eating, drinking, and storing food are strictly prohibited in experimental areas.",
            "A complete experimental record system is implemented throughout the operation process:",
          ],
        },
        {
          type: "list",
          items: [
            "Experimental parameters, results, and abnormal events are recorded promptly;",
            "When using hazardous chemicals, personnel must complete the **Hazardous Chemical Usage Registration Form**, documenting the usage time, quantity, and purpose;",
          ],
        },
        {
          type: "feature",
          key: "safety-folders-17",
        },
        {
          type: "list",
          items: [
            "In the event of leakage, splashing, equipment malfunction, or other abnormal situations, experimental procedures must be immediately suspended, and the incident must be reported to the laboratory safety supervisor.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "For experimental animal procedures, the team implemented a standardized recording system to document animal identification numbers, experimental dates, procedures performed, dosages, animal conditions, and any abnormal events. These records are jointly verified by the personnel responsible for documentation and supervising personnel to ensure full traceability throughout the experimental process.",
            "Meanwhile, the team established a risk event feedback mechanism. Any potential safety issues identified during experiments, including equipment abnormalities, procedural deviations, or near-miss events, must be promptly documented and reported. These records are used for subsequent risk analysis and continuous improvement of the safety management system.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-2-1-3",
          index: "4.2.1.3",
          title: "After Experiment: Disposal, Cleaning and Documentation",
        },
        {
          type: "prose",
          paragraphs: [
            "After completing experiments, the team conducts comprehensive cleaning procedures and waste disposal according to laboratory safety requirements.",
            "For routine experimental procedures:",
          ],
        },
        {
          type: "list",
          items: [
            "All biological materials, chemicals, and consumables are classified and disposed of according to established requirements;",
            "Biological waste is properly sterilized and transferred to qualified professional institutions for disposal;",
            "Chemical waste liquids are collected separately according to their categories and are not directly discharged into drainage systems;",
            "Experimental benches, biological safety cabinets, and related equipment are thoroughly cleaned;",
            "Unnecessary equipment is switched off, and the safety status of water, electricity, and gas supplies is confirmed;",
            "Personal protective equipment is removed following standardized procedures, followed by proper hand washing.",
          ],
        },
        {
          type: "prose",
          paragraphs: ["For experiments involving animals:"],
        },
        {
          type: "list",
          items: [
            "Animal carcasses are handled as infectious waste according to relevant requirements, and the **Animal Carcass Disposal Log** is completed;",
            "Experimental waste is collected separately according to categories, including infectious waste, sharps, and hazardous waste, with records maintained in the **Waste Disposal Log**;",
            "Experimental areas are disinfected after completion, and the **Cleaning and Disinfection Record Form** is completed.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "After experiments, the team archives all relevant experimental documentation, including ethical approval documents, animal qualification certificates, experimental operation records, data records, supervision records, corrective action reports, and waste disposal certificates. These materials are organized and stored according to the workflow of experimental preparation, experimental implementation, experiment completion, and compliance review.",
            "Through the establishment of a comprehensive management system covering **pre-experiment risk assessment — standardized operation during experiments — post-experiment record archiving,** the team integrates safety management into every stage of experimental design and implementation. This ensures that the project can proceed effectively while complying with biosafety requirements, laboratory safety standards, and animal ethics principles.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-2-1-4",
          index: "4.2.1.4",
          title: "Virtual Laboratory",
        },
        {
          type: "prose",
          paragraphs: [
            "In addition to actual experimental operations, we established a **Virtual Laboratory** to do experimental training before the initiation of real laboratory work. For personnel who are unfamiliar with specific experiments or have limited operational experience, we transformed experimental procedures and key operations into virtual training modules. This allows participants to become familiar with experimental steps, operation sequences, and standardized requirements without direct exposure to biological materials or laboratory equipment.",
            "The Virtual Laboratory is not simply a simulation of real experiments, but a **risk prevention tool **designed based on actual experimental workflows and operational safety requirements. Through this platform, we identify and control risks caused by insufficient operational experience before personnel enter the real experimental environment. This enables researchers to develop fundamental safety awareness and procedural understanding before conducting practical experiments.",
            "This design also reflects our broader understanding of experimental risk management: **safety does not only mean controlling risks after they occur, but also preventing risks before experiments begin.** Therefore, the Virtual Laboratory is integrated with personnel training, standardized operation procedures, and risk assessment in real experiments, together forming a continuous safety assurance chain from pre-experimental preparation to practical implementation.",
            "Through this tool, we aim to preserve the practical value of hands-on laboratory training while providing experimental personnel with a safer learning and practice environment.",
          ],
        },
        {
          type: "subheading",
          id: "safety-4-3",
          index: "4.3",
          title: "4.3 Conclusion",
        },
        {
          type: "prose",
          paragraphs: [
            "By integrating risk management principles throughout both experimental design and laboratory operation, the team established a systematic safety management framework covering both Dry Lab and Wet Lab activities. AI-assisted analysis, bioinformatics screening, animal experiment procedures, and laboratory operation workflows were all conducted under comprehensive risk assessment and supervision.",
            "The team consistently balanced **scientific validity, safety, and ethical responsibility**, ensuring that the research process complied with biosafety standards and experimental ethics requirements. This framework provides essential support for the successful implementation of the project and enhances the reliability and reproducibility of the research outcomes.",
          ],
        },
      ],
    },
    {
      id: "safety-orientation",
      index: "5",
      kicker: "",
      navLabel: "Orientation",
      title: "Orientation",
      summary: "",
      blocks: [
        {
          type: "table",
          headers: ["Point", "Our Practices", "Values Reflected"],
          rows: [
            [
              "Contribution",
              "Establishing a Four-Level Laboratory Safety Training System safety  covering access training, technical training, emergency training, and management training, together with a safety question bank",
              "Establishing a systematic safety competency development mechanism",
            ],
            [
              "Existing Knowledge",
              "Integrating ISO 29993 and experimental safety requirements into training design and assessment",
              "Transforming safety principles into team practice",
            ],
            [
              "Risk Management",
              "Matching specialized training and experimental authorization with different experimental risks",
              "Ensuring that personnel capabilities match experimental risks",
            ],
            [
              "Validation",
              "Evaluating training effectiveness through examinations, practical assessments, emergency drills, and random inspections",
              "Making safety competencies assessable and traceable",
            ],
            [
              "Real-world",
              "Transforming safety knowledge into continuous training and review mechanisms to cultivate long-term safety awareness",
              "Promoting the integration of safety culture into research practice",
            ],
          ],
        },
        {
          type: "subheading",
          id: "safety-5-1",
          index: "5.1",
          title: "5.1 Laboratory Personnel Training",
        },
        {
          type: "prose",
          paragraphs: [
            "To ensure that all laboratory members possess the necessary safety awareness, operational skills, and emergency response capabilities before conducting experimental activities, JLU-FBH iGEM team established a **Four-Level Laboratory Safety Training System**. This system covers four levels of training: **general access training, specialized skill training, emergency response training, and management training**, enabling the systematic development of laboratory safety competencies.The entire training process is organized and implemented by the **Laboratory Safety Management Committee**. The training framework is designed according to **ISO 29993: Learning services — Requirements for non-formal education and training services**, ensuring that training content is appropriate, procedures are transparent, and assessment methods are fair.All training attendance records and assessment results are documented in the **Safety Training Sign-in and Assessment Record**.",
            "All newly admitted laboratory members must complete safety training and pass the corresponding assessment before obtaining laboratory access authorization. In addition, laboratory members are required to participate in safety refresher training and pass reassessment at least once every six months to maintain their experimental competency and safety awareness.Members who fail the assessment will temporarily lose their experimental authorization until they successfully complete the reassessment.",
          ],
        },
        getSafetyFigure(
          "5-1-four-level-laboratory-safety-training-system-form.avif",
        ),
        {
          type: "subheading",
          id: "safety-5-1-1",
          index: "5.1.1",
          title: "5.1.1 Level 1 Training: General Orientation Training",
        },
        {
          type: "prose",
          paragraphs: [
            "General Orientation Training is a fundamental training program that all new laboratory members must complete before entering the laboratory environment. It is applicable to students, visitors, and newly joined members. This stage aims to establish basic laboratory safety awareness and provide members with essential safety knowledge required for laboratory access.",
            "The training contents include:",
          ],
        },
        {
          type: "list",
          items: [
            "Fire safety;",
            "Chemical hazard identification;",
            "Interpretation of Material Safety Data Sheets (MSDS);",
            "Seven-step handwashing procedure;",
            "Emergency evacuation procedures.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The training is conducted through a combination of **online video learning and offline lectures**. After completing the training, members are required to take an online examination with a full score of 100 points. A score of **90 points or above** is required to pass.",
          ],
        },
        {
          type: "subheading",
          id: "safety-5-1-2",
          index: "5.1.2",
          title: "5.1.2 Level 2 Training: Specialized Skills Training",
        },
        {
          type: "prose",
          paragraphs: [
            "Specialized Skills Training is designed for laboratory personnel involved in specific high-risk operations, including the use of Biological Safety Cabinets, operation of high-pressure sterilizers, and gas cylinder replacement.",
            "This stage focuses on developing members’ ability to correctly operate laboratory equipment and properly use personal protective equipment. The training contents include:",
          ],
        },
        {
          type: "list",
          items: [
            "Standard operating procedures for laboratory equipment;",
            "Intensive training on the use and proper wearing of personal protective equipment.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The training is conducted through a combination of **on-site demonstrations and practical assessments**. Relevant personnel must be verified by the Laboratory Safety Officer on site and complete the corresponding training records before being authorized to perform related experimental operations.",
          ],
        },
        {
          type: "subheading",
          id: "safety-5-1-3",
          index: "5.1.3",
          title: "5.1.3 Level 3 Training: Emergency Drill Training",
        },
        {
          type: "prose",
          paragraphs: [
            "Emergency Drill Training is designed for all laboratory members and aims to improve their ability to respond to and manage unexpected laboratory incidents.",
            "The training contents include:",
          ],
        },
        {
          type: "list",
          items: [
            "Chemical spill response;",
            "First aid for personnel burns and poisoning;",
            "Emergency response procedures for Biological Safety Cabinet leakage incidents.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "This training is conducted through on-site emergency drills involving all laboratory members. The entire drill process is documented, including on-site photo records and drill summary reports, to ensure that members are familiar with emergency procedures and are able to properly use relevant safety facilities.",
          ],
        },
        {
          type: "subheading",
          id: "safety-5-1-4",
          index: "5.1.4",
          title:
            "5.1.4 Level 4 Training: Laboratory Safety Management Training",
        },
        {
          type: "prose",
          paragraphs: [
            "Laboratory Safety Management Training is primarily designed for **laboratory safety supervisors and members of the Laboratory Safety Management Committee**. It aims to develop laboratory safety management capabilities and improve the overall performance of the laboratory safety system.",
            "The training contents include:",
          ],
        },
        {
          type: "list",
          items: [
            "Accident investigation techniques;",
            "Updates on laws and regulations;",
            "Auditing of laboratory safety management systems.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The training is conducted through a combination of **online video learning and offline lectures** to enhance the ability of safety management personnel in laboratory safety policy development, implementation supervision, and continuous improvement of the safety management system.",
          ],
        },
        {
          type: "subheading",
          id: "safety-5-1-5",
          index: "5.1.5",
          title: "Summary",
        },
        {
          type: "prose",
          paragraphs: [
            "Through the **Four-Level Laboratory Safety Training System**, the team established a comprehensive training mechanism covering **personnel access authorization, skill development, emergency response, and safety management**. This system enables laboratory safety management to gradually shift from post-incident response toward proactive risk prevention before experiments begin, promoting the development of a laboratory safety culture where everyone prioritizes safety and every procedure follows standardized practices.",
          ],
        },
        {
          type: "subheading",
          id: "safety-5-2",
          index: "5.2",
          title: "5.2 Laboratory Safety Question Bank",
        },
        {
          type: "prose",
          paragraphs: [
            "To further consolidate the effectiveness of laboratory safety training and improve team members’ understanding and application of laboratory safety requirements, JLU-FBH iGEM team developed and established a **Laboratory Safety Knowledge Question Bank** based on the existing safety training system.",
            "The question bank was designed around the contents of the team’s laboratory safety training program and covers key topics including **general laboratory safety regulations, chemical safety, biosafety, personal protective equipment, and emergency response**. It is used to support post-training knowledge review and safety competency assessment. Through the development of this question bank, the team further structured safety training content, enabling members to evaluate their understanding of safety knowledge during the learning process.",
            "The completed safety question bank was integrated into the ***Wenjuanxing***** (Questionnaire Star)** platform. By utilizing the platform’s random question generation function, automated assessment questionnaires could be created. For each assessment, the system randomly selects **30 questions** from the question bank to generate an independent questionnaire. This ensures that different members receive different combinations of questions during safety assessments, improving the randomness and effectiveness of the evaluation process.",
            "Through the development and application of the laboratory safety question bank, team members continuously strengthen their safety awareness and deepen their understanding of laboratory procedures and risk control measures through a cycle of **training, assessment, and feedback**. This provides additional safety support for subsequent experimental operations. Meanwhile, the question bank serves as an important supplement to the team’s safety training system and supports the continuous implementation of laboratory safety education.",
          ],
        },
        {
          type: "subheading",
          id: "safety-5-3",
          index: "5.3",
          title: "5.3 Conclusion",
        },
        {
          type: "prose",
          paragraphs: [
            "Through the establishment of a systematic **Four-Level Laboratory Safety Training System** and the accompanying **Laboratory Safety Knowledge Question Bank**, the JLU-FBH iGEM team achieved comprehensive training coverage ranging from fundamental safety awareness, experimental skill development, and emergency response capability enhancement to laboratory safety management improvement.",
            "The team integrated safety education into the personnel preparation stage before experimental activities. Through continuous learning, assessment, and feedback, team members’ safety awareness and standardized operating capabilities were continuously strengthened, providing a solid foundation for the safe and orderly implementation of experimental activities.",
          ],
        },
      ],
    },
    {
      id: "safety-network",
      index: "6",
      kicker: "",
      navLabel: "Network",
      title: "Network",
      summary: "",
      blocks: [
        {
          type: "table",
          headers: ["Point", "Our Practices", "Values Reflected"],
          rows: [
            [
              "Contribution",
              "Connecting laboratories, research communities, industries, patients, and the public, extending safety concepts beyond the laboratory environment",
              "Extending laboratory safety toward societal safety",
            ],
            [
              "Existing Knowledge",
              "Adapting existing safety standards, risk assessment approaches, and biosafety principles based on different scenarios",
              "Transforming existing safety knowledge into practical applications",
            ],
            [
              "Risk Management",
              "Re-identifying risks in different contexts, including public engagement activities, student experiments, and potential product applications, and adjusting activity designs accordingly",
              "Managing project risks in real-world scenarios",
            ],
            [
              "Validation",
              "Improving safety measures through team discussions, public feedback, and practical experience from outreach activities",
              "Making safety practices feedback-driven and adaptable",
            ],
            [
              "Real-world",
              "Understanding the requirements of real-world applications of synthetic biology through communication with industries, patients, the public, and research communities",
              "Promoting the responsible application of synthetic biology in real-world contexts",
            ],
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "iGEM encourages teams to extend synthetic biology research beyond the laboratory and into real-world contexts, promoting the responsible development of scientific technologies through **Human Practices (HP)** and **Education**. Based on this concept, the JLU-FBH iGEM team recognizes that Safety and Security should not be regarded merely as constraints during experimental operations, but as fundamental principles integrated throughout the entire process of scientific design, technology communication, and future application.",
            "For synthetic biology projects, safety involves not only risk control during experiments, but also how scientific knowledge is correctly understood, how technologies are responsibly applied, and how research outcomes can safely enter society. Therefore, within the SAFE ON framework, the team established the **Network module** to build an open safety communication network connecting the laboratory, campus, and the broader public.",
            "Through the **Safety and Security Network**, the team aims to establish connections between the laboratory and society, as well as between research design and practical applications.",
          ],
        },
        {
          type: "list",
          items: ["**Connecting the Laboratory with Society**"],
        },
        {
          type: "prose",
          paragraphs: [
            "Through educational activities, public communication, and safety knowledge dissemination, the team transformed biosafety concepts developed within the laboratory into safety awareness that can be understood and participated in by the public. This process expands Safety and Security from a responsibility limited to researchers into an issue of shared concern across society.",
            "Meanwhile, the team not only focused on risk management within its own experimental processes, but also incorporated safety considerations into the design of outreach activities, science communication, and collaborative exchanges, ensuring that safety principles were integrated throughout the entire project lifecycle.",
          ],
        },
        {
          type: "list",
          items: [
            "**Connecting Research Design with Real-world Applications**",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Considering that future synthetic biology products may eventually enter real-world application scenarios, the team communicated with different stakeholders to understand safety requirements, social acceptance, and potential risks associated with technology implementation.",
            "Through these interactions, project design was developed not only based on experimental feasibility, but also with consideration of safety, responsibility, and potential challenges during future translation and application.",
            "By establishing the **Safety and Security Network**, the team aims to extend safety management beyond the traditional boundaries of laboratory practices and develop an open safety network connecting **research, education, and society**. Through this approach, the team hopes to provide support for the responsible development and application of synthetic biology technologies.",
          ],
        },
        getSafetyFigure("6-network-overview.avif"),
        {
          type: "subheading",
          id: "safety-6-1",
          index: "6.1",
          title: "Connecting the Laboratory with Society",
        },
        {
          type: "subheading",
          id: "safety-6-1-1",
          index: "6.1.1",
          title:
            "12.7 Changchun International Medical and Health Industry Expo",
        },
        {
          type: "prose",
          paragraphs: [
            "After completing the preliminary experimental design, the JLU-FBH iGEM team hoped that the project would not be limited to laboratory validation, but could further explore the possibility of future translation into real-world applications. However, during the early stages of the project, the team still lacked a systematic understanding of the **translation pathway, safety requirements, and societal considerations** involved in transforming synthetic biology products from research concepts into practical applications.",
            "Therefore, on December 7, 2025, the team participated in the **Changchun International Medical and Health Industry Expo** and communicated with enterprises, industry professionals, and technical experts in the medical and healthcare fields. Discussions focused on vaccine development, product translation, and safety considerations in biotechnology applications.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-18",
        },
        {
          type: "prose",
          paragraphs: [
            "Through these exchanges, the team viewed experimental safety design from the perspective of **product translation** for the first time.Interactions with industry representatives helped us recognize that a solution capable of “being successfully completed and generating effective experimental results” in the laboratory does not necessarily translate directly into a future product. When a technology moves from experimental research to product development, additional questions must be addressed: **Where do the materials originate? Is the production process stable? Can key steps be traced? Can potential risks be validated? Does the final product have clearly defined safety boundaries?**",
            "This experience led the team to realize that product safety should not be evaluated only after experiments are completed; Instead, safety considerations should be incorporated during the research design stage. For example, the sources and batch information of materials should be traceable, critical experimental results should form a verifiable evidence chain, and technical routes involving additional operational risks or batch variability should be replaced with more standardized and controllable alternatives whenever possible.",
            "Therefore, the communication experience at the Changchun International Medical and Health Industry Expo provided the team with an** initial understanding** of how safety considerations should extend from experimental design to future product development.During the research stage, considerations should not be limited to **whether an experiment can succeed**, but should also include the future product’s **material traceability, manufacturing controllability, risk validation, and application boundaries**.",
            "This understanding directly influenced the subsequent design of CirCure. The team began to move certain tasks that could previously have been addressed only after experiments into the early design stage, including standardizing material source and batch records, strengthening evidence chains for key experiments, and reassessing whether specific technical routes were suitable for future translation.",
            "Through this process, safety was gradually transformed from a requirement at the laboratory operation level into a **precondition that influences product design and technical route selection**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-1-2",
          index: "6.1.2",
          title: "3.23 Endocrine Health Seminar — Professor Guo Weiying",
        },
        {
          type: "prose",
          paragraphs: [
            "On March 23, 2026, the JLU-FBH iGEM Team organized an **Endocrine Health Seminar** and invited Professor Guo Weiying to deliver a science communication session on endocrine health-related topics.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-19",
        },
        {
          type: "prose",
          paragraphs: [
            "During this activity, the team not only shared relevant health knowledge with the public, but also conducted in-depth discussions with breast cancer patients who participated in the seminar. These patients represented different stages of the breast cancer treatment journey, including individuals who had recently received a diagnosis, patients undergoing conservative treatments such as chemotherapy and radiotherapy, and patients who had completed treatment through surgery. This allowed the team to understand perspectives from different stages of breast cancer diagnosis and treatment.",
            "Through communication with breast cancer patients at different treatment stages, the team further recognized that:",
            "**When an experimental design is eventually translated into a real medical product, safety evaluation should not be determined solely by researchers and manufacturing processes, but must also consider the actual risks experienced by future users.**",
            "Patients’ concerns regarding treatment safety, potential adverse effects, long-term use risks, and quality of life encouraged the team to reconsider the experimental design of CirCure. If the ultimate goal of future research is to develop a vaccine product with real-world medical applications, then evidence related to these safety concerns should be generated during the experimental stage rather than focusing only on demonstrating therapeutic efficacy or immune activation.",
            "Therefore, the team translated patient feedback into specific safety considerations within the experimental design:",
          ],
        },
        {
          type: "list",
          items: [
            "**How can potential non-specific effects be evaluated?** → Additional off-target evaluation experiments were incorporated, using normal cell models relevant to potential future application risks.",
            "**How can risks associated with long-term use be reduced?** → circRNA stability experiments were conducted to provide evidence for dosing frequency design and cumulative exposure control, while a defined safety range was established for the working concentration of LNPs.",
            "**How can risks associated with administration methods be minimized?** → In animal experiment design, subcutaneous injection at the tail base was selected instead of more invasive administration methods.",
            "**How can therapeutic efficacy and safety be evaluated together?** → Safety assessment results were considered as an essential prerequisite for interpreting therapeutic efficacy data.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Therefore, communication with patients shifted the team’s focus from **the safety of product production and experimental procedures** toward **the safety of patients during future product use**.",
            "This experience highlighted that safety requirements for future biomedical products should not be evaluated only after product development is completed. Instead, they should be incorporated into the experimental design stage through approaches such as **off-target evaluation, dose control, administration strategy optimization, and safety validation**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-1-3",
          index: "6.1.3",
          title: "5.1 Health Run",
        },
        {
          type: "prose",
          paragraphs: [
            "Through the previous two communication activities, the team had gained insights into the priorities and concerns of different stakeholders regarding biotechnology products and therapeutic approaches, including professionals in the medical and healthcare fields as well as breast cancer patients. However, we recognized that when future biotechnology products enter real-world social environments, their development will be influenced not only by professionals and direct users, but also by broader public communities. Therefore, the team aimed to further understand how the general public perceives synthetic biology technologies, safety concepts, and the future application of biomedical products.",
            "On May 1, 2026, the JLU-FBH iGEM Team participated in the **Health Run** organized by Jilin University. During the event, the team distributed project materials, introduced concepts including synthetic biology, biotechnology applications, and the team’s project vision, and communicated with teachers and students who were interested in the project.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-20",
        },
        {
          type: "prose",
          paragraphs: [
            "Through these interactions, we found that, unlike professional researchers and patients, the general public usually does not directly access experimental data or technical details. Instead, they often form their understanding of biotechnology products through product information, science communication materials, and researchers’ explanations of potential risks. Therefore, if CirCure were to further progress from laboratory research toward practical applications, obtaining safety validation data alone would not be sufficient. It would also be necessary to ensure that such information is accurately communicated, and that the product’s application scope, research stage, and potential risks are not exaggerated or misunderstood.",
            "This understanding further influenced how the team presented project outcomes. We began to clearly distinguish between **experimentally validated results** and **potential future applications of the product**. In public communication, we explicitly stated that CirCure remains at the preclinical research stage and avoided statements beyond current evidence, such as **“curing cancer,” “replacing chemotherapy,” or “having no side effects.”** At the same time, we actively communicated the **limitations** of current animal models and experimental approaches, allowing the public to better understand the boundaries of the research findings.",
            "Therefore, communication with the general public during the Health Run highlighted an often-overlooked aspect of product translation: **social use safety**. Product safety should not only be validated through experiments, but also supported by accurate information communication to prevent inappropriate use, unrealistic expectations, and misunderstanding of potential risks.",
            "Through this process, the team further expanded its understanding of **product safety**, evolving from a focus on **experimental safety → user safety → safety in societal applications**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-1-4",
          index: "6.1.4",
          title: "8.2-8.4Grand APiC Conference",
        },
        {
          type: "prose",
          paragraphs: [
            "Through previous communication activities, the team had gained an initial understanding that the transition of biotechnology projects from laboratory research to real-world applications requires consideration of not only technical feasibility, but also safety requirements and practical challenges during future product translation. To further evaluate the rationality of our project design from an industrial perspective, the JLU-FBH iGEM Team participated in the Grand APiC Conference Industry Exchange Event from August 2 to August 4, 2026, where we communicated with other participating teams, enterprises, and industry professionals.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-21",
        },
        {
          type: "prose",
          paragraphs: [
            "Compared with previous activities, the significance of the Grand APiC Conference was not simply to further understand industrial needs, but to **bring the safety requirements identified through previous interactions back into CirCure and evaluate whether these considerations had truly been incorporated into our research design from the perspective of product translation.**",
            "Through earlier communication with industry professionals, patients, and the public, the team’s understanding of future product safety had gradually expanded from laboratory operational safety toward broader considerations, including **material and manufacturing process controllability, future user safety requirements, and risk communication after products enter society**.Therefore, at the Grand APiC Conference, we did not focus solely on introducing **what experiments we had conducted**. Instead, we further discussed issues that **CirCure may encounter during future product development**, including technical routes, material selection, experimental evidence, safety controls, and application boundaries with enterprises and industry professionals.",
            "During these discussions, we further examined whether our **experimental design could provide sufficient support for future product safety**.",
            "For example,the requirement for material traceability identified through previous industry communication encouraged the team to further standardize material sources and batch records. Patients’ concerns regarding long-term risks and potential adverse effects led us to place greater emphasis on safety-related experiments, including off-target evaluation, dose range determination, and administration strategy optimization. Communication with the public also encouraged the team to more strictly distinguish between preclinical research findings and potential future product effects, clearly defining the boundaries of current conclusions.",
            "Therefore, the Grand APiC Conference enabled the safety requirements raised by different stakeholders to move beyond communication and undergo further evaluation by both the **industrial and scientific communities regarding the feasibility and translational potential of our project design**.",
            "Through this process, the team gradually established a **DBTL-cycle-based safety design approach for product translation**:",
            "**Identify potential safety challenges during future product development → Translate these challenges into specific experimental indicators and design constraints → Obtain corresponding evidence through experiments → Re-evaluate the significance of safety designs based on industrial requirements and real-world application scenarios.**",
            "Stakeholder feedback is transformed into safety design requirements → These requirements are incorporated into experimental design → Safety is evaluated through experiments → Evidence is generated to support safety considerations → Experimental results and real-world application scenarios continuously inform further learning and iteration → The next design cycle begins.",
            "This process transformed the **Safety and Security Network** from merely a communication platform connecting the team with different stakeholders into a dynamic mechanism that can **transfer real-world product safety requirements back into research design and continuously drive project improvement and iteration**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-1-5",
          index: "6.1.5",
          title: "Insights for Our Project",
        },
        {
          type: "prose",
          paragraphs: [
            "The **Changchun International Medical and Health Industry Expo**, the **Endocrine Health Seminar**, and the **Health Run** represented three different stakeholder groups: industry professionals, breast cancer patients, and the general public. Although their concerns differed, they all pointed toward the same fundamental idea: the safety of a vaccine product is not determined only by laboratory operating procedures, but also by how the product is designed from the beginning.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-1-5-1",
          index: "6.1.5.1",
          title:
            "1. Industrial Translation: Establishing a Safety Foundation Based on Traceability and Future Translation",
        },
        {
          type: "prose",
          paragraphs: [
            "The communication at the Changchun International Medical and Health Industry Expo provided our first concrete understanding that a biotechnology product requires not only efficacy data, but also an evidence chain that can be independently verified during translation from laboratory research to practical applications.This directly changed how we managed material sources and experimental documentation. All cell lines were purchased directly from original repositories rather than transferred between laboratories, and identity verification information for each batch was retained. The originally planned self-packaging of lentiviral vectors was replaced with commercially prepared products with verified titers. In addition, the complete sequences of two plasmids were archived and each functional element was individually reviewed for potential safety concerns.",
            "These procedures could have been completed later as supplementary documentation. However, feedback from industry professionals encouraged us to incorporate them into the project design stage. Among these changes, the decision **not to perform lentiviral packaging ourselves** was particularly representative: it simultaneously reduced laboratory exposure risks and minimized batch variability, becoming a design choice that supported both safety and future translation rather than merely a regulatory requirement.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-1-5-2",
          index: "6.1.5.2",
          title:
            "2. Patient Needs: Incorporating Future User Safety into Experimental Design",
        },
        {
          type: "prose",
          paragraphs: [
            "Communication with breast cancer patients at different treatment stages had the most direct influence on our project design. The four concerns repeatedly mentioned by patients — **treatment safety, potential adverse effects, long-term use risks, and quality of life** — were rarely related only to treatment efficacy. These perspectives encouraged us to reconsider the structure of our experimental design.",
            "Specifically:",
          ],
        },
        {
          type: "list",
          items: [
            "Safety evaluation was established as an independent component and placed before efficacy interpretation.Safety results were defined as a prerequisite for interpreting therapeutic outcomes rather than an additional evaluation performed afterward.",
            "The selection of normal cell models for off-target evaluation was redesigned based on potential patient concerns.We selected normal cells representing tissues potentially associated with future application risks, including vascular endothelial cells, hepatic stellate cells, bronchial epithelial cells, and normal mammary epithelial cells. All selected cells were confirmed to be HLA-A*02:01 positive to avoid false-negative results, and evaluations were conducted under high effector-to-target ratios of 80:1 and 100:1.",
            "Long-term use concerns influenced our dosing strategy.The purpose of circRNA stability experiments was reconsidered from simply demonstrating molecular advantages to providing evidence for reducing dosing frequency and cumulative exposure. Fixed dosing without dose escalation was adopted, and the working concentration of LNPs was required to remain within a predefined safety window.",
            "Quality-of-life considerations influenced the administration strategy.For immunization experiments, subcutaneous injection at the tail base was selected instead of intravenous administration due to its lower invasiveness and reduced stress. This choice was incorporated during the animal experiment design stage.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "In other words, patient concerns were not limited to communication materials; they were translated into** specific experimental decisions**, including cell model selection, effector-to-target ratios, and dose limitations.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-1-5-3",
          index: "6.1.5.3",
          title:
            "3. Social Application: Ensuring Product Safety Is Supported by Evidence and Properly Communicated",
        },
        {
          type: "prose",
          paragraphs: [
            "Communication with the public during the Health Run helped us realize that concerns about biotechnology among non-specialists often do not come from technical details, but from questions such as **“Will it become uncontrollable?”** and **“Is the information provided reliable?”**",
            "This influenced how we communicated our project and defined the boundaries of our conclusions. We established a consistent communication approach by avoiding overly absolute and unsupported statements such as **“curing” ，“replacing chemotherapy” or “having no side effects.”** All public-facing materials consistently state that the project is currently at the preclinical research stage.",
            "We proactively disclosed the limitations of our models, clarifying that the current mouse experiments serve as platform-level proof-of-concept validation rather than formal validation of antigen-specific immune responses, and included humanized mouse validation as part of our future Outlook.In addition, methodological limitations were documented individually in the Notes section of the experimental design, ensuring that anyone referencing our data can understand both the results and the boundaries of these findings.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-1-5-4",
          index: "6.1.5.4",
          title:
            "4. Conclusion: Safety Transformed from “What We Must Follow” into “What We Must Design”",
        },
        {
          type: "prose",
          paragraphs: [
            "Before these stakeholder interactions, our understanding of safety mainly focused on laboratory-level practices: how to protect researchers, how to handle emergencies, and how to maintain proper records.",
            "After these interactions, safety became a **design variable** that influenced:",
          ],
        },
        {
          type: "list",
          items: [
            "which targets we selected;",
            "which molecular formats we used;",
            "which modeling strategies we adopted;",
            "which experimental controls we established;",
            "and how we defined the appropriate scope of our conclusions.",
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "These changes have been incorporated into **Section 4.1 Experimental Design** of our project.",
            "More importantly, we realized that future product safety requires a broader perspective than laboratory safety alone. It involves not only researchers, but also future users, regulatory considerations, and society as a whole.Therefore, we incorporated **industry professionals**,**patients **and **the general public** into the Safety and Security Network, allowing feedback from real-world contexts to flow back into experimental design rather than waiting until after product development to explain technologies to society.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-2",
          index: "6.2",
          title: "Connecting Research Design with Real-world Applications",
        },
        {
          type: "subheading",
          id: "safety-6-2-1",
          index: "6.2.1",
          title:
            "5.2 Northeast Regional Exchange Meeting (DDL Crisis Murder Mystery Game)",
        },
        {
          type: "prose",
          paragraphs: [
            "After developing a deeper understanding of safety, we realized that improving our safety concepts could not be limited to our own laboratory. Instead, we needed to communicate with different iGEM teams to identify risks more quickly and accurately, and implement corresponding improvements.",
            "Based on this idea, on May 2, 2026, we collaborated with JLU-CP to organize the **Northeast Regional Exchange Meeting**. During the meeting, we conducted in-depth discussions with iGEM teams from different regions regarding project design, experimental practices, and team development.",
            "During the exchange, biosafety became one of the important topics of discussion. We shared our team’s safety management measures during experiments, risk assessment methods, and understanding of responsible synthetic biology development. At the same time, we also learned from other teams’ experiences in building safety management systems.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-22",
        },
        {
          type: "prose",
          paragraphs: [
            "While planning this Northeast Regional Exchange Meeting, we continuously considered one question: **How can we avoid making traditional exchange meetings into simple presentation sessions? Could we make the exchange more engaging and allow safety concepts to become more deeply understood?**",
            "Therefore, following current trends, our team innovatively designed a **biosafety-themed role-playing mystery game** （**DDL Crisis Murder Mystery Game**）that attracted great interest from participants — **“The DDL Crisis: Qinghe Bacteria Leakage Incident.”**",
            "iGEM teams from different regions received their respective scripts and engaged in intense discussions and reasoning. Through this activity, participants gained a deeper understanding that a bacterial leakage, data manipulation, or lack of inspection could all potentially lead to unexpected and serious safety incidents. This experience once again reminded all teams that during the iGEM competition, completing deadlines and achieving awards are less important than maintaining the fundamental principles of scientific research and safety.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-23",
        },
        {
          type: "prose",
          paragraphs: [
            "The value of this regional exchange was not only in sharing existing safety management experiences among teams, but also in helping us realize for the first time that safety risks do not only exist within individual laboratories, but may also **arise during experimental design, operational practices, and project advancement processes shared by different teams.**",
            "By bringing together the experiences and risk awareness of multiple teams in the same exchange platform, we began to shift from **“managing our own laboratory”** toward **“identifying potential overlooked risks through the experiences of other teams.”**",
            "Therefore, this exchange provided the **initial foundation** for our subsequent construction of the Safety Network: safety is no longer only an internal responsibility and self-regulation within a single team, but can be continuously identified, improved, and refined through **cross-team information sharing** and **mutual learning from experiences**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-2-2",
          index: "6.2.2",
          title: "7.25–7.26 CCIC Biosafety Exchange and Science Communication",
        },
        {
          type: "prose",
          paragraphs: [
            "Through the previous Northeast Regional Exchange Meeting, we gained valuable insights and experiences. However, this further highlighted the importance of communication with other teams. To reduce the limitations caused by geographical distance, we traveled to Dalian from July 25 to 26, 2026, to participate in CCIC (Conference of China iGEMer Community) and conducted exchanges and science communication activities centered around biosafety-related topics with other teams.",
            "During the conference, we shared our team’s understanding of laboratory safety management, risk prevention, and responsible synthetic biology practices. Meanwhile, through discussions with other teams, we learned from their experiences in safety system development, public communication, and project design.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-24",
        },
        {
          type: "prose",
          paragraphs: [
            "CCIC provided a more open and extensive platform for communication among different teams. It helped us further recognize that the value of cross-team communication lies in connecting safety practices that are originally distributed across different teams.",
            "Through exchanges with more iGEM teams, we were able to observe diverse approaches to risk identification, safety management, and public communication adopted by different projects. These experiences allowed us to compare different practices and incorporate strategies that were suitable for our own project.Therefore, CCIC provided us with a broader opportunity for experience sharing and further promoted the development of our **Safety Network**, expanding it from **“communication between teams”** toward **“connection within the research community.”**",
            "This experience helped us realize that biosafety requires continuous collaboration within the iGEM community. Different teams can strengthen safety awareness by sharing experiences, exchanging practices, and providing mutual feedback, ultimately contributing to the formation of a more comprehensive **safety awareness network**.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-2-3",
          index: "6.2.3",
          title: "4.19 Xinghua Festival",
        },
        {
          type: "prose",
          paragraphs: [
            "To bring safety concepts beyond the laboratory and engage with a broader public audience, we participated in the *Xinghua* *Festival* organized by Jilin University. The participants included teachers, students, and visitors from outside the campus, creating a more open and diverse activity environment. Therefore, at the beginning of the activity design process, we first considered: **How can participants with different backgrounds and ages safely engage with synthetic biology and life science knowledge in an open environment?**",
            "This question directly influenced our activity design. During the early planning stage, we conducted a safety assessment of the simple synthetic biology experiments that were originally planned. Considering factors such as the large number of participants, frequent movement of people, and differences in participants’ experimental experience within an open activity environment, we ultimately **chose to remove several experimental activities with potential safety risks** and instead designed educational activities that were more suitable for public participation.It meant that we did not simply transfer laboratory activities into a campus event setting. Instead, we reassessed potential risks according to the current environment and incorporated safety considerations into the activity design process.",
            "Ultimately, we designed activities including **safety knowledge quizzes and breast cancer science communication**, transforming experimental experiences with potential operational risks into low-risk and highly interactive educational activities.",
            "For the safety knowledge quiz, we prepared question cards covering different topics. Considering that participants had different levels of background knowledge, we designed questions focused on general scientific concepts to encourage participation. After participants completed the quizzes, trained team members provided further explanations. In this way, the quiz became more than a simple assessment; it developed into a communication process that guided participants from **“answering questions” toward “understanding safety”.**Through these interactive activities, participants learned about laboratory safety, biosafety, and related concepts while developing a more accurate understanding through explanations provided by team members.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-25",
        },
        {
          type: "prose",
          paragraphs: [
            "The experience at the *Xinghua Festival* further demonstrated that when scientific research enters an open social environment, laboratory safety standards cannot simply be transferred without adjustment. Instead, risks need to be reassessed according to participants, venues, and activity formats. Safety management therefore became an active component of **activity design decisions**, rather than only a measure for protecting predefined activities.",
            "This was also the **first time we extended the risk assessment approach used in laboratory settings into a real public engagement scenario**. By considering participant characteristics and the surrounding environment, we reassessed potential risks and allowed **safety boundaries** to directly influence activity content. Through removing higher-risk experiments and designing lower-risk interactive activities, we created a safer and more responsible approach to public science engagement.",
            "Through this process, we gradually recognized that connecting science and society does not simply mean bringing scientific knowledge to the public. It requires careful consideration of different social contexts and the development of engagement methods that are safe, appropriate, and responsible.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-2-4",
          index: "6.2.4",
          title: "5.16 Grassland Music Festival",
        },
        {
          type: "prose",
          paragraphs: [
            "Through the *Xinghua Festival*, we disseminated basic safety concepts to the public. However, we recognized that safety communication should extend beyond general science popularization. Therefore, on May 16, 2026, we participated in the Grassland Music Festival and carried out science communication activities, with safety awareness promotion as an important component.",
            "Compared with the *Xinghua Festival*, which targeted a broader public audience, the Grassland Music Festival allowed us to further explore how to **adjust safety communication content and approaches according to different audiences**. Since many participants were students with **medical backgrounds**, we moved beyond the dissemination of basic safety knowledge and encouraged deeper discussions on potential safety issues associated with biotechnology development, as well as the relationship between scientific innovation and social responsibility.",
            "This experience helped us realize that the connection between research and society should not be a one-way process of “delivering scientific knowledge.” Instead, communication should be continuously adapted based on the audience’s background, understanding, and actual needs. Safety communication therefore evolved from **“helping the public understand safety”** toward **“enabling different groups to understand why safety matters and how scientific innovation should be balanced with responsibility.”**",
          ],
        },
        {
          type: "feature",
          key: "safety-images-26",
        },
        {
          type: "subheading",
          id: "safety-6-2-5",
          index: "6.2.5",
          title: "8.9Synbio Classroom",
        },
        {
          type: "prose",
          paragraphs: [
            "To help the public gain a more intuitive understanding of synthetic biology and recognize the importance of laboratory safety through hands-on participation, we designed **Synbio Classroom**. We invited students from the Affiliated High School of Jilin University to enter the laboratory and conduct basic synthetic biology experiments under the guidance of trained personnel.",
            "However, before the activity officially began, the first question we encountered was not **“how to conduct the experiment,”** but a more fundamental one:",
            "**What types of experiments are appropriate for high school students with no prior laboratory experience to perform themselves?**",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-2-5-1",
          index: "6.2.5.1",
          title: "Conducting Safety Assessment from Experimental Design",
        },
        {
          type: "prose",
          paragraphs: [
            "During the initial planning stage, we originally intended to allow students to complete a more comprehensive synthetic biology workflow, including bacterial culture, bacterial liquid handling, and subsequent colony observation. We hoped that students could experience a research process closer to real scientific practice, starting from microbial cultivation.",
            "However, during the pre-experiment evaluation and risk assessment conducted before the activity, we found that although this design could provide a more complete experimental experience, the associated risks and operational requirements were relatively high for students entering a laboratory for the first time. The workflow involved handling microbial materials, culture procedures, and experimental waste disposal. These steps required participants to have basic aseptic operation skills, while also requiring instructors to have sufficient experience in contamination control, biological material management, and waste disposal.",
            "More importantly, during the pre-experiment, we found that some procedures required frequent intervention from teaching assistants to ensure standardized operation. If we continued with the original design, students might have been able to “participate” in the experiment but would have had difficulty independently completing even low-risk procedures. Meanwhile, assistants would need to supervise multiple students simultaneously, increasing the possibility of improper operations during the activity.",
            "Therefore, instead of retaining the original plan simply to pursue a more “professional” experimental experience, we reassessed the design through a safety evaluation process.",
            "Ultimately, we replaced the original microbial culture experiment with **PCR and crude onion DNA extraction**. This adjustment was not simply a reduction in experimental complexity. Rather, it aimed to maintain scientific engagement while ensuring that student participation remained within clearly defined safety boundaries.",
            "This became the most important design transition of Synbio Classroom:",
            "**We did not decide what students should do first and then consider how to ensure safety; Instead, we first defined the safety boundaries and then determined what students could safely participate in.**",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-2-5-2",
          index: "6.2.5.2",
          title:
            "Material Selection: Students Should Not Handle What Can Be Replaced",
        },
        {
          type: "prose",
          paragraphs: [
            "After redesigning the experimental procedures, we further reviewed each experimental material involved.",
            "For procedures where risks could be reduced through material substitution, we prioritized materials and approaches with lower risks and greater suitability for educational activities. Our goal was not to allow students to replicate every operation performed in a professional laboratory, but to minimize unnecessary risks while ensuring that the underlying scientific principles could still be understood.",
            "For materials and procedures whose risks could not be eliminated through simple substitution, we did not allow students to “try them out.” Instead, these steps were assigned exclusively to trained personnel.",
            "For example, crude onion DNA extraction requires cutting onions with a knife. Although the procedure itself is simple, knives present a clear risk of injury and are not suitable for high school students without laboratory experience. Therefore, in the final activity design, onion cutting was not included as a student operation and was completed in advance by trained teaching assistants.",
            "Similarly, diphenylamine solution used in DNA extraction presents chemical hazards. Therefore, we did not adopt a model where teachers demonstrated the procedure and students operated the reagent in turns. Instead, we restricted student exposure to the reagent from the beginning.",
            "The preparation of diphenylamine solution was completed by trained team members in a chemical fume hood. Students neither participated in reagent preparation nor had contact with the original reagent or preparation process. After preparation, the reagent was managed according to experimental requirements and used by teaching assistants during student activities.",
            "For risks that could not be eliminated through material substitution, we followed the principle:",
            "**“Replace whenever possible; isolate when replacement is not possible; and assign unavoidable operations to trained professionals.”**",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-2-5-3",
          index: "6.2.5.3",
          title:
            "Safety Facilities Are Part of Activity Design, Not Just Background Equipment",
        },
        {
          type: "prose",
          paragraphs: [
            "After determining the experimental content, we further integrated existing laboratory safety facilities into the activity workflow instead of treating them as passive laboratory infrastructure.",
            "Before entering the experimental area, students first received laboratory safety training to understand potential risks and corresponding response methods during the activity.",
            "Students then put on personal protective equipment, including lab coats, protective caps, gloves, and masks. Before entering the experimental area, teaching assistants checked each student's PPE to ensure that safety requirements were met.",
            "For procedures involving hazardous chemical reagents, we used chemical fume hoods to isolate potential risks. For operations involving physical hazards, such as knife use, trained teaching assistants performed the procedures directly to prevent students from contacting sharp instruments.",
            "Through these measures, we transformed safety facilities from fixed laboratory configurations into active protective barriers within the activity design:",
            "**PPE** reduced the risk of personal exposure, **chemical fume hoods** controlled chemical operation risks, and **professional personnel operation** isolated high-risk procedures that could not be eliminated through facilities or material substitution.",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-2-5-4",
          index: "6.2.5.4",
          title: "From “Student Participation” to “Tiered Participation”",
        },
        {
          type: "prose",
          paragraphs: [
            "We did not allow students to perform every experimental step simply because we wanted them to have a hands-on experience.",
            "Before the activity, we classified experimental procedures according to operational difficulty, material hazards, and potential consequences. Based on this assessment, we determined the responsibilities and operational permissions of students and teaching assistants.",
            "Each group of four students was assigned one professionally trained teaching assistant, who provided continuous guidance and supervision throughout the experiment. When improper operations were identified, teaching assistants corrected them immediately.",
            "For example, after training, students could practice proper pipette usage and participate in lower-risk experimental procedures. However, higher-risk or unsuitable procedures, including DNA loading in PCR, onion cutting, and diphenylamine solution preparation, were performed by teaching assistants.",
            "This design reflects the principle:",
            "**“Hands-on participation does not mean performing every procedure personally.”**",
            "Students were still able to observe experiments, understand scientific principles, and participate in operations within safe boundaries. Meanwhile, higher-risk steps remained under the control of trained personnel and appropriate safety measures.",
          ],
        },
        {
          type: "feature",
          key: "safety-images-27",
        },
        {
          type: "subheading",
          id: "safety-6-2-5-5",
          index: "6.2.5.5",
          title: "An Activity as a Validation of Safety Design",
        },
        {
          type: "prose",
          paragraphs: [
            "The final implementation of Synbio Classroom was not a direct execution of the original experimental plan. Instead, it was developed through **pre-experiment testing, risk identification, protocol adjustment, material screening, and division of operational responsibilities**. Throughout the entire Synbio Classroom process, safety requirements were integrated into every stage of activity design.",
            "This activity further demonstrated that laboratory safety is not an additional requirement added after experiments are completed. Instead, it can directly influence experimental content, material selection, facility use, and personnel responsibilities as a fundamental design principle.",
            "We further realized that the true role of safety is not simply to tell people “what cannot be done,” but to enable scientific participation **within clearly defined safety boundaries** through **risk identification** and **appropriate design**.",
            "Through this process, the laboratory safety principles established in SAFE ON were transformed for the first time into practices that the public could participate in, observe, and experience.",
            "When students wore protective equipment for the first time and properly held a pipette for the first time, safety was no longer merely a rule written on laboratory walls, but became an integral part of their scientific experience.",
            "Therefore, Synbio Classroom became a **closed-loop connection between our laboratory and society**: we developed **safety standards** within the laboratory, continuously improved our risk awareness through team exchanges, brought these principles into public activities, and ultimately transformed them into real participatory practices. We hope that students leave the laboratory with more than an experimental experience; They also gain a deeper understanding:",
            "**Scientific exploration can be driven by curiosity, but truly responsible scientific practice must always take safety as its boundary.**",
          ],
        },
        {
          type: "subheading",
          id: "safety-6-3",
          index: "6.3",
          title: "Conclusion",
        },
        {
          type: "prose",
          paragraphs: [
            "Through the establishment of the Safety and Security Network, we gradually recognized that safety is not a static set of laboratory regulations, but a practice that needs to extend and adapt according to different research contexts, participants, and application scenarios. Based on existing biosafety principles, risk assessment approaches, and safety management experience, we applied these concepts to industry communication, patient engagement, iGEM team exchanges, campus science education, and public experimental activities. According to the characteristics of each scenario, we continuously identified risks and adjusted activity designs and safety measures.",
            "Throughout this process, we **transformed safety concepts into practices** that could be implemented and communicated, while continuously refining our understanding of safety through feedback from different stakeholders. We proactively removed high-risk experiments in open environments, established tiered operational permissions for middle school students, and shared risk management experiences with other iGEM teams. In this way, safety became integrated into project decision-making rather than being added after project completion.",
            "More importantly, these connections changed our understanding of safety in synthetic biology: **the subjects protected by safety include not only laboratory personnel, but also future product users, the public, and society as a whole. The boundaries of safety do not exist only within laboratories; they should accompany synthetic biology throughout the entire process from research design to real-world application.**",
            "Through the Safety and Security Network, we aim to use our team practice as a starting point to transform existing safety knowledge into verifiable, communicable, and continuously improvable safety actions, while encouraging both the research community and society to participate in the responsible development of synthetic biology.",
          ],
        },
      ],
    },
    {
      id: "safety-overall-conclusion",
      index: "",
      kicker: "",
      navLabel: "Overall Conclusion",
      title: "Overall Conclusion",
      summary: "",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Through **SAFE ON**, JLU-FBH iGEM has redefined Safety and Security as an integral part of the entire research process rather than a set of requirements limited to laboratory operations. By embedding safety considerations into **project design, experimental practice, personnel management, and future applications**, we established a comprehensive framework that guides how risks are identified, evaluated, and addressed throughout the development of CirCure.",
            "Our contribution is reflected in the development of a six-module safety framework consisting of **System, Assessment, Facility, Experiment, Orientation, and Network**. More importantly, SAFE ON enabled **Biosafety and Biosecurity considerations to become part of our decision-making process**, allowing safety to influence experimental choices before risks arise rather than serving as a response after problems occur.",
            "In developing this framework, we did not create a safety system independently from existing practices. Instead, we built upon established **laboratory safety guidelines, risk assessment approaches, biosafety and biosecurity principles, animal research requirements**, and widely recognized tools such as the **Bow-tie Model, 3R principles, ARRIVE 2.0, and EDA**. By adapting these existing approaches to the specific needs of CirCure, we transformed general safety principles into practical strategies that could guide our own project. These strategies were incorporated into risk assessment, experimental design, personnel training, facility management, animal research, and biological material tracking.",
            "Throughout the project, we continuously evaluated and improved our safety practices through **training and assessment, risk review, equipment inspection, experimental documentation, biological material traceability, and follow-up evaluation**. As a result, Safety and Security became more than a collection of written procedures; it became an active management process that could be implemented, recorded, assessed, and improved over time.",
            "Within CirCure, we specifically addressed risks associated with **AI-assisted design, epitope selection, biological materials, animal experiments, laboratory operations, and experimental waste management**. Importantly, these assessments were not only used to document potential risks, but also informed our experimental strategies and technical decisions. Safety considerations became an essential factor in determining how the project was designed and carried out.",
            "Safety assessment also shaped our choices throughout the project. Based on identified risks, we adjusted experimental approaches, selected more appropriate materials and design elements, clarified the boundaries of biological material use, strengthened experimental access control, and incorporated safety validation earlier into the workflow. Through these decisions, our approach evolved from simply managing risks during experimentation to **reducing risks through thoughtful design choices**.",
            "Beyond laboratory management, SAFE ON also expanded our understanding of safety in synthetic biology through engagement with **researchers, industry professionals, patients, the public, and other iGEM teams**. These interactions showed us that the safety of future biotechnology applications depends not only on experimental performance, but also on factors such as responsible translation, ethical considerations, public understanding, and communication of risks. Therefore, the **Network module** extends our safety perspective from the laboratory to the broader **research community and society**, creating a connection between scientific innovation and real-world responsibility.",
            "Ultimately, SAFE ON represents more than a set of individual safety measures. It provides a continuous process of responsible research:",
            "**building upon existing knowledge, identifying project-specific risks, integrating safety considerations into design decisions, validating these approaches through practice, and continuously improving our understanding of safety in real-world applications of synthetic biology.**",
            "Through this process, Safety and Security became embedded throughout the development of CirCure, from initial research design to experimental implementation and future application considerations. We hope SAFE ON can serve as a **practical**,** traceable**, and **continuously improving** approach for future synthetic biology projects seeking to balance innovation with responsibility.",
          ],
        },
      ],
      hideSectionNumber: true,
    },
  ],
  links: [
    { path: "/notebook", label: "Laboratory Notebook" },
    { path: "/experiments", label: "Wet Lab Protocols" },
    { path: "/design", label: "Molecular Construct Design" },
    { path: "/human-practices", label: "Ethical & Safety Dialogue" },
  ],
  next: {
    path: "/design",
    label: "Design",
    title: "Step Inside the Molecular Blueprint",
    description: "With biosafety foundations secured, examine the molecular core: see how permuted introns, translation enhancers, and poly-epitope arrays form a single closed ring.",
  },
};

export type SafetyFeatureSpec =
  | {
      kind: "white-paper";
      versions: Record<
        SafetyLanguage,
        { document: SafetyAssetKey; attachments: SafetyAssetKey[] }
      >;
    }
  | {
      kind: "folders";
      documents: {
        title: string;
        versions: Record<SafetyLanguage, SafetyAssetKey>;
      }[];
    }
  | { kind: "document"; document: SafetyAssetKey }
  | {
      kind: "images";
      layout: "trilingual" | "grid";
      images: SafetyAssetKey[];
      caption?: string;
    };

export const safetyFeatureSpecs: Record<string, SafetyFeatureSpec> = {
  "safety-white-paper-1": {
    kind: "white-paper",
    versions: {
      en: {
        document: "laboratory-safety-standards-white-paper-en.pdf",
        attachments: [
          "appendix1-laboratory-safety-inspection-checklist-en.pdf",
          "appendix2-safety-training-sign-in-and-assessment-record-en.pdf",
          "appendix3-equipment-maintenance-inspection-record-en.pdf",
          "appendix4-laboratory-risk-assessment-report-en.pdf",
          "appendix5-laboratory-safety-accident-record-form-en.pdf",
          "appendix6-safety-drill-record-form-en.pdf",
          "appendix7-laboratory-safety-commitment-letter-en.pdf",
          "appendix8-hazardous-chemicals-usage-registration-form-en.pdf",
        ],
      },
      cn: {
        document: "laboratory-safety-standards-white-paper-cn.pdf",
        attachments: [
          "appendix1-laboratory-safety-inspection-checklist-cn.pdf",
          "appendix2-safety-training-sign-in-and-assessment-record-cn.pdf",
          "appendix3-equipment-maintenance-inspection-record-cn.pdf",
          "appendix4-laboratory-risk-assessment-report-cn.pdf",
          "appendix5-laboratory-safety-accident-record-form-cn.pdf",
          "appendix6-safety-drill-record-form-cn.pdf",
          "appendix7-laboratory-safety-commitment-letter-cn.pdf",
          "appendix8-hazardous-chemicals-usage-registration-form-cn.pdf",
        ],
      },
      ko: {
        document: "laboratory-safety-standards-white-paper-ko.pdf",
        attachments: [
          "appendix1-laboratory-safety-inspection-checklist-ko.pdf",
          "appendix2-safety-training-sign-in-and-assessment-record-ko.pdf",
          "appendix3-equipment-maintenance-inspection-record-ko.pdf",
          "appendix4-laboratory-risk-assessment-report-ko.pdf",
          "appendix5-laboratory-safety-accident-record-form-ko.pdf",
          "appendix6-safety-drill-record-form-ko.pdf",
          "appendix7-laboratory-safety-commitment-letter-ko.pdf",
          "appendix8-hazardous-chemicals-usage-registration-form-ko.pdf",
        ],
      },
    },
  },
  "safety-folders-2": {
    kind: "folders",
    documents: [
      {
        title: "Laboratory Safety Inspection Checklist",
        versions: {
          en: "appendix1-laboratory-safety-inspection-checklist-en.pdf",
          cn: "appendix1-laboratory-safety-inspection-checklist-cn.pdf",
          ko: "appendix1-laboratory-safety-inspection-checklist-ko.pdf",
        },
      },
      {
        title: "Safety Training Sign-in and Assessment Record",
        versions: {
          en: "appendix2-safety-training-sign-in-and-assessment-record-en.pdf",
          cn: "appendix2-safety-training-sign-in-and-assessment-record-cn.pdf",
          ko: "appendix2-safety-training-sign-in-and-assessment-record-ko.pdf",
        },
      },
    ],
  },
  "safety-folders-3": {
    kind: "folders",
    documents: [
      {
        title: "Equipment Maintenance and Inspection Record",
        versions: {
          en: "appendix3-equipment-maintenance-inspection-record-en.pdf",
          cn: "appendix3-equipment-maintenance-inspection-record-cn.pdf",
          ko: "appendix3-equipment-maintenance-inspection-record-ko.pdf",
        },
      },
    ],
  },
  "safety-folders-4": {
    kind: "folders",
    documents: [
      {
        title: "Laboratory Risk Assessment Report",
        versions: {
          en: "appendix4-laboratory-risk-assessment-report-en.pdf",
          cn: "appendix4-laboratory-risk-assessment-report-cn.pdf",
          ko: "appendix4-laboratory-risk-assessment-report-ko.pdf",
        },
      },
    ],
  },
  "safety-folders-5": {
    kind: "folders",
    documents: [
      {
        title: "Laboratory Safety Incident or Near-Miss Record Form",
        versions: {
          en: "appendix5-laboratory-safety-accident-record-form-en.pdf",
          cn: "appendix5-laboratory-safety-accident-record-form-cn.pdf",
          ko: "appendix5-laboratory-safety-accident-record-form-ko.pdf",
        },
      },
    ],
  },
  "safety-folders-6": {
    kind: "folders",
    documents: [
      {
        title: "Safety Drill Record Form",
        versions: {
          en: "appendix6-safety-drill-record-form-en.pdf",
          cn: "appendix6-safety-drill-record-form-cn.pdf",
          ko: "appendix6-safety-drill-record-form-ko.pdf",
        },
      },
    ],
  },
  "safety-white-paper-7": {
    kind: "white-paper",
    versions: {
      en: {
        document:
          "white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-en.pdf",
        attachments: [
          "approval-for-the-use-of-laboratory-animals-en.pdf",
          "certificate-of-experimental-animal-operation-qualification-en.pdf",
          "supervision-inspection-and-rectification-notice-en.pdf",
          "training-and-assessment-result-registration-form-for-laboratory-animal-operation-en.pdf",
        ],
      },
      cn: {
        document:
          "white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-cn.pdf",
        attachments: [
          "approval-for-the-use-of-laboratory-animals-cn.pdf",
          "certificate-of-experimental-animal-operation-qualification-cn.pdf",
          "supervision-inspection-and-rectification-notice-cn.pdf",
          "training-and-assessment-result-registration-form-for-laboratory-animal-operation-cn.pdf",
        ],
      },
      ko: {
        document:
          "white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-ko.pdf",
        attachments: [
          "approval-for-the-use-of-laboratory-animals-ko.pdf",
          "certificate-of-experimental-animal-operation-qualification-ko.pdf",
          "supervision-inspection-and-rectification-notice-ko.pdf",
          "training-and-assessment-result-registration-form-for-laboratory-animal-operation-ko.pdf",
        ],
      },
    },
  },
  "safety-images-8": {
    kind: "images",
    layout: "trilingual",
    images: [
      "3-1-1-1-1-biological-safety-cabinet-en.avif",
      "3-1-1-1-1-biological-safety-cabinet-cn.avif",
      "3-1-1-1-1-biological-safety-cabinet-ko.avif",
    ],
  },
  "safety-images-9": {
    kind: "images",
    layout: "trilingual",
    images: [
      "3-1-1-1-2-chemical-fume-hood-en.avif",
      "3-1-1-1-2-chemical-fume-hood-cn.avif",
      "3-1-1-1-2-chemical-fume-hood-ko.avif",
    ],
  },
  "safety-images-10": {
    kind: "images",
    layout: "trilingual",
    images: [
      "3-1-2-1-combination-eyewash-station-en.avif",
      "3-1-2-1-combination-eyewash-station-cn.avif",
      "3-1-2-1-combination-eyewash-station-ko.avif",
    ],
  },
  "safety-images-11": {
    kind: "images",
    layout: "trilingual",
    images: [
      "3-1-3-1-fire-extinguishers-en.avif",
      "3-1-3-1-fire-extinguishers-cn.avif",
      "3-1-3-1-fire-extinguishers-ko.avif",
    ],
  },
  "safety-folders-12": {
    kind: "folders",
    documents: [
      {
        title: "Laboratory Safety Equipment User Manual",
        versions: {
          en: "laboratory-safety-equipment-user-manual-en.pdf",
          cn: "laboratory-safety-equipment-user-manual-cn.pdf",
          ko: "laboratory-safety-equipment-user-manual-ko.pdf",
        },
      },
    ],
  },
  "safety-images-13": {
    kind: "images",
    layout: "grid",
    images: [
      "4-1-1-1-1-photos-of-software-interview.avif",
      "4-1-1-1-2-photos-of-software-interview.avif",
    ],
    caption: "Photos of Software Interview",
  },
  "safety-document-14": {
    kind: "document",
    document: "eda-report-circure.pdf",
  },
  "safety-images-15": {
    kind: "images",
    layout: "grid",
    images: [
      "4-1-2-2-2-1-animal-use-form.avif",
      "4-1-2-2-2-animal-use-form.avif",
    ],
  },
  "safety-white-paper-16": {
    kind: "white-paper",
    versions: {
      en: {
        document:
          "white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-en.pdf",
        attachments: [
          "acknowledgment-and-complian-mitment-for-the-manual-en.pdf",
          "application-form-for-anesthetics-collection-en.pdf",
          "application-form-for-experimental-protocol-modification-en.pdf",
          "guidelines-for-the-use-of-anaesthetics-en.pdf",
          "laboratory-animal-purchase-registration-form-en.pdf",
          "standard-operating-procedure-for-admi-tes-of-laboratory-animals-en.pdf",
          "standard-operating-procedure-for-blood-collection-from-laboratory-animals-en.pdf",
          "standards-for-capture-and-restraint-of-laboratory-animals-en.pdf",
        ],
      },
      cn: {
        document:
          "white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-cn.pdf",
        attachments: [
          "acknowledgment-and-complian-mitment-for-the-manual-cn.pdf",
          "application-form-for-anesthetics-collection-cn.pdf",
          "application-form-for-experimental-protocol-modification-cn.pdf",
          "guidelines-for-the-use-of-anaesthetics-cn.pdf",
          "laboratory-animal-purchase-registration-form-cn.pdf",
          "standard-operating-procedure-for-admi-tes-of-laboratory-animals-cn.pdf",
          "standard-operating-procedure-for-blood-collection-from-laboratory-animals-cn.pdf",
          "standards-for-capture-and-restraint-of-laboratory-animals-cn.pdf",
        ],
      },
      ko: {
        document:
          "white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-ko.pdf",
        attachments: [
          "acknowledgment-and-complian-mitment-for-the-manual-ko.pdf",
          "application-form-for-anesthetics-collection-ko.pdf",
          "application-form-for-experimental-protocol-modification-ko.pdf",
          "guidelines-for-the-use-of-anaesthetics-ko.pdf",
          "laboratory-animal-purchase-registration-form-ko.pdf",
          "standard-operating-procedure-for-admi-tes-of-laboratory-animals-ko.pdf",
          "standard-operating-procedure-for-blood-collection-from-laboratory-animals-ko.pdf",
          "standards-for-capture-and-restraint-of-laboratory-animals-ko.pdf",
        ],
      },
    },
  },
  "safety-folders-17": {
    kind: "folders",
    documents: [
      {
        title: "Hazardous Chemicals Usage Registration Form",
        versions: {
          en: "appendix8-hazardous-chemicals-usage-registration-form-en.pdf",
          cn: "appendix8-hazardous-chemicals-usage-registration-form-cn.pdf",
          ko: "appendix8-hazardous-chemicals-usage-registration-form-ko.pdf",
        },
      },
    ],
  },
  "safety-images-18": {
    kind: "images",
    layout: "grid",
    images: [
      "6-1-1-1-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      "6-1-1-2-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      "6-1-1-3-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      "6-1-1-photos-of-changchun-international-medical-and-health-industry-expo.avif",
    ],
    caption:
      "Photos of Changchun International Medical and Health Industry Expo",
  },
  "safety-images-19": {
    kind: "images",
    layout: "grid",
    images: [
      "6-1-2-1-photos-of-endocrine-health-seminar-professor-guo-weiying.avif",
      "6-1-2-photos-of-endocrine-health-seminar-professor-guo-weiying.avif",
    ],
    caption: "Photos of Endocrine Health Seminar",
  },
  "safety-images-20": {
    kind: "images",
    layout: "grid",
    images: [
      "6-1-3-1-photos-of-health-run.avif",
      "6-1-3-photos-of-health-run.avif",
    ],
    caption: "Photos of Health Run",
  },
  "safety-images-21": {
    kind: "images",
    layout: "grid",
    images: [
      "6-1-4-1-photos-of-grand-apic-conference.avif",
      "6-1-4-2-photos-of-grand-apic-conference.avif",
      "6-1-4-3-photos-of-grand-apic-conference.avif",
      "6-1-4-4-photos-of-grand-apic-conference.avif",
    ],
    caption: "Photos of Grand APiC Conference",
  },
  "safety-images-22": {
    kind: "images",
    layout: "grid",
    images: [
      "6-2-1-1-photos-of-northeast-regional-exchange-meeting.avif",
      "6-2-1-2-photos-of-northeast-regional-exchange-meeting.avif",
      "6-2-1-3-photos-of-northeast-regional-exchange-meeting.avif",
      "6-2-1-photos-of-northeast-regional-exchange-meeting.avif",
    ],
    caption: "Photos of Northeast Regional Exchange Meeting",
  },
  "safety-images-23": {
    kind: "images",
    layout: "grid",
    images: [
      "6-2-1-1-photos-of-ddl-crisis-murder-mystery-game.avif",
      "6-2-1-2-photos-of-ddl-crisis-murder-mystery-game.avif",
      "6-2-1-3-photos-of-ddl-crisis-murder-mystery-game.avif",
    ],
    caption: "Photos of DDL Crisis Murder Mystery Game",
  },
  "safety-images-24": {
    kind: "images",
    layout: "grid",
    images: [
      "6-2-2-1-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
      "6-2-2-2-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
      "6-2-2-3-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
      "6-2-2-4-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
      "6-2-2-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    ],
    caption: "Photos of CCIC Biosafety Exchange and Science Communication",
  },
  "safety-images-25": {
    kind: "images",
    layout: "grid",
    images: [
      "6-2-3-1-photos-of-xinghua-festival.avif",
      "6-2-3-2-photos-of-xinghua-festival.avif",
      "6-2-3-3-photos-of-xinghua-festival.avif",
      "6-2-3-4-photos-of-xinghua-festival.avif",
      "6-2-3-photos-of-xinghua-festival.avif",
    ],
    caption: "Photos of *Xinghua* *Festival*",
  },
  "safety-images-26": {
    kind: "images",
    layout: "grid",
    images: [
      "6-2-4-1-photos-of-grassland-music-festival.avif",
      "6-2-4-2-photos-of-grassland-music-festival.avif",
      "6-2-4-photos-of-grassland-music-festival.avif",
    ],
    caption: "Photos of Grassland Music Festival",
  },
  "safety-images-27": {
    kind: "images",
    layout: "grid",
    images: [
      "6-2-5-1-photos-of-synbio-classroom.avif",
      "6-2-5-2-photos-of-synbio-classroom.avif",
      "6-2-5-3-photos-of-synbio-classroom.avif",
      "6-2-5-4-photos-of-synbio-classroom.avif",
      "6-2-5-photos-of-synbio-classroom.avif",
    ],
    caption: "Photos of Synbio Classroom",
  },
};
