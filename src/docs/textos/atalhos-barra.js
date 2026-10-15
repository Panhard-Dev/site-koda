// Gerado de atalhos/README.md (§ `/` — os comandos) — não edite à mão.
export default `Digite **\`/\`** no **começo** do campo de escrita. Aparece a lista; digite para filtrar e
Enter para escolher.

| Comando | O que faz |
| --- | --- |
| **\`/init\`** | **Criar ou atualizar o \`AGENTS.md\` do projeto** |
| **\`/plan\`** | Planejar antes de executar |

##  O menu do \`/\` é um completador, não um atalho

Escolher um comando **só põe o texto na caixa** e devolve o cursor para você continuar.
**O que vai para o Koda é o que você escrever**, do jeito que escreveu.

Não existe texto pré-definido, e nada é enviado sozinho. O \`/plan\`, por exemplo, não é um
botão mágico: ele escreve \`/plan \` e você completa — *"/plan trocar o CSS por Tailwind"*.

## O \`/init\` merece atenção

:::atencao
**É o comando mais útil do Koda, e o mais ignorado.**

Ele cria (ou atualiza) o arquivo **\`AGENTS.md\`** na raiz do seu projeto. Esse arquivo é o
**prompt do agente principal** — o que ele lê para entender **o seu** projeto.

**Sem ele**, o Koda descobre a cada mensagem que o seu projeto usa \`pnpm\`, que os testes
rodam com \`vitest\`, que a pasta \`legacy/\` está sendo aposentada. Isso gasta passos.

**Com ele**, ele já sabe desde o começo.

:::dica
**Rode o \`/init\` num projeto novo, antes de qualquer tarefa séria.**

:::dica
**Depois edite o arquivo à mão.** É markdown simples, e você escreve o que um colega novo
precisaria ouvir: como rodar, como testar, o que não mexer, qual o padrão do código.

:::atencao
**O \`AGENTS.md\` é do projeto, não da máquina.** Cada projeto tem o seu — de propósito: o
que vale para todos os projetos não pode se misturar com o que vale para um só.`
