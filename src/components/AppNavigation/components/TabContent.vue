<script setup lang="ts">
import { OpenFile } from '@/shared/constants/NAV_FILE'
import { useFileTree } from '@/shared/utils/useFileTree'
import { XMarkIcon } from '@heroicons/vue/16/solid'

const { closeFile } = useFileTree()

const { file } = defineProps<{
  file: OpenFile
}>()

const handleCloseFile = (path: string, event: MouseEvent) => {
  event.stopPropagation()
  closeFile(path)
}
</script>

<template>
  <div class="flex items-center px-3 py-2 min-w-0">
    <component v-if="file.iconType === 'component'" :is="file.icon" class="w-4 h-4 mr-2" />
    <span v-else class="text-sm mr-2">
      {{ file.icon }}
    </span>
    <span class="text-sm truncate max-w-32">{{ file.name }}</span>
    <button
      class="close-btn ml-2 p-0.5 rounded hover:bg-background-200 opacity-60 hover:opacity-100 transition-opacity"
      @click="handleCloseFile(file.path, $event)"
      :title="`Close ${file.name}`"
    >
      <XMarkIcon class="w-3 h-3" />
    </button>
  </div>
</template>
