/** CDN assets supplied by the Safety manuscript. Local binaries were not supplied;
 * localSourcePath is null rather than inventing a path. sourceReference identifies
 * the actual local manuscript where each published URL is recorded. */
export interface SafetyAsset {
  fileName: string;
  localSourcePath: string | null;
  sourceReference: string;
  uploadUrl: string;
  /** Intrinsic size, so the figure keeps its space before the file arrives. */
  width?: number;
  height?: number;
  alt: string;
  caption?: string;
}
export const safetyAssets = {
  "0-0safe-on.avif": {
    fileName: "0-0safe-on.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:21",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/0-0safe-on.avif",
    width: 1027,
    height: 626,
    alt: "Safe on framework",
  },
  "safe-on-framework.avif": {
    fileName: "0-0safe-on.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:21",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/0-0safe-on.avif",
    width: 1027,
    height: 626,
    alt: "Safe on framework",
  },
  "1-1-three-level-laboratory-safety-management-system.avif": {
    fileName: "1-1-three-level-laboratory-safety-management-system.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:65",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/1-1-three-level-laboratory-safety-management-system.avif",
    width: 2560,
    height: 1438,
    alt: "Three level laboratory safety management system",
    caption: "Three-Level Laboratory Safety Management System",
  },
  "laboratory-safety-standards-white-paper-en.pdf": {
    fileName: "laboratory-safety-standards-white-paper-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:86",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/laboratory-safety-standards-white-paper-en.pdf",
    alt: "Laboratory Safety Standards White Paper",
    caption: "Laboratory Safety Standards White Paper",
  },
  "appendix1-laboratory-safety-inspection-checklist-en.pdf": {
    fileName: "appendix1-laboratory-safety-inspection-checklist-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:154",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix1-laboratory-safety-inspection-checklist-en.pdf",
    alt: "Laboratory Safety Inspection Checklist",
    caption: "Laboratory Safety Inspection Checklist",
  },
  "appendix2-safety-training-sign-in-and-assessment-record-en.pdf": {
    fileName: "appendix2-safety-training-sign-in-and-assessment-record-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:162",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix2-safety-training-sign-in-and-assessment-record-en.pdf",
    alt: "Safety Training Sign-in and Assessment Record",
    caption: "Safety Training Sign-in and Assessment Record",
  },
  "appendix3-equipment-maintenance-inspection-record-en.pdf": {
    fileName: "appendix3-equipment-maintenance-inspection-record-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:198",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix3-equipment-maintenance-inspection-record-en.pdf",
    alt: "Equipment Maintenance and Inspection Record",
    caption: "Equipment Maintenance and Inspection Record",
  },
  "appendix4-laboratory-risk-assessment-report-en.pdf": {
    fileName: "appendix4-laboratory-risk-assessment-report-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:208",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix4-laboratory-risk-assessment-report-en.pdf",
    alt: "Laboratory Risk Assessment Report",
    caption: "Laboratory Risk Assessment Report",
  },
  "appendix5-laboratory-safety-accident-record-form-en.pdf": {
    fileName: "appendix5-laboratory-safety-accident-record-form-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:220",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix5-laboratory-safety-accident-record-form-en.pdf",
    alt: "Laboratory Safety Incident or Near-Miss Record Form",
    caption: "Laboratory Safety Incident or Near-Miss Record Form",
  },
  "appendix6-safety-drill-record-form-en.pdf": {
    fileName: "appendix6-safety-drill-record-form-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:232",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix6-safety-drill-record-form-en.pdf",
    alt: "Safety Drill Record Form",
    caption: "Safety Drill Record Form",
  },
  "appendix7-laboratory-safety-commitment-letter-en.pdf": {
    fileName: "appendix7-laboratory-safety-commitment-letter-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:102",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix7-laboratory-safety-commitment-letter-en.pdf",
    alt: "Laboratory Safety Commitment Letter",
    caption: "Laboratory Safety Commitment Letter",
  },
  "appendix8-hazardous-chemicals-usage-registration-form-en.pdf": {
    fileName: "appendix8-hazardous-chemicals-usage-registration-form-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1426",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix8-hazardous-chemicals-usage-registration-form-en.pdf",
    alt: "Hazardous Chemicals Usage Registration Form",
    caption: "Hazardous Chemicals Usage Registration Form",
  },
  "laboratory-safety-standards-white-paper-cn.pdf": {
    fileName: "laboratory-safety-standards-white-paper-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:106",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/laboratory-safety-standards-white-paper-cn.pdf",
    alt: "Laboratory Safety Standards White Paper",
    caption: "Laboratory Safety Standards White Paper",
  },
  "appendix1-laboratory-safety-inspection-checklist-cn.pdf": {
    fileName: "appendix1-laboratory-safety-inspection-checklist-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:156",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix1-laboratory-safety-inspection-checklist-cn.pdf",
    alt: "Laboratory Safety Inspection Checklist",
    caption: "Laboratory Safety Inspection Checklist",
  },
  "appendix2-safety-training-sign-in-and-assessment-record-cn.pdf": {
    fileName: "appendix2-safety-training-sign-in-and-assessment-record-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:164",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix2-safety-training-sign-in-and-assessment-record-cn.pdf",
    alt: "Safety Training Sign-in and Assessment Record",
    caption: "Safety Training Sign-in and Assessment Record",
  },
  "appendix3-equipment-maintenance-inspection-record-cn.pdf": {
    fileName: "appendix3-equipment-maintenance-inspection-record-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:200",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix3-equipment-maintenance-inspection-record-cn.pdf",
    alt: "Equipment Maintenance and Inspection Record",
    caption: "Equipment Maintenance and Inspection Record",
  },
  "appendix4-laboratory-risk-assessment-report-cn.pdf": {
    fileName: "appendix4-laboratory-risk-assessment-report-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:210",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix4-laboratory-risk-assessment-report-cn.pdf",
    alt: "Laboratory Risk Assessment Report",
    caption: "Laboratory Risk Assessment Report",
  },
  "appendix5-laboratory-safety-accident-record-form-cn.pdf": {
    fileName: "appendix5-laboratory-safety-accident-record-form-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:222",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix5-laboratory-safety-accident-record-form-cn.pdf",
    alt: "Laboratory Safety Incident or Near-Miss Record Form",
    caption: "Laboratory Safety Incident or Near-Miss Record Form",
  },
  "appendix6-safety-drill-record-form-cn.pdf": {
    fileName: "appendix6-safety-drill-record-form-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:234",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix6-safety-drill-record-form-cn.pdf",
    alt: "Safety Drill Record Form",
    caption: "Safety Drill Record Form",
  },
  "appendix7-laboratory-safety-commitment-letter-cn.pdf": {
    fileName: "appendix7-laboratory-safety-commitment-letter-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:122",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix7-laboratory-safety-commitment-letter-cn.pdf",
    alt: "Laboratory Safety Commitment Letter",
    caption: "Laboratory Safety Commitment Letter",
  },
  "appendix8-hazardous-chemicals-usage-registration-form-cn.pdf": {
    fileName: "appendix8-hazardous-chemicals-usage-registration-form-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1428",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix8-hazardous-chemicals-usage-registration-form-cn.pdf",
    alt: "Hazardous Chemicals Usage Registration Form",
    caption: "Hazardous Chemicals Usage Registration Form",
  },
  "laboratory-safety-standards-white-paper-ko.pdf": {
    fileName: "laboratory-safety-standards-white-paper-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:126",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/laboratory-safety-standards-white-paper-ko.pdf",
    alt: "Laboratory Safety Standards White Paper",
    caption: "Laboratory Safety Standards White Paper",
  },
  "appendix1-laboratory-safety-inspection-checklist-ko.pdf": {
    fileName: "appendix1-laboratory-safety-inspection-checklist-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:158",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix1-laboratory-safety-inspection-checklist-ko.pdf",
    alt: "Laboratory Safety Inspection Checklist",
    caption: "Laboratory Safety Inspection Checklist",
  },
  "appendix2-safety-training-sign-in-and-assessment-record-ko.pdf": {
    fileName: "appendix2-safety-training-sign-in-and-assessment-record-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:166",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix2-safety-training-sign-in-and-assessment-record-ko.pdf",
    alt: "Safety Training Sign-in and Assessment Record",
    caption: "Safety Training Sign-in and Assessment Record",
  },
  "appendix3-equipment-maintenance-inspection-record-ko.pdf": {
    fileName: "appendix3-equipment-maintenance-inspection-record-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:202",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix3-equipment-maintenance-inspection-record-ko.pdf",
    alt: "Equipment Maintenance and Inspection Record",
    caption: "Equipment Maintenance and Inspection Record",
  },
  "appendix4-laboratory-risk-assessment-report-ko.pdf": {
    fileName: "appendix4-laboratory-risk-assessment-report-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:212",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix4-laboratory-risk-assessment-report-ko.pdf",
    alt: "Laboratory Risk Assessment Report",
    caption: "Laboratory Risk Assessment Report",
  },
  "appendix5-laboratory-safety-accident-record-form-ko.pdf": {
    fileName: "appendix5-laboratory-safety-accident-record-form-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:224",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix5-laboratory-safety-accident-record-form-ko.pdf",
    alt: "Laboratory Safety Incident or Near-Miss Record Form",
    caption: "Laboratory Safety Incident or Near-Miss Record Form",
  },
  "appendix6-safety-drill-record-form-ko.pdf": {
    fileName: "appendix6-safety-drill-record-form-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:236",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix6-safety-drill-record-form-ko.pdf",
    alt: "Safety Drill Record Form",
    caption: "Safety Drill Record Form",
  },
  "appendix7-laboratory-safety-commitment-letter-ko.pdf": {
    fileName: "appendix7-laboratory-safety-commitment-letter-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:142",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix7-laboratory-safety-commitment-letter-ko.pdf",
    alt: "Laboratory Safety Commitment Letter",
    caption: "Laboratory Safety Commitment Letter",
  },
  "appendix8-hazardous-chemicals-usage-registration-form-ko.pdf": {
    fileName: "appendix8-hazardous-chemicals-usage-registration-form-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1430",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-standards-white-paper-appendices/appendix8-hazardous-chemicals-usage-registration-form-ko.pdf",
    alt: "Hazardous Chemicals Usage Registration Form",
    caption: "Hazardous Chemicals Usage Registration Form",
  },
  "1-2-laboratory-animal-compliance-management-process.avif": {
    fileName: "1-2-laboratory-animal-compliance-management-process.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:272",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/1-2-laboratory-animal-compliance-management-process.avif",
    width: 1280,
    height: 720,
    alt: "Laboratory animal compliance management process",
    caption: "Laboratory Animal Compliance Management Process",
  },
  "white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-en.pdf":
    {
      fileName:
        "white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-en.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:282",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-en.pdf",
      alt: "White Paper on Compliance Management and System Construction of Laboratory Animal Models",
      caption:
        "White Paper on Compliance Management and System Construction of Laboratory Animal Models",
    },
  "approval-for-the-use-of-laboratory-animals-en.pdf": {
    fileName: "approval-for-the-use-of-laboratory-animals-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:284",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/approval-for-the-use-of-laboratory-animals-en.pdf",
    alt: "Approval for the Use of Laboratory Animals",
    caption: "Approval for the Use of Laboratory Animals",
  },
  "certificate-of-experimental-animal-operation-qualification-en.pdf": {
    fileName:
      "certificate-of-experimental-animal-operation-qualification-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:286",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/certificate-of-experimental-animal-operation-qualification-en.pdf",
    alt: "Certificate of Experimental Animal Operation Qualification",
    caption: "Certificate of Experimental Animal Operation Qualification",
  },
  "supervision-inspection-and-rectification-notice-en.pdf": {
    fileName: "supervision-inspection-and-rectification-notice-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:288",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/supervision-inspection-and-rectification-notice-en.pdf",
    alt: "Supervision, Inspection and Rectification Notice",
    caption: "Supervision, Inspection and Rectification Notice",
  },
  "training-and-assessment-result-registration-form-for-laboratory-animal-operation-en.pdf":
    {
      fileName:
        "training-and-assessment-result-registration-form-for-laboratory-animal-operation-en.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:290",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/training-and-assessment-result-registration-form-for-laboratory-animal-operation-en.pdf",
      alt: "Training and Assessment Result Registration Form for Laboratory Animal Operation",
      caption:
        "Training and Assessment Result Registration Form for Laboratory Animal Operation",
    },
  "white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-cn.pdf":
    {
      fileName:
        "white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-cn.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:292",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-cn.pdf",
      alt: "White Paper on Compliance Management and System Construction of Laboratory Animal Models",
      caption:
        "White Paper on Compliance Management and System Construction of Laboratory Animal Models",
    },
  "approval-for-the-use-of-laboratory-animals-cn.pdf": {
    fileName: "approval-for-the-use-of-laboratory-animals-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:294",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/approval-for-the-use-of-laboratory-animals-cn.pdf",
    alt: "Approval for the Use of Laboratory Animals",
    caption: "Approval for the Use of Laboratory Animals",
  },
  "certificate-of-experimental-animal-operation-qualification-cn.pdf": {
    fileName:
      "certificate-of-experimental-animal-operation-qualification-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:296",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/certificate-of-experimental-animal-operation-qualification-cn.pdf",
    alt: "Certificate of Experimental Animal Operation Qualification",
    caption: "Certificate of Experimental Animal Operation Qualification",
  },
  "supervision-inspection-and-rectification-notice-cn.pdf": {
    fileName: "supervision-inspection-and-rectification-notice-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:298",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/supervision-inspection-and-rectification-notice-cn.pdf",
    alt: "Supervision, Inspection and Rectification Notice",
    caption: "Supervision, Inspection and Rectification Notice",
  },
  "training-and-assessment-result-registration-form-for-laboratory-animal-operation-cn.pdf":
    {
      fileName:
        "training-and-assessment-result-registration-form-for-laboratory-animal-operation-cn.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:300",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/training-and-assessment-result-registration-form-for-laboratory-animal-operation-cn.pdf",
      alt: "Training and Assessment Result Registration Form for Laboratory Animal Operation",
      caption:
        "Training and Assessment Result Registration Form for Laboratory Animal Operation",
    },
  "white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-ko.pdf":
    {
      fileName:
        "white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-ko.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:302",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-compliance-management-and-system-construction-of-laboratory-animal-models-ko.pdf",
      alt: "White Paper on Compliance Management and System Construction of Laboratory Animal Models",
      caption:
        "White Paper on Compliance Management and System Construction of Laboratory Animal Models",
    },
  "approval-for-the-use-of-laboratory-animals-ko.pdf": {
    fileName: "approval-for-the-use-of-laboratory-animals-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:304",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/approval-for-the-use-of-laboratory-animals-ko.pdf",
    alt: "Approval for the Use of Laboratory Animals",
    caption: "Approval for the Use of Laboratory Animals",
  },
  "certificate-of-experimental-animal-operation-qualification-ko.pdf": {
    fileName:
      "certificate-of-experimental-animal-operation-qualification-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:306",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/certificate-of-experimental-animal-operation-qualification-ko.pdf",
    alt: "Certificate of Experimental Animal Operation Qualification",
    caption: "Certificate of Experimental Animal Operation Qualification",
  },
  "supervision-inspection-and-rectification-notice-ko.pdf": {
    fileName: "supervision-inspection-and-rectification-notice-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:308",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/supervision-inspection-and-rectification-notice-ko.pdf",
    alt: "Supervision, Inspection and Rectification Notice",
    caption: "Supervision, Inspection and Rectification Notice",
  },
  "training-and-assessment-result-registration-form-for-laboratory-animal-operation-ko.pdf":
    {
      fileName:
        "training-and-assessment-result-registration-form-for-laboratory-animal-operation-ko.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:310",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/training-and-assessment-result-registration-form-for-laboratory-animal-operation-ko.pdf",
      alt: "Training and Assessment Result Registration Form for Laboratory Animal Operation",
      caption:
        "Training and Assessment Result Registration Form for Laboratory Animal Operation",
    },
  "2-1-1-bow-tie-model.avif": {
    fileName: "2-1-1-bow-tie-model.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:385",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/2-1-1-bow-tie-model.avif",
    width: 809,
    height: 394,
    alt: "Bow tie model",
    caption: "Bow-Tie Model",
  },
  "2-1-1-1-the-tert-butyllithium-fire-incident-at-the-university-of-california-2008-bow-tie-model.avif":
    {
      fileName:
        "2-1-1-1-the-tert-butyllithium-fire-incident-at-the-university-of-california-2008-bow-tie-model.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:403",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/2-1-1-1-the-tert-butyllithium-fire-incident-at-the-university-of-california-2008-bow-tie-model.avif",
      width: 944,
      height: 153,
      alt: "The tert butyllithium fire incident at the university of california 2008 bow tie model",
    },
  "2-1-1-1-explosion-and-fire-at-the-municipal-and-environmental-engineering-laboratory-beijing-jiaotong-university-december-26-2018-bow-tie-model.avif":
    {
      fileName:
        "2-1-1-1-explosion-and-fire-at-the-municipal-and-environmental-engineering-laboratory-beijing-jiaotong-university-december-26-2018-bow-tie-model.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:407",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/2-1-1-1-explosion-and-fire-at-the-municipal-and-environmental-engineering-laboratory-beijing-jiaotong-university-december-26-2018-bow-tie-model.avif",
      width: 857,
      height: 242,
      alt: "Explosion and fire at the municipal and environmental engineering laboratory beijing jiaotong university december 26 2018 bow tie model",
    },
  "2-1-1-1-taiyuan-university-of-science-and-technology-explosion-incident-may-22-2025-bow-tie-model.avif":
    {
      fileName:
        "2-1-1-1-taiyuan-university-of-science-and-technology-explosion-incident-may-22-2025-bow-tie-model.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:411",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/2-1-1-1-taiyuan-university-of-science-and-technology-explosion-incident-may-22-2025-bow-tie-model.avif",
      width: 960,
      height: 223,
      alt: "Taiyuan university of science and technology explosion incident may 22 2025 bow tie model",
    },
  "2-1-1-2-28-faculty-and-students-at-northeast-agricultural-university-contracted-infectious-diseases-due-to-animal-experiments-december-19-2010-bow-tie-model.avif":
    {
      fileName:
        "2-1-1-2-28-faculty-and-students-at-northeast-agricultural-university-contracted-infectious-diseases-due-to-animal-experiments-december-19-2010-bow-tie-model.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:417",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/2-1-1-2-28-faculty-and-students-at-northeast-agricultural-university-contracted-infectious-diseases-due-to-animal-experiments-december-19-2010-bow-tie-model.avif",
      width: 905,
      height: 267,
      alt: "Faculty and students at northeast agricultural university contracted infectious diseases due to animal experiments december 19 2010 bow tie model",
    },
  "2-1-1-2-a-researcher-at-the-university-of-chicago-was-hospitalized-due-to-a-bacterial-infection-september-2011-bow-tie-model.avif":
    {
      fileName:
        "2-1-1-2-a-researcher-at-the-university-of-chicago-was-hospitalized-due-to-a-bacterial-infection-september-2011-bow-tie-model.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:421",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/2-1-1-2-a-researcher-at-the-university-of-chicago-was-hospitalized-due-to-a-bacterial-infection-september-2011-bow-tie-model.avif",
      width: 957,
      height: 290,
      alt: "A researcher at the university of chicago was hospitalized due to a bacterial infection september 2011 bow tie model",
    },
  "2-1-1-3-death-by-oxygen-deprivation-of-an-employee-at-kanglong-chemical-beijing-new-drug-technology-co-ltd-in-the-beijing-economic-and-technological-development-zone-june-2025-bow-tie-model.avif":
    {
      fileName:
        "2-1-1-3-death-by-oxygen-deprivation-of-an-employee-at-kanglong-chemical-beijing-new-drug-technology-co-ltd-in-the-beijing-economic-and-technological-development-zone-june-2025-bow-tie-model.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:427",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/2-1-1-3-death-by-oxygen-deprivation-of-an-employee-at-kanglong-chemical-beijing-new-drug-technology-co-ltd-in-the-beijing-economic-and-technological-development-zone-june-2025-bow-tie-model.avif",
      width: 906,
      height: 190,
      alt: "Death by oxygen deprivation of an employee at kanglong chemical beijing new drug technology co ltd in the beijing economic and technological development zone june 2025 bow tie model",
    },
  "3-1-1-1-1-biological-safety-cabinet-en.avif": {
    fileName: "3-1-1-1-1-biological-safety-cabinet-en.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:785",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-1-1-1-biological-safety-cabinet-en.avif",
    width: 968,
    height: 550,
    alt: "Biological safety cabinet",
  },
  "3-1-1-1-1-biological-safety-cabinet-cn.avif": {
    fileName: "3-1-1-1-1-biological-safety-cabinet-cn.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:787",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-1-1-1-biological-safety-cabinet-cn.avif",
    width: 967,
    height: 551,
    alt: "Biological safety cabinet",
  },
  "3-1-1-1-1-biological-safety-cabinet-ko.avif": {
    fileName: "3-1-1-1-1-biological-safety-cabinet-ko.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:789",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-1-1-1-biological-safety-cabinet-ko.avif",
    width: 969,
    height: 554,
    alt: "Biological safety cabinet",
  },
  "3-1-1-1-2-chemical-fume-hood-en.avif": {
    fileName: "3-1-1-1-2-chemical-fume-hood-en.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:799",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-1-1-2-chemical-fume-hood-en.avif",
    width: 954,
    height: 544,
    alt: "Chemical fume hood",
  },
  "3-1-1-1-2-chemical-fume-hood-cn.avif": {
    fileName: "3-1-1-1-2-chemical-fume-hood-cn.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:801",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-1-1-2-chemical-fume-hood-cn.avif",
    width: 976,
    height: 554,
    alt: "Chemical fume hood",
  },
  "3-1-1-1-2-chemical-fume-hood-ko.avif": {
    fileName: "3-1-1-1-2-chemical-fume-hood-ko.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:803",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-1-1-2-chemical-fume-hood-ko.avif",
    width: 965,
    height: 551,
    alt: "Chemical fume hood",
  },
  "3-1-2-1-combination-eyewash-station-en.avif": {
    fileName: "3-1-2-1-combination-eyewash-station-en.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:813",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-2-1-combination-eyewash-station-en.avif",
    width: 974,
    height: 554,
    alt: "Combination eyewash station",
  },
  "3-1-2-1-combination-eyewash-station-cn.avif": {
    fileName: "3-1-2-1-combination-eyewash-station-cn.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:815",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-2-1-combination-eyewash-station-cn.avif",
    width: 972,
    height: 552,
    alt: "Combination eyewash station",
  },
  "3-1-2-1-combination-eyewash-station-ko.avif": {
    fileName: "3-1-2-1-combination-eyewash-station-ko.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:817",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-2-1-combination-eyewash-station-ko.avif",
    width: 971,
    height: 554,
    alt: "Combination eyewash station",
  },
  "3-1-3-1-fire-extinguishers-en.avif": {
    fileName: "3-1-3-1-fire-extinguishers-en.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:827",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-3-1-fire-extinguishers-en.avif",
    width: 973,
    height: 553,
    alt: "Fire extinguishers",
  },
  "3-1-3-1-fire-extinguishers-cn.avif": {
    fileName: "3-1-3-1-fire-extinguishers-cn.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:829",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-3-1-fire-extinguishers-cn.avif",
    width: 1002,
    height: 569,
    alt: "Fire extinguishers",
  },
  "3-1-3-1-fire-extinguishers-ko.avif": {
    fileName: "3-1-3-1-fire-extinguishers-ko.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:831",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-1-3-1-fire-extinguishers-ko.avif",
    width: 969,
    height: 551,
    alt: "Fire extinguishers",
  },
  "3-2-laboratory-safety-facilities-and-inspection-schedule.avif": {
    fileName: "3-2-laboratory-safety-facilities-and-inspection-schedule.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:884",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/3-2-laboratory-safety-facilities-and-inspection-schedule.avif",
    width: 1280,
    height: 566,
    alt: "Laboratory safety facilities and inspection schedule",
    caption: "Laboratory Safety Facilities and Inspection Schedule",
  },
  "laboratory-safety-equipment-user-manual-en.pdf": {
    fileName: "laboratory-safety-equipment-user-manual-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:894",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-equipment-user-manual/laboratory-safety-equipment-user-manual-en.pdf",
    alt: "Laboratory Safety Equipment User Manual",
    caption: "Laboratory Safety Equipment User Manual",
  },
  "laboratory-safety-equipment-user-manual-cn.pdf": {
    fileName: "laboratory-safety-equipment-user-manual-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:896",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-equipment-user-manual/laboratory-safety-equipment-user-manual-cn.pdf",
    alt: "Laboratory Safety Equipment User Manual",
    caption: "Laboratory Safety Equipment User Manual",
  },
  "laboratory-safety-equipment-user-manual-ko.pdf": {
    fileName: "laboratory-safety-equipment-user-manual-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:898",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/laboratory-safety-equipment-user-manual/laboratory-safety-equipment-user-manual-ko.pdf",
    alt: "Laboratory Safety Equipment User Manual",
    caption: "Laboratory Safety Equipment User Manual",
  },
  "4-1-1-1-1-photos-of-software-interview.avif": {
    fileName: "4-1-1-1-1-photos-of-software-interview.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:934",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/4-1-1-1-1-photos-of-software-interview.avif",
    width: 1280,
    height: 853,
    alt: "Photos of software interview",
  },
  "4-1-1-1-2-photos-of-software-interview.avif": {
    fileName: "4-1-1-1-2-photos-of-software-interview.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:936",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/4-1-1-1-2-photos-of-software-interview.avif",
    width: 1280,
    height: 853,
    alt: "Photos of software interview",
  },
  "eda-report-circure.pdf": {
    fileName: "eda-report-circure.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1223",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/eda-report-circure.pdf",
    alt: "Experimental Design Assistant (EDA)",
    caption: "Experimental Design Assistant (EDA)",
  },
  "4-1-2-2-2-1-animal-use-form.avif": {
    fileName: "4-1-2-2-2-1-animal-use-form.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1229",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/4-1-2-2-2-1-animal-use-form.avif",
    width: 814,
    height: 358,
    alt: "Animal use form",
  },
  "4-1-2-2-2-animal-use-form.avif": {
    fileName: "4-1-2-2-2-animal-use-form.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1231",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/4-1-2-2-2-animal-use-form.avif",
    width: 1414,
    height: 256,
    alt: "Animal use form",
  },
  "white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-en.pdf":
    {
      fileName:
        "white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-en.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1310",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-en.pdf",
      alt: "White Paper on Implementation and Risk Prevention of Experimental Animal Model Technology",
      caption:
        "White Paper on Implementation and Risk Prevention of Experimental Animal Model Technology",
    },
  "acknowledgment-and-complian-mitment-for-the-manual-en.pdf": {
    fileName: "acknowledgment-and-complian-mitment-for-the-manual-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1312",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/acknowledgment-and-complian-mitment-for-the-manual-en.pdf",
    alt: "Acknowledgment and Compliance Commitment for the Manual",
    caption: "Acknowledgment and Compliance Commitment for the Manual",
  },
  "application-form-for-anesthetics-collection-en.pdf": {
    fileName: "application-form-for-anesthetics-collection-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1314",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/application-form-for-anesthetics-collection-en.pdf",
    alt: "Application Form for Anesthetics Collection",
    caption: "Application Form for Anesthetics Collection",
  },
  "application-form-for-experimental-protocol-modification-en.pdf": {
    fileName: "application-form-for-experimental-protocol-modification-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1316",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/application-form-for-experimental-protocol-modification-en.pdf",
    alt: "Application Form for Experimental Protocol Modification",
    caption: "Application Form for Experimental Protocol Modification",
  },
  "guidelines-for-the-use-of-anaesthetics-en.pdf": {
    fileName: "guidelines-for-the-use-of-anaesthetics-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1318",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/guidelines-for-the-use-of-anaesthetics-en.pdf",
    alt: "Guidelines for the Use of Anaesthetics",
    caption: "Guidelines for the Use of Anaesthetics",
  },
  "laboratory-animal-purchase-registration-form-en.pdf": {
    fileName: "laboratory-animal-purchase-registration-form-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1320",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/laboratory-animal-purchase-registration-form-en.pdf",
    alt: "Laboratory Animal Purchase Registration Form",
    caption: "Laboratory Animal Purchase Registration Form",
  },
  "standard-operating-procedure-for-admi-tes-of-laboratory-animals-en.pdf": {
    fileName:
      "standard-operating-procedure-for-admi-tes-of-laboratory-animals-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1322",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/standard-operating-procedure-for-admi-tes-of-laboratory-animals-en.pdf",
    alt: "Standard Operating Procedure for Administration to Laboratory Animals",
    caption:
      "Standard Operating Procedure for Administration to Laboratory Animals",
  },
  "standard-operating-procedure-for-blood-collection-from-laboratory-animals-en.pdf":
    {
      fileName:
        "standard-operating-procedure-for-blood-collection-from-laboratory-animals-en.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1324",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/standard-operating-procedure-for-blood-collection-from-laboratory-animals-en.pdf",
      alt: "Standard Operating Procedure for Blood Collection from Laboratory Animals",
      caption:
        "Standard Operating Procedure for Blood Collection from Laboratory Animals",
    },
  "standards-for-capture-and-restraint-of-laboratory-animals-en.pdf": {
    fileName:
      "standards-for-capture-and-restraint-of-laboratory-animals-en.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1326",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/standards-for-capture-and-restraint-of-laboratory-animals-en.pdf",
    alt: "Standards for Capture and Restraint of Laboratory Animals",
    caption: "Standards for Capture and Restraint of Laboratory Animals",
  },
  "white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-cn.pdf":
    {
      fileName:
        "white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-cn.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1328",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-cn.pdf",
      alt: "White Paper on Implementation and Risk Prevention of Experimental Animal Model Technology",
      caption:
        "White Paper on Implementation and Risk Prevention of Experimental Animal Model Technology",
    },
  "acknowledgment-and-complian-mitment-for-the-manual-cn.pdf": {
    fileName: "acknowledgment-and-complian-mitment-for-the-manual-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1330",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/acknowledgment-and-complian-mitment-for-the-manual-cn.pdf",
    alt: "Acknowledgment and Compliance Commitment for the Manual",
    caption: "Acknowledgment and Compliance Commitment for the Manual",
  },
  "application-form-for-anesthetics-collection-cn.pdf": {
    fileName: "application-form-for-anesthetics-collection-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1332",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/application-form-for-anesthetics-collection-cn.pdf",
    alt: "Application Form for Anesthetics Collection",
    caption: "Application Form for Anesthetics Collection",
  },
  "application-form-for-experimental-protocol-modification-cn.pdf": {
    fileName: "application-form-for-experimental-protocol-modification-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1334",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/application-form-for-experimental-protocol-modification-cn.pdf",
    alt: "Application Form for Experimental Protocol Modification",
    caption: "Application Form for Experimental Protocol Modification",
  },
  "guidelines-for-the-use-of-anaesthetics-cn.pdf": {
    fileName: "guidelines-for-the-use-of-anaesthetics-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1336",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/guidelines-for-the-use-of-anaesthetics-cn.pdf",
    alt: "Guidelines for the Use of Anaesthetics",
    caption: "Guidelines for the Use of Anaesthetics",
  },
  "laboratory-animal-purchase-registration-form-cn.pdf": {
    fileName: "laboratory-animal-purchase-registration-form-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1338",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/laboratory-animal-purchase-registration-form-cn.pdf",
    alt: "Laboratory Animal Purchase Registration Form",
    caption: "Laboratory Animal Purchase Registration Form",
  },
  "standard-operating-procedure-for-admi-tes-of-laboratory-animals-cn.pdf": {
    fileName:
      "standard-operating-procedure-for-admi-tes-of-laboratory-animals-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1340",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/standard-operating-procedure-for-admi-tes-of-laboratory-animals-cn.pdf",
    alt: "Standard Operating Procedure for Administration to Laboratory Animals",
    caption:
      "Standard Operating Procedure for Administration to Laboratory Animals",
  },
  "standard-operating-procedure-for-blood-collection-from-laboratory-animals-cn.pdf":
    {
      fileName:
        "standard-operating-procedure-for-blood-collection-from-laboratory-animals-cn.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1342",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/standard-operating-procedure-for-blood-collection-from-laboratory-animals-cn.pdf",
      alt: "Standard Operating Procedure for Blood Collection from Laboratory Animals",
      caption:
        "Standard Operating Procedure for Blood Collection from Laboratory Animals",
    },
  "standards-for-capture-and-restraint-of-laboratory-animals-cn.pdf": {
    fileName:
      "standards-for-capture-and-restraint-of-laboratory-animals-cn.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1344",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/standards-for-capture-and-restraint-of-laboratory-animals-cn.pdf",
    alt: "Standards for Capture and Restraint of Laboratory Animals",
    caption: "Standards for Capture and Restraint of Laboratory Animals",
  },
  "white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-ko.pdf":
    {
      fileName:
        "white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-ko.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1346",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-ko.pdf",
      alt: "White Paper on Implementation and Risk Prevention of Experimental Animal Model Technology",
      caption:
        "White Paper on Implementation and Risk Prevention of Experimental Animal Model Technology",
    },
  "acknowledgment-and-complian-mitment-for-the-manual-ko.pdf": {
    fileName: "acknowledgment-and-complian-mitment-for-the-manual-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1348",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/acknowledgment-and-complian-mitment-for-the-manual-ko.pdf",
    alt: "Acknowledgment and Compliance Commitment for the Manual",
    caption: "Acknowledgment and Compliance Commitment for the Manual",
  },
  "application-form-for-anesthetics-collection-ko.pdf": {
    fileName: "application-form-for-anesthetics-collection-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1350",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/application-form-for-anesthetics-collection-ko.pdf",
    alt: "Application Form for Anesthetics Collection",
    caption: "Application Form for Anesthetics Collection",
  },
  "application-form-for-experimental-protocol-modification-ko.pdf": {
    fileName: "application-form-for-experimental-protocol-modification-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1352",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/application-form-for-experimental-protocol-modification-ko.pdf",
    alt: "Application Form for Experimental Protocol Modification",
    caption: "Application Form for Experimental Protocol Modification",
  },
  "guidelines-for-the-use-of-anaesthetics-ko.pdf": {
    fileName: "guidelines-for-the-use-of-anaesthetics-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1354",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/guidelines-for-the-use-of-anaesthetics-ko.pdf",
    alt: "Guidelines for the Use of Anaesthetics",
    caption: "Guidelines for the Use of Anaesthetics",
  },
  "laboratory-animal-purchase-registration-form-ko.pdf": {
    fileName: "laboratory-animal-purchase-registration-form-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1356",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/laboratory-animal-purchase-registration-form-ko.pdf",
    alt: "Laboratory Animal Purchase Registration Form",
    caption: "Laboratory Animal Purchase Registration Form",
  },
  "standard-operating-procedure-for-admi-tes-of-laboratory-animals-ko.pdf": {
    fileName:
      "standard-operating-procedure-for-admi-tes-of-laboratory-animals-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1358",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/standard-operating-procedure-for-admi-tes-of-laboratory-animals-ko.pdf",
    alt: "Standard Operating Procedure for Administration to Laboratory Animals",
    caption:
      "Standard Operating Procedure for Administration to Laboratory Animals",
  },
  "standard-operating-procedure-for-blood-collection-from-laboratory-animals-ko.pdf":
    {
      fileName:
        "standard-operating-procedure-for-blood-collection-from-laboratory-animals-ko.pdf",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1360",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/standard-operating-procedure-for-blood-collection-from-laboratory-animals-ko.pdf",
      alt: "Standard Operating Procedure for Blood Collection from Laboratory Animals",
      caption:
        "Standard Operating Procedure for Blood Collection from Laboratory Animals",
    },
  "standards-for-capture-and-restraint-of-laboratory-animals-ko.pdf": {
    fileName:
      "standards-for-capture-and-restraint-of-laboratory-animals-ko.pdf",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1362",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/docs/safety-and-security/white-paper-on-implementation-and-risk-prevention-of-experimental-animal-model-technology-appendices/standards-for-capture-and-restraint-of-laboratory-animals-ko.pdf",
    alt: "Standards for Capture and Restraint of Laboratory Animals",
    caption: "Standards for Capture and Restraint of Laboratory Animals",
  },
  "5-1-four-level-laboratory-safety-training-system-form.avif": {
    fileName: "5-1-four-level-laboratory-safety-training-system-form.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1495",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/5-1-four-level-laboratory-safety-training-system-form.avif",
    width: 1280,
    height: 602,
    alt: "Four level laboratory safety training system form",
    caption: "Four-Level Laboratory Safety Training System Form",
  },
  "6-network-overview.avif": {
    fileName: "6-network-overview.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1600",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-network-overview.avif",
    width: 1280,
    height: 960,
    alt: "Network overview",
    caption: "Network Overview",
  },
  "6-1-1-1-photos-of-changchun-international-medical-and-health-industry-expo.avif":
    {
      fileName:
        "6-1-1-1-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1612",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-1-1-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      width: 1280,
      height: 720,
      alt: "Photos of changchun international medical and health industry expo",
    },
  "6-1-1-2-photos-of-changchun-international-medical-and-health-industry-expo.avif":
    {
      fileName:
        "6-1-1-2-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1614",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-1-2-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      width: 1280,
      height: 720,
      alt: "Photos of changchun international medical and health industry expo",
    },
  "6-1-1-3-photos-of-changchun-international-medical-and-health-industry-expo.avif":
    {
      fileName:
        "6-1-1-3-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1616",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-1-3-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      width: 1280,
      height: 720,
      alt: "Photos of changchun international medical and health industry expo",
    },
  "6-1-1-photos-of-changchun-international-medical-and-health-industry-expo.avif":
    {
      fileName:
        "6-1-1-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      localSourcePath: null,
      sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1618",
      uploadUrl:
        "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-1-photos-of-changchun-international-medical-and-health-industry-expo.avif",
      width: 1280,
      height: 720,
      alt: "Photos of changchun international medical and health industry expo",
    },
  "6-1-2-1-photos-of-endocrine-health-seminar-professor-guo-weiying.avif": {
    fileName:
      "6-1-2-1-photos-of-endocrine-health-seminar-professor-guo-weiying.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1636",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-2-1-photos-of-endocrine-health-seminar-professor-guo-weiying.avif",
    width: 777,
    height: 558,
    alt: "Photos of endocrine health seminar professor guo weiying",
  },
  "6-1-2-photos-of-endocrine-health-seminar-professor-guo-weiying.avif": {
    fileName:
      "6-1-2-photos-of-endocrine-health-seminar-professor-guo-weiying.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1638",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-2-photos-of-endocrine-health-seminar-professor-guo-weiying.avif",
    width: 1280,
    height: 960,
    alt: "Photos of endocrine health seminar professor guo weiying",
  },
  "6-1-3-1-photos-of-health-run.avif": {
    fileName: "6-1-3-1-photos-of-health-run.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1671",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-3-1-photos-of-health-run.avif",
    width: 4000,
    height: 3000,
    alt: "Photos of health run",
  },
  "6-1-3-photos-of-health-run.avif": {
    fileName: "6-1-3-photos-of-health-run.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1673",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-3-photos-of-health-run.avif",
    width: 4000,
    height: 3000,
    alt: "Photos of health run",
  },
  "6-1-4-1-photos-of-grand-apic-conference.avif": {
    fileName: "6-1-4-1-photos-of-grand-apic-conference.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1689",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-4-1-photos-of-grand-apic-conference.avif",
    width: 4000,
    height: 3000,
    alt: "Photos of grand apic conference",
  },
  "6-1-4-2-photos-of-grand-apic-conference.avif": {
    fileName: "6-1-4-2-photos-of-grand-apic-conference.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1691",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-4-2-photos-of-grand-apic-conference.avif",
    width: 4000,
    height: 3000,
    alt: "Photos of grand apic conference",
  },
  "6-1-4-3-photos-of-grand-apic-conference.avif": {
    fileName: "6-1-4-3-photos-of-grand-apic-conference.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1693",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-4-3-photos-of-grand-apic-conference.avif",
    width: 4000,
    height: 3000,
    alt: "Photos of grand apic conference",
  },
  "6-1-4-4-photos-of-grand-apic-conference.avif": {
    fileName: "6-1-4-4-photos-of-grand-apic-conference.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1695",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-1-4-4-photos-of-grand-apic-conference.avif",
    width: 4000,
    height: 3000,
    alt: "Photos of grand apic conference",
  },
  "6-2-1-1-photos-of-northeast-regional-exchange-meeting.avif": {
    fileName: "6-2-1-1-photos-of-northeast-regional-exchange-meeting.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1774",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-1-1-photos-of-northeast-regional-exchange-meeting.avif",
    width: 1280,
    height: 720,
    alt: "Photos of northeast regional exchange meeting",
  },
  "6-2-1-2-photos-of-northeast-regional-exchange-meeting.avif": {
    fileName: "6-2-1-2-photos-of-northeast-regional-exchange-meeting.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1776",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-1-2-photos-of-northeast-regional-exchange-meeting.avif",
    width: 1280,
    height: 720,
    alt: "Photos of northeast regional exchange meeting",
  },
  "6-2-1-3-photos-of-northeast-regional-exchange-meeting.avif": {
    fileName: "6-2-1-3-photos-of-northeast-regional-exchange-meeting.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1777",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-1-3-photos-of-northeast-regional-exchange-meeting.avif",
    width: 1280,
    height: 720,
    alt: "Photos of northeast regional exchange meeting",
  },
  "6-2-1-photos-of-northeast-regional-exchange-meeting.avif": {
    fileName: "6-2-1-photos-of-northeast-regional-exchange-meeting.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1779",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-1-photos-of-northeast-regional-exchange-meeting.avif",
    width: 1280,
    height: 720,
    alt: "Photos of northeast regional exchange meeting",
  },
  "6-2-1-1-photos-of-ddl-crisis-murder-mystery-game.avif": {
    fileName: "6-2-1-1-photos-of-ddl-crisis-murder-mystery-game.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1789",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-1-1-photos-of-ddl-crisis-murder-mystery-game.avif",
    width: 1280,
    height: 720,
    alt: "Photos of ddl crisis murder mystery game",
  },
  "6-2-1-2-photos-of-ddl-crisis-murder-mystery-game.avif": {
    fileName: "6-2-1-2-photos-of-ddl-crisis-murder-mystery-game.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1791",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-1-2-photos-of-ddl-crisis-murder-mystery-game.avif",
    width: 1280,
    height: 720,
    alt: "Photos of ddl crisis murder mystery game",
  },
  "6-2-1-3-photos-of-ddl-crisis-murder-mystery-game.avif": {
    fileName: "6-2-1-3-photos-of-ddl-crisis-murder-mystery-game.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1793",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-1-3-photos-of-ddl-crisis-murder-mystery-game.avif",
    width: 1280,
    height: 720,
    alt: "Photos of ddl crisis murder mystery game",
  },
  "6-2-2-1-photos-of-ccic-biosafety-exchange-and-science-communication.avif": {
    fileName:
      "6-2-2-1-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1809",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-2-1-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    width: 1280,
    height: 720,
    alt: "Photos of ccic biosafety exchange and science communication",
  },
  "6-2-2-2-photos-of-ccic-biosafety-exchange-and-science-communication.avif": {
    fileName:
      "6-2-2-2-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1811",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-2-2-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    width: 1280,
    height: 720,
    alt: "Photos of ccic biosafety exchange and science communication",
  },
  "6-2-2-3-photos-of-ccic-biosafety-exchange-and-science-communication.avif": {
    fileName:
      "6-2-2-3-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1813",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-2-3-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    width: 1280,
    height: 720,
    alt: "Photos of ccic biosafety exchange and science communication",
  },
  "6-2-2-4-photos-of-ccic-biosafety-exchange-and-science-communication.avif": {
    fileName:
      "6-2-2-4-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1815",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-2-4-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    width: 1280,
    height: 720,
    alt: "Photos of ccic biosafety exchange and science communication",
  },
  "6-2-2-photos-of-ccic-biosafety-exchange-and-science-communication.avif": {
    fileName:
      "6-2-2-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1817",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-2-photos-of-ccic-biosafety-exchange-and-science-communication.avif",
    width: 1280,
    height: 720,
    alt: "Photos of ccic biosafety exchange and science communication",
  },
  "6-2-3-1-photos-of-xinghua-festival.avif": {
    fileName: "6-2-3-1-photos-of-xinghua-festival.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1837",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-3-1-photos-of-xinghua-festival.avif",
    width: 1280,
    height: 960,
    alt: "Photos of xinghua festival",
  },
  "6-2-3-2-photos-of-xinghua-festival.avif": {
    fileName: "6-2-3-2-photos-of-xinghua-festival.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1839",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-3-2-photos-of-xinghua-festival.avif",
    width: 1280,
    height: 853,
    alt: "Photos of xinghua festival",
  },
  "6-2-3-3-photos-of-xinghua-festival.avif": {
    fileName: "6-2-3-3-photos-of-xinghua-festival.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1841",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-3-3-photos-of-xinghua-festival.avif",
    width: 1280,
    height: 960,
    alt: "Photos of xinghua festival",
  },
  "6-2-3-4-photos-of-xinghua-festival.avif": {
    fileName: "6-2-3-4-photos-of-xinghua-festival.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1843",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-3-4-photos-of-xinghua-festival.avif",
    width: 1080,
    height: 607,
    alt: "Photos of xinghua festival",
  },
  "6-2-3-photos-of-xinghua-festival.avif": {
    fileName: "6-2-3-photos-of-xinghua-festival.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1845",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-3-photos-of-xinghua-festival.avif",
    width: 993,
    height: 557,
    alt: "Photos of xinghua festival",
  },
  "6-2-4-1-photos-of-grassland-music-festival.avif": {
    fileName: "6-2-4-1-photos-of-grassland-music-festival.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1863",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-4-1-photos-of-grassland-music-festival.avif",
    width: 4000,
    height: 3000,
    alt: "Photos of grassland music festival",
  },
  "6-2-4-2-photos-of-grassland-music-festival.avif": {
    fileName: "6-2-4-2-photos-of-grassland-music-festival.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1865",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-4-2-photos-of-grassland-music-festival.avif",
    width: 1280,
    height: 960,
    alt: "Photos of grassland music festival",
  },
  "6-2-4-photos-of-grassland-music-festival.avif": {
    fileName: "6-2-4-photos-of-grassland-music-festival.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1867",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-4-photos-of-grassland-music-festival.avif",
    width: 4000,
    height: 3000,
    alt: "Photos of grassland music festival",
  },
  "6-2-5-1-photos-of-synbio-classroom.avif": {
    fileName: "6-2-5-1-photos-of-synbio-classroom.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1943",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-5-1-photos-of-synbio-classroom.avif",
    width: 1080,
    height: 721,
    alt: "Photos of synbio classroom",
  },
  "6-2-5-2-photos-of-synbio-classroom.avif": {
    fileName: "6-2-5-2-photos-of-synbio-classroom.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1945",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-5-2-photos-of-synbio-classroom.avif",
    width: 1080,
    height: 721,
    alt: "Photos of synbio classroom",
  },
  "6-2-5-3-photos-of-synbio-classroom.avif": {
    fileName: "6-2-5-3-photos-of-synbio-classroom.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1947",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-5-3-photos-of-synbio-classroom.avif",
    width: 1080,
    height: 721,
    alt: "Photos of synbio classroom",
  },
  "6-2-5-4-photos-of-synbio-classroom.avif": {
    fileName: "6-2-5-4-photos-of-synbio-classroom.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1949",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-5-4-photos-of-synbio-classroom.avif",
    width: 1080,
    height: 809,
    alt: "Photos of synbio classroom",
  },
  "6-2-5-photos-of-synbio-classroom.avif": {
    fileName: "6-2-5-photos-of-synbio-classroom.avif",
    localSourcePath: null,
    sourceReference: "文案集/project/safe/3.4 Safety and Security.md:1951",
    uploadUrl:
      "https://static.igem.wiki/teams/6056/wiki/files/pages/safety-and-security/6-2-5-photos-of-synbio-classroom.avif",
    width: 1080,
    height: 721,
    alt: "Photos of synbio classroom",
  },
} satisfies Record<string, SafetyAsset>;

export type SafetyAssetKey = keyof typeof safetyAssets;
export type SafetyLanguage = "en" | "cn" | "ko";
export const safetyLanguages = [
  { key: "en", label: "English" },
  { key: "cn", label: "中文" },
  { key: "ko", label: "한국어" },
] as const;
export function getSafetyAsset(key: SafetyAssetKey): SafetyAsset {
  return safetyAssets[key];
}
export function getSafetyDocument(key: SafetyAssetKey) {
  const asset = getSafetyAsset(key);
  return {
    caption: asset.caption ?? asset.alt,
    url:
      asset.uploadUrl ||
      `${import.meta.env.BASE_URL}assets/docs/${asset.fileName}`,
  };
}
export function getSafetyFigure(key: SafetyAssetKey) {
  const asset = getSafetyAsset(key);
  return {
    type: "figure" as const,
    showFigureNumber: true,
    src: asset.uploadUrl,
    alt: asset.alt,
    width: asset.width,
    height: asset.height,
    caption: asset.caption,
  };
}

// Only preload hero and first-section visuals; defer the remaining 60+ images
// to avoid blocking the loader when CDN is slow (HTTP/3 stalls, etc.).
export const safetyImagePreloads = [
  safetyAssets["safe-on-framework.avif"],
  safetyAssets["1-1-three-level-laboratory-safety-management-system.avif"],
  safetyAssets["2-1-1-bow-tie-model.avif"],
].map((a) => a.uploadUrl);

export const safetyDeferredImages = Object.values(safetyAssets)
  .filter(
    (asset) =>
      asset.fileName.endsWith(".avif") &&
      !safetyImagePreloads.includes(asset.uploadUrl),
  )
  .map((asset) => asset.uploadUrl);
