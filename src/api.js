import { API, CANAL } from './config'

/** GET /api/public/version → { latest_version, download_url, publicado_em, … } */
export async function buscarVersao() {
  const url = `${API}/api/public/version?versao=0.0.0&canal=${CANAL}`
  const resposta = await fetch(url, { headers: { accept: 'application/json' } })
  if (!resposta.ok) throw new Error(`versao: HTTP ${resposta.status}`)
  return await resposta.json()
}
