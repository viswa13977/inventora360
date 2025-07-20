// ✅ correct for Tailwind v4
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/** @type {import('postcss').Config} */
export default {
  plugins: [tailwindcss, autoprefixer],
};
