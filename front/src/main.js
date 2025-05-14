import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

// импорт страниц
import Main from './pages/Main.vue'
import Favorites from './pages/Favorites.vue'
import LoginUser from './pages/Login.vue'
// маршруты
const routes = [
  { path: '/', name: 'main', component: Main },
  { path: '/favorites', name: 'favorites', component: Favorites },
  { path: '/Login', name: 'Login', component: LoginUser }
]

// создаём роутер
const router = createRouter({
  history: createWebHistory(),
  routes
})

// инициализируем приложение один раз
createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  .mount('#app')
