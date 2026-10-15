import { useEffect, useState } from 'react'
import Coroa from './Coroa'
import Icone from './Icone'

/**
 * A barra de cima. **Sem menu.**
 *
 * O site é uma página só — a lista de atalhos (Recursos, Como funciona, …) apontava para
 * âncoras da mesma tela, e isso é menu de site grande. Sobrou o que serve: a marca, a
 * documentação, o interruptor de tema e o botão de baixar.
 */
export default function Nav({ tema, alternarTema, baixar }) {
  // A barra só ganha fundo depois que a página sai do topo — no herói ela é invisível.
  const [colada, setColada] = useState(false)

  useEffect(() => {
    const aoRolar = () => setColada(window.scrollY > 12)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        colada ? 'border-b border-koda-line bg-koda-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center px-6">
        <a href="#topo" className="flex items-center gap-2.5">
          <Coroa className="h-6 w-auto" />
          <span className="text-[17px] font-semibold tracking-tight">Koda</span>
        </a>

        {/* Ao lado da marca, e não no canto: a documentação é conteúdo, não ação da
            página — ela anda junto com o nome, no mesmo bloco de leitura. Sem moldura:
            caixa com borda ao lado de uma marca parece botão de formulário. */}
        <a
          href="#/documentacao"
          className="ml-5 flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm text-koda-fg/55 transition-colors hover:bg-koda-fg/8 hover:text-koda-fg"
        >
          <Icone nome="livro" className="h-4 w-4" />
          Documentação
        </a>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={alternarTema}
            aria-label={tema === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            className="grid h-9 w-9 place-items-center rounded-lg border border-koda-line text-koda-fg/70 transition-colors hover:bg-koda-surface hover:text-koda-fg"
          >
            <Icone nome={tema === 'dark' ? 'sol' : 'lua'} className="h-[18px] w-[18px]" />
          </button>

          <a
            href={baixar}
            className="flex h-9 items-center gap-2 rounded-lg bg-koda-accent-strong px-4 text-sm font-medium text-white transition-transform hover:brightness-110 active:scale-[0.98]"
          >
            <Icone nome="baixar" className="h-4 w-4" />
            Baixar
          </a>
        </div>
      </nav>
    </header>
  )
}
