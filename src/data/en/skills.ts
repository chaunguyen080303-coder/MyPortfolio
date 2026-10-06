import type { SkillGroup } from "@/data/types";

export const skills: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "WordPress"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Python", "PHP"],
  },
  {
    id: "devops",
    label: "DevOps / Cloud",
    items: ["Azure", "Docker", "Vercel", "Power Automate"],
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
