// Gerado de git/README.md — não edite à mão.
export default `## O que é

O Koda mexe no git **sem você sair do chat**. Seis ferramentas cobrem o ciclo normal: ver o
que mudou, revisar, commitar e sincronizar.

## Por que isso importa

:::dica
**Git é a sua rede de segurança com um agente.** O Koda altera arquivos de verdade, e não
há desfazer. Com git, **sempre há**: o que ele mudou está no \`git_diff\`, e voltar atrás é um
comando.

:::atencao
**Recomendação forte: trabalhe com git, mesmo em projeto pessoal.** É o que transforma
"ele quebrou tudo" em "eu vejo o que mudou e desfaço".

## O ciclo de trabalho com o Koda

Este é o fluxo que funciona bem:

1. **Antes de pedir a tarefa** — *"o que mudou no projeto?"*
   Ele usa o \`git_status\` e te conta em português.
2. **Peça a tarefa** — *"corrige o cálculo do frete no \`Checkout.tsx\`"*
3. **Revise o resultado** — *"me mostra o diff"*
   Você vê **cada linha** que ele alterou.
4. **Confira visualmente** — abra a **barra lateral → aba Código** e veja o **verde e
   vermelho** do que mudou. Ver [barra-lateral/](../barra-lateral/).
5. **Commita** — *"commita com a mensagem 'corrige o cálculo do frete'"*
6. **Envie** — *"manda para o origin"*

:::dica
**O passo 3 é o mais importante.** Pedir o diff é o que separa "confio" de "verifiquei".
Você não precisa ler o código inteiro — precisa ver o que mudou.

## As seis ferramentas

| O que você pede | Ferramenta | O que faz |
| --- | --- | --- |
| *"o que mudou?"* | \`git_status\` | Status do repositório |
| *"me mostra o diff"* | \`git_diff\` | O diff não commitado (staged + unstaged) |
| *"os últimos commits"* | \`git_log\` | Os últimos 10 (ou quantos você pedir) |
| *"commita com a mensagem…"* | \`git_commit\` | \`git add -A\` + commit |
| *"manda para o origin"* | \`git_push\` | Envia os commits locais |
| *"traz as mudanças do remoto"* | \`git_pull\` | Baixa e integra (\`--ff-only\`) |

### Pedindo do jeito certo

**Status** — *"o que mudou no projeto?"*
:::dica
O Koda **traduz** em vez de despejar a saída crua do git. Você lê em português.

**Diff** — *"me mostra o que eu mudei"* · *"o diff do que você acabou de fazer"*
:::dica
Peça isso **sempre** depois de uma tarefa grande.

**Log** — *"quais foram os últimos commits?"* · *"mostra os últimos 20"*

**Commit** — *"commita com a mensagem 'ajusta o layout do carrinho'"*

:::atencao
**\`git_commit\` faz \`add -A\`.** Ele adiciona **tudo** o que está modificado — inclusive
arquivos que você talvez não quisesse incluir. Se você quer commitar só uma parte, faça pelo
terminal, ou peça o \`git_status\` antes e revise a lista.

:::atencao
**Commitar não é enviar.** É local. O envio é o passo seguinte, e é uma chamada separada.

**Push** — *"manda para o origin"* · *"faz o push da branch atual"*

**Pull** — *"traz as mudanças do remoto"*

:::dica
**O pull é \`--ff-only\`, e isso é deliberado.** Ele só integra quando dá para avançar
direto, sem merge. Se as histórias divergiram, ele **recusa** em vez de criar um merge que
você não pediu.

**Por quê:** merge automático silencioso é como se perde trabalho. O Koda prefere te avisar.

## O que o Koda NÃO faz no git

:::atencao
**Estas operações não têm ferramenta própria, e é de propósito:**

| Não existe | Por quê |
| --- | --- |
| \`git reset --hard\` | Descarta trabalho sem volta |
| Descartar mudanças | Idem |
| \`git rebase\` | Reescreve história |
| Criar / trocar / apagar branch | Não faz parte do ciclo simples |
| \`git stash\`, tags, remote | Idem |

:::dica
**São as operações em que um erro custa trabalho perdido.** Se você precisar, peça pelo
\`shell\` — e **leia o comando antes de aprovar**. Ver [permissoes/](../permissoes/).

## Sobre conflitos

:::atencao
**O Koda não resolve conflito escolhendo lado.** Se um pull ou merge der conflito, ele vai
te mostrar e perguntar. Ele não decide por você qual versão fica.

:::dica
**Isso é o comportamento certo.** Escolher lado em conflito é decisão de quem conhece o
código — não de quem está executando.

## Credenciais

:::atencao
**Quem configura o acesso ao remoto é você**, não o Koda.

- Se o push pedir senha, use um **token de acesso pessoal** (o GitHub não aceita mais senha).
- Configure o credential manager do git uma vez, e ele lembra.
- **O Koda não guarda credencial de git.**

##  Recomendações práticas

**Peça o status antes de tarefa grande.** Saber o que já estava modificado evita confundir o
trabalho dele com o seu.

**Commite antes de tarefa arriscada.** Se o Koda vai refatorar, tenha um ponto de retorno.

**Use o \`AGENTS.md\` para o git também.** Dizer no arquivo *"sempre commite com mensagem em
português, no imperativo"* faz o Koda seguir o padrão da casa. Ver [projetos/](../projetos/).

**Não peça push sem revisar.** Push é a operação que sai da sua máquina. Revise o diff antes.

**Se o projeto não for repositório git**, o Koda avisa em vez de dar erro cru. Nesse caso:
*"inicia um repositório git aqui"*.

## Detalhes que importam

:::dica
**O Koda prefere estas ferramentas ao shell.** Ele foi instruído a usar \`git_status\` em vez
de \`git status\` no terminal. O motivo é o mesmo das ferramentas de arquivo: aparece legível na
conversa e pede permissão na hora certa.

:::dica
**A aba Código complementa o diff.** O \`git_diff\` mostra o que mudou **desde o último
commit**; a aba Código mostra o que mudou **nesta execução do Koda**. São perguntas diferentes,
e as duas são úteis.

:::dica
**\`.koda-video/\` no \`.gitignore\`.** O cache de vídeo fica dentro do projeto. Ver
[videos/](../videos/).

:::dica
**A tool de git respeita a pasta do projeto.** O comando roda ali dentro.

## O que fazer em cada situação

**Para o que não tem ferramenta própria, peça pelo \`shell\`** — e leia o comando antes de
aprovar:

| Você quer | Peça assim |
| --- | --- |
| Ver quem escreveu uma linha | *"roda \`git blame src/app.ts\`"* |
| Achar o commit que introduziu um erro | *"roda \`git bisect start\`"* |
| Log com gráfico de branches | *"roda \`git log --oneline --graph --all\`"* |
| Desfazer um commit mantendo o trabalho | *"roda \`git reset --soft HEAD~1\`"* |

**Para conferir visualmente o que mudou**, use a **barra lateral → aba Código**: o verde e o
vermelho do que o Koda alterou naquela execução. Ver [barra-lateral/](../barra-lateral/).

**Para juntar histórias divergentes**, o \`pull --ff-only\` recusa — e é aí que você decide.
Escolha o caminho e peça:

- *"roda \`git merge origin/main\`"* — junta as duas, e os conflitos aparecem para você resolver;
- *"roda \`git rebase origin/main\`"* — reescreve os seus commits em cima dos do remoto.

Em qualquer um dos dois, se der conflito, o Koda te mostra os arquivos e pergunta. Diga qual
versão fica, ou peça para ele abrir os dois lados e explicar a diferença antes.

:::dica
**Para padronizar a mensagem de commit da casa**, escreva no \`AGENTS.md\` do projeto:
*"sempre commite com mensagem em português, no imperativo"*. O Koda passa a seguir isso
sozinho. Ver [projetos/](../projetos/).`
