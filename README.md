# TECHSINNO — Website & Backend

> Smart Engineering Solutions — B2B Electronics Repair · Industrial Automation · Agricultural IoT  
> **South Africa & DR Congo**

---

## Project Structure

```
techsinno-deploy/  (this repo)
│
├── index.html                      ← Main website (single-page)
├── css/style.css                   ← Black + electric green theme
├── js/main.js                      ← Language switcher, animations, IoT dashboard
├── js/form.js                      ← Quote form → Azure Function
├── img/logo.png                    ← TECHSINNO logo
├── staticwebapp.config.json        ← Azure Static Web Apps routing
├── .gitignore
│
├── api/                            ← Azure Functions backend
│   ├── host.json                   ← Functions config + CORS
│   ├── package.json                ← Dependencies
│   ├── local.settings.template.json← Copy → local.settings.json for local dev
│   ├── shared/
│   │   ├── emailer.js              ← Gmail SMTP (nodemailer)
│   │   └── cosmosdb.js             ← Cosmos DB save/query
│   └── submitQuote/
│       ├── function.json           ← HTTP POST trigger
│       └── index.js                ← Validate → Save DB → Send email
│
└── .github/
    └── workflows/
        └── azure-static-web-apps.yml ← Auto-deploy on push to main
```

---

## Tech Stack

| Layer | Technology | Cost |
|---|---|---|
| Frontend | HTML + CSS + Vanilla JS | Free |
| Hosting | Azure Static Web Apps | Free |
| Backend | Azure Functions (Node.js 18) | Free (1M req/mo) |
| Database | Azure Cosmos DB | Free (25 GB always) |
| Email | Gmail SMTP via nodemailer | Free |
| CI/CD | GitHub Actions | Free |
| **Total** | | **~R0/month** |

---

## Features

- **Trilingual** — English / French / Afrikaans (instant switch, no reload)
- **Live IoT dashboard** — simulated sensor data, updates every 3s
- **Quote form** — saves to Cosmos DB + emails Frank + auto-replies to client
- **Scroll animations** — fade-up on all sections
- **Responsive** — mobile hamburger nav, stacked layouts
- **Black + electric green** industrial theme
- **6 sections** — Hero, Services, IoT, About, Contact, Client Portal

---

## Quick Deploy (First Time)

### Prerequisites
- GitHub account
- Azure account (free tier)
- Gmail App Password (see SETUP steps below)

### Steps

**1. Push to GitHub**
```bash
git init
git add .
git commit -m "Initial TECHSINNO website + API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/techsinno.git
git push -u origin main
```

**2. Create Azure Static Web App**
- Go to portal.azure.com → Create resource → Static Web App
- Connect to your GitHub repo
- App location: `/`
- Api location: `api`
- Output location: *(leave blank)*
- Azure generates `AZURE_STATIC_WEB_APPS_API_TOKEN` automatically

**3. Add GitHub Secret**
- GitHub repo → Settings → Secrets → Actions
- Add: `AZURE_STATIC_WEB_APPS_API_TOKEN` = (token from Azure portal)

**4. Set Azure Function Environment Variables**
- Azure portal → Your Static Web App → Configuration
- Add all variables from the table below

**5. Push again — auto-deploys via GitHub Actions**

---

## Environment Variables (Azure Configuration)

| Variable | Value |
|---|---|
| `GMAIL_USER` | techsinno0@gmail.com |
| `GMAIL_APP_PASS` | 16-char Gmail App Password |
| `COSMOS_ENDPOINT` | https://techsinno-db.documents.azure.com:443/ |
| `COSMOS_KEY` | Primary key from Cosmos DB → Keys |
| `COSMOS_DB` | techsinno |
| `COSMOS_CONTAINER` | quotes |

---

## Local Development

```bash
# 1. Copy settings template
cp api/local.settings.template.json api/local.settings.json
# Edit local.settings.json with real values (never commit this)

# 2. Install dependencies
cd api && npm install && cd ..

# 3. Install Azure Functions Core Tools (once)
npm install -g azure-functions-core-tools@4 --unsafe-perm true

# 4. Run the function locally
cd api && func start
# API available at http://localhost:7071/api/submitQuote

# 5. Open website
# Use VS Code Live Server or just open index.html in browser
```

---

## Business Details

**TECHSINNO (Pty) Ltd**  
Registration: 2022/364165/07  
Tax: 9234848266  
Location: Kuilsriver, Western Cape, South Africa  
Email: techsinno0@gmail.com  
Coverage: South Africa & DR Congo  

---

*Built with Azure Free Tier — R0/month hosting*
