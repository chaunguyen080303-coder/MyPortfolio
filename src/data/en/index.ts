import type { SiteContent } from "@/data/types";
import { experience } from "@/data/en/experience";
import { profile } from "@/data/en/profile";
import { projects } from "@/data/en/projects";
import { skills } from "@/data/en/skills";

/**
 * [[TODO: production URL]]
 * Replace example.com before launch. Used for canonical links, the sitemap, and JSON-LD.
 */
const siteUrl = "https://example.com";

export const en: SiteContent = {
  siteUrl,
  profile,
  navigation: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "process", label: "How I work" },
    { id: "contact", label: "Contact" },
  ],
  about: [
    "I am a full-stack web developer in Hanoi. For two years I have taken products from a rough brief to a deployed app: the interface, the API, the database, and the handover.",
    "Recent work includes a Japanese studio booking site, e-commerce admin flows, retail data pipelines, a Power Platform ledger that writes payroll files, and plugins inside monday and Atlassian. Some of that work stays on the client's side. Where I can share it, the case study links to the live site.",
  ],
  skills,
  experience,
  projects,
  process: [
    {
      title: "Discuss",
      body: "We pin down the problem, who it is for, and what is out of scope.",
    },
    {
      title: "Plan and estimate",
      body: "You get a written plan, milestones, and a price before I start building.",
    },
    {
      title: "Build with weekly demos",
      body: "Each week you see working software, not a status slide.",
    },
    {
      title: "Deploy and handover",
      body: "I deploy it, walk you through the repository, and leave notes for the next person.",
    },
  ],
  contactIntro:
    "Tell me about the product, the deadline, and how you like to work. I read every note.",
  ui: {
    skipToContent: "Skip to content",
    available: "Available for freelance",
    hireMe: "Hire me on Upwork",
    emailMe: "Email me",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    backToPortfolio: "Back to portfolio",
    problem: "Problem",
    built: "What I built",
    result: "Result",
    viewProject: "View case study",
    preview: "Preview",
    flow: "Flow",
    live: "Live",
    code: "Code",
    privateDemo: "Private — no public demo",
    cv: "CV",
    footer: "Built with Next.js, Tailwind, deployed on Vercel",
    notFoundTitle: "This page is not on the site",
    notFoundBody: "The link may be out of date. The portfolio is still on the home page.",
  },
};
