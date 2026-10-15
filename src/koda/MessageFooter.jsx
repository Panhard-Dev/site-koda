// Copiado de koda/src/components/MessageFooter.tsx — ver scripts/copiar-koda.mjs
import { useEffect, useRef, useState } from "react";
import { Check, Clock, Coins, Copy, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import { formatarDuracao } from "./duracao";
import MoedaKoda from "./MoedaKoda";
import { moedasDeTokens } from "./custo";
const formatarMoedas = (moedas) => Number.isInteger(moedas) ? `${moedas}` : moedas.toFixed(1).replace(".", ",");
const formatarTokens = (tokens) => {
  if (tokens < 1e3) return `${tokens}`;
  if (tokens < 1e6) return `${(tokens / 1e3).toFixed(1).replace(".", ",")}K`;
  return `${(tokens / 1e6).toFixed(1).replace(".", ",")}M`;
};
const formatarHora = (ms) => new Date(ms).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
async function copiarTexto(conteudo) {
  try {
    await navigator.clipboard.writeText(conteudo);
    return true;
  } catch {
  }
  try {
    const campo = document.createElement("textarea");
    campo.value = conteudo;
    campo.setAttribute("readonly", "");
    campo.style.position = "fixed";
    campo.style.top = "-1000px";
    campo.style.opacity = "0";
    document.body.appendChild(campo);
    campo.select();
    const deu = document.execCommand("copy");
    document.body.removeChild(campo);
    return deu;
  } catch {
    return false;
  }
}
function Botao({
  titulo,
  ativo = false,
  desabilitado = false,
  pressionado,
  onClick,
  children
}) {
  return <button
    type="button"
    title={titulo}
    aria-label={titulo}
    {...pressionado === void 0 ? {} : { "aria-pressed": pressionado }}
    disabled={desabilitado}
    onClick={onClick}
    className={[
      "flex h-6 w-6 items-center justify-center rounded-md transition-colors duration-150",
      ativo ? "text-koda-accent" : "text-koda-fg/35 hover:text-koda-fg/80",
      desabilitado ? "cursor-default opacity-40" : "cursor-pointer"
    ].join(" ")}
  >
      {children}
    </button>;
}
function Marca({ titulo, children }) {
  return <span title={titulo} className="flex items-center gap-1.5">
      {children}
    </span>;
}
function MessageFooter({
  texto,
  tokens = null,
  tokensTotal = null,
  modelo = null,
  elapsedMs = null,
  at,
  numeros = true,
  ocupado = false,
  onRefazer
}) {
  const [copiado, setCopiado] = useState(false);
  const [voto, setVoto] = useState(null);
  const timer = useRef(null);
  const moedas = tokensTotal !== null && modelo ? moedasDeTokens(tokensTotal, modelo) : null;
  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    []
  );
  const copiar = async () => {
    if (!texto.trim()) return;
    if (!await copiarTexto(texto)) return;
    setCopiado(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopiado(false), 1800);
  };
  return <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-1.5">
      <div className="flex items-center gap-0.5">
        {texto.trim() ? <Botao titulo={copiado ? "Copiado" : "Copiar resposta"} ativo={copiado} onClick={() => void copiar()}>
            {copiado ? <Check className="h-3.5 w-3.5" strokeWidth={1.7} /> : <Copy className="h-3.5 w-3.5" strokeWidth={1.7} />}
          </Botao> : null}

        <Botao
    titulo="Boa resposta"
    ativo={voto === "bom"}
    pressionado={voto === "bom"}
    onClick={() => setVoto((atual) => atual === "bom" ? null : "bom")}
  >
          <ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.7} />
        </Botao>

        <Botao
    titulo="Resposta ruim"
    ativo={voto === "ruim"}
    pressionado={voto === "ruim"}
    onClick={() => setVoto((atual) => atual === "ruim" ? null : "ruim")}
  >
          <ThumbsDown className="h-3.5 w-3.5" strokeWidth={1.7} />
        </Botao>

        {onRefazer ? <Botao titulo="Rodar de novo" desabilitado={ocupado} onClick={onRefazer}>
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.7} />
          </Botao> : null}
      </div>

      {numeros ? <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-koda-fg/35">
          {tokens ? <Marca titulo={`${tokens.toLocaleString("pt-BR")} tokens escritos nesta resposta`}>
              <Coins className="h-3.5 w-3.5" strokeWidth={1.7} />
              <span className="tabular-nums">{formatarTokens(tokens)} tok</span>
            </Marca> : null}

          {
    /* O gasto em moedas, e não o tamanho: é a conta, e é o que a pessoa quer saber
       depois de uma resposta que trabalhou. O `title` mostra os tokens cobrados crus,
       porque um número que vira dinheiro tem de poder ser conferido. */
  }
          {moedas !== null ? <Marca
    titulo={`${(tokensTotal ?? 0).toLocaleString("pt-BR")} tokens cobrados \xB7 ${modelo}`}
  >
              <MoedaKoda className="h-3.5 w-3.5" />
              <span className="tabular-nums">{formatarMoedas(moedas)} moedas</span>
            </Marca> : null}

          {elapsedMs !== null ? <Marca titulo="Tempo que esta resposta levou">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.7} />
              <span className="tabular-nums">Levou {formatarDuracao(elapsedMs)}</span>
            </Marca> : null}

          <span title="Hora da resposta" className="tabular-nums">
            {formatarHora(at)}
          </span>
        </div> : null}
    </div>;
}
export {
  MessageFooter as default
};
