
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				telegram: {
					blue: '#2AABEE',
					darkBlue: '#229ED9',
					bg: '#17212B', // Updated for dark theme
					card: '#242F3D', // New card background for dark theme
					text: '#F5F5F5', // Text color for dark theme
				},
				huriky: {
					yellow: '#FFC700', // More vibrant yellow
					black: '#0F1621', // Darker black for backgrounds
					darkCard: '#1A2736', // Darker card background
					card: '#223447',
					glow: 'rgba(255, 199, 0, 0.15)', // Yellow glow effect
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"lightning-flash": {
					"0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 5px #FFC700)" },
					"50%": { opacity: "0.6", filter: "drop-shadow(0 0 2px #FFC700)" },
				},
				"pulse-yellow": {
					"0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 199, 0, 0.4)" },
					"50%": { boxShadow: "0 0 0 10px rgba(255, 199, 0, 0)" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"lightning-flash": "lightning-flash 2s ease-in-out infinite",
				"pulse-yellow": "pulse-yellow 2s infinite"
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
