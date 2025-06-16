export function xorEncrypt(str: string, key = 42) {
	return btoa([...str].map((c) => String.fromCharCode(c.charCodeAt(0) ^ key)).join(''))
}

export function xorDecrypt(encStr: string, key = 42) {
	const raw = atob(encStr)
	return [...raw].map((c) => String.fromCharCode(c.charCodeAt(0) ^ key)).join('')
}
