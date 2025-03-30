import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173, // Default to 5173 if PORT is not set
    host: '0.0.0.0' // Allow external access (important for Render)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
