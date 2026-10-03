import type { SkillGroup } from "@/data/types";

export const skills: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "REST APIs", "SQL"],
  },
  {
    id: "devops",
    label: "DevOps / Cloud",
    items: ["Docker", "Azure Static Web Apps", "Vercel"],
  },
  {
    id: "integrations",
    label: "Integrations",
    items: ["monday apps framework", "Atlassian (Jira / Confluence) plugins"],
  },
  {
    id: "data",
    label: "Data",
    items: ["data warehousing", "ETL pipelines", "reporting"],
  },
];
