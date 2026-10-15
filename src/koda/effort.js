// Copiado de koda/src/effort.ts — ver scripts/copiar-koda.mjs
const EFFORT_PADRAO = "auto";
const NIVEIS = [
  { value: "auto", label: "Autom\xE1tico", hint: "Quem decide \xE9 o Reasoning" },
  { value: "minimal", label: "M\xEDnimo", hint: "Responde r\xE1pido, pensa pouco" },
  { value: "low", label: "Baixo", hint: "Pensa um pouco mais antes de responder" },
  { value: "medium", label: "M\xE9dio", hint: "Equil\xEDbrio entre tempo e profundidade" },
  { value: "high", label: "Alto", hint: "Pensa mais \u2014 a resposta demora mais" },
  { value: "xhigh", label: "Muito alto", hint: "Pensa muito \u2014 a resposta demora bem mais" },
  { value: "max", label: "M\xE1ximo", hint: "O m\xE1ximo que o modelo permite" }
];
const EFFORT_MENU = NIVEIS.map(({ value, label, hint }) => ({
  value,
  label,
  hint
}));
function effortLabel(value) {
  return NIVEIS.find((nivel) => nivel.value === value)?.label ?? "Autom\xE1tico";
}
function effortDoModelo(mapa, modelo) {
  return mapa[modelo] ?? EFFORT_PADRAO;
}
export {
  EFFORT_MENU,
  EFFORT_PADRAO,
  effortDoModelo,
  effortLabel
};
