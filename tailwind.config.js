/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      BalooBhaijaan2: ['BalboBrainpan2', 'cursive'],
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    screens: {
      'scrn-mob': {'max': '425px'},
      'scrn-tab': {'max': '780px', 'min': '426px'},
      'scrn-lap-S': {'max': '1024px', 'min': '781px'},
      'scrn-lap-L': {'max': '1440px', 'min': '1025px'},
      'scrn-4k': {'max': '2560px', 'min': '1441px'},
      'upto-lab-s': {'max': '1040px', 'min': '0px'},
    },
  },
  important: true,
  plugins: [],
}