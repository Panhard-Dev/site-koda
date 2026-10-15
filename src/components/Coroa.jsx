/**
 * A coroa do Koda — a marca de verdade.
 *
 * O polígono é o mesmo de `koda/src/components/KodaLogo.tsx` (e de `public/coroa.svg`),
 * ponto por ponto. **Não é quadrada:** são 810×580, uma coroa larga de três pontas. Quem
 * usa define só a altura (`h-6 w-auto`) — forçar `w-` igual ao `h-` achata o desenho.
 */
const PONTOS = '0,520 160,520 60,140 270,310 400,80 530,310 740,140 640,520 800,520'

export const COR_ROXA = '#b040d0'

export function Coroa({ className = 'h-6 w-auto', color = COR_ROXA }) {
  return (
    <svg viewBox="0 0 810 580" fill="none" className={className} aria-hidden="true">
      <polygon points={PONTOS} fill={color} />
    </svg>
  )
}

/**
 * A coroa com o brilho varrendo — o mesmo `ThinkingMark` do app, usado enquanto o agente
 * trabalha. Pinta com `currentColor`, então quem usa decide a cor pelo `text-…`.
 */
export function CoroaTrabalhando({ className = 'h-4 w-auto' }) {
  return (
    <svg viewBox="0 0 810 580" className={className} aria-hidden="true">
      <defs>
        <mask id="coroa-brilho">
          <polygon points={PONTOS} fill="#fff" />
        </mask>
      </defs>
      <polygon points={PONTOS} fill="currentColor" opacity="0.25" />
      <g mask="url(#coroa-brilho)">
        <rect className="thinking-shine" x="-280" y="-20" width="280" height="620" />
      </g>
    </svg>
  )
}

export default Coroa
