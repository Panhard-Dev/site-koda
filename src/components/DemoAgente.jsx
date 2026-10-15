import { useEffect, useState } from 'react'
import Coroa, { CoroaTrabalhando } from './Coroa'
import Icone from './Icone'
import { ToolIcone, ToolSpinner } from './ToolIcone'

/**
 * O Koda trabalhando, passo a passo — e rodando de novo, em laço.
 *
 * É a mesma conversa que o app mostra: a bolha do pedido, a linha viva enquanto ele
 * pensa, cada ferramenta anunciada e concluída, a fala no fim com a coroa ao lado e a
 * ficha fechando. Tudo com o `msg-in` do app, que é o movimento de cada fala entrando.
 */
const ROTEIRO = [
  { tipo: 'usuario', texto: 'conserta o botão de enviar que não responde' },
  { tipo: 'vivo', nome: 'read_file', args: 'src/components/Composer.tsx' },
  { tipo: 'feito', nome: 'read_file', verbo: 'Leu', args: 'src/components/Composer.tsx', resumo: '118 linhas' },
  { tipo: 'vivo', nome: 'search_files', args: 'canSend' },
  { tipo: 'feito', nome: 'search_files', verbo: 'Procurou', args: 'canSend', resumo: '3 ocorrências' },
  { tipo: 'vivo', nome: 'edit_file', args: 'src/components/Composer.tsx' },
  { tipo: 'feito', nome: 'edit_file', verbo: 'Editou', args: 'src/components/Composer.tsx', resumo: '+2 −1' },
  { tipo: 'vivo', nome: 'shell', args: 'npm run build' },
  { tipo: 'feito', nome: 'shell', verbo: 'Rodou', args: 'npm run build', resumo: 'ok em 2,1s' },
  {
    tipo: 'fala',
    texto:
      'Achei: o botão ficava preso no estado antigo porque o `disabled` lia a lista de anexos e não o texto. Corrigi a condição e o build passou.',
  },
  { tipo: 'rodape', modelo: 'liz-4', tokens: 312, tempo: '18,4s' },
]

const INTERVALO = 1250
const PAUSA_FINAL = 4200

export default function DemoAgente() {
  const [passo, setPasso] = useState(0)
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    const fim = passo >= ROTEIRO.length
    const timer = window.setTimeout(
      () => setPasso((atual) => (atual >= ROTEIRO.length ? 0 : atual + 1)),
      fim ? PAUSA_FINAL : INTERVALO,
    )
    return () => window.clearTimeout(timer)
  }, [passo])

  // O relógio da linha viva: conta o tempo de verdade desta demonstração.
  const vivo = passo > 0 && passo <= ROTEIRO.length && ROTEIRO[passo - 1]?.tipo === 'vivo'
  useEffect(() => {
    if (!vivo) return
    setSegundos(0)
    const timer = window.setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => window.clearInterval(timer)
  }, [vivo])

  const visiveis = ROTEIRO.slice(0, passo)

  return (
    <div className="overflow-hidden rounded-2xl border border-koda-line bg-koda-panel/50 shadow-2xl shadow-black/25">
      <div className="flex items-center gap-2 border-b border-koda-line px-5 py-3">
        <Coroa className="h-4 w-auto" />
        <span className="text-xs font-medium text-koda-fg/70">Koda</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-koda-fg/40">
          <span className={`h-1.5 w-1.5 rounded-full ${vivo ? 'bg-koda-accent dot-pulse' : 'bg-koda-fg/25'}`} />
          {vivo ? 'trabalhando' : 'parado'}
        </span>
      </div>

      {/*
       * Altura fixa e preso embaixo, como conversa de verdade: o que é novo entra no pé e o
       * que é velho sai por cima. Sem isso o painel cresce e encolhe a cada volta do laço e
       * empurra a página inteira.
       */}
      <div
        className={`flex h-[440px] flex-col gap-3.5 overflow-hidden p-5 ${
          passo === 0 ? 'justify-center' : 'justify-end'
        }`}
      >
        {visiveis.map((evento, i) => {
          if (evento.tipo === 'usuario') {
            return (
              <div
                key={i}
                className="msg-in ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-koda-input px-4 py-2.5 text-[15px] leading-6 text-koda-fg/90 ring-1 ring-koda-fg/5"
              >
                {evento.texto}
              </div>
            )
          }

          if (evento.tipo === 'vivo') {
            return (
              <div key={i} className="msg-in flex items-center gap-3">
                <ToolSpinner className="h-3.5 w-3.5 shrink-0 text-koda-accent" />
                <span className="min-w-0 truncate text-[13px] text-koda-fg/45">
                  Rodando <span className="text-koda-fg/75">{evento.nome}</span>{' '}
                  <span className="font-mono text-[11.5px] text-koda-fg/30">{evento.args}</span>
                </span>
                <span className="ml-auto shrink-0 font-mono text-[11.5px] tabular-nums text-koda-fg/25">
                  {segundos}s
                </span>
              </div>
            )
          }

          if (evento.tipo === 'feito') {
            return (
              <div key={i} className="msg-in flex items-center gap-3">
                <ToolIcone nome={evento.nome} className="h-3.5 w-3.5 shrink-0 text-koda-fg/45" />
                <span className="text-[13px] text-koda-fg/70">{evento.verbo}</span>
                <span className="min-w-0 truncate font-mono text-[11.5px] text-koda-fg/35">
                  {evento.args}
                </span>
                <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[11.5px] text-koda-fg/40">
                  {evento.resumo}
                  <Icone nome="check" className="h-3.5 w-3.5 text-emerald-400/70" />
                </span>
              </div>
            )
          }

          if (evento.tipo === 'fala') {
            return (
              <div key={i} className="msg-in flex items-start gap-3">
                <Coroa className="mt-1.5 h-3.5 w-auto shrink-0 text-koda-fg/70" color="currentColor" />
                <p className="max-w-[85%] text-[15px] leading-6 text-koda-fg/85">{evento.texto}</p>
              </div>
            )
          }

          return (
            <div
              key={i}
              className="msg-in mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-koda-line pt-3 text-[11.5px] text-koda-fg/35"
            >
              <span className="font-mono">{evento.modelo}</span>
              <span>{evento.tokens} tokens</span>
              <span>{evento.tempo}</span>
            </div>
          )
        })}

        {/* Enquanto não há nada na tela, a coroa brilha — o app faz igual. */}
        {passo === 0 && (
          <div className="flex flex-1 items-center justify-center gap-3">
            <CoroaTrabalhando className="h-5 w-auto text-koda-fg/70" />
            <span className="text-[13px] text-koda-fg/45">Trabalhando…</span>
          </div>
        )}
      </div>
    </div>
  )
}
