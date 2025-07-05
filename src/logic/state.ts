import { useDateFormat, useEventListener, useNow, useMagicKeys, clamp } from '@vueuse/core'
import { useCryptSessionStorage } from '../hooks/useCryptSessionStorage'
import { useLeaveWindowCounter } from '../hooks/useLeaveWindowCounter'
import { computed, watchEffect } from 'vue'

// 时间
export const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
// 开始时间
export const startTime = useCryptSessionStorage('playground-test-start-time', formatted.value)
// 当前的代码
export const state = useCryptSessionStorage(
	'playground-serialized-state',
	location.hash.slice(1) ||
		'eNp9Us9rFDEU/ldiLqtQZxA91WlBpaAeVFTwkssym51OnUlCklkHhgEFdYtt3XqwUKuwYHteT1Y7q3/NxrGn/gu+ZPpjLWUvIfm+7328974U+JYQXi+jeB4HKpSx0EhRnYlFwnwf/R3tm9Xh4fZuvXsw+b02qb7Ww1dm83093jJvt53kaLyGzLuhGeybwcis7pjqwPodjde9FWVPrf5s9SfVd7jXOz/M6Kf5/M18eYk8P89zK0Vm/NG82XNuZrBu+lVjU3963VSC8aTaO+xvmA+/zOYGYXEquNToLk0S/ozLpIO6kqeo5flnkHVu3SQs8JuxYCB4aJqKpK0pvBAKpgx8QAJ/isZzWKuQs24cwSCcwYIKW0RwyFMRJ1Q+FDrmTBE8jxxjuTYYvrjvMC0zOneCh8s0fH4BvqJyixH8SFJFZY8SfMrptoyobuilJw9oDvdTMuWdLAH1DPIxVTzJbI+N7HbGOtD2lM51e88tM2bRU7WUa8rUyVC2UassnZ5gWOidGaOftXvdu+HqCCthi/9HcsE/O06zQJJ2UXkcpU3PJgYJKI1SFaEFy19uOTvk/C61rszOd/naYlG44rIMfHg5NGYi06h3FbZEkwXYlooIPv8BcPkPe3g19w=='
)
// 当前代码长度
export const codeLength = useCryptSessionStorage('playground-code-length', 0)
// 是否提交
export const isSubmited = useCryptSessionStorage('playground-has-submitted', false)
// 键入次数
export const typeCount = useCryptSessionStorage('playground-type-count', 0)
export const typeSpaceCount = useCryptSessionStorage('playground-type-space-count', 0)
export const typeEnterCount = useCryptSessionStorage('playground-type-enter-count', 0)
export const typeDeleteCount = useCryptSessionStorage('playground-type-delete-count', 0)

// 离开窗口次数与时间
export const { leaveCount: leaveWindowCount, leaveTimes: leaveWindowTimes } = useLeaveWindowCounter(
	useCryptSessionStorage('playground-leave-window-count', 0),
	useCryptSessionStorage('playground-leave-window-times', [])
)
// 离开窗口总时间
export const leaveWindowTotalTime = computed(() => {
	return Math.round(
		leaveWindowTimes.value.reduce((total, cur) => {
			total += parseFloat(cur) || 0
			return total
		}, 0)
	)
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

const { Ctrl_C, Meta_C, Ctrl_V, Meta_V, Space, Delete, Enter } = useMagicKeys({})

watchEffect(() => {
	if (Ctrl_V.value || Meta_V.value) {
		pasteCount.value += 1
	}
	if (Ctrl_C.value || Meta_C.value) {
		copyCount.value += 1
	}
	if (Space.value) {
		typeSpaceCount.value += 1
	}
	if (Delete.value) {
		typeDeleteCount.value += 1
	}
	if (Enter.value) {
		typeEnterCount.value += 1
	}
  
	guessCopyFromOtherTabCount.value = clamp(pasteCount.value - copyCount.value, 0, Infinity)
})
