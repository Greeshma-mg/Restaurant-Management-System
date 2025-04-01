import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: 'postcss.config.cjs',
  },
  base: './'  // Add this line to use relative paths
})