<script setup lang="ts">
import { useFileTree } from '@/shared/utils/useFileTree'
import FileItem from './FileItem.vue'

const { flattenedFiles, selectedFile, toggleFolder, selectFile } = useFileTree()
</script>

<template>
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
      <FileItem :item="item" />
    </div>
  </div>
</template>
