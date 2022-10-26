import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else return { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/*',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: '/books',
          name: 'books',
          component: () => import('../views/Manage/BookManage.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/Manage/UserManage.vue')
        },
        {
          path: '/bookmark',
          name: 'bookmark',
          component: () => import('../views/Manage/BookmarkView.vue')
        },
        {
          path: '/feedback',
          name: 'feedback',
          component: () => import('../views/Manage/FeedbackView.vue')
        },
        {
          path: '/:book/:id(\\d+)',
          name: 'detail',
          component: () => import('../views/ProductDetail.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: ErrorView
    }
  ]
})

export default router
