import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  AlertTriangle,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  Code2,
  Database,
  FileJson,
  GitBranch,
  GraduationCap,
  Layers3,
  Menu,
  PlayCircle,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  TestTube2,
  Users,
} from "lucide-react";
import heroImage from "./assets/polymentor-hero.png";

const navItems = [
  { to: "/", label: "Mission" },
  { to: "/start", label: "Start" },
  { to: "/training", label: "Training Lab" },
  { to: "/repo-map", label: "Repo Map" },
  { to: "/team", label: "Team Plan" },
];

const repoSignals = [
  { label: "Backbone", value: "microsoft/codebert-base" },
  { label: "Explainer", value: "Salesforce/codet5-base" },
  { label: "Training entry", value: "src/training/train.py" },
  { label: "Dataset split", value: "data/processed/train.json" },
];

const startSteps = [
  {
    icon: ShieldCheck,
    title: "Make the repo trainable first",
    text: "Install dependencies, run tests, and make sure scripts match the Python entrypoints. Treat this as your first ML engineering job: a reproducible project beats a clever model.",
    command: "pip install -r requirements.txt\npip install -e .\npytest tests/ -v",
  },
  {
    icon: FileJson,
    title: "Fix labels before training",
    text: "The current label file has four specific labels, while the model config says nine labels. Align the taxonomy and model output size before you trust any metrics.",
    command: "data/labels/error_types.json\nconfigs/model_config.yaml",
  },
  {
    icon: Database,
    title: "Build a tiny gold dataset",
    text: "Start with 80 to 200 examples that you and your friends can audit by hand. Each example should include code, language, error labels, difficulty, expected fix, explanation, and hints.",
    command: "python src/data_pipeline/dataset_builder.py",
  },
  {
    icon: PlayCircle,
    title: "Run a small baseline experiment",
    text: "Do not begin with a huge model run. Train on a small split, inspect wrong predictions, then improve data labels and preprocessing before scaling.",
    command: "python src/training/train.py\npython src/evaluation/evaluate.py",
  },
];

const trainingLab = [
  {
    title: "Lesson 1: What the model learns",
    body: "PolyMentor is a multi-label coding error detector. One snippet can contain more than one issue, so each label gets its own confidence score instead of a single class choice.",
    artifact: "Read: src/models/error_detector.py",
  },
  {
    title: "Lesson 2: What data must contain",
    body: "Training examples need more than code. Good examples include error category, specific type, language, difficulty, explanation, corrected code, and progressive hints.",
    artifact: "Create: 20 reviewed examples per person",
  },
  {
    title: "Lesson 3: How fine-tuning works",
    body: "CodeBERT already knows code patterns. Your job is to fine-tune it on PolyMentor labels so it learns beginner mistakes, not just generic code syntax.",
    artifact: "Tune: batch size, learning rate, labels",
  },
  {
    title: "Lesson 4: How to judge success",
    body: "Accuracy alone is weak for multi-label learning. Track micro F1, per-label recall, confusion patterns, explanation helpfulness, and whether hints teach the concept.",
    artifact: "Report: experiments/results",
  },
];

const repoMap = [
  {
    icon: Database,
    title: "Data pipeline",
    paths: "src/data_pipeline, data/labels, data/raw_samples",
    text: "Collects raw code, cleans samples, tokenizes snippets, and builds train, validation, and test files.",
  },
  {
    icon: BrainCircuit,
    title: "Model layer",
    paths: "src/models, configs/model_config.yaml",
    text: "Defines CodeBERT error detection, label registry, explanation model loading, and model routing.",
  },
  {
    icon: GraduationCap,
    title: "Training layer",
    paths: "src/training, configs/training_config.yaml, scripts/train.sh",
    text: "Loads processed data, tokenizes code, optimizes model weights, validates with F1, and saves the best checkpoint.",
  },
  {
    icon: TestTube2,
    title: "Evaluation layer",
    paths: "src/evaluation, tests, quality",
    text: "Measures classifier behavior, checks inference safety, tests language detectors, and exposes mistakes to improve the next dataset version.",
  },
  {
    icon: SquareTerminal,
    title: "Inference and tutor mode",
    paths: "src/inference, src/reasoning_engine, src/api",
    text: "Turns predictions into a learning experience: explanations, hints, feedback scoring, and API responses.",
  },
];

const teamPlan = [
  "Data lead: owns label schema, examples, train/val/test split, and sample quality review.",
  "Model lead: owns CodeBERT setup, config alignment, training runs, checkpoints, and experiment notes.",
  "Evaluation lead: owns metrics, failing examples, per-label analysis, and test coverage.",
  "Teaching lead: owns website lessons, beginner explanations, hints, and friend study sessions.",
];

const firstMonth = [
  "Week 1: run the repo, read the beginner ML guide, fix label/config mismatch, create 40 clean examples.",
  "Week 2: build processed splits, train a tiny classifier, log every failure, improve the taxonomy.",
  "Week 3: add explanation and hint fields to the dataset, test tutor responses manually, collect friend feedback.",
  "Week 4: run a repeatable experiment, publish results on the website, choose the next model improvement.",
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
          ML engineering classroom
        </p>
        <h1>PolyMentor</h1>
        <p className="hero-text">
          Use this website to teach yourself and your friends how to train a
          coding mentor model: build data, fine-tune CodeBERT, evaluate errors,
          and turn model output into useful guidance.
        </p>
        <div className="hero-actions">
          <NavLink to="/start" className="primary-action">
            <GraduationCap size={18} aria-hidden="true" />
            Start learning
          </NavLink>
          <NavLink to="/repo-map" className="secondary-action">
            <RouteIcon size={18} aria-hidden="true" />
            View repo map
          </NavLink>
        </div>
      </div>
      <div className="hero-media" aria-label="PolyMentor coding model illustration">
        <img src={heroImage} alt="" />
      </div>
    </section>
  );
}

function MissionPage() {
  return (
    <Layout>
      <Hero />
      <section className="section signal-grid">
        {repoSignals.map((signal) => (
          <article className="signal-tile" key={signal.label}>
            <span>{signal.label}</span>
            <strong>{signal.value}</strong>
          </article>
        ))}
      </section>
      <section className="section purpose-grid">
        <article className="mission-panel">
          <Code2 size={26} aria-hidden="true" />
          <h2>Your ML engineer mission</h2>
          <p>
            Build a model that detects coding mistakes, explains the concept
            behind them, and guides a learner toward the fix without removing
            the learning moment.
          </p>
        </article>
        <article className="mission-panel accent">
          <AlertTriangle size={26} aria-hidden="true" />
          <h2>First project truth</h2>
          <p>
            The codebase has strong structure, but it needs alignment before
            serious training: label taxonomy, configs, scripts, data format, and
            evaluation must agree.
          </p>
        </article>
      </section>
    </Layout>
  );
}

function StartPage() {
  return (
    <Layout>
      <section className="page-heading">
        <p className="eyebrow">
          <ClipboardList size={16} aria-hidden="true" />
          Start as an ML engineer
        </p>
        <h1>Begin with reproducibility, data quality, and tiny experiments.</h1>
      </section>
      <section className="section start-list">
        {startSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article className="start-row" key={step.title}>
              <span className="row-index">{index + 1}</span>
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
    </Layout>
  );
}

function TrainingPage() {
  return (
    <Layout>
      <section className="page-heading">
        <p className="eyebrow">
          <GraduationCap size={16} aria-hidden="true" />
          Training lab
        </p>
        <h1>Teach the model by teaching the team first.</h1>
      </section>
      <section className="section lab-grid">
        {trainingLab.map((lesson) => (
          <article className="lesson-panel" key={lesson.title}>
            <h2>{lesson.title}</h2>
            <p>{lesson.body}</p>
            <strong>{lesson.artifact}</strong>
          </article>
        ))}
      </section>
      <section className="section command-band">
        <div>
          <p className="eyebrow">
            <GitBranch size={16} aria-hidden="true" />
            Recommended training loop
          </p>
          <h2>Data, train, evaluate, inspect, repeat.</h2>
        </div>
        <pre>
{`bash scripts/preprocess.sh
bash scripts/train.sh --exp first_clean_run
bash scripts/evaluate.sh --split test
pytest tests/ -v`}
        </pre>
      </section>
    </Layout>
  );
}

function RepoMapPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <Layers3 size={16} aria-hidden="true" />
          Parent repository map
        </p>
        <h1>Each folder teaches one ML engineering responsibility.</h1>
      </section>
      <section className="section repo-grid">
        {repoMap.map((item) => {
          const Icon = item.icon;
          return (
            <article className="repo-panel" key={item.title}>
              <Icon size={28} aria-hidden="true" />
              <h2>{item.title}</h2>
              <code>{item.paths}</code>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>
    </Layout>
  );
}

function TeamPage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <Users size={16} aria-hidden="true" />
          Teach friends with the website
        </p>
        <h1>Run PolyMentor like a small ML engineering studio.</h1>
      </section>
      <section className="section team-layout">
        <div className="team-column">
          <h2>Roles</h2>
          {teamPlan.map((item) => (
            <article className="roadmap-item" key={item}>
              <CheckCircle2 size={22} aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
        <div className="team-column">
          <h2>First month</h2>
          {firstMonth.map((item) => (
            <article className="roadmap-item" key={item}>
              <CheckCircle2 size={22} aria-hidden="true" />
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
      <Route path="/" element={<MissionPage />} />
      <Route path="/start" element={<StartPage />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/repo-map" element={<RepoMapPage />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  );
}
