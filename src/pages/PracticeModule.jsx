import { useState, useEffect } from 'react';
import { BrainCircuit, Play, CheckCircle, XCircle, Trophy, Clock, AlertCircle } from 'lucide-react';
import questionsData from '../data/questions.json';

// Utility for localStorage (since we need it for analytics)
import { saveExamResult } from '../utils/storage';

const PracticeModule = () => {
  const [activeMode, setActiveMode] = useState(null); // 'quick' or 'mock'
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // State for user answers
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: selectedOptionIndex }
  
  // For Quick Quiz (immediate feedback)
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Mock Exam Timer
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  
  // End of quiz state
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Timer effect for Mock Exam
  useEffect(() => {
    if (activeMode === 'mock' && !quizFinished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && activeMode === 'mock' && !quizFinished && activeQuestions.length > 0) {
      finishQuiz();
    }
  }, [timeLeft, activeMode, quizFinished, activeQuestions]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startQuiz = (mode) => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    const count = mode === 'quick' ? 5 : questionsData.length; // 5 for quick, all for mock (simulate 65)
    
    setActiveQuestions(shuffled.slice(0, count));
    setActiveMode(mode);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
    
    if (mode === 'mock') {
      setTimeLeft(72 * 60); // 72 minutes (proportional to 36 questions)
    }
  };

  const handleAnswerSelect = (index) => {
    if (activeMode === 'quick' && showExplanation) return;
    if (quizFinished) return;
    
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: index
    }));
  };

  const submitQuickAnswer = () => {
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else if (activeMode === 'quick') {
      finishQuiz();
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    // Calculate Score
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    
    setScore(correct);
    setQuizFinished(true);
    
    // Save to localStorage
    const percentage = Math.round((correct / activeQuestions.length) * 100);
    saveExamResult({ mode: activeMode, score: percentage, date: new Date().toISOString() });
  };

  if (activeMode) {
    if (quizFinished) {
      const percentage = Math.round((score / activeQuestions.length) * 100);
      const passed = percentage >= 72; // AWS passing score is 720/1000

      return (
        <div className="animate-fade-in glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          {passed ? (
            <Trophy size={60} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
          ) : (
            <AlertCircle size={60} color="var(--danger)" style={{ margin: '0 auto 1rem' }} />
          )}
          
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: passed ? 'var(--success)' : 'var(--danger)' }}>
            {passed ? 'עברת את המבחן!' : 'לא עברת את המבחן.'}
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            הציון שלך: {percentage}% ({score} מתוך {activeQuestions.length} תשובות נכונות)
          </p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            סף המעבר למבחן AWS Certified Solutions Architect הוא 72%.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => { setQuizFinished(false); setCurrentQuestionIndex(0); setShowExplanation(true); }}>
              סקור טעויות
            </button>
            <button className="btn btn-primary" onClick={() => setActiveMode(null)}>חזור למסך הראשי</button>
          </div>
        </div>
      );
    }

    const q = activeQuestions[currentQuestionIndex];
    const hasAnsweredCurrent = userAnswers[currentQuestionIndex] !== undefined;

    return (
      <div className="animate-fade-in glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          <span>שאלה {currentQuestionIndex + 1} מתוך {activeQuestions.length}</span>
          
          {activeMode === 'mock' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: timeLeft < 300 ? 'var(--danger)' : 'var(--accent-aws)' }}>
              <Clock size={18} />
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem', direction: 'ltr' }}>{formatTime(timeLeft)}</span>
            </div>
          )}
          
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
            {q.topic}
          </span>
        </div>
        
        <h2 style={{ fontSize: '1.3rem', marginBottom: '2rem', lineHeight: '1.6' }}>{q.text}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {q.options.map((opt, idx) => {
            let bgColor = 'rgba(255,255,255,0.05)';
            let borderColor = 'transparent';
            let icon = <Circle size={20} color="var(--text-muted)" />;
            
            const isSelected = userAnswers[currentQuestionIndex] === idx;

            if (showExplanation || (activeMode === 'mock' && quizFinished)) {
              if (idx === q.correctAnswer) {
                bgColor = 'rgba(16, 185, 129, 0.2)';
                borderColor = 'var(--success)';
                icon = <CheckCircle size={20} color="var(--success)" />;
              } else if (isSelected) {
                bgColor = 'rgba(239, 68, 68, 0.2)';
                borderColor = 'var(--danger)';
                icon = <XCircle size={20} color="var(--danger)" />;
              }
            } else if (isSelected) {
              bgColor = 'rgba(255, 153, 0, 0.2)';
              borderColor = 'var(--accent-aws)';
              icon = <CheckCircle size={20} color="var(--accent-aws)" />;
            }

            return (
              <div 
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  cursor: (showExplanation || quizFinished) ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  direction: 'ltr',
                  textAlign: 'left'
                }}
              >
                {icon}
                <span style={{ fontSize: '1.1rem' }}>{opt}</span>
              </div>
            );
          })}
        </div>

        {showExplanation && (
          <div className="animate-fade-in" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--accent-blue)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>הסבר:</h3>
            <p style={{ direction: 'ltr', textAlign: 'left', lineHeight: '1.5' }}>{q.explanation}</p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
           <button 
             className="btn btn-secondary" 
             onClick={prevQuestion} 
             disabled={currentQuestionIndex === 0}
             style={{ visibility: activeMode === 'mock' ? 'visible' : 'hidden' }}
           >
             שאלה קודמת
           </button>
           
           <div>
            {activeMode === 'quick' ? (
              !showExplanation ? (
                <button className="btn btn-primary" onClick={submitQuickAnswer} disabled={!hasAnsweredCurrent}>
                  בדוק תשובה
                </button>
              ) : (
                <button className="btn btn-primary" onClick={nextQuestion}>
                  {currentQuestionIndex + 1 < activeQuestions.length ? 'שאלה הבאה' : 'סיים בוחן'}
                </button>
              )
            ) : (
              // Mock Exam mode navigation
              currentQuestionIndex + 1 < activeQuestions.length ? (
                <button className="btn btn-primary" onClick={nextQuestion}>
                  שאלה הבאה
                </button>
              ) : (
                <button className="btn btn-primary" onClick={finishQuiz}>
                  הגש מבחן
                </button>
              )
            )}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1>מבחנים ותרגולים</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>בחן את הידע שלך והתכונן למבחן האמיתי SAA-C03.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Quick Quiz */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(255, 153, 0, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--accent-aws)' }}>
              <BrainCircuit size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>תרגול יומי (בוחן מהיר)</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>
            5 שאלות אקראיות עם בדיקה מיידית והסבר על כל שאלה. מצוין לשמירת חומר בזיכרון.
          </p>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => startQuiz('quick')}>
            <Play size={18} /> התחל בוחן
          </button>
        </div>

        {/* Mock Exam */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid rgba(255,153,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--danger)' }}>
              <Clock size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>סימולטור מבחן מלא</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>
            הדמיה של המבחן האמיתי. זמן מוקצב ({Math.round((questionsData.length / 65) * 130)} דקות), מעבר חופשי בין השאלות, והציון ניתן רק בסוף המבחן (רף מעבר: 72%).
          </p>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--danger)' }} onClick={() => startQuiz('mock')}>
            <Play size={18} /> התחל סימולציה
          </button>
        </div>

      </div>
    </div>
  );
};

// Simple icon implementations for the ones missing from imports
const Circle = ({ size, color }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>;

export default PracticeModule;
