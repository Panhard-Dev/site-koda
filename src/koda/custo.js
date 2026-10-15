// Copiado de koda/src/custo.ts — ver scripts/copiar-koda.mjs
const MOEDAS_POR_MILHAO = {
  "liz-nano": 3,
  "liz-mini-1-3": 4,
  "liz-mini-2": 5,
  "liz-3-flash": 7,
  "liz-4": 10.5,
  "koda-1": 12,
  "layze-2": 14,
  "nable-4-mini-preview": 20
};
const PRECO_PADRAO = 14;
function precoDoModelo(modelo) {
  return MOEDAS_POR_MILHAO[modelo] ?? PRECO_PADRAO;
}
const TOKENS_POR_CONVERSA = 1e5;
const MODELO_DE_REFERENCIA = "liz-4";
function moedasDeTokens(tokens, modelo) {
  return tokens / 1e6 * precoDoModelo(modelo);
}
function moedasDeTokensPorModelo(tokensPorModelo) {
  let total = 0;
  for (const [modelo, tokens] of Object.entries(tokensPorModelo)) {
    total += moedasDeTokens(tokens, modelo);
  }
  return total;
}
function conversasCom(moedas) {
  const porConversa = TOKENS_POR_CONVERSA / 1e6 * precoDoModelo(MODELO_DE_REFERENCIA);
  return Math.floor(moedas / porConversa);
}
function moedasLegiveis(moedas) {
  return Number.isInteger(moedas) ? `${moedas}` : moedas.toFixed(1).replace(".", ",");
}
export {
  MODELO_DE_REFERENCIA,
  MOEDAS_POR_MILHAO,
  TOKENS_POR_CONVERSA,
  conversasCom,
  moedasDeTokens,
  moedasDeTokensPorModelo,
  moedasLegiveis,
  precoDoModelo
};
