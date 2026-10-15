/**
 * O sumário da documentação — **os pilares e o que tem dentro de cada um**.
 *
 * Fica aqui, e não dentro do componente, porque é dado puro: quem desenha a barra e quem
 * monta o índice leem a mesma lista. Acrescentar uma seção é acrescentar uma linha aqui.
 *
 * `arquivo` é o `.md` da pasta — o mesmo que o site vai buscar quando o conteúdo entrar.
 * Enquanto ele não entra, o campo é o que amarra a árvore ao material real: nada de nome
 * inventado para parecer completo.
 */

/** Os itens de dentro de um pilar. */
export const PILARES = [
  {
    id: 'geral',
    titulo: 'Geral',
    itens: [
      { id: 'visao', titulo: 'Visão geral', arquivo: 'README.md' },
      { id: 'como-usar', titulo: 'Como usar', arquivo: 'README.md' },
      { id: 'resumo', titulo: 'Resumo', arquivo: 'README.md' },
    ],
  },
  {
    id: 'area-principal',
    titulo: 'Área principal',
    itens: [
      { id: 'conversa', titulo: 'A conversa', arquivo: 'README.md' },
      { id: 'campo', titulo: 'O campo de escrita', arquivo: 'README.md' },
      { id: 'seletores', titulo: 'Seletores', arquivo: 'README.md' },
    ],
  },
  {
    id: 'prompts',
    titulo: 'Prompts',
    itens: [
      { id: 'pedir-bem', titulo: 'Como pedir bem', arquivo: 'README.md' },
      { id: 'folha', titulo: 'O botão da folha', arquivo: 'README.md' },
      { id: 'comandos', titulo: 'Comandos e menções', arquivo: 'README.md' },
    ],
  },
  {
    id: 'to-dos',
    titulo: 'To-dos',
    itens: [
      { id: 'plano', titulo: 'O plano de tarefas', arquivo: 'README.md' },
    ],
  },
  {
    id: 'modelos',
    titulo: 'Modelos',
    itens: [
      { id: 'catalogo', titulo: 'O catálogo', arquivo: 'README.md' },
      { id: 'esforco', titulo: 'Esforço de raciocínio', arquivo: 'README.md' },
      { id: 'visao', titulo: 'Visão', arquivo: 'README.md' },
    ],
  },
  {
    id: 'contexto',
    titulo: 'Contexto',
    itens: [
      { id: 'anel', titulo: 'O anel de contexto', arquivo: 'README.md' },
      { id: 'compactacao', titulo: 'Compactação', arquivo: 'README.md' },
    ],
  },
  {
    id: 'ferramentas',
    titulo: 'Ferramentas',
    itens: [
      { id: 'todas', titulo: 'Todas as ferramentas', arquivo: 'README.md' },
      { id: 'arquivos', titulo: 'Arquivos', arquivo: 'arquivos.md' },
      { id: 'execucao', titulo: 'Execução', arquivo: 'execucao.md' },
      { id: 'git-ferramentas', titulo: 'Git', arquivo: 'git-e-ferramentas.md' },
      { id: 'web-ferramentas', titulo: 'Web', arquivo: 'web-e-ferramentas.md' },
      { id: 'plano-ferramentas', titulo: 'Plano', arquivo: 'plano-e-ferramentas.md' },
      { id: 'skills-ferramentas', titulo: 'Skills', arquivo: 'skills-e-ferramentas.md' },
      { id: 'subagentes-ferramentas', titulo: 'Sub-agentes', arquivo: 'subagentes-e-ferramentas.md' },
    ],
  },
  {
    id: 'web',
    titulo: 'Web',
    itens: [
      { id: 'acesso', titulo: 'Acesso à internet', arquivo: 'README.md' },
    ],
  },
  {
    id: 'git',
    titulo: 'Git',
    itens: [
      { id: 'ciclo', titulo: 'O ciclo de trabalho', arquivo: 'README.md' },
    ],
  },
  {
    id: 'videos',
    titulo: 'Vídeos',
    itens: [
      { id: 'assistir', titulo: 'O Koda assiste e ouve', arquivo: 'README.md' },
      { id: 'editor', titulo: 'O editor de vídeo', arquivo: 'README.md' },
    ],
  },
  {
    id: 'mcp',
    titulo: 'MCP',
    itens: [
      { id: 'oque-e', titulo: 'O que é', arquivo: 'README.md' },
      { id: 'servidores', titulo: 'Os servidores', arquivo: 'README.md' },
      { id: 'cadastrar', titulo: 'Cadastrar um servidor', arquivo: 'README.md' },
    ],
  },
  {
    id: 'skills',
    titulo: 'Skills',
    itens: [
      { id: 'origens', titulo: 'As três origens', arquivo: 'README.md' },
      { id: 'criar', titulo: 'Criar a sua', arquivo: 'README.md' },
    ],
  },
  {
    id: 'subagentes',
    titulo: 'Sub-agentes',
    itens: [
      { id: 'usar', titulo: 'Como usar', arquivo: 'README.md' },
      { id: 'criar-agente', titulo: 'Criar um sub-agente', arquivo: 'README.md' },
    ],
  },
  {
    id: 'barra-lateral',
    titulo: 'Barra lateral',
    itens: [
      { id: 'painel-dev', titulo: 'Painel Dev', arquivo: 'README.md' },
      { id: 'codigo', titulo: 'Código', arquivo: 'README.md' },
      { id: 'subs', titulo: 'Subs', arquivo: 'README.md' },
      { id: 'logs', titulo: 'Logs', arquivo: 'README.md' },
    ],
  },
  {
    id: 'projetos',
    titulo: 'Projetos',
    itens: [
      { id: 'pasta', titulo: 'A pasta de trabalho', arquivo: 'README.md' },
      { id: 'agents', titulo: 'O AGENTS.md', arquivo: 'README.md' },
    ],
  },
  {
    id: 'permissoes',
    titulo: 'Permissões',
    itens: [
      { id: 'modos', titulo: 'Os quatro modos', arquivo: 'README.md' },
      { id: 'cartao', titulo: 'O cartão de permissão', arquivo: 'README.md' },
    ],
  },
  {
    id: 'anexos',
    titulo: 'Anexos',
    itens: [
      { id: 'aceitos', titulo: 'O que é aceito', arquivo: 'README.md' },
      { id: 'tetos', titulo: 'Tetos', arquivo: 'README.md' },
    ],
  },
  {
    id: 'conta',
    titulo: 'Conta',
    itens: [
      { id: 'entrar', titulo: 'Entrar e criar conta', arquivo: 'README.md' },
      { id: 'loja', titulo: 'A loja', arquivo: 'README.md' },
      { id: 'consumo', titulo: 'Consumo', arquivo: 'README.md' },
    ],
  },
  {
    id: 'atalhos',
    titulo: 'Atalhos',
    itens: [
      { id: 'teclado', titulo: 'Teclado', arquivo: 'README.md' },
      { id: 'barra', titulo: 'Comandos com /', arquivo: 'README.md' },
      { id: 'arroba', titulo: 'Menções com @', arquivo: 'README.md' },
    ],
  },
  {
    id: 'diagnostico',
    titulo: 'Diagnóstico',
    itens: [
      { id: 'sintomas', titulo: 'Por sintoma', arquivo: 'README.md' },
      { id: 'checklist', titulo: 'Checklist rápido', arquivo: 'README.md' },
    ],
  },
  {
    id: 'atualizacao',
    titulo: 'Atualização',
    itens: [
      { id: 'canais', titulo: 'Canais e avisos', arquivo: 'README.md' },
    ],
  },
]
