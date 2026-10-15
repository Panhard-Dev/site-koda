// Copiado de koda/src/components/PainelCodigo.tsx — ver scripts/copiar-koda.mjs
import { useEffect, useRef, useState } from "react";
import { ChevronRight, File, Folder, FolderOpen, LoaderCircle } from "lucide-react";
const chave = (caminho) => caminho.replace(/\\/g, "/").toLowerCase();
function tamanhoLegivel(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} KB`;
  return `${(kb / 1024).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} MB`;
}
function porCaminho(itens) {
  return Object.fromEntries(itens.map((item) => [chave(item.caminho), item]));
}
function assinaturaDe(itens) {
  return itens.map((item) => `${chave(item.caminho)}:${item.vezes}`).sort().join("|");
}
function Contagem({ mais, menos }) {
  if (mais === null || menos === null) {
    return <span className="text-[10.5px] text-koda-accent">•</span>;
  }
  return <span className="font-mono text-[10.5px] tabular-nums">
      <span className="text-emerald-400">+{mais}</span>
      {menos > 0 ? <span className="text-red-400"> −{menos}</span> : null}
    </span>;
}
function Linha({
  item,
  profundidade,
  ramos,
  marcas,
  escolhido,
  onAlternarPasta,
  onAbrirArquivo
}) {
  const ramo = ramos[item.caminho];
  const aberto = Boolean(ramo?.aberto);
  const ativo = !item.pasta && escolhido === item.caminho;
  const marca = marcas[chave(item.caminho)];
  const recuo = 6 + profundidade * 12;
  return <>
      <button
    type="button"
    title={item.caminho}
    onClick={() => item.pasta ? onAlternarPasta(item.caminho) : onAbrirArquivo(item.caminho)}
    style={{ paddingLeft: recuo }}
    className={[
      "flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left text-[12px] transition-colors duration-100",
      "focus-visible:ring-1 focus-visible:ring-koda-accent focus-visible:outline-none",
      ativo ? "bg-koda-accent/15 text-koda-fg" : "text-koda-fg/75 hover:bg-koda-fg/8 hover:text-koda-fg"
    ].join(" ")}
  >
        {item.pasta ? <ChevronRight
    strokeWidth={2}
    className={[
      "h-3.5 w-3.5 shrink-0 text-koda-fg/35 transition-transform duration-150",
      aberto ? "rotate-90" : ""
    ].join(" ")}
  /> : (
    // O vão do chevron, para o nome do arquivo alinhar com o da pasta irmã.
    <span aria-hidden className="h-3.5 w-3.5 shrink-0" />
  )}

        {item.pasta ? aberto ? <FolderOpen className="h-3.5 w-3.5 shrink-0 text-koda-accent/80" strokeWidth={1.8} /> : <Folder className="h-3.5 w-3.5 shrink-0 text-koda-accent/60" strokeWidth={1.8} /> : <File className="h-3.5 w-3.5 shrink-0 text-koda-fg/35" strokeWidth={1.8} />}

        <span className="truncate">{item.nome}</span>

        {ramo?.carregando ? <LoaderCircle
    className="ml-auto h-3 w-3 shrink-0 animate-spin text-koda-fg/35"
    strokeWidth={2}
  /> : marca ? <span className="ml-auto shrink-0 pl-1.5">
            <Contagem mais={marca.mais} menos={marca.menos} />
          </span> : null}
      </button>

      {item.pasta && aberto ? <>
          {ramo?.erro ? <p
    style={{ paddingLeft: recuo + 20 }}
    className="py-1 pr-2 text-[11px] leading-snug text-amber-500"
  >
              {ramo.erro}
            </p> : null}
          {ramo?.itens?.length === 0 ? <p
    style={{ paddingLeft: recuo + 20 }}
    className="py-1 pr-2 text-[11px] text-koda-fg/30"
  >
              pasta vazia
            </p> : null}
          {(ramo?.itens ?? []).map((filho) => <Linha
    key={filho.caminho}
    item={filho}
    profundidade={profundidade + 1}
    ramos={ramos}
    marcas={marcas}
    escolhido={escolhido}
    onAlternarPasta={onAlternarPasta}
    onAbrirArquivo={onAbrirArquivo}
  />)}
        </> : null}
    </>;
}
function CodigoSimples({ texto }) {
  const linhas = texto.split("\n");
  return <pre className="min-h-0 flex-1 overflow-auto bg-koda-bg py-2 font-mono text-[11.5px] leading-[1.6] text-koda-fg/90">
      <span className="flex w-max min-w-full flex-col">
        {linhas.map((linha, indice) => <span key={indice} className="flex">
            <span className="sticky left-0 w-11 shrink-0 bg-koda-bg pr-3 text-right text-koda-fg/25 select-none">
              {indice + 1}
            </span>
            <span className="whitespace-pre">{linha === "" ? " " : linha}</span>
          </span>)}
      </span>
    </pre>;
}
function CodigoComDiff({ linhas }) {
  return <pre className="min-h-0 flex-1 overflow-auto bg-koda-bg py-2 font-mono text-[11.5px] leading-[1.6] text-koda-fg/90">
      <span className="flex w-max min-w-full flex-col">
        {linhas.map((linha, indice) => {
    const entrou = linha.tipo === "entrou";
    const saiu = linha.tipo === "saiu";
    return <span
      key={indice}
      className={["flex", entrou ? "bg-emerald-500/14" : saiu ? "bg-red-500/14" : ""].join(
        " "
      )}
    >
              <span
      className={[
        "sticky left-0 w-11 shrink-0 bg-koda-bg pr-3 text-right select-none",
        saiu ? "text-red-400/45" : "text-koda-fg/25"
      ].join(" ")}
    >
                {linha.novo ?? linha.antigo}
              </span>
              <span
      aria-hidden
      className={[
        "w-4 shrink-0 text-center select-none",
        entrou ? "text-emerald-400" : saiu ? "text-red-400" : "text-transparent"
      ].join(" ")}
    >
                {entrou ? "+" : saiu ? "\u2212" : "\xB7"}
              </span>
              <span className={["whitespace-pre", saiu ? "text-koda-fg/55" : ""].join(" ")}>
                {linha.texto === "" ? " " : linha.texto}
              </span>
            </span>;
  })}
      </span>
    </pre>;
}
function AbaCodigo({ projeto }) {
  const raiz = projeto?.existe ? projeto.caminho : null;
  const [ramos, setRamos] = useState({});
  const [marcas, setMarcas] = useState({});
  const [arquivo, setArquivo] = useState(null);
  const [escolhido, setEscolhido] = useState("");
  const [lendo, setLendo] = useState(false);
  const [erroArquivo, setErroArquivo] = useState("");
  const pedido = useRef(0);
  const vivo = useRef({ escolhido: "", abertos: [] });
  const assinatura = useRef("");
  const pronto = useRef(false);
  const abrirArquivo = async (caminho) => {
    const meu = pedido.current += 1;
    setEscolhido(caminho);
    setErroArquivo("");
    setLendo(true);
    try {
      const lido = await lerArquivo(caminho);
      if (meu !== pedido.current) return;
      setArquivo(lido);
    } catch (erro) {
      if (meu !== pedido.current) return;
      setArquivo(null);
      setErroArquivo(fraseDeFalha(erro));
    } finally {
      if (meu === pedido.current) setLendo(false);
    }
  };
  const alternarPasta = async (caminho) => {
    const ramo = ramos[caminho];
    if (ramo?.aberto) {
      setRamos({ ...ramos, [caminho]: { ...ramo, aberto: false } });
      return;
    }
    if (ramo?.itens) {
      setRamos({ ...ramos, [caminho]: { ...ramo, aberto: true, erro: "" } });
      return;
    }
    setRamos({ ...ramos, [caminho]: { itens: null, aberto: true, carregando: true, erro: "" } });
    try {
      const dados = await listarArquivos(caminho);
      setRamos((atual) => ({
        ...atual,
        [caminho]: { itens: dados.itens, aberto: true, carregando: false, erro: "" }
      }));
    } catch (erro) {
      setRamos((atual) => ({
        ...atual,
        [caminho]: { itens: null, aberto: true, carregando: false, erro: fraseDeFalha(erro) }
      }));
    }
  };
  const atualizarAVista = async () => {
    for (const pasta of vivo.current.abertos) {
      try {
        const dados = await listarArquivos(pasta);
        setRamos((atual) => ({
          ...atual,
          [pasta]: { itens: dados.itens, aberto: true, carregando: false, erro: "" }
        }));
      } catch {
      }
    }
    const alvo = vivo.current.escolhido;
    if (alvo) await abrirArquivo(alvo);
  };
  useEffect(() => {
    vivo.current.escolhido = escolhido;
    vivo.current.abertos = Object.entries(ramos).filter(([, ramo]) => ramo.aberto).map(([caminho]) => caminho);
  });
  useEffect(() => {
    pedido.current += 1;
    pronto.current = false;
    assinatura.current = "";
    setRamos({});
    setMarcas({});
    setArquivo(null);
    setEscolhido("");
    setErroArquivo("");
    setLendo(false);
    if (!raiz) return;
    let parado = false;
    const abrir = async () => {
      const [arvore, lista] = await Promise.allSettled([listarArquivos(raiz), listarMudancas()]);
      if (parado) return;
      if (arvore.status === "fulfilled") {
        setRamos({
          [raiz]: { itens: arvore.value.itens, aberto: true, carregando: false, erro: "" }
        });
      } else {
        setRamos({
          [raiz]: {
            itens: null,
            aberto: true,
            carregando: false,
            erro: fraseDeFalha(arvore.reason)
          }
        });
      }
      if (lista.status === "fulfilled") {
        assinatura.current = assinaturaDe(lista.value.itens);
        setMarcas(porCaminho(lista.value.itens));
      }
      pronto.current = true;
    };
    void abrir();
    return () => {
      parado = true;
    };
  }, [raiz]);
  useEffect(() => {
    if (!raiz) return;
    let parado = false;
    const passo = async () => {
      if (parado || !pronto.current) return;
      try {
        const { itens } = await listarMudancas();
        if (parado) return;
        const marca = assinaturaDe(itens);
        if (marca === assinatura.current) return;
        assinatura.current = marca;
        setMarcas(porCaminho(itens));
        await atualizarAVista();
      } catch {
      }
    };
    const id = window.setInterval(() => void passo(), 2500);
    return () => {
      parado = true;
      window.clearInterval(id);
    };
  }, [raiz]);
  const esquecer = async () => {
    try {
      await limparMudancas();
    } catch {
    }
    assinatura.current = "";
    setMarcas({});
    if (escolhido) await abrirArquivo(escolhido);
  };
  if (!raiz) {
    return <div className="flex min-h-0 flex-1 items-center justify-center px-6">
        <p className="max-w-[38ch] text-center text-[12.5px] leading-relaxed text-koda-fg/40">
          {projeto && !projeto.existe ? `A pasta \xAB${projeto.nome}\xBB n\xE3o est\xE1 mais no disco. Abra outra para ver o c\xF3digo dela aqui.` : "Nenhum projeto aberto. Abra uma pasta e o c\xF3digo dela aparece aqui: a \xE1rvore de um lado, o arquivo do outro."}
        </p>
      </div>;
  }
  const daRaiz = ramos[raiz];
  const mudanca = arquivo?.mudanca ?? null;
  const temMarcas = Object.keys(marcas).length > 0;
  return <div className="flex min-h-0 flex-1">
      {
    /*
    * A raiz **não** é uma linha da árvore, é o cabeçalho da coluna: ela fica sempre
    * aberta. Uma pasta de projeto recolhida deixaria a coluna vazia, e um clique que
    * esvazia a tela não serve para nada.
    */
  }
      <div className="flex min-h-0 w-[236px] shrink-0 flex-col border-r border-koda-fg/10">
        <div className="flex shrink-0 items-center gap-1.5 border-b border-koda-fg/8 px-2.5 py-2">
          <FolderOpen className="h-3.5 w-3.5 shrink-0 text-koda-accent/80" strokeWidth={1.8} />
          <span className="truncate text-[12px] font-medium text-koda-fg/85" title={raiz}>
            {projeto?.nome ?? "projeto"}
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-1.5 py-1.5">
          {!daRaiz ? <p className="px-2 py-1 text-[11.5px] text-koda-fg/40">Lendo a pasta…</p> : null}
          {daRaiz?.erro ? <p className="px-2 py-1 text-[11.5px] leading-snug text-amber-500">{daRaiz.erro}</p> : null}
          {daRaiz?.itens?.length === 0 ? <p className="px-2 py-1 text-[11.5px] text-koda-fg/30">Nada de código nesta pasta.</p> : null}
          {(daRaiz?.itens ?? []).map((item) => <Linha
    key={item.caminho}
    item={item}
    profundidade={0}
    ramos={ramos}
    marcas={marcas}
    escolhido={escolhido}
    onAlternarPasta={(caminho) => void alternarPasta(caminho)}
    onAbrirArquivo={(caminho) => void abrirArquivo(caminho)}
  />)}
        </div>

        {
    /* O que ficou de fora, dito na tela: esconder pasta sem avisar faria o dono
       procurar o que não está lá. */
  }
        <div className="flex shrink-0 items-center gap-2 border-t border-koda-fg/8 px-2.5 py-1.5">
          <p className="min-w-0 flex-1 text-[10.5px] leading-snug text-koda-fg/30">
            node_modules, target e pastas que começam com «.» ficam de fora.
          </p>
          {temMarcas ? <button
    type="button"
    onClick={() => void esquecer()}
    title="Esquece as marcas de alteração. Os arquivos no disco não são tocados."
    className="shrink-0 rounded px-1.5 py-0.5 text-[10.5px] text-koda-fg/45 transition-colors duration-100 hover:bg-koda-fg/10 hover:text-koda-fg focus-visible:ring-1 focus-visible:ring-koda-accent focus-visible:outline-none"
  >
              limpar marcas
            </button> : null}
        </div>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {arquivo ? <>
            <div className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-koda-fg/8 px-3 py-2">
              <span className="text-[12.5px] font-medium text-koda-fg">{arquivo.nome}</span>
              <span className="text-[10.5px] text-koda-fg/40">
                {arquivo.linhas.toLocaleString("pt-BR")} linha
                {arquivo.linhas === 1 ? "" : "s"}
              </span>
              <span className="text-[10.5px] text-koda-fg/30">
                {tamanhoLegivel(arquivo.tamanho)}
              </span>
              {mudanca ? <>
                  <span className="rounded bg-koda-accent/15 px-1.5 py-0.5 text-[10.5px] text-koda-accent">
                    {mudanca.criado ? "criado pela IA" : "alterado pela IA"}
                  </span>
                  <Contagem mais={mudanca.mais} menos={mudanca.menos} />
                </> : null}
              {arquivo.truncado ? <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[10.5px] text-amber-600">
                  cortado no fim
                </span> : null}
            </div>

            {mudanca?.linhas ? <CodigoComDiff linhas={mudanca.linhas} /> : <>
                {mudanca ? <p className="shrink-0 border-b border-koda-fg/8 bg-amber-400/10 px-3 py-1.5 text-[10.5px] leading-snug text-amber-600">
                    A IA mexeu neste arquivo, mas ele é grande demais para o diff linha a linha —
                    o código abaixo é o de agora, sem as marcas.
                  </p> : null}
                <CodigoSimples texto={arquivo.texto} />
              </>}
          </> : <div className="flex min-h-0 flex-1 items-center justify-center px-6">
            <p className="max-w-[34ch] text-center text-[12.5px] leading-relaxed text-koda-fg/40">
              {lendo ? "Lendo o arquivo\u2026" : erroArquivo || "Clique num arquivo da lista para ver o c\xF3digo dele aqui."}
            </p>
          </div>}
      </div>
    </div>;
}
var stdin_default = AbaCodigo;
export {
  AbaCodigo,
  stdin_default as default
};
