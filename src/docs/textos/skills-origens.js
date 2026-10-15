// Gerado de skills/README.md (§ As três origens de uma skill) — não edite à mão.
export default `Esta é a parte que confunde, e é onde mora o poder:

| Origem | Onde mora | Quem alcança |
| --- | --- | --- |
| ** Do projeto** | \`<sua pasta>/.agents/skills/<nome>/SKILL.md\` | O \`read_file\` **também** alcança |
| ** Da máquina** | \`~/.agents/skills/<nome>/SKILL.md\` | **Fora** da pasta — só \`use_skill\` alcança |
| ** Cadastrada** | No arquivo de configuração do Koda | Não tem arquivo — as instruções vivem no app |
| ** Do Koda** | Na pasta \`skills/\` que viaja com o app | Vêm de fábrica |

:::dica
**A skill do projeto vence a da máquina.** Se existem duas com o mesmo nome, vale a que
está dentro do projeto — ela está ao alcance do \`read_file\`, e é a versão específica daquele
trabalho.

:::dica
**A skill cadastrada vence todas.** Ela foi escolha explícita sua, feita na tela.

### Por que "da máquina" precisa de ferramenta própria

Uma skill da máquina mora **fora** da pasta de trabalho. O \`read_file\` não a alcança — é
uma trava de segurança do Koda. Então a única forma de ler o conteúdo dela é o \`use_skill\`.

:::atencao
**É por isso que pedir ao Koda para "ler a skill" pode falhar** se você indicar um
caminho fora do projeto. O certo é *"usa a skill \`tal\`"*.`
