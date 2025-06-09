import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mdx from '@mdx-js/rollup'
import ssl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		mdx({
			jsxImportSource: 'vue',
			providerImportSource: '@mdx-js/vue'
		}),
		ssl()
	],
  server: {
		https: true
	},
	optimizeDeps: {
		include: ['@mdx-js/vue']
	}
})
