import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  Bot,
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

const navItems = [
  { to: "/", label: "Overview" },
  { to: "/polycode", label: "PolyCode" },
  { to: "/mlops", label: "MLOps" },
  { to: "/deploy", label: "Deploy" },
  { to: "/vision", label: "Vision" },
];

const stats = [
  { label: "Live chat", value: "Groq API" },
  { label: "Data store", value: "MongoDB" },
  { label: "Retrain", value: "Daily MLOps" },
  { label: "Training", value: "Cloud GPUs" },
];

const missionCards = [
  {
    icon: MessageSquareCode,
    title: "Ship fast with Groq",
    text: "PolyCode answers coding questions instantly through the Groq API — lessons, bug fixes, refactors, and tests across many languages.",
  },
  {
    icon: Database,
    title: "Learn from every chat",
    text: "Every user question and Groq response is stored in MongoDB, building a growing dataset of real programming conversations.",
  },
  {
    icon: BrainCircuit,
    title: "Improve automatically",
    text: "A dedicated ML model retrains daily on cloud GPUs via MLOps, then redeploys — getting stronger at programming with each cycle.",
  },
  {
    icon: TrendingUp,
    title: "Surpass Groq over time",
    text: "The custom model is tuned on PolyCode's own data. As training data grows, it becomes more powerful than Groq for programming tasks.",
  },
];

const polycodeSteps = [
  {
    icon: KeyRound,
    title: "1. Configure environment",
    text: "Install the FastAPI backend + Groq SDK. Copy .env.example → .env and add your Groq API key. Use requirements-api.txt for chat only, or requirements.txt for the full ML stack.",
    command:
      "cd D:\\QuantumLogics\\PolyMentor\npython -m pip install -r requirements-api.txt\n# Or full stack: python -m pip install -r requirements.txt\n$env:GROQ_API_KEY=\"your_key\"",
  },
  {
    icon: Server,
    title: "2. Start PolyMentor API",
    text: "Run the FastAPI server. It answers coding questions through Groq at POST /chat. Open /docs to test in the browser.",
    command:
      "cd D:\\QuantumLogics\\PolyMentor\nuvicorn src.api.app:app --reload\n# http://127.0.0.1:8000/docs",
  },
  {
    icon: TerminalSquare,
    title: "3. Or use terminal chat",
    text: "Interactive tutor in the terminal (no website chat page yet). Requires GROQ_API_KEY in the environment.",
    command:
      "cd D:\\QuantumLogics\\PolyMentor\n$env:GROQ_API_KEY=\"your_key\"\npython src/inference/tutor_mode.py",
  },
  {
    icon: CheckCircle2,
    title: "4. Validate the chatbot",
    text: "Send a test message and confirm Groq returns an answer. MongoDB storage lives in PolyCode (Node backend), not this Python API yet.",
    command:
      "curl -X POST http://127.0.0.1:8000/chat `\n  -H \"Content-Type: application/json\" `\n  -d '{\"level\":\"beginner\",\"message\":\"Explain Python loops\"}'",
  },
];

const polycodeFlow = [
  "User asks a coding question or pastes code on PolyCode.",
  "PolyCode sends the request to Groq with tutor instructions and context.",
  "Groq returns a fast, high-quality programming answer.",
  "The full conversation pair is saved to MongoDB for future training.",
  "Users get instant help; the dataset grows with every session.",
];

const mlopsSteps = [
  {
    title: "Export chats from PolyCode MongoDB",
    command:
      "cd D:\\QuantumLogics\\PolyCode\\backend\nnpm run ml:export-training:dry\nnpm run ml:export-training -- --liked-only",
  },
  {
    title: "Preprocess local training data (optional)",
    command:
      "cd D:\\QuantumLogics\\PolyMentor\nbash scripts/preprocess.sh",
  },
  {
    title: "Fine-tune on GPU (Python 3.12 + CUDA)",
    command:
      "cd D:\\QuantumLogics\\PolyMentor\nbash scripts/train.sh\n# Uses src/training/finetune_chatbot.py",
  },
  {
    title: "Evaluate & iterate",
    command:
      "bash scripts/evaluate.sh\n# Manual quality checks — compare answers vs Groq baseline",
  },
];

const mlopsCycle = [
  {
    icon: Database,
    title: "Extract",
    text: "Pull new chat pairs from MongoDB since the last training run.",
  },
  {
    icon: Cpu,
    title: "Train",
    text: "Fine-tune the coding model on cloud GPUs with LoRA or full fine-tuning.",
  },
  {
    icon: CheckCircle2,
    title: "Evaluate",
    text: "Benchmark against Groq on programming tasks — bug fixes, code gen, explanations.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    text: "Push the improved checkpoint to inference and optionally route traffic from Groq.",
  },
];

const deployPolycodeSteps = [
  {
    title: "Run PolyMentor guide site (this UI)",
    command:
      "cd D:\\QuantumLogics\\PolyMentor\\website\nnpm install\nnpm run dev\n# http://localhost:5173",
  },
  {
    title: "Configure production secrets",
    command:
      "GROQ_API_KEY=your_key\nGROQ_MODEL=llama-3.3-70b-versatile\nMONGODB_URI=mongodb+srv://user:pass@cluster/polycode",
  },
  {
    title: "Run API for production",
    command:
      "cd D:\\QuantumLogics\\PolyMentor\nuvicorn src.api.app:app --host 0.0.0.0 --port 8000",
  },
  {
    title: "Monitor PolyCode chat data",
    command:
      "cd D:\\QuantumLogics\\PolyCode\\backend\nnpm run ml:export-training:dry\n# Or MongoDB: db.prompts.countDocuments()",
  },
];

const deployModelSteps = [
  {
    title: "Upload checkpoint to HF Hub",
    command:
      "hf auth login\nhuggingface-cli upload your-org/polymentor-model models_saved/polymentor-chatbot-lora .",
  },
  {
    title: "Serve local adapter (experimental)",
    command:
      "# Groq remains default runtime.\n# After training: wire custom endpoint in PolyCode backend\n# ASSISTANT_PROVIDER=custom",
  },
  {
    title: "Gradual Groq → custom switch",
    command:
      "# PolyCode backend .env:\nASSISTANT_PROVIDER=groq\n# later:\nASSISTANT_PROVIDER=custom\nCUSTOM_MODEL_BASE_URL=https://your-host/v1",
  },
  {
    title: "Schedule retraining",
    command:
      "# Windows Task Scheduler or cron on Linux VM\n# Daily: npm run ml:export-training (PolyCode backend)",
  },
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
    title: "Phase 1 — Groq-first PolyCode",
    text: "Launch PolyCode with Groq for instant coding help. MongoDB captures every conversation from day one.",
  },
  {
    icon: RefreshCw,
    title: "Phase 2 — Daily MLOps loop",
    text: "Automated pipeline extracts MongoDB data, trains on cloud GPUs, evaluates, and redeploys every 24 hours.",
  },
  {
    icon: BrainCircuit,
    title: "Phase 3 — Hybrid inference",
    text: "Route a growing share of traffic to the custom model as it proves equal or better on programming benchmarks.",
  },
  {
    icon: TrendingUp,
    title: "Phase 4 — Custom model leads",
    text: "PolyCode's own model surpasses Groq for programming — trained on real user data, optimized for code tutoring.",
  },
];

const conceptsCovered = [
  "Groq API integration for fast LLM responses",
  "MongoDB for persistent chat storage and dataset building",
  "Data extraction and preprocessing pipelines",
  "LoRA / full fine-tuning on cloud GPUs",
  "MLOps automation — scheduling, CI/CD, monitoring",
  "Model evaluation and A/B comparison against Groq",
  "Automated redeployment and traffic routing",
  "Full-stack deployment — API, frontend, inference",
];

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="PolyMentor home" onClick={closeMenu}>
          <span className="brand-mark">
            <Bot size={22} aria-hidden="true" />
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
    { icon: MessageSquareCode, label: "PolyCode", sub: "User chat" },
    { icon: Zap, label: "Groq API", sub: "Live answers" },
    { icon: Database, label: "MongoDB", sub: "Store chats" },
    { icon: Cpu, label: "Cloud GPU", sub: "Daily train" },
    { icon: BrainCircuit, label: "Custom ML", sub: "Beat Groq" },
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
        <p className="eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          Groq today. Custom model tomorrow.
        </p>
        <h1>PolyMentor</h1>
        <p className="hero-text">
          PolyCode powers coding help through Groq and stores every conversation in
          MongoDB. A custom ML model retrains daily on cloud GPUs via MLOps — and
          eventually surpasses Groq for programming.
        </p>
        <div className="hero-actions">
          <NavLink to="/polycode" className="primary-action">
            <GraduationCap size={18} aria-hidden="true" />
            Build PolyCode
          </NavLink>
          <NavLink to="/vision" className="secondary-action">
            <TrendingUp size={18} aria-hidden="true" />
            Full vision
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
          <h2>Groq serves users. MongoDB feeds the model. MLOps closes the loop.</h2>
          <p className="band-text">
            PolyCode is the product users interact with. Groq provides fast inference
            today. MongoDB accumulates training data from real conversations. MLOps
            retrains and redeploys the custom model every day on cloud GPUs until it
            outperforms Groq on programming tasks.
          </p>
        </div>
        <pre>{`PolyCode (React) → FastAPI → Groq API → response
                              ↓
                         MongoDB (chat logs)
                              ↓
              Daily MLOps: extract → train → eval → deploy
                              ↓
                    Custom model (Cloud GPU inference)
                              ↓
              Eventually replace Groq for programming`}</pre>
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
          PolyCode setup
        </p>
        <h1>Build the chat website with Groq API and MongoDB storage.</h1>
        <p className="page-subtext">
          PolyCode is the user-facing coding tutor. Groq handles live chat. MongoDB
          stores every conversation so the ML model can learn from real usage.
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
          Daily MLOps pipeline
        </p>
        <h1>Extract MongoDB chats, retrain on cloud GPUs, redeploy automatically.</h1>
        <p className="page-subtext">
          The ML model does not serve users directly at first. It pulls Groq conversation
          data from MongoDB, retrains every day, and redeploys when quality improves.
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
      <section className="section note-band">
        <CheckCircle2 size={24} aria-hidden="true" />
        <p>
          Use cloud GPU providers like RunPod, Lambda Labs, GCP Vertex AI, or AWS
          SageMaker for training. Schedule the pipeline with cron, GitHub Actions, or
          Airflow. Groq stays the live backend until the custom model beats it on eval
          benchmarks.
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
        <h1>Deploy PolyCode for users and the custom model for inference.</h1>
        <p className="page-subtext">
          Production runs Groq + MongoDB today. As the custom model matures, gradually
          shift inference traffic from Groq to your own checkpoint.
        </p>
      </section>
      <section className="section deploy-layout">
        <div>
          <div className="section-label">
            <Server size={18} aria-hidden="true" />
            <h2>PolyCode production</h2>
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
            <h2>Custom model inference</h2>
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
    </Layout>
  );
}

function VisionPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <TrendingUp size={16} aria-hidden="true" />
          Long-term vision
        </p>
        <h1>From Groq-powered chatbot to the best programming model.</h1>
        <p className="page-subtext">
          PolyMentor covers the full stack — API integration, data engineering,
          machine learning, MLOps, cloud GPUs, and deployment — in one cohesive project.
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
      <Route path="/polycode" element={<PolyCodePage />} />
      <Route path="/mlops" element={<MlopsPage />} />
      <Route path="/deploy" element={<DeployPage />} />
      <Route path="/vision" element={<VisionPage />} />
    </Routes>
  );
}
