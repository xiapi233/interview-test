<script setup lang="ts">
	import { MDXProvider } from '@mdx-js/vue'
	import { RouterView } from 'vue-router'
	import { Playground } from '@vue/sfc-playground'
	import {
		NButton,
		NSkeleton,
		NModalProvider,
		NMessageProvider,
		NConfigProvider,
		darkTheme,
		lightTheme
	} from 'naive-ui'
	import { Icon } from '@iconify/vue'
	import { useDark } from '@vueuse/core'

	const isDark = useDark({
		selector: 'html'
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
	<NConfigProvider :theme="isDark ? darkTheme : lightTheme">
		<NMessageProvider>
			<NModalProvider>
				<MDXProvider>
					<div class="markdown-body" :data-theme="isDark ? 'dark' : 'light'">
						<div class="content">
							<Suspense>
								<template #default>
									<RouterView />
								</template>
								<template #fallback>
									<div class="flex flex-col h-screen">
										<NSkeleton height="40px" width="33%" />
										<NSkeleton height="40px" width="66%" :sharp="false" />
										<NSkeleton height="40px" round />
										<NSkeleton height="40px" circle />
									</div>
								</template>
							</Suspense>
						</div>
						<NButton class="m-6 mt-2" type="success" @click="scrollToEnd">
							<template #icon>
								<Icon class="animate-bounce" icon="material-symbols:arrow-downward-rounded"></Icon>
							</template>
							Coding in Playground
						</NButton>
						<span></span>
					</div>
					<Playground />
				</MDXProvider>
			</NModalProvider>
		</NMessageProvider>
	</NConfigProvider>
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
