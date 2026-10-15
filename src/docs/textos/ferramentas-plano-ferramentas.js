// Gerado de ferramentas/plano-e-ferramentas.md — não edite à mão.
export default `A única ferramenta do grupo Plano. Ela é simples por fora e importante por dentro: é ela
que faz o **cartão de tarefas** aparecer na conversa.

> Para o uso no dia a dia, veja [to-dos/](../to-dos/).

## O que ela faz

Registra a **lista de tarefas da resposta**. Cada item tem três campos:

| Campo | O que é |
| --- | --- |
| \`texto\` | O que fazer, curto |
| \`feito\` | Já terminou? |
| \`atual\` | Está fazendo agora |

**Como pedir:** você não pede. O Koda chama sozinho quando a tarefa tem mais de um passo.

:::dica
**Mas você pode pedir.** Se a tarefa é grande e você quer ver o plano antes de o Koda
sair fazendo, escreva: *"antes de começar, me mostra o plano"*. Ele registra a lista e você
vê na tela exatamente o que vai ser feito.

## Como ela aparece para você

Um cartão na conversa com a lista, e cada item em um de três estados:

| Estado | Como aparece |
| --- | --- |
| **Pendente** | Item normal, ainda não começou |
| **Atual** | Destacado — é o que ele está fazendo agora |
| **Feito** | Marcado |

:::dica
**O cartão é a melhor forma de saber se o Koda entendeu o pedido.** Se a lista não
corresponde ao que você quis, **pare e corrija antes de ele avançar** — é muito mais barato
que deixar terminar e refazer.

## Detalhes que importam

:::dica
**A lista é reenviada inteira a cada atualização.** O Koda não manda "marque o item 2
como feito": ele manda a lista completa, com o estado novo. Isso evita o plano sair de
sincronia.

:::dica
**O plano entra na conta de repetição.** Se o Koda tentar a mesma ferramenta com os
mesmos argumentos e o plano não mudou, ele é considerado repetindo — e é cobrado a avançar.
O plano é, literalmente, parte de como o Koda sabe que está andando.

:::dica
**O item "atual" é o sinal de vida do trabalho.** Se você está acompanhando uma tarefa
longa, olhe qual item está marcado como atual: ele diz exatamente onde o Koda está.

## Como tirar mais proveito

:::dica
**Peça o plano antes de uma tarefa grande.** *"antes de começar, me mostra o plano"* faz a
lista aparecer na tela — e corrigir o rumo ali é muito mais barato que refazer depois.

:::dica
**Para mudar o plano, escreva na conversa.** O cartão é leitura, não edição: *"tira o item
do teste, eu já rodei"* ou *"inclui um passo para atualizar o README"*, e o Koda reenvia a
lista atualizada.

:::dica
**A lista vale para a conversa em que ela apareceu.** Cada tarefa nova ganha o plano dela —
não é uma lista de pendências que sobrevive entre conversas. Para acompanhar o serviço de
verdade de um projeto, o lugar é o **\`AGENTS.md\`** do repositório, com as regras da casa.

:::dica
**Se a tarefa tem data ou prioridade, escreva no pedido.** O cartão tem três campos só
(texto, atual, feito); prazo e responsável entram na descrição do item: *"item: revisar o PR
até sexta"*.

:::dica
**Faça o histórico você mesmo, no \`AGENTS.md\`.** O cartão mostra o estado **atual** do plano
— para as decisões que precisam sobreviver à conversa, escreva as regras da casa no
\`AGENTS.md\` do projeto. Ver [projetos/](../projetos/).`
