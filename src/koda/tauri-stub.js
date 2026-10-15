/**
 * Os pedaços da API do Tauri que os componentes copiados importam.
 *
 * O `PainelLateral` do app usa o Tauri para embutir o navegador do Painel Dev como
 * **webview filho** — uma janela nativa por cima do HTML. Isso só existe dentro do app
 * desktop.
 *
 * No site não existe Tauri, e não precisa: o próprio componente já tem o caminho de
 * navegador (`DENTRO_DO_TAURI ? <NavegadorDoPainel/> : <iframe/>`). Aqui a constante diz
 * «não estamos no Tauri» e o resto são funções vazias — o componente cai no `iframe` e o
 * resto da barra (abas, árvore, diff, logs) funciona igual.
 *
 * Este arquivo substitui `@tauri-apps/api/*` no build, pelo `resolve.alias` do
 * `vite.config.js`.
 */

/** Fora do app desktop: o site roda no navegador comum. */
export const DENTRO_DO_TAURI = false

/** O Tauri converte caminho de disco em URL carregável; aqui não há o que converter. */
export function convertFileSrc(caminho) {
  return caminho
}

export function getCurrentWindow() {
  return {
    onMoved: async () => () => {},
    onResized: async () => () => {},
  }
}

export class LogicalPosition {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

export class LogicalSize {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
}

export class Webview {
  constructor() {
    this.once = async () => () => {}
  }
}

export default { DENTRO_DO_TAURI, convertFileSrc, getCurrentWindow }
