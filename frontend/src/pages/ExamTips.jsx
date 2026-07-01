import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import localTipsData from '../data/tips.json';

const ExamTips = () => {
  const [tipsData, setTipsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTipsData(localTipsData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>טוען טיפים מהשרת...</div>;
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>טיפים למבחן SAA-C03 💡</h1>
        <p style={{ color: 'var(--text-muted)' }}>אסטרטגיות למבחן, ניהול זמן, ואיך לגשת לשאלות מורכבות.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {tipsData.map((section, index) => (
          <div key={index} className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--accent-aws)' }}>
              <Lightbulb size={24} />
              {section.category}
            </h2>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {section.tips.map((tip, tipIndex) => (
                <li key={tipIndex} style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(255,153,0,0.05)', 
                  borderRight: '4px solid var(--accent-aws)',
                  marginBottom: '1rem',
                  borderRadius: '4px',
                  lineHeight: '1.6'
                }}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamTips;
