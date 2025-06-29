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
		'eNp9UstOwzAQ/BXjS0AqiRCcSloJUCXgAAiQuPhSpdvUxbEte10qRfl31i59gGhu2Zmd1XgmLb+xNl8F4ENe+spJi8wDBjsWWjbWOGT3oJT5ME7N2NyZhmV5sYeiNLsWuiw2YpLRgNBYNUWgibHy4EBBSFkc0HzA0VdGz2WdL73RZKONIsEr01ipwD1blEZ7wYcsMZGb0sGvx4ShCzDY4tUCqs9/8KVfR0zwFwce3AoE33E4dTXghp68PcGavndkY2ZB0XYP+QreqBA9btZug56R7YO95PYhhSl1/e4nawTtt4+KRuNml/YFp0Dvep6+t3uZXyWd0B2l+LuS4222zMGcdT9VxvZiY9SAR9b4mo0if5qlcyzdO8nO+vtdXIzbNom7rixoSqjUNiBbnVNKoEaUlq8F//sD8O4bP7jW4g=='
)
// 当前代码长度
export const codeLength = useCryptSessionStorage('playground-code-length', 0)
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
