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
      Itim: ['Itim', 'cursive'],
      Trochut: ['Trochut', 'cursive'],
      Trispace: ['Trispace', 'sans-serif'],
    },
    screens: {
      'scrn-mob': {'max': '425px'},
      'scrn-tab': {'max': '880px'},
      'scrn-lap-S': {'max': '1280px'},
      'scrn-lap-L': {'max': '1440px', 'min': '1024px'},
      'scrn-lap-max-L': {'max': '1440px'},
      'scrn-4k': {'max': '2560px', 'min': '1441px'},
      'upto-lab-s': {'max': '1040px', 'min': '0px'},
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },
  },
  important: true,
  plugins: [],
}