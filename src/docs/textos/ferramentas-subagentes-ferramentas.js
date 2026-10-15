// Gerado de ferramentas/subagentes-e-ferramentas.md — não edite à mão.
export default `Lança um **sub-agente**: um agente a mais, com prompt próprio, que toca um pedaço do
trabalho e devolve um relatório.

> Para o assunto completo — como criar, o que escrever no prompt, quando vale a pena — veja
> [subagentes/](../subagentes/).

## O que ela faz

**Argumentos:**

| Argumento | O que é |
| --- | --- |
| \`agente\` | O nome do sub-agente, como está escrito no arquivo de definições |
| \`tarefa\` | O que ele deve fazer, com o contexto que ele não tem |
| \`esforco\` | Quanto ele deve pensar antes de agir (\`auto\`, \`minimal\`, \`low\`, \`medium\`, \`high\`) |
| \`modelo\` | Modelo para ele, quando valer um diferente |
| \`fora_da_pasta\` | Permitir que ele mexa fora da pasta do projeto |

**Como pedir:** *"lança o \`revisor\` naquele arquivo que você acabou de escrever"*

:::dica
**O \`tarefa\` é o campo que decide o resultado.** O sub-agente **não vê a sua conversa** —
ele começa do zero. Tudo o que ele precisa saber tem de estar escrito ali. Um pedido vago
devolve um relatório vago.

## O que o sub-agente não faz

Três travas, e todas são **do motor** — não são opção de quem configura:

| Trava | Como funciona |
| --- | --- |
| **Não apaga nada** | As ferramentas de exclusão não existem para ele, e o veto recusa \`rm\`, \`del\`, \`rmtree\` e \`git clean\` que cheguem por outro caminho |
| **Não sai da pasta** | A não ser que o agente principal mande, com \`fora_da_pasta\` |
| **Só usa o que ele tem** | Um agente novo **não herda poder**: sem \`skills:\` no arquivo dele, não carrega skill nenhuma |

:::dica
**A trava de exclusão tem duas camadas.** Tirar a ferramenta do catálogo é um **pedido** —
funciona enquanto o modelo coopera. O veto no despacho é **imposição**: se ele tentar por
outro caminho, recebe "negado".

:::atencao
**O veto por texto é um guarda, não uma prova.** Um comando suficientemente esperto pode
escapar de uma expressão regular. O que é garantia de verdade são as ferramentas de
exclusão, que simplesmente **não existem** para ele.

## O relatório

O que o sub-agente devolve é um **relatório** para o agente principal. O principal **não vê
a conversa** dele — vê o que ele concluiu.

É por isso que um bom sub-agente é instruído a dizer, no relatório:

- o que foi feito;
- o que foi achado;
- o que ficou em aberto.

:::dica
**Você vê o trabalho dele na aba Subs** da barra lateral, aba por aba, com o passo a passo
completo. A conversa de cima ganha **uma linha só**: a chamada e o resultado. Ver
[barra-lateral/](../barra-lateral/).

## Tetos

| Limite | Valor |
| --- | --- |
| Sub-agentes lançados por rodada | **3** |
| Requisições por segundo de cada sub-agente | 30 |
| Requisições por minuto (app inteiro, sub-agentes incluídos) | 250 |

:::dica
**Os três por rodada é do motor, não do arquivo.** Quem escreve um sub-agente não decide
quantos podem rodar de uma vez. Três é o que cabe sem o trabalho virar uma confusão de
relatórios.

:::dica
**O teto de segundo é por sub-agente; o de minuto é do app inteiro.** Os dois valem ao
mesmo tempo, de propósito: um segura um sub-agente sozinho de martelar o serviço, o outro
segura o conjunto — inclusive vários chats abertos.

## Como tirar mais proveito

:::dica
**Para lançar um sub-agente novo, edite as definições.** O nome que você pede tem de estar
no arquivo de definições: se você inventar um, o Koda recebe a lista dos que existem e te
oferece as alternativas. Para criar um, veja [subagentes/](../subagentes/) — e use
*"lança o \`revisor\` nesse arquivo"* depois.

:::dica
**Fale pelo sub-agente: tudo o que você quer dito a ele, escreva no pedido.** Ele não
conversa com você nem vê a conversa de cima. Quer que ele avise algo? *"lança o \`revisor\` e
manda ele focar em tratamento de erro"* — o pedido chega junto do trabalho e volta no
relatório.

:::dica
**Acompanhe na aba Subs.** Enquanto ele trabalha, a aba Subs da barra lateral mostra o
passo a passo completo, aba por aba. A conversa principal ganha uma linha só: a chamada e o
resultado — ver [barra-lateral/](../barra-lateral/).

:::dica
**Lance poucos de uma vez.** Até **3 por rodada**: divida o trabalho em três frentes claras
em vez de lançar seis pedaços picados. Cada um usa **30 requisições por segundo**, e todos
entram no mesmo orçamento de 250 por minuto do app inteiro — vários trabalhando ao mesmo tempo
consomem esse orçamento rápido, então prefira três bem-escolhidos a muitos picados.`
