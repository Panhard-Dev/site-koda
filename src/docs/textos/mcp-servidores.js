// Gerado de mcp/README.md (§ Os três MCPs que vêm com o Koda) — não edite à mão.
export default `###  \`navegador\` — o navegador do Painel Dev

**O que faz:** abre qualquer site ou página local, lê a página, clica e digita. O que ele
faz aparece **ao vivo** no Painel Dev.

**Quando usar:** conferir uma página que o Koda acabou de construir, testar um formulário,
investigar por que uma tela quebrou.

**Como pedir:** *"abre \`localhost:5173\` e me diz se o botão de enviar aparece"*

:::dica
**É a diferença entre ler o HTML e usar o site.** O \`url_reader\` baixa texto; o
\`navegador\` abre um Chrome de verdade — então funciona em página que só monta com
JavaScript, e consegue clicar.

###  \`logs\` — os erros, já sem repetição

**O que faz:** junta os erros do console, da rede (4xx/5xx) e do log do servidor, **tira a
repetição** e correlaciona o front com o back.

**Quando usar:** "por que a tela quebrou", "o que está dando erro".

**Como pedir:** *"diagnostica os logs do que você acabou de abrir"*

:::dica
**Ele lê o feed do \`navegador\`.** Os dois trabalham juntos: o navegador navega, o logs
conta o que deu errado. É por isso que a skill \`diagnosticar-logs\` cita os dois.

###  \`video-analizar\` — análise de vídeo do disco

**O que faz:** metadados, transcrição do que é falado (com timestamps) e os **momentos**
(segundo → quadro → fala).

**Quando usar:** quando você aponta um vídeo no disco e quer saber o que é dito.

**Como pedir:** *"analisa o vídeo \`C:\\...\\aula.mp4\` e me diz o que ele fala sobre
autenticação"*

:::atencao
**Para *ver* os quadros, anexe o vídeo na conversa.** O MCP analisa o arquivo do disco;
a visão das imagens vem pelo anexo. Ver [videos/](../videos/).`
