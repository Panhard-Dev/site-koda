// Copiado de koda/src/components/FalaDoModelo.tsx — ver scripts/copiar-koda.mjs
import KodaLogo from "./KodaLogo";
import RichText from "./RichText";
function FalaDoModelo({ texto }) {
  return <div className="flex items-start gap-3">
      <KodaLogo className="mt-1.5 h-3.5 w-auto shrink-0 text-koda-fg/70" color="currentColor" />
      <RichText text={texto} className="max-w-[85%] text-[15px] text-koda-fg/85" />
    </div>;
}
export {
  FalaDoModelo as default
};
