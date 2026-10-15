/**
 * Gera os documentos do site a partir do manual.
 *
 * O manual (`documentaçaokodaa/`) é a fonte: são milhares de linhas de texto já escritas e
 * revisadas. Reescrever tudo à mão no site seria trabalho dobrado, e dois textos que
 * divergem com o tempo. Aqui o site **lê** o manual e o publica.
 *
 * ## O recorte por seção
 *
 * O manual é organizado por **assunto**: um `.md` por pilar, com seções `##` dentro. O site
 * precisa de um item por **seção** — sem isto, «Visão geral», «Como usar» e «Resumo»
 * mostrariam o mesmo texto inteiro, três vezes.
 *
 * Então o mapa abaixo diz, para cada item, de qual arquivo e de qual seção ele vem.
 *
 * Para conferir os títulos de um documento:
 *
 *     grep '^## ' documentaçaokodaa/<pilar>/README.md
 *
 * Uso: node scripts/gerar-docs.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = join(aqui, '..')
const destino = join(raiz, 'src', 'docs', 'textos')

/**
 * Onde está o manual.
 *
 * O manual é um projeto à parte, e este script o **lê** para gerar o texto do site. O
 * caminho vem de `KODA_MANUAL`, com o valor da máquina de quem escreve como padrão:
 *
 *     KODA_MANUAL="C:\\outro\\lugar\\documentaçaokodaa" npm run docs
 *
 * ⚠️ Isto é ferramenta de quem **edita** o site, não passo de build. O resultado é
 * versionado (`src/docs/textos/`), então quem só clona e builda não precisa do manual — e
 * é por isso que a ausência da pasta avisa e sai com erro, em vez de gerar texto vazio.
 */
const manual =
  process.env.KODA_MANUAL ?? 'C:\\Users\\Administrator\\Desktop\\documentaçaokodaa'

if (!existsSync(manual)) {
  console.error(
    `\no manual não está em:\n  ${manual}\n\n` +
      'Passe o caminho certo:\n' +
      '  KODA_MANUAL="C:\\\\caminho\\\\documentaçaokodaa" npm run docs\n\n' +
      'O texto gerado já está versionado em src/docs/textos/ — se você só quer buildar o\n' +
      'site, não rode este script.',
  )
  process.exit(1)
}

/**
 * Pilar → o que cada item mostra.
 *
 * `arquivo` é o `.md` do manual; `secao` é o título `##` exato (sem o `##`). Sem `secao`,
 * vem o documento inteiro — é o caso dos arquivos que já são de um assunto só
 * (`to-dos/README.md`, `ferramentas/arquivos.md`…).
 *
 * A seção vem **com** o seu título e tudo abaixo dela, até a próxima `##`.
 */
const MAPA = {
  'geral/visao': { arquivo: 'README.md', secao: 'O essencial em uma página' },
  'geral/como-usar': { arquivo: 'README.md', secao: 'Como ler este manual' },
  'geral/resumo': { arquivo: 'README.md', secao: 'Os assuntos' },

  'area-principal/conversa': { arquivo: 'area-principal/README.md', secao: 'A conversa' },
  'area-principal/campo': { arquivo: 'area-principal/README.md', secao: 'O campo de escrita' },
  'area-principal/seletores': {
    arquivo: 'area-principal/README.md',
    secao: 'Os seletores (embaixo do campo)',
  },

  'prompts/pedir-bem': { arquivo: 'prompts/README.md', secao: 'A regra que resolve 80% dos casos' },
  'prompts/folha': { arquivo: 'prompts/README.md', secao: 'O botão da folha — melhorar o prompt' },
  'prompts/comandos': { arquivo: 'prompts/README.md', secao: 'Comandos com `/`' },

  'to-dos/plano': { arquivo: 'to-dos/README.md' },

  'modelos/catalogo': { arquivo: 'modelos/README.md', secao: 'O catálogo' },
  'modelos/esforco': {
    arquivo: 'modelos/README.md',
    secao: 'O esforço de raciocínio — o controle mais importante da tela',
  },
  'modelos/visao': {
    arquivo: 'modelos/README.md',
    secao: 'Visão — quais modelos enxergam imagens',
  },

  'contexto/anel': { arquivo: 'contexto/README.md', secao: 'O anel de contexto' },
  'contexto/compactacao': { arquivo: 'contexto/README.md', secao: 'O que é compactação' },

  'ferramentas/todas': { arquivo: 'ferramentas/README.md' },
  'ferramentas/arquivos': { arquivo: 'ferramentas/arquivos.md' },
  'ferramentas/execucao': { arquivo: 'ferramentas/execucao.md' },
  'ferramentas/git-ferramentas': { arquivo: 'ferramentas/git-e-ferramentas.md' },
  'ferramentas/web-ferramentas': { arquivo: 'ferramentas/web-e-ferramentas.md' },
  'ferramentas/plano-ferramentas': { arquivo: 'ferramentas/plano-e-ferramentas.md' },
  'ferramentas/skills-ferramentas': { arquivo: 'ferramentas/skills-e-ferramentas.md' },
  'ferramentas/subagentes-ferramentas': { arquivo: 'ferramentas/subagentes-e-ferramentas.md' },

  'web/acesso': { arquivo: 'web/README.md' },
  'git/ciclo': { arquivo: 'git/README.md' },

  'videos/assistir': { arquivo: 'videos/README.md', secao: 'Dois caminhos, e a diferença importa' },
  'videos/editor': { arquivo: 'videos/README.md', secao: 'O editor de vídeo (o botão da câmera)' },
  'mcp/oque-e': { arquivo: 'mcp/README.md', secao: 'O que é' },
  'mcp/servidores': { arquivo: 'mcp/README.md', secao: 'Os três MCPs que vêm com o Koda' },
  'mcp/cadastrar': { arquivo: 'mcp/README.md', secao: 'Como ligar, desligar e cadastrar' },

  'skills/origens': { arquivo: 'skills/README.md', secao: 'As três origens de uma skill' },
  'skills/criar': { arquivo: 'skills/README.md', secao: 'Criar a sua própria skill' },

  'subagentes/usar': { arquivo: 'subagentes/README.md', secao: 'Como usar' },
  'subagentes/criar-agente': {
    arquivo: 'subagentes/README.md',
    secao: 'Criar o seu próprio sub-agente',
  },

  // Cada aba é um título de nível 1 no manual (`# Aba Painel Dev`), que agrupa tudo dela:
  // «O que é», «Para que serve», «Como usar» e os `###` de dentro. Recortar por «O que é»
  // pegaria só o primeiro parágrafo e perderia o resto da aba.
  'barra-lateral/painel-dev': { arquivo: 'barra-lateral/README.md', secao: 'Aba Painel Dev' },
  'barra-lateral/codigo': { arquivo: 'barra-lateral/README.md', secao: 'Aba Código' },
  'barra-lateral/subs': { arquivo: 'barra-lateral/README.md', secao: 'Aba Subs' },
  'barra-lateral/logs': { arquivo: 'barra-lateral/README.md', secao: 'Aba Logs' },

  'projetos/pasta': { arquivo: 'projetos/README.md', secao: 'A pasta padrão' },
  'projetos/agents': {
    arquivo: 'projetos/README.md',
    secao: 'O `AGENTS.md` — o prompt do seu projeto',
  },

  'permissoes/modos': { arquivo: 'permissoes/README.md', secao: 'Os quatro modos' },
  'permissoes/cartao': { arquivo: 'permissoes/README.md', secao: 'O cartão de permissão' },

  'anexos/aceitos': { arquivo: 'anexos/README.md', secao: 'O que é aceito' },
  'anexos/tetos': { arquivo: 'anexos/README.md', secao: 'Tetos' },

  'conta/entrar': { arquivo: 'conta/README.md', secao: 'A tela de entrada' },
  'conta/loja': { arquivo: 'conta/README.md', secao: 'A loja (Store)' },
  'conta/consumo': { arquivo: 'conta/README.md', secao: 'Consumo: requisições e moedas' },

  // Os títulos de `atalhos` não têm um "Teclado" solto: são três seções por área da tela.
  'atalhos/teclado': { arquivo: 'atalhos/README.md', secao: 'No campo de escrita' },
  'atalhos/barra': { arquivo: 'atalhos/README.md', secao: '`/` — os comandos' },
  'atalhos/arroba': { arquivo: 'atalhos/README.md', secao: '`@` — as menções' },

  // O diagnóstico é uma lista de sintomas: o primeiro item abre a lista, o segundo o
  // fechamento. Os títulos de cada sintoma trazem o `🔴` na frente, que a busca ignora.
  'diagnostico/sintomas': {
    arquivo: 'diagnostico/README.md',
    secao: 'O Koda não responde / a linha de trabalho gira sem parar',
  },
  'diagnostico/checklist': { arquivo: 'diagnostico/README.md', secao: 'Checklist rápido' },

  'atualizacao/canais': { arquivo: 'atualizacao/README.md' },
}

/**
 * Recorta a seção pedida de um documento.
 *
 * A seção vai **do título até o próximo título de nível igual ou maior** (ou o fim). O
 * título vira `#` no recorte: no site, o título do item já é o `h1` da página.
 *
 * ## O nível do título varia entre os documentos
 *
 * Quase todo arquivo do manual usa `##` para as seções (o `#` é o título do documento). O
 * `atalhos/README.md` foge disso: as partes grandes são `#` (`# Teclado`, `` # `/` — os
 * comandos ``). Por isso a busca aceita **qualquer nível** — `#`, `##` ou `###`.
 *
 * ## Quando o título se repete
 *
 * A `barra-lateral/README.md` tem quatro `## O que é` — um por aba. Procurar só pelo título
 * pegaria sempre o primeiro, e as quatro abas mostrariam a mesma coisa.
 *
 * Por isso `secao` aceita **`"Título#n"`**: o `n` é qual ocorrência pegar, contando de 1.
 *
 * Devolve `null` quando a seção não existe — e aí quem chamou avisa, em vez de publicar o
 * documento inteiro no lugar errado.
 */
function recortar(texto, secao) {
  if (!secao) return texto

  // `"O que é#3"` → título `O que é`, terceira ocorrência.
  const [titulo, ordem] = secao.split('#')
  const alvo = titulo.trim().toLowerCase()
  const qual = ordem ? Number(ordem) : 1

  /** O título sem emoji e sem espaço extra, para a comparação. */
  const enxuto = (t) =>
    t
      .replace(/[\u2600-\u27BF\uFE0F\u200D]/g, '')
      .replace(/[\uD83C-\uDBFF][\uDC00-\uDFFF]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()

  const linhas = texto.split('\n')
  let inicio = -1
  let nivel = 2
  let visto = 0

  for (let i = 0; i < linhas.length; i++) {
    const achado = linhas[i].match(/^(#{1,4})\s+(.*)$/)
    if (!achado) continue
    if (enxuto(achado[2]) !== alvo) continue
    visto += 1
    if (visto === qual) {
      inicio = i
      nivel = achado[1].length
      break
    }
  }
  if (inicio < 0) return null

  // O próximo título de nível igual ou maior fecha a seção.
  let fim = linhas.length
  for (let i = inicio + 1; i < linhas.length; i++) {
    const achado = linhas[i].match(/^(#{1,4})\s+/)
    if (achado && achado[1].length <= nivel) {
      fim = i
      break
    }
  }

  // O título vira `#`: no site, o `h1` da página é o nome do item.
  return [linhas[inicio].replace(/^#{1,4}\s+/, '# '), ...linhas.slice(inicio + 1, fim)]
    .join('\n')
    .trim()
}

/**
 * Tira o que é do manual em arquivo e não serve na tela.
 *
 * - **O título e as setas de navegação** não fazem sentido aqui: no site a navegação é a
 *   barra da esquerda.
 * - **Os emojis saem.** O app não usa emoji em lugar nenhum, e o manual os usa como atalho
 *   de leitura no arquivo. Na tela eles viram ruído — o destaque passa a ser a palavra
 *   («Dica», «Atenção») com a cor, do mesmo jeito que o resto da interface chama atenção.
 */
function limpar(texto) {
  return (
    texto
      .split('\n')
      .filter((linha) => {
        if (/^#\s/.test(linha)) return false
        if (/^\[←|^\[→/.test(linha.trim())) return false
        if (/^\[.*\]\(\.\.\//.test(linha.trim()) && linha.includes('←')) return false
        return true
      })
      .join('\n')
      // A marca de dica e de atenção vira uma linha própria **antes** do texto, para o
      // renderizador saber o tom e desenhar a palavra. Vale no começo de um parágrafo e
      // também no meio de um item de lista: o manual usa as duas formas.
      .replace(/(^|\n)(\s*(?:[-*]|\d+\.)\s+)?💡\s*/g, (_, antes, marcador) =>
        antes === '\n' && marcador
          ? `${antes}${marcador}:::dica\n`
          : `${antes}${marcador ?? ''}:::dica\n`,
      )
      .replace(/(^|\n)(\s*(?:[-*]|\d+\.)\s+)?⚠️?\s*/g, (_, antes, marcador) =>
        antes === '\n' && marcador
          ? `${antes}${marcador}:::atencao\n`
          : `${antes}${marcador ?? ''}:::atencao\n`,
      )
      // Os emojis que sobraram (títulos, tabelas) saem.
      // Faixas separadas: dingbats/símbolos, e os pares surrogates dos emojis.
      .replace(/[\u2600-\u27BF\uFE0F\u200D]/g, '')
      .replace(/[\uD83C-\uDBFF][\uDC00-\uDFFF]/g, '')
      /*
       * A linha divisória (`---`) sai.
       *
       * O manual a usa entre blocos para dar ar ao texto do arquivo. Na tela ela não faz
       * falta: o título da seção já marca a divisão, e uma página com 180 fios fica
       * picotada de traços. O respiro entre os blocos quem dá é o espaçamento do CSS.
       */
      .replace(/^\s*(-{3,}|\*{3,}|_{3,})\s*$/gm, '')
      .replace(/[ \t]+$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}

/** Escapa o texto para dentro de um template literal. */
function comoTemplate(texto) {
  return texto.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

mkdirSync(destino, { recursive: true })

let gerados = 0
const chaves = []
const faltando = []
const semSecao = []

for (const [chave, item] of Object.entries(MAPA)) {
  const caminho = join(manual, item.arquivo)
  if (!existsSync(caminho)) {
    faltando.push(`${chave} → ${item.arquivo}`)
    continue
  }

  const bruto = readFileSync(caminho, 'utf8')
  const recorte = recortar(bruto, item.secao)

  if (recorte === null) {
    semSecao.push(`${chave} → "${item.secao}" não existe em ${item.arquivo}`)
    continue
  }

  const texto = limpar(recorte)
  const nome = chave.replace('/', '-')
  const conteudo = `// Gerado de ${item.arquivo}${item.secao ? ` (§ ${item.secao})` : ''} — não edite à mão.\nexport default \`${comoTemplate(texto)}\`\n`
  writeFileSync(join(destino, `${nome}.js`), conteudo, 'utf8')
  chaves.push(chave)
  gerados += 1
}

/**
 * O índice dos textos.
 *
 * O `import` tem de ser estático — o empacotador precisa enxergar cada arquivo para
 * incluí-lo no pacote. Escrito à mão, ele ficaria dessincronizado na primeira seção nova;
 * gerado, ele acompanha o mapa sozinho.
 */
const linhas = chaves
  .map((chave) => {
    const nome = chave.replace('/', '-')
    const variavel = nome.replace(/-([a-z])/g, (_, l) => l.toUpperCase())
    return `import ${variavel} from './textos/${nome}'`
  })
  .join('\n')

const mapa = chaves
  .map((chave) => {
    const variavel = chave.replace('/', '-').replace(/-([a-z])/g, (_, l) => l.toUpperCase())
    return `  '${chave}': ${variavel},`
  })
  .join('\n')

writeFileSync(
  join(raiz, 'src', 'docs', 'indice.js'),
  `// Gerado por scripts/gerar-docs.mjs — não edite à mão.\n${linhas}\n\nexport const TEXTOS = {\n${mapa}\n}\n`,
  'utf8',
)

console.log(`gerados: ${gerados}`)
if (faltando.length) {
  console.log(`\narquivo não encontrado no manual (${faltando.length}):`)
  for (const f of faltando) console.log(`  ${f}`)
}
if (semSecao.length) {
  console.log(`\nseção não encontrada (${semSecao.length}) — o título mudou de nome?`)
  for (const f of semSecao) console.log(`  ${f}`)
}
