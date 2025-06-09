<script setup lang="ts">
	import { MDXProvider } from '@mdx-js/vue'
	import { RouterView } from 'vue-router'
	import { Playground } from '@vue/sfc-playground'
	import { ref } from 'vue'

	const hash = ref(window.location.hash)
	window.addEventListener('hashchange', () => {
		hash.value = location.hash
	})
</script>

<template>
	<MDXProvider>
		<div class="markdown-body">
			<div class="content">
				<RouterView></RouterView>
			</div>
		</div>
		<Playground v-if="hash.length"></Playground>
	</MDXProvider>
</template>

<style>
	pre code {
		white-space: pre; /* 保留所有空格和换行 */
		font-family: monospace;
		tab-size: 2; /* 控制 Tab 显示宽度 */
	}
	.content {
		padding: 20px 30px;
		margin: 0 auto;
	}
	.content .nav {
		display: flex;
		gap: 20px;
		padding: 20px 0;
	}
	.content .nav a {
		color: #333;
	}
	.nav a.router-link-active {
		color: #42b983;
	}
</style>
