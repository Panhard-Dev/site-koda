import Coroa from './Coroa'
import Icone from './Icone'

/**
 * A descida.
 *
 * Os atalhos apontam só para o que existe na página: os recursos e o download. Âncora para
 * bloco que não está mais lá é link que não leva a lugar nenhum.
 */
export default function Footer({ baixar }) {
  const ano = new Date().getFullYear()

  return (
    <footer className="relative border-t border-koda-line py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Coroa className="h-6 w-auto" />
          <span className="text-[17px] font-semibold tracking-tight">Koda</span>
          <span className="ml-2 hidden text-sm text-koda-fg/45 sm:inline">
            Um agente que trabalha no seu computador.
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <a href="#recursos" className="text-koda-fg/65 transition-colors hover:text-koda-fg">
            Recursos
          </a>
          <a href="#/documentacao" className="text-koda-fg/65 transition-colors hover:text-koda-fg">
            Documentação
          </a>
          <a
            href={baixar}
            className="flex items-center gap-2 text-koda-fg/65 transition-colors hover:text-koda-fg"
          >
            <Icone nome="windows" className="h-4 w-4" />
            Windows 10/11
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-6xl px-6">
        <div className="border-t border-koda-line pt-6 text-xs text-koda-fg/40">
          © {ano} Koda
        </div>
      </div>
    </footer>
  )
}
