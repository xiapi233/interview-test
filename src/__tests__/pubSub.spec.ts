import { describe, it, expect, vi } from 'vitest'
import { PubSub } from '../PubSub'

describe('PubSub', () => {
	type Events = {
		click: [number, number]
		close: []
		message: [string]
	}

	const pubsub = new PubSub<Events>()

	it('should call click handler', () => {
		const fn = vi.fn()
		pubsub.subscribe('click', fn)
		pubsub.publish('click', 100, 200)
		expect(fn).toHaveBeenCalledWith(100, 200)
	})

	it('should unsubscribe correctly', () => {
		const fn = vi.fn()
		pubsub.subscribe('message', fn)
		expect(pubsub.events).toHaveProperty('message', fn)

		pubsub.unsubscribe('message', fn)
		pubsub.publish('message', 'hello')

		expect(fn).not.toHaveBeenCalled()
	})

	it('should clear single event handlers', () => {
		const fn = vi.fn()
		pubsub.subscribe('click', fn)
		expect(pubsub.events).toHaveProperty('click', fn)

		pubsub.clear('click')
		pubsub.publish('click', 1, 2)
		expect(fn).not.toHaveBeenCalled()
	})

	it('should clear all handlers', () => {
		const f1 = vi.fn()
		const f2 = vi.fn()

		pubsub.subscribe('click', f1)
		pubsub.subscribe('message', f2)
    expect(pubsub.events).toHaveProperty('click', f1)
    expect(pubsub.events).toHaveProperty('message', f2)
		
    pubsub.clear()
		pubsub.publish('click', 0, 0)
		pubsub.publish('message', 'test')
		expect(f1).not.toHaveBeenCalled()
		expect(f2).not.toHaveBeenCalled()
	})

	it('should allow multiple subscriptions', () => {
		const f1 = vi.fn()
		const f2 = vi.fn()
		pubsub.subscribe('close', f1)
		pubsub.subscribe('close', f2)
		pubsub.publish('close')
		expect(f1).toHaveBeenCalled()
		expect(f2).toHaveBeenCalled()
	})
})
