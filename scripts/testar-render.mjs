/**
 * Renderiza cada documento do site e reporta o que explode.
 *
 * O `vite build` não pega erro de **render**: uma prop com o nome errado compila sem
 * reclamar e só quebra quando o componente desenha. Foi assim que o cartão de compactação
 * deixou a tela preta — eu passei `compactacao` onde o componente espera `aviso`, e
 * `descrever(undefined)` estourou ao ler `.motivo`.
 *
 * Aqui cada documento é montado de verdade, com `renderToString`, e o relatório diz quais
 * falharam. É a conferência obrigatória depois de mexer nos componentes copiados do Koda.
 *
 * Como funciona: o esbuild empacota o `mapaTelas` (com JSX, imports e tudo) num arquivo só,
 * que o Node importa. É o mesmo caminho do Vite, sem subir navegador.
 *
 * Uso: node scripts/testar-render.mjs
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import * as esbuild from 'esbuild'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = join(aqui, '..')
const temporario = join(raiz, 'node_modules', '.cache', 'testar-render')

mkdirSync(temporario, { recursive: true })

// O ponto de entrada: o mapa mais o `sumario`, que ele não importa sozinho.
const entrada = join(temporario, 'entrada.jsx')
writeFileSync(
  entrada,
  `export { TELAS } from '${join(raiz, 'src/docs/mapaTelas.jsx').replace(/\\/g, '/')}'
export { PILARES } from '${join(raiz, 'src/docs/sumario.js').replace(/\\/g, '/')}'
`,
  'utf8',
)

const saida = join(temporario, 'pacote.mjs')

await esbuild.build({
  entryPoints: [entrada],
  outfile: saida,
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  /*
   * Só o React fica de fora — ele precisa ser **o mesmo** que o `react-dom/server` importa
   * aqui, senão os hooks quebram.
   *
   * O `lucide-react` (os ícones) é CommonJS, e um pacote `.mjs` não consegue `require`.
   * A saída é empacotá-lo junto: o esbuild resolve o CJS na hora do build e o módulo sai
   * achatado no arquivo.
   */
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/server'],
  banner: {
    js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);",
  },
  // O apelido do Tauri, igual ao `vite.config.js`: sem ele o `PainelLateral` não carrega.
  alias: {
    '@tauri-apps/api/core': join(raiz, 'src/koda/tauri-stub.js'),
    '@tauri-apps/api/window': join(raiz, 'src/koda/tauri-stub.js'),
    '@tauri-apps/api/webview': join(raiz, 'src/koda/tauri-stub.js'),
    '@tauri-apps/api/dpi': join(raiz, 'src/koda/tauri-stub.js'),
  },
  logLevel: 'error',
})

const { TELAS, PILARES } = await import(pathToFileURL(saida).href)
const { renderToString } = await import('react-dom/server')
const { createElement } = await import('react')

let ok = 0
const quebrados = []
const vazios = []

for (const pilar of PILARES) {
  for (const item of pilar.itens) {
    const chave = `${pilar.id}/${item.id}`
    const Tela = TELAS[chave]
    if (!Tela) continue

    try {
      const html = renderToString(createElement(Tela))
      // Tela que renderiza só a moldura, sem conteúdo, também é defeito.
      if (html.length < 200) vazios.push(`${chave} (${html.length} bytes)`)
      else ok += 1
    } catch (erro) {
      quebrados.push(`${chave}: ${erro.message.split('\n')[0]}`)
    }
  }
}

rmSync(temporario, { recursive: true, force: true })

console.log(`telas que renderizam: ${ok}`)
if (vazios.length) {
  console.log(`\ntelas suspeitas de vazias (${vazios.length}):`)
  for (const v of vazios) console.log(`  ${v}`)
}
if (quebrados.length) {
  console.log(`\ntelas QUEBRADAS (${quebrados.length}):`)
  for (const q of quebrados) console.log(`  ${q}`)
  process.exitCode = 1
} else {
  console.log('nenhuma tela quebrada')
}
