import { ref, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

const apply = (t: Theme) => {
  if (typeof document === 'undefined') return

  const html = document.documentElement
  const final =
    t === 'system'
      ? window.matchMedia?.('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : t
  html.dataset.theme = final
  html.className = html.className.replace(/\b(light|dark)\b/g, '').trim() + ` ${final}`
}

const theme = ref<Theme>('system')

export const useTheme = () => {
  const setTheme = (t: Theme) => {
    theme.value = t
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', t)
      apply(t)
    }
  }

  const initTheme = () => {
    if (typeof window === 'undefined') return

    const saved = (localStorage.getItem('theme') as Theme) || 'system'
    theme.value = saved
    apply(saved)

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', () => {
        if (theme.value === 'system') {
          apply('system')
        }
      })
    }
  }

  // Initialize theme on mount
  onMounted(() => {
    initTheme()
  })

  return { theme, setTheme, initTheme }
}
