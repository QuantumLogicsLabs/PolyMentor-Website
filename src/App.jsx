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
      <Route path="/polycode" element={<PolyCodePage />} />
      <Route path="/mlops" element={<MlopsPage />} />
      <Route path="/deploy" element={<DeployPage />} />
      <Route path="/vision" element={<VisionPage />} />
    </Routes>
  );
}
