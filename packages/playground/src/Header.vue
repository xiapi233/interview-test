<script setup lang="ts">
	import type { ReplStore } from '@vue/repl'
	import { downloadProject } from './download/download'
	import Sun from './icons/Sun.vue'
	import Moon from './icons/Moon.vue'
	import Download from './icons/Download.vue'
	import Reload from './icons/Reload.vue'
	import { useSubmit } from './useSubmit'
	import { NButton } from 'naive-ui'

	const props = defineProps<{
		store: ReplStore
		theme: 'dark' | 'light'
	}>()
	const emit = defineEmits(['toggle-theme', 'toggle-ssr', 'toggle-prod', 'toggle-autosave', 'reload-page'])

	const { store } = props

	function toggleDark() {
		const cls = document.documentElement.classList
		cls.toggle('dark')
		localStorage.setItem('vue-sfc-playground-prefer-dark', String(cls.contains('dark')))
		emit('toggle-theme', cls.contains('dark'))
	}
	const { submit } = useSubmit()

	function handleSubmit() {
		submit('张三', window.location.href)
	}
</script>

<template>
	<nav>
		<h1>
			<span>Interview Test Playground</span>
		</h1>
		<div class="links">
			<NButton type="success" @click="handleSubmit">
				<template #icon>
					<Icon icon="material-symbols-light:arrow-downward"></Icon>
				</template>
				提交
			</NButton>
			<button
				:title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
				class="toggle-dark"
				@click="toggleDark"
			>
				<Sun class="light" />
				<Moon class="dark" />
			</button>
			<button title="Reload page" class="reload" @click="$emit('reload-page')">
				<Reload />
			</button>
			<button title="Download project files" class="download" @click="downloadProject(store)">
				<Download />
			</button>
		</div>
	</nav>
</template>

<style>
	nav {
		--bg: #fff;
		--bg-light: #fff;
		--border: #ddd;
		--btn: #666;
		--highlight: #333;
		--green: #3ca877;
		--purple: #904cbc;
		--btn-bg: #eee;

		color: var(--base);
		height: var(--nav-height);
		box-sizing: border-box;
		padding: 0 1em;
		background-color: var(--bg);
		border-top: 3px solid var(--green);
		border-bottom: 1px solid var(--border);
		/* box-shadow: 0 0 4px ; */
		position: relative;
		z-index: 999;
		display: flex;
		justify-content: space-between;
	}

	.dark nav {
		--base: #ddd;
		--bg: #1a1a1a;
		--bg-light: #242424;
		--border: #383838;
		--highlight: #fff;
		--btn-bg: #333;

		box-shadow: none;
		border-bottom: 1px solid var(--border);
	}

	h1 {
		font-weight: 500;
		display: inline-flex;
		place-items: center;
	}

	h1 img {
		height: 24px;
		margin-right: 10px;
	}

	@media (max-width: 560px) {
		h1 span {
			font-size: 0.9em;
		}
	}

	@media (max-width: 520px) {
		h1 span {
			display: none;
		}
	}

	.links {
		display: flex;
	}

	.toggle-prod span,
	.toggle-ssr span,
	.toggle-autosave span {
		font-size: 12px;
		border-radius: 4px;
		padding: 4px 6px;
	}

	.toggle-prod span {
		background: var(--green);
		color: #fff;
	}

	.toggle-prod.prod span {
		background: var(--purple);
	}

	.toggle-ssr span,
	.toggle-autosave span {
		background-color: var(--btn-bg);
	}

	.toggle-ssr.enabled span,
	.toggle-autosave.enabled span {
		color: #fff;
		background-color: var(--green);
	}

	.toggle-dark svg {
		width: 18px;
		height: 18px;
	}

	.toggle-dark .dark,
	.dark .toggle-dark .light {
		display: none;
	}

	.dark .toggle-dark .dark {
		display: inline-block;
	}

	.links button,
	.links .github {
		padding: 1px 6px;
		color: var(--btn);
	}

	.links button:hover,
	.links .github:hover {
		color: var(--highlight);
	}

	.version:hover .active-version::after {
		border-top-color: var(--btn);
	}

	.dark .version:hover .active-version::after {
		border-top-color: var(--highlight);
	}

	.versions {
		display: none;
		position: absolute;
		left: 0;
		top: 40px;
		background-color: var(--bg-light);
		border: 1px solid var(--border);
		border-radius: 4px;
		list-style-type: none;
		padding: 8px;
		margin: 0;
		width: 200px;
		max-height: calc(100vh - 70px);
		overflow: scroll;
	}

	.versions a {
		display: block;
		padding: 6px 12px;
		text-decoration: none;
		cursor: pointer;
		color: var(--base);
	}

	.versions a:hover {
		color: var(--green);
	}

	.versions.expanded {
		display: block;
	}

	.links > * {
		display: flex;
		align-items: center;
	}

	.links > * + * {
		margin-left: 4px;
	}
</style>
