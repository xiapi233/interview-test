import { useDateFormat, useEventListener, useNow, useMagicKeys, clamp } from '@vueuse/core'
import { useCryptSessionStorage } from '../hooks/useCryptSessionStorage'
import { useLeaveWindowCounter } from '../hooks/useLeaveWindowCounter'
import { computed, watchEffect } from 'vue'

// 时间
export const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
// 开始时间
export const startTime = useCryptSessionStorage('playground-test-start-time', formatted.value)
// 当前的代码
export const state = useCryptSessionStorage('playground-serialized-state', '')
// 是否提交
export const isSubmited = useCryptSessionStorage('playground-has-submitted', false)
// 键入次数
export const typeCount = useCryptSessionStorage('playground-type-count', 0)
// 离开窗口次数与时间
export const { leaveCount: leaveWindowCount, leaveTimes: leaveWindowTimes } = useLeaveWindowCounter(
	useCryptSessionStorage('playground-leave-window-count', 0),
	useCryptSessionStorage('playground-leave-window-times', [])
)
// 离开窗口总时间
export const leaveWindowTotalTime = computed(() => {
	leaveWindowTimes.value.reduce((total, cur) => {
		total += parseFloat(cur) || 0
		return total
	}, 0)
})
// 粘贴次数
export const pasteCount = useCryptSessionStorage('playground-paste-count', 0)
// 复制次数
export const copyCount = useCryptSessionStorage('playground-copy-count', 0)
// 猜测从其他标签页复制的次数
export const guessCopyFromOtherTabCount = useCryptSessionStorage('playground-copy-from-other-tab-count', 0)
// 离开窗口时间
useEventListener('keydown', () => {
	typeCount.value += 1
})

const { Ctrl_C, Meta_C, Ctrl_V, Meta_V } = useMagicKeys({})

watchEffect(() => {
	if (Ctrl_V.value || Meta_V.value) {
		pasteCount.value += 1
	}
	if (Ctrl_C.value || Meta_C.value) {
		copyCount.value += 1
	}
	guessCopyFromOtherTabCount.value = clamp(pasteCount.value - copyCount.value, 0, Infinity)
})
