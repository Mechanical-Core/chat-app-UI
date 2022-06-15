import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  target: "es6",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Style': path.resolve(__dirname, './src/sass/style.css'),
      '@Graphics': path.resolve(__dirname, './src/static/Graphics'),
      '@React': path.resolve(__dirname, './src/static/React'),
    }
  },
})
