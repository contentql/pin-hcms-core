import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      colors: {
        primary: '#A978DE',
        'primary-focus': '#8C5DB9',
        'primary-content': '#FFFFFF',

        secondary: '#DE78C5',
        'secondary-focus': '#B95DA3',
        'secondary-content': '#ffffff',

        accent: '#d99330',
        'accent-focus': '#b57721',
        'accent-content': '#ffffff',

        neutral: '#110e0e',
        'neutral-focus': '#060404',
        'neutral-content': '#ffffff',

        'base-100': '#171212',
        'base-200': '#1f2937',
        'base-300': '#060404',
        'base-content': '#ffffff',

        info: '#66c7ff',
        success: '#87cf3a',
        warning: '#e1d460',
        error: '#ff6b6b',
      },
      borderRadius: {
        'rounded-box': '1rem',
        'rounded-btn': '.2rem',
        'rounded-badge': '1.9rem',
      },
    },
  },
  prefix: '',
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}

export default config
