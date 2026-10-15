// Gerado de area-principal/README.md (§ A conversa) — não edite à mão.
export default `### Suas mensagens

Aparecem como balões. Ao lado de cada uma há ações — entre elas **refazer**, que apaga
aquela resposta e a pergunta que a gerou, e manda o pedido de novo.

### As respostas

A resposta do Koda vem em partes, e cada parte tem um lugar:

| Parte | Como aparece |
| --- | --- |
| **Raciocínio** | Um bloco recolhido no topo da resposta ("pensou por 12s") — clique para abrir |
| **Fala** | O texto normal, já quebrado em parágrafos e com código formatado |
| **Ferramentas** | Cada chamada vira uma linha, com ícone, nome e tempo |
| **Rodapé** | Tempo total, modelo usado e o custo em moedas |

:::dica
**O raciocínio não é enfeite.** Se a resposta veio estranha, abra o bloco de raciocínio:
muitas vezes o modelo entendeu o pedido errado, e você vê isso antes de culpar o resultado.

### As linhas de ferramenta

Cada ferramenta que roda vira **uma linha discreta** — nada de parede de texto. O resultado
fica escondido atrás de um clique.

O que a linha mostra:

- **Ícone e nome** da ferramenta (\`read_file\`, \`shell\`, \`web_search\`…)
- **Um resumo** do que ela fez, quando dá para resumir
- **O tempo** que levou
- **O resultado completo** ao clicar

:::atencao
**Uma ferramenta com problema aparece marcada.** Se o resultado veio como erro, a linha
muda de cor. Ler essa linha é o primeiro passo de qualquer diagnóstico — ver
[diagnostico/](../diagnostico/).

### O cartão de tarefas (o plano)

Quando a tarefa tem mais de um passo, um **cartão com a lista** aparece na conversa. Cada
item tem três estados: pendente, fazendo agora e feito. Ver [to-dos/](../to-dos/).

### O cartão de permissão

Quando o Koda precisa fazer algo sensível — rodar um comando, apagar um arquivo, sair da
pasta do projeto — ele **para e pergunta**, e o cartão aparece com os botões de resposta.
Ver [permissoes/](../permissoes/).

### O cartão de compactação

Quando a conversa fica longa demais, o Koda resume o que já passou. Isso aparece como um
**cartão no ponto exato** onde aconteceu, dizendo quantas mensagens viraram resumo. A
conversa não é apagada — o que sai do contexto ativo continua visível na tela. Ver
[contexto/](../contexto/).`
