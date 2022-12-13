/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './build/**/*.{js,jsx,ts,tsx,pug,html}',
    './views/*.{pug, html}',
  ],
  purge: {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './src/pages/**/*.{js,jsx,ts,tsx}',
      './src/components/**/*.{js,jsx,ts,tsx}',
    ],
  },
  theme: {
    extend: {
      colors: {
        vorboss1: '#D6976A',
        vorboss2: '#132E34',
        vorboss3: '#1A1A1A',
        vorboss4: '#D3D3D3',
      },
    },
  },
  plugins: [],
};
