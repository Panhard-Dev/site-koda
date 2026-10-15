// Copiado de koda/src/models.tsx — ver scripts/copiar-koda.mjs
import KodaLogo from "./KodaLogo";
const MODEL_ICON = <KodaLogo className="h-3.5 w-auto" color="currentColor" />;
const model = (value, label) => ({
  value,
  label,
  icon: MODEL_ICON
});
function Aviso({ texto }) {
  return <span className="rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-amber-300 ring-1 ring-amber-500/20">
      {texto}
    </span>;
}
const MODEL_MENU = [
  {
    value: "categoria-liz",
    label: "Liz",
    icon: MODEL_ICON,
    options: [
      model("liz-4", "Liz 4"),
      model("liz-3-flash", "Liz 3 Flash"),
      model("liz-mini-2", "Liz Mini 2"),
      model("liz-mini-1-3", "Liz Mini 1.3"),
      model("liz-nano", "Liz Nano")
    ]
  },
  {
    value: "categoria-koda",
    label: "Koda",
    icon: MODEL_ICON,
    options: [model("koda-1", "Koda 1")]
  },
  {
    value: "categoria-layze",
    label: "Layze",
    icon: MODEL_ICON,
    options: [model("layze-2", "Layze 2")]
  },
  {
    value: "categoria-nable",
    label: "Nable",
    icon: MODEL_ICON,
    trailing: <Aviso texto="Tempo limitado" />,
    options: [model("nable-4-mini-preview", "Nable 4 Mini Preview")]
  }
];
const MODELO_PADRAO = "liz-4";
const ALL_MODELS = MODEL_MENU.flatMap((category) => category.options ?? []);
const MODEL_LABELS = Object.fromEntries(
  // `label` de um MenuOption aceita JSX; aqui os rótulos são todos strings fixas.
  ALL_MODELS.map((option) => [option.value, option.label])
);
const GRUPOS = [
  { chave: "liz", label: "Liz" },
  { chave: "koda", label: "Koda" },
  { chave: "layze", label: "Layze" },
  { chave: "nable", label: "Nable", aviso: "Tempo limitado" }
];
function modelMenu(items = [], bloqueados = []) {
  const liberado = (value) => !bloqueados.includes(value);
  if (items.length === 0) {
    if (bloqueados.length === 0) return MODEL_MENU;
    return MODEL_MENU.map((categoria) => ({
      ...categoria,
      options: (categoria.options ?? []).filter((opcao2) => liberado(opcao2.value))
    })).filter((categoria) => (categoria.options ?? []).length > 0);
  }
  const opcao = (item) => ({
    value: item.value,
    label: item.label,
    hint: item.hint ?? void 0,
    icon: MODEL_ICON
  });
  const visiveis = items.filter((item) => liberado(item.value));
  const grupos = [];
  const usados = /* @__PURE__ */ new Set();
  for (const grupo of GRUPOS) {
    const meus = visiveis.filter((item) => item.value.startsWith(`${grupo.chave}-`));
    if (meus.length === 0) continue;
    meus.forEach((item) => usados.add(item.value));
    grupos.push({
      value: `categoria-${grupo.chave}`,
      label: grupo.label,
      icon: MODEL_ICON,
      trailing: grupo.aviso ? <Aviso texto={grupo.aviso} /> : void 0,
      options: meus.map(opcao)
    });
  }
  const outros = visiveis.filter((item) => !usados.has(item.value));
  if (outros.length > 0) {
    grupos.push({
      value: "categoria-outros",
      label: "Outros",
      icon: MODEL_ICON,
      options: outros.map(opcao)
    });
  }
  return grupos;
}
function findModel(value, items = []) {
  const remoto = items.find((item) => item.value === value);
  if (remoto) return { value: remoto.value, label: remoto.label, icon: MODEL_ICON };
  return ALL_MODELS.find((item) => item.value === value) ?? { value, label: value, icon: MODEL_ICON };
}
export {
  ALL_MODELS,
  MODELO_PADRAO,
  MODEL_LABELS,
  MODEL_MENU,
  findModel,
  modelMenu
};
