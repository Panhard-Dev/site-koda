// Gerado de prompts/README.md (§ Comandos com `/`) — não edite à mão.
export default `Digite **\`/\`** no campo de escrita e aparece uma lista de comandos. Digite para filtrar e
Enter para escolher.

### O \`/init\` — o mais importante

:::atencao
**O \`/init\` cria o arquivo \`AGENTS.md\` do projeto.** É o prompt do agente **principal**,
e é o arquivo que faz o Koda entender **o seu** projeto.

**Por que ele importa tanto:** sem \`AGENTS.md\`, o Koda não sabe que o seu projeto usa
\`pnpm\` e não \`npm\`, que os testes rodam com \`vitest\`, que a pasta \`src/legacy\` está sendo
aposentada. Ele descobre isso a cada mensagem, gastando passos.

**Com o \`AGENTS.md\`**, ele já sabe desde o início.

:::dica
**Rode o \`/init\` num projeto novo.** É o primeiro comando que vale a pena usar.

:::dica
**Depois, edite o arquivo à mão.** Ele é markdown simples. Ponha o que um colega novo
precisaria saber: como rodar, como testar, o que não mexer, o padrão de código.

### Outros comandos

O menu tem **dois** comandos: \`/init\` e \`/plan\`.

:::dica
**O menu do \`/\` é um completador, não um atalho que escreve por você.** Escolher \`/plan\`
só põe \`/plan \` na caixa e devolve o cursor — **o que vai para o Koda é o que você
escrever**, do jeito que escreveu. Nada de texto pré-definido, nada de mensagem enviada
sozinha.

Ver [atalhos/](../atalhos/) para os detalhes.`
