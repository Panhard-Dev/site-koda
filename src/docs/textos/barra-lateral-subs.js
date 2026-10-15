// Gerado de barra-lateral/README.md (§ Aba Subs) — não edite à mão.
export default `## O que é

Uma **conversa separada** dentro do painel, onde você fala com o agente **sem sujar a
conversa principal** — mais uma aba por sub-agente que estiver rodando.

## Para que serve

- **Perguntar algo rápido** sem que isso entre no histórico da conversa que importa.
- **Acompanhar um sub-agente** passo a passo, enquanto ele trabalha.
- **Testar** um pedido antes de fazer na conversa de verdade.

## Como funciona

### A conversa própria

:::dica
**É um chat de verdade:** fala com o mesmo backend, no mesmo projeto, e o agente trabalha
normalmente. A diferença é onde a conversa mora — aqui, e não na principal.

:::dica
**Ela tem id próprio**, criado pelo backend na primeira mensagem. Isso permite que ela
sobreviva a trocar de aba dentro do painel.

:::atencao
**Sem anexos, sem busca na web e sem ajuste de esforço.** São as peças do chat principal;
esta aba é deliberadamente mais simples.

:::atencao
**A conversa daqui vive o tempo do app.** Recarregar a página começa outra.

### As abas de sub-agente

:::dica
**Uma aba por sub-agente lançado.** Você vê **o que ele escreveu e o que ele rodou** — o
passo a passo completo, em tempo real.

:::dica
**Isto resolve um problema real:** na conversa principal, um sub-agente vira **uma linha
só** (a chamada e o relatório). É ótimo para não poluir, e péssimo para entender o que deu
errado. Aqui você abre a aba dele e vê tudo.

:::atencao
**O sub-agente é somente leitura para você.** Não há caixa de mensagem: você não fala com
ele. Quem fala é o agente principal.

### O teto de abas

O número de abas é **a conversa mais os sub-agentes de uma rodada** — e não são dois números
soltos: é o mesmo teto visto dos dois lados. Como uma rodada lança no máximo 3 sub-agentes,
você tem no máximo 4 abas. Ver
[ferramentas/subagentes-e-ferramentas.md](../ferramentas/subagentes-e-ferramentas.md).

### O que a aba trata

:::dica
**Tudo o que o chat principal trata — inclusive o que para o agente.** A permissão
aparece aqui também: se o agente da aba Subs pedir autorização, o cartão aparece e você
decide sem sair do painel.

O prompt box tem três peças: a caixa, o seletor de modelo e o botão de enviar.`
