import { useEffect, useState } from 'react'
import Coroa from '../components/Coroa'
import Icone from '../components/Icone'
import Markdown from '../docs/Markdown'
import { TEXTOS } from '../docs/indice'
import { PILARES } from '../docs/sumario'
import { TELAS } from '../docs/mapaTelas'

/**
 * A página de documentação — **o manual publicado**.
 *
 * Duas colunas: à esquerda os **pilares**, cada um abrindo os seus itens; à direita o
 * documento. O texto vem do manual (`scripts/gerar-docs.mjs`), e os documentos que têm tela
 * desenhada recebem a tela acima do texto.
 *
 * Os dois níveis de minimizar: cada pilar abre e fecha pelo cabeçalho, e a barra inteira
 * fecha pelo botão do topo.
 */

/** O pilar e o item abertos quando a página carrega. */
const PRIMEIRO_PILAR = PILARES[0].id
const PRIMEIRO_ITEM = PILARES[0].itens[0].id

export default function Documentacao() {
  useEffect(() => {
    document.documentElement.dataset.theme = localStorage.getItem('koda-site-tema') ?? 'dark'
  }, [])

  const [barraAberta, setBarraAberta] = useState(true)
  const [abertos, setAbertos] = useState(() => new Set([PRIMEIRO_PILAR]))
  const [pilar, setPilar] = useState(PRIMEIRO_PILAR)
  const [item, setItem] = useState(PRIMEIRO_ITEM)

  const alternarPilar = (id) => {
    setAbertos((atual) => {
      const proximo = new Set(atual)
      if (proximo.has(id)) proximo.delete(id)
      else proximo.add(id)
      return proximo
    })
  }

  const escolher = (idPilar, idItem) => {
    setPilar(idPilar)
    setItem(idItem)
    // A página não rola (o scroll é do texto, por dentro): quem volta ao topo é o `main`.
    document.querySelector('main')?.scrollTo(0, 0)
  }

  const atual = PILARES.find((p) => p.id === pilar)
  const atualItem = atual?.itens.find((i) => i.id === item)
  const chave = `${pilar}/${item}`
  const Tela = TELAS[chave]

  return (
    // `h-screen` + `overflow-hidden`: a página **não rola**. Quem rola é a barra da esquerda
    // (por dentro) e o texto (por dentro). Sem isto, a página inteira rolava e levava a
    // barra junto — dois scrolls na mesma rolagem.
    <div className="relative z-10 flex h-screen flex-col overflow-hidden">
      <header className="z-20 shrink-0 border-b border-koda-line bg-koda-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center gap-3 px-5">
          {/*
            * O caminho de volta é `#/` e não `/`.
            *
            * O site é uma página só, e o GitHub Pages o serve de um **subcaminho**
            * (`usuario.github.io/site-koda/`). Um `href="/"` levaria para fora do site — a
            * raiz do domínio, que não é dele. Com `#/`, a rota volta para a página inicial
            * de onde o site estiver, em qualquer hospedagem.
            */}
          <a href="#/" className="flex items-center gap-2.5">
            <Coroa className="h-5 w-auto" />
            <span className="text-[15px] font-semibold tracking-tight">Koda</span>
          </a>
          <span className="text-koda-fg/25">/</span>
          <span className="hidden text-[15px] text-koda-fg/70 sm:inline">Documentação</span>
          {atual && (
            <>
              <span className="hidden text-koda-fg/25 sm:inline">/</span>
              <span className="hidden text-[15px] text-koda-fg/50 sm:inline">{atual.titulo}</span>
            </>
          )}

          <button
            type="button"
            onClick={() => setBarraAberta((v) => !v)}
            aria-expanded={barraAberta}
            aria-label={barraAberta ? 'Minimizar o sumário' : 'Maximizar o sumário'}
            className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-koda-fg/55 transition-colors hover:bg-koda-fg/8 hover:text-koda-fg"
          >
            <Icone nome="painel" className="h-[18px] w-[18px]" />
          </button>
        </div>
      </header>

      {/* A área que sobra: a barra e o texto, cada um com o seu próprio scroll. */}
      <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1">
        <aside
          className={`shrink-0 overflow-hidden border-r border-koda-line transition-[width] duration-200 ${
            barraAberta ? 'w-72' : 'w-0'
          }`}
        >
          {/* `h-full` + `overflow-y-auto`: só o sumário rola, dentro do próprio espaço. */}
          <nav className="h-full w-72 overflow-y-auto px-3 py-6">
            {PILARES.map((p) => {
              const aberto = abertos.has(p.id)
              return (
                <div key={p.id}>
                  <button
                    type="button"
                    onClick={() => alternarPilar(p.id)}
                    aria-expanded={aberto}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-medium text-koda-fg/80 transition-colors hover:bg-koda-fg/5 hover:text-koda-fg"
                  >
                    <Icone
                      nome="chevron"
                      className={`h-3.5 w-3.5 shrink-0 text-koda-fg/35 transition-transform duration-200 ${
                        aberto ? '' : '-rotate-90'
                      }`}
                    />
                    {p.titulo}
                  </button>

                  {aberto && (
                    <ul className="mt-0.5 mb-1.5 ml-[21px] border-l border-koda-line pl-2">
                      {p.itens.map((i) => {
                        const selecionado = p.id === pilar && i.id === item
                        return (
                          <li key={i.id}>
                            <button
                              type="button"
                              onClick={() => escolher(p.id, i.id)}
                              aria-current={selecionado ? 'page' : undefined}
                              className={`block w-full rounded-md px-2.5 py-1.5 text-left text-[12.5px] leading-snug transition-colors ${
                                selecionado
                                  ? 'bg-koda-accent/12 font-medium text-koda-accent'
                                  : 'text-koda-fg/55 hover:bg-koda-fg/5 hover:text-koda-fg/90'
                              }`}
                            >
                              {i.titulo}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>

        {/* `h-full` + `overflow-y-auto`: o texto rola dentro do próprio espaço, sem
            arrastar o sumário junto. */}
        <main className="h-full min-w-0 flex-1 overflow-y-auto">
          <article className="mx-auto w-full max-w-[46rem] px-6 py-12 sm:px-10">
            {/*
              * O título do item.
              *
              * Era `3xl`/`4xl` e competia com os títulos de dentro do texto — numa página de
              * leitura, o nome do documento não precisa gritar. Em `2xl` ele se distingue
              * pelo espaço e por ser o único com a etiqueta do pilar em cima.
              */}
            {atual && (
              <p className="text-[11px] font-semibold tracking-[0.16em] text-koda-accent uppercase">
                {atual.titulo}
              </p>
            )}
            <h1 className="mt-2 mb-8 text-[26px] font-semibold tracking-tight text-balance">
              {atualItem?.titulo}
            </h1>

            {/* A tela do componente real do Koda, quando o documento tem uma. */}
            {Tela && <Tela />}

            <Texto chave={chave} />

            {/* O rodapé da leitura: o caminho de volta, para quem chegou ao fim. */}
            <div className="mt-16 border-t border-koda-line pt-6 text-[12.5px] text-koda-fg/40">
              <a href="#/" className="transition-colors hover:text-koda-fg/75">
                Voltar ao site
              </a>
            </div>
          </article>
        </main>
      </div>
    </div>
  )
}

/**
 * O texto do documento.
 *
 * Sai de `../docs/indice`, gerado por `scripts/gerar-docs.mjs` a partir do manual: os
 * `import` são estáticos (o empacotador precisa enxergar cada arquivo) e o mapa é escrito
 * pelo gerador — acrescentar uma seção no manual e rodar o script basta.
 */
function Texto({ chave }) {
  const texto = TEXTOS[chave]
  if (!texto) {
    return (
      <p className="text-[15px] leading-relaxed text-koda-fg/45">
        Este documento ainda não entrou no site.
      </p>
    )
  }
  return <Markdown texto={texto} prefixo={chave.replace('/', '-')} />
}
