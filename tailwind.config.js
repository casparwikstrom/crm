const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    './pages/**/*.js',
    './pages/**/*.jsx',
    './components/**/*.js',
    './components/**/*.jsx',
    './layouts/**/*.js',
    './lib/**/*.js',
    './data/**/*.mdx',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '375px',
        desktop: '940px',
      },
      spacing: {
        '9/16': '56.25%',
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      fontSize: {
        heading: '2rem',
        'heading-mobile': '1.5rem',
        'body-l': '1rem',
        'body-m': '0.875rem',
        'body-s': '0.75rem',
        14: '0.875rem',
      },
      boxShadow: {
        form: '0px 25px 40px 0px rgba(0, 0, 0, 0.13)',
      },
      borderRadius: {
        small: '4px',
        large: '8px',
        sidebar: '10px',
        main: '15px',
      },
      colors: {
        primary: colors.sky,
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
        'purple-hover': '#928CFF',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: `${theme('colors.primary.500')}`,
              '&:hover': {
                color: `${theme('colors.primary.500')}`,
              },
              code: { color: theme('colors.primary.500') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
              marginBottom: '0',
            },
            h2: {
              fontWeight: '800',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
              
              marginBottom: '0',
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
              marginBottom: '0',
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
              marginBottom: '0',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: '#deddff80',
              borderLeft: 'solid 5px #0800ff5c',
              padding: '1rem',
              borderRadius: '4px',
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
              backgroundColor: '#deddff80',
              borderLeft: 'solid 5px #0800ff5c',
              padding: '1rem',
              borderRadius: '4px',
            },
            details: {
              backgroundColor: '#deddff80',
              borderLeft: 'solid 5px #0800ff5c',
              padding: '1rem',
              borderRadius: '4px',
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
            a: {
              color: `${theme('colors.primary.500')}`,
              '&:hover': {
                color: `${theme('colors.primary.500')}`,
              },
              code: { color: theme('colors.primary.500') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.white'),
              marginBottom: '0',
            },
            h2: {
              fontWeight: '800',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.white'),
              marginBottom: '0',
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.white'),
              marginBottom: '0',
            },
            'h4,h5,h6': {
              color: theme('colors.white'),
              marginBottom: '0',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            li: {
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
              backgroundColor: '#deddff80',
              borderLeft: 'solid 5px #0800ff5c',
              padding: '1rem',
              borderRadius: '4px',
            },
            
          },
        },
      }),
    },
  },
  plugins: [
   require('@tailwindcss/typography')
  ],
};
