import { createMemoryHistory, createRouter } from 'vue-router'

import SearchView from './pages/Search.vue'
import HomeView from './pages/Index.vue'
import AboutView from './pages/About.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/search', component: SearchView },
  { path: '/home', component: HomeView },
  { path: '/mine', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router