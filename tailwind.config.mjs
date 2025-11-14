/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E1E',
        secondary: '#343D48',
        background: '#FFFFFF',
        accent: '#0F213708',
        white: '#FFFFFF',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'sans-serif'],
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
export default config;
