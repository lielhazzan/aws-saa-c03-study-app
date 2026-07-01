import { useState, useEffect } from 'react';
import { BrainCircuit, Play, CheckCircle, XCircle, Trophy, Clock, AlertCircle, Database, CheckSquare, Square } from 'lucide-react';


// Utility for localStorage (since we need it for analytics)
import { saveExamResult } from '../utils/storage';

const PracticeModule = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8001/api/questions')
      .then(res => res.json())
      .then(data => {
        setQuestionsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching questions:', err);
        setLoading(false);
      });
  }, []);
  const [activeMode, setActiveMode] = useState(null); // 'quick', 'standard', or 'full'
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // State for user answers
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: selectedOptionIndex }
  
  // For Quick Quiz (immediate feedback)
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Timer
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  
  // End of quiz state
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Timer effect for Mock Exams
  useEffect(() => {
    if ((activeMode === 'standard' || activeMode === 'full') && !quizFinished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && (activeMode === 'standard' || activeMode === 'full') && !quizFinished && activeQuestions.length > 0) {
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
    let count;
    let timeLimit;
    
    if (mode === 'quick') {
      count = 5;
      timeLimit = 0;
    } else if (mode === 'standard') {
      count = Math.min(65, questionsData.length);
      timeLimit = 130 * 60; // 130 minutes for 65 questions
    } else if (mode === 'full') {
      count = questionsData.length;
      timeLimit = count * 2 * 60; // 2 minutes per question
    }
    
    setActiveQuestions(shuffled.slice(0, count));
    setActiveMode(mode);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
    
    if (mode === 'standard' || mode === 'full') {
      setTimeLeft(timeLimit);
    }
  };

  const handleAnswerSelect = (index) => {
    if (activeMode === 'quick' && showExplanation) return;
    if (quizFinished) return;
    
    setUserAnswers(prev => {
      const q = activeQuestions[currentQuestionIndex];
      const currentAns = prev[currentQuestionIndex] || [];
      const isMulti = q.correctAnswers && q.correctAnswers.length > 1;

      let newAns;
      if (isMulti) {
        if (currentAns.includes(index)) {
          newAns = currentAns.filter(i => i !== index);
        } else {
          newAns = [...currentAns, index];
        }
      } else {
        newAns = [index];
      }

      return {
        ...prev,
        [currentQuestionIndex]: newAns
      };
    });
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

  const finishQuiz = async () => {
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      const uA = userAnswers[idx] || [];
      const cA = q.correctAnswers || [];
      if (uA.length > 0 && uA.length === cA.length && uA.every(val => cA.includes(val))) {
        correct++;
      }
    });

    setScore(correct);
    setQuizFinished(true);

    const percentage = Math.round((correct / activeQuestions.length) * 100);
    try {
      await saveExamResult({ mode: activeMode, score: percentage, date: new Date().toISOString() });
    } catch (err) {
      console.error('Failed to save exam result:', err);
    }
  };

  if (loading) {
    return <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>טוען שאלות מהשרת...</div>;
  }

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
    const currentAns = userAnswers[currentQuestionIndex] || [];
    const requiredAnswers = q.correctAnswers ? q.correctAnswers.length : 1;
    const hasAnsweredCurrent = currentAns.length === requiredAnswers;

    return (
      <div className="animate-fade-in glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          <span>שאלה {currentQuestionIndex + 1} מתוך {activeQuestions.length}</span>
          
          {(activeMode === 'standard' || activeMode === 'full') && (
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

        {requiredAnswers > 1 && (
          <div style={{ color: 'var(--accent-aws)', fontWeight: 'bold', marginBottom: '1.5rem', background: 'rgba(255, 153, 0, 0.1)', padding: '0.8rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-aws)' }}>
            שים לב: יש לבחור {requiredAnswers} תשובות נכונות
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {q.options.map((opt, idx) => {
            let bgColor = 'rgba(255,255,255,0.05)';
            let borderColor = 'transparent';
            
            const isSelected = currentAns.includes(idx);
            let icon = requiredAnswers > 1 
              ? (isSelected ? <CheckSquare size={20} color="var(--accent-aws)" /> : <Square size={20} color="var(--text-muted)" />)
              : (isSelected ? <CheckCircle size={20} color="var(--accent-aws)" /> : <Circle size={20} color="var(--text-muted)" />);

            if (showExplanation || ((activeMode === 'standard' || activeMode === 'full') && quizFinished)) {
              if (q.correctAnswers && q.correctAnswers.includes(idx)) {
                bgColor = 'rgba(16, 185, 129, 0.2)';
                borderColor = 'var(--success)';
                icon = requiredAnswers > 1 ? <CheckSquare size={20} color="var(--success)" /> : <CheckCircle size={20} color="var(--success)" />;
              } else if (isSelected) {
                bgColor = 'rgba(239, 68, 68, 0.2)';
                borderColor = 'var(--danger)';
                icon = requiredAnswers > 1 ? <XCircle size={20} color="var(--danger)" /> : <XCircle size={20} color="var(--danger)" />;
              }
            } else if (isSelected) {
              bgColor = 'rgba(255, 153, 0, 0.2)';
              borderColor = 'var(--accent-aws)';
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
                <div style={{ flexShrink: 0, display: 'flex' }}>
                  {icon}
                </div>
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
             style={{ visibility: (activeMode === 'standard' || activeMode === 'full') ? 'visible' : 'hidden' }}
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
              // Standard or Full mode navigation
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
        <p style={{ color: 'var(--accent-aws)', marginTop: '4px', fontSize: '0.9rem' }}>סה״כ שאלות במאגר: {questionsData.length}</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Quick Quiz */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(255, 153, 0, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--accent-aws)' }}>
              <BrainCircuit size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>תרגול קצר (5 שאלות)</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>
            5 שאלות אקראיות עם בדיקה מיידית והסבר אחרי כל שאלה. מצוין לרענון קצר ולשמירת חומר בזיכרון.
          </p>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => startQuiz('quick')}>
            <Play size={18} /> התחל בוחן
          </button>
        </div>

        {/* Standard Mock Exam */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid rgba(255,153,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--danger)' }}>
              <Clock size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>מבחן רשמי (65 שאלות)</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>
            הדמיה מדויקת של המבחן האמיתי. 65 שאלות, 130 דקות זמן קצוב. הציון והתשובות ניתנים רק בסוף המבחן.
          </p>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--danger)' }} onClick={() => startQuiz('standard')}>
            <Play size={18} /> התחל סימולציה
          </button>
        </div>

        {/* Full Database Exam */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--accent-blue)' }}>
              <Database size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>כל המאגר ({questionsData.length} שאלות)</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>
            אתגר אולטימטיבי: מעבר על כלל השאלות במאגר שלנו ברצף כדי להבטיח כיסוי מלא של כל הנושאים. מתאים לישורת האחרונה.
          </p>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--accent-blue)', color: 'white' }} onClick={() => startQuiz('full')}>
            <Play size={18} /> התחל אתגר
          </button>
        </div>

      </div>
    </div>
  );
};

// Simple icon implementations for the ones missing from imports
const Circle = ({ size, color }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>;

export default PracticeModule;
