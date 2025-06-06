import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'github-markdown-css/github-markdown.css'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/test1', component: () => import('./CountdownButton/README.mdx') },
		{ path: '/test2', component: () => import('./PubSub/README.mdx') },
		{ path: '/test3', component: () => import('./refactorCallback/README.mdx') }
	]
})

createApp(App).use(router).mount('#app')
