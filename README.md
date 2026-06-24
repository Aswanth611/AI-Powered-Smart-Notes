# EduFlick AI - Smart Notes Analyzer

A modern, full-stack AI-powered Smart Notes & Action Item Dashboard. Students can paste long, messy lecture notes, video transcripts, or chapter content, and an LLM automatically parses and structures them into Key Summaries and an Interactive Action Items Checklist.

## Project Structure

```
grp 3/
├── README.md               # Setup and running instructions
├── backend/
│   ├── .env                # Server configuration and API keys
│   ├── server.js           # Main Express.js server entrypoint
│   ├── config/
│   │   └── aiPrompt.js     # Strict system prompt for LLM formatting
│   ├── controllers/
│   │   └── aiController.js # Groq API client & response validation
│   └── routes/
│       └── analyze.js      # REST endpoint (/api/analyze)
└── frontend/
    ├── package.json        # Frontend configuration and commands
    ├── index.html          # Web page wrapper
    ├── src/
    │   ├── main.jsx        # React entrypoint
    │   ├── index.css       # Tailwind config, glassmorphism tokens, and keyframes
    │   ├── App.jsx         # App state manager and dashboard layout
    │   └── components/
    │       ├── Header.jsx      # Top header
    │       ├── NotesInput.jsx  # Notes editor with character counters
    │       ├── SummaryList.jsx # AI concept cards
    │       ├── ActionList.jsx  # Checklist with progression statistics
    │       ├── Loader.jsx      # Animated scanner loader
    │       └── ErrorAlert.jsx  # Error message toast
```

---

## Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 1. Configure the Backend

1. Navigate to the `backend/` directory.
2. Open the `.env` file.
3. Replace the placeholder with your actual **Groq API Key**:
   ```env
   PORT=5000
   GROQ_API_KEY=gsk_your_actual_groq_api_key_goes_here
   GROQ_MODEL=llama-3.1-8b-instant
   ```
4. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

### 2. Configure the Frontend

1. Navigate to the `frontend/` directory.
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

---

## Running the Application

For a complete local execution experience, run the backend and frontend services in separate terminal windows.

### Start the Backend Service
From the `backend/` folder, run:
```bash
npm start
```
*The server will start running at [http://localhost:5000](http://localhost:5000).*

### Start the Frontend Dev Server
From the `frontend/` folder, run:
```bash
npm run dev
```
*Vite will start the development server at [http://localhost:5173](http://localhost:5173).*

---

## AI Prompt Configuration Details

The system makes use of Groq's Chat Completion API with strict JSON mode enabled. The instruction prompt is configured as follows:

```
You are an AI educational assistant.
Your job is to analyze raw student notes and convert them into structured study material.
Return ONLY valid JSON.
Do not include markdown.
Do not include explanations.
Do not include conversational text.

JSON FORMAT:
{
  "summary": [ ... ],
  "actionItems": [ ... ]
}
```

This guarantees that the dashboard receives predictable, clean arrays without extra conversational conversational overhead.
