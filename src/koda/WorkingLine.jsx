// Copiado de koda/src/components/WorkingLine.tsx — ver scripts/copiar-koda.mjs
import { formatarDuracao } from "./duracao";
import { resumoArgumentos, rotuloFerramenta } from "./tools";
import ThinkingMark from "./ThinkingMark";
import { ToolSpinner } from "./ToolIcon";
function WorkingLine({
  passo = null,
  segundos
}) {
  return <div className="flex items-center gap-3 py-0.5">
      {passo ? <ToolSpinner className="h-3.5 w-3.5 shrink-0 text-koda-accent" /> : <ThinkingMark className="h-3.5 w-auto shrink-0 text-koda-fg/70" />}

      <span className="min-w-0 truncate text-[13px] text-koda-fg/45">
        {passo ? <>
            Rodando <span className="text-koda-fg/75">{rotuloFerramenta(passo.name)}</span>{" "}
            <span className="font-mono text-[11.5px] text-koda-fg/30">
              {resumoArgumentos(passo.arguments, 56)}
            </span>
          </> : "Trabalhando\u2026"}
      </span>

      {segundos === void 0 ? null : <span className="ml-auto shrink-0 font-mono text-[11.5px] tabular-nums text-koda-fg/25">
          {formatarDuracao(segundos * 1e3)}
        </span>}
    </div>;
}
export {
  WorkingLine as default
};
