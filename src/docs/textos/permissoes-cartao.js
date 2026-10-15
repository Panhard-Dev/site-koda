// Gerado de permissoes/README.md (§ O cartão de permissão) — não edite à mão.
export default `Quando o Koda precisa de autorização, ele **para**. O cartão aparece logo acima do campo de
escrita, e **o passo não roda enquanto você não responder**.

### Anatomia do cartão

| Parte | O que é |
| --- | --- |
| **Título** | O que vai acontecer, em português |
| **Etiqueta de risco** |  \`baixo\` ·  \`médio\` ·  \`alto\` |
| **Explicação** | Por que ele quer fazer isso |
| **O destaque** | O comando ou caminho **exato**, em fonte de código |
| **O aviso** | O que "sempre" e "nunca" passam a valer |
| **Os quatro botões** | Ver abaixo |

### Os quatro botões

| Botão | O que faz |
| --- | --- |
| **Sim** | Autoriza **esta vez** |
| **Sempre permitir** | Autoriza e **lembra** para as próximas |
| **Não** | Recusa **esta vez** |
| **Nunca permitir** | Recusa e **lembra** para as próximas |

:::dica
**O cartão diz exatamente para que o "sempre" vale.** Leia a linha discreta no canto: ela
escreve o escopo. Sem isso, você não saberia se está liberando só este comando ou todos os
comandos para sempre.

:::dica
**"Nunca" vence "sempre".** Se a mesma ação cair em duas regras ao mesmo tempo — uma de
permitir e uma de negar — **negar ganha**. É a escolha segura.

### O que acontece quando você recusa

Nada é executado. O Koda recebe a recusa e **muda de plano** — ele foi instruído a não
insistir e a explicar em vez de tentar outro caminho.`
