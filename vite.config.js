import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Mesma base do app do Koda: React 19 + Vite + Tailwind 4.
// `base: './'` para o `dist/` abrir por duplo clique (file://) sem quebrar os caminhos.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      /**
       * A API do Tauri não existe no navegador.
       *
       * Os componentes copiados do app (`src/koda/`) importam `@tauri-apps/api/*` — o
       * `PainelLateral` usa para embutir o Painel Dev como webview nativo. No site não há
       * Tauri, e não precisa: o próprio componente já sabe cair no `iframe` quando não está
       * no app. O apelido troca a biblioteca por um punhado de funções vazias, e é o que
       * faz a barra lateral do app rodar no site sem gambiarra no componente.
       */
      '@tauri-apps/api/core': fileURLToPath(new URL('./src/koda/tauri-stub.js', import.meta.url)),
      '@tauri-apps/api/window': fileURLToPath(new URL('./src/koda/tauri-stub.js', import.meta.url)),
      '@tauri-apps/api/webview': fileURLToPath(new URL('./src/koda/tauri-stub.js', import.meta.url)),
      '@tauri-apps/api/dpi': fileURLToPath(new URL('./src/koda/tauri-stub.js', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5180,
  },
})
