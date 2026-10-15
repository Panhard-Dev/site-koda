// Gerado de anexos/README.md (§ Tetos) — não edite à mão.
export default `| Limite | Valor |
| --- | --- |
| Tamanho de um anexo | **32 MB** |
| Imagem enviada no pedido do modelo | **5 MB** |
| Vídeo na rota de transcrição | **64 MB** |

###  O teto de 5 MB para imagens — leia isto

Uma imagem **maior que 5 MB** continua guardada e **visível na conversa**, mas **não é
enviada ao modelo**. A mensagem diz isso, em vez de o pedido inteiro falhar.

**Por quê:** a imagem vai codificada no pedido, o que infla o tamanho em cerca de 33%. E o
Koda reenvia o histórico a cada passo — uma imagem grande pesaria em **cada** passo, não uma
vez só.

:::dica
**Se o Koda disser que não recebeu a imagem, reduza o tamanho.** Um print redimensionado
funciona igual para quase tudo.`
