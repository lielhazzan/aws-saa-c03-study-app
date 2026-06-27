import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudyModule from './pages/StudyModule';
import PracticeModule from './pages/PracticeModule';
import FlashcardsModule from './pages/FlashcardsModule';
import CheatSheets from './pages/CheatSheets';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/study" element={<StudyModule />} />
            <Route path="/practice" element={<PracticeModule />} />
            <Route path="/flashcards" element={<FlashcardsModule />} />
            <Route path="/cheatsheets" element={<CheatSheets />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
