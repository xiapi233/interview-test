import { useEventListener } from '@vueuse/core'
import { ref, type Ref, isRef } from 'vue'
export function useLeaveWindowCounter(initialCount: Ref<number> | number, initialTimes: Ref<string[]> | string[] = []) {
	const leaveCount = isRef(initialCount) ? initialCount : ref(initialCount)

	const leaveTimes = isRef(initialTimes) ? initialTimes : ref<string[]>(initialTimes)
	let leaveStartTime: number | null = null
	const handleVisibility = () => {
		if (document.hidden) {
			leaveCount.value++
			leaveStartTime = Date.now()
		} else if (leaveStartTime) {
			const leaveDuration = Date.now() - leaveStartTime
			const formattedDuration = leaveDuration / 1000 / 60
			leaveTimes.value.push(`${formattedDuration.toFixed(1)}`)
		}
	}

	useEventListener(document, 'visibilitychange', handleVisibility)

	return { leaveCount, leaveTimes }
}
