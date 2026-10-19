/**
 * Remote assets for the Entrepreneurship chapter, all hosted on
 * static.igem.wiki. Grouped by purpose so page data can reference a single
 * structured source instead of repeating long URLs inline.
 */

const PAGE_ASSETS =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/engagement/entrepreneurship";
const DOC_ASSETS = "https://static.igem.wiki/teams/6056/wiki/files/docs";

export const entrepreneurshipAssets = {
  /** Page illustrations, in the order the chapter uses them. */
  illustrations: {
    who: `${PAGE_ASSETS}/who.avif`,
    empathyMap: `${PAGE_ASSETS}/empathy-map.avif`,
    valuePropositionCanvas: `${PAGE_ASSETS}/value-proposition-canvas.avif`,
    pestel: `${PAGE_ASSETS}/pestel.avif`,
    tamSamSom: `${PAGE_ASSETS}/tam.avif`,
    technology: `${PAGE_ASSETS}/technology.avif`,
    mvp: `${PAGE_ASSETS}/mvp-2.avif`,
    inventiveFocus: `${PAGE_ASSETS}/inventive1.avif`,
    inventiveSystem: `${PAGE_ASSETS}/inventive2.avif`,
    swot: `${PAGE_ASSETS}/swot.avif`,
    competitorImmunomicTherapeutics: `${PAGE_ASSETS}/immunomic-therapeutics.avif`,
    competitorUniversityOfWashingtonStemvac: `${PAGE_ASSETS}/university-of-washington-stemvac.avif`,
    competitorClevelandClinic: `${PAGE_ASSETS}/cleveland-clinic.avif`,
    competitorMerck: `${PAGE_ASSETS}/merck.webp`,
    competitorAstraZeneca: `${PAGE_ASSETS}/astrazeneca-logo.avif`,
    businessModel: `${PAGE_ASSETS}/business-model.avif`,
    b2bB2c: `${PAGE_ASSETS}/1.avif`,
    beachheadStrategy: `${PAGE_ASSETS}/beachhead-strategy.avif`,
    riskInterview: `${PAGE_ASSETS}/risk-interview.avif`,
    originalDocument1: `${PAGE_ASSETS}/original-document-1.avif`,
    originalDocument1EnTranslation: `${PAGE_ASSETS}/original-document-en-translation.avif`,
    originalDocument2: `${PAGE_ASSETS}/original-document2.avif`,
    originalDocument2EnTranslation: `${PAGE_ASSETS}/original-document2-en-translation.avif`,
    teamPhoto: `${PAGE_ASSETS}/team-photo.avif`,
    actionEastChina: `${PAGE_ASSETS}/east-china.avif`,
    actionCentralChina: `${PAGE_ASSETS}/central.avif`,
    actionNorthChina: `${PAGE_ASSETS}/north.avif`,
    actionNortheastChina: `${PAGE_ASSETS}/northeast.avif`,
    actionSouthChina: `${PAGE_ASSETS}/south.avif`,
    actionSynbiopunk: `${PAGE_ASSETS}/synbiopunk.avif`,
    actionApic: `${PAGE_ASSETS}/apic.avif`,
    thankYouPaper: `${PAGE_ASSETS}/massage-paper.avif`,
  },
  /** Stakeholder-matrix 3D cards, keyed by stakeholder group. */
  stakeholders: {
    patients: `${PAGE_ASSETS}/patients-and-patient-representatives.avif`,
    clinicians: `${PAGE_ASSETS}/clinicians-and-the-healthcare-system.avif`,
    scientificExperts: `${PAGE_ASSETS}/scientific-and-technical-experts.avif`,
    industryPartners: `${PAGE_ASSETS}/industry-and-development-partners.avif`,
    regulatoryPolicyPayers: `${PAGE_ASSETS}/regulatory-policy-and-payer-stakeholders.avif`,
    commercializationPartners: `${PAGE_ASSETS}/commercialization-and-resource-support-partners.avif`,
    teamLogo: `${PAGE_ASSETS}/team-logo.avif`,
  },
  /** Downloadable PDFs. */
  documents: {
    jikaLetterOfIntent: `${DOC_ASSETS}/entrepreneurship/jika.pdf`,
    jienzhiheLetterOfIntent: `${DOC_ASSETS}/entrepreneurship/jienzhihe.pdf`,
    scalability: `${DOC_ASSETS}/scalability.pdf`,
    businessPlan: `${DOC_ASSETS}/entrepreneurship/bussines-plan.pdf`,
    legalPlan: `${DOC_ASSETS}/entrepreneurship/legal-plan.pdf`,
  },
} as const;
