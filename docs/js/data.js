/* ==========================================================================
   data.js — sample data for the ABPI prototypes

   Real: member company names (Full members, from the ABPI members list),
   headline statistics and their sources (from the Facts and figures page,
   30 Sep 2026), publication and event titles and dates where they were
   published on abpi.org.uk.
   Sample: therapy areas and UK sites for members, affiliate members, prices,
   capacity, dates marked "sample", chart values marked "sample".
   ========================================================================== */

window.ABPI_AREAS = ['Oncology', 'Immunology', 'Neuroscience', 'Rare diseases', 'Vaccines and infectious disease', 'Cardiovascular and metabolic', 'Respiratory', 'Dermatology', 'Ophthalmology', 'Haematology'];

/* Full members: real names. Areas and sites are sample data. */
window.ABPI_MEMBERS = [
  { name: 'AbbVie Limited', cat: 'full', areas: ['Immunology', 'Oncology', 'Neuroscience'], sites: 'Maidenhead' },
  { name: 'Alliance Pharmaceuticals Limited', cat: 'full', areas: ['Dermatology'], sites: 'Chippenham' },
  { name: 'Almirall Limited', cat: 'full', areas: ['Dermatology'], sites: 'Uxbridge' },
  { name: 'Amgen Limited', cat: 'full', areas: ['Oncology', 'Cardiovascular and metabolic'], sites: 'Uxbridge, Cambridge' },
  { name: 'Amicus Therapeutics Limited', cat: 'full', areas: ['Rare diseases'], sites: 'Marlow' },
  { name: 'Astellas Pharma Limited', cat: 'full', areas: ['Oncology', 'Ophthalmology'], sites: 'Addlestone' },
  { name: 'AstraZeneca Plc', cat: 'full', areas: ['Oncology', 'Respiratory', 'Cardiovascular and metabolic'], sites: 'Cambridge, Macclesfield, Speke' },
  { name: 'Bayer Plc', cat: 'full', areas: ['Cardiovascular and metabolic', 'Oncology', 'Ophthalmology'], sites: 'Reading' },
  { name: 'Biogen Idec Limited', cat: 'full', areas: ['Neuroscience'], sites: 'Maidenhead' },
  { name: 'Boehringer Ingelheim Limited', cat: 'full', areas: ['Respiratory', 'Cardiovascular and metabolic'], sites: 'Bracknell' },
  { name: 'Bristol-Myers Squibb Pharmaceuticals Limited', cat: 'full', areas: ['Oncology', 'Haematology', 'Immunology'], sites: 'Uxbridge' },
  { name: 'Chiesi Limited', cat: 'full', areas: ['Respiratory', 'Rare diseases'], sites: 'Manchester' },
  { name: 'CSL Seqirus', cat: 'full', areas: ['Vaccines and infectious disease'], sites: 'Liverpool, Maidenhead' },
  { name: 'Daiichi Sankyo UK Limited', cat: 'full', areas: ['Oncology', 'Cardiovascular and metabolic'], sites: 'Uxbridge' },
  { name: 'Eisai Limited', cat: 'full', areas: ['Neuroscience', 'Oncology'], sites: 'Hatfield' },
  { name: 'Gilead Sciences', cat: 'full', areas: ['Vaccines and infectious disease', 'Oncology'], sites: 'London' },
  { name: 'GlaxoSmithKline Plc', cat: 'full', areas: ['Vaccines and infectious disease', 'Respiratory', 'Immunology'], sites: 'London, Stevenage, Barnard Castle' },
  { name: 'Ipsen', cat: 'full', areas: ['Oncology', 'Rare diseases', 'Neuroscience'], sites: 'Slough, Wrexham' },
  { name: 'Johnson & Johnson Innovative Medicine', cat: 'full', areas: ['Oncology', 'Immunology', 'Neuroscience'], sites: 'High Wycombe' },
  { name: 'Leo Pharma', cat: 'full', areas: ['Dermatology'], sites: 'Maidenhead' },
  { name: 'Lilly (Eli Lilly and Company Limited)', cat: 'full', areas: ['Cardiovascular and metabolic', 'Neuroscience', 'Oncology'], sites: 'Basingstoke' },
  { name: 'Lundbeck Limited', cat: 'full', areas: ['Neuroscience'], sites: 'Milton Keynes' },
  { name: 'Merck Sharp & Dohme Limited', cat: 'full', areas: ['Oncology', 'Vaccines and infectious disease'], sites: 'London' },
  { name: 'Moderna', cat: 'full', areas: ['Vaccines and infectious disease'], sites: 'London, Harwell' },
  { name: 'Norgine Pharmaceuticals Limited', cat: 'full', areas: ['Rare diseases'], sites: 'Uxbridge, Hengoed' },
  { name: 'Novartis Pharmaceuticals UK Limited', cat: 'full', areas: ['Cardiovascular and metabolic', 'Oncology', 'Immunology'], sites: 'London' },
  { name: 'Novo Nordisk Limited', cat: 'full', areas: ['Cardiovascular and metabolic', 'Haematology'], sites: 'Gatwick, Oxford' },
  { name: 'Otsuka Pharmaceuticals (U.K.) Ltd', cat: 'full', areas: ['Neuroscience'], sites: 'Wexham' },
  { name: 'Pfizer Limited', cat: 'full', areas: ['Vaccines and infectious disease', 'Oncology', 'Rare diseases'], sites: 'Tadworth, Sandwich' },
  { name: 'Roche', cat: 'full', areas: ['Oncology', 'Neuroscience', 'Ophthalmology'], sites: 'Welwyn Garden City' },
  { name: 'Sanofi Limited', cat: 'full', areas: ['Immunology', 'Vaccines and infectious disease', 'Rare diseases'], sites: 'Reading' },
  { name: 'Santen UK Limited', cat: 'full', areas: ['Ophthalmology'], sites: 'Didcot' },
  { name: 'Swedish Orphan Biovitrum Limited', cat: 'full', areas: ['Rare diseases', 'Haematology'], sites: 'Cambridge' },
  { name: 'Takeda UK Limited', cat: 'full', areas: ['Rare diseases', 'Oncology', 'Haematology'], sites: 'London' },
  { name: 'UCB Pharma Limited', cat: 'full', areas: ['Neuroscience', 'Immunology'], sites: 'Slough' },
  { name: 'Valneva', cat: 'full', areas: ['Vaccines and infectious disease'], sites: 'Livingston' },
  /* Affiliates: placeholders. The live list of affiliates was not reviewed. */
  { name: '[Research affiliate: cell therapy company]', cat: 'research', areas: ['Oncology', 'Haematology'], sites: 'Stevenage' },
  { name: '[Research affiliate: gene therapy company]', cat: 'research', areas: ['Rare diseases', 'Ophthalmology'], sites: 'London' },
  { name: '[Research affiliate: contract research organisation]', cat: 'research', areas: ['Oncology', 'Neuroscience'], sites: 'Reading' },
  { name: '[Research affiliate: antibody discovery company]', cat: 'research', areas: ['Immunology'], sites: 'Cambridge' },
  { name: '[General affiliate: law firm]', cat: 'general', areas: [], sites: 'London' },
  { name: '[General affiliate: health economics consultancy]', cat: 'general', areas: [], sites: 'Oxford' },
  { name: '[General affiliate: medical communications agency]', cat: 'general', areas: [], sites: 'Macclesfield' },
  { name: '[General affiliate: clinical supply company]', cat: 'general', areas: [], sites: 'Livingston' }
];

window.ABPI_CATS = {
  full: 'Full member',
  research: 'Research affiliate',
  general: 'General affiliate'
};

/* Statistics. Values, captions and sources are as published on the ABPI Facts
   and figures page (30 Sep 2026), with the two truncated captions completed as
   placeholders in [brackets] for the ABPI to confirm. */
window.ABPI_STATS = {
  economy: {
    title: 'Economy',
    summary: 'The pharmaceutical industry adds around £20bn a year directly to the UK economy and exported £38.7bn of medicinal and pharmaceutical products in 2025.',
    figures: [
      { value: '£20.39bn', label: 'direct Gross Value Added (GVA)', source: "ONS, 'Regional gross value added (balanced) by industry: all ITL regions'", date: '2025' },
      { value: '£38.7bn', label: 'of medicinal and pharmaceutical products exported in 2025', source: "ONS, 'Trade in goods: country-by-commodity exports'", date: 'October 2026' }
    ],
    chart: { unit: '£bn', note: 'Exports by year. Sample values except 2025.', rows: [['2021', 26.1, true], ['2022', 29.4, true], ['2023', 33.0, true], ['2024', 35.8, true], ['2025', 38.7, false]] }
  },
  rd: {
    title: 'Research and development',
    summary: 'Pharmaceutical companies invested £9.3bn in UK research and development in 2024: £1 in every £6 of private-sector R&D.',
    figures: [
      { value: '£9.3bn', label: 'investment in UK R&D in 2024', source: "ONS, 'Business enterprise research and development UK: 2024'", date: 'December 2025' },
      { value: '£1 in £6', label: 'invested by the private sector in R&D is invested by the pharmaceutical industry', source: "ONS, 'Business enterprise research and development UK: 2024'", date: 'December 2025' }
    ],
    chart: { unit: '£bn', note: 'R&D investment by year. Sample values except 2024.', rows: [['2020', 8.0, true], ['2021', 8.6, true], ['2022', 9.0, true], ['2023', 9.1, true], ['2024', 9.3, false]] }
  },
  trials: {
    title: 'Clinical trials',
    summary: 'Industry trials started in the UK rose to 578 in 2024 from 426 in 2023, but remain below the 667 started in 2017.',
    figures: [
      { value: '578', label: 'industry clinical trials initiated in the UK in 2024 (426 in 2023; 667 in 2017)', source: "ABPI, 'UK industry clinical trials: Translating actions into impact'", date: 'December 2025' },
      { value: '19,092', label: 'patients recruited to interventional industry clinical trials in the NHS in 2024/25', source: '[Source to be confirmed: reference missing on the live page]', date: '2024/25' },
      { value: '£1.2bn', label: 'income to the NHS for industry clinical trials initiated in 2022/23', source: "Frontier Economics, 'The value of industry clinical trials to the UK'", date: 'December 2024' }
    ],
    chart: { unit: 'trials', note: 'Industry trials initiated. 2017, 2023 and 2024 as published; other years sample.', rows: [['2017', 667, false], ['2019', 600, true], ['2021', 470, true], ['2022', 410, true], ['2023', 426, false], ['2024', 578, false]] }
  },
  access: {
    title: 'Access to medicines',
    summary: 'The UK spends 9% of its overall healthcare budget on medicines, and newly launched medicines reach on average about half of eligible patients in their first year.',
    figures: [
      { value: '9%', label: 'of overall healthcare spending the UK invests in medicines [rest of caption to be confirmed]', source: '[Source to be confirmed: reference missing on the live page]', date: '[Year]' },
      { value: '52%', label: 'average uptake of medicines launched between 2018 and 2022 in their first year [rest of caption to be confirmed]', source: '[Source to be confirmed: reference missing on the live page]', date: '[Year]' }
    ],
    chart: { unit: '%', note: 'First-year uptake by launch year. Sample values.', rows: [['2018', 48, true], ['2019', 50, true], ['2020', 53, true], ['2021', 55, true], ['2022', 54, true]] }
  },
  people: {
    title: 'People',
    summary: 'The industry supports 125,702 jobs in the UK, a figure measured differently from the 73,000 direct employees quoted on the Careers page.',
    figures: [
      { value: '125,702', label: 'jobs', source: "ONS, NOMIS 'Business Register and Employment Survey'", date: 'October 2025' },
      { value: '73,000+', label: 'people directly employed, per the Careers page [measure and source to be confirmed]', source: '[Source to be confirmed]', date: '[Year]' }
    ],
    chart: { unit: 'jobs (000s)', note: 'Jobs by year. Sample values except 2025.', rows: [['2021', 118, true], ['2022', 120, true], ['2023', 122, true], ['2024', 124, true], ['2025', 125.7, false]] }
  }
};

/* Access to medicines: indications approved 2022–2025 and their status in
   England. The live page has this as a static graphic; the counts here are
   SAMPLE values to show the interaction. */
window.ABPI_ACCESS = [
  { area: 'Oncology', year: 2022, approved: 34, recommended: 22, restricted: 7, pending: 2, notRecommended: 3 },
  { area: 'Oncology', year: 2023, approved: 31, recommended: 18, restricted: 6, pending: 5, notRecommended: 2 },
  { area: 'Oncology', year: 2024, approved: 29, recommended: 12, restricted: 5, pending: 10, notRecommended: 2 },
  { area: 'Oncology', year: 2025, approved: 27, recommended: 5, restricted: 2, pending: 19, notRecommended: 1 },
  { area: 'Rare diseases', year: 2022, approved: 12, recommended: 5, restricted: 3, pending: 1, notRecommended: 3 },
  { area: 'Rare diseases', year: 2023, approved: 10, recommended: 4, restricted: 2, pending: 2, notRecommended: 2 },
  { area: 'Rare diseases', year: 2024, approved: 11, recommended: 3, restricted: 2, pending: 5, notRecommended: 1 },
  { area: 'Rare diseases', year: 2025, approved: 9, recommended: 1, restricted: 1, pending: 7, notRecommended: 0 },
  { area: 'Immunology', year: 2022, approved: 9, recommended: 7, restricted: 1, pending: 0, notRecommended: 1 },
  { area: 'Immunology', year: 2023, approved: 8, recommended: 5, restricted: 2, pending: 1, notRecommended: 0 },
  { area: 'Immunology', year: 2024, approved: 10, recommended: 5, restricted: 1, pending: 4, notRecommended: 0 },
  { area: 'Immunology', year: 2025, approved: 7, recommended: 2, restricted: 0, pending: 5, notRecommended: 0 },
  { area: 'Neuroscience', year: 2022, approved: 6, recommended: 3, restricted: 1, pending: 0, notRecommended: 2 },
  { area: 'Neuroscience', year: 2023, approved: 7, recommended: 3, restricted: 1, pending: 1, notRecommended: 2 },
  { area: 'Neuroscience', year: 2024, approved: 5, recommended: 1, restricted: 1, pending: 2, notRecommended: 1 },
  { area: 'Neuroscience', year: 2025, approved: 6, recommended: 0, restricted: 0, pending: 6, notRecommended: 0 }
];

/* Publications. Titles are real (abpi.org.uk, 30 Sep 2026). Dates marked
   s:true, themes and summaries for some items are sample. */
window.ABPI_PUBS = [
  { title: "ABPI position on NICE's Whole Lifecycle Approach", type: 'Position', theme: 'Value and access', date: '2026-09-22', s: true, format: 'HTML', mins: 6, summary: "Our response to NICE's plans to keep guidance current across a medicine's life, and what it needs to work for patients." },
  { title: 'UK pharmaceutical investment competitiveness report 2026: Green shoots, global competition, and the case for delivery', type: 'Report', theme: 'Investment and growth', date: '2026-09-08', format: 'HTML + PDF', mins: 25, summary: "Benchmarks the UK against competitor markets and finds £2bn in fresh pharma investment since September 2025, with recovery depending on reforms being delivered." },
  { title: 'Pharmaceutical industry priorities for the Health Data Research Service', type: 'Position', theme: 'Health data', date: '2026-08-20', format: 'HTML', mins: 8, summary: 'What the industry needs from the new Health Data Research Service to make the UK a first choice for data-enabled research.' },
  { title: 'A guide to the development and manufacture of medicines', type: 'Guidance', theme: 'Research and manufacturing', date: '2026-07-01', format: 'PDF', mins: 15, summary: 'How a medicine goes from discovery to the patient, written for readers new to the industry.' },
  { title: 'Canllaw i ddatblygu a chynhyrchu meddyginiaethau', type: 'Guidance', theme: 'Research and manufacturing', date: '2026-07-01', format: 'PDF', mins: 15, lang: 'Cymraeg', summary: 'The Welsh-language edition of A guide to the development and manufacture of medicines.' },
  { title: 'Building a resilient medicines supply chain together', type: 'Report', theme: 'Medicine supply', date: '2026-06-10', s: true, format: 'PDF', mins: 30, summary: 'A comprehensive overview of medicine supply chain resilience in the UK, commissioned by the ABPI.' },
  { title: 'Investing in rarity: the economic and personal value of improving treatment for rare disease', type: 'Report', theme: 'Rare diseases', date: '2026-05-28', s: true, format: 'HTML + PDF', mins: 20, summary: 'The economic and personal case for faster diagnosis and access to treatment for people with rare diseases.' },
  { title: "ABPI position on the government's plans to develop a Single National Formulary in England", type: 'Position', theme: 'Value and access', date: '2026-05-14', s: true, format: 'HTML', mins: 7, summary: 'We welcome faster, more equitable adoption of NICE-recommended medicines, and set out the conditions a single formulary needs to meet.' },
  { title: 'Globally competitive UK-wide data-enabled clinical trials: the time is now', type: 'Report', theme: 'Clinical research', date: '2026-04-22', s: true, format: 'PDF', mins: 25, summary: 'Recruitment challenges in UK commercial trials, the state of data-enabled trial services, and how NHS data could help.' },
  { title: 'Disclosure UK: Factsheet for healthcare professionals and healthcare organisations', type: 'Guidance', theme: 'Transparency and the Code', date: '2026-04-01', s: true, format: 'PDF', mins: 4, summary: 'How healthcare professionals and organisations can check and query their data before it is published on Disclosure UK.' },
  { title: 'From models to medicines: a landscape review of human-relevant pre-clinical model development in the UK', type: 'Report', theme: 'Research and manufacturing', date: '2026-03-12', s: true, format: 'PDF', mins: 35, summary: 'How ready the UK academic ecosystem for human-relevant pre-clinical models is for adoption in pharmaceutical research.' },
  { title: 'Improving access to cancer medicines', type: 'Report', theme: 'Value and access', date: '2026-02-18', s: true, format: 'HTML', mins: 12, summary: 'How improving the way cancer medicines are valued, funded and adopted would bring faster access and better outcomes.' },
  { title: 'UK industry clinical trials: Translating actions into impact', type: 'Report', theme: 'Clinical research', date: '2025-12-04', s: true, format: 'HTML + PDF', mins: 40, summary: 'Tracks progress on UK industry trials against the government target to cut set-up times from 250 to 150 days.' },
  { title: 'Response to the MHRA consultation on clinical trials regulations', type: 'Consultation response', theme: 'Clinical research', date: '2025-10-15', s: true, format: 'PDF', mins: 10, sample: true, summary: '[Sample item] Shows how a consultation response would appear, with the consulting body and closing date.' },
  { title: 'Response to the NICE methods and processes consultation', type: 'Consultation response', theme: 'Value and access', date: '2025-09-02', s: true, format: 'PDF', mins: 12, sample: true, summary: '[Sample item] Shows how a consultation response would appear, with the consulting body and closing date.' },
  { title: 'Industry and academia links survey 2024', type: 'Data', theme: 'Research and manufacturing', date: '2025-06-30', s: true, format: 'Interactive', mins: 10, summary: 'An interactive report on trends in collaboration between industry and academic institutions, from anonymised data.' },
  { title: 'Code of Practice for the Pharmaceutical Industry 2024', type: 'Code of Practice', theme: 'Transparency and the Code', date: '2024-09-23', format: 'PDF', mins: 90, summary: 'The requirements the industry must comply with when promoting prescription medicines and working with health professionals.' },
  { title: 'ABPI Manifesto for Investment, Health and Growth', type: 'Position', theme: 'Investment and growth', date: '2024-05-01', s: true, format: 'HTML', mins: 15, summary: "The ABPI's proposals for how the UK can overtake its global competitors on medicines and research." }
];
window.ABPI_THEMES = ['Clinical research', 'Health data', 'Investment and growth', 'Medicine supply', 'Rare diseases', 'Research and manufacturing', 'Transparency and the Code', 'Value and access', 'Vaccines', 'Antimicrobial resistance', 'Sustainability', 'UK nations'];
window.ABPI_TYPES = ['Report', 'Position', 'Consultation response', 'Guidance', 'Data', 'Code of Practice'];

/* Media centre. Titles and dates real (Media Centre, 30 Sep 2026); the
   press release / statement / blog split is ClerksWell's reclassification. */
window.ABPI_MEDIA = [
  { title: "Green shoots for UK pharma investment, but delivery will decide whether they take root", kind: 'Press release', date: '2026-09-08', by: '', summary: "New ABPI report finds £2bn in fresh pharma investment since September 2025, but warns the UK's recovery depends on delivering committed reforms." },
  { title: 'NICE has updated how it values quality of life - the move from 3L to 5L', kind: 'Blog', date: '2026-08-28', by: 'Alan Lamb', summary: 'A shift in how NICE measures treatment benefits could restrict access to some medicines, particularly those improving quality of life without extending survival.' },
  { title: 'The Health Data Research Service: a once-in-a-generation chance to lead the world', kind: 'Blog', date: '2026-08-20', by: '[Author]', summary: "The UK holds one of the world's most valuable health data assets. What it would take to make the most of it." },
  { title: 'The NHS Federated Data Platform, the Single Patient Record and the Health Data Research Service: what are they?', kind: 'Blog', date: '2026-08-18', by: '[Author]', summary: 'Three national data programmes explained, and how each relates to the pharmaceutical industry.' },
  { title: 'New pre-clinical translational models hub to accelerate development of human-relevant models', kind: 'Blog', date: '2026-08-13', by: 'Joanna Jenkinson', summary: 'Plans for a new £20 million pre-clinical translational models hub in Cambridge.' },
  { title: "Unlocking the East of England's life sciences potential: reflections from our regional roundtable", kind: 'Blog', date: '2026-07-31', by: '[Author]', summary: 'What regions like the East of England need to drive the next phase of UK life sciences growth.' },
  { title: 'ABPI comment on resignation of Lord Vallance', kind: 'Statement', date: '2026-07-20', by: 'Richard Torbett, Chief Executive', summary: 'On the resignation of Lord Vallance as Science Minister.' },
  { title: 'Why cross-sector collaboration in AI is the key to unlocking new medicines', kind: 'Blog', date: '2026-07-14', by: '[Author]', summary: 'AI focuses research on the most promising compounds with the highest likelihood of clinical success.' },
  { title: 'New map shows how pharmaceuticals support jobs, health and growth across every UK nation', kind: 'Press release', date: '2026-07-14', by: '', summary: 'An updated interactive resource showing the contribution the industry makes to health, jobs and research in each nation.' },
  { title: 'Package deals in the pharmaceutical industry and Disclosure UK data', kind: 'Blog', date: '2026-06-30', by: 'Alex Fell, PMCPA', summary: 'Why package deals matter for transparency, and what the Code says about them.' },
  { title: 'Disclosure UK 2025: the 11th year of Disclosure UK data', kind: 'Press release', date: '2026-06-30', by: '', summary: 'Industry transparency continues to grow in the latest data published on Disclosure UK.' },
  { title: 'Are NHS patients keeping up with European neighbours on access to new medicines?', kind: 'Blog', date: '2026-05-19', by: '[Author]', summary: 'NHS patients in England rank 7th in Europe for access to newly approved medicines, according to the latest W.A.I.T. Indicator report.' }
];

/* Events. Titles and dates real (abpi.org.uk events page, 30 Sep 2026).
   Status, prices and places are SAMPLE. */
window.ABPI_EVENTS = [
  { id: 'nice-masterclass', title: 'NICE/DTSU/ABPI Masterclass: Evidence Synthesis for NICE submissions', start: '2026-10-06', end: '', time: '09:15–16:30', format: 'In person', place: 'London Bridge', audience: 'Open to all', price: '[£ member / £ non-member]', status: 'few', places: 6, summary: 'Focused solely on the requirements of NICE and its Appraisal Committees, and on the challenges in key areas of evidence generation and methodology. For staff who prepare submissions, the consultancies that support them and the academic groups who review them.' },
  { id: 'code-training', title: 'ABPI Code training', start: '2026-11-05', end: '2026-11-06', time: '09:30–16:00', format: 'In person', place: 'London Bridge', audience: 'Open to all', price: '[£ per delegate]', status: 'full', places: 0, summary: 'A one-day seminar delivered by members of the PMCPA Code of Practice Panel, using real case examples and interactive exercises. Maximum 20 places per date. Both 2026 dates are full.' },
  { id: 'summit', title: 'ABPI Industry Summit 2026', start: '2026-11-05', end: '', time: '09:00–18:00', format: 'In person', place: 'London', audience: 'Members and invited guests', price: 'No charge for members', status: 'open', places: 40, summary: 'Assesses the way industry builds familiarity and trust, and asks whether we need to work differently to achieve radical change for patients.' },
  { id: 'smc', title: 'Scottish Medicines Consortium online workshops', start: '2026-06-08', end: '2026-12-08', time: '09:30–12:30', format: 'Online', place: 'Online', audience: 'Open to all', price: '[£ per delegate]', status: 'open', places: 18, summary: 'A practical overview of the SMC submission process, led by Dr Catriona McMahon, Lead Industry Member for SMC. Various dates.' },
  { id: 'ft-summit', title: 'Global Pharma & Biotech Summit', start: '2026-11-10', end: '2026-11-11', time: '08:00–16:20', format: 'In person', place: 'London', audience: 'Open to all', price: 'Booked through the organiser', status: 'partner', places: null, summary: 'Organised by the Financial Times. Leaders, investors and policymakers on geopolitical and economic disruption, AI, regulation and market access.' },
  { id: 'conference', title: 'ABPI Annual Conference 2027', start: '2027-04-22', end: '', time: '09:30–18:30', format: 'In person', place: 'London', audience: 'Open to all', price: 'To be announced', status: 'interest', places: null, summary: "The UK pharmaceutical industry's flagship event. Programme and speakers to be announced; register your interest to hear first." }
];
