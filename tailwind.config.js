/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    // keyframes: {
    //   wiggle: {
    //     '0%, 100%': { transform: 'none' },
    //     '50%': { transform: 'translateY(-2%)' },
    //   }
    // },
    fontFamily: {
      BalooBhaijaan2: ['BalboBrainpan2', 'cursive'],
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    screens: {
      'scrn-mob': {'max': '425px'},
      'scrn-tab': {'max': '780px', 'min': '426px'},
      'scrn-lap-S': {'max': '1024px', 'min': '781px'},
      'scrn-lap-L': {'max': '1440px', 'min': '1024px'},
      'scrn-lap-max-L': {'max': '1440px'},
      'scrn-4k': {'max': '2560px', 'min': '1441px'},
      'upto-lab-s': {'max': '1040px', 'min': '0px'},
    },
  },
  important: true,
  plugins: [],
}