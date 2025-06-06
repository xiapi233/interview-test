<script setup lang="ts">
	import { MDXProvider } from '@mdx-js/vue'
	import { RouterView } from 'vue-router'
</script>

<template>
	<MDXProvider>
		<div class="content">
			<div class="nav">
				<RouterLink to="/test1">测试1</RouterLink>
				<RouterLink to="/test2">测试2</RouterLink>
				<RouterLink to="/test3">测试3</RouterLink>
			</div>
			<div class="markdown-body">
				<RouterView></RouterView>
			</div>
		</div>
	</MDXProvider>
</template>

<style>
	pre code {
		white-space: pre; /* 保留所有空格和换行 */
		font-family: monospace;
		tab-size: 2; /* 控制 Tab 显示宽度 */
	}
	.content {
		max-width: 1200px;
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
