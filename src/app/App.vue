<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import MetaManager from '@/components/MetaManager/MetaManager.vue'
import FileExplorer from '@/components/FileExplorer/FileExplorer.vue'
import LayoutWrapper from '@/components/ui/LayoutWrapper.vue'
import AppNavigation from '@/components/AppNavigation/AppNavigation.vue'
import LoadingScreen from '@/components/ThemeToggle/LoadingScreen.vue'

const isLoading = ref(true)
const showMainApp = ref(false)

onMounted(() => {
  // Start fading out loading screen and showing main app slightly before loading completes
  setTimeout(() => {
    showMainApp.value = true
  }, 3800) // Start transition 200ms before loading completes

  // Complete the loading process
  setTimeout(() => {
    isLoading.value = false
  }, 4500) // Give time for smooth transition overlap
})
</script>

<template>
  <!-- Loading Screen with fade out transition -->
  <Transition
    name="loading-fade"
    enter-active-class="transition-opacity duration-700 ease-out"
    leave-active-class="transition-opacity duration-1000 ease-in-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isLoading" class="fixed inset-0 bg-background flex items-center justify-center z-50">
      <LoadingScreen />
    </div>
  </Transition>

  <!-- Main Application with smooth fade in -->
  <Transition
    name="app-fade"
    enter-active-class="transition-all duration-1200 ease-out"
    leave-active-class="transition-all duration-500 ease-in"
    enter-from-class="opacity-0 transform translate-y-8 scale-98"
    enter-to-class="opacity-100 transform translate-y-0 scale-100"
    leave-from-class="opacity-100 transform translate-y-0 scale-100"
    leave-to-class="opacity-0 transform translate-y-4 scale-98"
  >
    <div v-if="showMainApp" class="min-h-screen">
      <FileExplorer>
        <LayoutWrapper>
          <AppNavigation />
          <RouterView />
        </LayoutWrapper>
      </FileExplorer>
    </div>
  </Transition>

  <!-- Meta tags manager -->
  <MetaManager />
</template>
