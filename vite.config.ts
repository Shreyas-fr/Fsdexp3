import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// When deploying to GitHub Pages for a project site, set base to '/<repo-name>/'.
// Change 'Fsdexp3' below if you later rename the repository.
const repoName = 'Fsdexp3'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react(), tailwindcss()],
})
