// Copiado de koda/src/components/ContextRing.tsx — ver scripts/copiar-koda.mjs
import { useEffect, useState } from "react";
function cor(fracao) {
  if (fracao >= 0.85) return "#f87171";
  if (fracao >= 0.6) return "#fbbf24";
  return "#34d399";
}
function emK(valor) {
  if (valor >= 1e6) return `${(valor / 1e6).toFixed(valor % 1e6 === 0 ? 0 : 1)}M`;
  if (valor >= 1e3) return `${(valor / 1e3).toFixed(valor % 1e3 === 0 ? 0 : 1)}K`;
  return String(Math.round(valor));
}
function descricaoDoContexto(usado, janela) {
  if (!janela || janela <= 0) return `${emK(usado)} tokens de contexto`;
  const fracao = Math.min(1, usado / janela);
  return `${(fracao * 100).toFixed(1)}% \xB7 ${emK(usado)} / ${emK(janela)} contexto usado`;
}
function ContextRing({
  usado = 0,
  janela = null,
  trabalhando = false,
  tamanho = 14,
  className = ""
}) {
  const [mostrado, setMostrado] = useState(0);
  const alvo = janela && janela > 0 ? Math.min(1, usado / janela) : 0;
  useEffect(() => {
    const passo = window.setTimeout(() => setMostrado(alvo), 30);
    return () => window.clearTimeout(passo);
  }, [alvo]);
  const traco = 2;
  const raio = (tamanho - traco) / 2;
  const volta = 2 * Math.PI * raio;
  const preenchido = volta * mostrado;
  const titulo = descricaoDoContexto(usado, janela);
  return <span
    className={`inline-flex items-center justify-center ${className}`}
    title={titulo}
    aria-label={titulo}
    role="img"
  >
      <svg width={tamanho} height={tamanho} viewBox={`0 0 ${tamanho} ${tamanho}`} aria-hidden>
        {
    /* Trilho: o que existe de janela. */
  }
        <circle
    cx={tamanho / 2}
    cy={tamanho / 2}
    r={raio}
    fill="none"
    stroke="currentColor"
    strokeOpacity={0.18}
    strokeWidth={traco}
  />
        {
    /* O que já foi usado, com a cor da faixa. */
  }
        <circle
    cx={tamanho / 2}
    cy={tamanho / 2}
    r={raio}
    fill="none"
    stroke={cor(alvo)}
    strokeWidth={traco}
    strokeLinecap="round"
    strokeDasharray={`${preenchido} ${volta}`}
    transform={`rotate(-90 ${tamanho / 2} ${tamanho / 2})`}
    style={{ transition: "stroke-dasharray 400ms ease-out" }}
  />
        {
    /* Trabalhando: um arco fino girando por cima, para a bolinha "rodar". */
  }
        {trabalhando && <circle
    cx={tamanho / 2}
    cy={tamanho / 2}
    r={raio}
    fill="none"
    stroke="currentColor"
    strokeWidth={traco}
    strokeLinecap="round"
    strokeDasharray={`${volta * 0.18} ${volta}`}
    className="contexto-girando"
  />}
      </svg>
    </span>;
}
export {
  ContextRing as default,
  descricaoDoContexto,
  emK
};
