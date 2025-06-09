// @ts-expect-error Custom window property
window.VUE_DEVTOOLS_CONFIG = {
	defaultSelectedAppId: 'repl'
}

export { default as Playground } from './src/App.vue'
