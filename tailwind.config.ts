import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FAF7F0',
          100: '#F4EEE1',
          200: '#E7DEC9',
          300: '#D5C7A5',
          800: '#2A2722',
          900: '#1A1815',
        },
        field: {
          50: '#F0F5F2',
          100: '#DCE7E0',
          200: '#B8CFC2',
          600: '#2A523A',
          700: '#234430',
          800: '#1E3B2A',
          900: '#14271C',
          950: '#0C1811',
        },
        straw: {
          50: '#FBF8EF',
          100: '#F6EED5',
          200: '#ECDDAE',
          300: '#DFC87E',
          400: '#D8B25C',
          500: '#C79E45',
          600: '#A87F32',
        },
        ink: {
          DEFAULT: '#2B2523',
          muted: '#625955',
          faint: '#8E8580',
          inverse: '#FAF7F0',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: [
          'var(--font-atkinson)',
          'var(--font-noto-kannada)',
          'var(--font-noto-hindi)',
          'var(--font-noto-tamil)',
          'var(--font-noto-malayalam)',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        // Base body is at least 17px as requested
        base: ['1.0625rem', { lineHeight: '1.65' }],
        lg: ['1.1875rem', { lineHeight: '1.6' }],
        xl: ['1.375rem', { lineHeight: '1.5' }],
        '2xl': ['1.625rem', { lineHeight: '1.4' }],
        '3xl': ['2rem', { lineHeight: '1.3' }],
        '4xl': ['2.5rem', { lineHeight: '1.2' }],
        '5xl': ['3.25rem', { lineHeight: '1.15' }],
      },
      boxShadow: {
        editorial: '0 2px 0 0 rgba(43, 37, 35, 0.08)',
        card: '0 4px 20px -2px rgba(30, 59, 42, 0.06), 0 2px 6px -1px rgba(30, 59, 42, 0.04)',
        hover: '0 8px 30px -4px rgba(30, 59, 42, 0.12), 0 4px 10px -2px rgba(30, 59, 42, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
