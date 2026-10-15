// Gerado de modelos/README.md (§ O esforço de raciocínio — o controle mais importante da tela) — não edite à mão.
export default `Ao lado do seletor de modelo há o de **esforço**. São **sete níveis**:

| Nível | O que significa |
| --- | --- |
| **Automático** | Quem decide é o botão *Reasoning*. **É o padrão.** |
| **Mínimo** | Responde rápido, pensa pouco |
| **Baixo** | Pensa um pouco mais antes de responder |
| **Médio** | Equilíbrio entre tempo e profundidade |
| **Alto** | Pensa mais — a resposta demora mais |
| **Muito alto** | Pensa muito — a resposta demora bem mais |
| **Máximo** | O máximo que o modelo permite |

###  Cada modelo guarda o seu esforço

**Isto é o detalhe que muda o dia a dia.** Trocar de modelo **troca o esforço junto**.

\`Liz 4\` no alto não quer dizer \`Liz Nano\` no alto. Você configura uma vez por modelo, e cada
um lembra da sua escolha.

**Por que isso importa:** pergunta rápida num modelo leve com esforço mínimo responde quase
instantaneamente. Tarefa de arquitetura num modelo grande com esforço alto economiza idas e
voltas. Sem reconfigurar nada a cada troca.

### Quando usar cada nível

| Situação | Esforço |
| --- | --- |
| "Qual a capital da França", formatar um texto | **Mínimo** |
| Explicar um trecho de código, um ajuste pequeno | **Baixo** |
| Trabalho normal de código | **Médio** |
| Refatoração, bug difícil, decisão de arquitetura | **Alto** |
| Problema que já resistiu a duas tentativas | **Muito alto** |
| Última instância, problema realmente difícil | **Máximo** |

:::dica
**O custo do esforço alto é tempo, não qualidade.** Esforço baixo numa tarefa difícil dá
resposta pior; esforço alto numa tarefa simples só faz você esperar.

### O botão Reasoning

Quando o esforço está em **Automático**, quem decide é o botão **Reasoning** da caixa de
mensagem:

- **Ligado** → pensa (equivalente ao mínimo)
- **Desligado** → não pensa

:::atencao
**Não existe opção "nenhum" no seletor, e é de propósito.** Alguns modelos recusam esse
valor. Desligar o raciocínio é o que o botão Reasoning faz — com o cuidado de usar o mínimo
nos modelos que recusam.

:::dica
**Se você escolher um nível fixo, o botão Reasoning deixa de influenciar.** O nível
escolhido manda.

### Um nível que o modelo não aceita

:::atencao
**Escolher um nível que o modelo recusa não quebra nada.** O Koda arredonda para o mais
próximo que aquele modelo aceita. Se você puser "Máximo" num modelo que só vai até "Alto",
ele usa "Alto".`
