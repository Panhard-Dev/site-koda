// Gerado de ferramentas/skills-e-ferramentas.md — não edite à mão.
export default `Carrega as **instruções** de uma skill pelo nome. É a ferramenta que faz uma skill sair do
papel.

> Para o assunto completo — o que é uma skill, as três origens, como criar — veja
> [skills/](../skills/).

## O que ela faz

Devolve o **texto das instruções** de uma skill para o Koda seguir.

**Argumento:** \`nome\` — o nome exato da skill, como aparece no prompt de sistema.

**Como pedir:** você não precisa. Se o seu pedido combina com uma skill disponível, o Koda
chama sozinho, **antes** de executar a tarefa, e segue o que as instruções mandarem.

:::dica
**Você pode forçar.** Dizer *"usa a skill \`validar-front\`"* faz o Koda carregá-la mesmo
que ele não tivesse pensado nisso. Útil quando você conhece o procedimento e quer aquele
específico.

## A distinção que importa: skill ensina, MCP executa

| | **Skill** | **MCP** |
| --- | --- | --- |
| O que é | Um pacote de **instruções** | Um **programa** que roda |
| O que faz | Ensina o Koda a fazer | Faz, por conta própria |
| Como age | O Koda lê e segue | O Koda chama e recebe o resultado |
| Quem escreve | Você, ou quem fez a skill | Quem programou o servidor |

:::dica
**Uma skill não executa nada.** É texto. Se a skill precisa abrir navegador, quem abre é
o MCP \`navegador\` — e é por isso que as skills boas citam os MCPs que precisam.

## Por que existe uma ferramenta só para isto

O prompt do sistema **anuncia** as skills disponíveis, mas anunciar não é aplicar. Para
seguir as instruções, o Koda precisa do texto na mão — e há três origens, cada uma com um
problema:

- **Skill do projeto** — está dentro da pasta, então \`read_file\` também alcança.
- **Skill da máquina** — mora em \`~/.agents/skills\`, **fora** da pasta de trabalho. O
  \`read_file\` **não** a alcança. \`use_skill\` alcança.
- **Skill cadastrada** — não tem arquivo nenhum: o texto vive no arquivo de configuração do
  Koda.

:::dica
**É por isso que \`use_skill\` é a forma certa de ler uma skill**, mesmo quando o
\`read_file\` daria conta. É ela que funciona nas três origens.

## Quando a skill não é encontrada

Se você pedir uma skill que não existe, o Koda recebe uma mensagem com **a lista das que
existem**. Ele não fica preso: ele te oferece as alternativas.

O mesmo vale para skill **desligada**: o Koda é informado de que ela existe mas está
desligada na tela — e não deve usá-la.

:::dica
**Skill desligada é uma decisão respeitada.** Desligar na tela faz o Koda parar de usá-la
de verdade, não é só um aviso.

## Como tirar mais proveito

:::dica
**Uma skill por chamada, mas você pode pedir várias.** *"usa as skills \`validar-front\` e
\`diagnosticar-logs\`"* — o Koda faz uma chamada para cada, na mesma rodada.

:::dica
**Skill comprida é lida por inteiro dentro do teto de cerca de 60 mil caracteres.** Se a
sua skill passar disso, o texto chega cortado. Divida em duas: a parte que ensina o
procedimento numa skill, e o restante em arquivos dentro da pasta da skill, que o Koda lê
quando precisar.

:::dica
**Skill é instrução, não poder.** Se as instruções dela mandam usar o navegador, confira
antes que o MCP \`navegador\` está ligado (menu ** → MCPs**). Sem o MCP, a skill diz o que
fazer e não há com o que fazer — ver [mcp/](../mcp/).

:::dica
**Se uma skill não pegar, confira o nome exato.** O Koda recebe a lista das que existem
quando erra o nome; na dúvida, pergunte *"quais skills você tem?"*. Skill desligada na tela
não é usada, mesmo que você peça pelo nome — ligue em [skills/](../skills/) se quiser aquela
de volta.`
