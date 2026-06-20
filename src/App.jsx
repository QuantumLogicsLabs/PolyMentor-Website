import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  BrainCircuit,
  CheckCircle2,
  GraduationCap,
  Menu,
  MessageSquareCode,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TrendingUp,
} from "lucide-react";

const logoPath = "/logo.png";

const navItems = [
  { to: "/", label: "Overview" },
<<<<<<< HEAD
  { to: "/platform", label: "Platform" },
  { to: "/automation", label: "Automation" },
  { to: "/senodroom", label: "SENODROOM" },
=======
  { to: "/setup", label: "Setup" },
  { to: "/polycode", label: "PolyCode" },
  { to: "/mlops", label: "MLOps" },
  { to: "/deploy", label: "Deploy" },
  { to: "/vision", label: "Vision" },
>>>>>>> a6c6fdee0fb86f3cd26ba6efe13762c9f6a7cfb6
];

const stats = [
  { label: "Frontend", value: "React learner app" },
  { label: "Backend", value: "Express API" },
  { label: "Mentor", value: "FastAPI service" },
  { label: "Automation", value: "GitHub + Windows" },
];

const platformCards = [
  {
    icon: GraduationCap,
    title: "Learner experience",
    text: "PolyCode gives learners course routes, docs hubs, language pages, progress, profiles, and certificate access from one React app.",
  },
  {
    icon: Server,
    title: "Backend foundation",
    text: "The Express backend handles auth, documents, chat, profile updates, follows, certificates, and integration points for the platform.",
  },
  {
    icon: BrainCircuit,
    title: "PolyMentor AI",
    text: "PolyMentor runs separately as a FastAPI service with /health, /chat, /analyze, learning endpoints, and level-aware responses.",
  },
  {
    icon: ShieldCheck,
    title: "Secret-safe guide",
    text: "This website explains the system without publishing real tokens, database URLs, private keys, or account credentials.",
  },
];

const platformFlow = [
  "Learners use PolyCode for lessons, docs, profiles, assistant help, and certificates.",
  "The backend protects auth, serves data, stores profile state, and forwards mentor requests.",
  "PolyMentor answers through its own FastAPI API, so the AI service can be deployed and improved separately.",
  "Automation checks the deployed mentor daily and can start the local laptop service on port 9999.",
];

<<<<<<< HEAD
const automationCards = [
=======
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
>>>>>>> a6c6fdee0fb86f3cd26ba6efe13762c9f6a7cfb6
  {
    title: "GitHub Actions",
    command:
      ".github/workflows/polymentor-daily.yml\n\nRuns daily:\n  GET /health\n  POST /chat",
  },
  {
    title: "Local laptop startup",
    command:
      "scripts/start-polymentor-local.ps1\n\nStarts Uvicorn locally\nUses the selected port\nAvoids duplicate servers",
  },
  {
    title: "Windows scheduled task",
    command:
      "scripts/register-polymentor-daily-task.ps1\n\nExample:\n  -StartTime 09:00\n  -Port 9999",
  },
  {
    title: "Safe local files",
    command:
      ".gitignore\n\nIgnores:\n  .venv/\n  logs/",
  },
];

<<<<<<< HEAD
const senodroomPrinciples = [
=======
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
>>>>>>> a6c6fdee0fb86f3cd26ba6efe13762c9f6a7cfb6
  {
    icon: MessageSquareCode,
    title: "Teach with context",
    text: "SENODROOM connects lessons, code help, progress, and identity instead of treating AI chat as a separate toy.",
  },
  {
    icon: CheckCircle2,
    title: "Turn learning into proof",
    text: "Profiles, follows, completed-course cards, and certificate routes make progress visible and shareable.",
  },
  {
    icon: RefreshCw,
    title: "Automate the routine",
    text: "Daily deployed checks and scheduled local startup reduce manual work, so the system stays ready with less effort.",
  },
  {
    icon: TrendingUp,
    title: "Improve in layers",
    text: "The frontend, backend, and mentor service are separated, which lets each part grow without breaking the whole platform.",
  },
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
    { icon: GraduationCap, label: "PolyCode", sub: "Learn" },
    { icon: Server, label: "Backend", sub: "Connect" },
    { icon: BrainCircuit, label: "PolyMentor", sub: "Guide" },
    { icon: RefreshCw, label: "Automation", sub: "Run" },
    { icon: Sparkles, label: "SENODROOM", sub: "Invent" },
  ];

  return (
    <div className="hero-visual" aria-label="PolyMentor platform flow">
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
                -&gt;
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function OverviewPage() {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-copy">
          <img className="hero-logo" src={logoPath} alt="PolyMentor logo" />
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            PolyCode, PolyMentor, SENODROOM
          </p>
          <h1>PolyMentor</h1>
          <p className="hero-text">
            This guide now focuses on what the project is actually doing: a React
            learning platform, an Express backend, a separate FastAPI mentor service,
            daily GitHub checks, and a Windows script for local startup.
          </p>
          <div className="hero-actions">
            <NavLink to="/platform" className="primary-action">
              <GraduationCap size={18} aria-hidden="true" />
              View platform
            </NavLink>
            <NavLink to="/senodroom" className="secondary-action">
              <Sparkles size={18} aria-hidden="true" />
              SENODROOM idea
            </NavLink>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="section signal-grid">
        {stats.map((stat) => (
          <article className="signal-tile metric-tile" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="section command-band">
        <div>
          <p className="eyebrow">
            <TerminalSquare size={16} aria-hidden="true" />
            Real architecture
          </p>
          <h2>A practical learning system, not a fake AI pitch.</h2>
          <p className="band-text">
            The strongest part is the split: PolyCode owns the learner experience,
            the backend owns platform behavior, PolyMentor owns mentor intelligence,
            and automation keeps the service easy to check and run.
          </p>
        </div>
        <pre>{`PolyCode React app
  -> Express backend
  -> PolyMentor FastAPI service

GitHub Actions
  -> daily deployed API check

Windows Task Scheduler
  -> local laptop startup on port 9999`}</pre>
      </section>
    </Layout>
  );
}

function PlatformPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <GraduationCap size={16} aria-hidden="true" />
          Platform
        </p>
        <h1>What we actually built in PolyCode and PolyMentor.</h1>
        <p className="page-subtext">
          This is the real product story: learning routes, public profiles,
          certificates, follow features, assistant levels, backend APIs, and a
          separately deployed mentor service.
        </p>
      </section>

      <section className="section purpose-grid four-col">
        {platformCards.map((card) => {
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

<<<<<<< HEAD
=======
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
>>>>>>> a6c6fdee0fb86f3cd26ba6efe13762c9f6a7cfb6
      <section className="section architecture-band">
        {platformFlow.map((item, index) => (
          <article className="architecture-row" key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}

function AutomationPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <RefreshCw size={16} aria-hidden="true" />
          Automation
        </p>
        <h1>GitHub Actions handles cloud checks. Windows handles laptop startup.</h1>
        <p className="page-subtext">
          That is the correct split for this project. GitHub Actions can check the
          deployed API every day, while the local PowerShell scripts can run PolyMentor
          on the laptop without opening any website.
        </p>
      </section>

      <section className="section lab-grid">
        {automationCards.map((step, index) => (
          <article className="lesson-panel guide-panel" key={step.title}>
            <span className="row-index">{index + 1}</span>
            <h2>{step.title}</h2>
            <pre>{step.command}</pre>
          </article>
        ))}
      </section>
<<<<<<< HEAD

=======
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
>>>>>>> a6c6fdee0fb86f3cd26ba6efe13762c9f6a7cfb6
      <section className="section note-band">
        <CheckCircle2 size={24} aria-hidden="true" />
        <p>
          GitHub Actions does not run services on a personal laptop unless you install
          a self-hosted runner. For this project, Windows Task Scheduler is simpler
          and safer for local PolyMentor startup.
        </p>
      </section>
    </Layout>
  );
}

function SenodroomPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          SENODROOM
        </p>
        <h1>SENODROOM is the name for the invention behind the system.</h1>
        <p className="page-subtext">
          It means a learning platform that teaches, guides, records progress,
          proves achievement, and uses automation to stay reliable. It is persuasive
          because it turns coding education into a complete product experience.
        </p>
      </section>

      <section className="section roadmap-list">
        {senodroomPrinciples.map((principle) => {
          const Icon = principle.icon;
          return (
            <article className="roadmap-item" key={principle.title}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <h2>{principle.title}</h2>
                <p>{principle.text}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="section concepts-band">
        <div className="section-label">
          <CheckCircle2 size={18} aria-hidden="true" />
          <h2>Why it matters</h2>
        </div>
        <div className="concepts-grid">
          {[
            "It is honest about the current architecture.",
            "It explains the real automation we added.",
            "It avoids exposing credentials.",
            "It presents SENODROOM as the vision tying everything together.",
          ].map((item) => (
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OverviewPage />} />
<<<<<<< HEAD
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/automation" element={<AutomationPage />} />
      <Route path="/senodroom" element={<SenodroomPage />} />
=======
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/polycode" element={<PolyCodePage />} />
      <Route path="/mlops" element={<MlopsPage />} />
      <Route path="/deploy" element={<DeployPage />} />
      <Route path="/vision" element={<VisionPage />} />
>>>>>>> a6c6fdee0fb86f3cd26ba6efe13762c9f6a7cfb6
    </Routes>
  );
}

