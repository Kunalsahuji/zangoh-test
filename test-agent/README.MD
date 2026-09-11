# 🤖 Zangoh AI Agent Supervisor Workstation

**Zangoh AI Supervisor Workstation** is a high-fidelity, enterprise-grade workstation interface built to allow human supervisors to monitor, intervene in, and continuously improve AI customer service agents in real-time.

---

## 📁 Repository Structure
```
supervisor-challenge/
├── docs/                       # Project documentation & demo video guide
│   └── README.md
├── backend-starter/            # Node.js + Express + MongoDB Backend API
│   ├── data/                   # Initial test data samples
│   ├── middleware/             # Express middlewares
│   ├── models/                 # MongoDB Mongoose schemas
│   ├── routes/                 # Conversations, Agents, Intervene, KB routes
│   └── server.js               # Main Express backend server
├── frontend-starter/           # React + Chakra UI Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/                # Axios API client
│   │   ├── components/         # Header, Sidebar, Layout, MetricsCard, TemplateModal, EditTemplateModal
│   │   ├── context/            # AppDataContext & WebSocketContext
│   │   ├── pages/              # Dashboard, ConversationView, AgentConfig, Analysis (Templates)
│   │   ├── theme.js            # Chakra UI custom dark-purple theme
│   │   └── App.js              # React Router setup
├── docker/                     # Docker environment configurations
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
├── docker-compose.yaml          # Docker Compose container orchestrator
├── README.MD                   # Complete project documentation & setup guide
└── .gitignore                  # Exclusion file (ignores node_modules, build outputs, zips)
```

---

## 📌 Submission Requirements Checklist

- [x] **1. Complete Codebase (Frontend & Backend)**: Fully functional React + Express implementation matching Figma designs.
- [x] **2. Real-Time Monitoring Dashboard**: Live WebSocket conversation feed, 5 KPI cards, Volume vs SLA graph, Queue health, Priority Queue, and Supervisor feed.
- [x] **3. Intervention Interface**: 3-panel chat view, `Take over` / `Return control` toggle, SLA breach alert, Co-pilot recommendation, Feedback notes, and resolution workflow.
- [x] **4. Agent Configuration (Control Room)**: Parameter sliders (`Top-p`, `Speed`, `Empathy`, `Stability`), Escalation thresholds, Guardrails KPIs, Evaluation suite meters, and Routing matrix.
- [x] **5. Template Features (Updated Requirement)**:
  - **Template Management Screen**: 3-column Template Governance Workspace (`/Analysis`).
  - **Template Creation & Edit Modal**: Modal dialog for template creation/editing with rich text controls and live preview (`EditTemplateModal.js`).
  - **Template Usage Interface**: Response template selector modal (`TemplateModal.js`).
  - **Clear Variable Substitution**: Green indicator badge (`✔ 2 variables resolved: Visitor name and workspace`).
- [x] **6. README Documentation**: Setup instructions, architecture, challenges faced, and solution overview.

---

## ✨ Module Breakdown & Features

### 1. 📊 Agent Monitoring Dashboard (`/`)
- **Live Conversation Monitoring**: Real-time WebSocket feed tracking active customer sessions.
- **5 KPI Metric Cards**: `ACTIVE LOAD` (1,284 +8.2%), `SLA AT RISK` (47 +12), `AI CONTAINMENT` (73.4% +4.1%), `AVG. HANDLE TIME` (06:18 -0:42), and `CSAT` (8.7 +0.6).
- **Dual-Line Volume Chart**: Recharts line graph rendering live volume vs SLA exposure thresholds.
- **Queue Health & Critical Signals**: Live progress meters for high-breach probability queues and alert status cards.
- **Priority Queue & Live Supervisor Feed**: Urgency-ranked conversation queue table + live decision timeline feed.

### 2. 💬 Live Intervention Interface (`/conversation/:id`)
- **Full History & Metadata**: Full conversation stream with customer intelligence (`LIFETIME VALUE`, `ORDERS`, `RETURN RATE`, `SENTIMENT`).
- **Human-in-the-Loop "Take Over"**: One-click supervisor takeover toggle to assume control from the AI agent or return control with notes.
- **Co-Pilot Recommendation Card**: AI-assisted policy recommendations (`Approve action`, `Edit response`, `Escalate policy`) with confidence scoring (`● Confidence 88%`).
- **Case Diagnostics & Notes**: Progress indicators for risk contributors (Repeat contact, Negative sentiment, Policy exception, Churn propensity) and feedback notes box.

### 3. ⚙️ Agent Control Room Configuration (`/agent-config`)
- **Behavior Configuration Sliders**: Dynamic controls for `Creativity / Top-p` (0.68), `Response speed` (Fast), `Empathy` (High), and `Stability` (0.82).
- **Escalation Policy Thresholds**: Automatic takeover triggers (`No agent response: 90 sec`, `Customer sentiment: ≤ -0.55`, `Refund value: ≥ ₹5,000`, `Confidence score: ≤ 0.64`).
- **Performance Guardrails & Evals**: 124 evaluation suite scenarios (`Policy adherence`, `Refund reasoning`, `Empathy & tone`, `Prompt injection`, `Knowledge freshness`) with pass/risk rubric.
- **Traffic Routing Matrix**: Multi-tier intent-based routing table across AI versions and human failover.

### 4. 📝 Response Template Management & Governance (`/Analysis`)
- **Template Governance Workspace**: 3-column workspace with category filters (By Journey: Onboarding, Billing, Engagement, Transaction; By Channel: Email, Website, Mobile, Messenger).
- **Edit & Create Template Modals**: Modal dialog for creating and editing canned responses with rich formatting controls and live preview.
- **Clear Variable Substitution Display**: Interactive modal indicating resolved variables (`✔ 2 variables resolved: Visitor name and workspace`) as explicitly mandated by assignment requirements.

---

## 📦 Setup & Run Guide

### 🔹 Option 1: Docker Setup (Recommended)
```bash
# Start container environment
docker-compose up -d

# Seed initial test data
docker-compose exec backend npm run seed
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)

### 🔹 Option 2: Direct Local Setup (Node.js)

#### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend-starter

# Install dependencies
npm install

# Seed test data (requires local MongoDB on port 27017)
npm run seed

# Run backend development server
npm run dev
```

#### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend-starter

# Install dependencies
npm install

# Run frontend development server
npm start
```

---

## 💡 Challenges Faced & Technical Solutions

- **Challenge 1: Environment Domain Resolution**: React app was initially attempting to connect to `http://backend:8080` (Docker internal hostname) outside Docker.
  - **Solution**: Configured `frontend-starter/.env` to point to `http://localhost:8080` for smooth local development.
- **Challenge 2: Pixel-Accurate Figma Alignment**: Replicating 6 distinct Figma design frames with custom dark purple branding (`#3C2A58`), custom metrics, and complex 3-column layouts.
  - **Solution**: Extended Chakra UI theme with custom tokens (`#3C2A58`, `#6E26D5`, `#F3F4F8`) and structured reusable modular components.
- **Challenge 3: Clear Variable Substitution UI**: Meeting the updated requirement to clearly present dynamic variable resolution.
  - **Solution**: Built green resolved-variables indicators (`✔ 2 variables resolved: Visitor name and workspace`) in both the Template Selection Modal (`TemplateModal.js`) and Template Governance Workspace (`Analysis.js`).

---

## 🚀 Git Push & Submission Guide

### 1. Push Code to GitHub
```bash
# Initialize git repository (if not already done)
git init

# Stage all files (node_modules is automatically ignored by .gitignore)
git add .

# Commit changes
git commit -m "Complete implementation of Zangoh AI Agent Supervisor Workstation"

# Link your GitHub repository
git remote add origin https://github.com/Kunalsahuji/zangoh-test.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 2. Create Submission Zip (Optional)
If submitting via a `.zip` archive, compress the root directory excluding `node_modules`:
```bash
zip -r submission.zip . -x "node_modules/*" "*/node_modules/*" ".git/*"
```

---

## 🎥 Walkthrough Video & Snapshots Evidence

- 📷 **UI Snapshots & Localhost Screenshots**: Stored in [`docs/snapshots`](./docs/snapshots) directory for evaluator inspection.
- 🎤 **Video Recording Script**: Stored in [`docs/README.md`](./docs/README.md) with word-for-word 2-minute English walkthrough script by **Kunal Sahu**.
- 🚀 **Video Demo Link**: *(Add your video link here or place video file inside `docs/snapshots`)*  
- 📂 **GitHub Repository**: [https://github.com/Kunalsahuji/zangoh-test](https://github.com/Kunalsahuji/zangoh-test)

---

## 🤝 Connect with Me
📦 GitHub: [https://github.com/Kunalsahuji/zangoh-test](https://github.com/Kunalsahuji/zangoh-test)  
🔗 LinkedIn: [linkedin.com/in/kunal-sahu-7688ba1b0](https://linkedin.com/in/kunal-sahu-7688ba1b0)  
📌 Notion: [Watch my content](https://www.notion.so/1dff7c6ce1bb803787fbddd34e422ab4?v=1e0f7c6ce1bb8052b14c000cb57448ee&pvs=4)  
📧 Email: [ksahu0103@gmail.com](mailto:ksahu0103@gmail.com)  

---

## 🙌 Acknowledgements
Developed with ❤️ by [Kunal Sahu](https://github.com/Kunalsahuji) for the **Zangoh AI Agent Supervisor Workstation Challenge**.
 