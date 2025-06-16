import { useSessionStorage } from '@vueuse/core';
import { xorDecrypt, xorEncrypt } from '../utils/crypto';

export function useCryptSessionStorage<T>(key: string, initialValue: T) {
	return useSessionStorage(xorEncrypt(key), initialValue, {
		serializer: {
			read: (value) => {
				return JSON.parse(xorDecrypt(value))
			},
			write: (value) => {
				return xorEncrypt(JSON.stringify(value))
			}
		}
	})
}
