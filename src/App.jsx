import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  GraduationCap,
  KeyRound,
  Languages,
  Menu,
  MessageSquareCode,
  RefreshCw,
  Rocket,
  Server,
  Sparkles,
  TerminalSquare,
  TrendingUp,
  UploadCloud,
  Wrench,
  Zap,
} from "lucide-react";

const logoPath = "/logo.png";

const navItems = [
  { to: "/", label: "Overview" },
  { to: "/setup", label: "Setup" },
  { to: "/polycode", label: "PolyCode" },
  { to: "/mlops", label: "MLOps" },
  { to: "/deploy", label: "Deploy" },
  { to: "/vision", label: "Vision" },
];

const stats = [
  { label: "Platform", value: "PolyCode" },
  { label: "Mentor", value: "PolyMentor" },
  { label: "Automation", value: "Daily checks" },
  { label: "Invention", value: "SENODROOM" },
];

const missionCards = [
  {
    icon: MessageSquareCode,
    title: "A complete coding campus",
    text: "PolyCode brings lessons, docs, playgrounds, authentication, profiles, certificates, and AI help into one learning experience instead of scattering them across tools.",
  },
  {
    icon: Database,
    title: "Real learner identity",
    text: "Learners get username profiles, public progress, completed-course cards, direct certificate pages, and follow relationships that make achievement visible.",
  },
  {
    icon: BrainCircuit,
    title: "PolyMentor intelligence",
    text: "The FastAPI mentor service supports beginner, intermediate, and advanced guidance, then serves the main app through a clean backend integration.",
  },
  {
    icon: TrendingUp,
    title: "The SENODROOM idea",
    text: "SENODROOM is our invented direction: a learning system that does not only teach code, but remembers progress, proves skill, and improves itself through automation.",
  },
];

const polycodeSteps = [
  {
    icon: KeyRound,
    title: "1. Build the learner app",
    text: "React powers the learner-facing website: routing, auth screens, language hubs, docs pages, profiles, certificates, and the draggable PolyMentor assistant.",
    command:
      "frontend/\n  React 19\n  AuthProvider + AssistantProvider\n  Lessons, profiles, certificates, playgrounds",
  },
  {
    icon: Server,
    title: "2. Connect the Express API",
    text: "The backend handles auth, documents, chat, certificates, profile photos, follow/unfollow, and non-blocking identity sync with the main database.",
    command:
      "backend/\n  /api/auth\n  /api/documents\n  /api/chat\n  /api/certificates",
  },
  {
    icon: Database,
    title: "3. Serve PolyMentor separately",
    text: "PolyMentor runs as its own FastAPI AI mentor service, so the learning platform can evolve independently from the model and inference layer.",
    command:
      "PolyMentor/\n  GET /health\n  POST /chat\n  POST /analyze\n  level: beginner | intermediate | advanced",
  },
  {
    icon: CheckCircle2,
    title: "4. Automate the boring parts",
    text: "GitHub Actions checks the deployed API daily, while a Windows script can start the local mentor on the laptop without opening any website.",
    command:
      "GitHub Actions: deployed health + chat smoke test\nWindows Task Scheduler: local PolyMentor on port 9999",
  },
];

const polycodeFlow = [
  "A learner signs in, chooses a track, and studies through structured PolyCode pages.",
  "Progress, profiles, following, and certificates turn learning into a public portfolio.",
  "The assistant sends level-aware requests through the backend to PolyMentor.",
  "PolyMentor answers as a focused coding mentor, not a generic chatbot.",
  "Daily automation keeps the deployed service checked and the local laptop service easy to run.",
];

const repositoryCards = [
  {
    icon: FileCode2,
    title: "PolyCode Frontend",
    url: "https://github.com/QuantumLogicsLabs/PolyCode-Frontend",
    command: "gh repo clone QuantumLogicsLabs/PolyCode-Frontend",
    text: "The user-facing React app for chat, learning screens, and the public PolyCode experience.",
  },
  {
    icon: Server,
    title: "PolyCode Backend",
    url: "https://github.com/QuantumLogicsLabs/PolyCode-Backend",
    command: "gh repo clone QuantumLogicsLabs/PolyCode-Backend",
    text: "The API service that connects frontend requests to Groq, MongoDB, and application logic.",
  },
  {
    icon: BrainCircuit,
    title: "PolyMentor",
    url: "https://github.com/QuantumLogicsLabs/PolyMentor.git",
    command: "gh repo clone QuantumLogicsLabs/PolyMentor",
    text: "The mentor engine, docs website, MongoDB prompt export, cleanup tooling, and model training pipeline.",
  },
];

const setupProcedureSteps = [
  {
    title: "Clone all project repositories",
    text: "Start from a clean workspace and clone the frontend, backend, and PolyMentor training/documentation repository.",
    command:
      "gh repo clone QuantumLogicsLabs/PolyCode-Frontend\n" +
      "gh repo clone QuantumLogicsLabs/PolyCode-Backend\n" +
      "gh repo clone QuantumLogicsLabs/PolyMentor",
  },
  {
    title: "Configure backend environment",
    text: "Set Groq and MongoDB credentials. The prompt dataset source is the MongoDB database polycode and collection prompts.",
    command:
      "cd PolyCode-Backend\n" +
      "python -m pip install -e .\n" +
      "python -m pip install -r requirements.txt\n" +
      "GROQ_API_KEY=your_groq_key\n" +
      "GROQ_MODEL=llama-3.3-70b-versatile\n" +
      "MONGODB_URI=mongodb+srv://user:pass@cluster/?retryWrites=true&w=majority\n" +
      "MONGODB_DB=polycode\n" +
      "MONGODB_COLLECTION=prompts",
  },
  {
    title: "Run the API locally",
    text: "Start the FastAPI backend and verify the health/docs endpoints before connecting the frontend.",
    command:
      "uvicorn src.api.app:app --host 0.0.0.0 --port 8000\n" +
      "# Open http://127.0.0.1:8000/docs\n" +
      "# Deployed API example: https://poly-mentor-bm2s.vercel.app/",
  },
  {
    title: "Run the frontend locally",
    text: "Install frontend dependencies, point the frontend to the backend API URL, and start the local dev server.",
    command:
      "cd ../PolyCode-Frontend\n" +
      "npm install\n" +
      "VITE_API_URL=http://127.0.0.1:8000\n" +
      "npm run dev",
  },
  {
    title: "Export MongoDB prompts for training",
    text: "Use PolyMentor to clean real conversation documents into the training JSON file.",
    command:
      "cd ../PolyMentor\n" +
      "python -m pip install -e .\n" +
      "python scripts/export_mongodb_prompts.py\n" +
      "# Output: data/processed/mongodb_prompts.json",
  },
  {
    title: "Retrain on a GPU machine",
    text: "For a no-cost GPU experiment, use Kaggle Notebooks. Training should not run on a normal Vercel or GitHub Actions runner.",
    command:
      "# Recommended free path: Kaggle Notebook with GPU enabled\n" +
      "# Upload data/processed/mongodb_prompts.json as a Kaggle dataset\n" +
      "git clone https://github.com/QuantumLogicsLabs/PolyMentor.git\n" +
      "cd PolyMentor\n" +
      "python -m pip install -r requirements.txt\n" +
      "python -m pip install -r requirements-train.txt\n" +
      "export FETCH_MONGODB_PROMPTS=0\n" +
      "bash scripts/train.sh",
  },
  {
    title: "Deploy the API and website",
    text: "Deploy FastAPI from the backend/root service and deploy the React app from the frontend or website root directory.",
    command:
      "# FastAPI deploy uses:\n" +
      "[tool.vercel]\n" +
      "entrypoint = \"src.api.app:app\"\n\n" +
      "# React deploy:\n" +
      "npm run build\n" +
      "# Set Vercel Root Directory to the frontend app folder.",
  },
  {
    title: "Keep automation running",
    text: "GitHub Actions exports clean prompt data and reports large local folders. Scheduled workflows use 5-minute cron intervals.",
    command:
      "# Required GitHub secret:\n" +
      "MONGODB_URI=mongodb+srv://user:pass@cluster/?retryWrites=true&w=majority\n\n" +
      "# Workflow:\n" +
      ".github/workflows/mongodb-prompts-pipeline.yml",
  },
];

const mlopsSteps = [
  {
    title: "Daily deployed API checks",
    command:
      ".github/workflows/polymentor-daily.yml\n\nChecks:\n  GET /health\n  POST /chat",
  },
  {
    title: "Laptop-local startup",
    command:
      "scripts/start-polymentor-local.ps1\n\nRuns Uvicorn locally\nAvoids duplicate servers\nWrites logs outside git",
  },
  {
    title: "Windows scheduled task",
    command:
      "scripts/register-polymentor-daily-task.ps1\n\nExample:\n  -StartTime 09:00\n  -Port 9999",
  },
  {
    title: "Secret-safe operations",
    command:
      "Use .env.example for names only\nKeep real keys local\nNever publish credentials in guides",
  },
];

const kaggleIntegrationSteps = [
  {
    title: "Use Kaggle only for free experiments",
    text: "Kaggle Notebooks are useful for testing LoRA training without paying, but they are not reliable for a fully self-working production pipeline because GPU sessions and schedules are limited.",
    command:
      "# Good for: manual experiments and proof of concept\n" +
      "# Not ideal for: always-on automatic retraining\n" +
      "# Production automation needs a scheduled GPU worker.",
  },
  {
    title: "Automate prompt export",
    text: "GitHub Actions pulls new conversations from MongoDB, cleans them, and uploads the training JSON as an artifact.",
    command:
      "# .github/workflows/mongodb-prompts-pipeline.yml\n" +
      "python scripts/export_mongodb_prompts.py\n" +
      "python scripts/maintenance_cleanup.py --min-mb 50\n" +
      "# Artifact: data/processed/mongodb_prompts.json",
  },
  {
    title: "Start GPU training automatically",
    text: "A scheduled GPU machine downloads the latest prompt dataset, installs dependencies, and runs the training script without manual clicks.",
    command:
      "git pull origin main\n" +
      "python -m pip install -e .\n" +
      "python -m pip install -r requirements.txt -r requirements-train.txt\n" +
      "python scripts/export_mongodb_prompts.py\n" +
      "export FETCH_MONGODB_PROMPTS=0\n" +
      "bash scripts/train.sh",
  },
  {
    title: "Evaluate and promote only if better",
    text: "The new adapter should be tested before it becomes the production model. If it passes, upload the model and switch traffic gradually.",
    command:
      "# Training output:\n" +
      "models_saved/polymentor-chatbot-lora\n\n" +
      "# Then evaluate, upload, and promote:\n" +
      "python scripts/evaluate.sh\n" +
      "# Upload adapter to model storage only if quality improves.",
  },
];

const selfWorkingTrainingSteps = [
  {
    title: "1. Store every chat in MongoDB",
    text: "The backend saves each user and assistant message in MongoDB so real conversations become future training data.",
    command:
      "MONGODB_DB=polycode\n" +
      "MONGODB_COLLECTION=prompts\n" +
      "# Documents contain userMessage, assistantMessage, liked, context, timestamps",
  },
  {
    title: "2. Schedule data export",
    text: "GitHub Actions runs the exporter on a schedule, cleans useless fields, and produces a training JSON file.",
    command:
      "# GitHub secret required:\n" +
      "MONGODB_URI=mongodb+srv://user:pass@cluster/?retryWrites=true&w=majority\n\n" +
      "# Workflow output:\n" +
      "data/processed/mongodb_prompts.json",
  },
  {
    title: "3. Run a GPU worker",
    text: "A cloud GPU server, RunPod pod, Vast.ai instance, or any CUDA machine pulls the latest code and dataset on a cron schedule.",
    command:
      "# Example cron on GPU machine, every night at 2 AM:\n" +
      "0 2 * * * cd /opt/PolyMentor && bash scripts/auto_train.sh",
  },
  {
    title: "4. Train the LoRA adapter",
    text: "The GPU worker runs the existing training script and saves a fresh adapter checkpoint.",
    command:
      "python scripts/export_mongodb_prompts.py\n" +
      "export FETCH_MONGODB_PROMPTS=0\n" +
      "bash scripts/train.sh\n" +
      "# Output: models_saved/polymentor-chatbot-lora",
  },
  {
    title: "5. Evaluate before deployment",
    text: "The pipeline should compare the new adapter against the current production behavior before switching users to it.",
    command:
      "bash scripts/evaluate.sh\n" +
      "# Promote only when eval quality improves.",
  },
  {
    title: "6. Upload and serve the better model",
    text: "If evaluation passes, upload the adapter to model storage or a GPU inference endpoint. Production can keep Groq as fallback.",
    command:
      "# Example targets:\n" +
      "# Hugging Face Hub, S3/R2, RunPod volume, or a custom GPU API\n" +
      "POLYCODE_INFERENCE=hybrid\n" +
      "GROQ_FALLBACK_MODEL=llama-3.1-8b-instant",
  },
];

const mlopsCycle = [
  {
    icon: Database,
    title: "Check",
    text: "GitHub Actions verifies the deployed PolyMentor API every day.",
  },
  {
    icon: Cpu,
    title: "Start",
    text: "Windows Task Scheduler can start the laptop-local mentor service automatically.",
  },
  {
    icon: CheckCircle2,
    title: "Protect",
    text: "The automation is designed to avoid publishing secrets or generated local files.",
  },
  {
    icon: Rocket,
    title: "Improve",
    text: "Each layer can be upgraded independently: frontend, backend, mentor API, and model pipeline.",
  },
];

const deployPolycodeSteps = [
  {
    title: "Document environment names only",
    command:
      ".env.example\n\nDocument required variable names.\nDo not publish real values.\nDo not paste production credentials.",
  },
  {
    title: "Run the deployed health workflow",
    command:
      ".github/workflows/polymentor-daily.yml\n\nRuns daily in GitHub Actions\nAlso supports manual workflow_dispatch",
  },
  {
    title: "Start the local mentor",
    command:
      "powershell -ExecutionPolicy Bypass \\\n  -File .\\scripts\\start-polymentor-local.ps1 \\\n  -Port 9999",
  },
  {
    title: "Build the guide website",
    command:
      "npm --prefix website install\nnpm --prefix website run build\n# Host website/dist on Vercel, Netlify, or any static host",
  },
];

const deployModelSteps = [
  {
    title: "Frontend learning experience",
    command:
      "Auth, lessons, docs hub, profile pages,\nfollow/unfollow, certificates,\nassistant level selector, draggable dock",
  },
  {
    title: "Backend platform API",
    command:
      "Express routes for auth, documents,\nchat, playground, challenges,\ncertificates, and profile media",
  },
  {
    title: "PolyMentor AI service",
    command:
      "FastAPI mentor API with /chat,\n/analyze, /languages, /learn/*,\nand level-aware guidance",
  },
  {
    title: "Automation layer",
    command:
      "Daily GitHub Actions checks\nLocal Windows scheduled startup\nNo credentials in public docs",
  },
];

const deploymentChecklist = [
  "The public website explains capabilities without exposing credentials.",
  "GitHub Actions checks the deployed PolyMentor API daily.",
  "The laptop startup script runs PolyMentor locally on the selected port.",
  "Generated `.venv/` and `logs/` folders stay out of git.",
  "Frontend, backend, and PolyMentor can be improved independently.",
  "SENODROOM is presented as the invention behind the learning ecosystem.",
];

const languages = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "C",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "SQL",
  "HTML",
  "CSS",
];

const visionPhases = [
  {
    icon: Zap,
    title: "Phase 1 — PolyCode foundation",
    text: "Create the complete learning platform: lessons, docs, auth, profiles, progress, certificates, and assistant access.",
  },
  {
    icon: RefreshCw,
    title: "Phase 2 — PolyMentor intelligence",
    text: "Connect a dedicated FastAPI mentor service that teaches at beginner, intermediate, and advanced levels.",
  },
  {
    icon: BrainCircuit,
    title: "Phase 3 — Automation everywhere",
    text: "Let GitHub Actions check the deployed API and Windows Task Scheduler run the laptop service without manual website visits.",
  },
  {
    icon: TrendingUp,
    title: "Phase 4 — SENODROOM",
    text: "Turn the platform into an invented learning system where mentorship, proof, identity, and automation move together.",
  },
];

const conceptsCovered = [
  "React learning platform with route-based course experiences",
  "Express API for auth, docs, chat, profiles, follows, and certificates",
  "FastAPI PolyMentor service with level-aware coding guidance",
  "Public profile URLs, completed-course cards, and direct certificates",
  "Draggable assistant dock with persistent user level selection",
  "Main database identity sync without blocking PolyCode users",
  "GitHub Actions daily deployed health and chat smoke checks",
  "Windows Task Scheduler local startup on the selected laptop port",
];

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="PolyMentor home" onClick={closeMenu}>
          <span className="brand-mark">
            <img src={logoPath} alt="" aria-hidden="true" />
          </span>
          <span>PolyMentor</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="icon-button"
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}

function HeroVisual() {
  const nodes = [
    { icon: MessageSquareCode, label: "PolyCode", sub: "Learn" },
    { icon: Server, label: "Backend", sub: "Connect" },
    { icon: BrainCircuit, label: "PolyMentor", sub: "Guide" },
    { icon: RefreshCw, label: "Automation", sub: "Run daily" },
    { icon: Sparkles, label: "SENODROOM", sub: "Invented vision" },
  ];

  return (
    <div className="hero-visual" aria-label="PolyMentor architecture flywheel">
      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <div className="hero-visual-node" key={node.label}>
            <div className="hero-visual-icon">
              <Icon size={22} aria-hidden="true" />
            </div>
            <strong>{node.label}</strong>
            <span>{node.sub}</span>
            {index < nodes.length - 1 && (
              <span className="hero-visual-arrow" aria-hidden="true">
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <img className="hero-logo" src={logoPath} alt="PolyMentor logo" />
        <p className="eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          PolyCode. PolyMentor. SENODROOM.
        </p>
        <h1>PolyMentor</h1>
        <p className="hero-text">
          We built more than a developer guide: we built the story of a complete
          coding education ecosystem. PolyCode teaches, PolyMentor guides, automation
          keeps it alive, and SENODROOM names the invention behind the whole movement.
        </p>
        <div className="hero-actions">
          <NavLink to="/polycode" className="primary-action">
            <GraduationCap size={18} aria-hidden="true" />
            See what we built
          </NavLink>
          <NavLink to="/vision" className="secondary-action">
            <TrendingUp size={18} aria-hidden="true" />
            SENODROOM vision
          </NavLink>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}

function OverviewPage() {
  return (
    <Layout>
      <Hero />
      <section className="section signal-grid">
        {stats.map((stat) => (
          <article className="signal-tile metric-tile" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>
      <section className="section purpose-grid four-col">
        {missionCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="mission-panel" key={card.title}>
              <Icon size={26} aria-hidden="true" />
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          );
        })}
      </section>
      <section className="section command-band">
        <div>
          <p className="eyebrow">
            <Cpu size={16} aria-hidden="true" />
            Architecture
          </p>
          <h2>One platform, one mentor, one invented direction.</h2>
          <p className="band-text">
            The strongest part of this project is not one route, one model, or one
            page. It is the combination: a learner app, a production backend, a separate
            AI mentor, public achievement, and automation that keeps the system ready
            without exposing private credentials.
          </p>
        </div>
        <pre>{`PolyCode frontend
  → Express backend
  → PolyMentor FastAPI service
  → Level-aware mentor answer

Profiles + certificates + follows
  → public proof of learning

GitHub Actions + Windows scripts
  → daily checks and local startup

SENODROOM
  → our invented learning ecosystem`}</pre>
      </section>
    </Layout>
  );
}

function SetupPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <GitBranch size={16} aria-hidden="true" />
          Complete project setup
        </p>
        <h1>Clone the repos, run PolyCode, collect prompts, and train PolyMentor.</h1>
        <p className="page-subtext">
          The deployed backend is available at{" "}
          <a href="https://poly-mentor-bm2s.vercel.app/" target="_blank" rel="noreferrer">
            poly-mentor-bm2s.vercel.app
          </a>
          . Use this guide to set up the frontend, backend, and PolyMentor training
          workflow from the GitHub repositories.
        </p>
      </section>

      <section className="section repo-grid">
        {repositoryCards.map((repo) => {
          const Icon = repo.icon;
          return (
            <article className="repo-panel" key={repo.title}>
              <Icon size={24} aria-hidden="true" />
              <h2>{repo.title}</h2>
              <p>{repo.text}</p>
              <code>{repo.command}</code>
              <a href={repo.url} target="_blank" rel="noreferrer">
                Open repository
              </a>
            </article>
          );
        })}
      </section>

      <section className="section start-list">
        {setupProcedureSteps.map((step, index) => (
          <article className="start-row" key={step.title}>
            <span className="row-index">{index + 1}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
              <pre>{step.command}</pre>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}

function PolyCodePage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <GitBranch size={16} aria-hidden="true" />
          What we built
        </p>
        <h1>PolyCode is not a simple course site. It is a full learning platform.</h1>
        <p className="page-subtext">
          The platform combines structured learning, real accounts, social profiles,
          certificate proof, follow relationships, a coding assistant, and an AI mentor
          service. That is why it feels like a product, not a demo.
        </p>
      </section>
      <section className="section start-list">
        {polycodeSteps.map((step) => {
          const Icon = step.icon;
          return (
            <article className="start-row" key={step.title}>
              <Icon size={26} aria-hidden="true" />
              <div>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
                <pre>{step.command}</pre>
              </div>
            </article>
          );
        })}
      </section>
      <section className="section architecture-band">
        {polycodeFlow.map((item, index) => (
          <article className="architecture-row" key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}

function MlopsPage() {
  return (
    <Layout>
      <section className="page-heading">
        <p className="eyebrow">
          <RefreshCw size={16} aria-hidden="true" />
          Automation
        </p>
        <h1>Automation makes PolyMentor feel alive without manual website visits.</h1>
        <p className="page-subtext">
          GitHub Actions handles deployed API checks. Windows scripts handle the laptop
          startup path. Together they create a practical daily workflow while keeping
          private credentials out of the website.
        </p>
      </section>
      <section className="section cycle-grid">
        {mlopsCycle.map((step) => {
          const Icon = step.icon;
          return (
            <article className="cycle-panel" key={step.title}>
              <Icon size={28} aria-hidden="true" />
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </article>
          );
        })}
      </section>
      <section className="section lab-grid">
        {mlopsSteps.map((step, index) => (
          <article className="lesson-panel guide-panel" key={step.title}>
            <span className="row-index">{index + 1}</span>
            <h2>{step.title}</h2>
            <pre>{step.command}</pre>
          </article>
        ))}
      </section>
      <section className="section command-band kaggle-band">
        <div>
          <p className="eyebrow">
            <Cloud size={16} aria-hidden="true" />
            Self-working training
          </p>
          <h2>For automatic deployment and retraining, use a scheduled GPU worker.</h2>
          <p className="band-text">
            A no-click production model needs three automated parts: MongoDB prompt
            export, GPU training, and evaluation-based deployment. Kaggle can help
            test the notebook manually, but a reliable self-working system needs a
            GPU machine that can run cron or scheduled jobs.
          </p>
        </div>
        <pre>{`MongoDB polycode/prompts
  → GitHub Actions exports cleaned prompts
  → GPU worker pulls latest dataset
  → LoRA training creates a new adapter
  → evaluation checks quality
  → upload/promote only if better
  → Groq remains fallback for safety`}</pre>
      </section>
      <section className="section lab-grid">
        {selfWorkingTrainingSteps.map((step) => (
          <article className="lesson-panel guide-panel" key={step.title}>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
            <pre>{step.command}</pre>
          </article>
        ))}
      </section>
      <section className="section lab-grid">
        {kaggleIntegrationSteps.map((step, index) => (
          <article className="lesson-panel guide-panel" key={step.title}>
            <span className="row-index">{index + 1}</span>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
            <pre>{step.command}</pre>
          </article>
        ))}
      </section>
      <section className="section note-band">
        <CheckCircle2 size={24} aria-hidden="true" />
        <p>
          GitHub Actions works in the cloud for repository and deployed-service tasks.
          It does not start services on a personal laptop unless a self-hosted runner is
          installed. For the laptop, Windows Task Scheduler is the right tool.
        </p>
      </section>
    </Layout>
  );
}

function DeployPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <UploadCloud size={16} aria-hidden="true" />
          Deployment
        </p>
        <h1>Deploy the public story without leaking private setup details.</h1>
        <p className="page-subtext">
          The guide explains the architecture, the daily checks, the local script, and
          the product value. It intentionally documents variable names and workflows
          without showing real tokens, keys, connection strings, or private credentials.
        </p>
      </section>
      <section className="section note-band deploy-note">
        <Wrench size={24} aria-hidden="true" />
        <p>
          The best developer guides are honest: GitHub Actions is excellent for daily
          deployed checks, builds, and repository automation. Laptop-local services are
          better handled by the provided PowerShell scripts and Windows Task Scheduler.
        </p>
      </section>
      <section className="section deploy-layout">
        <div>
          <div className="section-label">
            <Server size={18} aria-hidden="true" />
            <h2>Production app</h2>
          </div>
          <div className="deploy-stack">
            {deployPolycodeSteps.map((step, index) => (
              <article className="lesson-panel compact-panel" key={step.title}>
                <span className="row-index">{index + 1}</span>
                <h3>{step.title}</h3>
                <pre>{step.command}</pre>
              </article>
            ))}
          </div>
        </div>
        <div>
          <div className="section-label">
            <Cloud size={18} aria-hidden="true" />
            <h2>Prompt training pipeline</h2>
          </div>
          <div className="deploy-stack">
            {deployModelSteps.map((step, index) => (
              <article className="lesson-panel compact-panel" key={step.title}>
                <span className="row-index">{index + 1}</span>
                <h3>{step.title}</h3>
                <pre>{step.command}</pre>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section concepts-band">
        <div className="section-label">
          <CheckCircle2 size={18} aria-hidden="true" />
          <h2>Deployment checklist</h2>
        </div>
        <div className="concepts-grid">
          {deploymentChecklist.map((item) => (
            <article className="concept-item" key={item}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function VisionPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <TrendingUp size={16} aria-hidden="true" />
          SENODROOM vision
        </p>
        <h1>SENODROOM is the invention: a smarter way to turn learning into proof.</h1>
        <p className="page-subtext">
          SENODROOM is our name for the system we invented here: AI mentorship,
          structured education, public identity, certificates, follow networks, and
          automation working together as one persuasive learning engine.
        </p>
      </section>
      <section className="section roadmap-list">
        {visionPhases.map((phase) => {
          const Icon = phase.icon;
          return (
            <article className="roadmap-item" key={phase.title}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <h2>{phase.title}</h2>
                <p>{phase.text}</p>
              </div>
            </article>
          );
        })}
      </section>
      <section className="section language-grid">
        {languages.map((language) => (
          <article className="signal-tile language-tile" key={language}>
            <TerminalSquare size={22} aria-hidden="true" />
            <strong>{language}</strong>
          </article>
        ))}
      </section>
      <section className="section concepts-band">
        <div className="section-label">
          <Code2 size={18} aria-hidden="true" />
          <h2>Concepts this project covers</h2>
        </div>
        <div className="concepts-grid">
          {conceptsCovered.map((concept) => (
            <article className="concept-item" key={concept}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <p>{concept}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OverviewPage />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/polycode" element={<PolyCodePage />} />
      <Route path="/mlops" element={<MlopsPage />} />
      <Route path="/deploy" element={<DeployPage />} />
      <Route path="/vision" element={<VisionPage />} />
    </Routes>
  );
}
