// Gerado de atualizacao/README.md — não edite à mão.
export default `## O que é

O Koda avisa quando existe uma versão nova. O aviso vem da nuvem, e a atualização é
**opcional** — o app funciona inteiro sem ela.

## Como funciona

1. O Koda consulta a nuvem (de forma discreta, fora do caminho crítico).
2. Se houver versão nova, um **aviso** aparece.
3. Você escolhe baixar.

:::dica
**A consulta nunca segura o app.** Ela roda em segundo plano, e **nenhuma falha da nuvem
derruba o que você está fazendo**. Sem resposta, o Koda segue igual.

## Os canais

A nuvem publica em **canais**. O padrão é o **\`stable\`** (estável) — a versão testada.

:::dica
**Canal é o que separa "versão de todo mundo" de "versão de teste".** Se você não sabe qual
está usando, está no estável.

## Tipos de aviso

| Tipo | O que significa |
| --- | --- |
| **Atualização disponível** | Existe versão nova; você escolhe quando |
| **Atualização obrigatória** | A versão atual não é mais suportada; atualize para continuar |

:::atencao
**Atualização obrigatória aparece quando a sua versão deixou de funcionar** com o serviço.
Não é insistência do app — é incompatibilidade real.

## Como atualizar

Siga o que o aviso oferece. O link de download vem da nuvem, e é validado antes de chegar à
tela.

:::atencao
**O Koda só aceita link HTTPS do domínio permitido.** Um link fora disso é **descartado** —
é uma trava de segurança para que a nuvem não consiga te empurrar para um endereço arbitrário.

##  Como a atualização é protegida

Estas travas são invisíveis no uso normal, mas valem conhecer:

| Trava | O que impede |
| --- | --- |
| **Só HTTPS** | Download por conexão insegura |
| **Sem redirecionamento para outro host** | A nuvem empurrar o app para outro lugar |
| **Tempo limite curto** | Um serviço lento travar a tela |
| **Teto de tamanho da resposta** | Resposta gigante travar o app |
| **Validação da resposta** | Campo que o app não sabe usar chegar na interface |
| **Token só no cabeçalho** | O token vazar em URL ou log |

:::dica
**O token nunca aparece numa URL, numa mensagem de erro ou num log.** É o que evita ele
vazar para um log de servidor.

##  O que é atualizado

| Peça | Atualiza com o app? |
| --- | --- |
| A interface |  Sim |
| O backend |  Sim |
| As **skills** que vêm com o Koda |  Sim |
| Os **MCPs** que vêm com o Koda |  Sim |
| O **serviço de modelos** |  Sim |
| As **suas** skills |  Não — são suas |
| Os **seus** MCPs |  Não |
| Os **seus** sub-agentes |  Não |
| O seu **histórico** |  Não — fica no banco local |
| Os seus **projetos** |  Não — são suas pastas |

:::dica
**O que você configurou não é tocado.** As skills que vêm no pacote são substituídas; as
suas, não.

:::atencao
**Mudanças nas skills do pacote podem alterar o comportamento.** Se o Koda passou a agir
diferente depois de uma atualização, verifique se uma skill do pacote mudou — ou desligue-a no
menu  → Skills.

## Quando a atualização falha

### O download não começa

1. Confira a sua conexão.
2. Tente de novo — a consulta à nuvem é guardada por pouco tempo, e uma falha de rede libera
   uma nova tentativa em **15 segundos**.
3. Se persistir, baixe pelo canal oficial.

### O aviso não aparece, mas você sabe que há versão nova

:::dica
**Uma falha de rede fica guardada por apenas 15 segundos** — de propósito. Guardar pelo
mesmo prazo do sucesso deixava a tela dizendo "sem resposta" por 15 minutos depois de um
tropeço. Então: espere um pouco e reabra.

### O app não abre depois de atualizar

:::atencao
**Isto não é diagnosticável de dentro do Koda.** Antes de tudo:

1. Feche o Koda por completo.
2. Abra de novo.

:::dica
**O Koda grava um log de diagnóstico** que ajuda a reportar o problema — ver abaixo.

##  Onde ficam os logs (para reportar problema)

O Koda grava arquivos de log na pasta de temporários do Windows (\`%TEMP%\`):

| Arquivo | O que tem |
| --- | --- |
| \`koda-desktop.log\` | O que o app desktop fez: subida, portas, serviços |
| \`koda-backend.log\` | O que o backend escreveu |

:::dica
**Apague à vontade.** São diagnóstico, não dados seus.

**Por que existem:** no modo de app instalado, a janela de console não existe — sem arquivo,
não haveria como saber por que o app não subiu.

:::atencao
**O log de diagnóstico é a primeira coisa a olhar** se o app não abre ou diz que não
consegue falar com o serviço.

## Detalhes que importam

:::dica
**A versão atual aparece nos Ajustes.** É o que você confere antes de reportar um problema.

:::dica
**O Koda se identifica na nuvem sem dados seus.** O identificador é genérico: **sem versão de
build e sem identificador de máquina**.

:::dica
**A consulta de versão é guardada por 15 minutos** quando dá certo. Não é a cada abertura do
app.

:::dica
**O aviso de atualização é opcional.** Você pode fechá-lo e continuar trabalhando.

:::dica
**Atualização obrigatória bloqueia o uso.** Se aparecer, é porque a sua versão deixou de
falar com o serviço — atualize para voltar a usar.

## Sobre os serviços que nascem com o app

O Koda sobe, junto com a janela, dois programas:

1. **O serviço de modelos** — quem tem os modelos.
2. **O backend** — a API que a interface fala.

:::dica
**Os dois nascem e morrem com o app.** Ao fechar o Koda, eles são encerrados — inclusive se
o app morrer sem passar pelo encerramento normal. **Não ficam processos órfãos** segurando
porta e CPU.

:::dica
**Enquanto a janela está aberta, um vigia confere os serviços e reergue o que caiu.** A
conversa não fica sem serviço no meio do uso.

:::dica
**Nada é reaproveitado às cegas.** Se uma porta estiver ocupada, o Koda identifica o dono —
e só reutiliza **outra janela do Koda**. Um programa estranho naquela porta **não é tocado nem
consultado**. Isso existe por um motivo concreto: antes, um estranho ouvindo na porta era
tratado como "serviço já no ar", e o backend mandava a sessão da conta para ele.

## Como se preparar para uma atualização

:::dica
**Você é avisado e escolhe quando.** Nada é atualizado por baixo.

:::dica
**Atualize quando for conveniente** — de preferência não no meio de uma tarefa longa.

:::dica
**Commit o seu trabalho antes.** Ver [git/](../git/). É a rede de segurança que vale para
qualquer mudança.

:::dica
**O que você configurou é preservado.** As suas skills, MCPs, sub-agentes, histórico e
projetos não são tocados — só o que vem no pacote do Koda é substituído.

:::dica
**Se o Koda agir diferente depois de atualizar**, verifique o menu  → Skills: uma skill do
pacote pode ter mudado, e você pode desligá-la.

:::dica
**Se o app não abrir**, feche por completo e abra de novo. Persistindo, o log de diagnóstico
(abaixo) diz o que houve.`
