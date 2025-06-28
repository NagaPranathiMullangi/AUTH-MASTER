import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',                 // Accept external connections (like IP/domain)
    port: 5174,   
    strictPort: true,                   // Optional, but good to lock it down
    allowedHosts: ['mytestapp.com']  // 👈 Allow your custom domain
  }
})
