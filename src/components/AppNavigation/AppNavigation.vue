<script setup lang="ts">
import { useFileTree } from '@/shared/utils/useFileTree'
import TabContent from './components/TabContent.vue'
import { computed } from 'vue'

const { openFiles, activeFile, setActiveFile } = useFileTree()

const files = computed(() => openFiles.value)

const handleTabClick = (path: string, event: MouseEvent) => {
  // Prevent default if clicking close button
  if ((event.target as HTMLElement).closest('.close-btn')) {
    return
  }
  setActiveFile(path)
}
</script>

<template>
  <header v-if="files.length > 0" class="w-full bg-background-50 text-foreground border-background">
    <div class="flex items-center justify-between">
      <!-- File Tabs Section -->
      <div class="flex-1 flex items-center overflow-hidden">
        <!-- File Tabs -->
        <div class="flex items-center overflow-x-auto scrollbar-none">
          <div
            v-for="file in files"
            :key="file.path"
            class="flex items-center min-w-0 border-r border-background cursor-pointer transition-colors"
            :class="{
              'bg-background text-foreground': activeFile === file.path,
              'bg-background-150 text-foreground/70': activeFile !== file.path,
            }"
            @click="handleTabClick(file.path, $event)"
          >
            <!-- Tab Content -->
            <TabContent :file="file" />
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
