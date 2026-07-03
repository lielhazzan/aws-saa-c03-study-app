import { useState, useEffect } from 'react';
import { BrainCircuit, Play, CheckCircle, XCircle, Trophy, Clock, AlertCircle, Database, CheckSquare, Square, Flag } from 'lucide-react';


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
        console.error("Failed to fetch questions:", err);
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
  const [quizState, setQuizState] = useState('active'); // 'active', 'review', 'finished'
  const [score, setScore] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [domainResults, setDomainResults] = useState({});

  const domainMapping = {
    'Security': 'Domain 1: Design Secure Architectures',
    'Security & Compliance': 'Domain 1: Design Secure Architectures',
    'Domain 3: Design Secure Applications and Architectures': 'Domain 1: Design Secure Architectures',
    
    'EC2 & High Availability': 'Domain 2: Design Resilient Architectures',
    'VPC & Networking': 'Domain 2: Design Resilient Architectures',
    'Compute & Decoupling': 'Domain 2: Design Resilient Architectures',
    'Networking & Content Delivery': 'Domain 2: Design Resilient Architectures',
    'Domain 1: Design Resilient Architectures': 'Domain 2: Design Resilient Architectures',
    
    'Amazon S3': 'Domain 3: Design High-Performing Architectures',
    'Databases': 'Domain 3: Design High-Performing Architectures',
    'Serverless': 'Domain 3: Design High-Performing Architectures',
    'Storage': 'Domain 3: Design High-Performing Architectures',
    'Compute': 'Domain 3: Design High-Performing Architectures',
    'Analytics': 'Domain 3: Design High-Performing Architectures',
    'Integration': 'Domain 3: Design High-Performing Architectures',
    'Domain 2: Design High-Performing Architectures': 'Domain 3: Design High-Performing Architectures',
    
    'Management': 'Domain 4: Design Cost-Optimized Architectures',
    'Management & Governance': 'Domain 4: Design Cost-Optimized Architectures',
    'Monitoring & Logging': 'Domain 4: Design Cost-Optimized Architectures',
    'Domain 4: Design Cost-Optimized Architectures': 'Domain 4: Design Cost-Optimized Architectures',
  };
  const getDomain = (topic) => domainMapping[topic] || 'Other';

  // Timer effect for Mock Exams
  useEffect(() => {
    if ((activeMode === 'standard' || activeMode === 'full') && quizState !== 'finished' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && (activeMode === 'standard' || activeMode === 'full') && quizState !== 'finished' && activeQuestions.length > 0) {
      finishQuiz();
    }
  }, [timeLeft, activeMode, quizState, activeQuestions]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startQuiz = (mode, selectedTopic = null) => {
    if (!questionsData || questionsData.length === 0) {
      alert("שגיאה: לא נטענו שאלות מהשרת. אנא ודא שהשרת פועל ורענן את העמוד.");
      return;
    }

    let filteredQuestions = questionsData;
    if (mode === 'topic' && selectedTopic) {
      filteredQuestions = questionsData.filter(q => q.topic === selectedTopic);
    }
    
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    let count;
    let timeLimit = 0;
    
    if (mode === 'quick') {
      count = 5;
    } else if (mode === 'standard') {
      count = Math.min(65, filteredQuestions.length);
      timeLimit = 130 * 60; // 130 minutes for 65 questions
    } else if (mode === 'full' || mode === 'topic') {
      count = filteredQuestions.length;
      timeLimit = count * 2 * 60; // 2 minutes per question
    }
    
    setActiveQuestions(shuffled.slice(0, count));
    setActiveMode(mode);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowExplanation(false);
    setScore(0);
    setQuizState('active');
    setFlaggedQuestions(new Set());
    setDomainResults({});
    
    if (mode === 'standard' || mode === 'full') {
      setTimeLeft(timeLimit);
    }
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newFlags = new Set(prev);
      if (newFlags.has(currentQuestionIndex)) {
        newFlags.delete(currentQuestionIndex);
      } else {
        newFlags.add(currentQuestionIndex);
      }
      return newFlags;
    });
  };

  const handleAnswerSelect = (index) => {
    if (activeMode === 'quick' && showExplanation) return;
    if (quizState === 'finished') return;
    
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
    const domainStats = {
      'Domain 1: Design Secure Architectures': { correct: 0, total: 0 },
      'Domain 2: Design Resilient Architectures': { correct: 0, total: 0 },
      'Domain 3: Design High-Performing Architectures': { correct: 0, total: 0 },
      'Domain 4: Design Cost-Optimized Architectures': { correct: 0, total: 0 },
      'Other': { correct: 0, total: 0 }
    };

    activeQuestions.forEach((q, idx) => {
      const uA = userAnswers[idx] || [];
      const cA = q.correctAnswers || [];
      const isCorrect = uA.length > 0 && uA.length === cA.length && uA.every(val => cA.includes(val));
      
      if (isCorrect) correct++;

      const domain = getDomain(q.topic);
      domainStats[domain].total++;
      if (isCorrect) domainStats[domain].correct++;
    });

    setScore(correct);
    setDomainResults(domainStats);
    setQuizState('finished');

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
    if (quizState === 'review') {
      return (
        <div className="animate-fade-in glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>סקירת שאלות לפני הגשה</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(45px, 1fr))', gap: '10px', marginBottom: '3rem', direction: 'ltr' }}>
            {activeQuestions.map((q, idx) => {
              const reqAnswers = q.correctAnswers ? q.correctAnswers.length : 1;
              const isAnswered = userAnswers[idx] && userAnswers[idx].length === reqAnswers;
              const isFlagged = flaggedQuestions.has(idx);
              return (
                <button
                  key={idx}
                  onClick={() => { setCurrentQuestionIndex(idx); setQuizState('active'); }}
                  style={{
                    position: 'relative',
                    padding: '10px 5px',
                    borderRadius: '6px',
                    border: isFlagged ? '2px solid var(--danger)' : '1px solid var(--border-color)',
                    background: isAnswered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {idx + 1}
                  {isFlagged && <Flag size={12} style={{ position: 'absolute', top: '-6px', right: '-6px', color: 'var(--danger)', background: 'var(--bg-card)', borderRadius: '50%' }} />}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => { setCurrentQuestionIndex(0); setQuizState('active'); }}>חזור למבחן</button>
            <button className="btn btn-primary" style={{ background: 'var(--danger)', border: 'none' }} onClick={finishQuiz}>הגש סופית</button>
          </div>
        </div>
      );
    }

    if (quizState === 'finished') {
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
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            הציון שלך: {percentage}% ({score} מתוך {activeQuestions.length} תשובות נכונות)
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            סף המעבר למבחן AWS Certified Solutions Architect הוא 72%.
          </p>

          <div style={{ textAlign: 'left', margin: '2rem 0', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', direction: 'ltr' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-aws)' }}>Domain Breakdown</h3>
            {Object.entries(domainResults).filter(([d, stats]) => stats.total > 0).map(([domain, stats]) => {
              const pct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={domain} style={{ marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: '500' }}>{domain}</span>
                    <span>{pct}% ({stats.correct}/{stats.total})</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: pct >= 72 ? 'var(--success)' : 'var(--danger)', transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => { setQuizState('active'); setCurrentQuestionIndex(0); setShowExplanation(true); }}>
              סקור טעויות
            </button>
            <button className="btn btn-primary" onClick={() => setActiveMode(null)}>חזור למסך הראשי</button>
          </div>
        </div>
      );
    }

    const q = activeQuestions[currentQuestionIndex];
    if (!q) {
      return (
        <div className="animate-fade-in glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger)' }}>
          <h2>שגיאה: לא נמצאה השאלה המבוקשת.</h2>
          <button className="btn btn-secondary" onClick={() => setActiveMode(null)} style={{ marginTop: '1rem' }}>חזור אחורה</button>
        </div>
      );
    }
    
    const currentAns = userAnswers[currentQuestionIndex] || [];
    const requiredAnswers = q.correctAnswers ? q.correctAnswers.length : 1;
    const hasAnsweredCurrent = currentAns.length === requiredAnswers;

    return (
      <div className="animate-fade-in glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>שאלה {currentQuestionIndex + 1} מתוך {activeQuestions.length}</span>
            {activeMode !== 'quick' && !showExplanation && quizState !== 'finished' && (
              <button 
                onClick={toggleFlag}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', 
                  border: '1px solid ' + (flaggedQuestions.has(currentQuestionIndex) ? 'var(--danger)' : 'var(--border-color)'), 
                  color: flaggedQuestions.has(currentQuestionIndex) ? 'var(--danger)' : 'var(--text-muted)',
                  padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <Flag size={14} /> {flaggedQuestions.has(currentQuestionIndex) ? 'סומן' : 'סמן'}
              </button>
            )}
          </div>
          
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

            if (showExplanation || ((activeMode === 'standard' || activeMode === 'full') && quizState === 'finished')) {
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
                  cursor: (showExplanation || quizState === 'finished') ? 'default' : 'pointer',
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
                <button className="btn btn-primary" onClick={() => setQuizState('review')}>
                  סקור מבחן והגש
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

        {/* Topic Quiz */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--success)' }}>
              <CheckSquare size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>תרגול לפי נושא</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>
            בחר נושא ספציפי מהרשימה כדי לתרגל רק את השאלות השייכות לאותו נושא.
          </p>
          
          <select 
            onChange={(e) => {
              if(e.target.value) {
                startQuiz('topic', e.target.value);
                e.target.value = ""; // Reset for next time
              }
            }}
            style={{ 
              width: '100%', 
              padding: '0.8rem', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              background: 'rgba(0,0,0,0.2)', 
              color: 'var(--text-main)', 
              cursor: 'pointer', 
              fontSize: '1rem' 
            }}
          >
            <option value="">-- בחר נושא לתרגול --</option>
            {[...new Set(questionsData.map(q => q.topic))].filter(Boolean).map(topic => (
              <option key={topic} value={topic}>{topic} ({questionsData.filter(q => q.topic === topic).length} שאלות)</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

// Simple icon implementations for the ones missing from imports
const Circle = ({ size, color }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>;

export default PracticeModule;
