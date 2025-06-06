// ‼️ DO NOT MODIFY THIS FILE ‼️
import { expectType } from 'tsd'
import { PubSub } from '../PubSub'

type Events = {
	click: [x: number, y: number]
	close: []
	message: [text: string]
}

const pubsub = new PubSub<Events>()

// ✅ 正确类型的 subscribe 调用
pubsub.subscribe('click', (x, y) => {
	expectType<number>(x)
	expectType<number>(y)
})

pubsub.subscribe('close', () => {})
pubsub.subscribe('message', (text) => {
	expectType<string>(text)
})

// ✅ 正确类型的 publish 调用
pubsub.publish('click', 10, 20)
pubsub.publish('close')
pubsub.publish('message', 'hello')

// ✅ 正确的 unsubscribe
const handler = (x: number, y: number) => {}
pubsub.unsubscribe('click', handler)

// ✅ 正确的 clear 调用
pubsub.clear('click')
pubsub.clear()

// ----------------------------
// ❌ 类型错误，应该触发 @ts-expect-error
// ----------------------------

/** @ts-expect-error 参数数量错误 */
pubsub.publish('click', 10) // 少一个参数

/** @ts-expect-error 参数类型错误 */
pubsub.publish('message', 123) // 应该是 string

/** @ts-expect-error 回调参数类型错误 */
pubsub.subscribe('click', (x: string, y: string) => {})

/** @ts-expect-error 事件名错误 */
pubsub.subscribe('unknown', () => {})

/** @ts-expect-error 清除不存在的事件 */
pubsub.clear('notExist')

/** @ts-expect-error unsubscribe 参数类型错误 */
pubsub.unsubscribe('message', (num: number) => {})
