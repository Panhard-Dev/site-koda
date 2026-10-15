/**
 * Copia componentes **de verdade** do app do Koda para o site.
 *
 * A documentação não desenha caixas parecidas com as do Koda: ela mostra **as telas do
 * Koda**, usando os mesmos componentes que o app usa. Um card de to-dos desenhado à mão
 * diverge do app na primeira alteração; o arquivo copiado, não.
 *
 * O que a cópia faz:
 * - copia o `.tsx` para `src/koda/`, mantendo o nome;
 * - tira a tipagem do TypeScript (`: Tipo`, `interface`, `as`) — o site é JavaScript, e um
 *   compilador a mais só para isto não se paga;
 * - troca os imports do app pelos equivalentes locais (`lucide-react` já está no site).
 *
 * O `minify` do `vite` cuida do resto. Os arquivos copiados ficam em `src/koda/` e **não**
 * devem ser editados à mão: rode este script de novo.
 *
 * Uso: node scripts/copiar-koda.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = join(aqui, '..')
const destino = join(raiz, 'src', 'koda')

/**
 * Onde está o código do app do Koda.
 *
 * O caminho vem de `KODA_APP`, com o valor da máquina de quem escreve como padrão:
 *
 *     KODA_APP="C:\\outro\\lugar\\koda\\src" npm run koda
 *
 * ⚠️ Isto é ferramenta de quem **edita** o site, não passo de build. O resultado é
 * versionado (`src/koda/`), então quem só clona e builda não precisa do app do Koda.
 */
const app = process.env.KODA_APP ?? 'C:\\Users\\Administrator\\Downloads\\koda\\src'

if (!existsSync(app)) {
  console.error(
    `\no código do app não está em:\n  ${app}\n\n` +
      'Passe o caminho certo:\n' +
      '  KODA_APP="C:\\\\caminho\\\\koda\\\\src" npm run koda\n\n' +
      'Os componentes copiados já estão versionados em src/koda/ — se você só quer buildar\n' +
      'o site, não rode este script.',
  )
  process.exit(1)
}

/**
 * Os componentes a copiar, e o que cada um precisa.
 *
 * `extras` são os módulos do app que o componente importa e que também vêm (`duracao.ts`,
 * `tools.ts`…). Sem eles a cópia não compila.
 */
const COMPONENTES = [
  {
    nome: 'BolhaUsuario',
    extras: [],
  },
  {
    nome: 'ToDos',
    extras: [],
  },
  {
    nome: 'ToolSteps',
    extras: ['duracao', 'tools'],
    precisa: ['ToolIcon', 'DiffDoPasso'],
  },
  {
    nome: 'ToolIcon',
    extras: [],
  },
  {
    nome: 'DiffDoPasso',
    extras: [],
  },
  {
    nome: 'Reasoning',
    extras: [],
  },
  {
    nome: 'WorkingLine',
    extras: [],
    precisa: ['ThinkingMark'],
  },
  {
    nome: 'ThinkingMark',
    extras: [],
  },
  {
    nome: 'Compactacao',
    extras: [],
  },
  {
    nome: 'ApprovalCard',
    extras: [],
  },
  {
    nome: 'MoedaKoda',
    extras: [],
  },
  {
    nome: 'ContextRing',
    extras: [],
  },
  {
    nome: 'MessageFooter',
    extras: ['duracao', 'custo'],
  },
  {
    nome: 'KodaLogo',
    extras: [],
  },
  {
    // A barra lateral inteira: a faixa das abas, o Painel Dev e os Logs. É o componente
    // que o app monta — a documentação mostra ele, e não uma casca desenhada à mão.
    nome: 'PainelLateral',
    extras: [],
    precisa: ['PainelCodigo', 'Subs'],
  },
  {
    nome: 'PainelCodigo',
    extras: [],
  },
  {
    nome: 'Subs',
    extras: ['effort', 'permissao'],
    precisa: ['FalaDoModelo', 'Menu', 'TarefaIncompleta'],
  },
  {
    // `models` é `.tsx` (tem JSX nos ícones do seletor), e não `.ts`.
    arquivo: 'models.tsx',
    saida: 'models.jsx',
  },
  {
    nome: 'RichText',
    extras: [],
  },
  {
    nome: 'FalaDoModelo',
    extras: [],
  },
  {
    nome: 'TarefaIncompleta',
    extras: [],
  },
  {
    nome: 'WindowControls',
    extras: [],
  },
  {
    // O `Menu` do app: os submenus do cabeçalho e o seletor de modelo saem dele.
    nome: 'Menu',
    extras: [],
  },
]

/**
 * Tira a tipagem do TypeScript.
 *
 * Quem faz isso é o **esbuild** — o mesmo que o Vite usa por baixo. Escrever um cortador à
 * mão era o caminho errado: a primeira versão não pegou os blocos de tipo multilinha
 * (`}: { todos: ApiTodo[] }`), que é justamente a forma mais comum nestes arquivos.
 *
 * `loader: 'tsx'` entende TSX de verdade, então anotação, interface, `as`, genérico e
 * enum saem todos.
 *
 * `jsx: 'preserve'` é o detalhe que importa: sem ele o esbuild **converte o JSX** em
 * chamadas `jsx()`/`jsxs()`, e o arquivo deixa de parecer o original. O que se quer é o
 * mesmo código, só sem os tipos — quem transforma o JSX é o Vite do site.
 */
async function semTipos(codigo, nome) {
  const esbuild = await import('esbuild')
  const r = await esbuild.transform(codigo, {
    loader: 'tsx',
    jsx: 'preserve',
    format: 'esm',
    target: 'es2022',
  })
  return r.code
}

/**
 * Troca os imports do app pelos locais.
 *
 * Roda **antes** do esbuild: o compilador precisa enxergar `import type { ApiTodo } from
 * '../api/client'` para saber que aquele import é só de tipo e removê-lo do pacote. Se o
 * caminho já tivesse sido reescrito, ele tentaria carregar um arquivo que não existe.
 */
function ajustarImports(codigo) {
  return (
    codigo
      // `import type { ... } from '../api/client'` — só tipo, some inteiro.
      .replace(/^import\s+type\s+\{[^}]*\}\s+from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
      // `import { X, Y } from '../api/client'` — os tipos do app saem (o esbuild remove o
      // que for só tipo, mas o caminho não existe aqui).
      .replace(/^import\s*\{([^}]*)\}\s*from\s*'\.\.\/api\/client'\s*;?\s*$/gm, '')
      // Os módulos auxiliares sobem um nível: `../duracao` → `./duracao`.
      .replace(/from\s*'\.\.\/([\w-]+)'/g, "from './$1'")
      // O `models` mora em `src/` e importa de `components/`; copiado para a mesma pasta
      // dos componentes, o caminho perde o `components/`.
      .replace(/from\s*'\.\/components\/([\w-]+)'/g, "from './$1'")
      // Os componentes irmãos continuam em `./Nome`, que já é o certo.
      .replace(/^import\s*'\.\.\/index\.css'\s*;?\s*$/gm, '')
  )
}

mkdirSync(destino, { recursive: true })

let copiados = 0
const faltando = []

/** Copia um arquivo: ajusta os imports, tira os tipos, grava. */
async function copiar(origem, nomeSaida, rotulo) {
  if (!existsSync(origem)) {
    faltando.push(rotulo)
    return
  }
  const bruto = ajustarImports(readFileSync(origem, 'utf8'))
  const codigo = await semTipos(bruto, rotulo)
  writeFileSync(
    join(destino, nomeSaida),
    `// Copiado de koda/${rotulo} — ver scripts/copiar-koda.mjs\n${codigo}`,
    'utf8',
  )
}

// Os módulos auxiliares primeiro.
for (const item of COMPONENTES) {
  // Entrada genérica: qualquer arquivo de `src/` (o `models` é `.tsx`, os outros são `.ts`).
  if (item.arquivo) {
    await copiar(join(app, item.arquivo), item.saida, `src/${item.arquivo}`)
    copiados += 1
    continue
  }

  for (const extra of item.extras) {
    await copiar(join(app, `${extra}.ts`), `${extra}.js`, `src/${extra}.ts`)
  }

  await copiar(
    join(app, 'components', `${item.nome}.tsx`),
    `${item.nome}.jsx`,
    `src/components/${item.nome}.tsx`,
  )
  copiados += 1
}

console.log(`componentes copiados: ${copiados}`)
if (faltando.length) {
  console.log(`não encontrados (${faltando.length}):`)
  for (const f of faltando) console.log(`  ${f}`)
}
