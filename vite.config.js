import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // This makes the server accessible externally
    hmr: {
      host: 'siplus.smpplusbabussalam.my.id',
      protocol: 'ws',
    },
    allowedHosts: ['siplus.smpplusbabussalam.my.id', 'ajwan.xyz'],
  },
})