import { NavigationItem } from '../interfaces/NavigationItem'

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    name: 'home.ts',
    path: '/',
  },
  {
    name: 'about.ts',
    path: '/about',
  },
  {
    name: 'projects.ts',
    path: '/projects',
  },
  {
    name: 'experience.ts',
    path: '/experience',
  },
  {
    name: 'tech.ts',
    path: '/tech',
  },
] as const

// Export individual routes for convenience if needed elsewhere
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  EXPERIENCE: '/experience',
  TECH: '/tech',
} as const satisfies Record<string, string>
