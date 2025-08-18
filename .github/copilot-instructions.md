# Copilot Instructions for zensalamero.github.io

## Project Overview

This is a Vue 3 + TypeScript personal website using **Vite SSG** (Static Site Generation) for automatic GitHub Pages deployment to `zense.dev`. The project combines Vite SSG with Nuxt UI components and uses a feature-based architecture with clear separation between app-level concerns and shared utilities.

## Key Architecture Patterns

### SSG + Component Library Hybrid

- Uses `vite-ssg` for static generation with Vue Router
- **Nuxt UI integration**: `@nuxt/ui` components available (e.g., `<UApp>` wrapper in App.vue)
- **TSParticles integration**: Client-side particle effects via `@tsparticles/vue3` and `@tsparticles/slim`
- Entry point: `src/app/entry-client.ts` with conditional client-side registration for TSParticles

### Directory Structure & Aliases

```
src/
├── app/           # Application layer (routing, entries)
├── components/    # Reusable UI components
├── views/         # Page-level components
├── shared/        # Cross-cutting concerns
│   ├── constants/ # Navigation items, routes
│   ├── interfaces/# TypeScript interfaces
│   ├── styles/    # SCSS modules
│   └── utils/     # Shared utilities
└── assets/        # Static assets
```

**Import aliases** (defined in `vite.config.ts` and `tsconfig.json`):

- `@/` → `src/` | `@app/` → `src/app/` | `@shared/` → `src/shared/`
- `@components/` → `src/components/` | `@views/` → `src/views/`

### Styling Strategy

- **Tailwind CSS 4.x** via PostCSS + Nuxt UI design tokens
- **SCSS modules**: Components reference `@shared/styles/*.scss` or `.css`
- **Scoped styles**: Vue SFC styles scoped by default
- **Utility-first**: Tailwind classes like `min-h-screen`, `absolute inset-0 -z-10`

## Development Workflows

### Build & Deploy Commands

```bash
pnpm start          # Dev server (changed from vite-ssg dev to vite)
pnpm build          # Static site generation
pnpm deploy         # Build + deploy to GitHub Pages via gh-pages
```

### Key Dependencies

- **vite-ssg**: Static site generation framework
- **@nuxt/ui**: Component library with design system
- **@tsparticles/vue3 + @tsparticles/slim**: Interactive particle backgrounds
- **@vueuse/head**: Dynamic meta tag management
- **pinia**: State management (available but not heavily used yet)

## Project-Specific Conventions

### Client-Side Library Registration

TSParticles registered conditionally in `entry-client.ts`:

```typescript
if (isClient) {
  const { default: Particles } = await import('@tsparticles/vue3')
  const { loadSlim } = await import('@tsparticles/slim')
  app.use(Particles, { init: async (engine) => await loadSlim(engine) })
}
```

### Navigation Constants Pattern

Navigation defined in `src/shared/constants/navigation.ts`:

```typescript
export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
] as const
```

Interface in `src/shared/interfaces/NavigationItem.ts` for type safety.

### Component Organization

- **Landing page**: `TheLanding.vue` with particle background + personal branding
- **Nuxt UI wrappers**: Components wrapped in `<UApp>` for design system
- **Style externalization**: Components use `style src="@shared/styles/ComponentName.scss"`

### Route Meta Configuration

Routes in `src/app/router/index.ts` must include meta fields for SEO:

```typescript
{
  path: '/about',
  component: () => import('@views/AboutView.vue'),
  meta: { title: 'About | Site Name', description: 'Page description' }
}
```

## Critical Files for AI Understanding

- `src/app/entry-client.ts`: SSG app + conditional client-side library setup
- `src/app/App.vue`: Main layout with Nuxt UI wrapper + landing component
- `src/components/TheLanding.vue`: Hero section with TSParticles background
- `src/shared/constants/navigation.ts`: Centralized navigation definition
- `package.json`: Shows hybrid Vite + Nuxt UI dependency strategy

## Common Tasks

- **Add particle effect**: Use `<Particles>` component with options object (see TheLanding.vue)
- **Add navigation item**: Update `NAVIGATION_ITEMS` in `src/shared/constants/navigation.ts`
- **Add Nuxt UI component**: Import from `@nuxt/ui` (UApp, UButton, UCard, etc.)
- **Create new page**: Add to `src/views/`, route in `src/app/router/index.ts` with meta
- **Style component**: Create SCSS in `src/shared/styles/` and reference via `style src`

## Response Instructions

- Keeps answers concise and fast!
- Keep summaries fast and to the point. Just 1-2 sentences summary.
