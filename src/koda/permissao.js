// Copiado de koda/src/permissao.ts — ver scripts/copiar-koda.mjs
const MODOS_PERMISSAO = [
  {
    id: "manual",
    label: "Perguntar sempre",
    hint: "Pede antes de rodar comando, escrever, apagar ou sair da pasta",
    curto: "Manual"
  },
  {
    id: "default",
    label: "Padr\xE3o",
    hint: "Trabalha no projeto e pede aprova\xE7\xE3o para comandos e a\xE7\xF5es importantes",
    curto: "Padr\xE3o"
  },
  {
    id: "auto",
    label: "Auto",
    hint: "Executa sem pedir aprova\xE7\xE3o; o shell usa as permiss\xF5es da sua conta e os arquivos ficam no projeto por padr\xE3o",
    curto: "Autom\xE1tico"
  },
  {
    id: "livre",
    label: "Livre \u2014 arquivos no computador inteiro",
    hint: "Sem aprova\xE7\xF5es; escolha se confia ao Koda acesso a arquivos fora do projeto",
    curto: "Livre"
  }
];
const modoDe = (id) => MODOS_PERMISSAO.find((item) => item.id === id) ?? MODOS_PERMISSAO[1];
export {
  MODOS_PERMISSAO,
  modoDe
};
