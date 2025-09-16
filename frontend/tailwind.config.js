

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // adjust if needed
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
    
  },
  plugins: [],
};


