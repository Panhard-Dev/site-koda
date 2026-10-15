// Copiado de koda/src/components/WindowControls.tsx — ver scripts/copiar-koda.mjs
import { useEffect } from "react";
import { Minus, Square, X } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
const DENTRO_DO_TAURI = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
const BOTAO_CLASSE = [
  "flex h-8 w-10 items-center justify-center rounded-lg",
  "text-koda-fg/55 transition-colors duration-150 focus-visible:outline-none"
].join(" ");
function useAtalhosDaJanela() {
  useEffect(() => {
    if (!DENTRO_DO_TAURI) return;
    const aoTeclar = (evento) => {
      if (evento.key !== "F11") return;
      evento.preventDefault();
      const janela = getCurrentWindow();
      void janela.isFullscreen().then((cheia) => janela.setFullscreen(!cheia));
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, []);
}
function WindowControls() {
  if (!DENTRO_DO_TAURI) return null;
  const janela = getCurrentWindow();
  return <div className="flex items-center gap-0.5">
      <button
    type="button"
    title="Minimizar"
    aria-label="Minimizar"
    onClick={() => void janela.minimize()}
    className={`${BOTAO_CLASSE} hover:bg-koda-fg/10 hover:text-koda-fg`}
  >
        <Minus className="h-4 w-4" strokeWidth={1.8} />
      </button>
      <button
    type="button"
    title="Maximizar ou restaurar"
    aria-label="Maximizar ou restaurar"
    onClick={() => void janela.toggleMaximize()}
    className={`${BOTAO_CLASSE} hover:bg-koda-fg/10 hover:text-koda-fg`}
  >
        <Square className="h-[11px] w-[11px]" strokeWidth={2} />
      </button>
      <button
    type="button"
    title="Fechar"
    aria-label="Fechar"
    onClick={() => void janela.close()}
    className={`${BOTAO_CLASSE} hover:bg-red-500/85 hover:text-white`}
  >
        <X className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </div>;
}
var stdin_default = WindowControls;
export {
  DENTRO_DO_TAURI,
  WindowControls,
  stdin_default as default,
  useAtalhosDaJanela
};
