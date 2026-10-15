// Gerado de videos/README.md (§ O editor de vídeo (o botão da câmera)) — não edite à mão.
export default `Além da conversa, o Koda tem uma **área de vídeo** própria, que abre pelo **botão da
câmera** no cabeçalho.

### O que ela tem

Quatro áreas:

| Área | O que é |
| --- | --- |
| ▶ **Prévia** | O vídeo tocando de verdade |
|  **Controles** | Tocar, pausar, tempo atual |
|  **Trilha de áudio** | A onda desenhada do áudio |
|  **Transcrição** | As falas com timestamps, na coluna ao lado |

### O que dá para fazer

:::dica
**Tudo funciona de verdade — nada é simulado:**

- **Abrir** um vídeo (pelo seletor do Koda ou **arrastando** para a área).
- **Tocar e pausar**, com o tempo atual.
- **Clicar na trilha para pular** para aquele ponto do vídeo.
- **Ver os quadros** de qualquer instante.
- **Ver a onda do áudio**, desenhada do arquivo real.
- **Ler a transcrição** com os tempos.

:::dica
**A onda e a transcrição nascem do mesmo trabalho.** O Koda decodifica o áudio **uma vez
só**: a onda usa os picos, e a transcrição reexporta um WAV em 16 kHz. Decodificar duas
vezes um arquivo grande seria pagar o preço dele duas vezes.

:::dica
**Backend fora do ar derruba a transcrição, mas não a onda.** As duas metades são
independentes de propósito: a onda é local e rápida, a transcrição é remota e lenta.`
