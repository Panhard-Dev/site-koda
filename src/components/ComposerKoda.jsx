import { useEffect, useRef, useState } from 'react'
import Coroa from './Coroa'
import Icone from './Icone'
import MoedaKoda from './MoedaKoda'

/**
 * A caixa de mensagem do Koda, **funcionando** — não é print.
 *
 * A silhueta (aba + rampa + corpo) é o mesmo path de `koda/src/components/Composer.tsx`,
 * recalculado por um `ResizeObserver` quando o container muda de tamanho: `alturaDaAba=34`,
 * `raio=22`, `raioDaAba=14`, `rampa=16`. Num path só, porque com dois elementos sobra sempre
 * uma emenda entre a aba e o corpo.
 *
 * O texto se escreve sozinho e o cursor pisca — é o que dá vida à tela, em vez de uma
 * imagem parada.
 */
const EXEMPLOS = [
  'organiza os prints da minha área de trabalho por mês',
  'lê esse PDF e me resume os pontos principais',
  'conserta o botão de enviar que não responde',
  'faz um site pra apresentar o Koda',
]

const PILL = 'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium ring-1'

export default function ComposerKoda() {
  const [texto, setTexto] = useState('')
  const formaRef = useRef(null)
  const abaRef = useRef(null)
  const pathRef = useRef(null)

  // A silhueta. Recalculada quando o container muda de tamanho (janela, zoom).
  useEffect(() => {
    const forma = formaRef.current
    if (!forma) return
    const desenhar = () => {
      const path = pathRef.current
      const aba = abaRef.current
      if (!path || !aba) return
      const W = forma.clientWidth
      const H = forma.clientHeight
      const alturaDaAba = 34
      const raio = 22
      const raioDaAba = 14
      const rampa = 16
      const larguraDaAba = aba.scrollWidth + 2
      const n = (v) => +v.toFixed(1)
      path.setAttribute(
        'd',
        [
          `M0.5 ${n(H - raio)}`,
          `L0.5 ${raioDaAba}`,
          `Q0.5 0.5 ${raioDaAba} 0.5`,
          `L${n(larguraDaAba)} 0.5`,
          `L${n(larguraDaAba + rampa)} ${alturaDaAba}`,
          `L${n(W - raio)} ${alturaDaAba}`,
          `Q${W - 0.5} ${alturaDaAba} ${W - 0.5} ${alturaDaAba + raio}`,
          `L${W - 0.5} ${n(H - raio)}`,
          `Q${W - 0.5} ${H - 0.5} ${n(W - raio)} ${H - 0.5}`,
          `L${raio} ${H - 0.5}`,
          `Q0.5 ${H - 0.5} 0.5 ${n(H - raio)}`,
          'Z',
        ].join(' '),
      )
    }
    desenhar()
    const observador = new ResizeObserver(desenhar)
    observador.observe(forma)
    return () => observador.disconnect()
  }, [])

  // O texto se escreve, para, apaga e passa para o próximo exemplo.
  useEffect(() => {
    let exemplo = 0
    let letras = 0
    let apagando = false
    let timer = 0

    const passo = () => {
      const alvo = EXEMPLOS[exemplo]
      if (!apagando) {
        letras += 1
        setTexto(alvo.slice(0, letras))
        if (letras >= alvo.length) {
          apagando = true
          timer = window.setTimeout(passo, 2400)
          return
        }
        timer = window.setTimeout(passo, 45)
      } else {
        letras -= 1
        setTexto(alvo.slice(0, letras))
        if (letras <= 0) {
          apagando = false
          exemplo = (exemplo + 1) % EXEMPLOS.length
          timer = window.setTimeout(passo, 420)
          return
        }
        timer = window.setTimeout(passo, 16)
      }
    }

    timer = window.setTimeout(passo, 900)
    return () => window.clearTimeout(timer)
  }, [])

  const podeEnviar = texto.length > 0

  return (
    <div className="group relative isolate w-full pt-[40px]">
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        style={{ filter: 'drop-shadow(0 30px 60px var(--koda-shadow))' }}
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          className="fill-koda-input stroke-koda-fg/10 transition-[stroke] duration-150 group-hover:stroke-koda-accent/35"
          strokeWidth={1}
        />
      </svg>

      {/* A aba, no canto de cima: a moeda do Koda — igual ao app. */}
      <div ref={abaRef} className="absolute top-0 left-0 flex h-[34px] items-center gap-1 pl-2 pr-3">
        <MoedaKoda className="h-[18px] w-[18px]" />
      </div>

      <div className="px-4 pb-3">
        <div className="min-h-[72px] pt-2 text-[15px] leading-6 break-words text-koda-fg/90">
          {texto ? (
            <>
              {texto}
              <span className="cursor" />
            </>
          ) : (
            <span className="text-koda-fg/40">Message Koda</span>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-koda-fg/55">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>

            <span className={`${PILL} text-koda-fg/55 ring-transparent`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 3.5a2 2 0 0 1 4 0v6.2a4.2 4.2 0 0 1-2 3.6v6.2" />
                <path d="M7.2 7.4A4.2 4.2 0 0 0 12 13.3a4.2 4.2 0 0 0 4.8-5.9" />
              </svg>
              Reasoning
            </span>

            <span className={`${PILL} bg-koda-accent/12 text-koda-accent ring-koda-accent/35`}>
              <Icone nome="globo" className="h-4 w-4" />
              Web
            </span>

            <span className={`${PILL} text-koda-fg/55 ring-transparent`}>
              Automático
              <Icone nome="chevron" className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[13px] text-koda-fg/50">
              <Coroa className="h-3.5 w-auto" color="currentColor" />
              <span className="hidden sm:inline">Liz 4</span>
              <Icone nome="chevron" className="h-3.5 w-3.5" />
            </span>

            <span className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[13px] text-koda-fg/40">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M12 21a9 9 0 1 1 9-9" />
                <path d="M12 12l4-3" />
              </svg>
              <span className="hidden sm:inline">Automático</span>
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-koda-fg/55">
              <Icone nome="clipe" className="h-[17px] w-[17px]" />
            </span>

            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-150 ${
                podeEnviar ? 'bg-koda-accent-strong text-white' : 'bg-koda-fg/8 text-koda-fg/40'
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19.4V5.6M6.4 11.2L12 5.6l5.6 5.6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
