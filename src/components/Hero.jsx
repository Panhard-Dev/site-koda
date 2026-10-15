import Coroa from './Coroa'
import Icone from './Icone'
import ComposerKoda from './ComposerKoda'

export default function Hero({ baixar, versao }) {
  const versaoTexto = versao?.latest_version ? `v${versao.latest_version}` : null

  return (
    <section id="topo" className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="stagger mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* A coroa de verdade: larga (810×580), então a altura manda e a largura acompanha. */}
          <Coroa className="coroa-pulsa h-14 w-auto sm:h-16" />

          <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-koda-line bg-koda-panel/60 px-3.5 py-1.5 text-xs text-koda-fg/70">
            <span className="h-1.5 w-1.5 rounded-full bg-koda-accent" />
            Agente de IA para Windows
            {versaoTexto && <span className="text-koda-fg/40">· {versaoTexto}</span>}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            O Koda trabalha no seu computador,{' '}
            <span className="text-koda-accent">não numa aba.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-koda-fg/65 sm:text-lg">
            Um agente que lê e escreve arquivos, roda comandos, abre o navegador e pesquisa na web.
            Ele faz o trabalho de verdade — e você decide, passo a passo, o quanto ele pode.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={baixar}
              className="flex h-12 items-center gap-2.5 rounded-xl bg-koda-accent-strong px-6 text-[15px] font-medium text-white shadow-lg shadow-koda-accent-strong/25 transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              <Icone nome="baixar" className="h-[18px] w-[18px]" />
              Baixar para Windows
            </a>
            <a
              href="#recursos"
              className="flex h-12 items-center gap-2 rounded-xl border border-koda-line bg-koda-panel/50 px-6 text-[15px] font-medium text-koda-fg/85 transition-colors hover:bg-koda-surface"
            >
              Ver o que ele faz
              <Icone nome="seta" className="h-[18px] w-[18px]" />
            </a>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-koda-fg/45">
            <Icone nome="windows" className="h-3.5 w-3.5" />
            Windows 10 e 11 · grátis para começar
          </p>
        </div>

        {/* A caixa de mensagem de verdade, se escrevendo sozinha. */}
        <div className="revelar mx-auto mt-14 max-w-3xl">
          <ComposerKoda />
        </div>
      </div>
    </section>
  )
}
