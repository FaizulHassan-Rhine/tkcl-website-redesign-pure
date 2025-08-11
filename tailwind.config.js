/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1800px', // Custom container max width
      },
    },
   extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }, // move only half, because we duplicated content
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
    },
  },
  // darkMode: 'class',
 plugins: [
  require('@tailwindcss/aspect-ratio'),
  require('@tailwindcss/line-clamp')
],
  
}
