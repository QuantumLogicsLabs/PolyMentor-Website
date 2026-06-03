import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Cpu,
  FileCode2,
  GraduationCap,
  KeyRound,
  Languages,
  Menu,
  MessageSquareCode,
  Rocket,
  Sparkles,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import heroImage from "./assets/polymentor-hero.png";

const navItems = [
  { to: "/", label: "Chatbot" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/groq", label: "Groq Setup" },
  { to: "/languages", label: "Languages" },
  { to: "/roadmap", label: "Roadmap" },
];

const missionCards = [
  {
    icon: GraduationCap,
    title: "Teach code clearly",
    text: "PolyMentor explains programming concepts at the learner's level, from basic loops to larger architecture decisions.",
  },
  {
    icon: Wrench,
    title: "Find likely bugs",
    text: "Paste code and ask for help. PolyMentor looks for syntax mistakes, logic problems, missing edge cases, and confusing patterns.",
  },
  {
    icon: FileCode2,
    title: "Write usable code",
    text: "Ask for examples, full functions, refactors, tests, or the same idea translated across multiple programming languages.",
  },
];

const flow = [
  "User asks a coding question or pastes code.",
  "PolyMentor adds language, level, and tutor instructions.",
  "Groq generates a fast coding mentor response.",
  "The app returns likely bugs, explanation, fixed code, lesson, and next steps.",
];

const groqSteps = [
  {
    title: "Install dependencies",
    command: "pip install -e .\npip install -r requirements-groq.txt",
  },
  {
    title: "Set your API key",
    command: "export GROQ_API_KEY=\"your_groq_api_key\"",
  },
  {
    title: "Run the tutor",
    command: "bash scripts/run_tutor.sh",
  },
  {
    title: "Run the API",
    command: "uvicorn src.api.app:app --reload",
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

const roadmap = [
  "Add a browser chat UI connected to the FastAPI `/chat` endpoint.",
  "Add saved lessons so users can turn debugging sessions into study notes.",
  "Use local language detectors as extra context before sending prompts to Groq.",
  "Add runnable examples and test-generation workflows for each supported language.",
  "Create friend/classroom mode where one user can generate practice tasks for others.",
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

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          Groq coding tutor chatbot
        </p>
        <h1>PolyMentor</h1>
        <p className="hero-text">
          PolyMentor teaches code, writes examples, helps identify bugs, and
          explains fixes across multiple languages using Groq for fast mentor
          responses.
        </p>
        <div className="hero-actions">
          <NavLink to="/groq" className="primary-action">
            <KeyRound size={18} aria-hidden="true" />
            Set up Groq
          </NavLink>
          <NavLink to="/how-it-works" className="secondary-action">
            <BrainCircuit size={18} aria-hidden="true" />
            How it works
          </NavLink>
        </div>
      </div>
      <div className="hero-media" aria-label="PolyMentor coding tutor illustration">
        <img src={heroImage} alt="" />
      </div>
    </section>
  );
}

function ChatbotPage() {
  return (
    <Layout>
      <Hero />
      <section className="section purpose-grid">
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
    </Layout>
  );
}

function HowItWorksPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <Cpu size={16} aria-hidden="true" />
          Runtime architecture
        </p>
        <h1>No local training loop. Groq is the chatbot model.</h1>
      </section>
      <section className="section architecture-band">
        {flow.map((item, index) => (
          <article className="architecture-row" key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </article>
        ))}
      </section>
      <section className="section command-band">
        <div>
          <p className="eyebrow">
            <MessageSquareCode size={16} aria-hidden="true" />
            Response style
          </p>
          <h2>Helpful answers, not numeric scores.</h2>
        </div>
        <pre>{`Likely bugs
Explanation
Fixed code
Lesson
Next steps`}</pre>
      </section>
    </Layout>
  );
}

function GroqPage() {
  return (
    <Layout>
      <section className="page-heading">
        <p className="eyebrow">
          <KeyRound size={16} aria-hidden="true" />
          Groq setup
        </p>
        <h1>Set one API key, then start the tutor or API.</h1>
      </section>
      <section className="section lab-grid">
        {groqSteps.map((step, index) => (
          <article className="lesson-panel" key={step.title}>
            <span className="row-index">{index + 1}</span>
            <h2>{step.title}</h2>
            <pre>{step.command}</pre>
          </article>
        ))}
      </section>
    </Layout>
  );
}

function LanguagesPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <Languages size={16} aria-hidden="true" />
          Multi-language coding help
        </p>
        <h1>Ask for lessons, bug fixes, refactors, tests, or translations.</h1>
      </section>
      <section className="section signal-grid">
        {languages.map((language) => (
          <article className="signal-tile" key={language}>
            <TerminalSquare size={22} aria-hidden="true" />
            <strong>{language}</strong>
          </article>
        ))}
      </section>
    </Layout>
  );
}

function RoadmapPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <Rocket size={16} aria-hidden="true" />
          Next product work
        </p>
        <h1>Make PolyMentor a full coding classroom chatbot.</h1>
      </section>
      <section className="section roadmap-list">
        {roadmap.map((item) => (
          <article className="roadmap-item" key={item}>
            <CheckCircle2 size={22} aria-hidden="true" />
            <p>{item}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatbotPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/groq" element={<GroqPage />} />
      <Route path="/languages" element={<LanguagesPage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
    </Routes>
  );
}
