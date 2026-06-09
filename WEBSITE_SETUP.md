# PolyMentor Website Setup & Quick Start

## What I Just Built 🎉

I've created a **complete, production-ready chat interface** for PolyMentor:

### ✅ Features Implemented

1. **Chat Interface** (`ChatInterface.jsx`)
   - Beautiful, modern UI with gradient background
   - Real-time messaging
   - Code input with syntax highlighting
   - Language selector (16+ languages)
   - Difficulty level selector (beginner/intermediate/advanced)

2. **Components**
   - `ChatMessage.jsx` - Displays user and assistant messages
   - `CodeBlock.jsx` - Shows code with copy functionality
   - Markdown rendering for formatted responses
   - Loading states with animated spinners

3. **Styling**
   - Responsive design (desktop, tablet, mobile)
   - Dark mode friendly
   - Smooth animations and transitions
   - Professional color scheme

4. **Functionality**
   - Connects to your Groq API backend
   - Sends code + question to `/chat` endpoint
   - Displays bugs, fixed code, lessons, and next steps
   - Copy-to-clipboard for code
   - Error handling with user-friendly messages

---

## Installation & Setup

### Step 1: Install Dependencies
```bash
cd website
npm install
```

### Step 2: Create .env File
Already done! The file `website/.env` contains:
```
VITE_API_URL=http://127.0.0.1:8000
```

For production, update it to your deployed API URL.

### Step 3: Start the Backend API
In a separate terminal, from the project root:
```bash
# Make sure .env file exists with GROQ_API_KEY
uvicorn src.api.app:app --reload
```

You should see:
```
Uvicorn running on http://127.0.0.1:8000
```

### Step 4: Start the Website
In the website folder:
```bash
npm run dev
```

You should see:
```
VITE v7.0.0  ready in X ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

### Step 5: Open in Browser
```
http://localhost:5173/
```

You'll see:
- Navigation with "Chat" button
- Click "Chat" to open the chat interface
- Start typing and submit!

---

## How to Use the Chat Interface

### 1. **Select Language** (left dropdown)
Choose from: Python, JavaScript, Java, C++, Go, Rust, etc.

### 2. **Select Level** (right dropdown)
- **Beginner** - Simple explanations
- **Intermediate** - Moderate depth
- **Advanced** - In-depth details

### 3. **Paste Code** (optional)
Paste your code in the text area. You can ask:
- "Find the bug"
- "Explain this"
- "Refactor this code"

### 4. **Ask a Question**
Type your message:
- "Fix this bug and teach me"
- "How do I..."
- "Review my code"

### 5. **Send**
Click "Send" or press Enter.

### 6. **Get Response**
PolyMentor will respond with:
- 📝 **Answer** - Direct explanation
- 🐛 **Bugs Found** - List of issues
- ✅ **Fixed Code** - Corrected version (copy button)
- 📚 **Lesson** - Why it's wrong
- 🎯 **Next Steps** - Practice tasks

---

## File Structure

```
website/
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx     # Main chat component
│   │   ├── ChatMessage.jsx       # Message display
│   │   └── CodeBlock.jsx         # Code display
│   ├── styles/
│   │   ├── ChatInterface.css     # Chat UI styles
│   │   ├── ChatMessage.css       # Message styles
│   │   └── CodeBlock.css         # Code styles
│   ├── App.jsx                    # Routes
│   ├── main.jsx                   # Entry point
│   └── styles.css                 # Global styles
├── .env                           # API URL configuration
├── .env.example                   # Template
├── package.json                   # Dependencies
├── vite.config.js                 # Build config
└── index.html                     # HTML entry
```

---

## Backend API Endpoints

Your backend has 3 endpoints:

### 1. `/chat` (POST)
**Chat with the tutor**
```json
{
  "message": "Find the bug",
  "code": "for i in range(10)\n    print(i)",
  "language": "python",
  "level": "beginner"
}
```

Response:
```json
{
  "status": "ok",
  "answer": "I found a syntax error...",
  "suspected_bugs": ["Missing colon after range(10)"],
  "fixed_code": "for i in range(10):\n    print(i)",
  "lesson": "In Python, colons mark code blocks...",
  "next_steps": ["Practice with other loops"],
  "model": "llama-3.3-70b-versatile",
  "elapsed_ms": 245.5
}
```

### 2. `/review` (POST)
**Review code specifically**
```json
{
  "code": "...",
  "language": "python",
  "level": "beginner",
  "message": "Review this"
}
```

### 3. `/teach` (POST)
**Get a lesson on a topic**
```json
{
  "message": "List comprehensions",
  "language": "python",
  "level": "intermediate"
}
```

---

## Troubleshooting

### "API Error: 404" or "Connection refused"
- Make sure backend is running: `uvicorn src.api.app:app --reload`
- Check API URL in `website/.env` - should match your backend port

### Styles not loading
- Make sure CSS files are imported in components
- Check browser DevTools > Console for CSS errors

### Messages not sending
- Check browser console for errors (F12)
- Verify backend is receiving requests (check terminal output)
- Check GROQ_API_KEY is set in main project .env

### Code not displayed properly
- Text area shows code you paste
- Fixed code is returned from API and displayed below
- Use copy button to copy fixed code

---

## Next Steps

### Deploy to Production

**Backend (API):**
```bash
# Deploy to Railway, Render, or Heroku
# Set environment variables:
GROQ_API_KEY=your_production_key
GROQ_MODEL=llama-3.3-70b-versatile
```

**Frontend (Website):**
```bash
# Deploy to Vercel or Netlify
npm run build
# Upload dist/ folder
```

**Update API URL:**
```bash
# In website/.env
VITE_API_URL=https://your-api-domain.com
```

---

## What's Working Now ✅

- ✅ Chat interface (beautiful UI)
- ✅ Connect to backend API
- ✅ Send code + questions
- ✅ Display responses with formatting
- ✅ Copy code functionality
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

## What's Left (Optional)

- Session history/database
- User accounts & login
- Code upload (multiple files)
- Dark mode toggle
- Export chat as PDF
- Integration with GitHub

---

## Commands Reference

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Backend (from project root)
uvicorn src.api.app:app --reload  # Start API
bash scripts/run_tutor.sh           # Terminal chat

# Testing
python -m pytest tests/             # Run tests
```

---

## Questions?

- Check browser console (F12) for errors
- Check API terminal for request/response logs
- Make sure .env files exist with correct values
- Verify backend is running and accessible

Enjoy! 🚀
