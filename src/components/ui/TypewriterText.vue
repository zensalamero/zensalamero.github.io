<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    words: string[]
    typingSpeed?: number // ms per char
    deletingSpeed?: number // ms per char
    pauseTime?: number // ms when a word completes
    loop?: boolean
    startDelay?: number
  }>(),
  {
    typingSpeed: 70,
    deletingSpeed: 40,
    pauseTime: 900,
    loop: true,
    startDelay: 0,
  },
)

const text = ref('')
const index = ref(0)
const deleting = ref(false)
let timer: number | undefined

const tick = () => {
  const full = props.words[index.value] ?? ''
  if (!deleting.value) {
    text.value = full.slice(0, text.value.length + 1)
    if (text.value === full) {
      timer = window.setTimeout(() => {
        deleting.value = true
        tick()
      }, props.pauseTime)
      return
    }
    timer = window.setTimeout(tick, props.typingSpeed)
  } else {
    text.value = full.slice(0, text.value.length - 1)
    if (text.value === '') {
      deleting.value = false
      index.value = (index.value + 1) % props.words.length
      if (!props.loop && index.value === 0) return
      timer = window.setTimeout(tick, props.typingSpeed)
      return
    }
    timer = window.setTimeout(tick, props.deletingSpeed)
  }
}

onMounted(() => {
  timer = window.setTimeout(tick, props.startDelay)
})
onBeforeUnmount(() => {
  if (timer) window.clearTimeout(timer)
})
</script>

<template>
  <span class="inline-flex items-center">
    <span class="whitespace-pre">{{ text }}</span>
    <span class="ml-1 h-[1em] w-px bg-current caret-blink" />
  </span>
</template>

<style scoped>
@keyframes caret {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}
.caret-blink {
  animation: caret 1s step-end infinite;
}
</style>
