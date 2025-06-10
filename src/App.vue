<script setup lang="ts">
	import { MDXProvider } from '@mdx-js/vue'
	import { RouterView } from 'vue-router'
	import { Playground } from '@vue/sfc-playground'
	import { ref } from 'vue'
	import { NButton } from 'naive-ui'
	import { Icon } from '@iconify/vue'

	const hash = ref(window.location.hash)
	window.addEventListener('hashchange', () => {
		hash.value = location.hash
	})
	function scrollToEnd() {
		const content = document.documentElement
		if (content) {
			content.scrollTo({
				top: content.scrollHeight,
				behavior: 'smooth'
			})
		}
	}
</script>

<template>
	<MDXProvider>
		<div class="markdown-body">
			<div class="content">
				<!-- <Suspense>
					<template #default> -->
				<RouterView />
				<!-- </template> -->
				<!-- <template #fallback>
						<span style="color: #f90">loading....</span>
					</template> -->
				<!-- </Suspense> -->
			</div>
			<NButton class="m-6 mt-2 " type="success" @click="scrollToEnd">
				<template #icon>
					<Icon icon="material-symbols-light:arrow-downward"></Icon>
				</template>
				Coding in Playground
			</NButton>
			<span></span>
		</div>
		<Playground v-if="hash.length"></Playground>
	</MDXProvider>
</template>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji';
		background-color: #f5f5f5;
		color: #333;
	}
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
