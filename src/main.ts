import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'github-markdown-css/github-markdown.css'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/test-count-down-button', component: () => import('./CountdownButton/README.mdx') },
		{ path: '/test-pub-sub', component: () => import('./PubSub/README.mdx') },
		{ path: '/test-refactor-callback', component: () => import('./refactorCallback/README.mdx') },
		{ path: '/test-flavored-count-down', component: () => import('./FlavoredCountDown/index.mdx') }
	]
})

createApp(App).use(router).mount('#app')
