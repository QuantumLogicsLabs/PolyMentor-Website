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
    text: "Install the PolyCode backend, Groq SDK, and MongoDB driver. Set API keys and database connection strings.",
    command:
      "python -m pip install -e .\npython -m pip install -r requirements-groq.txt\nexport GROQ_API_KEY=\"your_key\"\nexport MONGODB_URI=\"mongodb://localhost:27017/polycode\"",
  },
  {
    icon: Server,
    title: "2. Start PolyCode API",
    text: "Run the FastAPI server. It handles chat requests through Groq and persists every conversation to MongoDB.",
    command:
      "uvicorn src.api.app:app --reload\n# Endpoints: /chat /review /teach",
  },
  {
    icon: Database,
    title: "3. MongoDB schema",
    text: "Each chat document stores the user message, Groq response, language, difficulty level, timestamp, and session metadata.",
    command:
      "{\n  \"session_id\": \"...\",\n  \"user_message\": \"...\",\n  \"groq_response\": \"...\",\n  \"language\": \"python\",\n  \"level\": \"beginner\",\n  \"created_at\": \"2026-06-06T12:00:00Z\"\n}",
  },
  {
    icon: CheckCircle2,
    title: "4. Validate the pipeline",
    text: "Send test chats, confirm Groq responses arrive quickly, and verify documents appear in MongoDB.",
    command:
      "python -m py_compile src/inference/pipeline.py src/api/app.py\nnpm --prefix website run build",
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
    title: "Schedule daily extraction",
    command:
      "# Cron or Airflow DAG — runs every night\npython scripts/extract_training_data.py \\\n  --mongodb-uri $MONGODB_URI \\\n  --output data/processed/daily_train.json \\\n  --since yesterday",
  },
  {
    title: "Launch cloud GPU training",
    command:
      "# RunPod / Lambda / GCP / AWS\npython scripts/train_cloud.py \\\n  --data data/processed/daily_train.json \\\n  --base-model Qwen/Qwen2.5-Coder-7B-Instruct \\\n  --output models_saved/polycode-lora \\\n  --epochs 3",
  },
  {
    title: "Evaluate against Groq baseline",
    command:
      "python scripts/evaluate_model.py \\\n  --checkpoint models_saved/polycode-lora \\\n  --benchmark data/processed/eval_set.json \\\n  --compare-groq",
  },
  {
    title: "Redeploy if quality improves",
    command:
      "python scripts/deploy_model.py \\\n  --checkpoint models_saved/polycode-lora \\\n  --target hf://your-org/polycode-model \\\n  --promote-if-better-than-groq",
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
    title: "Prepare production secrets",
    command:
      "GROQ_API_KEY=your_groq_key\nGROQ_MODEL=llama-3.3-70b-versatile\nMONGODB_URI=mongodb+srv://user:pass@cluster/?retryWrites=true&w=majority\nMONGODB_DB=polycode\nMONGODB_COLLECTION=pormpts",
  },
  {
    title: "Install and run the API",
    command:
      "python -m pip install -e .\npython -m pip install -r requirements.txt\nuvicorn src.api.app:app --host 0.0.0.0 --port 8000",
  },
  {
    title: "Export cleaned MongoDB prompts",
    command:
      "python scripts/export_mongodb_prompts.py\n# Reads: polycode/pormpts\n# Writes: data/processed/mongodb_prompts.json",
  },
  {
    title: "Deploy the website",
    command:
      "npm --prefix website install\nnpm --prefix website run build\n# Host website/dist on Vercel, Netlify, or any static host",
  },
];

const deployModelSteps = [
  {
    title: "Train from MongoDB conversations",
    command:
      "export FETCH_MONGODB_PROMPTS=1\nbash scripts/train.sh\n# Output: models_saved/polymentor-chatbot-lora",
  },
  {
    title: "Run scheduled extraction in GitHub Actions",
    command:
      "# Add GitHub repository secret:\nMONGODB_URI=mongodb+srv://user:pass@cluster/?retryWrites=true&w=majority\n\n# Workflow:\n.github/workflows/mongodb-prompts-pipeline.yml",
  },
  {
    title: "Keep cleanup reporting enabled",
    command:
      "python scripts/maintenance_cleanup.py --min-mb 50\n# Removes generated caches\n# Reports large folders like models_saved, venv312, venv",
  },
  {
    title: "Deploy model only after evaluation",
    command:
      "# Keep Groq as production runtime first.\n# Promote the local LoRA adapter only after benchmark quality improves.\n# Use a GPU endpoint for custom inference.",
  },
];

const deploymentChecklist = [
  "MongoDB Atlas collection exists as polycode/pormpts.",
  "Repository secret MONGODB_URI is configured for GitHub Actions.",
  "API host has GROQ_API_KEY and MongoDB credentials.",
  "Static website build passes with npm --prefix website run build.",
  "Cleaned prompts export to data/processed/mongodb_prompts.json.",
  "Training runs only on a CUDA/GPU-capable environment.",
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
        <h1>Deploy PolyMentor with Groq, MongoDB prompts, and retraining automation.</h1>
        <p className="page-subtext">
          Production serves users through the Groq-powered FastAPI backend while
          MongoDB stores conversations in <strong>polycode/pormpts</strong>. The
          training pipeline exports those prompts, cleans them, and feeds them into
          the local LoRA trainer when a GPU environment is available.
        </p>
      </section>
      <section className="section note-band deploy-note">
        <Wrench size={24} aria-hidden="true" />
        <p>
          GitHub Actions can run the prompt export and cleanup report on a schedule,
          but it cannot run every 15 seconds. The workflow uses GitHub's supported
          5-minute cron interval. Full model retraining should run on a GPU machine
          or cloud GPU service, not on a normal scheduled GitHub runner.
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
