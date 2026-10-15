import {
  TelaConversa,
  TelaPlano,
  TelaPermissao,
  TelaCompactacao,
  TelaTrabalhando,
  TelaComErro,
} from './telas/Conversa'
import { TelaPainelCodigo, TelaLogs, TelaPainelDev, TelaSubs } from './telas/Painel'
import { TelaModos, TelaAnexos, TelaComposerReal, TelaModelosReal } from './telas/Pecas'

/**
 * As telas de cada documento.
 *
 * A chave é `pilar/item`, a mesma do sumário. O documento que não está aqui sai só com
 * texto — e isso é o normal: nem todo assunto tem o que mostrar.
 *
 * **As telas usam os componentes do próprio Koda** (`src/koda/`, copiados por
 * `scripts/copiar-koda.mjs`), e não caixas desenhadas à mão. O que este arquivo decide é
 * qual tela aparece em qual documento.
 */

/** Junta várias telas, com um respiro entre elas. */
const pilha =
  (...telas) =>
  function Pilha() {
    return (
      <div className="flex flex-col gap-3">
        {telas.map((Tela, i) => (
          <Tela key={i} />
        ))}
      </div>
    )
  }

export const TELAS = {
  // A área principal.
  'area-principal/conversa': pilha(TelaConversa, TelaTrabalhando, TelaComErro),
  'area-principal/campo': pilha(TelaComposerReal),
  'area-principal/seletores': pilha(TelaModelosReal),

  // Contexto: o cartão de compactação, do próprio app.
  'contexto/compactacao': pilha(TelaCompactacao),

  // To-dos: o cartão de tarefas, com o menu de verdade.
  'to-dos/plano': pilha(TelaPlano),

  // Permissões: o cartão do app e os quatro modos.
  'permissoes/modos': pilha(TelaModos),
  'permissoes/cartao': pilha(TelaPermissao),

  // A barra lateral — uma tela por aba.
  'barra-lateral/painel-dev': pilha(TelaPainelDev),
  'barra-lateral/codigo': pilha(TelaPainelCodigo),
  'barra-lateral/subs': pilha(TelaSubs),
  'barra-lateral/logs': pilha(TelaLogs),

  // Anexos.
  'anexos/aceitos': pilha(TelaAnexos),
}

export default TELAS
