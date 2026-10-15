// Gerado de barra-lateral/README.md (§ Aba Código) — não edite à mão.
export default `## O que é

A **árvore do projeto** de um lado, o **arquivo** do outro. É leitura: **não escreve nada no
disco.**

## Para que serve

- Ver o que o Koda **mudou**, com as linhas que entraram e saíram.
- Ler o código real do projeto sem sair do Koda.
- Conferir um arquivo antes de aprovar algo.

## Como funciona

### A árvore carrega um nível por vez

:::dica
**Isto é uma decisão de desempenho, e você sente a diferença.** Um projeto real tem
milhares de arquivos; trazer tudo de uma vez para mostrar o que ninguém vai ler travaria a
tela. Então **clicar numa pasta pede os filhos dela** — e o que já foi aberto fica guardado,
então reabrir é instantâneo.

A raiz do projeto fica **sempre aberta**, como cabeçalho da coluna.

###  O verde e o vermelho — o recurso mais útil desta aba

Esta é a parte que faz valer a pena abrir a aba durante uma tarefa.

**O arquivo que a IA mexeu nesta execução aparece com o diff pintado:**

- **Verde** — o que **entrou**
- **Vermelho** — o que **saiu**
- **\`+n −m\`** — a contagem, na linha do arquivo na árvore

:::dica
**Você vê o que saiu, não só que saiu.** As linhas removidas aparecem **com o texto
apagado**, em vez de escondidas atrás de um "−3 linhas". É a diferença entre um diff que
informa e um diff que só conta.

:::dica
**A aba acompanha a IA ao vivo.** Ela sonda as mudanças a cada 2,5 segundos. Quando o
conjunto muda, ela relê o arquivo aberto e as pastas abertas. Sem isso, o painel mostraria o
retrato de quando você o abriu — e o assunto dele é justamente o que está acontecendo agora.

### O botão de esquecer as marcas

No alto da aba há um botão que **limpa as marcas de alteração** — o verde, o vermelho e os
contadores.

:::atencao
**Isto NÃO mexe nos seus arquivos.** Só esquece a anotação de "isto mudou nesta execução".
O que está no disco continua igual. É útil para começar uma revisão limpa depois de uma
tarefa longa.

## Detalhes que importam

:::dica
**Não tem realce de sintaxe, e é de propósito.** O que a tela promete é o código **real**,
com os números de linha — e isso ela entrega sem instalar biblioteca nenhuma.

:::dica
**A coluna dos números fica fixa** ao rolar para o lado, para você não perder a referência
num arquivo de linhas largas.

:::dica
**Arquivo grande demais para o diff mostra um ponto** em vez da contagem. Dizer "+0 −0"
seria afirmar um número que ninguém mediu.

:::atencao
**A aba mostra a pasta do projeto escolhido no seletor.** Se você apagou a pasta no disco,
a aba avisa que ela sumiu, em vez de mostrar uma árvore vazia sem explicação.

## Como usar a aba Código no trabalho

:::dica
**Confira o verde e o vermelho depois de cada tarefa.** É a forma mais rápida de revisar o
que o Koda fez, sem ler o código inteiro.

:::dica
**Clique em "esquecer as marcas" para começar uma revisão limpa.** Depois de uma tarefa
longa, o verde acumulado atrapalha ver o que veio depois.

:::dica
**Para editar, peça na conversa.** A aba é de leitura — *"muda o timeout para 60"*.

:::dica
**Ela mostra o que mudou nesta execução.** Para ver o que mudou desde o último commit, peça
o diff: *"me mostra o diff"*. Ver [git/](../git/).`
