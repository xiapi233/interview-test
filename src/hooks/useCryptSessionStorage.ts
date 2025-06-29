import { useSessionStorage } from '@vueuse/core'
import { xorDecrypt, xorEncrypt } from '../utils/crypto'

export function useCryptSessionStorage<T>(key: string, initialValue: T) {
	const conditionKey = import.meta.env.DEV ? key : xorEncrypt(key)

	return useSessionStorage(conditionKey, initialValue, {
		serializer: {
			read: (value) => {
				return JSON.parse(import.meta.env.DEV ? value : xorDecrypt(value))
			},
			write: (value) => {
				return import.meta.env.DEV ? JSON.stringify(value) : xorEncrypt(JSON.stringify(value))
			}
		}
	})
}
