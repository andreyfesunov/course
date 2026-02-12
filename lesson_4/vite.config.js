import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        headers: {
            'X-Content-Type-Options': 'nosniff'
        }
    }
})