import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mdx from '@mdx-js/rollup'
import ssl from '@vitejs/plugin-basic-ssl'
import VueRouter from 'unplugin-vue-router/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { preventDebug } from '@nexus/vite-plugin-prevent-debug'

export default defineConfig({
	plugins: [
		vue(),
		mdx({
			remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }]],
			jsxImportSource: 'vue',
			providerImportSource: '@mdx-js/vue'
		}),
		ssl(),
		preventDebug({}),
		VueRouter({
			routesFolder: 'src/pages',
			dts: 'types/router.d.ts',
			exclude: ['**/components/**/*'],
			extensions: ['.mdx'],
			logs: false,
      
		})
	],
	server: {
		// @ts-ignore
		https: true,
		proxy: {
			'/.netlify': {
				target: 'http://localhost:8888',
				changeOrigin: true
			}
		}
	},
	optimizeDeps: {
		exclude: ['@vue/repl'],
		include: ['@mdx-js/vue']
	}
})
