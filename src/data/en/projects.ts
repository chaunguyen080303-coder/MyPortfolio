import type { Project } from "@/data/types";

const imageSize = { width: 1200, height: 750 };

export const projects: Project[] = [
  {
    slug: "booking-app",
    title: "Booking and scheduling app",
    summary:
      "Online appointment booking with calendar availability, reminders, and an admin dashboard.",
    problem:
      "Appointments were booked over chat and email, so double bookings and missed reminders were easy to miss.",
    built:
      "An appointment app with calendar availability, reminders, and an admin dashboard for the schedule.",
    result:
      "[[TODO: metric]] Add a real outcome here. The client name stays private.",
    tags: ["React", "Node.js", "SQL"],
    image: {
      src: "/projects/booking.svg",
      alt: "Placeholder wireframe for the booking and scheduling app. Replace with a real screenshot.",
      ...imageSize,
    },
  },
  {
    slug: "ecommerce-app",
    title: "E-commerce app",
    summary:
      "Product catalog, cart, checkout, and an order management back office.",
    problem:
      "The catalog, cart, and order desk lived in separate tools, so staff retyped orders by hand.",
    built:
      "A storefront with a product catalog, cart, and checkout, plus a back office for managing orders.",
    result:
      "[[TODO: metric]] Add a real outcome here. The client name stays private.",
    tags: ["Next.js", "TypeScript", "payment integration"],
    image: {
      src: "/projects/ecommerce.svg",
      alt: "Placeholder wireframe for the e-commerce app. Replace with a real screenshot.",
      ...imageSize,
    },
  },
  {
    slug: "workplace-plugins",
    title: "Plugins for monday and Atlassian",
    summary:
      "Custom apps that extend monday boards and Jira or Confluence workflows for business teams.",
    problem:
      "Teams kept leaving monday boards and Jira to finish steps those tools did not support.",
    built:
      "Custom apps on monday boards and Jira or Confluence workflows, built for the way each team already works.",
    result:
      "[[TODO: metric]] Add a real outcome here. The client name stays private.",
    tags: ["monday apps", "Atlassian Forge/Connect", "React"],
    image: {
      src: "/projects/plugins.svg",
      alt: "Placeholder wireframe for the monday and Atlassian plugins. Replace with a real screenshot.",
      ...imageSize,
    },
  },
  {
    slug: "data-warehouse",
    title: "Data warehouse project",
    summary:
      "Pipelines that collect, clean, and version data from multiple sources for reporting.",
    problem:
      "Reports were assembled from one-off exports that nobody could reproduce a month later.",
    built:
      "Pipelines that collect, clean, and version data from several sources, then feed reporting.",
    result:
      "[[TODO: metric]] Add a real outcome here. The client name stays private.",
    tags: ["SQL", "ETL", "Docker"],
    image: {
      src: "/projects/warehouse.svg",
      alt: "Placeholder wireframe for the data warehouse project. Replace with a real screenshot.",
      ...imageSize,
    },
  },
  {
    slug: "pension-calculator",
    title: "Japanese public pension calculator",
    summary:
      "An app that turns Japan's public pension rules into accurate, testable calculations.",
    problem:
      "Japan's public pension rules are precise, and a small misreading changes the figure people rely on.",
    built:
      "An app that turns those rules into calculations you can read, trace, and test.",
    result:
      "[[TODO: metric]] Add a real outcome here, such as cases covered by the test suite.",
    tags: ["TypeScript", "business-rule modelling", "testing"],
    image: {
      src: "/projects/pension.svg",
      alt: "Placeholder wireframe for the Japanese public pension calculator. Replace with a real screenshot.",
      ...imageSize,
    },
  },
];
