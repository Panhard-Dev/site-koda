// Gerado de ferramentas/web-e-ferramentas.md — não edite à mão.
export default `Pesquisar, abrir páginas, baixar e enviar arquivos. Estas cinco só ficam disponíveis quando
o **Web está ligado**. Ver [web/](../web/).

## As cinco

| Ferramenta | O que faz | Argumentos |
| --- | --- | --- |
| \`web_search\` | Pesquisa no Bing e devolve vários resultados | \`consulta\` |
| \`url_reader\` | Abre uma URL conhecida e devolve o **texto** da página | \`url\` |
| \`browser\` | O mesmo que \`url_reader\` | \`url\` |
| \`download_file\` | Baixa uma URL para um arquivo na pasta do projeto | \`url\`, \`destino\` |
| \`upload_file\` | Envia um arquivo da pasta do projeto para uma URL (PUT) | \`caminho\`, \`url\` |

## Descobrir × abrir — a distinção que economiza tempo

:::dica
**São dois momentos diferentes, e o Koda escolhe o certo:**

| Você quer | Ferramenta |
| --- | --- |
| **Descobrir** algo na web (não sabe onde está) | \`web_search\` |
| **Abrir** uma página que você já conhece | \`url_reader\` |

**Pesquisar** — *"pesquisa qual é a versão atual do React"*

**Abrir** — *"lê a documentação em \`https://...\` e me explica esse parâmetro"*

:::dica
**Em pesquisa ampla, peça consultas diferentes.** O Koda foi instruído a variar os
termos para alcançar mais domínios, em vez de repetir a mesma busca. Se a primeira busca
não bastou, diga *"procura de outro jeito"*.

## Baixar e enviar

**Baixar** — *"baixa essa imagem e salva como \`logo.png\` na pasta do projeto"*

**Enviar** — *"sobe o \`relatorio.pdf\` para essa URL"*

:::atencao
**\`upload_file\` manda dados da sua máquina para a internet.** É a ferramenta de web com
mais risco, porque envia em vez de receber. Confira a URL antes de aprovar.

## Detalhes que importam

:::dica
**\`url_reader\` devolve texto, não a página desenhada.** Ele baixa e extrai o conteúdo
legível. Isso é ótimo para documentação e artigos, e ruim para site que só funciona com
JavaScript — nesses casos o texto pode vir vazio.

:::dica
**Para página que precisa de navegador de verdade**, existe o MCP \`navegador\`, que abre
um Chrome real e clica, digita e lê. Ver [mcp/](../mcp/). É a diferença entre "ler o HTML"
e "usar o site".

:::dica
**O que o Koda baixa fica na pasta do projeto**, e passa pela checagem de pasta como
qualquer arquivo. Você sabe onde ele salvou.

###  As travas de segurança

Estas merecem ser conhecidas, porque mostram o que o Koda **recusa** fazer:

- **Nada de rede interna.** Ele não abre endereço que aponta para a sua própria máquina ou
  para a rede local. Isso impede que uma página maliciosa use o Koda para escanear a sua
  rede.
- **Os redirecionamentos são conferidos um a um.** Se uma URL pública redirecionar para um
  endereço interno, o Koda para ali — não segue. Sem isso, bastaria um link para burlar a
  trava acima.
- **Há um teto de saltos** (5) e um teto de tamanho por download (cerca de 100 MB).

## O que fazer em cada situação

**Para pesquisar, formule o pedido como você faria no buscador.** O Koda pesquisa no Bing —
vale escrever os termos que você usaria lá, e em inglês quando o assunto é código:
*"pesquisa \`vite proxy rewrite 404\`"* rende mais que *"procura sobre proxy"*.

**Para página que exige login, use o MCP \`navegador\`.** Você entra na sua conta no Chrome
real que ele abre, e dali ele lê e clica. O \`url_reader\` não carrega sessão nem cookie — por
isso ele serve para o que é público (documentação, artigo, blog) e não para área logada. Ver
[mcp/](../mcp/).

**Para enviar um arquivo, confirme o que a URL espera.** O \`upload_file\` faz um **PUT**
simples, que é o que serviços de armazenamento e APIs costumam aceitar. Se o destino pede
formulário de upload (com campo de arquivo e multipart), monte o pedido pelo \`shell\`, com
\`curl -F\`:

> *"sobe o \`relatorio.pdf\` com \`curl -F "arquivo=@relatorio.pdf" https://...\`"*

:::dica
**Sem o Web ligado, estas cinco nem são oferecidas.** Se um pedido de pesquisa não
funcionou, confira o botão ** Web** no campo de escrita: ligado, ele fica destacado. Ver
[web/](../web/).`
