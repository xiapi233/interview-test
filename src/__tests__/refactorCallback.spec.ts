import { describe, it, expect, vi } from 'vitest'
import { nestedTimeouts } from '../refactorCallback'

vi.useFakeTimers()

describe('nestedTimeouts', () => {
	it('logs messages in correct order and timing', () => {
		const log = vi.spyOn(console, 'log').mockImplementation(() => {})

		nestedTimeouts()

		// nothing yet
		expect(log).not.toHaveBeenCalled()

		// +100ms => 111
		vi.advanceTimersByTime(100)
		expect(log).toHaveBeenCalledTimes(1)
		expect(log).toHaveBeenLastCalledWith(111)

		// +200ms => 222
		vi.advanceTimersByTime(200)
		expect(log).toHaveBeenCalledTimes(2)
		expect(log).toHaveBeenLastCalledWith(222)

		// +300ms => 333
		vi.advanceTimersByTime(300)
		expect(log).toHaveBeenCalledTimes(3)
		expect(log).toHaveBeenLastCalledWith(333)

		// +400ms => 444
		vi.advanceTimersByTime(400)
		expect(log).toHaveBeenCalledTimes(4)
		expect(log).toHaveBeenLastCalledWith(444)

		// +500ms => 555
		vi.advanceTimersByTime(500)
		expect(log).toHaveBeenCalledTimes(5)
		expect(log).toHaveBeenLastCalledWith(555)
	})
})
