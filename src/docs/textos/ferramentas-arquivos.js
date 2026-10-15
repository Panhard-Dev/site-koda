// Gerado de ferramentas/arquivos.md — não edite à mão.
export default `O grupo que você mais vai ver rodando. São as ferramentas que **mexem nos seus arquivos**.

Por que o Koda não usa \`cat\`, \`ls\` e \`rm\` para isso? Porque a ferramenta própria:

- aparece na conversa de forma legível (você vê "leu \`src/app.py\`", não uma linha de shell);
- respeita a **pasta do projeto**, e pede permissão para sair dela;
- pode ser proibida por inteiro nos Ajustes;
- mostra o diff quando altera algo.

## Ler

### \`read_file\` — lê um arquivo de texto inteiro

**Quando usar:** "o que tem nesse arquivo", "explica essa função".

**Como pedir:** *"lê o \`src/App.tsx\` e me diz onde fica o tratamento de erro"*

**Argumentos:**

| Argumento | O que é |
| --- | --- |
| \`caminho\` | O arquivo (relativo à pasta do projeto, ou absoluto) |
| \`inicio\` | Linha inicial (padrão: 1) |
| \`limite\` | Quantas linhas ler (padrão: o arquivo inteiro) |

:::dica
**O arquivo vem inteiro por padrão, e isso é de propósito.** O Koda foi ensinado a
**não** passar \`limite\` por hábito: ler o arquivo completo de uma vez evita ler o mesmo
arquivo três vezes procurando pedaços.

:::dica
**Você não precisa dizer o caminho completo.** Se o arquivo está na pasta do projeto,
basta o nome ou o caminho de dentro dela.

### \`read_attachment\` — lê um arquivo que você anexou

**Quando usar:** você anexou um PDF, um CSV ou um arquivo de código e quer que o Koda
analise o conteúdo.

**Como pedir:** *"lê o anexo e me diz quantas linhas têm"*

**Argumento:** \`id\` — o identificador do anexo, que o Koda recebe automaticamente.

:::atencao
**O anexo não está na pasta do projeto.** Por isso \`read_file\` não o encontra, e passar
o *nome* do arquivo não funciona — é preciso o \`id\`, que já vai no bloco de anexos da sua
mensagem. Você não precisa fazer nada: o Koda tem essa informação.

:::dica
**Para imagens, esta ferramenta não é necessária.** Quando o modelo enxerga imagens (nem
todos enxergam — ver [modelos/](../modelos/)), a imagem **já vai no contexto dele**. Se a
imagem não aparece, é porque o modelo escolhido não tem visão.

Ver também [anexos/](../anexos/).

## Escrever e editar

### \`write_file\` — cria ou sobrescreve um arquivo

**Quando usar:** criar um arquivo novo, ou substituir todo o conteúdo de um.

**Como pedir:** *"cria um \`README.md\` na raiz explicando o projeto"*

**Argumentos:** \`caminho\`, \`conteudo\`.

:::atencao
**Isto substitui o conteúdo todo.** Se você quer mudar só um trecho, o certo é
\`edit_file\` — e é isso que o Koda vai escolher se você disser "muda a linha X".

:::dica
**Cria as subpastas que faltarem.** Pedir para criar \`src/utils/format.ts\` funciona
mesmo que \`utils\` não exista.

### \`edit_file\` — troca um trecho exato

**Quando usar:** corrigir uma linha, renomear uma função, ajustar um valor.

**Como pedir:** *"troca o timeout de 30 para 60 no \`client.ts\`"*

**Argumentos:** \`caminho\`, \`old_string\` (o trecho atual), \`new_string\` (o novo).

:::atencao
**O trecho procurado tem de ser único no arquivo.** Se o texto aparece duas vezes, a
edição não é aplicada — é uma trava de segurança para não alterar o lugar errado. Se isso
acontecer, peça para o Koda incluir mais contexto no trecho.

### \`str_replace_editor\` — o mesmo que \`edit_file\`

Nome alternativo, aceito porque muitos modelos escrevem assim. Para você, é a mesma coisa.

### \`apply_patch\` — aplica um diff unificado

**Quando usar:** mudar **vários arquivos de uma vez**, ou aplicar um patch que você tem em
mãos.

**Como pedir:** *"aplica esse diff no projeto"* (colando o diff)

**Argumento:** \`diff\` — o diff completo, com cabeçalhos \`---\`/\`+++\` e blocos \`@@\`.

:::dica
**É a ferramenta mais segura para mudança grande.** Ela aplica em duas fases: primeiro
confere se **todos** os trechos batem, e só então escreve. Se algum não bater, nada é
alterado — em vez de deixar o projeto pela metade.

## Procurar

Aqui é onde a maioria das pessoas usa o shell por hábito e perde tempo. Estas três
ferramentas fazem o trabalho melhor.

### \`search_codebase\` — procura um **texto** nos arquivos

**Quando usar:** "onde isso aparece no projeto", "quem chama essa função".

**Como pedir:** *"procura onde \`calcularTotal\` é usado"*

**Argumentos:** \`termo\`, \`regex\` (opcional).

**Devolve:** \`arquivo:linha\` com a linha encontrada.

### \`regex_search\` — procura com **expressão regular**

**Quando usar:** quando o padrão importa — todos os \`TODO\`, todos os \`console.log\`, todos
os números de telefone.

**Como pedir:** *"acha todos os \`console.log\` que sobraram no src"*

**Argumento:** \`padrao\`.

| Se você quer… | A ferramenta é |
| --- | --- |
| Um texto literal | \`search_codebase\` |
| Um padrão (regex) | \`regex_search\` |

### \`search_files\` — acha arquivos pelo **nome**

**Quando usar:** "quais são os arquivos de teste", "cadê os CSS".

**Como pedir:** *"lista todos os arquivos \`.test.ts\` do projeto"*

**Argumentos:** \`padrao\` (glob, ex.: \`**/*.ts\`), \`caminho\` (pasta onde procurar).

### \`list_dir\` — lista o que tem numa pasta

**Como pedir:** *"o que tem na pasta \`src/components\`"*

**Argumento:** \`caminho\` (padrão: a pasta do projeto).

### \`get_problems\` — confere erros de sintaxe

**Quando usar:** "esse arquivo está com erro?", depois de uma edição.

**Como pedir:** *"confere se esse arquivo tem erro de sintaxe"*

**Argumento:** \`caminho\`.

:::dica
Para Python ele compila o arquivo de verdade; se o **pyflakes** estiver instalado, ele
também acha variável não usada e import sobrando.

:::atencao
**Isto não é um type-checker.** Ele acha erro de sintaxe, não erro de tipo. Para isso o
certo é rodar o \`tsc\`, o \`mypy\` ou o que o seu projeto usa, pelo \`shell\`.

### \`get_environment\` — o retrato do ambiente

**Quando usar:** quando o Koda erra o comando, ou quando você quer saber o que ele "vê".

**Como pedir:** *"me diz em que pasta você está e qual Python você usa"*

**Devolve:** sistema operacional, pasta de trabalho, versão do Python, se há repositório
git e o que tem na pasta.

:::dica
**É o primeiro comando de qualquer diagnóstico.** Se o Koda está agindo estranho, peça
isso: muitas vezes ele está na pasta errada, ou usando outro Python.

## Organizar

| Ferramenta | O que faz | Argumentos |
| --- | --- | --- |
| \`create_directory\` | Cria pasta (e as de cima) | \`caminho\` |
| \`move_file\` | Move arquivo ou pasta | \`origem\`, \`destino\` |
| \`copy_file\` | Copia arquivo ou pasta inteira | \`origem\`, \`destino\` |
| \`rename_file\` | Renomeia na mesma pasta | \`caminho\`, \`novo_nome\` |
| \`delete_file\` | Apaga **um arquivo** | \`caminho\` |
| \`delete_directory\` | Apaga **uma pasta inteira** | \`caminho\` |

**Como pedir:** *"renomeia \`utils.js\` para \`helpers.js\`"*

### Cuidados importantes

:::atencao
**\`move_file\` não sobrescreve.** Se o destino já existe, ele recusa. Isso é proteção
contra perder arquivo sem perceber. Para substituir, apague o destino antes — de propósito.

:::atencao
**\`delete_file\` apaga arquivo, não pasta.** Para pasta existe \`delete_directory\`, que é
recursivo e leva tudo dentro.

:::atencao
**\`delete_directory\` nunca apaga a pasta de trabalho, nem uma pasta acima dela.** Isso é
uma trava fixa do programa, não uma permissão: mesmo que você autorize, ele recusa apagar a
raiz do projeto. O motivo é simples — apagar pasta é recursivo, e nenhum cartão de
permissão traz de volta o que já foi apagado.

:::atencao
**Nada disso vai para a lixeira.** As exclusões são definitivas. Se a pasta estiver sob
git, dá para recuperar pelo git; se não estiver, não dá.

:::dica
**Peça confirmação antes de apagar em lote.** O modo \`default\` já pede permissão para
exclusão — mas vale escrever "antes de apagar, me lista o que vai sair".

## Detalhes que importam

:::dica
**Tudo é relativo à pasta do projeto.** \`read_file\` com \`"src/app.py"\` procura dentro da
pasta escolhida no seletor. Isso é o que faz o Koda funcionar em qualquer projeto sem você
repassar caminhos.

:::dica
**Caminho absoluto funciona, mas pede permissão.** Se você disser "abre
\`C:\\outra\\pasta\\x.txt\`", o Koda vai pedir autorização — porque saiu do projeto. Ver
[permissoes/](../permissoes/).

:::dica
**O Koda prefere a ferramenta certa, sempre.** Ele foi instruído a usar \`edit_file\` em
vez de \`sed\`, \`search_codebase\` em vez de \`findstr\`. Se você o vir usando o \`shell\` para
ler arquivo, pode pedir para ele mudar de abordagem.

:::dica
**Arquivo muito grande é lido por partes.** Acima de um teto, o retorno avisa o que
ficou de fora — e aí você pede o resto com \`inicio\`/\`limite\`.

## O que fazer em cada situação

**Para ler um arquivo que não é texto** (\`.exe\`, \`.dll\`, uma imagem), não peça \`read_file\`: o
resultado é lixo. O caminho certo depende do tipo:

| Você tem | Como pedir |
| --- | --- |
| Um **PDF** | Anexe na conversa e peça *"lê o anexo"* — ver [anexos/](../anexos/) |
| Uma **imagem** | Anexe e use um modelo com visão — ver [modelos/](../modelos/) |
| Um **binário ou \`.exe\`** | Peça o que você quer saber dele: *"que tipo de arquivo é esse?"*, *"roda \`strings\` nele"* |

**Para editar, mande o trecho exato.** O \`edit_file\` compara caractere por caractere,
incluindo a indentação. Se a edição não pegou, o mais rápido é copiar do arquivo o trecho que
você quer trocar e colar no pedido: *"troca exatamente este trecho por este outro"*.

**Para não perder trabalho, use git.** Não existe desfazer de edição — nem no Koda, nem no
programa. O que existe é voltar pelo git: commite antes de cada tarefa arriscada e, se algo
sair errado, peça *"desfaz as mudanças desde o último commit"*. Ver [git/](../git/).

**Para conferir tipos, chame o checador do seu projeto.** O \`get_problems\` é a checagem
rápida de sintaxe; o erro de tipo quem acha é o \`tsc\`, o \`mypy\` ou o que o seu projeto usa.
Peça: *"roda o \`tsc --noEmit\`"*.

:::dica
**Na dúvida sobre qual ferramenta serve, diga o resultado que você quer.** *"quero saber
onde essa função é chamada"* leva o Koda a \`search_codebase\`; *"quero trocar esse valor em
todos os arquivos"* leva a \`apply_patch\`.`
