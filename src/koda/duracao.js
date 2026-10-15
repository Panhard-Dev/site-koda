// Copiado de koda/src/duracao.ts — ver scripts/copiar-koda.mjs
function numeroCurto(valor) {
  const casas = valor < 10 ? 1 : 0;
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}
function formatarDuracao(ms) {
  if (!Number.isFinite(ms) || ms < 0) return "0 ms";
  if (ms < 1e3) return `${Math.round(ms)} ms`;
  const segundos = ms / 1e3;
  if (segundos < 60) return `${numeroCurto(segundos)} s`;
  const minutos = segundos / 60;
  if (minutos < 60) return `${numeroCurto(minutos)} min`;
  const horas = minutos / 60;
  if (horas < 24) return `${numeroCurto(horas)} h`;
  return `${numeroCurto(horas / 24)} d`;
}
function formatarCaracteres(total) {
  if (!Number.isFinite(total) || total < 0) return "0 caracteres";
  if (total < 1e3) return `${Math.round(total)} caracteres`;
  if (total < 1e6) return `${numeroCurto(total / 1e3)} mil caracteres`;
  return `${numeroCurto(total / 1e6)} mi caracteres`;
}
export {
  formatarCaracteres,
  formatarDuracao
};
