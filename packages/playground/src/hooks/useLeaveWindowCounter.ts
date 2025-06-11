import { ref, onMounted, onUnmounted, type Ref, isRef } from 'vue'

export function useLeaveWindowCounter(initialCount: Ref<number> | number) {
	const leaveCount = isRef(initialCount) ? initialCount : ref(initialCount)

	const handleVisibility = () => {
		if (document.hidden) {
			leaveCount.value++
		}
	}

	onMounted(() => {
		document.addEventListener('visibilitychange', handleVisibility)
	})

	onUnmounted(() => {
		document.removeEventListener('visibilitychange', handleVisibility)
	})

	return { leaveCount }
}
