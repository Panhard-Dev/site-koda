import BolhaUsuario from '../../koda/BolhaUsuario'
import ToDosMenu from '../../koda/ToDos'
import WorkingLine from '../../koda/WorkingLine'
import ToolSteps from '../../koda/ToolSteps'
import ApprovalCard from '../../koda/ApprovalCard'
import Compactacao from '../../koda/Compactacao'
import MessageFooter from '../../koda/MessageFooter'

/**
 * As telas da conversa — **com os componentes do próprio Koda**.
 *
 * Nada aqui é uma caixa parecida: é o `ToDos`, o `ToolSteps`, o `MessageFooter` e o
 * `ApprovalCard` que o app usa, copiados de `koda/src/components/` por
 * `scripts/copiar-koda.mjs`. Se o app mudar o cartão de tarefas, rodar o script traz a
 * mudança para cá.
 *
 * O que a tela precisa dar é o **estado**: os dados que o app receberia do backend. É só
 * isso que este arquivo escreve.
 */

/** A moldura da janela. */
export function Janela({ children, rodape }) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-2xl border border-koda-line bg-koda-bg shadow-xl shadow-black/20">
        {children}
      </div>
      {rodape && (
        <figcaption className="mt-2.5 text-center text-[11px] text-koda-fg/35">{rodape}</figcaption>
      )}
    </figure>
  )
}

/** A conversa com a ficha de uma resposta — o `MessageFooter` de verdade. */
export function TelaConversa() {
  return (
    <Janela rodape="A conversa: o pedido, as ferramentas e a ficha da resposta.">
      <div className="flex flex-col gap-3.5 p-5">
        <BolhaUsuario texto="conserta o botão de enviar que não responde" />

        <ToolSteps
          steps={[
            {
              call_id: 'c1',
              name: 'read_file',
              arguments: { caminho: 'src/components/Composer.tsx' },
              output: 'export function Composer() { /* … */ }',
              ok: true,
              duration_ms: 120,
            },
            {
              call_id: 'c2',
              name: 'edit_file',
              arguments: { caminho: 'src/components/Composer.tsx' },
              output: 'ok',
              ok: true,
              duration_ms: 80,
            },
            {
              call_id: 'c3',
              name: 'shell',
              arguments: { comando: 'npm run build' },
              output: 'built in 2,1s',
              ok: true,
              duration_ms: 2100,
            },
          ]}
        />

        <p className="max-w-[85%] text-[15px] leading-6 text-koda-fg/85">
          Achei: o botão ficava preso no estado antigo porque o <code>disabled</code> lia a lista
          de anexos e não o texto. Corrigi a condição e o build passou.
        </p>

        <MessageFooter
          texto="Achei: o botão ficava preso no estado antigo…"
          tokens={312}
          tokensTotal={4820}
          modelo="liz-4"
          elapsedMs={18400}
          at={Date.now()}
        />
      </div>
    </Janela>
  )
}

/** O cartão de tarefas — o `ToDos` de verdade. Clique no botão para abrir. */
export function TelaPlano() {
  return (
    <Janela rodape="O plano da tarefa. Clique no botão To-dos para abrir a lista.">
      <div className="flex flex-wrap items-center gap-4 p-5">
        <ToDosMenu
          rodando
          todos={[
            { texto: 'Ver como o login está hoje', feito: true },
            { texto: 'Adicionar o botão Entrar com Google', feito: true },
            { texto: 'Implementar o fluxo OAuth no backend', atual: true },
            { texto: 'Testar o fluxo completo' },
          ]}
        />
        <span className="text-[12.5px] text-koda-fg/40">
          O balão mostra quantas etapas faltam.
        </span>
      </div>
    </Janela>
  )
}

/** O cartão de permissão — o `ApprovalCard` de verdade. */
export function TelaPermissao() {
  return (
    <Janela rodape="O agente para aqui: nada roda enquanto você não responder.">
      <div className="p-5">
        <ApprovalCard
          pedido={{
            id: '1',
            tipo: 'comando',
            titulo: 'Rodar um comando',
            explicacao:
              'O agente quer rodar um comando na sua máquina para rodar os testes do projeto.',
            resumo: 'npm test -- carrinho',
            risco: 'medio',
            lembrar: 'todo comando de build neste projeto',
          }}
          onDecidir={() => {}}
        />
      </div>
    </Janela>
  )
}

/** O cartão de compactação — o `Compactacao` de verdade. */
export function TelaCompactacao() {
  return (
    <Janela rodape="O cartão aparece no ponto exato da conversa onde a compactação aconteceu.">
      <div className="p-5">
        <Compactacao
          aviso={{
            motivo: 'historico',
            compactados: 18,
            tokensAntes: null,
            tokensDepois: null,
          }}
        />
      </div>
    </Janela>
  )
}

/** A linha de trabalho — o `WorkingLine` de verdade. */
export function TelaTrabalhando() {
  return (
    <Janela rodape="Enquanto ele trabalha, esta linha diz o que está acontecendo.">
      <div className="flex flex-col gap-3 p-5">
        <BolhaUsuario texto="roda os testes do carrinho" />
        <ToolSteps
          steps={[
            {
              call_id: 'c1',
              name: 'read_file',
              arguments: { caminho: 'package.json' },
              output: '{ "scripts": { "test": "vitest" } }',
              ok: true,
              duration_ms: 90,
            },
          ]}
        />
        <WorkingLine passo={{ name: 'shell', arguments: { comando: 'npm test -- carrinho' } }} segundos={12} />
      </div>
    </Janela>
  )
}

/** A conversa com uma ferramenta que falhou. */
export function TelaComErro() {
  return (
    <Janela rodape="Ferramenta que falhou sai marcada — e o resultado diz o motivo.">
      <div className="flex flex-col gap-3.5 p-5">
        <BolhaUsuario texto="roda o build" />
        <ToolSteps
          steps={[
            {
              call_id: 'c1',
              name: 'shell',
              arguments: { comando: 'npm run build' },
              output: 'error: Unexpected token in Cart.tsx:42',
              ok: false,
              duration_ms: 1400,
            },
          ]}
        />
        <p className="max-w-[85%] text-[15px] leading-6 text-koda-fg/85">
          O build quebrou no <code>Cart.tsx</code>: falta fechar uma chave. Corrijo e rodo de
          novo?
        </p>
      </div>
    </Janela>
  )
}
