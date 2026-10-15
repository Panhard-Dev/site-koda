// Gerado de ferramentas/README.md — não edite à mão.
export default `## O que é

Ferramenta é **o que o Koda pode fazer na sua máquina**. Não é enfeite de interface: cada
uma é uma ação real — ler um arquivo, rodar um comando, buscar na web. Quando você escreve
um pedido, o Koda escolhe sozinho quais ferramentas usar.

**São 40 ferramentas**, divididas em 7 grupos.

## Por que isso importa para você

Você **não precisa** decorar nomes nem chamar ferramenta. Mas saber o que existe muda o que
você pede:

- Se você sabe que existe \`search_codebase\`, pede "procura onde isso é usado" em vez de
  "abre os arquivos e olha".
- Se você sabe que existe \`apply_patch\`, pede uma mudança em vários arquivos de uma vez.
- Se você sabe que \`git_commit\` existe, entende por que o Koda não precisa de você para
  commitar.

:::dica
**A regra de ouro do Koda:** para cada coisa existe a ferramenta certa, e ele prefere
usá-la em vez do shell. Ler arquivo é \`read_file\`, não \`cat\`. Apagar é \`delete_file\`, não
\`rm\`. Isso é **de propósito**: a ferramenta certa pede permissão na hora certa, aparece na
conversa de forma legível e respeita a pasta do projeto.

## Os 7 grupos

| Grupo | Quantas | Para quê |
| --- | --- | --- |
| [**Arquivos**](arquivos.md) | 21 | Ler, escrever, editar, procurar, apagar, mover, copiar |
| [**Execução**](execucao.md) | 5 | Rodar comando, rodar código, instalar e remover pacote |
| [**Git**](git-e-ferramentas.md) | 6 | Status, diff, log, commit, push, pull |
| [**Web**](web-e-ferramentas.md) | 5 | Pesquisar, abrir página, baixar, enviar |
| [**Plano**](plano-e-ferramentas.md) | 1 | Registrar a lista de tarefas |
| [**Skills**](skills-e-ferramentas.md) | 1 | Carregar um pacote de instruções |
| [**Sub-agentes**](subagentes-e-ferramentas.md) | 1 | Lançar um ajudante |

## A lista completa

###  Arquivos (21)

| Ferramenta | Em uma frase |
| --- | --- |
| \`read_file\` | Lê um arquivo de texto inteiro |
| \`read_attachment\` | Lê um arquivo que você **anexou** na conversa |
| \`write_file\` | Cria ou sobrescreve um arquivo inteiro |
| \`edit_file\` | Substitui um trecho exato dentro de um arquivo |
| \`str_replace_editor\` | O mesmo que \`edit_file\` (nome alternativo) |
| \`list_dir\` | Lista os arquivos e subpastas de um diretório |
| \`search_files\` | Acha arquivos pelo nome ou por padrão glob (\`**/*.py\`) |
| \`search_codebase\` | Procura um **texto** dentro de todos os arquivos |
| \`regex_search\` | Procura com **expressão regular** |
| \`grep\` | O mesmo que \`regex_search\` |
| \`vector_search\` | O mesmo que \`search_codebase\` |
| \`get_problems\` | Confere erros de sintaxe num arquivo |
| \`linter\` | O mesmo que \`get_problems\` |
| \`apply_patch\` | Aplica um diff unificado (formato git) |
| \`create_directory\` | Cria uma pasta (e as de cima que faltarem) |
| \`delete_file\` | Apaga um arquivo |
| \`delete_directory\` | Apaga uma pasta inteira, com tudo dentro |
| \`move_file\` | Move arquivo ou pasta |
| \`copy_file\` | Copia arquivo ou pasta inteira |
| \`rename_file\` | Renomeia dentro da mesma pasta |
| \`get_environment\` | Informa sistema, pasta, Python, git |

###  Execução (5)

| Ferramenta | Em uma frase |
| --- | --- |
| \`shell\` | Roda um comando no terminal |
| \`terminal\` | O mesmo que \`shell\` |
| \`code_interpreter\` | Roda um trecho de código (Python ou JavaScript) |
| \`install_package\` | Instala uma dependência no projeto |
| \`uninstall_package\` | Remove uma dependência |

###  Git (6)

\`git_status\` · \`git_diff\` · \`git_log\` · \`git_commit\` · \`git_push\` · \`git_pull\`

###  Web (5)

\`web_search\` · \`url_reader\` · \`browser\` · \`download_file\` · \`upload_file\`

###  Plano, skills e sub-agentes

\`update_todos\` · \`use_skill\` · \`sub_agente\`

## Detalhes que importam

:::dica
**Algumas ferramentas têm dois nomes.** \`terminal\` e \`shell\` fazem exatamente a mesma
coisa; \`grep\` e \`regex_search\`, também; \`linter\` e \`get_problems\`; \`browser\` e
\`url_reader\`; \`vector_search\` e \`search_codebase\`; \`str_replace_editor\` e \`edit_file\`. O
segundo nome existe porque os modelos costumam escrever esses nomes por hábito — e o Koda
aceita os dois para não perder a tarefa. **Para você, é indiferente qual usar num pedido.**

:::dica
**Existem ainda dezenas de apelidos internos.** Se o modelo tentar \`run_command\`,
\`list_directory\`, \`create_file\`, \`web_fetch\` ou \`patch\`, o Koda entende e traduz para a
ferramenta certa em vez de dar erro. Isso é o que evita a tarefa morrer por causa de um
nome.

:::dica
**Toda ferramenta de arquivo respeita a pasta do projeto.** Se o Koda tentar mexer fora
dela, ele recebe um erro explicando as duas saídas: usar caminho relativo, ou pedir a sua
autorização — e o pedido aparece como cartão na conversa. Ver [permissoes/](../permissoes/).

## Como tirar mais proveito

:::dica
**Peça pelo resultado, não pela ferramenta.** Quem escolhe a ferramenta é o Koda, a partir
do que você escreveu. Você não precisa nomear nada — mas pedidos específicos rendem mais:
*"procura onde essa função é usada no projeto"* funciona melhor que *"dá uma olhada nos
arquivos"*.

:::dica
**O que você controla é a permissão.** Ver [permissoes/](../permissoes/). Se um pedido vai
mexer em bastante coisa, acompanhe os cartões de aprovação — é ali que você decide.

:::dica
**Dá para desligar grupos inteiros.** Nos Ajustes você proíbe categorias — o acesso web,
por exemplo. Vale a pena quando você quer uma sessão sem rede: ver [web/](../web/) para o
botão Web.

:::dica
**Ferramenta desligada sai do catálogo de verdade.** Com o Web desligado, as ferramentas
de web não ficam escondidas esperando: elas saem da rodada, e o Koda nem sabe que existem.
Se faltar alguma, é sinal de que o grupo está desligado na tela.

:::dica
**Quando faltar uma ferramenta, peça pelo \`shell\`.** É o caminho para o que não tem
ferramenta própria — e o comando aparece na conversa para você ler antes de aprovar.`
