/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './build/**/*.{js,jsx,ts,tsx,pug,html}',
  ],
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
