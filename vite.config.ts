import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/tic-tac-toe-react/', // <-- your repo name with slashes!
  plugins: [react()],
})
