// Gerado de permissoes/README.md (§ Os quatro modos) — não edite à mão.
export default `Escolhidos no campo de escrita. Cada um decide **o que pergunta**:

| Modo | O que faz | Pergunta antes de |
| --- | --- | --- |
| ** Manual**<br>*Perguntar sempre* | Pede antes de quase tudo | Comando, escrita, exclusão, sair da pasta |
| ** Padrão**<br>*Padrão* | Trabalha no projeto e pede no que é sério | Comando, exclusão, sair da pasta |
| ** Auto**<br>*Auto* | Executa sem pedir | — (nada) |
| ** Livre**<br>*Livre* | Sem aprovações, e arquivos no computador inteiro | — (nada) |

### As diferenças, em detalhe

| Ação | Manual | Padrão | Auto | Livre |
| --- | --- | --- | --- | --- |
| Rodar um comando |  |  |  |  |
| Escrever arquivo **dentro** do projeto |  |  |  |  |
| **Apagar** arquivo |  |  |  |  |
| Mexer **fora** da pasta do projeto |  |  |  |  |
| Ferramenta de **MCP** |  |  |  |  |

:::dica
**Comece no Padrão.** É o modo equilibrado: ele escreve arquivo no projeto sozinho (o
trabalho normal) e pergunta no que é difícil de desfazer.

###  O que cada modo significa na prática

** Manual** — para quando você quer ver **todo** passo. É lento, e é o certo quando o Koda
está mexendo em algo que você não pode perder.

** Padrão** — o do dia a dia. Ele trabalha, e você aprova o que importa.

** Auto** — para quando você confia no projeto e quer velocidade.  **O shell usa as
permissões da sua conta:** em Auto, o Koda roda comandos sem perguntar, e um comando pode
fazer o que a sua conta pode.

** Livre** — igual ao Auto, **e** solta as ferramentas de arquivo do projeto inteiro. Só
escolha se você realmente quer isso.

:::atencao
**Auto e Livre dispensam a pergunta de comando.** O texto de cada modo foi escrito assim
de propósito: *"quem escolhe isso está decidindo o quanto confia no agente, e uma frase
errada aqui vira arquivo apagado."*`
