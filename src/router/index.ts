// src/router/index.ts
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home | My App', description: '…' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About Us | My App', description: '…' },
  },
]
