# Auto Factory

**An AI-powered Tech Pack generator that transforms hoodie design concepts into manufacturing-ready technical documentation.**

---

![Canvas View](docs/screenshots/canvas-placeholder.png)

## What It Does

Auto Factory bridges the gap between design intent and factory floor. Specify your hoodie's fabric, fit, silhouette, and construction details on a visual canvas — then let AI compile everything into a structured Tech Pack ready for production.

![Dashboard View](docs/screenshots/dashboard-placeholder.png)

## Tech Stack

| Layer | Stack |
|-------|-------|
| **Frontend** | React · Vite · Tailwind CSS · Lucide React |
| **Backend** | n8n (Workflow Automation) · AI Model Integration |

## Features

- **Visual Node Canvas** — drag-and-drop design specification for Fabric, Fit, Silhouette, and more
- **n8n Webhook Integration** — production-ready workflow automation out of the box
- **History Sidebar** — manage and compare multiple Tech Pack versions
- **Issue Tracker** — real-time API debugging and error monitoring
- **PDF Export** — generate and download manufacturing-ready documentation

## Getting Started

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_N8N_URL=https://your-n8n-instance.com/webhook/your-endpoint
```

Start the dev server:

```bash
npm run dev
```

### Backend

1. Open your n8n instance.
2. Import the `.json` workflow file from the `backend/` folder.
3. Click **Publish**.

That's it. The webhook is live.

## Project Structure

```
auto-factory/
├── frontend/          # React + Vite application
│   ├── src/
│   └── .env           # VITE_N8N_URL
├── backend/           # n8n workflow definitions
│   └── *.json
└── README.md
```

## Roadmap

- [ ] Fabric Library — searchable database of materials with weight, composition, and supplier data
- [ ] 3D Preview — real-time hoodie visualization from Tech Pack specs
- [ ] Multi-garment Support — expand beyond hoodies to full apparel categories
- [ ] Team Collaboration — shared workspaces with version control
- [ ] Export to CAD — direct integration with pattern-making software

## License

MIT

---

Built with precision. Designed for production.
