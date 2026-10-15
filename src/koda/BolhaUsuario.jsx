// Copiado de koda/src/components/BolhaUsuario.tsx — ver scripts/copiar-koda.mjs
function BolhaUsuario({
  texto,
  anexos = []
}) {
  return <div className="max-w-[80%] min-w-0 rounded-2xl rounded-tr-md bg-koda-input px-4 py-2.5 text-[15px] leading-6 break-words whitespace-pre-wrap text-koda-fg/90 ring-1 ring-koda-fg/5">
      {texto}
      {anexos.length > 0 ? <ul className="mt-2 flex flex-wrap gap-1.5">
          {anexos.map((anexo, indice) => <li
    key={`${anexo.nome}-${indice}`}
    className="max-w-full rounded-md bg-koda-fg/8 px-2 py-0.5 text-[12px] break-words text-koda-fg/70"
  >
              {anexo.nome}
            </li>)}
        </ul> : null}
    </div>;
}
export {
  BolhaUsuario as default
};
