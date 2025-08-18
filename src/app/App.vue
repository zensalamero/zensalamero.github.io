<script setup lang="ts">
import { RouterView } from 'vue-router'
import MetaManager from '@/components/MetaManager/MetaManager.vue'
import FileExplorer from '@/components/FileExplorer/FileExplorer.vue'
// import VueParticles from '@/components/VueParticles.vue'
import LayoutWrapper from '@/components/ui/LayoutWrapper.vue'
import AppNavigation from '@/components/AppNavigation/AppNavigation.vue'
</script>

<template>
  <FileExplorer>
    <LayoutWrapper>
      <AppNavigation />
      <RouterView />
    </LayoutWrapper>
  </FileExplorer>
  <!-- Meta tags manager -->
  <MetaManager />
</template>
