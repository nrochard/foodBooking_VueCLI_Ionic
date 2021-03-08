import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/food/accueil'
  },
  {
    path: '/food/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/food/accueil'
      },
      {
        path: 'accueil',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'reservation',
        component: () => import('@/views/Booking.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
