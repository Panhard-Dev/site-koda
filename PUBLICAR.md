# Publicar o site

O site é uma **página estática**: HTML, CSS, JavaScript e duas imagens. Não tem servidor,
não tem banco, não tem Node rodando. Isso é o caso mais simples de hospedar que existe.

Tamanho: **~570 KB** (uns 180 KB comprimidos).

---

## O que subir

O conteúdo da pasta **`dist/`** — e nada mais.

```
dist/
├── .htaccess          ← as regras do Apache (cPanel)
├── index.html
├── app.png
├── coroa.png
└── assets/
    ├── index-xxxxxxxx.js
    └── index-xxxxxxxx.css
```

Se a sua hospedagem usa cPanel, a pasta pública costuma ser **`public_html/`**. O conteúdo
de `dist/` vai **dentro** dela:

```
public_html/
├── .htaccess
├── index.html
├── app.png
├── coroa.png
└── assets/
```

⚠️ **Suba o conteúdo, não a pasta.** `public_html/dist/index.html` faz o site ficar em
`seudominio.com/dist/` — e aí o endereço fica errado e o `.htaccess` não vale.

---

## Passo a passo

### 1. Gerar a pasta

```
npm run build
```

Isso faz três coisas, nesta ordem:

1. lê o manual e gera o texto da documentação;
2. **testa se toda tela renderiza** — o passo que pega prop trocada;
3. monta o `dist/`.

Se qualquer uma falhar, a pasta **não** é gerada. É de propósito: melhor não publicar do
que publicar quebrado.

### 2. Subir

**Pelo cPanel (Gerenciador de Arquivos):**

1. Abra o **Gerenciador de Arquivos** e entre em `public_html/`.
2. Se houver um `index.html` de exemplo, apague.
3. Entre na pasta `dist/` do seu computador, selecione **tudo** (inclusive o `.htaccess`)
   e compacte num `.zip`.
4. Suba o `.zip` no cPanel e use **Extract** ali mesmo.
5. Apague o `.zip`.

⚠️ **O `.htaccess` é um arquivo oculto.** O Windows e o cPanel escondem arquivos que
começam com ponto. No cPanel, ligue **Settings → Show Hidden Files**, senão você sobe o
site sem ele.

**Por FTP (FileZilla):**

1. Conecte com os dados da hospedagem.
2. Arraste o **conteúdo** de `dist/` para `public_html/`.

### 3. Conferir

Abra o seu domínio. Depois abra a documentação:

```
https://seudominio.com/#/documentacao
```

---

## O `.htaccess`

Ele já vai junto no `dist/` e faz quatro coisas:

| O quê | Por quê |
| --- | --- |
| **Tipo dos arquivos** | Sem isso, alguns servidores servem o `.js` como texto e o site fica **em branco** |
| **Compressão** | 570 KB viram 180 KB |
| **Cache** | Os arquivos de `assets/` têm código no nome, então podem ser guardados para sempre |
| **HTTPS** | Manda tudo para `https://` |

⚠️ **Se o seu domínio ainda não tem certificado SSL**, comente as linhas do bloco `HTTPS` —
senão o site entra em **laço de redirecionamento** e não abre. No cPanel, o certificado
grátis (Let's Encrypt) fica em **SSL/TLS Status**.

---

## Sobre o endereço

O site é uma página só, e a documentação usa `#`:

```
https://seudominio.com/                  → o site
https://seudominio.com/#/documentacao    → a documentação
```

💡 **O `#` é do navegador, não do servidor.** Isso significa que **qualquer hospedagem
serve** — inclusive as mais simples, que não deixam mexer em rotas. Não há nada para
configurar.

E é por isso que o `dist/` também abre por **duplo clique** no arquivo, sem servidor
nenhum. Útil para conferir antes de subir.

---

## ⚠️ Uma coisa que vai precisar de ajuste

O botão **"Baixar"** pega o link do instalador de um serviço do Koda (o Worker). Esse
serviço só aceita chamadas de **origens autorizadas** — hoje, o `localhost` e o app
instalado.

**Do seu domínio, ele vai recusar a chamada.** O que acontece:

- O site **abre normal**, com tudo funcionando.
- O botão "Baixar" cai no endereço alternativo (rola até os recursos, em vez de baixar).

**Para resolver**, é preciso acrescentar o seu domínio na variável `CORS_ORIGIN` do Worker,
no painel da Cloudflare:

```
CORS_ORIGIN = https://seudominio.com,https://www.seudominio.com
```

É uma lista separada por vírgula. Depois de salvar, a chamada passa e o botão volta a
buscar a versão publicada.

💡 **Isso não é urgente.** O site funciona sem. Só o link de download fica sem a versão
automática.

---

## O que **não** vai junto

A pasta `dist/` só tem o site. Estes ficam no seu computador:

| Pasta | O que é |
| --- | --- |
| `src/` | O código do site |
| `src/koda/` | Os componentes copiados do app |
| `src/docs/textos/` | O texto do manual, gerado |
| `scripts/` | Os geradores |
| `public/` | As imagens e o `.htaccess`, antes do build |

---

## Publicar de novo (quando o site mudar)

1. `npm run build`
2. Suba o conteúdo novo de `dist/`, **substituindo** o que estava lá.

Os arquivos de `assets/` têm um código no nome que muda a cada build, então o navegador de
quem já visitou baixa o novo sozinho — não precisa avisar ninguém para limpar o cache.

⚠️ **O `index.html` sempre vai junto.** É ele que aponta para os arquivos de nome novo.

---

## Se o site ficar em branco

Na ordem:

1. **O `.htaccess` subiu?** Ligue "Show Hidden Files" e confira.
2. **O conteúdo está na raiz?** Tem de ser `public_html/index.html`, e não
   `public_html/dist/index.html`.
3. **Abra o console do navegador** (F12 → Console). Erro de módulo costuma ser o tipo do
   arquivo errado — e é o `.htaccess` que corrige.
4. **A pasta `assets/` subiu inteira?** Sem ela não há nem CSS nem JavaScript.
