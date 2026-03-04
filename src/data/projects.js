export const projects = [
  {
    id: 1,
    title: "CloudSync Dashboard",
    subtitle: "Real-time Analytics Platform",
    description: "A comprehensive analytics dashboard with real-time data streaming, interactive charts, and team collaboration features. Built for enterprise clients to monitor KPIs, track user engagement, and generate automated reports.",
    tech: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js", "PostgreSQL"],
    role: "Full-Stack Developer",
    year: "2025",
    color: "#00f0ff",
    link: "#",
    github: "#",
    features: [
      "Real-time data streaming via WebSockets",
      "Interactive D3.js visualizations",
      "Role-based access control",
      "Automated PDF report generation"
    ],
    problem: "Enterprise clients lacked a unified way to monitor key performance metrics in real-time. Existing solutions were siloed, slow, and difficult to integrate with their tech stacks.",
    whyBuilt: "I wanted to create a dashboard that would bring together multiple data sources into a cohesive, real-time visualization system while maintaining enterprise-grade security and performance.",
    architecture: "Built with React on the frontend and Node.js on the backend, using WebSockets for real-time data streaming. D3.js handles complex visualizations while PostgreSQL stores historical data. Redis caches frequently accessed metrics.",
    challenges: [
      "Handling millions of data points without performance degradation",
      "Ensuring real-time synchronization across multiple clients",
      "Implementing complex role-based access control",
      "Optimizing D3.js visualizations for large datasets"
    ],
    learnings: [
      "Real-time systems require careful consideration of network bandwidth and client-side rendering",
      "Caching strategies are crucial for performance at scale",
      "User feedback iteration is essential for dashboard UX"
    ],
    liveLink: "#"
  },
  {
    id: 2,
    title: "NexCart",
    subtitle: "E-Commerce Platform",
    description: "A modern headless e-commerce platform with blazing fast performance, AI-powered product recommendations, and seamless checkout flow. Supports multi-vendor marketplace with real-time inventory management.",
    tech: ["Next.js", "Tailwind CSS", "Stripe", "Prisma", "Redis", "AWS"],
    role: "Frontend Lead",
    year: "2025",
    color: "#ff3e9a",
    link: "#",
    github: "#",
    features: [
      "Headless CMS integration",
      "AI product recommendations",
      "Stripe payment processing",
      "Multi-vendor marketplace"
    ],
    problem: "E-commerce platforms were either bloated and slow or lacked customization. Merchants needed a flexible, fast platform that could scale with their business.",
    whyBuilt: "To prove that modern e-commerce could be both performant and flexible. I built NexCart as a headless solution that prioritizes speed and merchant control.",
    architecture: "Next.js with App Router for server-side rendering and static generation. Prisma ORM abstracts the database layer, while Redis caches product data and recommendations. Stripe handles payments, and AWS S3 stores product images.",
    challenges: [
      "Optimizing product recommendation algorithm for real-time personalization",
      "Managing inventory synchronization across multiple vendors",
      "Handling payment processing securely while maintaining UX",
      "Building a performant search system for millions of products"
    ],
    learnings: [
      "Headless CMS architecture provides flexibility but requires careful planning",
      "AI-driven recommendations need continuous training and feedback loops",
      "E-commerce UX decisions have measurable impact on conversion rates"
    ],
    liveLink: "#"
  },
  {
    id: 3,
    title: "DevFlow",
    subtitle: "Developer Collaboration Tool",
    description: "A GitHub-integrated project management tool designed for developer teams. Features real-time code review workflows, automated CI/CD pipeline visualization, and sprint planning with AI-assisted story point estimation.",
    tech: ["React", "GraphQL", "Docker", "MongoDB", "GitHub API", "Socket.io"],
    role: "Full-Stack Developer",
    year: "2024",
    color: "#a855f7",
    link: "#",
    github: "#",
    features: [
      "GitHub & GitLab integration",
      "Real-time code review system",
      "CI/CD pipeline visualization",
      "AI sprint estimation"
    ],
    problem: "Development teams were context-switching between GitHub, project management tools, and CI/CD dashboards. They needed a unified view of their development workflow.",
    whyBuilt: "To eliminate the pain of tool fragmentation and create a single source of truth for development teams. I wanted to showcase how GraphQL could efficiently pull data from multiple sources.",
    architecture: "React frontend with GraphQL server abstracting GitHub API, MongoDB for custom data storage, and Socket.io for real-time updates. Docker containerization enables easy deployment and scaling.",
    challenges: [
      "Real-time synchronization between GitHub and local state",
      "Handling OAuth and secure API token management",
      "Visualizing complex CI/CD pipelines in an intuitive way",
      "Predicting story points accurately with limited training data"
    ],
    learnings: [
      "GraphQL's flexibility comes at the cost of query complexity management",
      "Developer UX is critical - tools must integrate seamlessly with existing workflows",
      "Real-time collaboration features reveal interesting edge cases"
    ],
    liveLink: "#"
  },
  {
    id: 4,
    title: "PixelForge",
    subtitle: "Creative Design Suite",
    description: "A browser-based design tool that combines vector editing, prototyping, and asset management in one platform. Features real-time multiplayer collaboration and an extensive plugin ecosystem.",
    tech: ["Canvas API", "WebGL", "React", "WASM", "Firebase", "Figma API"],
    role: "Frontend Developer",
    year: "2024",
    color: "#f59e0b",
    link: "#",
    github: "#",
    features: [
      "Real-time multiplayer canvas",
      "Vector & raster editing",
      "Plugin marketplace",
      "Design token system"
    ],
    problem: "Designers were locked into expensive desktop applications or limited web tools. They needed a powerful, collaborative, browser-based design platform.",
    whyBuilt: "To demonstrate that browser technology had matured enough to handle professional-grade design work. I was fascinated by the challenge of implementing collaborative canvas editing.",
    architecture: "React for UI with Canvas API and WebGL for rendering. WASM modules handle heavy vector calculations. Firebase manages real-time collaboration state. The plugin system uses Web Workers for sandboxing.",
    challenges: [
      "Implementing efficient collaborative canvas editing with Operational Transformation",
      "Managing memory efficiently with large design files",
      "Cross-browser compatibility for WebGL features",
      "Building a secure plugin system without compromising performance"
    ],
    learnings: [
      "Collaborative editing requires careful architectural planning from the start",
      "Performance is crucial for creative tools - users notice every frame",
      "Building an ecosystem (plugins) is harder than building the core product"
    ],
    liveLink: "#"
  },
  {
    id: 5,
    title: "VoiceAI Studio",
    subtitle: "AI Voice Application",
    description: "An AI-powered voice synthesis and cloning platform that enables content creators to generate natural-sounding voiceovers in 20+ languages. Features emotion control, background music mixing, and batch processing.",
    tech: ["Python", "FastAPI", "React", "TensorFlow", "FFmpeg", "GCP"],
    role: "Full-Stack Developer",
    year: "2024",
    color: "#10b981",
    link: "#",
    github: "#",
    features: [
      "20+ language support",
      "Emotion-controlled synthesis",
      "Background audio mixing",
      "Batch processing pipeline"
    ],
    problem: "Content creators spent hours recording and editing voiceovers. Professional voice talent was expensive, and existing TTS solutions lacked naturalness and emotion.",
    whyBuilt: "To democratize voiceover production and enable creators to focus on content rather than audio production. The challenge of making AI voices sound natural fascinated me.",
    architecture: "FastAPI backend orchestrates TensorFlow models for voice synthesis. React frontend provides intuitive controls. FFmpeg handles audio mixing and processing. GCP handles model serving and scalability.",
    challenges: [
      "Training models to produce natural-sounding emotions without sounding robotic",
      "Supporting multiple languages while maintaining quality",
      "Handling real-time audio processing and mixing",
      "Scaling inference for batch processing without excessive costs"
    ],
    learnings: [
      "AI/ML products require extensive quality testing and human feedback loops",
      "Audio processing has many pitfalls - latency and quality are interconnected",
      "Cost optimization is crucial for ML inference at scale"
    ],
    liveLink: "#"
  }
]

export const aboutData = {
  name: "Anish Rej",
  role: "Creative Web Developer",
  tagline: "I build things for the web that don't just work -- they feel alive.",
  bio: "I'm a developer who lives at the intersection of code and creativity. I don't just ship features -- I craft experiences. From pixel-perfect interfaces to complex backend architectures, I bring ideas to life with clean code and bold design. Currently obsessed with 3D web experiences, design systems, and making the internet a little more interesting.",
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL", "Redis"],
    tools: ["Git", "Docker", "AWS", "Figma", "Linux", "CI/CD"]
  },
  stats: [
    { label: "Projects Shipped", value: "20+" },
    { label: "Years Coding", value: "3+" },
    { label: "Cups of Coffee", value: "2000+" },
    { label: "GitHub Commits", value: "1500+" }
  ],
  socials: {
    github: "https://github.com/AngonXD",
    linkedin: "https://www.linkedin.com/in/anish-rej-22188b348",
    instagram: "https://instagram.com/anish.rej",
    website: "https://anishrej.in"
  }
}
