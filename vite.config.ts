import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		mdx({
			jsxImportSource: 'vue',
			providerImportSource: '@mdx-js/vue'
		})
	],
	optimizeDeps: {
		include: ['@mdx-js/vue']
	}
})
