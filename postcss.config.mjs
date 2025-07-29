/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    // Disable autoprefixer and other optimizations that might cause CSS parsing issues
    ...(process.env.NODE_ENV === 'production' ? {} : { autoprefixer: {} }),
  },
};

export default config;
