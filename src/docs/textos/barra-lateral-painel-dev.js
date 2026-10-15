// Gerado de barra-lateral/README.md (§ Aba Painel Dev) — não edite à mão.
export default `## O que é

Um **navegador de verdade** dentro do Koda. Ele mostra a **mesma sessão que a IA está
dirigindo** — não uma segunda instância que mostraria outra coisa.

## Para que serve

- **Ver o que o Koda está fazendo** quando ele abre uma página para testar.
- **Navegar você mesmo** enquanto o Koda trabalha.
- **Conferir uma alteração** que ele acabou de fazer numa interface.

## Como usar

### A barra de endereço

No alto há um campo. Você digita e aperta Enter. Ele aceita **três tipos de endereço**:

| Você digita | O que acontece |
| --- | --- |
| \`https://exemplo.com\` | Abre o site |
| \`localhost:5173\` | Abre o seu servidor de desenvolvimento |
| \`C:\\pasta\\index.html\` | **Abre um arquivo do seu disco** |

:::dica
**Caminho de arquivo funciona — e isso resolve um problema real.** O navegador proíbe uma
página web de abrir um arquivo local, então o Koda faz a conversão por baixo. Você aponta o
caminho e ele abre.

:::dica
**Apontar para uma pasta abre como listagem.** Útil para ver o que tem em \`dist/\` depois
de um build.

### Os botões

| Botão | O que faz |
| --- | --- |
|  **Abrir endereço** | Vai para o que está no campo |
|  **Recarregar** | Recarrega a página |

### O que aparece automaticamente

:::dica
**O painel segue a IA sozinho.** Quando o Koda abre uma página nova, o painel **troca
para ela** e recarrega. Você não precisa digitar nada — é só olhar.

:::dica
**Ele acompanha até a rolagem.** Se a IA rolou a página lá embaixo para ler algo, o
painel vai para o mesmo ponto. Sem isso, ele ficaria sempre no topo enquanto o Koda lê lá
embaixo.

:::dica
**Mas ele não briga com a sua mão.** A rolagem só é reaplicada quando **muda de verdade**.
Se você está rolando o painel manualmente, ele não te puxa de volta a cada segundo.

### Quando não há sessão

Se nenhuma sessão de navegador foi aberta ainda, o painel diz isso — em vez de mostrar uma
página em branco sem explicação. É o mesmo navegador de sempre, pronto para você digitar um
endereço.`
