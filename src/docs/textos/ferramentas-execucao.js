// Gerado de ferramentas/execucao.md — não edite à mão.
export default `As ferramentas que **rodam coisas na sua máquina**: comandos, código, instalação de
dependências. É o grupo mais poderoso e o que mais pede cuidado.

## \`shell\` — roda um comando no terminal

**Quando usar:** build, teste, git pela linha de comando, instalar algo, subir um servidor.

**Como pedir:** *"roda os testes do projeto"* · *"builda o front e me diz se deu erro"*

**Argumentos:**

| Argumento | O que é |
| --- | --- |
| \`comando\` | O comando a rodar |
| \`continuar\` | O id de um comando que ficou rodando: espera mais 4 minutos por ele |
| \`parar\` | O id de um comando que ficou rodando: interrompe agora |
| \`tempo_limite\` | Segundos de espera antes de voltar com a saída (padrão 240) |

### ⏱ Como funcionam os comandos demorados — leia isto

Esta é a parte que mais confunde quem está começando, e entender ela muda tudo.

**Um comando que demora NÃO é interrompido.** O Koda não mata o seu \`npm run dev\` por
achar que travou. Em vez disso:

1. Ele roda o comando e **espera até 4 minutos**.
2. Se o comando ainda estiver rodando, ele **volta com a saída até agora** e um **id**.
3. Aí o Koda decide, e você vê a decisão na conversa:
   - **continuar** com aquele id → espera mais 4 minutos;
   - **parar** com aquele id → interrompe agora.

**Na prática, o que você vê:** *"o \`npm run dev\` subiu e está ouvindo na porta 3000"*, sem
o Koda ficar preso esperando para sempre.

:::dica
**Comando que não termina sozinho é caso de olhar e parar.** Servidor, programa com
janela, uma prévia — o certo é espiar a saída e interromper. O Koda foi ensinado a fazer
isso.

###  Quando ele trava de verdade

Existe um freio para o caso ruim: comando que **parou de produzir saída**. Se passar de
**5 minutos sem nenhuma saída nova**, o Koda considera travado e encerra.

Isso pega o caso clássico — um comando esperando você digitar algo, ou um download
travado. Mas repare: **um comando que produz saída continua rodando**, mesmo que demore
muito.

### Tetos do comando

| Limite | Valor |
| --- | --- |
| Espera antes de devolver a saída e um id | 4 minutos |
| Tempo total de vida do comando | até 1 hora |
| Silêncio sem saída que caracteriza travamento | 5 minutos |
| Comandos rodando ao mesmo tempo | 4 |
| Saída guardada de um comando em andamento | 200 mil caracteres |

###  O que o Koda tem ordens de não fazer pelo shell

- **Ler, criar, editar, listar, mover ou apagar arquivo** — existe ferramenta própria, e ela
  pede permissão na hora certa.
- **Comandos destrutivos de verdade** — apagar a raiz do sistema, formatar disco, desligar a
  máquina. Isto é bloqueado, e não é uma permissão que libere.

:::dica
**A diferença é importante:** \`rm\` de um arquivo comum **não** é bloqueado, porque
\`mkdir\`, \`cp\`, \`mv\` e \`rm\` aparecem dentro de scripts de build legítimos — proibi-los
quebraria tarefas normais. O que é bloqueado é o comando que destrói o sistema.

### Um detalhe que evita muita dor de cabeça

:::dica
**O Koda acha os programas mesmo quando o PATH não tem.** Se você abre o Koda pelo
Explorer, o Windows não entrega o mesmo PATH de um terminal — e \`node\`, \`npm\`, \`git\` e
\`python\` "somem". O Koda procura nos lugares onde eles costumam estar instalados
(\`C:\\Program Files\\nodejs\`, \`%APPDATA%\\npm\`, \`Program Files\\Git\`, as versões do Python,
\`scoop\`, \`chocolatey\`, \`cargo\`) e usa o caminho aumentado em **tudo**: comando, git,
linter, MCP.

:::dica
**Ele só entra no PATH o diretório que existe de verdade.** Não é adivinhação de
caminho: se a pasta não tem executável dentro, ela não entra.

## \`terminal\` — o mesmo que \`shell\`

Nome alternativo. Muitos modelos escrevem "terminal" por hábito, e o Koda aceita para não
perder a tarefa. **Para você, é idêntico ao \`shell\`.**

## \`code_interpreter\` — roda um trecho de código

**Quando usar:** calcular, transformar dados, testar uma ideia rápida, analisar um arquivo.

**Como pedir:** *"lê o CSV e me diz a média por mês"* · *"calcula quanto é 15% de 2.847"*

**Argumentos:** \`codigo\`, \`linguagem\` (\`python\` por padrão, ou \`node\`).

### Quando usar isto em vez do \`shell\`

| Situação | O certo |
| --- | --- |
| Calcular, transformar, analisar dados | \`code_interpreter\` |
| Rodar o teste do projeto, buildar, instalar | \`shell\` |

:::dica
**O Koda foi ensinado a usar JavaScript quando o projeto é JS.** Pedir uma conta simples
dentro de um projeto Node não sobe um Python à toa.

### Uma trava de segurança que vale conhecer

:::atencao
**Operação de arquivo escrita em Python é desviada.** Se o código que o Koda escrever
tentar **gravar, apagar, mover ou copiar** arquivo (\`open(..., 'w')\`, \`shutil.rmtree\`,
\`os.remove\`, \`.write_text\`), o Koda **não executa**: ele troca pela ferramenta própria.

O motivo é a permissão. O \`code_interpreter\` não passa por cartão de permissão — se ele
pudesse apagar arquivos, a permissão de exclusão seria decorativa. Então o Koda é
redirecionado para \`write_file\`, \`delete_file\` e companhia, onde você é consultado.

:::dica
**Ler para analisar é permitido.** Ler um arquivo com Python para processar os dados é
trabalho legítimo e não é bloqueado. A trava é só na **escrita**.

## \`install_package\` — instala uma dependência

**Quando usar:** "preciso do \`axios\`", "instala o \`pandas\`".

**Como pedir:** *"instala o axios no projeto"*

**Argumentos:** \`pacote\`, \`gerenciador\` (opcional).

:::dica
**O Koda descobre o gerenciador sozinho.** Ele lê o projeto e escolhe: \`npm\`, \`pnpm\`,
\`yarn\`, \`uv\`, \`pip\` ou \`cargo\`. Você não precisa dizer qual — e o Koda foi instruído a
**não** ficar investigando antes: é para chamar direto.

:::dica
**Isto substitui \`npm install\` no shell**, e é melhor: aparece na conversa como uma linha
clara em vez de um comando cru, e respeita a pasta do projeto.

## \`uninstall_package\` — remove uma dependência

Mesma coisa, ao contrário. **Argumentos:** \`pacote\`, \`gerenciador\`.

## Detalhes que importam

:::dica
**Comando é o que mais pede permissão.** No modo \`default\`, todo comando passa por
cartão de aprovação. Se você confia no projeto e quer velocidade, o modo \`auto\` dispensa a
pergunta. Ver [permissoes/](../permissoes/).

:::atencao
**O shell roda com os seus privilégios.** Ele é você no terminal. Não existe sandbox: o
comando pode tocar qualquer coisa que a sua conta alcança. É por isso que a permissão
existe, e é por isso que vale ler o comando antes de aprovar.

:::dica
**Você pode dizer "não use shell" no pedido.** O Koda entende e restringe a rodada às
outras ferramentas. É útil quando você quer só uma leitura, sem risco nenhum.

## O que fazer em cada situação

**Se a chamada for recusada por excesso de comandos**, espere um terminar e peça de novo. O
teto é de **4 comandos ao mesmo tempo**, no app inteiro — sub-agentes rodando junto entram na
mesma conta.

**Se a saída vier cortada**, o aviso diz quantos caracteres ficaram de fora (o começo e o fim
são preservados). Não peça para imprimir tudo de novo: peça para **filtrar**.

| Em vez de | Peça |
| --- | --- |
| *"roda o build e me mostra a saída"* | *"roda o build e me mostra só as linhas com \`error\`"* |
| *"lista todos os arquivos do projeto"* | *"conta quantos arquivos \`.ts\` existem em \`src\`"* |

:::atencao
**Saída guardada de um comando em andamento: 200 mil caracteres.** Passando disso, o
excedente não fica disponível depois.

:::dica
**Ao fechar o Koda, os comandos que ficaram rodando são encerrados.** Um \`npm run dev\` não
fica órfão segurando a porta: na próxima vez que você abrir, a porta está livre.

:::dica
**O botão Parar vale para a conversa em que você clicou.** Parar uma conversa não derruba o
comando que está rodando em outra — se você abriu dois servidores, cada um para no seu lugar.

:::dica
**Comando demorado: combine o que esperar.** Se você sabe que o build leva 10 minutos,
diga isso no pedido — o Koda espera até 4 minutos, volta com o id e continua de onde parou, em
vez de desistir no meio. O tempo total de vida de um comando é de até 1 hora.`
