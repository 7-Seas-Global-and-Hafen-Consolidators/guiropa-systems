import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Base path = nome do repositório no GitHub (Pages: /org/repo/) */
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/guiropa-systems/' : '/',
}))
