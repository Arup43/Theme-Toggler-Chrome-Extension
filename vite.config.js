import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'

// Function to copy files from public to dist after build
function copyPublicFiles() {
  return {
    name: 'copy-public-files',
    closeBundle() {
      // List of files to copy (exclude those already copied by default)
      const filesToCopy = ['content.js', 'background.js'];

      for (const file of filesToCopy) {
        const srcPath = path.resolve('public', file);
        const destPath = path.resolve('dist', file);

        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied ${file} to dist/`);
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyPublicFiles()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(fileURLToPath(new URL('.', import.meta.url)), 'popup.html')
      },
      output: {
        entryFileNames: '[name].js',
      }
    }
  }
})
