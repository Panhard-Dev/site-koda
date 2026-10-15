// Copiado de koda/src/components/Subs.tsx — ver scripts/copiar-koda.mjs
import { useEffect, useRef, useSyncExternalStore } from "react";
import { ArrowUp, Bot, ChevronDown, ListTodo, LoaderCircle, Square } from "lucide-react";
import { EFFORT_PADRAO } from "./effort";
import { MODEL_LABELS, MODELO_PADRAO, modelMenu } from "./models";
import BolhaUsuario from "./BolhaUsuario";
import FalaDoModelo from "./FalaDoModelo";
import KodaLogo from "./KodaLogo";
import { Menu } from "./Menu";
import Reasoning from "./Reasoning";
import TarefaIncompleta from "./TarefaIncompleta";
import ToolSteps from "./ToolSteps";
import WorkingLine from "./WorkingLine";
const ABAS_DO_SUBS = 4;
const SUBS_POR_RODADA = ABAS_DO_SUBS - 1;
const falaVazia = (role, texto = "") => ({
  id: novoId(),
  role,
  texto,
  raciocinio: "",
  passos: [],
  incompleto: false,
  motivo: null,
  pendentes: [],
  executou: 0,
  retomavel: false
});
const ABA_DA_CONVERSA = "conversa";
let estado = {
  conversa: null,
  modelo: MODELO_PADRAO,
  rascunho: "",
  falas: [],
  ocupado: false,
  inicio: 0,
  segundos: 0,
  catalogo: null,
  todos: [],
  aba: ABA_DA_CONVERSA
};
const ouvintes = /* @__PURE__ */ new Set();
const assinar = (avisar) => {
  ouvintes.add(avisar);
  return () => {
    ouvintes.delete(avisar);
  };
};
const ler = () => estado;
const mudar = (mudanca) => {
  estado = { ...estado, ...mudanca };
  ouvintes.forEach((avisar) => avisar());
};
let pararAtual = null;
const novoId = () => crypto.randomUUID();
function Subs({
  projeto,
  subs = []
}) {
  const { modelo, rascunho, falas, ocupado, segundos, catalogo, todos, aba } = useSyncExternalStore(assinar, ler);
  const listaRef = useRef(null);
  const abaAtiva = subs.some((item) => item.chamada === aba) ? aba : ABA_DA_CONVERSA;
  const sessao = subs.find((item) => item.chamada === abaAtiva) ?? null;
  const caminhoDoProjeto = projeto?.existe ? projeto.caminho : null;
  useEffect(() => {
    if (estado.catalogo) return;
    void (async () => {
      try {
        mudar({ catalogo: await listModels() });
      } catch {
        mudar({ catalogo: [] });
      }
    })();
  }, []);
  useEffect(() => {
    if (!ocupado) return;
    const id = window.setInterval(
      () => mudar({ segundos: Math.round((Date.now() - estado.inicio) / 1e3) }),
      400
    );
    return () => window.clearInterval(id);
  }, [ocupado]);
  useEffect(() => {
    const caixa = listaRef.current;
    if (caixa) caixa.scrollTop = caixa.scrollHeight;
  }, [falas]);
  const mexer = (id, mudarFala) => mudar({ falas: estado.falas.map((fala) => fala.id === id ? mudarFala(fala) : fala) });
  const enviar = async (resume = false) => {
    const texto = estado.rascunho.trim();
    if (estado.ocupado) return;
    if (!resume && !texto) return;
    const resposta = falaVazia("assistant");
    const novas = resume ? [resposta] : [falaVazia("user", texto), resposta];
    mudar({
      rascunho: resume ? estado.rascunho : "",
      falas: [...estado.falas, ...novas],
      ocupado: true,
      inicio: Date.now(),
      segundos: 0
    });
    const controller = new AbortController();
    pararAtual = controller;
    try {
      await streamChat(
        {
          text: resume ? "" : texto,
          model: estado.modelo,
          reasoning: true,
          effort: EFFORT_PADRAO,
          web: false,
          project_path: caminhoDoProjeto,
          attachments: [],
          conversation_id: estado.conversa,
          tz_offset_minutes: (/* @__PURE__ */ new Date()).getTimezoneOffset(),
          // Livre: esta aba não tem cartão de permissão, e um pedido sem cartão deixaria o
          // agente parado esperando resposta. Vale para esta rodada só — o modo guardado do
          // app não muda, e o chat de baixo continua seguindo o dele.
          livre: true,
          ...resume ? { resume: true } : {}
        },
        {
          signal: controller.signal,
          onStart: (dados) => mudar({ conversa: dados.conversation_id }),
          onDelta: (pedaco) => mexer(resposta.id, (fala) => ({ ...fala, texto: fala.texto + pedaco })),
          onReasoning: (pedaco) => mexer(resposta.id, (fala) => ({ ...fala, raciocinio: fala.raciocinio + pedaco })),
          onToolCall: (dados) => mexer(resposta.id, (fala) => ({
            ...fala,
            passos: [
              ...fala.passos,
              {
                name: dados.name,
                arguments: dados.arguments,
                output: "",
                duration_ms: 0,
                call_id: dados.id,
                ok: true,
                mcp: dados.mcp ?? null
              }
            ]
          })),
          onToolResult: (dados) => mexer(resposta.id, (fala) => ({
            ...fala,
            passos: fala.passos.map(
              (passo) => passo.call_id === dados.id ? {
                ...passo,
                output: dados.output,
                duration_ms: dados.duration_ms,
                ok: dados.ok,
                mcp: dados.mcp ?? passo.mcp ?? null
              } : passo
            )
          })),
          onTodos: (dados) => mudar({ todos: dados.todos }),
          // A rodada vai como `livre`, então isto **não** deveria chegar. Se chegar — backend
          // de uma versão anterior, ou o modo trocado no meio do caminho —, o Subs responde
          // «sim» sozinho em vez de pendurar a rodada para sempre: é o que «livre» quer dizer
          // aqui, e um pedido sem cartão não tem quem responda.
          onApprovalRequest: (dados) => {
            void answerApproval(dados.id, "sim");
          },
          onDone: (dados) => mexer(resposta.id, (fala) => ({
            ...fala,
            incompleto: dados.completed === false,
            motivo: dados.reason ?? null,
            pendentes: dados.pending_items ?? [],
            executou: dados.executed ?? 0,
            retomavel: dados.resumable ?? false
          })),
          onError: (mensagem) => mexer(resposta.id, (fala) => ({
            ...fala,
            texto: fala.texto ? `${fala.texto}

${mensagem}` : mensagem
          }))
        }
      );
    } catch (erro) {
      if (!controller.signal.aborted) {
        const motivo = fraseDeFalha(erro);
        mexer(resposta.id, (fala) => ({
          ...fala,
          texto: fala.texto ? `${fala.texto}

[${motivo}]` : motivo
        }));
      }
    } finally {
      if (pararAtual === controller) pararAtual = null;
      mudar({ ocupado: false });
    }
  };
  const parar = () => {
    pararAtual?.abort();
    pararAtual = null;
    mudar({ ocupado: false });
  };
  const rotuloDoModelo = catalogo?.find((item) => item.value === modelo)?.label ?? MODEL_LABELS[modelo] ?? modelo;
  const feitos = todos.filter((item) => item.feito).length;
  const emCurso = todos.find((item) => item.atual && !item.feito) ?? todos.find((item) => !item.feito);
  return <div className="flex min-h-0 flex-1 flex-col">
      {
    /* As abas só existem quando há sub-agente lançado: sem nenhum, a área é a conversa e
       mais nada — uma barra de uma aba só seria moldura sem conteúdo. */
  }
      {subs.length > 0 ? <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-koda-fg/10 px-2 py-1.5">
          <AbaDoSub
    ativa={abaAtiva === ABA_DA_CONVERSA}
    rotulo="Conversa"
    vivo={false}
    onClick={() => mudar({ aba: ABA_DA_CONVERSA })}
  />
          {subs.map((item) => <AbaDoSub
    key={item.chamada}
    ativa={abaAtiva === item.chamada}
    rotulo={item.agente}
    vivo={item.vivo}
    onClick={() => mudar({ aba: item.chamada })}
  />)}
        </div> : null}

      {sessao ? <PainelDoSub sessao={sessao} /> : <>
      <div ref={listaRef} className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {falas.length === 0 ? <div className="flex h-full items-center justify-center px-6">
            <p className="max-w-[38ch] text-center text-[12.5px] leading-relaxed text-koda-fg/40">
              Uma conversa separada da de baixo, no mesmo projeto
              {projeto?.nome ? ` (${projeto.nome})` : ""}. Pergunte aqui o que quiser — a
              conversa principal não é tocada.
            </p>
          </div> : <div className="flex flex-col gap-3">
            {falas.map(
    (fala, indice) => fala.role === "user" ? <div key={fala.id} className="flex justify-end">
                  <BolhaUsuario texto={fala.texto} />
                </div> : <div key={fala.id} className="flex min-w-0 flex-col gap-1.5">
                  {fala.raciocinio ? <Reasoning texto={fala.raciocinio} ativo={ocupado && !fala.texto} /> : null}
                  {fala.passos.length > 0 ? <ToolSteps steps={fala.passos} resumido /> : null}
                  {fala.texto ? <FalaDoModelo texto={fala.texto} /> : null}
                  {
      /* A resposta ainda sem nada na tela: a linha de trabalho é a única prova
         de que tem alguém ali. Depois do primeiro texto ela desce para o fim. */
    }
                  {ocupado && !fala.texto && fala.passos.length === 0 && !fala.raciocinio ? <WorkingLine segundos={segundos} /> : null}
                  {
      /* Só na última: numa rodada antiga, retomar pegaria um assunto que a
         conversa já deixou para trás. */
    }
                  {fala.incompleto && indice === falas.length - 1 ? <TarefaIncompleta
      motivo={fala.motivo}
      pendentes={fala.pendentes}
      executou={fala.executou}
      retomavel={fala.retomavel}
      ocupado={ocupado}
      onRetomar={() => void enviar(true)}
    /> : null}
                </div>
  )}
            {ocupado && falas.at(-1)?.texto ? <WorkingLine segundos={segundos} /> : null}
          </div>}
      </div>

      {
    /* O plano que o agente registrou, em uma linha: sem isto o `update_todos` dele não
       teria onde aparecer, e uma tarefa longa ficaria sem rumo à vista. */
  }
      {todos.length > 0 ? <div className="flex shrink-0 items-center gap-2 border-t border-koda-fg/8 px-3 py-1.5">
          <ListTodo className="h-3.5 w-3.5 shrink-0 text-koda-fg/40" strokeWidth={1.8} />
          <span className="shrink-0 font-mono text-[11.5px] tabular-nums text-koda-fg/45">
            {feitos}/{todos.length}
          </span>
          <span className="min-w-0 truncate text-[11.5px] text-koda-fg/60">
            {emCurso?.texto ?? "plano conclu\xEDdo"}
          </span>
        </div> : null}

      {
    /*
    * O prompt box — três peças soltas, e é o pedido: a caixa, o modelo e o enviar, cada um
    * com a sua borda. Nada de silhueta única aqui.
    */
  }
      <div className="flex shrink-0 flex-col gap-2 border-t border-koda-fg/10 px-3 py-3">
        <textarea
    value={rascunho}
    onChange={(evento) => mudar({ rascunho: evento.target.value })}
    onKeyDown={(evento) => {
      if (evento.key === "Enter" && !evento.shiftKey) {
        evento.preventDefault();
        void enviar();
      }
    }}
    rows={2}
    placeholder="Escreva aqui…"
    spellCheck={false}
    className="w-full resize-none rounded-xl bg-koda-input px-3 py-2 text-[13.5px] leading-5 text-koda-fg ring-1 ring-koda-fg/10 transition-colors placeholder:text-koda-fg/35 focus:outline-none focus:ring-koda-accent/60"
  />

        <div className="flex items-center gap-2">
          {
    /* O `Menu` já desenha o `<button>` do gatilho: o que vai aqui é o conteúdo dele, e
       a cara vem no `triggerClassName`. */
  }
          <Menu
    options={modelMenu(catalogo ?? [], [])}
    value={modelo}
    onSelect={(valor) => mudar({ modelo: valor })}
    direction="up"
    align="start"
    label="Modelo"
    panelClassName="w-64"
    triggerClassName="flex h-8 min-w-0 items-center gap-1.5 rounded-lg px-2 text-[12.5px] text-koda-fg/70 ring-1 ring-koda-fg/10 transition-colors duration-150 hover:bg-koda-fg/8 hover:text-koda-fg focus-visible:ring-2 focus-visible:ring-koda-accent focus-visible:outline-none"
  >
            <KodaLogo className="h-3.5 w-auto shrink-0" color="currentColor" />
            <span className="max-w-[150px] truncate">{rotuloDoModelo}</span>
            <ChevronDown className="h-3 w-3 shrink-0" strokeWidth={2} />
          </Menu>

          {ocupado ? <button
    type="button"
    aria-label="Parar"
    title="Parar"
    onClick={parar}
    className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-koda-fg/15 text-koda-fg transition-colors duration-150 hover:bg-koda-fg/25 focus-visible:ring-2 focus-visible:ring-koda-accent focus-visible:outline-none"
  >
              <Square className="h-3 w-3 fill-current" strokeWidth={0} />
            </button> : <button
    type="button"
    aria-label="Enviar"
    title="Enviar"
    disabled={!rascunho.trim()}
    onClick={() => void enviar()}
    className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-koda-accent-strong text-white transition-opacity duration-150 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-koda-accent focus-visible:outline-none disabled:cursor-default disabled:opacity-35"
  >
              <ArrowUp className="h-4 w-4" strokeWidth={2} />
            </button>}
        </div>
      </div>
        </>}
    </div>;
}
function AbaDoSub({
  ativa,
  rotulo,
  vivo,
  onClick
}) {
  return <button
    type="button"
    aria-selected={ativa}
    role="tab"
    onClick={onClick}
    title={rotulo}
    className={[
      "flex h-7 max-w-[42%] shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[12px] whitespace-nowrap transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-koda-accent",
      ativa ? "bg-koda-fg/12 text-koda-fg" : "text-koda-fg/55 hover:bg-koda-fg/8 hover:text-koda-fg"
    ].join(" ")}
  >
      {vivo ? <LoaderCircle className="h-3 w-3 shrink-0 animate-spin text-koda-accent" strokeWidth={2} /> : <Bot className="h-3.5 w-3.5 shrink-0 text-koda-fg/45" strokeWidth={1.8} />}
      <span className="min-w-0 truncate">{rotulo}</span>
    </button>;
}
function PainelDoSub({ sessao }) {
  return <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
      <div className="flex flex-col gap-3">
        {sessao.passos.length > 0 ? <ToolSteps steps={sessao.passos} resumido /> : null}
        {sessao.texto ? <FalaDoModelo texto={sessao.texto} /> : null}
        {
    /* Enquanto ele trabalha, a linha fica de pé — é a prova de que tem alguém ali,
       mesmo quando ele está calado esperando uma ferramenta. */
  }
        {sessao.vivo ? <WorkingLine /> : null}
      </div>
    </div>;
}
export {
  ABAS_DO_SUBS,
  SUBS_POR_RODADA,
  Subs as default
};
