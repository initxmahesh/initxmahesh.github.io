export interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

interface RawProject {
  id: string;
  name: string;
  description: string;
  tools: string;
  website: string;
  github?: string;
}

const rawProjects: RawProject[] = [
  {
    id: "0",
    name: "Hamro Calendar",
    description:
      "Hamro Calendar, a modern calendar and event planning platform that enables seamless event management, country-aware public holiday context, and AI-generated weekly insights to improve personal and team productivity.",
    tools:
      "React, Tailwind CSS, Calendarific API, Google Gemini (@google/genai), localStorage, Figma",
    website: "https://github.com/initxmahesh",
    github: "https://github.com/TEJ-Fellowship/pbl/tree/main/PBL1/Eventia-Project/eventia",
  },
  {
    id: "1",
    name: "RealEstate",
    description:
      "A modern platform connecting buyers, renters, and agents to discover and manage properties with ease.",
    tools: "MongoDB, Express, React, Node.js, Tailwind CSS, Leaflet, JWT, Cloudinary",
    website: "https://github.com/initxmahesh",
    github: "https://github.com/TEJ-Fellowship/pbl/tree/main/PBL2/RealEstateListingnFinder",
  },
  {
    id: "2",
    name: "Career Mapper",
    description:
      "Built Lakshya, a modern career planning platform that helps learners map interests, track measurable goals, and receive AI-powered course and skill recommendations for structured growth.",
    tools:
      "React.js, Tailwind CSS, Google Gemini API, Material UI (MUI)",
    website: "https://github.com/initxmahesh",
    github: "https://github.com/TEJ-Fellowship/pbl/tree/main/PBL3/Lakshya",
  },
];

const splitTools = (tools: string): string[] =>
  tools
    .split(",")
    .map((tool) => tool.trim().replace(/\.$/, ""))
    .filter(Boolean);

export const projects: Project[] = [...rawProjects]
  .sort((a, b) => Number.parseInt(b.id, 10) - Number.parseInt(a.id, 10))
  .map(({ tools, website, ...rest }) => ({
    name: rest.name,
    description: rest.description,
    tech: splitTools(tools),
    github: rest.github,
    demo: website,
  }));
