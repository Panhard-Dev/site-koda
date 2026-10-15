// Copiado de koda/src/components/TarefaIncompleta.tsx — ver scripts/copiar-koda.mjs
import { Play, TriangleAlert } from "lucide-react";
const MOTIVOS = {
  pending_steps: "Ficaram itens do plano que o pr\xF3prio agente registrou.",
  announced_only: "O agente anunciou o pr\xF3ximo passo e encerrou sem execut\xE1-lo.",
  time_limit: "O tempo m\xE1ximo da tarefa acabou antes de terminar.",
  tool_limit: "O teto de chamadas de ferramenta foi atingido.",
  step_limit: "O limite de passos desta rodada foi atingido.",
  repeated_tool: "A mesma chamada se repetiu e o trabalho foi interrompido.",
  reasoning_repetition: "O racioc\xEDnio do modelo entrou em repeti\xE7\xE3o e a rodada foi interrompida.",
  empty_response: "O provedor respondeu vazio v\xE1rias vezes seguidas.",
  provider_error: "O provedor caiu e n\xE3o deu para continuar.",
  context_overflow: "O pedido n\xE3o caberia no contexto do modelo, nem reduzido.",
  interrupted: "A tarefa foi interrompida."
};
const MOTIVO_PADRAO = "A rodada terminou antes de concluir o que foi pedido.";
function TarefaIncompleta({
  motivo,
  pendentes = [],
  executou = 0,
  retomavel = true,
  onRetomar,
  ocupado = false
}) {
  const itens = pendentes.filter(Boolean);
  const podeRetomar = retomavel && Boolean(onRetomar);
  return <div className="msg-in mt-2 flex min-w-0 flex-col gap-2 rounded-xl bg-koda-fg/4 px-3 py-2.5 ring-1 ring-koda-fg/10">
      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex min-w-0 items-center gap-2 text-[13px] font-medium break-words text-koda-fg/85">
          <TriangleAlert className="h-3.5 w-3.5 shrink-0 text-koda-accent" strokeWidth={1.8} />
          Tarefa não concluída
        </span>

        {podeRetomar ? <button
    type="button"
    disabled={ocupado}
    onClick={onRetomar}
    className="ml-auto flex shrink-0 items-center gap-1.5 rounded-lg bg-koda-accent/15 px-2.5 py-1 text-[12.5px] font-medium text-koda-accent ring-1 ring-koda-accent/25 transition-colors duration-150 hover:bg-koda-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-koda-accent disabled:cursor-default disabled:opacity-50"
  >
            <Play className="h-3 w-3" strokeWidth={2} />
            {ocupado ? "Retomando\u2026" : "Retomar"}
          </button> : null}
      </div>

      <p className="text-[12.5px] leading-snug text-koda-fg/60">
        {motivo && MOTIVOS[motivo] || MOTIVO_PADRAO}
        {executou > 0 ? " O que j\xE1 foi executado est\xE1 no disco \u2014 confira antes de repetir." : ""}
      </p>

      {itens.length > 0 ? <ul className="flex flex-col gap-1 text-[12.5px] leading-snug text-koda-fg/70">
          {itens.map((item) => <li key={item} className="flex min-w-0 gap-2">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-koda-accent/60" />
              <span className="min-w-0 break-words">{item}</span>
            </li>)}
        </ul> : null}
    </div>;
}
export {
  TarefaIncompleta as default
};
