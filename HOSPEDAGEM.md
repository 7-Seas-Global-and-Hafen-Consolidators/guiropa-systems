# Hospedagem no GitHub Pages

Site estático (React + Vite). O deploy é automático ao enviar código para a branch `main`.

## URL do site

Após o deploy:

**https://7-Seas-Global-and-Hafen-Consolidators.github.io/guiropa-systems/**

Páginas internas (ex.: `/sobre`, `/contato`) funcionam com atualização direta do link graças ao `404.html` gerado no build.

---

## Configuração única no GitHub (só na primeira vez)

1. Abra o repositório:  
   `https://github.com/7-Seas-Global-and-Hafen-Consolidators/guiropa-systems`

2. Vá em **Settings** → **Pages**

3. Em **Build and deployment** → **Source**, escolha:  
   **GitHub Actions**

4. Salve. Pronto — não precisa escolher pasta `docs` nem branch manualmente.

---

## Publicar alterações

No computador, na pasta do projeto:

```powershell
git add .
git commit -m "Sua mensagem descrevendo a alteração"
git push origin main
```

Em cerca de 1–3 minutos:

1. Aba **Actions** do repositório → workflow **Deploy to GitHub Pages** deve ficar verde
2. O site atualiza na URL acima

Deploy manual (opcional): **Actions** → **Deploy to GitHub Pages** → **Run workflow**

---

## Desenvolvimento local

Requisito: **Node.js 20+** (recomendado: 22, ver `.node-version`).

```powershell
# 1. Instalar dependências (primeira vez)
npm run install:all

# 2. Terminal A — site (Vite)
npm run dev:client
# → http://localhost:5173

# 3. Terminal B — API local (opcional, só para testes de backend)
npm run dev:server
# → http://localhost:3001
```

Simular produção localmente (com o mesmo caminho `/guiropa-systems/`):

```powershell
npm run build
npm run preview
# → http://localhost:4173/guiropa-systems/
```

---

## Estrutura do projeto

```
guiropa-systems/
├── client/                 # Site React (o que vai para o GitHub Pages)
│   ├── public/             # Imagens, PDF, assets estáticos
│   │   ├── assets/         # logo, mapas, texturas
│   │   └── docs/           # manual PDF
│   ├── src/                # componentes, páginas, estilos, i18n
│   └── scripts/            # pós-build (404.html para SPA)
├── server/                 # API Express (opcional; não roda no GitHub Pages)
├── .github/workflows/
│   └── deploy.yml          # pipeline de deploy automático
├── package.json            # scripts da raiz
└── HOSPEDAGEM.md           # este guia
```

| Pasta / arquivo | Função |
|-----------------|--------|
| `client/public/` | Arquivos copiados intactos para o build (logos, PDF, mapas) |
| `client/vite.config.js` | `base: '/guiropa-systems/'` em produção (nome do repositório) |
| `client/dist/` | Saída do build (gerada localmente; **não** vai para o Git) |
| `server/` | Backend local; formulários no site usam WhatsApp/e-mail, não dependem dele online |

---

## Assets importantes

Coloque ou atualize arquivos em `client/public/`:

| Arquivo | Uso |
|---------|-----|
| `assets/guiropa-logo.png` | Logo e favicon |
| `assets/earth-night.jpg` | Globo / Open Graph |
| `assets/world-map-digital.jpg` | Mapa da rede |
| `docs/manual-comex-guiropa-7seas.pdf` | Link do manual |
| `logos/7-seas-global.png` | Logo 7 SEAS (opcional; há fallback tipográfico) |

---

## Renomear o repositório

Se o repositório no GitHub mudar de nome, atualize também:

1. `client/vite.config.js` → valor de `base` (ex.: `/novo-nome/`)
2. Faça commit e push

---

## Problemas comuns

| Sintoma | Solução |
|---------|---------|
| Página em branco ou CSS quebrado | Confirme que `base` em `vite.config.js` é `/guiropa-systems/` (igual ao nome do repo) |
| Link direto `/sobre` dá 404 | Rode `npm run build` de novo; o build deve gerar `dist/404.html` |
| Deploy falhou em Actions | Abra o job vermelho e leia o log; em geral é dependência ou erro de build |
| Pasta `client/dist` no Git | Não commite — já está no `.gitignore` |
| OneDrive reinicia o servidor | Use `npm run dev:server` (sem `--watch`); watch: `npm run dev:watch --prefix server` |

---

## Contato no site

WhatsApp **+48 832 099 369** · Brasil **+55 51 3027 4785** · **+55 45 2021 0022**  
Editável em `client/src/i18n/translations.js` → `sharedContact`.
