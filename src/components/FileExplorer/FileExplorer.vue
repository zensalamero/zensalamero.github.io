<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from '../ThemeToggle.vue'
import FileItemList from './components/FileItemList.vue'

const explorerRef = ref<HTMLElement>()
const resizerRef = ref<HTMLElement>()
const width = ref(300) // Initial width in pixels
const minWidth = 300
const maxWidth = 600
const isResizing = ref(false)

let startX = 0
let startWidth = 0

const startResize = (e: MouseEvent) => {
  isResizing.value = true
  startX = e.clientX
  startWidth = width.value

  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const handleResize = (e: MouseEvent) => {
  if (!isResizing.value) return

  const deltaX = e.clientX - startX
  const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX))
  width.value = newWidth
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

onMounted(() => {
  if (resizerRef.value) {
    resizerRef.value.addEventListener('mousedown', startResize)
  }
})

onUnmounted(() => {
  if (resizerRef.value) {
    resizerRef.value.removeEventListener('mousedown', startResize)
  }
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
})
</script>

<template>
  <div class="flex h-full">
    <!-- File Explorer Panel -->
    <div
      ref="explorerRef"
      :style="{ width: `${width}px` }"
      class="bg-background-50 border-r border-background-50 flex flex-col transition-none"
    >
      <!-- File Tree -->
      <div class="flex-1 p-2 overflow-auto">
        <div class="space-y-1">
          <!-- Project Header -->
          <div class="text-language/70 text-xs font-medium px-2 py-1">EXPLORER: ZENSE.DEV</div>

          <!-- Dynamic File Tree -->
          <FileItemList />
        </div>
      </div>

      <!-- Theme Toggle Section -->
      <div class="border-t border-foreground-50 dark:border-background p-3">
        <div class="flex flex-col">
          <span class="text-xs font-medium text-language/70">THEME</span>
          <ThemeToggle />
        </div>
      </div>
    </div>

    <!-- Resize Handle -->
    <div
      ref="resizerRef"
      class="w-1 bg-background-50 hover:bg-accent/40 cursor-col-resize transition-colors relative group"
      :class="{ 'bg-background-50/60': isResizing }"
    >
      <!-- Visual indicator -->
      <div
        class="absolute inset-y-0 left-0 w-1 bg-background-100 opacity-0 group-hover:opacity-100 transition-opacity"
      ></div>
    </div>

    <slot />
  </div>
</template>

<style scoped>
/* Prevent text selection during resize */
.resizing {
  user-select: none;
}
</style>
