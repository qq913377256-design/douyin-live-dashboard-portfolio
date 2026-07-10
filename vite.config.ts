import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/douyin-live-dashboard-portfolio/',
  plugins: [react()],
})
