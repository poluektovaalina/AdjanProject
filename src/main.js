import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import Main from "./pages/Main.vue"
import Favorites from "./pages/Favorites.vue"

const routes = [
    { path: '/', name: 'main', component: Main },
    { path: '/favorites', name: 'favorites', component: Favorites },
]


const router = createRouter({
    history: createWebHistory(),
    routes:[
        
    ]
})


createApp(App).use(autoAnimatePlugin).use(router).mount('#app')