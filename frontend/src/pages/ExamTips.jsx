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

        <div className="glass-panel" style={{ padding: '2rem', marginTop: '1rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-aws)' }}>
            מילים שמפעילות טריגרים (Trigger Phrases) 🎯
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            מילות מפתח שאתה רואה בשאלה, מה הן מסמנות, ולאיזה שירות הן מכוונות.
          </p>

          <div style={{ overflowX: 'auto', direction: 'ltr' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--accent-aws)', fontSize: '0.85rem', letterSpacing: '1px' }}>
                  <th style={{ padding: '1rem', textTransform: 'uppercase' }}>Trigger Phrase</th>
                  <th style={{ padding: '1rem', textTransform: 'uppercase' }}>What It Means</th>
                  <th style={{ padding: '1rem', textTransform: 'uppercase' }}>Service</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { trigger: "cost is critical / lowest cost AND interruptible", meaning: "workload tolerates interruptions, optimize price", service: "Spot Instances" },
                  { trigger: "uninterrupted / cannot tolerate interruption", meaning: "rules OUT Spot even if cost is mentioned", service: "On-Demand / Reserved" },
                  { trigger: "steady state / always running / predictable", meaning: "commit long-term for big discount", service: "Reserved Instances" },
                  { trigger: "flexible commitment / commit to spend across families", meaning: "$/hour commitment, not tied to instance type", service: "Savings Plans" },
                  { trigger: "short-term / unpredictable / first-time", meaning: "no commitment, pay as you go", service: "On-Demand" },
                  { trigger: "right-size / reduce over-provisioning", meaning: "recommendations to cut waste", service: "Compute Optimizer" },
                  { trigger: "highest IOPS / temporary / ephemeral / scratch", meaning: "fast local disk, data lost on stop", service: "Instance Store" },
                  { trigger: "single instance / boot volume / block storage", meaning: "persistent disk for one instance", service: "EBS" },
                  { trigger: "shared file system / multiple Linux instances / NFS", meaning: "one file system many instances", service: "EFS" },
                  { trigger: "Windows file server / SMB / Active Directory", meaning: "Windows-native shared files", service: "FSx for Windows" }
                ].map((row, idx) => (
                  <tr key={idx} style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    backgroundColor: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    transition: 'background-color 0.2s'
                  }}>
                    <td style={{ padding: '1.2rem 1rem', fontWeight: '500', color: '#e2e8f0' }}>{row.trigger}</td>
                    <td style={{ padding: '1.2rem 1rem', color: 'var(--text-muted)' }}>{row.meaning}</td>
                    <td style={{ padding: '1.2rem 1rem', fontWeight: 'bold', color: '#c084fc' }}>{row.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExamTips;
