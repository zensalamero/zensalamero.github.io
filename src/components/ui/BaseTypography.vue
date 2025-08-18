<!-- src/components/base/BaseTypography.vue -->
<script setup lang="ts">
import { computed } from 'vue'

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
type Weight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
type Variant = 'shout' | 'display' | 'title' | 'subtitle' | 'body' | 'caption'
type Tone = 'default' | 'muted' | 'danger' | 'success' | 'warning'
type Font = 'sans' | 'mono'

const props = withDefaults(
  defineProps<{
    as?: As
    variant?: Variant
    weight?: Weight
    tone?: Tone
    font?: Font
    class?: string
  }>(),
  {
    as: 'p',
    variant: 'body',
    weight: 'normal',
    tone: 'default',
    font: 'sans',
  },
)

const tag = computed(() => props.as)

const variantClass = computed(
  () =>
    ({
      shout: 'text-[10rem] sm:text-6xl font-bold leading-none',
      display: 'text-4xl sm:text-5xl md:text-6xl font-bold leading-tight',
      title: 'text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug',
      subtitle: 'text-xl sm:text-2xl font-medium leading-snug',
      body: 'text-base leading-relaxed',
      caption: 'text-sm leading-snug',
    })[props.variant],
)

const weightClass = computed(
  () =>
    ({
      light: 'font-[200]',
      normal: 'font-[400]',
      medium: 'font-[500]',
      semibold: 'font-[700]',
      bold: 'font-[800]',
    })[props.weight],
)

const fontClass = computed(() => (props.font === 'mono' ? 'font-mono' : 'font-sans'))

const toneClass = computed(() => {
  switch (props.tone) {
    case 'muted':
      return 'opacity-70'
    case 'danger':
      return 'text-red-600'
    case 'success':
      return 'text-green-600'
    case 'warning':
      return 'text-amber-600'
    default:
      return 'dark:text-foreground text-background'
  }
})
</script>

<template>
  <component
    :is="tag"
    :class="['typography', variantClass, weightClass, fontClass, toneClass, props.class]"
  >
    <slot />
  </component>
</template>
