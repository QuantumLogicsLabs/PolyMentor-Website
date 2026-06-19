import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  FileCode2,
  GitBranch,
  GraduationCap,
  KeyRound,
  Languages,
  Menu,
  MessageSquareCode,
  Rocket,
  Server,
  Sparkles,
  TerminalSquare,
  UploadCloud,
  Wrench,
} from "lucide-react";
import heroImage from "./assets/polymentor-hero.png";

const navItems = [
  { to: "/", label: "Overview" },
  { to: "/work-guide", label: "Work Guide" },
  { to: "/fine-tune", label: "Fine-Tune" },
  { to: "/deploy", label: "Deploy" },
  { to: "/languages", label: "Languages" },
];

const stats = [
  { label: "Runtime", value: "Groq API" },
  { label: "Local option", value: "LoRA adapter" },
  { label: "Website", value: "React + Vite" },
  { label: "Deploy", value: "HF Hub + Spaces" },
];

const missionCards = [
  {
    icon: GraduationCap,
    title: "Teach code clearly",
    text: "PolyMentor explains concepts at the learner's level, from first loops to debugging larger programs.",
  },
  {
    icon: Wrench,
    title: "Find likely bugs",
    text: "Users paste code and get likely bugs, why they happen, corrected examples, and next practice steps.",
  },
  {
    icon: FileCode2,
    title: "Build across languages",
    text: "The assistant can write examples, translate ideas, refactor snippets, and generate tests in many languages.",
  },
];

const workGuide = [
  {
    icon: KeyRound,
    title: "1. Prepare the environment",
    text: "Use the project venv for Groq chatbot work. Use Python 3.12 plus CUDA PyTorch only for local GPU fine-tuning.",
    command:
      "python -m pip install -e .\npython -m pip install -r requirements.txt\nexport GROQ_API_KEY=\"your_key\"",
  },
  {
    icon: MessageSquareCode,
    title: "2. Run PolyMentor locally",
    text: "Start the terminal tutor for quick testing, or run the FastAPI server for app and Space integration.",
    command: "bash scripts/run_tutor.sh\nuvicorn src.api.app:app --reload",
  },
  {
    icon: BrainCircuit,
    title: "3. Improve the tutor behavior",
    text: "Add better prompt instructions, more high-quality examples under data, and focused bug explanation patterns.",
    command: "src/inference/pipeline.py\ndata/raw/pro_training_data.json\ndata/processed/train.json",
  },
  {
    icon: CheckCircle2,
    title: "4. Validate before sharing",
    text: "Test beginner lessons, bug-fix tasks, multi-language code generation, and ambiguous requests that should trigger questions.",
    command:
      "python -m py_compile src/inference/pipeline.py src/api/app.py\nnpm --prefix website run build",
  },
];

const runtimeFlow = [
  "User asks a coding question or pastes code.",
  "PolyMentor adds language, level, and tutor instructions.",
  "Groq returns a fast mentor response for the default runtime.",
  "Optional local LoRA adapter can be trained and pushed to Hugging Face Hub.",
  "A Hugging Face Space can expose the chatbot through Gradio or Docker.",
];

const fineTuneSteps = [
  {
    title: "Create a CUDA training venv",
    command:
      "deactivate\npy -3.12 -m venv venv312\n.\\venv312\\Scripts\\Activate.ps1\npython -m pip install --upgrade pip",
  },
  {
    title: "Install project and CUDA PyTorch",
    command:
      "python -m pip install -e .\npython -m pip install -r requirements.txt\npython -m pip install --index-url https://download.pytorch.org/whl/cu124 torch torchvision torchaudio",
  },
  {
    title: "Run local LoRA fine-tuning",
    command:
      "bash scripts/train.sh\n# checkpoint: models_saved/polymentor-chatbot-lora",
  },
  {
    title: "Tune safely",
    command:
      "BASE_MODEL=Qwen/Qwen2.5-Coder-0.5B-Instruct EPOCHS=3 MAX_VENDOR_FILES=200 bash scripts/train.sh",
  },
];

const hubSteps = [
  {
    title: "Login",
    command: "python -m pip install -U huggingface_hub\nhf auth login",
  },
  {
    title: "Create or choose a model repo",
    command: "hf repo create polymentor-chatbot-lora --type model",
  },
  {
    title: "Upload checkpoint folder",
    command:
      "hf upload your-username/polymentor-chatbot-lora models_saved/polymentor-chatbot-lora . --repo-type model",
  },
  {
    title: "Add a model card",
    command:
      "Create README.md in the model repo with base model, data notes, intended use, and limitations.",
  },
];

const spaceSteps = [
  {
    title: "Create a Space",
    command:
      "On Hugging Face: New Space -> Gradio or Docker -> name it polymentor-space",
  },
  {
    title: "Add secrets",
    command:
      "Space Settings -> Secrets\nGROQ_API_KEY=your_key\nGROQ_MODEL=llama-3.3-70b-versatile",
  },
  {
    title: "Minimal Gradio app",
    command:
      "app.py imports PolyMentorPipeline, creates a textbox for question/code, and calls pipeline.chat().",
  },
  {
    title: "Push files",
    command:
      "git clone https://huggingface.co/spaces/your-username/polymentor-space\n# add app.py, requirements.txt, src/\ngit add . && git commit -m \"Deploy PolyMentor\" && git push",
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
          Groq chatbot plus local fine-tuning path
        </p>
        <h1>PolyMentor</h1>
        <p className="hero-text">
          A coding tutor chatbot that teaches programming, helps identify bugs,
          writes code across languages, and can be deployed on Hugging Face.
        </p>
        <div className="hero-actions">
          <NavLink to="/work-guide" className="primary-action">
            <GraduationCap size={18} aria-hidden="true" />
            Complete guide
          </NavLink>
          <NavLink to="/deploy" className="secondary-action">
            <Cloud size={18} aria-hidden="true" />
            Deploy on HF
          </NavLink>
        </div>
      </div>
      <div className="hero-media" aria-label="PolyMentor coding tutor illustration">
        <img src={heroImage} alt="" />
      </div>
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
      <section className="section command-band">
        <div>
          <p className="eyebrow">
            <Cpu size={16} aria-hidden="true" />
            Architecture
          </p>
          <h2>Groq for production. LoRA for experiments.</h2>
        </div>
        <pre>{`Default runtime: Groq Chat Completions
Optional local checkpoint: models_saved/polymentor-chatbot-lora
Website: React/Vite
API: FastAPI /chat /review /teach`}</pre>
      </section>
    </Layout>
  );
}

function WorkGuidePage() {
  return (
    <Layout>
      <section className="page-heading compact">
        <p className="eyebrow">
          <GitBranch size={16} aria-hidden="true" />
          Complete workflow
        </p>
        <h1>Build, test, improve, and share PolyMentor step by step.</h1>
      </section>
      <section className="section start-list">
        {workGuide.map((step) => {
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
        {runtimeFlow.map((item, index) => (
          <article className="architecture-row" key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}

function FineTunePage() {
  return (
    <Layout>
      <section className="page-heading">
        <p className="eyebrow">
          <BrainCircuit size={16} aria-hidden="true" />
          Local RTX fine-tuning
        </p>
        <h1>Train a small local adapter, then save it in models_saved.</h1>
      </section>
      <section className="section lab-grid">
        {fineTuneSteps.map((step, index) => (
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
          Use Python 3.12 for CUDA PyTorch on Windows. Your Python 3.14 venv is
          fine for Groq/API work, but not for RTX CUDA wheels.
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
          Hugging Face deployment
        </p>
        <h1>Publish the adapter on Hub and serve the chatbot from a Space.</h1>
      </section>
      <section className="section deploy-layout">
        <div>
          <div className="section-label">
            <Server size={18} aria-hidden="true" />
            <h2>HF Hub model repo</h2>
          </div>
          <div className="deploy-stack">
            {hubSteps.map((step, index) => (
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
            <h2>HF Space app</h2>
          </div>
          <div className="deploy-stack">
            {spaceSteps.map((step, index) => (
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
      <section className="section language-grid">
        {languages.map((language) => (
          <article className="signal-tile language-tile" key={language}>
            <TerminalSquare size={22} aria-hidden="true" />
            <strong>{language}</strong>
          </article>
        ))}
      </section>
      <section className="section roadmap-list">
        {[
          "Use Groq for fast coding answers.",
          "Use local LoRA checkpoints for experiments and demonstrations.",
          "Use Hugging Face Spaces to share the tutor with friends or a class.",
          "Keep outputs educational: bugs, explanation, fixed code, lesson, next steps.",
        ].map((item) => (
          <article className="roadmap-item" key={item}>
            <Code2 size={22} aria-hidden="true" />
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
      <Route path="/" element={<OverviewPage />} />
      <Route path="/work-guide" element={<WorkGuidePage />} />
      <Route path="/fine-tune" element={<FineTunePage />} />
      <Route path="/deploy" element={<DeployPage />} />
      <Route path="/languages" element={<LanguagesPage />} />
    </Routes>
  );
}
