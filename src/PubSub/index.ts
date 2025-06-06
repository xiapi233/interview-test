// =========================
// ✅ 请从在这里开始实现
// =========================

type Callback = (...args: any) => void

export interface PubSub {
	events: Record<string, any[]>
	subscribe(event: any, cb: Callback): void
	unsubscribe(event: any, cb: Callback): void
	publish(event: any, ...args: any): void
	clear(event?: any): void
}

export class PubSub<T = any> implements PubSub {
	events: Record<string, any[]>
	constructor() {
		this.events = {}
	}
	subscribe(event: any, cb: Callback): void {
		// TODO: logic
	}
	unsubscribe(event: any, cb: Callback): void {
		// TODO: logic
	}
	publish(event: any, ...args: any): void {
		// TODO: logic
	}
	clear(event?: any): void {
		// TODO: logic
	}
}
