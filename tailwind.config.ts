import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        base: {
          0: 'rgb(0,0,0)',
          1: 'rgb(32,32,32)',
          2: 'rgb(64,64,64)',
          3: 'rgb(96,96,96)',
          4: 'rgb(128,128,128)',
          5: 'rgb(160, 160,160)',
          6: 'rgb(192,192,192)',
          7: 'rgb(224,224,224)',
          8: 'rgb(255,255,255)'
        },
        my: {
          // light
          light: 'rgb(255,255,255)',

          // dark
          dark: 'rgb(0,0,0)',

          // bg
          bg: 'rgba(255,255,255, 1)', // white
          bgHover: 'rgba(230, 232, 234, 1)',

          darkbg0: 'rgba(22, 22, 26, 1)',
          darkbg1: 'rgba(35, 36, 41, 1)',
          darkbg2: 'rgba(53, 54, 60, 1)',
          darkbg3: 'rgba(67, 68, 74, 1)',
          darkbg4: 'rgba(79, 81, 89, 1)',
          darkbgHover: 'rgba(167,171,176, 1)',

          // text
          text0: 'rgba(28,31,35, 1)', // grey-9
          text1: 'rgba(28,31,35, .8)',
          text2: 'rgba(28,31,35, .62)',
          text3: 'rgba(28,31,35, .35)',

          darktext0: 'rgba(249,249,249, 1)', // grey-9 (dark)
          darktext1: 'rgba(249,249,249, .8)',
          darktext2: 'rgba(249,249,249, .62)',
          darktext3: 'rgba(249,249,249, .35)',

          // border
          border: 'rgba(28,31,35, .08)', // grep-9

          darkborder: 'rgba(255,255,255, .08)', // white

          // button
          button0: 'rgba(0, 149, 238, 1)', // light-blue-5

          darkButton0: 'rgba(64, 180, 243, 1)', // light-blue-5 (dark)

          // primary
          primary: 'rgba(0, 119, 250, 1)', // blue-5
          primaryHover: 'rgba(0, 98, 214, 1)', // blue-6
          primaryActive: 'rgba(0, 79, 179, 1)', // blue-7
          primaryDisabled: 'rgba(152, 205, 253)', // blue-2

          darkPrimary: 'rgba(84, 169, 255, 1)', // blue-5 (dark)
          darkPrimaryHover: 'rgba(127, 193, 255, 1)', // blue-6 (dark)
          darkPrimaryActive: 'rgba(169, 215, 255, 1)', // blue-7 (dark)
          darkPrimaryDisabled: 'rgba(19, 92, 184)', // blue-2 (dark)

          // secondary
          secondary: 'rgba(0, 149, 238, 1)', // light-blue-5
          secondaryHover: 'rgba(0, 123, 202, 1)', // light-blue-6
          secondaryActive: 'rgba(0, 99, 167, 1)', // light-blue-7

          // tertiary
          tertiary: 'rgba(107, 112, 115, 1)', // grey-5
          tertiaryHover: 'rgba(85, 91, 97, 1)', // grey-6
          tertiaryActive: 'rgba(65, 70, 76, 1)', // grey-7

          darkTertiary: 'rgba(136, 141, 146, 1)', // grey-5 (dark)
          darkTertiaryHover: 'rgba(167, 171, 176, 1)', // grey-6 (dark)
          darkTertiaryActive: 'rgba(198, 202, 205, 1)' // grey-7 (dark)
        }
      },
      fontFamily: {
        serif: [
          'Noto Serif SC',
          'serif',
          '"Times New Roman"',
          'Times',
          '"Apple Color Emoji" !important'
        ]
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
export default config;
