// Copiado de koda/src/components/PainelLateral.tsx — ver scripts/copiar-koda.mjs
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowRight, Check, RotateCw, X } from "lucide-react";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Webview } from "@tauri-apps/api/webview";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { LogicalPosition, LogicalSize } from "@tauri-apps/api/dpi";
import { DENTRO_DO_TAURI } from "./WindowControls";
import { AbaCodigo } from "./PainelCodigo";
import Subs from "./Subs";
const ABAS = ["Painel Dev", "C\xF3digo", "Subs", "Logs"];
function caminhoLocal(valor) {
  const bruto = valor.trim();
  if (/^file:\/\//i.test(bruto)) {
    const semEsquema = bruto.replace(/^file:\/\//i, "");
    const caminho = /^\/[a-z]:/i.test(semEsquema) ? semEsquema.slice(1) : semEsquema;
    try {
      return decodeURIComponent(caminho);
    } catch {
      return caminho;
    }
  }
  if (/^[a-z]:[\\/]/i.test(bruto)) return bruto;
  if (/^\\\\/.test(bruto)) return bruto;
  return null;
}
function acharTextoNaMoldura(documento, busca) {
  const alvo = busca.trim().toLowerCase();
  const grupos = [
    documento.querySelectorAll("h1,h2,h3,h4,h5,h6"),
    documento.querySelectorAll("p,li,td,th,dt,dd,label,button,a,span,div")
  ];
  for (const grupo of grupos) {
    for (const el of Array.from(grupo)) {
      if (el.children.length > 0) continue;
      if ((el.textContent ?? "").trim().toLowerCase().startsWith(alvo)) return el;
    }
  }
  for (const grupo of grupos) {
    for (const el of Array.from(grupo)) {
      if (el.children.length > 0) continue;
      if ((el.textContent ?? "").toLowerCase().includes(alvo)) return el;
    }
  }
  return null;
}
function normalizar(valor) {
  const bruto = valor.trim();
  if (!bruto) return "";
  return /^https?:\/\//i.test(bruto) ? bruto : `https://${bruto}`;
}
function enderecoDoArquivo(caminho) {
  if (DENTRO_DO_TAURI) return convertFileSrc(caminho);
  const seguro = encodeURI(caminho).replace(/#/g, "%23").replace(/\?/g, "%3F");
  return new URL(`/@local/${seguro}`, window.location.origin).toString();
}
function LinhaDeLog({ erro }) {
  const grave = erro.severidade === "grave";
  return <li className="border-b border-koda-fg/8 px-3 py-2.5 last:border-b-0">
      <div className="flex flex-wrap items-center gap-1.5">
        <span
    aria-hidden
    className={["h-1.5 w-1.5 shrink-0 rounded-full", grave ? "bg-red-500" : "bg-amber-400"].join(" ")}
  />
        <span className="text-[11px] font-medium tracking-wide text-koda-fg/55 uppercase">
          {erro.fonte}/{erro.tipo}
        </span>
        <span
    className={[
      "rounded px-1.5 py-0.5 text-[10.5px] font-medium",
      grave ? "bg-red-500/12 text-red-500" : "bg-amber-400/20 text-amber-600"
    ].join(" ")}
  >
          {erro.severidade}
        </span>
        {erro.ocorrencias > 1 ? <span className="text-[10.5px] text-koda-fg/45">×{erro.ocorrencias}</span> : null}
        {erro.repetindo ? <span className="rounded bg-orange-500/15 px-1.5 py-0.5 text-[10.5px] text-orange-500">
            repetindo
          </span> : null}
        {erro.novo ? <span className="rounded bg-koda-accent/15 px-1.5 py-0.5 text-[10.5px] text-koda-accent">
            novo
          </span> : null}
      </div>
      <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed break-words whitespace-pre-wrap text-koda-fg/85">
        {erro.texto}
      </p>
      {erro.onde ? <p className="mt-1 font-mono text-[10.5px] break-all text-koda-fg/40">{erro.onde}</p> : null}
    </li>;
}
function AbaLogs() {
  const [estado, setEstado] = useState(null);
  const [fora, setFora] = useState(false);
  useEffect(() => {
    let parado = false;
    const passo = async () => {
      try {
        const dados = await estadoDosLogs();
        if (parado) return;
        setEstado(dados);
        setFora(false);
      } catch {
        if (!parado) setFora(true);
      }
    };
    void passo();
    const id = window.setInterval(() => void passo(), 2e3);
    return () => {
      parado = true;
      window.clearInterval(id);
    };
  }, []);
  if (fora) {
    return <p className="px-3 py-3 text-[12.5px] leading-relaxed text-koda-fg/40">
        Não consegui ler os logs — o backend parece fora do ar.
      </p>;
  }
  if (!estado) {
    return <p className="px-3 py-3 text-[12.5px] text-koda-fg/40">Lendo…</p>;
  }
  const resumo = estado.resumo ?? {};
  const lista = estado.erros ?? [];
  if (!estado.vivo && !lista.length) {
    return <p className="px-3 py-3 text-[12.5px] leading-relaxed text-koda-fg/40">
        {estado.motivo || "Nada publicado ainda. Abra uma p\xE1gina pelo Painel Dev (ou pe\xE7a \xE0 IA para abrir) e os erros aparecem aqui \u2014 do console, da rede e do servidor."}
      </p>;
  }
  return <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-koda-fg/10 px-3 py-2">
        {lista.length ? <>
            <span className="text-[12px] font-medium text-koda-fg/80">
              {resumo.grave ?? 0} grave{(resumo.grave ?? 0) === 1 ? "" : "s"}
            </span>
            <span className="text-[12px] text-koda-fg/50">{resumo.leve ?? 0} leve(s)</span>
            {resumo.novos ? <span className="rounded bg-koda-accent/15 px-1.5 py-0.5 text-[10.5px] text-koda-accent">
                {resumo.novos} novo(s)
              </span> : null}
          </> : <span className="inline-flex items-center gap-1.5 text-[12px] text-emerald-600">
            <Check className="h-3.5 w-3.5" strokeWidth={2} />
            Nenhum erro nas fontes lidas
          </span>}
        {!estado.vivo ? <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] text-koda-fg/40">
            <AlertTriangle className="h-3 w-3" strokeWidth={2} />
            parou de publicar
          </span> : null}
      </div>

      {lista.length ? <ul className="min-h-0 flex-1 overflow-y-auto">
          {lista.map((e) => <LinhaDeLog key={e.chave} erro={e} />)}
        </ul> : <p className="px-3 py-3 text-[12.5px] leading-relaxed text-koda-fg/45">
          Nada quebrado nas fontes lidas. Só aparece aqui o que é erro — aviso de console, erro
          de rede (4xx/5xx) e falha de servidor; `log`/`info` ficam de fora.
        </p>}
    </div>;
}
function NavegadorDoPainel({ url }) {
  const caixa = useRef(null);
  const [falhou, setFalhou] = useState(false);
  useEffect(() => {
    let vivo = true;
    let navegador = null;
    let destinoDaCriacao = null;
    let fechamento = null;
    const rotulo = `painel-dev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const medir = () => {
      const alvo = caixa.current;
      if (!alvo) return null;
      const r = alvo.getBoundingClientRect();
      return {
        x: Math.round(r.left),
        y: Math.round(r.top),
        width: Math.round(r.width),
        height: Math.round(r.height)
      };
    };
    const ajustar = async () => {
      const area = medir();
      if (!navegador || !area || area.width < 2 || area.height < 2) return;
      try {
        await navegador.setPosition(new LogicalPosition(area.x, area.y));
        await navegador.setSize(new LogicalSize(area.width, area.height));
      } catch {
      }
    };
    const fechar = async (criado) => {
      const saida = await Promise.race([
        // A criação já acabou (ou morreu)? A decisão já está tomada — não espera.
        destinoDaCriacao ?? Promise.resolve("criada"),
        // Teto da espera: criação enroscada não segura o fechamento para sempre.
        new Promise((pronta) => {
          window.setTimeout(() => pronta("criada"), 8e3);
        })
      ]);
      if (saida === "morta") return;
      for (let tentativa = 0; tentativa < 5; tentativa += 1) {
        try {
          await criado.close();
          return;
        } catch {
          await new Promise((rente) => {
            window.setTimeout(rente, 100);
          });
        }
      }
    };
    const fecharAtual = () => {
      const alvo = navegador;
      if (alvo && !fechamento) fechamento = fechar(alvo);
    };
    const varrerOrfaos = async (meuRotulo) => {
      try {
        const todos = await Webview.getAll();
        for (const outro of todos) {
          if (outro.label === meuRotulo) continue;
          if (!outro.label.startsWith("painel-dev-")) continue;
          void outro.close().catch(() => void 0);
        }
      } catch {
      }
    };
    const montar = () => {
      const area = medir();
      if (!area || area.width < 2 || area.height < 2) return;
      const criado = new Webview(getCurrentWindow(), rotulo, { url, ...area, focus: false });
      void criado.once("tauri://error", (evento) => {
        if (!vivo) return;
        console.error("[painel] o navegador embutido n\xE3o subiu:", evento.payload);
        setFalhou(true);
      });
      navegador = criado;
      destinoDaCriacao = new Promise((pronta) => {
        void criado.once("tauri://created", () => pronta("criada"));
        void criado.once("tauri://error", () => pronta("morta"));
      });
      void varrerOrfaos(rotulo);
    };
    montar();
    const observador = new ResizeObserver(() => void ajustar());
    if (caixa.current) observador.observe(caixa.current);
    window.addEventListener("resize", ajustar);
    return () => {
      vivo = false;
      observador.disconnect();
      window.removeEventListener("resize", ajustar);
      fecharAtual();
    };
  }, [url]);
  return <div ref={caixa} className="relative min-h-0 w-full flex-1 bg-white">
      {falhou ? <p className="px-3 py-3 text-[12.5px] leading-relaxed text-koda-fg/45">
          Não consegui abrir o navegador embutido aqui. O site em si pode estar no ar — vale
          conferir numa aba do navegador.
        </p> : null}
    </div>;
}
function PainelLateral({
  aberto,
  onFechar,
  projeto,
  subs = []
}) {
  const caixa = useRef(null);
  const [aba, setAba] = useState(ABAS[0]);
  const [endereco, setEndereco] = useState("");
  const [url, setUrl] = useState("");
  const [aviso, setAviso] = useState("");
  const [recarga, setRecarga] = useState(0);
  const moldura = useRef(null);
  const rolagemDaIA = useRef(null);
  const fecharRef = useRef(onFechar);
  useEffect(() => {
    fecharRef.current = onFechar;
  }, [onFechar]);
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento) => {
      if (evento.key === "Escape") fecharRef.current();
    };
    const aoApontar = (evento) => {
      const alvo = evento.target;
      if (!alvo || !caixa.current?.contains(alvo)) fecharRef.current();
    };
    window.addEventListener("keydown", aoTeclar);
    const id = window.setTimeout(() => {
      document.addEventListener("pointerdown", aoApontar, true);
    }, 0);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("pointerdown", aoApontar, true);
    };
  }, [aberto]);
  const aplicarRolagem = (rolagem) => {
    const janela = moldura.current?.contentWindow;
    if (!rolagem || !janela) return;
    try {
      const documento = janela.document;
      if (rolagem.alvo) {
        const achou = acharTextoNaMoldura(documento, rolagem.alvo);
        if (achou) {
          achou.scrollIntoView({ block: "center", behavior: "smooth" });
          return;
        }
      }
      const alcanceDaIA = Math.max(rolagem.total - rolagem.janela, 1);
      const fracao = Math.min(Math.max(rolagem.topo / alcanceDaIA, 0), 1);
      const total = documento.documentElement.scrollHeight;
      const altura = janela.innerHeight || 1;
      janela.scrollTo({ top: Math.round(fracao * Math.max(total - altura, 0)), behavior: "smooth" });
    } catch {
    }
  };
  useEffect(() => {
    if (!aberto || aba !== "Painel Dev") return;
    let parado = false;
    let visto = "";
    let rolado = "";
    const passo = async () => {
      if (parado) return;
      try {
        const estado = await estadoDoNavegador();
        if (parado) return;
        if (!estado.vivo || !estado.url) return;
        rolagemDaIA.current = estado.rolagem ?? null;
        if (estado.url !== visto) {
          visto = estado.url;
          rolado = "";
          const caminho = caminhoLocal(estado.url);
          setAviso("");
          setEndereco(caminho ?? estado.url);
          setUrl(caminho ? enderecoDoArquivo(caminho) : estado.url);
          setRecarga((n) => n + 1);
        }
        const marca = estado.rolagem ? `${estado.rolagem.topo}/${estado.rolagem.total}/${estado.rolagem.janela}/${estado.rolagem.alvo ?? ""}` : "";
        if (marca && marca !== rolado) {
          rolado = marca;
          aplicarRolagem(estado.rolagem ?? null);
        }
      } catch {
      }
    };
    void passo();
    const id = window.setInterval(() => void passo(), 1500);
    return () => {
      parado = true;
      window.clearInterval(id);
    };
  }, [aberto, aba]);
  const ir = (evento) => {
    evento.preventDefault();
    const bruto = endereco.trim();
    if (!bruto) return;
    const caminho = caminhoLocal(bruto);
    if (caminho !== null) {
      setAviso("");
      setEndereco(caminho);
      setUrl(enderecoDoArquivo(caminho));
      setRecarga((n) => n + 1);
      return;
    }
    const site = normalizar(bruto);
    setAviso("");
    setEndereco(site);
    setUrl(site);
    setRecarga((n) => n + 1);
  };
  if (!aberto) return null;
  return <aside
    ref={caixa}
    aria-label="Barra lateral"
    className={[
      "painel-in fixed inset-y-0 left-0 z-[60] flex w-1/2 flex-col",
      "border-r border-koda-fg/10 bg-koda-surface",
      "shadow-[0_0_44px_rgba(0,0,0,0.45)]"
    ].join(" ")}
  >
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-koda-fg/10 px-2">
        <div
    role="tablist"
    aria-label="Seções da barra lateral"
    className="flex min-w-0 flex-1 items-center justify-between"
  >
          {ABAS.map((nome) => <button
    key={nome}
    type="button"
    role="tab"
    aria-selected={nome === aba}
    onClick={() => setAba(nome)}
    className={[
      "shrink-0 rounded-lg px-2.5 py-1.5 text-[12.5px] whitespace-nowrap transition-colors duration-150",
      "focus-visible:ring-2 focus-visible:ring-koda-accent focus-visible:outline-none",
      nome === aba ? "bg-koda-fg/12 text-koda-fg" : "text-koda-fg/60 hover:bg-koda-fg/8 hover:text-koda-fg"
    ].join(" ")}
  >
              {nome}
            </button>)}
        </div>

        <button
    type="button"
    aria-label="Fechar barra lateral"
    title="Fechar barra lateral"
    onClick={() => fecharRef.current()}
    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-koda-fg/55 transition-colors duration-150 hover:bg-koda-fg/10 hover:text-koda-fg focus-visible:ring-2 focus-visible:ring-koda-accent focus-visible:outline-none"
  >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {aba === "C\xF3digo" ? <AbaCodigo projeto={projeto} /> : null}
        {aba === "Subs" ? <Subs projeto={projeto} subs={subs} /> : null}
        {aba === "Logs" ? <AbaLogs /> : null}
        {aba !== "Painel Dev" ? null : <>
            <form
    onSubmit={ir}
    className="flex shrink-0 items-center gap-1.5 border-b border-koda-fg/10 px-2 py-2"
  >
              <input
    value={endereco}
    onChange={(evento) => setEndereco(evento.target.value)}
    placeholder="https://exemplo.com"
    aria-label="Endereço"
    spellCheck={false}
    className="min-w-0 flex-1 rounded-lg bg-koda-fg/8 px-2.5 py-1.5 text-[12.5px] text-koda-fg placeholder:text-koda-fg/35 focus:outline-none"
  />
              <button
    type="submit"
    aria-label="Abrir endereço"
    title="Abrir endereço"
    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-koda-fg/60 transition-colors duration-150 hover:bg-koda-fg/10 hover:text-koda-fg focus-visible:ring-2 focus-visible:ring-koda-accent focus-visible:outline-none"
  >
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </button>
              <button
    type="button"
    aria-label="Recarregar"
    title="Recarregar"
    disabled={!url}
    onClick={() => setRecarga((n) => n + 1)}
    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-koda-fg/60 transition-colors duration-150 hover:bg-koda-fg/10 hover:text-koda-fg focus-visible:ring-2 focus-visible:ring-koda-accent focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35"
  >
                <RotateCw className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </form>

            {url ? (
    // No app, um webview de verdade: site que recusa ser embutido abre normal (ver
    // `NavegadorDoPainel`). Fora do Tauri — `npm run dev` no navegador — não existe
    // webview, e aí fica o iframe, com a limitação que ele tem.
    DENTRO_DO_TAURI ? <NavegadorDoPainel key={recarga} url={url} /> : <iframe
      key={recarga}
      ref={moldura}
      onLoad={() => aplicarRolagem(rolagemDaIA.current)}
      title="Navegador do Painel Dev"
      src={url}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      className="min-h-0 w-full flex-1 border-0 bg-white"
    />
  ) : <p className="px-3 py-3 text-[12.5px] leading-relaxed text-koda-fg/40">
                {aviso || "Digite um endere\xE7o acima. No app o painel abre o site num navegador de verdade; fora dele (dev no navegador) usa um iframe \u2014 e a\xED site que recusa ser embutido (Google, GitHub, YouTube) aparece em branco, porque \xE9 o pr\xF3prio site bloqueando, n\xE3o o Koda."}
              </p>}
          </>}
      </div>
    </aside>;
}
var stdin_default = PainelLateral;
export {
  PainelLateral,
  stdin_default as default
};
