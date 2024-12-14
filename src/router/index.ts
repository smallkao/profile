import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectAboutView from '../views/ProjectAboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ProjectAboutView/:id',
      name: 'ProjectAbout',
      component: ProjectAboutView
    }
  ],
})

export default router
