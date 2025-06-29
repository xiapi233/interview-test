import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import 'github-markdown-css/github-markdown.css'
import './styles.css'

// @ts-expect-error Custom window property
window.VUE_DEVTOOLS_CONFIG = {
	defaultSelectedAppId: 'repl'
}

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

createApp(App).use(router).mount('#app')
