/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				loading: 'spin 1s linear infinite',
			},
		},
	},
	plugins: [],
}
