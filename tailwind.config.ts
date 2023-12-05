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
          // bg
          bg: 'rgba(255,255,255, 1)',
          bgHover: 'rgba(230, 232, 234, 1)',
          // text
          text0: 'rgba(28,31,35, 1)',
          text1: 'rgba(28,31,35, .8)',
          text2: 'rgba(28,31,35, .62)',
          text3: 'rgba(28,31,35, .35)',
          // border
          border: 'rgba(28,31,35, .08)',

          // dark
          dark: 'rgb(0,0,0)',
          // bg
          darkbg0: 'rgba(22, 22, 26, 1)',
          darkbg1: 'rgba(35, 36, 41, 1)',
          darkbg2: 'rgba(53, 54, 60, 1)',
          darkbg3: 'rgba(67, 68, 74, 1)',
          darkbg4: 'rgba(79, 81, 89, 1)',
          darkbgHover: 'rgba(167,171,176, 1)',
          // text
          darktext0: 'rgba(249,249,249, 1)',
          darktext1: 'rgba(249,249,249, .8)',
          darktext2: 'rgba(249,249,249, .62)',
          darktext3: 'rgba(249,249,249, .35)',
          // border
          darkborder: 'rgba(255,255,255, .08)',

          // button
          button0: 'rgba(0, 149, 238, 1)',
          darkButton0: 'rgba(64, 180, 243, 1)',

          // primary
          primary: 'rgba(0, 119, 250, 1)',
          darkPrimary: 'rgba(84, 169, 255, 1)'
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
  plugins: []
};
export default config;
