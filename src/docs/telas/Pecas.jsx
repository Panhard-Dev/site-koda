import BolhaUsuario from '../../koda/BolhaUsuario'
import ContextRing from '../../koda/ContextRing'
import { Janela } from './Conversa'

/**
 * As peças soltas: anexos, modos de permissão, o campo de escrita e os seletores.
 *
 * O que dá para usar componente do Koda, usa — `BolhaUsuario` (que já desenha os anexos) e
 * `ContextRing`. O que é estrutura da tela (a cápsula do compositor, o menu de modelos) é
 * montado aqui com as mesmas medidas do app, porque esses componentes dependem do estado da
 * conversa e não têm como ser recortados.
 */

/** A bolha com dois anexos presos — o `BolhaUsuario` de verdade. */
export function TelaAnexos() {
  return (
    <Janela rodape="O anexo aparece pelo nome; o conteúdo fica guardado no backend.">
      <div className="flex flex-col gap-3 p-5">
        <BolhaUsuario
          texto="o que está causando esse erro?"
          anexos={[{ nome: 'erro.log' }, { nome: 'relatorio-de-falhas-2026-03.pdf' }]}
        />
        <p className="text-[12.5px] text-koda-fg/40">
          O anexo não vai para a pasta do projeto: ele vive num espaço próprio do Koda.
        </p>
      </div>
    </Janela>
  )
}

/** Os quatro modos de permissão, com o texto exato do app. */
export function TelaModos() {
  const modos = [
    ['Perguntar sempre', 'Manual', 'Pede antes de rodar comando, escrever, apagar ou sair da pasta'],
    ['Padrão', 'Padrão', 'Trabalha no projeto e pede aprovação para comandos e ações importantes'],
    ['Auto', 'Automático', 'Executa sem pedir aprovação; o shell usa as permissões da sua conta'],
    [
      'Livre — arquivos no computador inteiro',
      'Livre',
      'Sem aprovações; escolha se confia ao Koda acesso a arquivos fora do projeto',
    ],
  ]
  return (
    <Janela rodape="Os quatro modos, como o menu do campo de escrita os mostra.">
      <div className="p-3">
        {modos.map(([nome, curto, dica], i) => (
          <div key={curto} className={`rounded-lg px-3 py-2.5 ${i === 1 ? 'bg-koda-fg/8' : ''}`}>
            <p className="text-[13.5px] font-medium text-koda-fg/85">{nome}</p>
            <p className="mt-0.5 text-[12.5px] leading-5 text-koda-fg/50">{dica}</p>
          </div>
        ))}
      </div>
    </Janela>
  )
}

/** O campo de escrita com a cápsula e os botões, nas medidas do app. */
export function TelaComposerReal() {
  const pilula = (rotulo, ativo = false) => (
    <span
      className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[13px] ${
        ativo ? 'bg-koda-accent/15 text-koda-accent ring-1 ring-koda-accent/30' : 'text-koda-fg/55'
      }`}
    >
      {rotulo}
    </span>
  )
  return (
    <Janela rodape="O campo de escrita: a cápsula e, embaixo, os controles do app.">
      <div className="p-5">
        <div className="rounded-2xl border border-koda-line bg-koda-panel/70 p-3">
          <div className="rounded-xl bg-koda-input px-3.5 py-3 text-[15px] leading-6 text-koda-fg/90">
            conserta o botão de enviar que não responde
            <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-koda-accent" />
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-1">
            <span className="grid h-8 w-8 place-items-center rounded-lg text-koda-fg/55">+</span>
            {pilula('Reasoning')}
            {pilula('Web', true)}
            {pilula('Padrão')}

            <div className="ml-auto flex items-center gap-2">
              <ContextRing usado={325000} janela={1000000} />
              {pilula('Liz 4')}
              {pilula('Automático')}
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-koda-accent-strong text-white">
                ↑
              </span>
            </div>
          </div>
        </div>
      </div>
    </Janela>
  )
}

/** O seletor de modelos e o de esforço, com os itens que o app publica. */
export function TelaModelosReal() {
  const modelos = [
    'Liz 4',
    'Liz 3 Flash',
    'Liz Mini 2',
    'Liz Mini 1.3',
    'Liz Nano',
    'Koda 1',
    'Layze 2',
  ]
  const esforcos = [
    ['Automático', 'Quem decide é o Reasoning'],
    ['Mínimo', 'Responde rápido, pensa pouco'],
    ['Baixo', 'Pensa um pouco mais antes de responder'],
    ['Médio', 'Equilíbrio entre tempo e profundidade'],
    ['Alto', 'Pensa mais — a resposta demora mais'],
    ['Muito alto', 'Pensa muito — a resposta demora bem mais'],
    ['Máximo', 'O máximo que o modelo permite'],
  ]
  return (
    <Janela rodape="O catálogo vem do serviço; sem ele, a lista da casa.">
      <div className="grid gap-3 p-3 sm:grid-cols-2">
        <div className="rounded-xl border border-koda-line bg-koda-panel p-2">
          <p className="px-2.5 py-1.5 text-[11px] font-medium tracking-wide text-koda-fg/40 uppercase">
            Modelo
          </p>
          {modelos.map((m, i) => (
            <div
              key={m}
              className={`rounded-lg px-2.5 py-1.5 text-[13px] ${
                i === 0 ? 'bg-koda-accent/12 text-koda-accent' : 'text-koda-fg/70'
              }`}
            >
              {m}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-koda-line bg-koda-panel p-2">
          <p className="px-2.5 py-1.5 text-[11px] font-medium tracking-wide text-koda-fg/40 uppercase">
            Esforço
          </p>
          {esforcos.map(([nome, dica], i) => (
            <div
              key={nome}
              className={`rounded-lg px-2.5 py-1.5 ${i === 0 ? 'bg-koda-accent/12' : ''}`}
            >
              <p className={`text-[13px] ${i === 0 ? 'text-koda-accent' : 'text-koda-fg/75'}`}>
                {nome}
              </p>
              <p className="text-[11.5px] text-koda-fg/40">{dica}</p>
            </div>
          ))}
        </div>
      </div>
    </Janela>
  )
}
