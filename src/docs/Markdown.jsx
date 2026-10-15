/**
 * Um renderizador de markdown — **pequeno e sob medida**.
 *
 * O manual usa cinco coisas: título, parágrafo, lista, tabela e o destaque com 💡/⚠️. Um
 * pacote de markdown completo traria dezenas de regras que não aparecem em lugar nenhum
 * aqui, e uma dependência a mais para o site carregar. Este arquivo cobre o que o texto
 * tem — e nada além.
 *
 * O que ele entende:
 *   ## título          → cabeçalho
 *   parágrafo          → texto
 *   - item / 1. item   → lista
 *   | a | b |          → tabela (a segunda linha de traços é o cabeçalho)
 *   ```código```       → bloco
 *   **forte** `código` → dentro de qualquer linha
 *   > citação          → bloco de aviso
 *
 * Símbolo do começo (💡 ou ⚠️) vira o tom do bloco: dica ou atenção.
 */

/** As marcas dentro de uma linha: `**forte**` e `` `código` ``. */
function comMarcas(texto, chave) {
  const partes = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let ultimo = 0
  let achado
  let n = 0
  while ((achado = re.exec(texto)) !== null) {
    if (achado.index > ultimo) partes.push(texto.slice(ultimo, achado.index))
    const bruto = achado[0]
    if (bruto.startsWith('**')) {
      partes.push(
        <strong key={`${chave}-f${n}`} className="font-semibold text-koda-fg">
          {bruto.slice(2, -2)}
        </strong>,
      )
    } else {
      partes.push(
        <code
          key={`${chave}-c${n}`}
          className="rounded bg-koda-fg/8 px-1.5 py-0.5 font-mono text-[0.875em] text-koda-fg/90"
        >
          {bruto.slice(1, -1)}
        </code>,
      )
    }
    ultimo = achado.index + bruto.length
    n += 1
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo))
  return partes.length ? partes : [texto]
}

/** As células de uma linha de tabela: `| a | b |` → ['a', 'b']. */
function celulas(linha) {
  return linha
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim())
}

/** A linha de traços que separa o cabeçalho do corpo da tabela. */
const E_SEPARADOR = /^\s*\|?[\s:|-]+\|[\s:|-]*$/

/**
 * Os dois tons de aviso, e como cada um se desenha.
 *
 * O manual marca os avisos com um símbolo no começo da linha. O gerador troca esse símbolo
 * pelo marcador `:::dica` / `:::atencao`, e aqui ele vira a **palavra** com a cor — que é
 * como o resto do app chama atenção. O texto em si continua o mesmo.
 *
 * O desenho é **um fio na lateral**, e não uma caixa com borda em volta: o manual tem mais
 * de 900 avisos, e 900 caixas na mesma página viram uma colcha de retalhos. O fio separa
 * sem competir com o texto; a cor fica na palavra, que é o que precisa ser lido.
 */
const TONS = {
  dica: {
    caixa: 'border-l-2 border-koda-accent/40 bg-koda-accent/5',
    rotulo: 'text-koda-accent',
    palavra: 'Dica',
  },
  atencao: {
    caixa: 'border-l-2 border-amber-500/50 bg-amber-500/5',
    rotulo: 'text-amber-400/90',
    palavra: 'Atenção',
  },
}

/**
 * Quebra o markdown e devolve os elementos.
 *
 * `prefixo` entra nas chaves para dois documentos na mesma página não colidirem.
 */
export function Markdown({ texto, prefixo = 'md' }) {
  const linhas = (texto ?? '').split('\n')
  const saida = []
  let i = 0
  let n = 0
  const chave = () => `${prefixo}-${n++}`

  while (i < linhas.length) {
    const linha = linhas[i]

    // Linha em branco: separa, não desenha.
    if (!linha.trim()) {
      i += 1
      continue
    }

    /*
     * Linha divisória (`---`).
     *
     * O manual usa `---` entre blocos para dar ar ao texto no arquivo. Na tela, um fio
     * separando tudo o que já foi lido é ruído: o título da seção já marca a divisão, e a
     * página fica picotada de traços. Então o `---` **não vira fio** — vira só um respiro
     * maior entre os blocos.
     *
     * O que a linha era antes: parágrafo comum, com o `---` caindo no meio do texto. Era
     * esse o defeito — os três traços apareciam literais na página.
     */
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(linha)) {
      saida.push(<div key={chave()} className="h-6" aria-hidden />)
      i += 1
      continue
    }

    // Bloco de código.
    if (linha.trim().startsWith('```')) {
      const corpo = []
      i += 1
      while (i < linhas.length && !linhas[i].trim().startsWith('```')) {
        corpo.push(linhas[i])
        i += 1
      }
      i += 1
      saida.push(
        <pre
          key={chave()}
          className="my-4 overflow-x-auto rounded-xl border border-koda-line bg-koda-bg/70 p-4 font-mono text-[12.5px] leading-6 text-koda-fg/85"
        >
          {corpo.join('\n')}
        </pre>,
      )
      continue
    }

    // Marca de destaque, escrita em linha própria pelo gerador (`:::dica` / `:::atencao`).
    // O bloco vai até a próxima linha em branco ou o começo do bloco seguinte.
    const marca = linha.match(/^\s*:::(dica|atencao)\s*$/)
    if (marca) {
      const tom = marca[1]
      i += 1
      const corpo = []
      while (
        i < linhas.length &&
        linhas[i].trim() &&
        !/^\s*:::(dica|atencao)\s*$/.test(linhas[i]) &&
        !linhas[i].startsWith('#')
      ) {
        corpo.push(linhas[i].trim())
        i += 1
      }
      saida.push(
        <div
          key={chave()}
          className={`my-4 rounded-r-lg py-2.5 pr-4 pl-3.5 text-[13.5px] leading-[1.7] text-koda-fg/80 ${TONS[tom].caixa}`}
        >
          <span
            className={`mb-1 block text-[10px] font-semibold tracking-[0.14em] uppercase ${TONS[tom].rotulo}`}
          >
            {TONS[tom].palavra}
          </span>
          {comMarcas(corpo.join(' '), chave())}
        </div>,
      )
      continue
    }

    // Título.
    const titulo = linha.match(/^(#{1,4})\s+(.*)$/)
    if (titulo) {
      const nivel = titulo[1].length
      const conteudo = comMarcas(titulo[2], chave())
      /*
       * A hierarquia é por **peso e espaço**, não por tamanho só.
       *
       * O `h1` da página é o nome do item (fora daqui). O `#` do texto é a seção — a
       * divisão principal do documento —, e por isso ganha mais ar em cima. Os níveis de
       * baixo ficam próximos do que vem depois deles: um `###` pertence ao bloco que
       * introduz, não é uma coisa separada.
       */
      const classes =
        nivel <= 1
          ? 'mt-12 mb-4 text-[19px] font-semibold tracking-tight text-koda-fg first:mt-0'
          : nivel === 2
            ? 'mt-9 mb-3 text-[16px] font-semibold tracking-tight text-koda-fg'
            : 'mt-7 mb-2 text-[14px] font-semibold tracking-tight text-koda-fg/95'
      saida.push(
        nivel <= 1 ? (
          <h2 key={chave()} className={classes}>
            {conteudo}
          </h2>
        ) : nivel === 2 ? (
          <h3 key={chave()} className={classes}>
            {conteudo}
          </h3>
        ) : nivel === 3 ? (
          <h4 key={chave()} className={classes}>
            {conteudo}
          </h4>
        ) : (
          <h5 key={chave()} className={classes}>
            {conteudo}
          </h5>
        ),
      )
      i += 1
      continue
    }

    // Tabela: a linha tem `|` e a seguinte é o separador.
    if (linha.includes('|') && i + 1 < linhas.length && E_SEPARADOR.test(linhas[i + 1])) {
      const cabecalho = celulas(linha)
      i += 2
      const corpo = []
      while (i < linhas.length && linhas[i].includes('|') && linhas[i].trim()) {
        corpo.push(celulas(linhas[i]))
        i += 1
      }
      saida.push(
        <div
          key={chave()}
          className="my-5 overflow-hidden overflow-x-auto rounded-xl border border-koda-line"
        >
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-koda-line bg-koda-panel/70">
                {cabecalho.map((c, k) => (
                  <th
                    key={k}
                    className="px-4 py-2.5 text-[12px] font-semibold tracking-wide text-koda-fg/75"
                  >
                    {comMarcas(c, `${chave()}-h${k}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {corpo.map((linha_, k) => (
                <tr
                  key={k}
                  className="border-b border-koda-line/50 transition-colors last:border-b-0 hover:bg-koda-fg/5"
                >
                  {linha_.map((c, j) => (
                    <td key={j} className="px-4 py-2.5 align-top leading-[1.65] text-koda-fg/75">
                      {comMarcas(c, `${chave()}-b${k}-${j}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }

    // Citação — no manual, o bloco de destaque sem marca.
    if (linha.startsWith('>')) {
      const corpo = []
      while (i < linhas.length && linhas[i].startsWith('>')) {
        corpo.push(linhas[i].replace(/^>\s?/, ''))
        i += 1
      }
      saida.push(
        <div
          key={chave()}
          className="my-4 rounded-xl border border-koda-line bg-koda-panel/50 px-4 py-3 text-sm leading-relaxed text-koda-fg/80"
        >
          {comMarcas(corpo.join(' ').trim(), chave())}
        </div>,
      )
      continue
    }

    // Lista (com marcador ou numerada).
    if (/^\s*([-*]|\d+\.)\s+/.test(linha)) {
      const ordenada = /^\s*\d+\./.test(linha)
      const itens = []
      while (i < linhas.length && /^\s*([-*]|\d+\.)\s+/.test(linhas[i])) {
        itens.push(linhas[i].replace(/^\s*([-*]|\d+\.)\s+/, ''))
        i += 1
      }
      const Lista = ordenada ? 'ol' : 'ul'
      saida.push(
        <Lista
          key={chave()}
          className={`my-3.5 flex flex-col gap-1.5 pl-5 text-[13.5px] leading-[1.7] text-koda-fg/75 ${
            ordenada ? 'list-decimal' : 'list-disc'
          }`}
        >
          {itens.map((item, k) => (
            <li key={k} className="pl-1 marker:text-koda-fg/35">
              {comMarcas(item, `${chave()}-i${k}`)}
            </li>
          ))}
        </Lista>,
      )
      continue
    }

    // Parágrafo: junta as linhas até a próxima em branco ou bloco.
    const paragrafo = []
    while (
      i < linhas.length &&
      linhas[i].trim() &&
      !linhas[i].startsWith('#') &&
      !linhas[i].startsWith('>') &&
      !linhas[i].trim().startsWith('```') &&
      !/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(linhas[i]) &&
      !/^\s*:::(dica|atencao)\s*$/.test(linhas[i]) &&
      !/^\s*([-*]|\d+\.)\s+/.test(linhas[i]) &&
      !linhas[i].includes('|')
    ) {
      paragrafo.push(linhas[i].trim())
      i += 1
    }
    if (paragrafo.length) {
      saida.push(
        <p key={chave()} className="my-3.5 text-[13.5px] leading-[1.75] text-koda-fg/70">
          {comMarcas(paragrafo.join(' '), chave())}
        </p>,
      )
      continue
    }

    // Rede de segurança: linha que não casou com nada não trava o laço.
    i += 1
  }

  // Sem classe no wrapper: o espaçamento é de cada bloco, e um nome que não tem CSS
  // atrás só engana quem for mexer depois.
  return <div>{saida}</div>
}

export default Markdown
