// Gerado de mcp/README.md (§ Como ligar, desligar e cadastrar) — não edite à mão.
export default `### Ligar e desligar

No menu ** → MCPs**, cada servidor é um **interruptor**. Alterna sem fechar o menu — dá
para ligar vários seguidos.

:::dica
**Desligar derruba a conexão de verdade.** As ferramentas dele saem do catálogo da
próxima rodada — o Koda nem sabe que existem. Não é só um filtro na tela.

### Cadastrar um servidor novo

Nos Ajustes, na aba **MCPs**. Você informa:

| Campo | O que é |
| --- | --- |
| **Nome** | Como ele aparece (não pode repetir) |
| **Descrição** | O que ele faz — o Koda lê isso para saber quando usar |
| **Comando** | O programa a executar (ex.: \`node\`, \`npx\`, \`python\`) |
| **Parâmetros** | Os argumentos do comando (ex.: o caminho do servidor) |

:::dica
**O cadastro já testa a conexão.** A resposta diz na hora se o servidor subiu e
**quantas ferramentas** ele publicou. Se não subiu, ele fica cadastrado com o motivo do erro
visível — em vez de parecer que funcionou.

:::atencao
**Nome repetido é recusado.** Sobrescrever calado trocaria a configuração de um servidor
de verdade sem aviso.

### Credenciais

Servidores de provedor (Supabase, Cloudflare, Firebase) geralmente não sobem sem um token.
O Koda guarda isso como **variável de ambiente só daquele servidor**.

:::dica
**O token nunca vai no comando.** Se fosse, apareceria na lista de processos da máquina e
em qualquer log que imprimisse a linha de comando. Ele vai por ambiente, do processo.

:::dica
**O valor nunca volta para a tela.** A interface mostra só "tem credencial: sim/não" — o
que basta para você saber se o login já foi feito.`
