import { useState } from 'react';
import { BookOpen } from 'lucide-react';

const toc = [
  { title: "תשתיות גלובליות ויסודות האבטחה", page: 1 },
  { title: "ניהול הרשאות וארגון (IAM & AWS Organizations)", page: 3 },
  { title: "שירות אחסון אובייקטים (Amazon S3)", page: 4 },
  { title: "הפצת תוכן ומיגרציית נתונים", page: 7 },
  { title: "אנליזה ואבטחת מידע באחסון", page: 8 },
  { title: "שרתי מחשוב וירטואליים (Amazon EC2)", page: 9 },
  { title: "דיסקים ורכיבי רשת למחשוב (Amazon EBS)", page: 10 },
  { title: "בסיסי נתונים וענן המידע (Databases)", page: 18 },
  { title: "ניהול הרשאות מתקדם (Advanced IAM)", page: 23 },
  { title: "שירותי ניתוב, שמות ואינטרנט (Route 53 / DNS)", page: 26 },
  { title: "רשתות וענן פרטי וירטואלי (VPC)", page: 28 },
  { title: "זמינות גבוהה, איזון עומסים וגידול אוטומטי", page: 38 },
  { title: "אינטגרציית אפליקציות, תורים והודעות", page: 44 },
  { title: "אבטחת מידע, הגנה והצפנות", page: 52 },
  { title: "ארכיטקטורת שרתים ללא שרת (Serverless)", page: 55 },
  { title: "קונטיינרים וניהול סביבות (Containers)", page: 59 }
];

const StudyModule = () => {
  const [pdfPage, setPdfPage] = useState(1);

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1>קורס וסיכומים</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>למד מהסיכומים המקיפים בעברית.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 3fr', gap: '2rem', height: 'calc(100vh - 180px)' }}>
        {/* Navigation Sidebar */}
        <div className="glass" style={{ padding: '1rem', height: '100%', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '1rem', padding: '0 0.5rem', position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 10 }}>
            נושאים
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {toc.map(item => (
              <li 
                key={item.page}
                onClick={() => setPdfPage(item.page)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px',
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: pdfPage === item.page ? 'rgba(255, 153, 0, 0.1)' : 'transparent',
                  color: pdfPage === item.page ? 'var(--text-main)' : 'var(--text-muted)'
                }}
              >
                <div style={{ marginTop: '2px' }}>
                  <BookOpen size={16} color={pdfPage === item.page ? 'var(--accent-aws)' : 'var(--border-color)'} />
                </div>
                <span style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="glass-panel" style={{ padding: '2rem', minHeight: '60vh' }}>
          <div style={{ height: '100%', width: '100%' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--accent-aws)' }}>הסיכומים שלי בעברית</h2>
            <iframe 
              key={pdfPage}
              src={`/summaries.pdf#page=${pdfPage}`} 
              width="100%" 
              height="700px" 
              style={{ border: 'none', borderRadius: '12px' }}
              title="Hebrew Summaries"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyModule;
