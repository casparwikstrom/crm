const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const { join } = require('path');

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    './pages/**/*.js',
    './pages/**/*.jsx',
    './components/**/*.js',
    './components/**/*.jsx',
    './layouts/**/*.js',
    './lib/**/*.js',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        mobile: '375px',
        desktop: '940px'
      },
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        p: '2',
        'normal': 'normal',
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif']
      },
      fontSize: {
        heading: '2rem',
        'heading-mobile': '1.5rem',
        'body-l': '1rem',
        'body-m': '0.875rem',
        'body-s': '0.75rem',
        14: '0.875rem'
      },
      boxShadow: {
        form: '0px 25px 40px 0px rgba(0, 0, 0, 0.13)'
      },
      borderRadius: {
        small: '4px',
        large: '8px',
        sidebar: '10px',
        main: '15px'
      },
      colors: {
        primary: colors.teal,
        gray: colors.neutral,
        border: '#D6D9E6',
        denim: '#022959',
        
        orange: '#FFAF7E',
        pink: '#F9818E',
        purple: '#483EFF',
        'light-blue': '#ABBCFF',
        'light-gray': '#D6D9E6',
        'red-errors': '#EE374A',
        'sky-blue': '#BEE2FD',
        'very-light-gray': '#F8F9FF',
        'denim-hover': '#164A8A',
        'purple-hover': '#928CFF'
      },

      typography: (theme) => {
        return {
          DEFAULT: {
            css: {
              color: theme('colors.gray.700'),
              a: {
                color: theme('colors.primary.500'),
                '&:hover': {
                  color: `${theme('colors.primary.600')} !important`,
                },
                code: { color: theme('colors.primary.400') },
              },
              h1: {
                fontWeight: '700',
                letterSpacing: theme('letterSpacing.tight'),
                color: theme('colors.gray.900'),
                marginBottom: '0', // This sets the margin-bottom to 0
              },
              h2: {
                fontWeight: '700',
                letterSpacing: theme('letterSpacing.tight'),
                color: theme('colors.gray.900'),
                marginBottom: '0', // This sets the margin-bottom to 0
              },
              h3: {
                fontWeight: '600',
                color: theme('colors.gray.900'),
                marginBottom: '0', // This sets the margin-bottom to 0
              },
              'h4,h5,h6': {
                color: theme('colors.gray.900'),
                marginBottom: '0', // This sets the margin-bottom to 0
              },
              pre: {
                backgroundColor: theme('colors.gray.800'),
              },
              code: {
                color: theme('colors.pink.500'),
                backgroundColor: theme('colors.gray.100'),
                // paddingLeft: '4px',
                // paddingRight: '4px',
                // paddingTop: '2px',
                // paddingBottom: '2px',
                borderRadius: '0.25rem',
              },
              'code::before': {
                content: 'none',
              },
              'code::after': {
                content: 'none',
              },
              details: {
                backgroundColor: theme('colors.gray.100'),
                // paddingLeft: '4px',
                // paddingRight: '4px',
                // paddingTop: '2px',
                // paddingBottom: '2px',
                borderRadius: '0.25rem',
              },
              hr: { borderColor: theme('colors.gray.200') },
              'ol li::marker': {
                fontWeight: '600',
                color: theme('colors.gray.500'),
              },
              'ul li::marker': {
                backgroundColor: theme('colors.gray.500'),
              },
              strong: { color: theme('colors.gray.600') },
              blockquote: {
                color: theme('colors.gray.900'),
                borderLeftColor: theme('colors.gray.200'),
              },
              a: {
                color: `${theme('colors.blue.400')} !important`,
                '&:hover': {
                  color: `${theme('colors.blue.400')} !important`,
                },
                code: { color: theme('colors.blue.400') },
              },
              li: {
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
              },
            },
          },
          dark: {
            css: {
              color: theme('colors.gray.300'),
              a: {
                color: `${theme('colors.blue.400')} !important`,
                '&:hover': {
                  color: `${theme('colors.blue.400')} !important`,
                },
                code: { color: theme('colors.blue.400') },
              },
              h1: {
                fontWeight: '700',
                letterSpacing: theme('letterSpacing.tight'),
                color: theme('colors.gray.100'),
                marginBottom: '0', // This sets the margin-bottom to 0
              },
              h2: {
                fontWeight: '700',
                letterSpacing: theme('letterSpacing.tight'),
                color: theme('colors.gray.100'),
                marginBottom: '0', // This sets the margin-bottom to 0
              },
              h3: {
                fontWeight: '600',
                color: theme('colors.gray.100'),
                marginBottom: '0', // This sets the margin-bottom to 0
              },
              'h4,h5,h6': {
                color: theme('colors.gray.100'),
                marginBottom: '0', // This sets the margin-bottom to 0
              },
              pre: {
                backgroundColor: theme('colors.gray.800'),
              },
              code: {
                backgroundColor: theme('colors.gray.800'),
              },
              details: {
                backgroundColor: theme('colors.gray.800'),
              },
              hr: { borderColor: theme('colors.gray.700') },
              'ol li::marker': {
                fontWeight: '600',
                color: theme('colors.gray.400'),
              },
              li:{
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
              },
              'ul li::marker': {
                backgroundColor: theme('colors.gray.400'),
              },
              strong: { color: theme('colors.gray.100') },
              thead: {
                th: {
                  color: theme('colors.gray.100'),
                },
              },
              tbody: {
                tr: {
                  borderBottomColor: theme('colors.gray.700'),
                },
              },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.700'),
              },
            },
          },
        }
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
