module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Disable CSS minification for development and deployment stability
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: false
    }),
  },
}