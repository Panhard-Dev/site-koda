// Gerado de contexto/README.md (§ O anel de contexto) — não edite à mão.
export default `Perto dos seletores, embaixo do campo de escrita, há um **anel**. Passar o mouse mostra:

> \`32.5% · 325K / 1M contexto usado\`

### As cores

| Cor | Quando | O que significa |
| --- | --- | --- |
|  **Verde** | Abaixo de 60% | Tranquilo |
|  **Amarelo** | A partir de 60% | Fique de olho — tarefa longa vai encher |
|  **Vermelho** | A partir de 85% | Compactação próxima |

### O que o anel mede

:::dica
**O número é medido, não estimado.** Ele vem da contagem real que o serviço fez do que
recebeu no último passo.

:::dica
**O anel roda enquanto o Koda trabalha.** Se ele está girando, ele está processando — mesmo
que a resposta não tenha crescido.

:::atencao
**O anel começa vazio numa conversa nova, e isso é correto.** Sem medida, zero é uma
informação — melhor do que um enfeite que finge saber.

### O teto

O teto é de **1 milhão de tokens** por padrão — a janela dos modelos.

:::dica
**O denominador é o teto do Koda, não o de cada modelo.** O serviço não publica a janela de
cada um, e medir contra um número inventado daria um percentual bonito e falso.`
