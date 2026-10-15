// Gerado de conta/README.md (§ Consumo: requisições e moedas) — não edite à mão.
export default `### O teto de requisições

**250 por minuto**, e é do **Koda inteiro**:

> Teto de 250 requisições por minuto atingido. O teto é do Koda inteiro: conta todos os chats
> abertos e cada sub-agente lançado. Espere um pouco e mande de novo — nada do que você
> escreveu foi perdido.

:::dica
**Por que é do app e não da conversa:** um teto por conversa seria um teto que se
multiplica abrindo conversas — exatamente o que ele existe para impedir.

Ver [modelos/](../modelos/).

### Moedas

:::dica
**Cada resposta tem um custo em moedas**, e ele aparece no **rodapé** da mensagem, junto com
o tempo e o modelo usado.

:::dica
**Contexto grande custa mais**, porque cada passo reenvia o histórico. Se o custo está
subindo, considere começar uma conversa nova. Ver [contexto/](../contexto/).

:::dica
**Esforço alto custa mais.** Ver [modelos/](../modelos/).`
