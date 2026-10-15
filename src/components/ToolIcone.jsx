/**
 * Os desenhos das ferramentas e o arco que gira — copiados de
 * `koda/src/components/ToolIcon.tsx` (24×24, `currentColor`, traço 1.7).
 *
 * Só entraram os que a demonstração usa. O resto do catálogo do app continua lá.
 */
const GLIFOS = {
  terminal: (
    <>
      <rect x="2.8" y="4.2" width="18.4" height="15.6" rx="3" />
      <path d="M2.8 9h18.4" />
      <path d="M6.4 6.6h.01M9 6.6h.01" />
      <path d="M7 12.6l2.4 2.4L7 17.4" />
      <path d="M12.6 17.4h4.4" />
    </>
  ),
  arquivo: (
    <>
      <path d="M6.2 3.6h7.2l4.4 4.4v12.4H6.2z" />
      <path d="M13.2 3.6v4.6h4.6" />
      <path d="M9.2 13.4h5.6M9.2 16.8h3.6" />
    </>
  ),
  arquivoNovo: (
    <>
      <path d="M6.2 3.6h7.2l4.4 4.4v12.4H6.2z" />
      <path d="M13.2 3.6v4.6h4.6" />
      <path d="M12 12.6v5.4M9.3 15.3h5.4" />
    </>
  ),
  lapis: (
    <>
      <path d="M4.6 19.4l1-3.6L15.9 5.5a2.1 2.1 0 013 3L8.6 18.8z" />
      <path d="M14.4 7l2.8 2.8" />
    </>
  ),
  pasta: (
    <path d="M3.4 7.2a2.2 2.2 0 012.2-2.2h3.1l2 2.4h7.7a2.2 2.2 0 012.2 2.2v7.6a2.2 2.2 0 01-2.2 2.2H5.6a2.2 2.2 0 01-2.2-2.2z" />
  ),
  lupa: (
    <>
      <circle cx="10.6" cy="10.6" r="6.4" />
      <path d="M15.4 15.4l4.2 4.2" />
    </>
  ),
  globo: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.6c2.3 2.3 3.5 5.2 3.5 8.4S14.3 18.1 12 20.4C9.7 18.1 8.5 15.2 8.5 12S9.7 5.9 12 3.6z" />
    </>
  ),
  plano: (
    <>
      <path d="M4.6 6.4l1.5 1.5 2.6-2.8" />
      <path d="M4.6 12.6l1.5 1.5 2.6-2.8" />
      <path d="M4.6 18.8l1.5 1.5 2.6-2.8" />
      <path d="M11.6 6.9h7.8M11.6 13.1h7.8M11.6 19.3h5.4" />
    </>
  ),
  retalho: (
    <>
      <rect x="4.4" y="4.4" width="15.2" height="15.2" rx="2.6" />
      <path d="M9.2 9.4h6M9.2 12.2h3.4M9.2 15h6M14.6 12.2h.6" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3.6l7 2.6v6c0 4.2-2.9 7.4-7 8.8-4.1-1.4-7-4.6-7-8.8v-6z" />
      <path d="M9.2 11.8l2.1 2.1 3.9-4" />
    </>
  ),
  check: <path d="M5 12.6l4.2 4.2L19 7.4" />,
}

/** Nome da ferramenta -> desenho. Espelha o `POR_NOME` do app, só com o que se usa aqui. */
const POR_NOME = {
  read_file: 'arquivo',
  write_file: 'arquivoNovo',
  edit_file: 'lapis',
  apply_patch: 'retalho',
  list_dir: 'pasta',
  shell: 'terminal',
  search_files: 'lupa',
  web_search: 'globo',
  update_todos: 'plano',
  get_problems: 'escudo',
}

export function ToolIcone({ nome, className = 'h-3.5 w-3.5' }) {
  const desenho = GLIFOS[POR_NOME[nome] ?? '']
  if (!desenho) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {desenho}
    </svg>
  )
}

/** O arco girando: ferramenta em execução. */
export function ToolSpinner({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.7" opacity="0.22" />
      <path
        d="M20.4 12a8.4 8.4 0 00-8.4-8.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        className="tool-spin"
      />
    </svg>
  )
}

export default ToolIcone
