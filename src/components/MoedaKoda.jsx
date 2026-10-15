/**
 * A moeda do Koda — o «K» na moeda roxa. É ela que aparece na **aba** da caixa de
 * mensagem do app (`Composer.tsx`), não a coroa: a coroa é a marca, a moeda é a aba.
 *
 * Desenho copiado de `koda/src/components/MoedaKoda.tsx`. Os ids dos gradientes levam
 * prefixo `site-` porque aqui pode haver mais de uma moeda na mesma página, e id repetido
 * de gradiente faz uma puxar o preenchimento da outra.
 */
export default function MoedaKoda({ className }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="site-moeda-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3e8ff" />
          <stop offset="0.5" stopColor="#9333ea" />
          <stop offset="1" stopColor="#4c1d95" />
        </linearGradient>
        <radialGradient id="site-moeda-face" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#d8b4fe" />
          <stop offset="0.55" stopColor="#a855f7" />
          <stop offset="1" stopColor="#6b21a8" />
        </radialGradient>
        <linearGradient id="site-moeda-letter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5e9ff" />
          <stop offset="1" stopColor="#b57af5" />
        </linearGradient>
        <linearGradient id="site-moeda-ring" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f3e8ff" />
          <stop offset="1" stopColor="#5b21b6" />
        </linearGradient>
      </defs>

      <circle cx="256" cy="256" r="240" fill="url(#site-moeda-rim)" />
      <circle
        cx="256"
        cy="256"
        r="231"
        fill="none"
        stroke="#3b0764"
        strokeWidth="10"
        strokeDasharray="3 6"
        opacity="0.45"
      />

      <circle cx="256" cy="256" r="212" fill="url(#site-moeda-face)" />
      <circle cx="256" cy="256" r="212" fill="none" stroke="#3b0764" strokeWidth="3" opacity="0.5" />

      <circle cx="256" cy="256" r="186" fill="none" stroke="url(#site-moeda-ring)" strokeWidth="8" />
      <circle
        cx="256"
        cy="256"
        r="172"
        fill="none"
        stroke="#4c1d95"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
        opacity="0.7"
      />

      <g strokeLinejoin="round">
        <polygon
          transform="translate(5 6)"
          fill="#3b0764"
          opacity="0.55"
          stroke="#3b0764"
          strokeWidth="6"
          points="186,148 234,148 234,236 310,148 368,148 276,254 376,364 316,364 234,272 234,364 186,364"
        />
        <polygon
          transform="translate(-2 -2)"
          fill="#fbf5ff"
          stroke="#fbf5ff"
          strokeWidth="6"
          points="186,148 234,148 234,236 310,148 368,148 276,254 376,364 316,364 234,272 234,364 186,364"
        />
        <polygon
          fill="url(#site-moeda-letter)"
          stroke="#6b21a8"
          strokeWidth="4"
          points="186,148 234,148 234,236 310,148 368,148 276,254 376,364 316,364 234,272 234,364 186,364"
        />
      </g>

      <path
        d="M110 170 A 160 160 0 0 1 220 82"
        fill="none"
        stroke="#fff"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}
