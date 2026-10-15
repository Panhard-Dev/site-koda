import { useEffect, useState } from 'react'
import { buscarVersao } from './api'
import { DOWNLOAD_FALLBACK } from './config'
import Coroa from './components/Coroa'
import DemoAgente from './components/DemoAgente'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Icone from './components/Icone'
import Nav from './components/Nav'
import Recursos from './components/Recursos'
import Documentacao from './pages/Documentacao'

/**
 * A página do site — **três blocos**.
 *
 * O herói diz o que é e leva ao download. A demonstração mostra funcionando. Os recursos
 * dizem o que ele faz.
 *
 * Sem planos e sem preço: quem instala decide isso dentro do app, com a conta na mão. Cada
 * bloco a mais aqui é leitura que ninguém pediu.
 */

/**
 * A rota, lida do `#` do endereço.
 *
 * Hash e não caminho (`/documentacao`) de propósito: o `dist/` é feito para abrir por duplo
 * clique (`file://`), e ali um caminho de verdade não existe — o navegador procuraria um
 * arquivo que não está lá. O `#` funciona nos dois casos: no site publicado e no arquivo
 * aberto na mão.
 */
function rotaAtual() {
  return window.location.hash.replace(/^#\/?/, '')
}

export default function App() {
  const [tema, setTema] = useState(() => localStorage.getItem('koda-site-tema') ?? 'dark')
  const [versao, setVersao] = useState(null)
  const [rota, setRota] = useState(rotaAtual)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    localStorage.setItem('koda-site-tema', tema)
  }, [tema])

  // Trocar de página pelo `#` não recarrega nada: quem manda é este ouvinte.
  useEffect(() => {
    const aoTrocar = () => {
      setRota(rotaAtual())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', aoTrocar)
    return () => window.removeEventListener('hashchange', aoTrocar)
  }, [])

  // O instalador vem do servidor — a página não guarda endereço escrito à mão.
  useEffect(() => {
    buscarVersao()
      .then(setVersao)
      .catch(() => setVersao(null))
  }, [])

  // Blocos entram quando aparecem na rolagem.
  useEffect(() => {
    const alvos = document.querySelectorAll('.revelar, .revelar-cascata')
    if (!('IntersectionObserver' in window)) {
      alvos.forEach((a) => a.classList.add('visivel'))
      return
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel')
            observador.unobserve(entrada.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    alvos.forEach((a) => observador.observe(a))
    return () => observador.disconnect()
  }, [rota])

  const baixar = versao?.download_url || DOWNLOAD_FALLBACK || '#recursos'

  if (rota === 'documentacao') return <Documentacao />

  return (
    <>
      <Nav tema={tema} alternarTema={() => setTema((t) => (t === 'dark' ? 'light' : 'dark'))} baixar={baixar} />

      <main className="relative z-10">
        <Hero baixar={baixar} versao={versao} />

        <section id="trabalhando" className="relative py-16">
          <div className="mx-auto w-full max-w-4xl px-6">
            <div className="revelar mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Veja o Koda trabalhando
              </h2>
              <p className="mt-4 text-base leading-relaxed text-koda-fg/60">
                Ele não devolve um bloco de código para você colar. Ele abre o arquivo, procura,
                edita, roda o build — e mostra cada passo enquanto acontece.
              </p>
            </div>
            <div className="revelar mt-10">
              <DemoAgente />
            </div>
          </div>
        </section>

        <Recursos />
      </main>

      <Footer baixar={baixar} />
    </>
  )
}
