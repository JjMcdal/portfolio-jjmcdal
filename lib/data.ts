export const EMAIL = "jjmcdalnabong2001@gmail.com";
export const GITHUB = "https://github.com/JjMcdal";

export const BUILT_FOR = [
  "Bureau of Animal Industry",
  "Schools Division Office of Caloocan City",
  "University of Caloocan City",
];

export const CERTS = [
  "ISTQB Foundation Level",
  "Certified ScrumMaster (CSM)",
  "Postman API Fundamentals",
  "Simplilearn: Generative AI",
  "Simplilearn: Cybersecurity",
  "Simplilearn: SQL",
  "Sololearn: HTML, CSS, JavaScript",
];

export type StackItem = { name: string; slug: string; cat: string; color: string };

// color = brand color ng icon. "var(--text)" = sumusunod sa theme (itim sa light, puti sa dark)
export const STACK: StackItem[] = [
  { name: "Bash", slug: "gnubash", cat: "Tools", color: "#4EAA25" },
  { name: "Dart", slug: "dart", cat: "Mobile", color: "#0175C2" },
  { name: "Docker", slug: "docker", cat: "Tools", color: "#2496ED" },
  { name: "Ethereum", slug: "ethereum", cat: "Web3", color: "var(--text)" },
  { name: "Firebase", slug: "firebase", cat: "Database & Cloud", color: "#DD2C00" },
  { name: "Flutter", slug: "flutter", cat: "Mobile", color: "#02569B" },
  { name: "Git", slug: "git", cat: "Tools", color: "#F05032" },
  { name: "GitHub", slug: "github", cat: "Tools", color: "var(--text)" },
  { name: "GitHub Actions", slug: "githubactions", cat: "Tools", color: "#2088FF" },
  { name: "GraphQL", slug: "graphql", cat: "Backend", color: "#E10098" },
  { name: "Java", slug: "openjdk", cat: "Backend", color: "#ED8B00" },
  { name: "JavaScript", slug: "javascript", cat: "Frontend", color: "#F7DF1E" },
  { name: "Jira", slug: "jira", cat: "Tools", color: "#0052CC" },
  { name: "MySQL", slug: "mysql", cat: "Database & Cloud", color: "#4479A1" },
  { name: "Next.js", slug: "nextdotjs", cat: "Frontend", color: "var(--text)" },
  { name: "Node.js", slug: "nodedotjs", cat: "Backend", color: "#5FA04E" },
  { name: "n8n", slug: "n8n", cat: "Tools", color: "#EA4B71" },
  { name: "PostgreSQL", slug: "postgresql", cat: "Database & Cloud", color: "#4169E1" },
  { name: "Postman", slug: "postman", cat: "Tools", color: "#FF6C37" },
  { name: "React", slug: "react", cat: "Frontend", color: "#61DAFB" },
  { name: "Redis", slug: "redis", cat: "Database & Cloud", color: "#FF4438" },
  { name: "Supabase", slug: "supabase", cat: "Database & Cloud", color: "#3FCF8E" },
  { name: "Tailwind CSS", slug: "tailwindcss", cat: "Frontend", color: "#06B6D4" },
  { name: "TypeScript", slug: "typescript", cat: "Frontend", color: "#3178C6" },
  { name: "Vercel", slug: "vercel", cat: "Database & Cloud", color: "var(--text)" },
];

export const STACK_CATS = ["All", "Frontend", "Backend", "Mobile", "Database & Cloud", "Web3", "Tools"];

export type Project = {
  id: string; title: string; subtitle: string; short: string; period: string;
  role: string; tech: string[]; highlights: string[];
  links: { label: string; href: string }[]; note?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "rcv", title: "RCV System", subtitle: "Regulatory Compliance Verification",
    short: "Web3-enabled compliance platform for the Bureau of Animal Industry, with Ethereum blockchain integration and PostgreSQL.",
    period: "Aug 2025 – Mar 2026", role: "Research Developer (thesis)",
    tech: ["React", "Vite", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "ethers.js", "Firebase Auth"],
    highlights: [
      "Verifies regulatory compliance records and anchors them on the Ethereum Sepolia testnet.",
      "Handed over to the Bureau of Animal Industry at the end of the thesis.",
      "Reported a 70% improvement in processing efficiency.",
      "CI/CD through GitHub Actions to Vercel, Railway, Heroku, and Firebase.",
      "Won Thesis of the Year, Best Technical Documentation, and Best Research Developer.",
    ],
    links: [{ label: "Live frontend", href: "https://rcv-steel.vercel.app" }],
    note: "The deployed site is a frontend demo. The backend is currently offline, so login will not work.",
  },
  {
    id: "sdo-inventory", title: "SDO Caloocan Inventory System", subtitle: "OJT project, Schools Division Office",
    short: "Inventory management for 1,000+ digital assets across 80+ public schools, with automated reports and audit logs.",
    period: "May – Jul 2025", role: "OJT Developer", tech: ["React", "Node.js", "PostgreSQL"],
    highlights: [
      "Tracks 1,000+ digital assets across 80+ public schools.",
      "PostgreSQL optimization made data retrieval 40% faster.",
      "Automated reporting and audit logs for accountability.",
    ],
    links: [], note: "Internal government system, so there is no public demo.",
  },
  {
    id: "circuit-cube", title: "Circuit Cube", subtitle: "3D breadboarding learning platform",
    short: "A learning management system for logic circuits, with a 3D breadboard and logic gate simulation.",
    period: "Jul 2024 – Apr 2025", role: "Developer", tech: ["React", "Vite", "JavaScript"],
    highlights: [
      "Students build and test logic circuits on a 3D breadboard in the browser.",
      "Simulates logic gate behavior in real time.",
    ],
    links: [{ label: "Live site", href: "https://circuitcube.netlify.app" }],
  },
  {
    id: "pandayo-coffee", title: "Pandayo Coffee", subtitle: "POS and inventory system",
    short: "Point-of-sale and inventory system for a coffee shop, with role-based access for owner, cashier, and staff.",
    period: "In progress", role: "Solo developer", tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    highlights: [
      "Role-based access control for owner, cashier, and staff.",
      "Flow: login, point of sale, inventory, admin dashboard.",
      "Supabase handles authentication and the Postgres database.",
    ],
    links: [{ label: "GitHub repo", href: "https://github.com/JjMcdal/pandayo-coffee" }],
    note: "Still being built. Progress is pushed to GitHub regularly.",
  },
];