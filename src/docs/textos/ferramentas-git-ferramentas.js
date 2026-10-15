// Gerado de ferramentas/git-e-ferramentas.md — não edite à mão.
export default `O Koda mexe no git **sem você sair do chat**. As seis ferramentas cobrem o ciclo normal de
trabalho.

> Para o fluxo completo de trabalho com git — quando commitar, o que o Koda faz sozinho e o
> que ele não faz — veja [git/](../git/).

## As seis

| Ferramenta | O que faz | Argumentos |
| --- | --- | --- |
| \`git_status\` | Mostra o status do repositório (o que mudou) | nenhum |
| \`git_diff\` | Mostra o diff **não commitado** (staged + unstaged) | nenhum |
| \`git_log\` | Mostra os últimos commits | \`quantidade\` (padrão 10) |
| \`git_commit\` | Faz \`git add -A\` e commita com a mensagem | \`mensagem\` |
| \`git_push\` | Envia os commits locais para o remoto | \`remoto\`, \`ramo\` |
| \`git_pull\` | Baixa e integra as mudanças do remoto | \`remoto\`, \`ramo\` |

## Como pedir cada uma

**Status** — *"o que mudou no projeto?"*
O Koda usa \`git_status\` e te conta em português, não despeja a saída crua.

**Diff** — *"me mostra o que eu mudei"*
Vem o diff completo, com as linhas adicionadas e removidas.

:::dica
**Peça o diff depois de uma tarefa grande.** É a forma mais rápida de revisar o que o
Koda fez antes de commitar. Você vê cada linha alterada, e não precisa confiar.

**Log** — *"quais foram os últimos commits?"* ou *"mostra os últimos 20 commits"*

**Commit** — *"commita com a mensagem 'corrige o cálculo do frete'"*

:::atencao
**\`git_commit\` faz \`add -A\`.** Isso significa que ele adiciona **tudo** o que está
modificado, inclusive arquivos que você talvez não quisesse incluir. Se você quer commitar
só uma parte, faça isso pelo terminal ou peça o \`git_status\` antes e revise.

:::atencao
**\`git_commit\` não faz push.** Commitar é local. Enviar para o remoto é o passo
seguinte, e é uma chamada separada.

**Push** — *"manda para o origin"* ou *"faz o push"*

**Pull** — *"traz as mudanças do remoto"*

:::dica
**O pull é \`--ff-only\`.** Ele só integra quando dá para avançar direto, sem merge. Se as
histórias divergiram, ele **recusa** em vez de criar um merge que você não pediu. Isso é
deliberado: merge automático silencioso é como se perde trabalho.

## Detalhes que importam

:::dica
**O Koda prefere estas ferramentas ao \`shell\`.** Ele foi instruído a usar \`git_status\` em
vez de \`git status\` no terminal. O motivo é o mesmo das ferramentas de arquivo: aparece
legível na conversa e pede permissão na hora certa.

:::atencao
**Operações destrutivas você pede pelo \`shell\`.** \`git reset --hard\`, \`git checkout\` que
descarta mudanças e \`git rebase\` não têm ferramenta própria: são as operações em que um erro
custa trabalho perdido, então o comando passa pelos seus olhos antes de rodar. Ver a seção
seguinte para o pedido exato de cada uma.

:::dica
**O Koda confere se é um repositório antes de tentar.** Se a pasta do projeto não for um
repositório git, ele avisa em vez de dar erro cru.

## O que não tem ferramenta própria

Para estas operações, peça pelo \`shell\` — e **leia o comando antes de aprovar** (ver
[permissoes/](../permissoes/)):

| Você quer | Peça assim |
| --- | --- |
| Criar ou trocar de branch | *"roda \`git checkout -b minha-branch\`"* |
| Listar ou apagar branch | *"roda \`git branch -a\`"* · *"roda \`git branch -d antiga\`"* |
| Guardar mudanças para depois | *"roda \`git stash\`"* · *"roda \`git stash pop\`"* |
| Marcar uma versão | *"roda \`git tag v1.2.0\`"* |
| Ver os remotos configurados | *"roda \`git remote -v\`"* |

:::dica
**São as operações em que um erro custa trabalho perdido** — descartar mudanças, reescrever
história. Por isso elas passam por você: no \`shell\`, o comando aparece na conversa e você
aprova com os olhos nele.

**Quando o pull der conflito**, o Koda te mostra os arquivos em conflito e pergunta. Diga qual
versão fica — *"mantém a minha"*, *"usa a do remoto"* — ou peça para ele abrir os dois lados e
te explicar a diferença antes de você decidir. É decisão de quem conhece o código.

**Antes do primeiro push**, configure o acesso uma vez:

- O GitHub não aceita mais senha: gere um **token de acesso pessoal** e use ele.
- Configure o credential manager do git, e ele lembra nas próximas vezes.
- **O Koda não guarda credencial de git** — quem configura é você.`
