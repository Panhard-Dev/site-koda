// Gerado de barra-lateral/README.md (§ Aba Logs) — não edite à mão.
export default `## O que é

O retrato dos **erros** que o MCP \`logs\` consolidou. Mostra **só erro** — o MCP já filtra
aviso, informação e depuração, e a tela não repete o filtro.

## Para que serve

- Ver **o que está quebrado** enquanto o Koda investiga.
- Conferir se um erro **voltou** depois de uma correção.
- Acompanhar sem pedir nada: a aba atualiza sozinha.

## Como ler cada linha

Cada erro é uma linha, e o desenho segue uma regra: **um problema por linha.** A repetição
não vira linha nova.

| Elemento | O que significa |
| --- | --- |
|  **Ponto vermelho** | Severidade **grave** |
|  **Ponto amarelo** | Severidade menor |
| \`fonte/tipo\` | De onde veio (console, rede, log do servidor) |
| **Etiqueta de severidade** | \`grave\` ou o nível menor |
| **\`×N\`** | Ocorreu N vezes |
| **\`repetindo\`** | Continua acontecendo agora |
| **\`novo\`** | Nasceu **depois** da marca que a IA deixou |
| **O texto** | A mensagem do erro |
| **A linha de baixo** | Onde: arquivo e linha |

:::dica
**A etiqueta \`novo\` é o recurso mais valioso.** Ela separa "isto já estava quebrado antes
de eu mexer" de "isto eu acabei de quebrar". Sem ela, uma lista de 40 erros não diz nada.

:::dica
**\`×N\` e \`repetindo\` evitam a parede de texto.** Um erro que aconteceu 300 vezes ocupa
**uma linha**, com contador — em vez de 300 cópias idênticas.

:::dica
**A correlação entre front e back é o pulo do gato.** O erro do console e o erro do log
do servidor aparecem **ligados**, para você achar a causa em vez de ficar com dois sintomas.

## Como ele se atualiza

A aba sonda a cada **2 segundos** — o mesmo ritmo com que o MCP escreve.

:::dica
**\`vivo\` diz se está atualizado.** Se o MCP parou de publicar, a aba diz que parou em vez
de mostrar uma lista velha como se fosse a de agora. Isso é deliberado: uma lista velha
apresentada como atual é pior do que dizer que parou.`
