// Gerado de conta/README.md (§ A loja (Store)) — não edite à mão.
export default `No menu ** → Store**. É a vitrine de **conectores e skills** que ainda não estão na sua
máquina.

### O que você encontra lá

| Tipo | O que é |
| --- | --- |
| **Conector** | Um servidor MCP pronto (com a credencial pedida no login) |
| **Skill** | Um pacote de instruções para instalar |

:::dica
**A Store fica depois de Skills e MCPs no menu, e isso é deliberado.** Quem abre o menu já
está olhando para o que tem; a vitrine vem na sequência — é a porta do que ainda não está na
máquina.

### Credenciais de conector

:::dica
**O token de um conector nunca vai no comando.** Ele é guardado como variável de ambiente
só daquele servidor — se fosse na linha de comando, apareceria na lista de processos da
máquina e em qualquer log que imprimisse o argv.

:::dica
**O valor nunca volta para a tela.** O Koda mostra só "tem credencial: sim/não", que é o
suficiente para você saber se o login já foi feito.

Ver [mcp/](../mcp/).`
