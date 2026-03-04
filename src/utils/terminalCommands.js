export const terminalCommands = {
  whoami: {
    output: `anish@portfolio:~$ whoami
Anish Rej - Creative Web Developer
Location: India
Passion: Building beautiful, performant web experiences
Status: Open to opportunities`,
  },

  skills: {
    output: `anish@portfolio:~$ skills
Frontend:
  • React (95%)      • Next.js (92%)     • TypeScript (90%)
  • Tailwind CSS (94%)  • Three.js       • Framer Motion

Backend:
  • Node.js (88%)    • PostgreSQL (85%) • Python (83%)
  • GraphQL (82%)    • MongoDB          • Redis

DevOps & Tools:
  • Docker (85%)     • AWS (80%)        • Git (92%)
  • Linux (87%)      • CI/CD            • Figma`,
  },

  projects: {
    output: `anish@portfolio:~$ projects
1. CloudSync Dashboard     - Real-time Analytics Platform
2. NexCart                 - E-Commerce Platform
3. DevFlow                 - Developer Collaboration Tool
4. PixelForge              - Creative Design Suite
5. VoiceAI Studio          - AI Voice Application

Type: projects --detail [number]`,
  },

  contact: {
    output: `anish@portfolio:~$ contact
Email: anish@example.com
GitHub: github.com/AngonXD
LinkedIn: linkedin.com/in/anish-rej-22188b348
Instagram: instagram.com/anish.rej
Website: anishrej.in

Let's connect! Feel free to reach out.`,
  },

  help: {
    output: `anish@portfolio:~$ help
Available commands:
  whoami     - Display profile information
  skills     - Show technical skills
  projects   - List all projects
  contact    - Display contact information
  help       - Show this help message
  clear      - Clear the terminal

Type 'command' and press Enter to execute.`,
  },

  clear: {
    output: '',
    isClear: true,
  },
}

export const executeCommand = (command) => {
  const trimmedCommand = command.trim().toLowerCase()
  return terminalCommands[trimmedCommand] || { output: `anish@portfolio:~$ ${command}\nCommand not found. Type 'help' for available commands.` }
}
