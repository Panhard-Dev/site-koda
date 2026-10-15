// Copiado de koda/src/tools.ts — ver scripts/copiar-koda.mjs
const ROTULOS = {
  code_interpreter: "Rodar Python",
  shell: "Rodar comando",
  terminal: "Rodar comando",
  read_file: "Ler arquivo",
  write_file: "Escrever arquivo",
  edit_file: "Editar arquivo",
  str_replace_editor: "Editar arquivo",
  list_dir: "Listar pasta",
  delete_file: "Apagar arquivo",
  create_directory: "Criar pasta",
  delete_directory: "Apagar pasta",
  move_file: "Mover arquivo",
  copy_file: "Copiar arquivo",
  rename_file: "Renomear arquivo",
  get_environment: "Ver ambiente",
  update_todos: "Registrar plano",
  search_files: "Procurar arquivo",
  apply_patch: "Aplicar patch",
  search_codebase: "Buscar no c\xF3digo",
  vector_search: "Buscar no c\xF3digo",
  grep: "Buscar com regex",
  regex_search: "Buscar com regex",
  get_problems: "Conferir arquivo",
  linter: "Conferir arquivo",
  web_search: "Buscar na web",
  url_reader: "Abrir p\xE1gina",
  browser: "Abrir p\xE1gina",
  git_status: "Status do git",
  git_diff: "Diff do git",
  git_log: "Hist\xF3rico do git",
  git_commit: "Commit no git",
  git_push: "Enviar para o git",
  git_pull: "Baixar do git",
  install_package: "Instalar depend\xEAncia",
  uninstall_package: "Remover depend\xEAncia",
  download_file: "Baixar arquivo",
  upload_file: "Enviar arquivo",
  use_skill: "Usar skill"
};
const APELIDOS = {
  run_command: "shell",
  execute_command: "shell",
  run_code: "code_interpreter",
  list_directory: "list_dir",
  listdir: "list_dir",
  ls: "list_dir",
  mkdir: "create_directory",
  rmdir: "delete_directory",
  search_code: "search_codebase",
  glob: "search_files",
  find_files: "search_files",
  open_url: "url_reader",
  fetch_url: "url_reader",
  read_url: "url_reader",
  create_file: "write_file",
  update_plan: "update_todos",
  plan: "update_todos",
  todos: "update_todos",
  todo_write: "update_todos",
  set_todos: "update_todos",
  apply_diff: "apply_patch",
  patch: "apply_patch",
  install: "install_package",
  uninstall: "uninstall_package",
  status: "git_status",
  commit: "git_commit",
  push: "git_push",
  pull: "git_pull",
  download: "download_file",
  upload: "upload_file"
};
const ferramentaCanonica = (nome) => APELIDOS[nome] ?? nome;
const rotuloFerramenta = (nome) => ROTULOS[ferramentaCanonica(nome)] ?? nome;
const eFerramentaMcp = (nome) => nome.startsWith("mcp__");
const ferramentaDoNomeMcp = (nome) => nome.replace(/^mcp__/, "").split("__").slice(1).join("__") || nome;
const rotuloDoPasso = (passo) => {
  if (passo.mcp) return passo.mcp.ferramenta;
  if (eFerramentaMcp(passo.name)) return ferramentaDoNomeMcp(passo.name);
  return rotuloFerramenta(passo.name);
};
const recursoDoPasso = (passo) => {
  if (passo.mcp) {
    const args = resumoArgumentos(passo.arguments);
    return args ? `MCP ${passo.mcp.servidor} \xB7 ${args}` : `MCP ${passo.mcp.servidor}`;
  }
  if (ferramentaCanonica(passo.name) === "use_skill") {
    const nome = String(passo.arguments?.nome ?? "").trim();
    return nome ? `skill ${nome}` : "skill";
  }
  return resumoArgumentos(passo.arguments);
};
const CHAVES_DE_CONTEUDO = /* @__PURE__ */ new Set(["conteudo", "old_string", "new_string", "diff"]);
const caminhosDoDiff = (diff) => diff.split("\n").filter((linha) => linha.startsWith("+++ ")).map((linha) => linha.slice(4).trim().replace(/^[ab]\//, "")).filter((caminho) => caminho && caminho !== "/dev/null");
const resumoArgumentos = (argumentos, limite = 96) => {
  if (argumentos.continuar) return `acompanhando o comando ${argumentos.continuar}`;
  if (argumentos.parar) return `parando o comando ${argumentos.parar}`;
  let entradas = Object.entries(argumentos).filter(
    ([chave]) => !CHAVES_DE_CONTEUDO.has(chave)
  );
  if (entradas.length === 0 && typeof argumentos.diff === "string") {
    const caminhos = caminhosDoDiff(argumentos.diff);
    entradas = caminhos.length ? [["arquivos", caminhos.join(", ")]] : [];
  }
  const partes = entradas.map(([chave, valor]) => {
    const texto = typeof valor === "string" ? valor : JSON.stringify(valor);
    const curto = (texto ?? "").replace(/\s+/g, " ").slice(0, 44);
    return `${chave}: ${curto}${(texto ?? "").length > 44 ? "\u2026" : ""}`;
  });
  const resumo = partes.join(" \xB7 ");
  return resumo.length > limite ? `${resumo.slice(0, limite)}\u2026` : resumo;
};
export {
  caminhosDoDiff,
  eFerramentaMcp,
  ferramentaCanonica,
  ferramentaDoNomeMcp,
  recursoDoPasso,
  resumoArgumentos,
  rotuloDoPasso,
  rotuloFerramenta
};
