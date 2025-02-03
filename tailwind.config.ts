import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'selector',
	theme: {
		extend: {
			colors: {
				primary: {
					'50': '#f3fafa',
					'100': '#d6f1ee',
					'200': '#ade2df',
					'300': '#7cccca',
					'400': '#4ba7a7',
					'500': '#379395',
					'600': '#2a7477',
					'700': '#255d60',
					'800': '#214b4e',
					'900': '#203f41',
					'950': '#0d2426',
				},
				secondary: {
					'50': '#fdf4f3',
					'100': '#fce7e4',
					'200': '#fad3ce',
					'300': '#f5b4ac',
					'400': '#f09b91',
					'500': '#e16152',
					'600': '#cd4535',
					'700': '#ac3729',
					'800': '#8f3025',
					'900': '#772e25',
					'950': '#40140f',
				}
			}
		}
	},

	plugins: [typography, forms, flowbitePlugin]
} satisfies Config;
