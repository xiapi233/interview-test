/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['index.html', 'src/**/*.{vue,mdx,js,ts,jsx,tsx,less,css}', "packages/playground/src/*.{vue,mdx,less,css}"],
	plugins: [
		function ({ addComponents }) {
			addComponents({
				'.flex-cc': {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}
			})
		}
	]
}
