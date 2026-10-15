# Site do Koda

A página do produto e a documentação do Koda.

---

## O que tem aqui

| Endereço | O que é |
| --- | --- |
| `/` | A página do produto: o que o Koda faz, a conversa rodando ao vivo e os recursos |
| `/#/documentacao` | O manual completo, em 22 seções |

---

## Rodar na sua máquina

```bash
npm install
npm run dev
```

Abre em `http://127.0.0.1:5180`.

---

## Os comandos

```bash
npm run dev      # servidor de desenvolvimento, com recarga automática
npm run build    # confere as telas e monta o `dist/`
npm run preview  # serve o `dist/` pronto
```

E as duas ferramentas de quem **edita** o conteúdo:

```bash
npm run docs     # regera o texto do site a partir do manual
npm run koda     # recopia os componentes do app do Koda
npm run telas    # confere se toda tela renderiza
```

---

## Como o site é montado

### 1. Os componentes vêm do app

As telas da documentação **não são prints nem desenhos**: são os componentes do próprio
Koda, copiados do app.

```
koda/src/components/ToDos.tsx  →  src/koda/ToDos.jsx
```

O script `npm run koda` copia e tira os tipos do TypeScript (com o esbuild). O que se
ganha: a documentação mostra o cartão de tarefas **de verdade** — se o app mudar o cartão,
rodar o script traz a mudança.

Os arquivos de `src/koda/` são gerados. Não edite à mão.

### 2. O texto vem do manual

O manual é escrito à parte, em markdown. O script `npm run docs` recorta cada seção e
publica no site — cada item da documentação mostra **a sua** seção, e não o documento
inteiro.

Os arquivos de `src/docs/textos/` são gerados. Não edite à mão.

> ⚠️ Os dois scripts precisam das pastas de origem, que **não** estão neste repositório:
>
> ```bash
> KODA_APP="C:\caminho\koda\src" npm run koda
> KODA_MANUAL="C:\caminho\documentaçaokodaa" npm run docs
> ```
>
> O resultado dos dois está versionado. Quem só quer buildar o site não precisa deles.

### 3. O build confere antes de montar

```bash
npm run build
```

Antes de gerar o `dist/`, ele **renderiza cada tela** e falha se alguma quebrar.

Isso existe por um defeito real: uma prop com o nome errado compila sem reclamar e só
quebra na hora de desenhar — a tela ficava preta e o `vite build` não acusava nada.

---

## Publicar

O `dist/` é **estático**: HTML, CSS, JavaScript e duas imagens. Não tem servidor, banco,
nem Node rodando. Isso significa que ele abre em qualquer hospedagem — e também por
**duplo clique** no arquivo, sem servidor nenhum.

```bash
npm run build
```

O conteúdo de `dist/` sobe para a pasta pública da hospedagem. No cPanel costuma ser
`public_html/` — e vai o **conteúdo**, não a pasta: tem de ficar `public_html/index.html`,
e não `public_html/dist/index.html`.

O `.htaccess` que vai junto serve para Apache/cPanel: tipo dos arquivos (sem ele alguns
servidores servem o `.js` como texto e o site fica **em branco**), compressão, cache e
HTTPS.

💡 **A documentação usa `#` no endereço** (`/#/documentacao`). O `#` é do navegador, não
chega ao servidor — então não há rota para configurar, e qualquer hospedagem serve.

---

## Estrutura

```
src/
├── App.jsx              a página e o roteamento por `#`
├── pages/
│   └── Documentacao.jsx a documentação: o sumário e o texto
├── docs/
│   ├── sumario.js       os 22 pilares e os seus itens
│   ├── Markdown.jsx     o renderizador do texto
│   ├── mapaTelas.jsx    qual tela aparece em qual documento
│   ├── Telas.jsx        as peças das telas
│   ├── telas/           as telas, documento por documento
│   └── textos/          o texto do manual  (gerado)
├── koda/                os componentes do app  (gerado)
└── components/          a interface do site

scripts/
├── gerar-docs.mjs       manual → texto do site
├── copiar-koda.mjs      app → componentes
└── testar-render.mjs    confere se toda tela renderiza
```

---

## Uma nota sobre o botão "Baixar"

O botão busca o link do instalador num serviço do Koda, que só aceita chamadas de origens
autorizadas. Do GitHub Pages a chamada é recusada, e o botão cai no endereço alternativo.

**O site funciona todo** — só o link de download fica sem a versão automática. Para
resolver, o domínio precisa entrar no `CORS_ORIGIN` do serviço.

---

## Licença

Projeto proprietário. Todos os direitos reservados — veja [LICENSE](LICENSE).
