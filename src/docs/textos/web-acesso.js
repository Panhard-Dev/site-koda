// Gerado de web/README.md — não edite à mão.
export default `## O que é

Um **botão** no campo de escrita que liga o acesso do Koda à internet. Desligado, ele não
pesquisa, não abre páginas e não baixa nada.

## Como ligar

No campo de escrita, o botão ** Web**. Ligado, ele fica destacado. A escolha vale por
mensagem — você liga quando precisa.

:::dica
**Desligado é o padrão, e isso é bom.** A maioria das tarefas de código não precisa de
internet. Sem o Web ligado, o Koda resolve tudo localmente.

## O que o Web libera

Com o botão ligado, cinco ferramentas entram no catálogo:

| Ferramenta | O que faz |
| --- | --- |
| \`web_search\` | Pesquisa no Bing |
| \`url_reader\` | Abre uma URL e devolve o texto |
| \`browser\` | O mesmo que \`url_reader\` |
| \`download_file\` | Baixa uma URL para a pasta do projeto |
| \`upload_file\` | Envia um arquivo do projeto para uma URL |

:::atencao
**Com o Web desligado, estas cinco saem do catálogo.** O Koda **não sabe** que existem
naquela rodada — não é só uma questão de "ele evita usar".

Ver [ferramentas/web-e-ferramentas.md](../ferramentas/web-e-ferramentas.md).

## Quando ligar

| Tarefa | Precisa do Web? |
| --- | --- |
| Consultar a documentação de uma biblioteca |  Sim |
| Descobrir a versão atual de um pacote |  Sim |
| Baixar um arquivo, uma imagem, um dataset |  Sim |
| Ler um artigo que você indicou |  Sim |
| Trabalhar no seu código |  Não |
| Rodar testes, buildar, refatorar |  Não |
| Analisar um arquivo que você anexou |  Não |

:::dica
**Ligue o Web para tarefa de pesquisa, não para tarefa de código.** Se você não sabe se
precisa, deixe desligado — o Koda avisa se faltar.

## Descobrir × abrir

A distinção que mais economiza tempo:

| Você quer | O que acontece |
| --- | --- |
| **Descobrir** algo (não sabe onde está) | Ele **pesquisa** |
| **Abrir** uma página que você conhece | Ele **lê** a página |

**Pesquisar:** *"pesquisa como configurar proxy no Vite"*

**Abrir:** *"lê \`https://vitejs.dev/config/\` e me explica a opção server.proxy"*

:::dica
**Dar a URL é mais rápido e mais preciso** do que pedir uma pesquisa. Se você sabe onde
está, diga.

##  As travas de segurança

Estas merecem ser conhecidas, porque mostram o que o Koda **recusa** fazer:

### Nada de rede interna

:::atencao
**Ele não abre endereço que aponta para a sua própria máquina ou para a rede local.**

**Por quê:** sem isso, uma página maliciosa poderia instruir o Koda a escanear a sua rede
interna — e o Koda é um agente que executa. A trava é a mesma disciplina de não deixar o
agente se auto-aprovar.

### Os redirecionamentos são conferidos um a um

:::atencao
**Se uma URL pública redirecionar para um endereço interno, o Koda para ali.**

**Por quê:** sem conferir cada salto, bastaria um link para burlar a trava acima.

### Teto de saltos

Ele segue no máximo **5 redirecionamentos**. Depois disso, para.

### Teto de tamanho

Cerca de **100 MB** por download.

### Bloqueio de fontes

Há uma lista de fontes bloqueadas para leitura automatizada.

##  O limite honesto do \`url_reader\`

:::atencao
**\`url_reader\` devolve o texto da página, não a página desenhada.**

| Funciona bem | Funciona mal |
| --- | --- |
| Documentação | Site que só monta com JavaScript |
| Artigos e blogs | Aplicação web (SPA) |
| Páginas simples de HTML | Página que exige login |

:::dica
**Para página que precisa de navegador de verdade, use o MCP \`navegador\`.** Ele abre um
Chrome real, clica, digita e lê. É a diferença entre **ler o HTML** e **usar o site**. Ver
[mcp/](../mcp/).

### Sobre login

:::atencao
**Não há leitura de página com login.** Sem sessão, sem cookie, sem autenticação. Se a
página exige entrar, o \`url_reader\` não resolve.

## Pesquisa: como tirar mais proveito

:::dica
**Em pesquisa ampla, peça consultas diferentes.** O Koda foi instruído a variar os termos
para alcançar mais domínios, em vez de repetir a mesma busca.

| Fraco | Forte |
| --- | --- |
| "pesquisa sobre react" | "pesquisa as diferenças entre useMemo e useCallback em React 19" |
| "como fazer deploy" | "pesquisa como fazer deploy de um app Vite na Vercel" |

:::dica
**Se a primeira busca não bastou, diga:** *"procura de outro jeito"* ou *"busca em inglês
também"*. Muitas documentações são melhores em inglês.

## Baixar e enviar

**Baixar:** *"baixa essa imagem e salva como \`logo.png\` na pasta do projeto"*

:::dica
**O que ele baixa fica na pasta do projeto** e passa pela checagem de pasta como qualquer
arquivo. Você sabe onde ele salvou.

:::atencao
**\`upload_file\` MANDA dados seus para a internet.** É a ferramenta de web com mais risco,
porque **envia** em vez de receber. **Confira a URL antes de aprovar.**

## Web × MCP \`navegador\` — qual usar

| Você quer | Use |
| --- | --- |
| Ler documentação | **Web** (\`url_reader\`) |
| Pesquisar no Bing | **Web** (\`web_search\`) |
| Baixar um arquivo | **Web** (\`download_file\`) |
| Testar uma página que **você** construiu | **MCP \`navegador\`** |
| Clicar, digitar, preencher formulário | **MCP \`navegador\`** |
| Ver o que dá erro no console | **MCP \`navegador\` + \`logs\`** |
| Site que só funciona com JavaScript | **MCP \`navegador\`** |

:::dica
**A regra:** Web é para **ler a internet**; \`navegador\` é para **usar uma página**. Para
validar o que você construiu, o \`navegador\` é o caminho — ver [skills/](../skills/).

## Exemplos de pedido

| Você quer | Como pedir (com o Web ligado) |
| --- | --- |
| Documentação | *"lê a doc do FastAPI sobre dependências e me mostra um exemplo"* |
| Versão atual | *"pesquisa qual é a versão estável do React hoje"* |
| Comparar opções | *"pesquisa as diferenças entre Vite e Next para esse caso"* |
| Baixar algo | *"baixa esse CSV e me diz quantas linhas têm"* |
| Resolver um erro | *"pesquisa esse erro: \`Cannot find module 'vite'\`"* |

:::dica
**Colar o erro na busca é um dos usos mais eficientes do Web.** Ele acha discussões com a
solução exata.

## Como tirar mais proveito

**Pesquise como você pesquisaria no buscador.** O Web usa o **Bing**: escreva os termos que
funcionam lá, e em inglês quando o assunto é código.

**Página com login: use o MCP \`navegador\`.** Você entra na sua conta no Chrome real que ele
abre, e a partir dali ele lê e clica. O \`url_reader\` não usa sessão nem cookie — por isso ele
é para o que é público. Ver [mcp/](../mcp/) e a seção abaixo.

**Para enviar arquivo, use \`curl -F\` quando o destino pedir formulário.** O \`upload_file\`
faz um **PUT** simples — o formato que serviços de armazenamento e APIs aceitam. Se o destino
tem campo de upload (multipart), peça pelo \`shell\`:

> *"sobe o \`relatorio.pdf\` com \`curl -F "arquivo=@relatorio.pdf" https://...\`"*

**Cada chamada é independente.** O Koda não mantém uma sessão de navegação: ele abre a página,
lê e pronto. Para uma tarefa que envolve navegar em vários passos — entrar, clicar, preencher
—, diga o percurso inteiro no pedido, ou use o MCP \`navegador\`, que mantém a sessão viva entre
os passos.

:::atencao
**O Web é por mensagem.** Ligue o botão na mensagem em que você precisa — na seguinte, ele
volta ao padrão desligado. Se o pedido não achou nada, confira o botão antes de repetir.

:::dica
**Se a página veio vazia, o problema é o JavaScript.** Site que só monta no navegador
devolve pouco texto. Aí é caso de MCP \`navegador\`, que abre a página de verdade.`
