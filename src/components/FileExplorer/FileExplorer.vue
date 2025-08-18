<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from '../ThemeToggle.vue'
import { useFileTree } from '@/shared/utils/useFileTree'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/16/solid'

const { flattenedFiles, selectedFile, toggleFolder, selectFile, getFileIcon } = useFileTree()

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
          <div class="space-y-0.5">
            <div
              v-for="item in flattenedFiles"
              :key="item.path"
              :style="{ paddingLeft: `${item.depth * 16 + 8}px` }"
              class="flex items-center px-2 py-1 text-sm text-language hover:bg-foreground/10 rounded cursor-pointer transition-colors"
              :class="{
                'bg-accent/20': selectedFile === item.path,
                'font-medium': item.type === 'folder',
              }"
              @click="item.type === 'folder' ? toggleFolder(item.path) : selectFile(item.path)"
            >
              <!-- Toggle icon (left, before file/folder icon) -->
              <span v-if="item.type === 'folder'" class="mr-1 text-xs text-language/50">
                <template v-if="item.isExpanded">
                  <ChevronDownIcon class="w-5 h-5 flex items-center justify-center" />
                </template>
                <template v-else>
                  <ChevronRightIcon class="w-5 h-5 flex items-center justify-center" />
                </template>
              </span>
              <!-- Folder icon (left) -->
              <template v-if="item.type === 'folder'">
                <component
                  v-if="getFileIcon(item).type === 'component'"
                  :is="getFileIcon(item).value"
                  class="w-4 h-4 mr-2"
                />
                <span v-else class="w-4 h-4 mr-2 text-xs flex items-center justify-center">
                  {{ getFileIcon(item).value }}
                </span>
              </template>
              <!-- File icon (left) -->
              <template v-else>
                <component
                  v-if="getFileIcon(item).type === 'component'"
                  :is="getFileIcon(item).value"
                  :class="['w-4 h-4 mr-2', item.depth === 0 ? 'ml-7' : 'ml-3']"
                />
                <span
                  v-else
                  :class="[
                    'w-4 h-4 mr-2 text-xs flex items-center justify-center',
                    item.depth === 0 ? 'ml-2' : 'ml-7',
                  ]"
                >
                  {{ getFileIcon(item).value }}
                </span>
              </template>
              <span class="truncate">{{ item.name }}</span>
            </div>
          </div>
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
