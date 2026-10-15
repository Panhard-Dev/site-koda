// Gerado de subagentes/README.md (§ Como usar) — não edite à mão.
export default `**Você não cria o sub-agente na hora.** Ele precisa existir nas definições.

### Dois que já vêm prontos

O Koda traz dois sub-agentes de fábrica:

####  \`revisor\`

**O que faz:** revisa o que o agente principal escreveu. Lê os arquivos indicados e aponta o
que está errado: bug, caso não tratado, nome ruim, código que faz duas coisas.

:::dica
**Ele não conserta nada — e isso é deliberado.** Quem conserta é o principal. O revisor
entrega a **leitura**, não o conserto.

**O que ele devolve:** cada problema com o arquivo e a linha, e qual é o mais grave. Se estiver
tudo certo, ele diz isso em uma linha.

:::dica
**Este é o sub-agente mais útil do dia a dia.** Depois de uma tarefa grande, peça:
*"lança o revisor no que você acabou de escrever"*.

####  \`testador\`

**O que faz:** roda o que existe de teste no projeto e conta o que quebrou.

:::dica
**Ele descobre como os testes rodam sozinho** — procura no \`package.json\`, no
\`pyproject.toml\`, num \`Makefile\`. Você não precisa dizer o comando.

**O que ele devolve:** o comando que rodou, quantos passaram e quantos falharam, e a causa de
cada falha com arquivo e linha.

:::atencao
**Ele não conserta os testes para eles passarem.** Se o teste está errado, ele diz por quê
— em vez de ajustar o teste para o verde.

### Como lançar

**Peça na conversa:**

> *"lança o \`revisor\` no \`api/client.ts\`"*
> *"manda o \`testador\` rodar a suíte e me contar o que quebrou"*

**Ou mencione com \`@\`:**

> *"\`@sub.revisor\` dá uma olhada no que você acabou de fazer"*

:::dica
**A menção é tratada como ordem.** \`@sub.revisor\` é "quem faz isto é aquele agente". Ver
[atalhos/](../atalhos/).`
