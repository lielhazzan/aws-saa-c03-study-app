import { BookOpen, CheckCircle, Trophy, Clock, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getExamStats } from '../utils/storage';

const Dashboard = () => {
  const navigate = useNavigate();
  const [avgScore, setAvgScore] = useState(0);
  const [examsTaken, setExamsTaken] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [examDate, setExamDate] = useState(localStorage.getItem('examDate') || null);
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    getExamStats()
      .then(stats => {
        setAvgScore(stats.average_score);
        setExamsTaken(stats.total_exams);
      })
      .catch(err => console.error(err));

    fetch('http://localhost:8001/api/questions')
      .then(res => res.json())
      .then(data => setQuestionsCount(data.length))
      .catch(err => console.error(err));

    if (examDate) {
      const target = new Date(examDate);
      const today = new Date();
      const diffTime = target.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays >= 0 ? diffDays : 0);
    }
  }, []);

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1>ברוך שובך! 👋</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>מוכן להמשיך ללמוד לקראת תעודת AWS Solutions Architect?</p>
      </header>

      {/* Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        
        {daysLeft !== null && (
          <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--danger)' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--danger)' }}>
              <Clock size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{daysLeft}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>ימים עד למבחן!</p>
            </div>
          </div>
        )}
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(255, 153, 0, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--accent-aws)' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>45%</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>התקדמות בקורס</p>
          </div>
        </div>
        
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--accent-blue)' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{examsTaken}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>מבחנים שבוצעו</p>
          </div>
        </div>

        <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px', color: 'var(--success)' }}>
            <Trophy size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{avgScore}%</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>ממוצע סימולציות</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Continue Learning */}
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>המשך למידה</h2>
          
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ color: 'var(--accent-aws)', fontSize: '0.9rem', fontWeight: 500 }}>הבא בתור בסרטונים</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '4px' }}>Section 7: EC2 Instances - Deep Dive</h3>
              </div>
              <Clock size={20} color="var(--text-muted)" />
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              נלמד לעומק על סוגי מכונות, Security Groups, ואיך לבחור את המכונה הנכונה לארכיטקטורה.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/study')}>המשך צפייה</button>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ color: 'var(--accent-blue)', fontSize: '0.9rem', fontWeight: 500 }}>סיכום מומלץ לחזרה</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '4px' }}>IAM - Identity and Access Management</h3>
              </div>
              <BookOpen size={20} color="var(--text-muted)" />
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              רענון על Roles, Policies ו-Best Practices. מופיע הרבה במבחן!
            </p>
            <button className="btn btn-secondary" onClick={() => navigate('/study')}>קרא סיכום</button>
          </div>
        </section>

        {/* Quick Quiz */}
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>תרגול יומי</h2>
          <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <BrainCircuit size={40} color="var(--accent-aws)" />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>מוכן לאתגר?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              5 שאלות אקראיות מתוך מאגר ה-{questionsCount} שאלות כדי לשמור על החומר טרי בזיכרון.
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/practice')}>התחל בוחן מהיר</button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
