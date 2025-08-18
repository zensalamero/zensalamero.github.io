import { ref, computed } from 'vue'
import type { FileTreeItem } from '../interfaces/FileTreeItem'
import { FILE_TREE_CONFIG } from '../constants/fileTree'
import TailwindIcon from '@/assets/icons/TailwindIcon.vue'
import VueIcon from '@/assets/icons/VueIcon.vue'
import TypescriptIcon from '@/assets/icons/TypescriptIcon.vue'
import {
  FolderIcon,
  FolderOpenIcon,
  DocumentIcon,
  CubeIcon,
  PhotoIcon,
  BookOpenIcon,
} from '@heroicons/vue/24/solid'

interface OpenFile {
  path: string
  name: string
  icon: string | object
  iconType?: 'emoji' | 'component'
}

export function useFileTree() {
  const fileTree = ref<FileTreeItem[]>(JSON.parse(JSON.stringify(FILE_TREE_CONFIG)))
  const selectedFile = ref<string | null>(null)
  const openFiles = ref<OpenFile[]>([])
  const activeFile = ref<string | null>(null)

  const toggleFolder = (path: string) => {
    const toggleRecursive = (items: FileTreeItem[]): boolean => {
      for (const item of items) {
        if (item.path === path && item.type === 'folder') {
          item.isExpanded = !item.isExpanded
          return true
        }
        if (item.children && toggleRecursive(item.children)) {
          return true
        }
      }
      return false
    }

    toggleRecursive(fileTree.value)
  }

  const findFileItem = (path: string): FileTreeItem | null => {
    const findRecursive = (items: FileTreeItem[]): FileTreeItem | null => {
      for (const item of items) {
        if (item.path === path) {
          return item
        }
        if (item.children) {
          const found = findRecursive(item.children)
          if (found) return found
        }
      }
      return null
    }

    return findRecursive(fileTree.value)
  }

  const selectFile = (path: string) => {
    const fileItem = findFileItem(path)
    if (!fileItem || fileItem.type !== 'file') return

    selectedFile.value = path
    activeFile.value = path

    // Add to open files if not already open
    const isAlreadyOpen = openFiles.value.some((file) => file.path === path)
    if (!isAlreadyOpen) {
      const iconData = getFileIcon(fileItem)
      openFiles.value.push({
        path,
        name: fileItem.name,
        icon: iconData.value,
        iconType: iconData.type,
      })
    }
  }

  const closeFile = (path: string) => {
    const index = openFiles.value.findIndex((file) => file.path === path)
    if (index === -1) return

    openFiles.value.splice(index, 1)

    // If closing the active file, switch to another open file or clear selection
    if (activeFile.value === path) {
      if (openFiles.value.length > 0) {
        // Switch to the previous file in the list, or the first one
        const newActiveIndex = Math.max(0, index - 1)
        activeFile.value = openFiles.value[newActiveIndex]?.path || null
        selectedFile.value = activeFile.value
      } else {
        activeFile.value = null
        selectedFile.value = null
      }
    }
  }

  const setActiveFile = (path: string) => {
    const file = openFiles.value.find((f) => f.path === path)
    if (file) {
      activeFile.value = path
      selectedFile.value = path
    }
  }

  const getFileIcon = (
    item: FileTreeItem,
  ): { type: 'emoji' | 'component'; value: string | object } => {
    if (item.icon) return { type: 'emoji', value: item.icon }

    if (item.type === 'folder') {
      return {
        type: 'component',
        value: item.isExpanded ? FolderOpenIcon : FolderIcon,
      }
    }

    // Auto-detect file icons based on extension
    const extension = item.name.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'vue':
        return { type: 'component', value: VueIcon }
      case 'ts':
        return { type: 'component', value: TypescriptIcon }
      case 'js':
        return { type: 'component', value: DocumentIcon }
      case 'css':
        return { type: 'component', value: TailwindIcon }
      case 'scss':
        return { type: 'component', value: TailwindIcon }
      case 'json':
        return { type: 'component', value: CubeIcon }
      case 'md':
        return { type: 'component', value: BookOpenIcon }
      case 'svg':
        return { type: 'component', value: PhotoIcon }
      case 'ico':
        return { type: 'component', value: PhotoIcon }
      default:
        return { type: 'component', value: DocumentIcon }
    }
  }

  const flattenedFiles = computed(() => {
    const flatten = (items: FileTreeItem[], depth = 0): Array<FileTreeItem & { depth: number }> => {
      const result: Array<FileTreeItem & { depth: number }> = []

      for (const item of items) {
        result.push({ ...item, depth })

        if (item.type === 'folder' && item.isExpanded && item.children) {
          result.push(...flatten(item.children, depth + 1))
        }
      }

      return result
    }

    return flatten(fileTree.value)
  })

  return {
    fileTree,
    selectedFile,
    openFiles,
    activeFile,
    flattenedFiles,
    toggleFolder,
    selectFile,
    closeFile,
    setActiveFile,
    getFileIcon,
  }
}
