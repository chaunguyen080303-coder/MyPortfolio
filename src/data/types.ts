export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export type Language = {
  name: string;
  level: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export type ExperienceItem = {
  id: string;
  period: string;
  role: string;
  company: string;
  highlights: string[];
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  built: string;
  result: string;
  tags: string[];
  image: ProjectImage;
  liveUrl?: string;
  codeUrl?: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type NavItem = {
  id: string;
  label: string;
};

export type SiteContent = {
  siteUrl: string;
  profile: {
    name: string;
    title: string;
    tagline: string;
    heroFrames: string[];
    location: string;
    experienceSummary: string;
    languages: Language[];
    email: string;
    upworkUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    cvUrl: string;
  };
  navigation: NavItem[];
  about: string[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: Project[];
  process: ProcessStep[];
  contactIntro: string;
  ui: {
    skipToContent: string;
    available: string;
    hireMe: string;
    emailMe: string;
    openMenu: string;
    closeMenu: string;
    switchToLight: string;
    switchToDark: string;
    backToPortfolio: string;
    problem: string;
    built: string;
    result: string;
    viewProject: string;
    preview: string;
    live: string;
    code: string;
    cv: string;
    footer: string;
    notFoundTitle: string;
    notFoundBody: string;
  };
};
