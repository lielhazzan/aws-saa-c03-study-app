import { useState, useEffect } from 'react';
import { BookOpen, Video, CheckCircle, Circle, PlayCircle } from 'lucide-react';
import courseData from '../data/courseData.json';

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
  const [activeTab, setActiveTab] = useState('course');
  const [activeSection, setActiveSection] = useState(courseData[3]); // Start at some section (e.g., IAM)
  const [activeVideo, setActiveVideo] = useState(null);
  const [pdfPage, setPdfPage] = useState(1);

  // Auto select first video when section changes
  useEffect(() => {
    if (activeSection && activeSection.videos && activeSection.videos.length > 0) {
      setActiveVideo(activeSection.videos[0]);
    } else {
      setActiveVideo(null);
    }
  }, [activeSection]);

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1>קורס וסיכומים</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>צפה בסרטוני הקורס המקוריים ולמד מהסיכומים.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <button 
          className={`btn ${activeTab === 'course' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('course')}
        >
          <Video size={18} />
          קורס Udemy 
        </button>
        <button 
          className={`btn ${activeTab === 'summaries' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('summaries')}
        >
          <BookOpen size={18} />
          סיכומים שלי
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 3fr', gap: '2rem', height: 'calc(100vh - 180px)' }}>
        {/* Navigation Sidebar */}
        <div className="glass" style={{ padding: '1rem', height: '100%', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '1rem', padding: '0 0.5rem', position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 10 }}>
            {activeTab === 'course' ? 'פרקי הקורס' : 'נושאים'}
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeTab === 'course' && courseData.map(section => (
              <li key={section.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  onClick={() => setActiveSection(section)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '12px',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: activeSection?.id === section.id ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                    color: activeSection?.id === section.id ? 'var(--text-main)' : 'var(--text-muted)'
                  }}
                >
                  <div style={{ marginTop: '2px' }}>
                    <Circle size={16} color={activeSection?.id === section.id ? 'var(--accent-aws)' : 'var(--border-color)'} />
                  </div>
                  <span style={{ fontSize: '0.9rem', lineHeight: '1.4', fontWeight: activeSection?.id === section.id ? 'bold' : 'normal' }}>{section.title}</span>
                </div>
                
                {/* Videos for the active section */}
                {activeSection?.id === section.id && (
                  <div style={{ paddingRight: '28px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {section.videos.map((video, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setActiveVideo(video)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: activeVideo?.filename === video.filename ? 'rgba(255,153,0,0.15)' : 'transparent',
                          color: activeVideo?.filename === video.filename ? 'var(--accent-aws)' : 'var(--text-muted)',
                          transition: 'all 0.2s'
                        }}
                      >
                        <PlayCircle size={14} />
                        <span style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{video.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
            {activeTab === 'summaries' && toc.map(item => (
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
          {activeTab === 'course' ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-aws)' }}>{activeSection?.title}</h2>
              
              {activeVideo ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <video 
                    controls 
                    autoPlay={false}
                    src={activeVideo.path} 
                    style={{ width: '100%', maxHeight: '60vh', borderRadius: '12px', background: '#000', outline: 'none' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <h3 style={{ marginTop: '1.5rem', fontSize: '1.2rem' }}>{activeVideo.title}</h3>
                </div>
              ) : (
                 <p style={{ color: 'var(--text-muted)' }}>אנא בחר סרטון מהרשימה בצד.</p>
              )}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyModule;
