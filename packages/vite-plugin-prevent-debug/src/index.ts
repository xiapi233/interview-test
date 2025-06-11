import fs from 'node:fs'
import path from 'node:path'

import { minify } from 'uglify-js'
import { type Plugin } from 'vite'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

export interface PreventDebugOptions {
	/**
	 * development env enable
	 */
	devEnable?: boolean
}
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export function preventDebug(options: PreventDebugOptions = {}): Plugin<any> {
	const defaultOptions = {
		devEnable: false
	}

	options = Object.assign(defaultOptions, options) as Required<PreventDebugOptions>
	let isProd = false
	const endHeadTagReg = /<\/head>/i

	return {
		name: 'preventDebug',
		enforce: 'post',
		config(_, { command }) {
			isProd = command === 'build'
		},
		transformIndexHtml(index) {
			if (!options.devEnable && !isProd) return
			const injectCode = fs.readFileSync(path.resolve(__dirname, './preventDebug.js'), { encoding: 'utf-8' })
			const { code } = minify(injectCode, {
				mangle: {
					toplevel: true,
					properties: true,
					// eslint-disable-next-line @typescript-eslint/naming-convention
					keep_fnames: false
				}
			})

			return index.replace(endHeadTagReg, () => {
				return `  <script>
      ${code}
    </script>
  </head>`
			})
		}
	}
}
