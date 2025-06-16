<script setup lang="ts">
	import type { ReplStore } from '@vue/repl'
	import { downloadProject } from './download/download'
	import Sun from './icons/Sun.vue'
	import Moon from './icons/Moon.vue'
	import Download from './icons/Download.vue'
	import Reload from './icons/Reload.vue'
	import { useSubmit } from './hooks/useSubmit'
	import { NButton, NModal, NForm, NCard, NInput, NFormItem, NAlert } from 'naive-ui'
	import { Icon } from '@iconify/vue'
	import { useEventListener } from '@vueuse/core'
	import { ref, useTemplateRef } from 'vue'
	import { useDateFormat, useNow } from '@vueuse/core'
	import { useLeaveWindowCounter } from './hooks/useLeaveWindowCounter'
	import { useCryptSessionStorage } from './hooks/useCryptSessionStorage'

	const props = defineProps<{
		store: ReplStore
		theme: 'dark' | 'light'
	}>()
	const emit = defineEmits(['toggle-theme', 'reload-page'])

	const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
	const startTime = useCryptSessionStorage('playground-test-start-time', formatted.value)
	const state = useCryptSessionStorage('playground-serialized-state', '')
	const isSubmited = useCryptSessionStorage('playground-has-submitted', false)
	const typeCount = useCryptSessionStorage('playground-type-count', 0)
	const leaveWindowCount = useCryptSessionStorage('playground-leave-window-count', 0)

	useLeaveWindowCounter(leaveWindowCount)

	useEventListener('keydown', () => {
		typeCount.value += 1
	})
	const showSubmitModal = ref(false)
	const { store } = props

	function toggleDark() {
		emit('toggle-theme')
	}
	const { submit, isLoading } = useSubmit()

	const formValue = ref({
		username: ''
	})
	function handleSubmit() {
		formRef.value?.validate(async (error) => {
			if (!error) {
				const now = useNow()
				const submitTime = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss')
				const titleTime = useDateFormat(now, 'YYYY-MM-DD')
				const time = Math.floor((new Date().getTime() - new Date(startTime.value).getTime()) / 60000)

				await submit(
					`${titleTime.value} - 面试题 - [${formValue.value.username}]`,
					[
						`<p>面试者姓名: ${formValue.value.username}</p>`,
						`<p>开始时间: ${startTime.value}</p>`,
						`<p>提交时间: ${submitTime.value}</p>`,
						`<p>用时: ${time}分钟</p>`,
						`<p>键入次数: ${typeCount.value}</p>`,
						`<p>离开窗口次数: ${leaveWindowCount.value}</p>`,
						`<hr />`,
						`<p>在线预览链接: <a href="${window.location.href + state.value}">Playground</a></p>`
					].join('\n')
				)
				isSubmited.value = true
				showSubmitModal.value = false
			}
		})
	}

	const formRef = useTemplateRef<InstanceType<typeof NForm>>('formRef')

	function handleScrollToTop() {
		const content = document.documentElement
		if (content) {
			content.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		}
	}
</script>

<template>
	<nav class="flex items-center justify-between px-4 py-2 bg-white dark:bg-[#1a1a1a]">
		<div class="title flex space-x-6">
			<NButton @click="handleScrollToTop" text size="large">
				<template #icon>
					<Icon icon="material-symbols:arrow-upward-rounded" />
				</template>
			</NButton>
			<h1 class="text-xl font-semibold">
				<span>Interview Test Playground</span>
			</h1>
		</div>
		<div class="buttons flex space-x-4">
			<NButton type="success" :disabled="isSubmited" @click="showSubmitModal = true">
				<template #icon>
					<Icon icon="material-symbols:local-post-office-rounded"></Icon>
				</template>
				提交
			</NButton>
			<NButton type="default" @click="toggleDark">
				<template #icon>
					<Sun v-if="theme === 'light'" class="light" />
					<Moon v-if="theme === 'dark'" class="dark" />
				</template>
			</NButton>
			<NButton type="default" @click="$emit('reload-page')">
				<template #icon>
					<Reload />
				</template>
			</NButton>
			<NButton title="Download project files" class="download" @click="downloadProject(store)">
				<template #icon>
					<Download />
				</template>
			</NButton>
		</div>
	</nav>

	<NModal v-model:show="showSubmitModal">
		<NCard
			style="width: 600px"
			title="🎉 恭喜你完成了面试题"
			size="huge"
			:bordered="false"
			role="dialog"
			aria-modal="true"
		>
			<NForm
				ref="formRef"
				:label-width="80"
				:model="formValue"
				:rules="{
					username: {
						required: true,
						trigger: 'blur',
						validator: (_, value) => {
							if (!value.trim()) {
								console.log(111)
								return new Error('姓名不能为空')
							}
							if (value.length < 2 || value.length > 10) {
								return new Error('姓名长度应在2到10个字符之间')
							}
							return true
						}
					}
				}"
			>
				<NFormItem label="姓名" path="username">
					<NInput v-model:value.trim="formValue.username" placeholder="输入姓名" />
				</NFormItem>
			</NForm>
			<NAlert class="my-4" title="注意" type="warning">
				<p>1. 请确保填写正确的姓名, 这需要与您简历上的姓名一致</p>
				<p>2. 只能提交一次, 请检查好后提交</p>
			</NAlert>
			<div class="flex justify-center mt-2">
				<NButton class="px-10" type="success" @click="handleSubmit" :loading="isLoading">
					<template #icon>
						<Icon icon="material-symbols:local-post-office-rounded"></Icon>
					</template>
					提交
				</NButton>
			</div>
		</NCard>
	</NModal>
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
		border-top: 3px solid var(--green);
		border-bottom: 1px solid var(--border);
		position: relative;
		z-index: 10;
		height: var(--nav-height);
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
</style>
