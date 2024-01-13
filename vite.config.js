import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  resolve: {
    alias: {
      // all possible aliases 

      '@assets': path.resolve(__dirname, './src/assets'), // Add this line
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr'],
  plugins: [
    react(),
    glsl({
      include: [                   // Glob pattern, or array of glob patterns to import
        '**/*.glsl', '**/*.wgsl',
        '**/*.vert', '**/*.frag',
        '**/*.vs', '**/*.fs'
      ],
      exclude: undefined,          // Glob pattern, or array of glob patterns to ignore
      warnDuplicatedImports: true, // Warn if the same chunk was imported multiple times
      defaultExtension: 'glsl',    // Shader suffix when no extension is specified
      compress: false,             // Compress output shader code
      watch: true,
      root: './',       // Root directory for resolving imports
    })],
  publicDir: "./public",
  server: true,
})
