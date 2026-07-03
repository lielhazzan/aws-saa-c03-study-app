import { useState } from 'react';
import { Moon, Sun, Calendar, Trash2, AlertTriangle } from 'lucide-react';
import { clearExamResults } from '../utils/storage';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [examDate, setExamDate] = useState(localStorage.getItem('examDate') || '');
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setExamDate(newDate);
    if (newDate) {
      localStorage.setItem('examDate', newDate);
    } else {
      localStorage.removeItem('examDate');
    }
  };

  const handleReset = async () => {
    try {
      await fetch('http://localhost:8001/api/results', { method: 'DELETE' });
      setShowConfirm(false);
      alert('כל נתוני ההתקדמות והציונים נמחקו בהצלחה ממסד הנתונים.');
      window.location.reload(); // Reload to refresh Dashboard stats
    } catch (err) {
      console.error("Failed to clear results", err);
      alert('שגיאה במחיקת הנתונים.');
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>הגדרות ⚙️</h1>
        <p style={{ color: 'var(--text-muted)' }}>התאם אישית את חווית הלמידה שלך.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Theme Settings */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            מראה וערכת נושא
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>בחר בין מצב יום למצב לילה.</p>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            החלף ל-{theme === 'dark' ? 'מצב יום' : 'מצב לילה'}
          </button>
        </div>

        {/* Exam Date */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} />
            יעד מבחן
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>הגדר את התאריך בו אתה ניגש למבחן כדי להציג ספירה לאחור במסך הבית.</p>
          <input 
            type="date" 
            value={examDate} 
            onChange={handleDateChange}
            style={{
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'rgba(0,0,0,0.1)',
              color: 'var(--text-main)',
              fontFamily: 'inherit',
              fontSize: '1rem',
              direction: 'ltr'
            }}
          />
        </div>

        {/* Data Management */}
        <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
            <AlertTriangle size={20} />
            ניהול נתונים
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            איפוס ההתקדמות שלך ימחק את כל היסטוריית המבחנים והציונים שנשמרו במערכת (לא ניתן לשחזור).
          </p>
          
          {!showConfirm ? (
            <button className="btn" style={{ background: 'var(--danger)', color: 'white' }} onClick={() => setShowConfirm(true)}>
              <Trash2 size={18} /> איפוס נתוני התקדמות
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>האם אתה בטוח?</span>
              <button className="btn" style={{ background: 'var(--danger)', color: 'white' }} onClick={handleReset}>כן, מחק הכל</button>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>ביטול</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Settings;
