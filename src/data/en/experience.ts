import type { ExperienceItem } from "@/data/types";

export const experience: ExperienceItem[] = [
  {
    id: "ds-solution",
    period: "Sep 2024 – Present",
    role: "Full-Stack Developer",
    company: "DS Solution Vietnam",
    highlights: [
      "Built production apps from the database and API through to the interface.",
      "Shipped custom apps for monday and Atlassian (Jira / Confluence).",
      "Built data pipelines that collect, clean, and version data for reporting.",
      "Built a Japanese staff-savings ledger that writes Excel and CSV for payroll.",
      "Deployed with Docker, Azure, and Vercel.",
    ],
  },
  {
    id: "freelance-booking",
    period: "Aug 2026 – Oct 2026",
    role: "Freelance Web Developer",
    company: "Self-employed",
    highlights: [
      "Launched an online booking site for a client in Japan, from the brief through go-live.",
      "Built the first version in WordPress: service choice, a calendar, and appointment confirmation.",
      "Rebuilt that booking model as a React app on Azure Static Web Apps.",
    ],
  },
];
