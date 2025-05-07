<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { watchEffect } from 'vue'

const route = useRoute()

watchEffect(() => {
  useHead({
    title: (route.meta.title as string) || 'Default Title',
    meta: [
      {
        name: 'description',
        content: (route.meta.description as string) || 'Default description.',
      },
    ],
  })
})
</script>

<template>
  <span style="display: none" aria-hidden="true"></span>
</template>
