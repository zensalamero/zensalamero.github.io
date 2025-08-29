// src/router/index.ts
import GettingStarted from '@/views/GettingStarted.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: GettingStarted,
    meta: { title: '~$ whoami → zense', description: 'Frontend engineer portfolio site.' },
  },
  // {
  //   path: '/projects',
  //   name: 'projects',
  //   component: () => import('@views/AboutView.vue'),
  //   meta: { title: 'About Janzen', description: 'Frontend engineer, builder, problem-solver.' },
  // },
  // {
  //   path: '/experience',
  //   name: 'experience',
  //   component: () => import('@views/AboutView.vue'),
  //   meta: { title: 'About Janzen', description: 'Frontend engineer, builder, problem-solver.' },
  // },
  // {
  //   path: '/tech',
  //   name: 'tech',
  //   component: () => import('@views/AboutView.vue'),
  //   meta: { title: 'About Janzen', description: 'Frontend engineer, builder, problem-solver.' },
  // },
]
