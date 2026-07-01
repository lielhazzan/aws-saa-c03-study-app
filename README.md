# AWS Solutions Architect Associate (SAA-C03) - Study App

> **The Core Idea:** The main goal behind this project was to combine what I am actively learning in my course with my goal of preparing for the AWS Solutions Architect Associate exam in the best way possible. By building and using this application, I can solidify my understanding of AWS while having the ultimate study tool at my fingertips.

An interactive and advanced learning platform designed to help you prepare for and pass the AWS Certified Solutions Architect - Associate (SAA-C03) exam. 
Built with React + Vite, this application centralizes all your study materials, practice exams, and summaries in one convenient place.

## 🚀 Key Features

### 1. Dashboard
The main hub of the application. It tracks your progress, provides shortcuts to essential areas, and allows quick access to your next practice session or study module.

### 2. Study Module
Centralizes all your PDF summaries, categorized by topic.
- **How to use:** Click on a topic in the sidebar (e.g., "Global Infrastructure", "Amazon S3") to jump directly to the relevant page in the embedded PDF document.

### 3. Practice Module
A massive database of over 800 exam preparation questions (including both Single-Select and Multi-Select questions).
- **Quick Practice:** Answer a question and get immediate feedback with an explanation. Great for quick learning sessions.
- **Full Exam:** A true simulation of the actual exam - 65 questions with a timer. Your score and explanations will only be revealed at the end of the exam.
- **Multi-Select Questions:** When a question requires multiple answers, the system displays a prominent alert ("Note: Please select X correct answers") and uses Checkboxes instead of Radio Buttons. You must select the exact number of required answers to proceed.
- **Domain Score Breakdown:** Upon finishing a test, view your score segmented by the official SAA-C03 domains to pinpoint your weak areas.
- **Flag for Review:** Emulates the real exam experience by letting you flag questions and review a grid summary before final submission.

### 4. Flashcards
An excellent tool for memorizing concepts.
- **Spaced Repetition (Leitner System):** The app remembers your mastery level (1-5 stars) for each card and automatically prioritizes showing you the concepts you struggle with most.
- **Two-Way Learning:** Practice both `Words -> Service` and `Service -> Words` to ensure deep memorization.
- **How to use:** Read the card, flip it, and rate whether you remembered it or forgot it. Your progress is saved automatically!

### 5. Cheat Sheets
Quick tabular summaries designed to help you differentiate between similar AWS services – a key to success in the exam.
- **Available Categories:** Compute, Storage, Databases, Networking, Security, Integration, Management.
- **Examples:** Comparisons between ALB vs NLB, SQS vs SNS, and more.

### 6. Exam Tips
A collection of useful tips you should know before taking the exam (e.g., time management, strategies for eliminating incorrect answers, etc.).
- **The Ultimate Trigger List:** A comprehensive, categorized glossary mapping 20+ common exam keywords directly to their intended AWS services.
- **Exam Traps & Mantras:** Dedicated sections highlighting common exam pitfalls and the ultimate strategy for answering tricky questions.

### 7. AWS Services Glossary
A comprehensive English glossary of all AWS services relevant to the exam.
- **How to use:** Use the quick search bar to find a specific service (e.g., "Lambda" or "S3"), or filter by category. Each service includes a short summary and Key Exam Tips.

---

## 🗄️ Exam History & Database

Exam results (score, mode, date) are stored in a **SQLite database** on the backend (`backend/data/exams.db`), instead of the browser's `localStorage`. This means your history is preserved even if you clear browser data.

### API Endpoints:
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/results` | Save a new exam result |
| `GET` | `/api/results/stats` | Get total exams count & average mock score |
| `DELETE` | `/api/results` | Clear all exam history |

> **Note:** Theme and exam date are still stored in `localStorage` as they are personal UI preferences tied to the browser.

---

## 🛠️ Running the Project (For Developers)

The project is built with a Python FastAPI Backend and a React (Vite) Frontend.

> **IMPORTANT:** To run the application locally without Docker, you **must run BOTH** the backend server and the frontend server concurrently in separate terminal windows. Without the backend running, the frontend will not be able to load data (questions, flashcards, dictionary, etc.).

### Prerequisites:
- Python 3.8+
- Node.js installed (version 16 or higher).

### Backend Setup (Python):
1. Open a terminal in the `backend` directory.
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8001
   ```

### Frontend Setup (React):
1. Open a terminal in the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The application will be available in your browser at `http://localhost:5173`.

### Running with Docker Compose 🐳
If you prefer to run the entire stack (Frontend + Backend) using Docker, you can easily do so:
1. Ensure Docker and Docker Compose are installed.
2. Open a terminal in the root directory (`aws-test`).
3. Run the following command:
   ```bash
   docker-compose up -d --build
   ```
4. The application will be available at `http://localhost` (port 80), and the backend API at `http://localhost:8001`.

---

**Disclaimer:** Whoever wants to use this application is more than welcome to enjoy it! However, please note that I do not guarantee the information here is 100% up to date or completely accurate. This is simply my personal way of studying for the exam.

**Good luck with your studies and the certification exam! 🎓**
