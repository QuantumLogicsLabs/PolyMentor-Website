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
  { to: "/platform", label: "Platform" },
  { to: "/automation", label: "Automation" },
  { to: "/senodroom", label: "SENODROOM" },
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

const automationCards = [
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

const senodroomPrinciples = [
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
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/automation" element={<AutomationPage />} />
      <Route path="/senodroom" element={<SenodroomPage />} />
    </Routes>
  );
}

