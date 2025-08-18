<script setup lang="ts">
import { useFileTree } from '@/shared/utils/useFileTree'
import { XMarkIcon } from '@heroicons/vue/16/solid'

const { openFiles, activeFile, setActiveFile, closeFile } = useFileTree()

const handleTabClick = (path: string, event: MouseEvent) => {
  // Prevent default if clicking close button
  if ((event.target as HTMLElement).closest('.close-btn')) {
    return
  }
  setActiveFile(path)
}

const handleCloseFile = (path: string, event: MouseEvent) => {
  event.stopPropagation()
  closeFile(path)
}
</script>

<template>
  <header
    v-if="openFiles.length > 0"
    class="w-full bg-background-50 text-foreground border-b border-background"
  >
    <div class="flex items-center justify-between h-12">
      <!-- File Tabs Section -->
      <div class="flex-1 flex items-center overflow-hidden">
        <!-- File Tabs -->
        <div class="flex items-center overflow-x-auto scrollbar-none">
          <div
            v-for="file in openFiles"
            :key="file.path"
            class="flex items-center min-w-0 border-r border-background cursor-pointer transition-colors"
            :class="{
              'bg-background text-foreground': activeFile === file.path,
              'bg-background-50 text-foreground/70 hover:bg-background hover:text-foreground':
                activeFile !== file.path,
            }"
            @click="handleTabClick(file.path, $event)"
          >
            <!-- Tab Content -->
            <div class="flex items-center px-3 py-2 min-w-0">
              <component
                v-if="file.iconType === 'component'"
                :is="file.icon"
                class="w-4 h-4 mr-2"
              />
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
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style src="@shared/styles/AppNavigation.css" scoped />

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

/* Improve tab visual hierarchy */
.router-link-active {
  color: rgb(var(--color-accent));
  font-weight: 500;
}
</style>
