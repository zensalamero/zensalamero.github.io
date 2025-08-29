import { computed } from 'vue'
import GettingStarted from '@/views/GettingStarted.vue'
import FileEditorView from '@/views/FileEditorView.vue'
import MeView from '@/views/MeView.vue'

export function useCurrentView(activeFile: { value: string | null }) {
  return computed(() => {
    if (!activeFile.value) return GettingStarted
    const lower = activeFile.value.toLowerCase()
    if (lower.includes('me')) return MeView
    // Add more mappings for other views as needed
    return FileEditorView
  })
}
