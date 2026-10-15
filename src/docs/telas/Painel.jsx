import PainelLateral from '../../koda/PainelLateral'

/**
 * A barra lateral — **o componente do próprio Koda**.
 *
 * É o `PainelLateral` do app, copiado de `koda/src/components/PainelLateral.tsx`. A barra
 * inteira vem dele: a faixa das quatro abas, o Painel Dev, a aba Código com a árvore e o
 * diff, a aba Subs e os Logs. Nada aqui é uma casca desenhada à mão.
 *
 * O que esta tela dá é o **estado**: a barra aberta, o projeto e os sub-agentes. Como o
 * componente lê da API, a documentação abre ele numa moldura do tamanho da janela e deixa
 * as abas funcionando — são os mesmos botões, o mesmo cartão de log.
 */

/** A barra lateral dentro de uma moldura do tamanho da janela. */
function Barra({ rodape }) {
  return (
    <figure className="my-6">
      <div className="relative h-[560px] overflow-hidden rounded-2xl border border-koda-line bg-koda-bg">
        <PainelLateral
          aberto
          onFechar={() => {}}
          projeto={{ id: 'doc', nome: 'meu-projeto', caminho: 'C:\\projetos\\meu-projeto' }}
          subs={[]}
        />
      </div>
      <figcaption className="mt-2.5 text-center text-[11px] text-koda-fg/35">
        {rodape ?? 'A barra lateral do app — as quatro abas funcionam; troque entre elas.'}
      </figcaption>
    </figure>
  )
}

/** A barra lateral inteira. */
export function TelaPainelLateral() {
  return <Barra />
}

/** O Painel Dev. */
export function TelaPainelDev() {
  return <Barra rodape="O Painel Dev: o navegador que acompanha o que a IA está dirigindo." />
}

/** A aba Código. */
export function TelaPainelCodigo() {
  return <Barra rodape="A aba Código: a árvore do projeto e o arquivo com o diff pintado." />
}

/** A aba Subs. */
export function TelaSubs() {
  return <Barra rodape="A aba Subs: a conversa separada e uma aba por sub-agente." />
}

/** A aba Logs. */
export function TelaLogs() {
  return <Barra rodape="A aba Logs: os erros sem repetição, com arquivo e linha." />
}
