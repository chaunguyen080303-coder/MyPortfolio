import type { Project, ProjectFlow } from "@/data/types";

const col = [0, 188, 376];
const row = [0, 148];

const retailFlow: ProjectFlow = {
  nodes: [
    { id: "pos", kind: "Source", title: "POS masters", x: col[0], y: row[0] },
    { id: "factory", kind: "Azure", title: "Data Factory", x: col[1], y: row[0] },
    { id: "blob", kind: "Azure", title: "Blob storage", x: col[2], y: row[0] },
    { id: "db", kind: "Data", title: "PostgreSQL", x: col[0], y: row[1] },
    { id: "api", kind: "API", title: "Node.js API", x: col[1], y: row[1] },
    { id: "web", kind: "App", title: "Store web", x: col[2], y: row[1] },
  ],
  edges: [
    { id: "pos-factory", source: "pos", target: "factory" },
    { id: "factory-blob", source: "factory", target: "blob" },
    {
      id: "blob-api",
      source: "blob",
      target: "api",
      sourceHandle: "bottom",
      targetHandle: "top",
    },
    { id: "db-api", source: "db", target: "api" },
    { id: "api-web", source: "api", target: "web" },
  ],
};

const assistantFlow: ProjectFlow = {
  nodes: [
    { id: "desktop", kind: "App", title: "Electron app", x: col[0], y: row[0] },
    { id: "api", kind: "API", title: "FastAPI", x: col[1], y: row[0] },
    { id: "db", kind: "Data", title: "PostgreSQL", x: col[2], y: row[0] },
    { id: "ai", kind: "Azure", title: "Azure OpenAI", x: col[1], y: row[1] },
  ],
  edges: [
    { id: "desktop-api", source: "desktop", target: "api" },
    { id: "api-db", source: "api", target: "db" },
    {
      id: "api-ai",
      source: "api",
      target: "ai",
      sourceHandle: "bottom",
      targetHandle: "top",
    },
  ],
};

const pluginsFlow: ProjectFlow = {
  nodes: [
    { id: "monday", kind: "monday", title: "Board", x: col[0], y: row[0] },
    { id: "jira", kind: "Atlassian", title: "Jira / Confluence", x: col[0], y: row[1] },
    { id: "app", kind: "App", title: "Custom React app", x: col[1], y: 74 },
    { id: "board", kind: "monday", title: "Board update", x: col[2], y: row[0] },
    { id: "issue", kind: "Atlassian", title: "Workflow update", x: col[2], y: row[1] },
  ],
  edges: [
    { id: "monday-app", source: "monday", target: "app" },
    { id: "jira-app", source: "jira", target: "app" },
    { id: "app-board", source: "app", target: "board" },
    { id: "app-issue", source: "app", target: "issue" },
  ],
};

const payrollFlow: ProjectFlow = {
  nodes: [
    { id: "app", kind: "Power Apps", title: "Canvas app", x: col[0], y: row[0] },
    { id: "data", kind: "Dataverse", title: "Ledger rows", x: col[1], y: row[0] },
    { id: "flow", kind: "Power Automate", title: "Flows", x: col[2], y: row[0] },
    { id: "file", kind: "File", title: "Excel and CSV", x: col[1], y: row[1] },
    { id: "payroll", kind: "Payroll", title: "Payroll system", x: col[2], y: row[1] },
  ],
  edges: [
    { id: "app-data", source: "app", target: "data" },
    { id: "data-flow", source: "data", target: "flow" },
    {
      id: "flow-file",
      source: "flow",
      target: "file",
      sourceHandle: "bottom",
      targetHandle: "top",
    },
    { id: "file-payroll", source: "file", target: "payroll" },
  ],
};

const imageSize = { width: 1200, height: 750 };

export const projects: Project[] = [
  {
    slug: "booking-app",
    title: "Studio event booking",
    summary:
      "A Japanese studio's training calendar, rebuilt from WordPress onto Azure Static Web Apps.",
    problem:
      "Bookings lived in WordPress: an Astra child theme, a custom booking plugin, and a separate week calendar for each store. Changing a rule meant editing PHP.",
    built:
      "A React and TypeScript app with an Azure Functions API and Cosmos DB. Each store keeps the original Japanese page and its own calendar. Admins manage stores, events, and bookings. A booking day runs from 13:00 to 03:00, and overlapping sessions are rejected.",
    result:
      "The new site is in production. The WordPress theme stayed the specification: one template, three stores, the same week view.",
    tags: ["React", "TypeScript", "Azure Static Web Apps", "WordPress"],
    liveUrl: "https://yellow-sea-0fe6ef000.3.azurestaticapps.net/",
    image: {
      src: "/projects/booking.jpg",
      alt: "Homepage of Shiraishi Room, the public studio booking site.",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "retail-data",
    title: "Retail data platform",
    summary: "A web app and scheduled jobs that keep multi-store retail masters in one place.",
    problem:
      "Product, category, and staff masters were exported by hand, so the warehouse and the store tools drifted apart.",
    built:
      "A Node.js web app and API, plus scheduled jobs that pull POS masters into cloud storage. Store logs and reporting read from that same flow.",
    result: "The jobs can be rerun. The product stays on the client's network.",
    tags: ["Node.js", "ETL", "Azure", "Docker"],
    confidential: true,
    flow: retailFlow,
    image: {
      src: "/projects/warehouse.svg",
      alt: "Flow from POS masters through Data Factory and Blob storage into a Node.js API, PostgreSQL, and the store web app.",
      ...imageSize,
    },
  },
  {
    slug: "staff-assistant",
    title: "In-store AI assistant",
    summary: "A desktop assistant for store staff to look up customers and keep notes.",
    problem:
      "Notes and customer history sat in separate systems, so a conversation on the shop floor had no memory the next day.",
    built:
      "An Electron app with a React interface, a FastAPI service, and PostgreSQL. Chat, speech-to-text, and staff memory go through Azure OpenAI. The data stays with the client.",
    result: "Built for the shop floor. There is no public demo.",
    tags: ["React", "FastAPI", "PostgreSQL", "Azure OpenAI"],
    confidential: true,
    flow: assistantFlow,
    image: {
      src: "/projects/ecommerce.svg",
      alt: "Flow from an Electron app through FastAPI to PostgreSQL and Azure OpenAI.",
      ...imageSize,
    },
  },
  {
    slug: "workplace-plugins",
    title: "Plugins for monday and Atlassian",
    summary: "Custom apps inside monday boards and Jira or Confluence workflows.",
    problem:
      "Teams kept leaving monday boards and Jira to finish steps those tools did not support.",
    built:
      "Custom apps on monday boards and Jira or Confluence, built for the way each team already works.",
    result: "The apps stay inside the client's workspace.",
    tags: ["monday apps", "Atlassian", "React"],
    confidential: true,
    flow: pluginsFlow,
    image: {
      src: "/projects/plugins.svg",
      alt: "Flow from a monday board and from Jira or Confluence through a custom React app, then back as updates.",
      ...imageSize,
    },
  },
  {
    slug: "payroll-export",
    title: "Japanese staff savings and payroll export",
    summary: "A Power Apps ledger for staff savings plans, with Excel and CSV files for payroll.",
    problem:
      "Savings, housing, and pension-style plans were easy to overwrite, so a report could disagree with the file payroll received.",
    built:
      "A Dataverse model, a canvas app, and Power Automate flows. Each change is a new row. Reports follow the client's original query order, then write Excel and CSV for payroll.",
    result: "Handed over as a managed solution. There is no public demo.",
    tags: ["Power Apps", "Power Automate", "Dataverse"],
    confidential: true,
    flow: payrollFlow,
    image: {
      src: "/projects/pension.svg",
      alt: "Flow from a Power Apps canvas through Dataverse and Power Automate to Excel, CSV, and payroll.",
      ...imageSize,
    },
  },
];
