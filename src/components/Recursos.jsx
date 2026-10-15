import Icone from './Icone'

/**
 * Os recursos — **quatro**.
 *
 * Esta seção diz o que o Koda faz, e só isso. Cada cartão é uma coisa que só existe aqui:
 * mexer nos arquivos, usar a web, ver o que mudou, comer documento e imagem. O resto que
 * estava nesta lista ou é dito em outro lugar, ou não precisava ser dito.
 */
const CARTOES = [
  {
    icone: 'raio',
    titulo: 'Ferramentas de verdade',
    texto:
      'Lê, escreve e edita arquivos, roda comandos no terminal e executa de verdade. Não é só conversa que termina num bloco de código.',
  },
  {
    icone: 'globo',
    titulo: 'Navegador e web',
    texto:
      'Abre páginas, clica, preenche e lê o que está na tela. Pesquisa na web quando precisa de algo que não está no seu computador.',
  },
  {
    icone: 'codigo',
    titulo: 'Painel Dev',
    texto:
      'A árvore de arquivos e o código ao lado da conversa. O que a IA mudou aparece marcado em verde e vermelho, sem você precisar pedir.',
  },
  {
    icone: 'clipe',
    titulo: 'Anexos e visão',
    texto:
      'Arraste um PDF ou uma imagem para dentro da conversa. Ele lê o documento e enxerga a imagem — os dois entram no contexto.',
  },
]

export default function Recursos() {
  return (
    <section id="recursos" className="relative py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="revelar max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-koda-accent">
            Recursos
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Um agente com as mãos no teclado
          </h2>
          <p className="mt-4 text-base leading-relaxed text-koda-fg/60">
            Cada recurso aqui existe para tirar uma tarefa da sua mão — e nenhum deles age sem
            você saber.
          </p>
        </div>

        <div className="revelar-cascata mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARTOES.map((c) => (
            <article
              key={c.titulo}
              className="group rounded-2xl border border-koda-line bg-koda-panel/60 p-6 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-1 hover:border-koda-accent/40 hover:bg-koda-surface"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-koda-line bg-koda-surface text-koda-accent transition-colors group-hover:border-koda-accent/40">
                <Icone nome={c.icone} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-[15px] font-semibold">{c.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-koda-fg/60">{c.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
