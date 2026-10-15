// Gerado de diagnostico/README.md (§ O Koda não responde / a linha de trabalho gira sem parar) — não edite à mão.
export default `### 1. Primeiro, olhe o topo da conversa

Avisos de sessão, modelo bloqueado e créditos aparecem ali. **Muitas vezes a resposta está
escrita na tela** e a pessoa não olhou.

### 2. Veja se a linha de reconexão apareceu

Se apareceu **"Reconectando ao serviço de modelos"**, é o serviço local que caiu.

**O que fazer:** espere. O Koda tenta reconectar sozinho, várias vezes, com espera crescente.

:::dica
**Em desenvolvimento, o Koda reergue o serviço sozinho.** Quem levanta é o próprio backend,
com espera entre tentativas — antes, a tela insistia para sempre e o serviço nunca voltava,
porque não havia ninguém para levantá-lo.

### 3. Peça o ambiente

Escreva: **"me diz em que pasta você está e qual Python você usa"**

:::dica
Este é **o primeiro comando de qualquer diagnóstico**. Nove entre dez vezes o problema é
que ele está na pasta errada, ou usando outro Python.

### 4. Verifique se você está no modo offline

:::atencao
**O sintoma mais traiçoeiro:** o Koda **responde**, mas diz que **não tem acesso às
ferramentas**.

**O que aconteceu:** o serviço de modelos está fora, e o Koda caiu no provider local — que
**não tem ferramentas**.

**Como confirmar:** peça *"lista os arquivos desta pasta"*. Se ele disser que não pode listar,
é isso.

**O que fazer:** o problema é o serviço, não o pedido. Veja o item 2.`
