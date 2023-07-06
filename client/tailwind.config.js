/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bg-landing': "url('./assets/backGroundLanding.jpg')",
        'bg-home': "url('./assets/backGroundHome.jpg')"
      },
      backgroundPosition: {
        paddingRight: '90% 0%',
        paddingRightTop: '54% 0%'
      }
    }
  },
  plugins: [],
}

