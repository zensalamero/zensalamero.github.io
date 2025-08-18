<script setup lang="ts">
import { Theme, useTheme } from '@/shared/utils/useTheme'
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/vue/16/solid'

const { theme, setTheme } = useTheme()

const themeOptions = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: ComputerDesktopIcon },
] as const
</script>

<template>
  <div
    class="inline-flex mt-2 items-center gap-1 p-1 bg-background/50 border-background backdrop-blur-sm border border-background rounded-xl shadow-sm"
  >
    <div class="relative inline-flex gap-1">
      <!-- Theme buttons -->
      <button
        v-for="option in themeOptions"
        :key="option.value"
        :class="[
          'relative z-10 flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 ease-out text-sm font-medium text-language',
          'border border-transparent backdrop-blur-sm',
          'hover:bg-brand/25 hover:border-brand/20 hover:text-brand hover:shadow-md ',
          'active:bg-accent/20',
          theme === option.value
            ? 'text-language bg-brand border-brand/30 shadow-lg shadow-brand/20 hover:text-language'
            : 'text-language/70 hover:text-language',
        ]"
        @click="setTheme(option.value as Theme)"
        :aria-pressed="theme === option.value"
        :aria-label="`Switch to ${option.label} theme`"
        type="button"
      >
        <component
          :is="option.icon"
          :class="['w-4 h-4 transition-all duration-300 text-language']"
        />
        <span class="hidden sm:inline transition-all duration-300 text-language">{{
          option.label
        }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Enhanced button styles */
button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

button:hover::before {
  transform: translateX(100%);
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .relative.inline-flex {
    gap: 0.25rem;
  }

  button {
    padding: 0.5rem;
    min-width: 2.5rem;
  }

  button .w-4 {
    width: 1rem;
    height: 1rem;
  }
}

/* Focus visible for accessibility */
@supports selector(:focus-visible) {
  button:focus {
    outline: none;
  }

  button:focus-visible {
    outline-offset: 2px;
  }
}
</style>
