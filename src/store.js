import { create } from 'zustand'

export const useStore = create((set) => ({
  // Theme
  isDark: true,
  toggleTheme: () => set((state) => {
    const next = !state.isDark
    if (next) {
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
    }
    return { isDark: next }
  }),

  // Scroll progress (0 to 1)
  scrollProgress: 0,
  setScrollProgress: (val) => set({ scrollProgress: val }),

  // Active project index
  activeProject: -1,
  setActiveProject: (idx) => set({ activeProject: idx }),

  // Project detail modal
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),

  // Show/hide project modal
  showProjectModal: false,
  setShowProjectModal: (show) => set({ showProjectModal: show }),

  // Current section (hero, about, projects, contact)
  currentSection: 'hero',
  setCurrentSection: (section) => set({ currentSection: section }),
}))
