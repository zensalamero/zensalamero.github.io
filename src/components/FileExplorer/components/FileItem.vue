<script setup lang="ts">
import { FileTreeItemWithDepth } from '@/shared/interfaces/FileTreeItem'
import { useFileTree } from '@/shared/utils/useFileTree'

const { getFileIcon } = useFileTree()

interface FileItemProps {
  item: FileTreeItemWithDepth
}

const { item } = defineProps<FileItemProps>()
</script>

<template>
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
</template>
