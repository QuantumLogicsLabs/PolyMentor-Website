import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Menu,
  Rocket,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
} from "lucide-react";
import heroImage from "./assets/polymentor-hero.png";

const navItems = [
  { to: "/", label: "Purpose" },
  { to: "/training", label: "Training" },
  { to: "/architecture", label: "Architecture" },
  { to: "/roadmap", label: "Roadmap" },
];

const trainingSteps = [
  {
    icon: Database,
    title: "Collect high-quality coding data",
    text: "Gather correct solutions, broken code, compiler errors, explanations, bug fixes, tests, and mentor-style conversations across Python, JavaScript, Java, C++, and more.",
  },
  {
    icon: ShieldCheck,
    title: "Clean and label the dataset",
    text: "Remove noisy samples, deduplicate examples, label error types, add difficulty levels, and preserve trusted source metadata so the model learns from reliable patterns.",
  },
  {
    icon: BrainCircuit,
    title: "Fine-tune for coding reasoning",
    text: "Train on tasks such as explain the bug, repair the code, write tests, compare approaches, generate a guide, and ask clarifying questions before producing risky changes.",
  },
  {
    icon: CheckCircle2,
    title: "Evaluate like a developer",
    text: "Score generated answers with unit tests, static analysis, syntax checks, security review, explanation quality, and whether the guidance actually helps a learner move forward.",
  },
];

const architecture = [
  "Data pipeline prepares code, errors, labels, and lesson-style explanations.",
  "Training layer fine-tunes the model for repair, explanation, planning, and guided implementation.",
  "Reasoning engine classifies errors, scores feedback, chooses hint strategies, and builds structured guidance.",
  "Inference API serves the chatbot experience and returns code-aware answers for the website or editor.",
];

const roadmap = [
  "Add live model training progress cards connected to backend experiment logs.",
  "Create a playground where users paste code and receive fixes, tests, and learning hints.",
  "Show benchmark results for syntax accuracy, bug repair quality, and guide usefulness.",
  "Publish dataset documentation so contributors understand what strong training examples look like.",
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
          Coding mentor model
        </p>
        <h1>PolyMentor</h1>
        <p className="hero-text">
          The purpose is to build a coding chatbot that is highly intelligent at
          programming, debugging, explaining decisions, and creating step-by-step
          guides for developers and learners.
        </p>
        <div className="hero-actions">
          <NavLink to="/training" className="primary-action">
            <GraduationCap size={18} aria-hidden="true" />
            Training flow
          </NavLink>
          <NavLink to="/architecture" className="secondary-action">
            <RouteIcon size={18} aria-hidden="true" />
            Browse routes
          </NavLink>
        </div>
      </div>
      <div className="hero-media" aria-label="PolyMentor coding model illustration">
        <img src={heroImage} alt="" />
      </div>
    </section>
  );
}

function PurposePage() {
  return (
    <Layout>
      <Hero />
      <section className="section purpose-grid">
        <article className="mission-panel">
          <Code2 size={26} aria-hidden="true" />
          <h2>What PolyMentor should become</h2>
          <p>
            PolyMentor is designed as an advanced coding assistant that can read
            a developer's goal, inspect code, identify mistakes, explain the
            reason behind each fix, and build a clear guide from idea to working
            implementation.
          </p>
        </article>
        <article className="mission-panel accent">
          <SquareTerminal size={26} aria-hidden="true" />
          <h2>Why train it carefully</h2>
          <p>
            A strong coding model needs more than answer text. It needs examples
            of failed code, corrected code, tests, explanations, architecture
            choices, and feedback loops so it can reason like a careful engineer.
          </p>
        </article>
      </section>
    </Layout>
  );
}

function TrainingPage() {
  return (
    <Layout>
      <section className="page-heading">
        <p className="eyebrow">
          <GraduationCap size={16} aria-hidden="true" />
          How to train the model
        </p>
        <h1>Train it on code, mistakes, repairs, and guidance.</h1>
      </section>
      <section className="section step-list">
        {trainingSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article className="step-card" key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <Icon size={28} aria-hidden="true" />
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </article>
          );
        })}
      </section>
    </Layout>
  );
}

function ArchitecturePage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <Layers3 size={16} aria-hidden="true" />
          System design
        </p>
        <h1>Browser routes map the full model story.</h1>
      </section>
      <section className="section architecture-band">
        {architecture.map((item, index) => (
          <article className="architecture-row" key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
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
          Next build targets
        </p>
        <h1>Turn the explanation site into a working model dashboard.</h1>
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
      <Route path="/" element={<PurposePage />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/architecture" element={<ArchitecturePage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
    </Routes>
  );
}
