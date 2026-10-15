// Copiado de koda/src/components/DiffDoPasso.tsx — ver scripts/copiar-koda.mjs
import { useEffect, useState } from "react";
const TETO_DE_LINHAS = 300;
function tipoDaMudanca(argumentos) {
  if (!argumentos) return null;
  if ("old_string" in argumentos || "new_string" in argumentos) return "edicao";
  if (typeof argumentos.diff === "string") return "patch";
  if (typeof argumentos.conteudo === "string") return "escrita";
  return null;
}
function bloco(texto, tipo) {
  return texto.split("\n").map((linha) => ({ tipo, texto: linha }));
}
function doDiffUnificado(diff) {
  const linhas = [];
  for (const linha of diff.split("\n")) {
    if (/^(---|\+\+\+|@@|diff |index )/.test(linha)) continue;
    if (linha.startsWith("+")) linhas.push({ tipo: "entrou", texto: linha.slice(1) });
    else if (linha.startsWith("-")) linhas.push({ tipo: "saiu", texto: linha.slice(1) });
    else if (linha.startsWith(" ") || linha === "") {
      linhas.push({ tipo: "igual", texto: linha.slice(1) });
    }
  }
  return linhas;
}
function dosArgumentos(step, tipo) {
  const argumentos = step.arguments ?? {};
  if (tipo === "edicao") {
    return [
      ...bloco(String(argumentos.old_string ?? ""), "saiu"),
      ...bloco(String(argumentos.new_string ?? ""), "entrou")
    ];
  }
  if (tipo === "patch") return doDiffUnificado(String(argumentos.diff ?? ""));
  return bloco(String(argumentos.conteudo ?? ""), "entrou");
}
function DiffDoPasso({ step }) {
  const tipo = tipoDaMudanca(step.arguments);
  const [linhas, setLinhas] = useState(() => tipo ? dosArgumentos(step, tipo) : []);
  const pergunta = tipo === "escrita";
  useEffect(() => {
    if (!pergunta || !step.call_id) return;
    let parado = false;
    void (async () => {
      try {
        const { itens } = await mudancasDaChamada(step.call_id);
        if (parado) return;
        const completo = itens.find((item) => item.linhas && item.linhas.length > 0)?.linhas;
        if (!completo) return;
        setLinhas(completo.map((item) => ({ tipo: item.tipo, texto: item.texto })));
      } catch {
      }
    })();
    return () => {
      parado = true;
    };
  }, [pergunta, step.call_id]);
  if (!tipo || linhas.length === 0) return null;
  const mais = linhas.filter((linha) => linha.tipo === "entrou").length;
  const menos = linhas.filter((linha) => linha.tipo === "saiu").length;
  const mostradas = linhas.length > TETO_DE_LINHAS ? linhas.slice(0, TETO_DE_LINHAS) : linhas;
  return <div className="mt-1 mb-1 overflow-hidden rounded-md border border-koda-fg/10">
      <div className="flex items-center gap-2 border-b border-koda-fg/8 px-2 py-1">
        <span className="text-[10.5px] text-koda-fg/40">
          {tipo === "escrita" ? "o que a chamada escreveu" : "o que a chamada mudou"}
        </span>
        <span className="ml-auto font-mono text-[10.5px] tabular-nums">
          <span className="text-emerald-400">+{mais}</span>
          {menos > 0 ? <span className="text-red-400"> −{menos}</span> : null}
        </span>
      </div>

      <pre className="max-h-64 overflow-auto font-mono text-[11.5px] leading-[1.6]">
        {mostradas.map((linha, indice) => {
    const entrou = linha.tipo === "entrou";
    const saiu = linha.tipo === "saiu";
    return <span
      key={indice}
      className={[
        "flex",
        entrou ? "bg-emerald-500/12" : saiu ? "bg-red-500/12" : ""
      ].join(" ")}
    >
              <span
      aria-hidden
      className={[
        "w-4 shrink-0 pl-1 select-none",
        entrou ? "text-emerald-400" : saiu ? "text-red-400" : "text-transparent"
      ].join(" ")}
    >
                {entrou ? "+" : saiu ? "\u2212" : "\xB7"}
              </span>
              <span className={["whitespace-pre pr-2", saiu ? "text-koda-fg/55" : ""].join(" ")}>
                {linha.texto === "" ? " " : linha.texto}
              </span>
            </span>;
  })}
      </pre>

      {linhas.length > TETO_DE_LINHAS ? <p className="border-t border-koda-fg/8 px-2 py-1 text-[10.5px] text-koda-fg/40">
          …e mais {(linhas.length - TETO_DE_LINHAS).toLocaleString("pt-BR")} linhas. O arquivo
          inteiro está na aba Código.
        </p> : null}
    </div>;
}
export {
  DiffDoPasso as default
};
