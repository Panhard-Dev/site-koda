// Gerado de skills/README.md (§ Criar a sua própria skill) — não edite à mão.
export default `### Opção 1 — cadastrada na tela (mais simples)

Nos Ajustes, na aba **Skills**, você escreve:

| Campo | O que é |
| --- | --- |
| **Nome** | Como o Koda vai chamá-la |
| **Descrição** | **Quando** usar — o Koda lê isto para decidir |
| **Instruções** | O procedimento em si |

:::dica
**As instruções da skill cadastrada vão inteiras no prompt.** Não há arquivo para o Koda
ler, então o texto tem de estar ali. Isso significa que ela vale sempre — e que ela **gasta
contexto**.

### Opção 2 — arquivo \`SKILL.md\` (mais poderosa)

Crie a pasta e o arquivo:

\`\`\`
meu-projeto/.agents/skills/minha-skill/SKILL.md
\`\`\`

O arquivo começa com uma **frente** entre \`---\`, e depois vem o corpo:

\`\`\`markdown

name: minha-skill
description: Explica em uma frase QUANDO usar esta skill.`
