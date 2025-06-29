<script setup lang="ts">
	import Header from './Header.vue'
	import { Repl, useStore, useVueImportMap } from '@vue/repl'
	import type { SFCOptions } from '@vue/repl'
	import Monaco from '@vue/repl/monaco-editor'
	import { ref, watchEffect, onMounted, computed, useTemplateRef } from 'vue'
	import { useDark, useToggle } from '@vueuse/core'
	import { useCryptSessionStorage } from '../../hooks/useCryptSessionStorage'

	const replRef = useTemplateRef<InstanceType<typeof Repl>>('replRef')

	const setVH = () => {
		document.documentElement.style.setProperty('--vh', window.innerHeight + `px`)
	}
	window.addEventListener('resize', setVH)
	setVH()

	const useSSRMode = ref(false)

	const autoSave = ref(true)

	const { productionMode, vueVersion, importMap } = useVueImportMap({})
	const hash = useCryptSessionStorage('playground-serialized-state', location.hash.slice(1))

	// enable experimental features
	const sfcOptions = computed(
		(): SFCOptions => ({
			script: {
				inlineTemplate: productionMode.value,
				isProd: productionMode.value,
				propsDestructure: true
			},
			style: {
				isProd: productionMode.value
			},
			template: {
				isProd: productionMode.value,
				compilerOptions: {
					isCustomElement: (tag: string) => tag === 'mjx-container' || tag.startsWith('custom-')
				}
			}
		})
	)

	const store = useStore(
		{
			builtinImportMap: importMap,
			vueVersion,
			sfcOptions,
			showOutput: ref(false)
		},
		hash.value
	)
	// @ts-ignore
	globalThis.store = store

	// persist state
	watchEffect(() => {
    const newHash = store
    .serialize()
    .replace(/^#/, useSSRMode.value ? `#__SSR__` : `#`)
    .replace(/^#/, productionMode.value ? `#__PROD__` : `#`)
		hash.value = newHash
	})

	function reloadPage() {
		replRef.value?.reload()
	}

	const isDark = useDark({
		selector: 'html'
	})
	const toggleTheme = useToggle(isDark)
	const theme = computed(() => (isDark.value ? 'dark' : 'light'))

	onMounted(() => {
		// @ts-expect-error process shim for old versions of @vue/compiler-sfc dependency
		window.process = { env: {} }
	})
</script>

<template>
	<div class="playground h-screen">
		<Header :store="store" :theme="theme" @toggle-theme="toggleTheme" @reload-page="reloadPage" />
		<Repl
			ref="replRef"
			:theme="theme"
			:editor="Monaco"
			@keydown.ctrl.s.prevent
			@keydown.meta.s.prevent
			:ssr="useSSRMode"
			:model-value="autoSave"
			:editorOptions="{ autoSaveText: false }"
			:store="store"
			:showCompileOutput="false"
			:showSsrOutput="useSSRMode"
			:showOpenSourceMap="true"
			:autoResize="true"
			:clearConsole="false"
			:preview-options="{
// 				headHTML: `<script>
//           const tailwindScript = document.createElement('script')
// tailwindScript.setAttribute('src', 'https://cdn.tailwindcss.com')
// document.head.appendChild(tailwindScript)
//         </script>`,
				customCode: {
					importCode: `import { initCustomFormatter } from 'vue'`,
					useCode: `if (window.devtoolsFormatters) {
    const index = window.devtoolsFormatters.findIndex((v) => v.__vue_custom_formatter)
    window.devtoolsFormatters.splice(index, 1)
    initCustomFormatter()
  } else {
    initCustomFormatter()
  }`
				}
			}"
		/>
	</div>
</template>

<style>
	.dark {
		color-scheme: dark;
	}

	body {
		font-size: 13px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
		margin: 0;
		--base: #444;
		--nav-height: 50px;
	}

	.vue-repl {
		height: calc(var(--vh) - var(--nav-height)) !important;
	}

	button {
		border: none;
		outline: none;
		cursor: pointer;
		margin: 0;
		background-color: transparent;
	}
</style>
