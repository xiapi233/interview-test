import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import 'github-markdown-css/github-markdown.css'
import './styles.css'

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

createApp(App).use(router).mount('#app')
