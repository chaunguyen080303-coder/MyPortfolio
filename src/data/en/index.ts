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
    "I am a full-stack web developer in Vietnam. For two years I have taken products from a rough brief to a deployed app: the interface, the API, the database, and the handover.",
    "Clients hire me for booking systems, online stores, data pipelines, and plugins that live inside monday and Atlassian. I write the scope down, split the work into milestones, and show a working demo at the end of each one. You get a tidy repository and a handover the next developer can follow.",
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
    live: "Live",
    code: "Code",
    cv: "CV",
    footer: "Built with Next.js, Tailwind, deployed on Vercel",
    notFoundTitle: "This page is not on the site",
    notFoundBody: "The link may be out of date. The portfolio is still on the home page.",
  },
};
