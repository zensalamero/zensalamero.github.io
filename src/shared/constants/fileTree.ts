import type { FileTreeConfig } from '../interfaces/FileTreeItem'

export const FILE_TREE_CONFIG: FileTreeConfig = [
  {
    name: 'src',
    type: 'folder',
    path: '/src',
    isExpanded: true,
    children: [
      {
        name: 'app',
        type: 'folder',
        path: '/src/app',
        isExpanded: false,
        children: [
          {
            name: 'App.vue',
            type: 'file',
            path: '/src/app/App.vue',
          },
          {
            name: 'router',
            type: 'folder',
            path: '/src/app/router',
            children: [
              {
                name: 'index.ts',
                type: 'file',
                path: '/src/app/router/index.ts',
              },
            ],
          },
        ],
      },
      {
        name: 'navigation',
        type: 'folder',
        path: '/src/navigation',
        children: [
          {
            name: 'home.ts',
            type: 'file',
            path: '/src/navigation/home.js',
          },
          {
            name: 'about.ts',
            type: 'file',
            path: '/src/navigation/home.ts',
          },
          {
            name: 'tech.ts',
            type: 'file',
            path: '/src/navigation/home.ts',
          },
          {
            name: 'projects.ts',
            type: 'file',
            path: '/src/navigation/home.ts',
          },
          {
            name: 'experience.ts',
            type: 'file',
            path: '/src/navigation/home.ts',
          },
          {
            name: 'contact.ts',
            type: 'file',
            path: '/src/navigation/home.ts',
          },
        ],
      },
      {
        name: 'assets',
        type: 'folder',
        path: '/src/assets',
        children: [
          {
            name: 'base.css',
            type: 'file',
            path: '/src/assets/base.css',
          },
          {
            name: 'main.css',
            type: 'file',
            path: '/src/assets/main.css',
          },
          {
            name: 'logo.svg',
            type: 'file',
            path: '/src/assets/logo.svg',
          },
        ],
      },
    ],
  },
  {
    name: 'package.json',
    type: 'file',
    path: '/package.json',
  },
  {
    name: 'tsconfig.json',
    type: 'file',
    path: '/tsconfig.json',
  },
  {
    name: 'README.md',
    type: 'file',
    path: '/README.md',
  },
] as const
