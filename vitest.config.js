const { defineConfig } = require('vite')
const path = require('path')

module.exports = defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'app': path.join(__dirname, '.'),
      'src': path.join(__dirname, 'src'),
      'layouts': path.join(__dirname, 'src/layouts'),
      'components': path.join(__dirname, 'src/components'),
      'pages': path.join(__dirname, 'src/pages'),
      'stores': path.join(__dirname, 'src/stores'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
