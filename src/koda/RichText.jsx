// Copiado de koda/src/components/RichText.tsx — ver scripts/copiar-koda.mjs
import { memo, useMemo, useState } from "react";
const ESCAPAVEIS = "\\`*_[]";
function inline(texto, chave) {
  const nos = [];
  let texto_puro = "";
  let n = 0;
  const descarregar = () => {
    if (!texto_puro) return;
    nos.push(<span key={`${chave}-t${n++}`}>{texto_puro}</span>);
    texto_puro = "";
  };
  const entrar = (no) => {
    descarregar();
    nos.push(no);
  };
  const antes = (posicao) => texto[posicao - 1] ?? "";
  const depois = (posicao) => texto[posicao + 1] ?? "";
  const borda = (caractere) => caractere === "" || !/[\p{L}\p{N}]/u.test(caractere);
  let i = 0;
  while (i < texto.length) {
    const caractere = texto[i];
    if (caractere === "\\" && ESCAPAVEIS.includes(depois(i))) {
      texto_puro += depois(i);
      i += 2;
      continue;
    }
    if (caractere === "`") {
      const fim = texto.indexOf("`", i + 1);
      if (fim > i + 1) {
        entrar(
          <code
            key={`${chave}-c${n++}`}
            className="rounded-md bg-koda-fg/8 px-1 py-0.5 font-mono text-[12.5px] text-koda-fg/90"
          >
            {texto.slice(i + 1, fim)}
          </code>
        );
        i = fim + 1;
        continue;
      }
      i += 1;
      continue;
    }
    if (caractere === "*" || caractere === "_") {
      const dobro = texto.startsWith(caractere + caractere, i);
      const marca = dobro ? caractere + caractere : caractere;
      const abre = depois(i + marca.length - 1);
      const podeAbrir = (caractere === "*" || borda(antes(i))) && abre !== "" && !/\s/.test(abre);
      const fim = texto.indexOf(marca, i + marca.length);
      const conteudo = fim > i + marca.length ? texto.slice(i + marca.length, fim) : "";
      const fechando = fim + marca.length;
      const podeFechar = conteudo !== "" && !conteudo.includes("\n") && borda(depois(fechando - 1));
      if (podeAbrir && podeFechar && !/\s$/.test(conteudo)) {
        if (dobro) {
          entrar(
            <strong key={`${chave}-b${n++}`} className="font-semibold text-koda-fg/95">
              {inline(conteudo, `${chave}-b${n}`)}
            </strong>
          );
        } else {
          entrar(
            <em key={`${chave}-e${n++}`} className="text-koda-fg/85">
              {inline(conteudo, `${chave}-e${n}`)}
            </em>
          );
        }
        i = fechando;
        continue;
      }
      if (dobro) {
        i += 2;
        continue;
      }
      if (podeAbrir) {
        i += 1;
        continue;
      }
      texto_puro += caractere;
      i += 1;
      continue;
    }
    texto_puro += caractere;
    i += 1;
  }
  descarregar();
  return nos;
}
function Codigo({ codigo, idioma, chave }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(codigo);
      } else {
        throw new Error("sem \xE1rea de transfer\xEAncia");
      }
    } catch {
      const area = document.createElement("textarea");
      area.value = codigo;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 1400);
  };
  return <div key={chave} className="group/codigo flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10.5px] tracking-wide text-koda-fg/30 uppercase">
          {idioma || "c\xF3digo"}
        </span>
        <button
    type="button"
    onClick={() => void copiar()}
    className="rounded-md px-1.5 py-0.5 text-[10.5px] text-koda-fg/35 opacity-0 transition-opacity duration-150 group-hover/codigo:opacity-100 hover:bg-koda-fg/6 hover:text-koda-fg/70 focus-visible:opacity-100"
  >
          {copiado ? "copiado" : "copiar"}
        </button>
      </div>
      {
    /*
     * `break-normal` cancela o `break-words` que o container do `RichText` herda: em
     * código, quebrar a linha no meio é pior do que rolar de lado. O `overflow-x-auto`
     * segura a linha comprida sem empurrar a resposta para fora da tela.
     */
  }
      <pre className="overflow-x-auto rounded-xl bg-koda-fg/4 p-3 font-mono text-[12.5px] leading-5 break-normal ring-1 ring-koda-fg/8">
        {codigo}
      </pre>
    </div>;
}
const ALINHAMENTOS = ["left", "center", "right"];
function celulas(linha) {
  let texto = linha.trim();
  if (texto.startsWith("|")) texto = texto.slice(1);
  if (texto.endsWith("|")) texto = texto.slice(0, -1);
  return texto.split("|").map((celula) => celula.trim());
}
const SEPARADORA = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?$/;
function ehSeparadora(linha) {
  const texto = linha.trim();
  return texto.includes("-") && SEPARADORA.test(texto);
}
function ehLinhaDaLinha(linha) {
  const texto = linha.trim();
  if (!texto.includes("|")) return false;
  if (texto.startsWith("|") || texto.endsWith("|")) return true;
  return (texto.match(/\|/g)?.length ?? 0) >= 2;
}
function alinhamentos(separadora) {
  return celulas(separadora).map((celula) => {
    const esquerda = celula.startsWith(":");
    const direita = celula.endsWith(":");
    if (esquerda && direita) return "center";
    if (direita) return "right";
    return "left";
  });
}
function Tabela({
  cabecalho,
  linhas,
  alinhamento,
  chave
}) {
  return <div className="overflow-x-auto rounded-xl ring-1 ring-koda-fg/8">
      <table className="w-full border-collapse text-[12.5px]">
        <thead>
          <tr className="bg-koda-fg/5">
            {cabecalho.map((celula, coluna) => <th
    key={coluna}
    className="px-3 py-2 text-left text-[10.5px] font-medium tracking-wide text-koda-fg/45 uppercase"
  >
                {inline(celula, `${chave}-h${coluna}`)}
              </th>)}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, indice) => <tr
    key={indice}
    className="border-t border-koda-fg/8 transition-colors duration-100 hover:bg-koda-fg/3"
  >
              {linha.map((celula, coluna) => {
    const direcao = alinhamento[coluna] ?? "left";
    return <td
      key={coluna}
      className={`px-3 py-2 align-top leading-6 ${direcao === "right" ? "text-right" : direcao === "center" ? "text-center" : "text-left"}`}
    >
                    {inline(celula, `${chave}-c${indice}-${coluna}`)}
                  </td>;
  })}
            </tr>)}
        </tbody>
      </table>
    </div>;
}
const TITULO = /^(#{1,6})\s+(.*)$/;
const SO_NEGRITO = /^\*\*([^*]+)\*\*:?$/;
const BULLET = /^[-*+]\s+(.*)$/;
const NUMERO = /^(\d{1,3})[.)]\s+(.*)$/;
const CITACAO = /^>\s?(.*)$/;
const REGUA = /^(-{3,}|\*{3,}|_{3,})$/;
const TAREFA = /^\[([ xX])\]\s+(.*)$/;
const INDENTADO = /^(\s{2,})/;
function titulo(texto, nivel, chave) {
  return <p
    key={chave}
    className={nivel <= 2 ? "text-[15px] font-semibold text-koda-fg/95" : "text-[13.5px] font-semibold text-koda-fg/90"}
  >
      {inline(texto, chave)}
    </p>;
}
function Caixinha({ marcada }) {
  return <span
    aria-hidden
    className={`mt-[7px] flex h-3 w-3 shrink-0 items-center justify-center rounded-[4px] text-[9px] leading-none ${marcada ? "bg-koda-accent/80 text-koda-bg" : "ring-1 ring-koda-fg/25"}`}
  >
      {marcada ? "\u2713" : ""}
    </span>;
}
function lista(itens, tipo, inicio, chave) {
  const conteudo = itens.map((item, indice) => {
    const tarefa = TAREFA.exec(item.texto);
    return <li
      key={indice}
      className={`leading-7 ${item.aninhado ? "ml-5" : ""} ${tarefa ? "flex list-none items-start gap-2" : ""}`}
    >
        {tarefa ? <>
            <Caixinha marcada={tarefa[1].toLowerCase() === "x"} />
            <span>{inline(tarefa[2], `${chave}-i${indice}`)}</span>
          </> : inline(item.texto, `${chave}-i${indice}`)}
      </li>;
  });
  return tipo === "ul" ? <ul key={chave} className="ml-5 list-disc space-y-0.5">
      {conteudo}
    </ul> : <ol key={chave} start={inicio} className="ml-5 list-decimal space-y-0.5">
      {conteudo}
    </ol>;
}
function blocos(linhas, chave) {
  const nos = [];
  let paragrafo = [];
  let itens = [];
  let tipoDaLista = "ul";
  let inicio = 1;
  let contador = 0;
  const descarregarParagrafo = () => {
    if (paragrafo.length === 0) return;
    const linhasAtuais = paragrafo;
    paragrafo = [];
    nos.push(
      <p key={`${chave}-p${contador++}`} className="leading-7">
        {linhasAtuais.map((linha, indice) => <span key={indice}>
            {indice > 0 ? <br /> : null}
            {inline(linha, `${chave}-p${contador}-${indice}`)}
          </span>)}
      </p>
    );
  };
  const descarregarLista = () => {
    if (itens.length === 0) return;
    const atuais = itens;
    itens = [];
    nos.push(lista(atuais, tipoDaLista, inicio, `${chave}-l${contador++}`));
  };
  const descarregarTudo = () => {
    descarregarParagrafo();
    descarregarLista();
  };
  for (let i = 0; i < linhas.length; i += 1) {
    const linha = linhas[i];
    const limpa = linha.trim();
    if (!limpa) {
      descarregarParagrafo();
      continue;
    }
    if (ehLinhaDaLinha(limpa) && i + 1 < linhas.length && ehSeparadora(linhas[i + 1])) {
      const corpo = [];
      let j = i + 2;
      while (j < linhas.length && linhas[j].trim() && ehLinhaDaLinha(linhas[j])) {
        corpo.push(celulas(linhas[j]));
        j += 1;
      }
      if (corpo.length > 0) {
        descarregarTudo();
        nos.push(
          <Tabela
            key={`${chave}-tb${contador++}`}
            cabecalho={celulas(limpa)}
            linhas={corpo}
            alinhamento={alinhamentos(linhas[i + 1])}
            chave={`${chave}-tb${contador}`}
          />
        );
        i = j - 1;
        continue;
      }
    }
    const regua = REGUA.exec(limpa);
    if (regua && limpa.length >= 3) {
      descarregarTudo();
      nos.push(<hr key={`${chave}-hr${contador++}`} className="border-koda-fg/10" />);
      continue;
    }
    const tit = TITULO.exec(limpa);
    if (tit) {
      descarregarTudo();
      nos.push(titulo(tit[2], tit[1].length, `${chave}-t${contador++}`));
      continue;
    }
    const blocoNegrito = SO_NEGRITO.exec(limpa);
    if (blocoNegrito && !itens.length) {
      descarregarTudo();
      nos.push(
        <p key={`${chave}-n${contador++}`} className="text-[13.5px] font-semibold text-koda-fg/90">
          {inline(blocoNegrito[1], `${chave}-nl${contador}`)}
        </p>
      );
      continue;
    }
    const citacao = CITACAO.exec(limpa);
    if (citacao) {
      descarregarTudo();
      const citadas = [citacao[1]];
      while (i + 1 < linhas.length && CITACAO.test(linhas[i + 1].trim())) {
        citadas.push(CITACAO.exec(linhas[i + 1].trim())?.[1] ?? "");
        i += 1;
      }
      nos.push(
        <blockquote
          key={`${chave}-q${contador++}`}
          className="border-l-2 border-koda-fg/15 pl-3 text-koda-fg/70"
        >
          {citadas.map((texto, indice) => <p key={indice} className="leading-7">
              {inline(texto, `${chave}-qi${indice}`)}
            </p>)}
        </blockquote>
      );
      continue;
    }
    const bullet = BULLET.exec(limpa);
    const numero = NUMERO.exec(limpa);
    if (bullet || numero) {
      descarregarParagrafo();
      const tipo = bullet ? "ul" : "ol";
      if (itens.length > 0 && tipo !== tipoDaLista) descarregarLista();
      if (itens.length === 0) {
        tipoDaLista = tipo;
        inicio = numero ? Number(numero[1]) : 1;
      }
      itens.push({
        texto: (bullet ? bullet[1] : numero?.[2]) ?? "",
        aninhado: INDENTADO.test(linha)
      });
      continue;
    }
    descarregarLista();
    paragrafo.push(limpa);
  }
  descarregarTudo();
  return nos;
}
function RichText({ text, className = "" }) {
  const conteudo = useMemo(() => {
    const montado = [];
    text.split("```").forEach((parte, indice) => {
      if (indice % 2 === 1) {
        const linhas = parte.split("\n");
        const primeira = linhas[0].trim();
        const temLinguagem = primeira !== "" && !primeira.includes(" ");
        const codigo = (temLinguagem ? linhas.slice(1) : linhas).join("\n").replace(/\n+$/, "");
        montado.push(
          <Codigo
            key={`code-${indice}`}
            chave={`code-${indice}`}
            codigo={codigo}
            idioma={temLinguagem && primeira.length <= 16 ? primeira : ""}
          />
        );
        return;
      }
      montado.push(...blocos(parte.split("\n"), `bloco-${indice}`));
    });
    return montado;
  }, [text]);
  return <div className={`flex min-w-0 flex-col gap-2.5 break-words ${className}`}>{conteudo}</div>;
}
var stdin_default = memo(RichText);
export {
  stdin_default as default
};
