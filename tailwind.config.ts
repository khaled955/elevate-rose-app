/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true
  	},
  	extend: {
  		backgroundImage: {
  			'overlay-black-50': 'linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5))',
  			'occasion-active': 'linear-gradient(180deg, rgba(0, 0, 0, .25), rgba(166, 37, 42, .25))'
  		},
  		fontFamily: {
  			primary: [
  				'var(--font-primary)'
  			],
  			pinyon: [
  				'var(--font-pinyon)'
  			],
  			diwany: [
  				'var(--font-diwany)'
  			],
  			'geist-sans': [
  				'var(--font-geist-sans)'
  			],
  			'geist-mono': [
  				'var(--font-geist-mono)'
  			],
  			edwardian: [
  				'var(--font-edwardian)'
  			],
  			zain: [
  				'var(--font-zain)'
  			]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			maroon: {
  				'50': '#fbeaea',
  				'100': '#f3c5c7',
  				'200': '#ea9fa2',
  				'300': '#e07a7d',
  				'400': '#d75458',
  				'500': '#cd2e33',
  				'600': '#a6252a',
  				'700': '#741c21',
  				'800': '#501419',
  				'900': '#2c0c10',
  				'950': '#20090c'
  			},
  			pink: {
  				'50': '#fff0f8',
  				'100': '#ffd6ec',
  				'200': '#ffaddc',
  				'300': '#ff84cb',
  				'400': '#ff5bba',
  				'500': '#f82ba9',
  				'600': '#d0198f',
  				'700': '#a41173',
  				'800': '#790a55',
  				'900': '#52043a',
  				'950': '#340021'
  			},
  			'soft-pink': {
  				'50': '#fff1f5',
  				'100': '#ffe0e7',
  				'200': '#ffc2d0',
  				'300': '#FFA3B9',
  				'400': '#ff85a2',
  				'500': '#ff668b',
  				'600': '#e65073',
  				'700': '#cc3a5b',
  				'800': '#b32443',
  				'900': '#99102c',
  				'950': '#590414'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
