// Gerado de to-dos/README.md — não edite à mão.
export default `## O que é

Quando o pedido tem mais de um passo, o Koda **escreve a lista** e mostra na conversa como um
**cartão**. Enquanto trabalha, ele marca o que já terminou e qual está fazendo agora.

## Para que serve

- **Saber o que ele vai fazer** antes de fazer.
- **Acompanhar** uma tarefa longa sem ficar perguntando.
- **Corrigir o rumo cedo**, quando a lista não é o que você queria.

## Como aparece

Um cartão na conversa, logo depois da sua mensagem. Cada item está em um de três estados:

| Estado | Como aparece |
| --- | --- |
| **Pendente** | Item normal, ainda não começou |
| **Atual** | Destacado — **é o que ele está fazendo agora** |
| **Feito** | Marcado  |

:::dica
**O item "atual" é o sinal de vida do trabalho.** Numa tarefa longa, olhar qual item está
destacado diz exatamente onde o Koda está — sem precisar perguntar nada.

## Como usar bem

###  Peça o plano antes de começar

Para tarefa grande, escreva:

> *"Quero trocar o CSS puro por Tailwind. Antes de começar, me mostra o plano."*

Ou use o comando: **\`/plan trocar o CSS por Tailwind\`**

**Por que isto vale ouro:** você lê a lista **antes** de ele mexer em qualquer arquivo. Se a
lista está errada, você corrige o rumo por uma frase em vez de refazer tudo.

###  Use o plano para julgar o entendimento

**Se a lista não corresponde ao que você pediu, o Koda entendeu errado.** Não espere ele
terminar: escreva *"não — o segundo item é sobre outra coisa, refaz o plano"*.

Corrigir na lista custa segundos. Corrigir no código custa uma tarefa inteira.

###  O plano é o que impede o Koda de se perder

Numa tarefa com vários passos, sem lista é fácil ele voltar a um item já resolvido ou
esquecer um. A lista é a memória do trabalho.

## O que acontece por baixo

:::dica
**O plano é reenviado inteiro a cada atualização.** O Koda não manda "marque o item 2 como
feito" — ele manda a lista completa com o estado novo. Isso evita o plano sair de sincronia.

:::dica
**O plano é um dos freios do Koda.** Ele é cobrado quando deixa item aberto: se a lista tem
algo pendente e ele tenta encerrar a resposta, é mandado continuar. É por isso que tarefas com
plano raramente ficam pela metade.

:::dica
**O plano entra na detecção de repetição.** Se o Koda tentar a mesma ferramenta com os
mesmos argumentos **e o plano não mudou**, ele é considerado repetindo. O plano é, na
prática, parte de como ele sabe que está andando.

## Exemplo de uso real

**Você escreve:**

> *"Preciso que o login funcione com Google. Antes de começar, me mostra o plano."*

**O cartão aparece com cinco itens:**

1. Ver como o login está hoje e onde ficam as credenciais
2. Adicionar o botão "Entrar com Google" na tela de login
3. Implementar o fluxo OAuth no backend
4. Guardar o retorno no banco
5. Testar o fluxo completo

**Você lê e corrige:** *"tira o item 4 — o provedor já cuida disso, e não quero gravar lá"*

**O Koda refaz o plano e executa.** Você evitou quatro passos de trabalho errado.

## Detalhes que importam

:::dica
**Nem toda tarefa tem plano.** Um pedido de uma linha ("lê esse arquivo e me diz o que
faz") não precisa de lista, e não ganha uma. O plano aparece quando **há o que planejar**.

:::dica
**O plano vive na conversa.** Ele aparece no ponto em que foi criado, junto da resposta.

:::dica
**Ele sobrevive a reabrir a conversa.** O cartão volta quando você volta.

:::dica
**O plano é do Koda, não seu.** Você não marca item nem reordena na tela — para mudar,
escreva na conversa.

## Como tirar mais proveito

:::dica
**Peça o plano em tarefa grande.** Escreva *"antes de começar, me mostra o plano"* ou use
\`/plan\`. Você corrige o rumo por uma frase em vez de refazer tudo.

:::dica
**Leia o plano como um teste de entendimento.** Se a lista não corresponde ao que você
pediu, o Koda entendeu errado — e é agora que vale corrigir.

:::dica
**Se a tarefa não ganhou plano e você queria um, peça:** *"faz um plano para isso"*. Ele
reconhece o pedido mesmo quando não teria criado a lista sozinho.

:::dica
**Acompanhe pelo item "atual".** Numa tarefa longa, é ele que diz onde o Koda está — sem
você precisar perguntar.

:::dica
**Para mudar o plano, escreva na conversa.** *"tira o item 4 e acrescenta um passo de
teste"* — ele refaz a lista.`
