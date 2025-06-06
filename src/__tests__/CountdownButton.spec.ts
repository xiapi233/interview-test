import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CountdownButton from '../CountdownButton/index.vue'

vi.useFakeTimers()

describe('CountdownButton', () => {
	beforeEach(() => {
		vi.clearAllTimers()
	})

	it('should render default slot content initially', () => {
		const wrapper = mount(CountdownButton, {
			props: { duration: 3 },
			slots: {
				default: '发送验证码'
			}
		})

		const button = wrapper.find('button')
		expect(button.text()).toBe('发送验证码')
		expect(button.attributes('disabled')).toBeUndefined()
	})

	it('should emit click and start countdown on click', async () => {
		const wrapper = mount(CountdownButton, {
			props: { duration: 3 },
			slots: {
				default: '发送验证码'
			}
		})

		const button = wrapper.find('button')

		await button.trigger('click')

		expect(wrapper.emitted('click')).toBeTruthy()
		expect(button.attributes('disabled')).toBeDefined()
		expect(button.text()).toContain('重新获取（3s）')
	})

	it('should count down and re-enable button', async () => {
		const wrapper = mount(CountdownButton, {
			props: { duration: 3 },
			slots: {
				default: '发送验证码'
			}
		})

		const button = wrapper.find('button')
		await button.trigger('click')

		expect(button.text()).toContain('3s')

		vi.advanceTimersByTime(1000)
		await wrapper.vm.$nextTick()
		expect(button.text()).toContain('2s')

		vi.advanceTimersByTime(2000)
		await wrapper.vm.$nextTick()
		expect(button.text()).toBe('发送验证码')
		expect(button.attributes('disabled')).toBeUndefined()
	})
})
