/**
 * Shared landing content — client-safe.
 * Per `file-separation`: plain `.ts` holds shared types + static data
 * safe to import anywhere (server or client).
 *
 * Components should import data from here instead of hard-coding
 * large arrays inline, keeping route/component files focused.
 */

export interface HeroFlag {
  src: string
  label: string
  className: string
}

export const heroFlags: HeroFlag[] = [
  { src: '/images/baby-alien.svg', label: 'Baby alien', className: 'prop-1' },
  { src: '/images/control-panel.svg', label: 'Control panel', className: 'prop-2' },
  { src: '/images/hologram-monitor.svg', label: 'Hologram monitor', className: 'prop-3' },
  { src: '/images/solar-panel.svg', label: 'Solar panel', className: 'prop-4' },
  { src: '/images/energy-cell.svg', label: 'Energy cell', className: 'prop-5' },
  { src: '/images/energy-link.svg', label: 'Energy link', className: 'prop-6' },
  { src: '/images/barricade-pillar.svg', label: 'Barricade pillar', className: 'prop-7' },
  { src: '/images/space-base.svg', label: 'Space base', className: 'prop-8' },
]

export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'What is AtomIQ?',
    answer:
      'AtomIQ is an interactive learning app that turns nuclear science into lessons, games, challenges, and trusted references — so you can understand the science beyond the myths.',
  },
  {
    question: 'Who is AtomIQ for?',
    answer:
      'Everyone curious about nuclear science — students, teachers, and lifelong learners. No physics background needed; lessons start simple and build up step by step.',
  },
  {
    question: 'Is the science trustworthy?',
    answer:
      'Yes. AtomIQ is built on 48+ curated sources and trusted scientific references. Every lesson, game, and discovery traces back to real research — every discovery starts with a source.',
  },
  {
    question: 'Who is Shrodi?',
    answer:
      'Shrodi is your learning companion inside AtomIQ — guiding each lesson, cheering your progress, and making nuclear science feel friendly and playful.',
  },
  {
    question: 'When will AtomIQ be available?',
    answer:
      'AtomIQ is coming soon to the App Store. Join the waitlist via the download button below and be first to explore the world of the atom.',
  },
]

export interface TeamMember {
  name: string
  role: string
  img: string
  leader: boolean
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Michelle Reyes',
    role: 'Researcher',
    img: '/images/team/michelle.webp',
    leader: false,
  },
  {
    name: 'Kent Garcia',
    role: 'Developer',
    img: '/images/team/kent.webp',
    leader: true,
  },
  {
    name: 'Ezekiel Pinto',
    role: 'Researcher',
    img: '/images/team/ezekiel.webp',
    leader: false,
  },
]

export type Verdict = 'myth' | 'fact'

export interface ChallengeQuestion {
  statement: string
  answer: Verdict
  explanation: string
}

export const challengeQuestions: ChallengeQuestion[] = [
  {
    statement: '\u201CRadiation always causes cancer.\u201D',
    answer: 'myth',
    explanation:
      'Myth. We\u2019re exposed to tiny amounts of background radiation every day \u2014 from the sun, soil, even bananas. Whether radiation causes harm depends on the dose and type; low doses are generally harmless, while high doses increase risk.',
  },
  {
    statement: '\u201CNuclear power plants can explode like nuclear bombs.\u201D',
    answer: 'myth',
    explanation:
      'Myth. Power reactors use low-enriched fuel and are governed by physics that make a bomb-like explosion impossible. Safety systems are designed to shut the reaction down, not amplify it.',
  },
  {
    statement: '\u201CNuclear medicine helps doctors diagnose and treat disease.\u201D',
    answer: 'fact',
    explanation:
      'Fact. Hospitals use small, controlled amounts of radioactive materials every day for imaging scans and targeted cancer treatments \u2014 one of the most widespread peaceful uses of nuclear science.',
  },
]

export interface ShrodiSample {
  question: string
  answer: string
  sources: string[]
}

export const shrodiSamples: ShrodiSample[] = [
  {
    question: 'Why is radiation everywhere?',
    answer:
      'Radiation is a natural part of our environment. It comes from sources in the Earth, space, and even some foods. ☢️',
    sources: ['AtomIQ Encyclopedia', 'Background Radiation Guide'],
  },
  {
    question: 'Why can\u2019t nuclear power plants explode like bombs?',
    answer:
      'Power reactors use low-enriched fuel and are controlled by physics that shut the reaction down \u2014 not amplify it. A bomb-like explosion is physically impossible in a power plant.',
    sources: ['AtomIQ Encyclopedia', 'IAEA Resources'],
  },
  {
    question: 'Is the radiation from bananas dangerous?',
    answer:
      'No. Bananas contain a tiny amount of naturally radioactive potassium-40. The dose is so small your body handles it easily \u2014 it\u2019s a fun way to understand background radiation.',
    sources: ['Curated Reference', 'Background Radiation Guide'],
  },
  {
    question: 'How does nuclear medicine work?',
    answer:
      'Doctors use tiny, controlled amounts of radioactive materials to image the body or target diseased cells \u2014 helping diagnose and treat illness with remarkable precision.',
    sources: ['AtomIQ Encyclopedia', 'Medical Isotopes Primer'],
  },
]

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Features', href: '#features' },
      { label: 'Myth Smashers', href: '#myth-smashers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '#our-story' },
      { label: 'Team', href: '#team' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Get AtomIQ',
    links: [
      { label: 'Meet Shrodi', href: '#shrodi' },
      { label: 'Download App', href: '#download' },
    ],
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Our Story', href: '#our-story' },
] as const

export interface JourneyMilestone {
  step: string
  event: string
  result: string
  text: string
  accent: 'blue' | 'orange' | 'red'
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    step: '01',
    event: 'DOST-PNRI Myth Smashers',
    result: 'National Champion',
    text: 'Won the national stage by turning nuclear myths into science-backed stories.',
    accent: 'blue',
  },
  {
    step: '02',
    event: 'ANENT Myth Smashers',
    result: 'International 2nd Place',
    text: 'Represented the Philippines internationally and placed second across Asia.',
    accent: 'orange',
  },
  {
    step: '03',
    event: 'International Nuclear Science Program',
    result: 'Japan',
    text: 'Took the journey further — learning from the global nuclear science community in Japan.',
    accent: 'red',
  },
]

export const scienceFlow = ['Research', 'Curated Knowledge', 'AtomIQ', 'You']

export const scienceLogos = [
  { name: 'Institution logo 1' },
  { name: 'Institution logo 2' },
  { name: 'Institution logo 3' },
  { name: 'Institution logo 4' },
  { name: 'Institution logo 5' },
  { name: 'Institution logo 6' },
]
