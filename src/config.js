/**
 * Onde mora o Koda Cloud (o Worker do painel). É daqui que a página tira o link do
 * instalador — nada escrito na mão:
 *
 *   GET /api/public/version?versao=… → última versão publicada + link do instalador
 *
 * ⚠️ Para o navegador aceitar esta chamada, a origem do site precisa estar no
 * `CORS_ORIGIN` do Worker (o loopback, `localhost`/`127.0.0.1` em qualquer porta,
 * já é aceito — é por isso que `npm run dev` funciona sem mexer em nada).
 */
export const API = 'https://koda-cloud-api.studiosluxgames.workers.dev'

/** Canal de release: 'stable' ou 'beta'. */
export const CANAL = 'stable'

/**
 * Para onde vai o botão "Baixar" quando a consulta de versão não responde (site
 * aberto por `file://`, sem internet, ou CORS barrado). Vazio = rola até os recursos,
 * que é a âncora que sempre existe na página.
 */
export const DOWNLOAD_FALLBACK = ''
