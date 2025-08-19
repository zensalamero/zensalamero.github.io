export interface FileTreeItem {
  name: string
  type: 'file' | 'folder'
  icon?: string
  children?: FileTreeItem[]
  path: string
  isExpanded?: boolean
}

export type FileTreeConfig = FileTreeItem[]

export type FileTreeItemWithDepth = FileTreeItem & { depth: number }
