import { useState, useEffect } from 'react';
import localFlashcardsData from '../data/flashcards.json';

const FlashcardsModule = () => {
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFlashcardsData(localFlashcardsData);
    setLoading(false);
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState('All');

  // Derive unique keywords
  const allKeywords = ['All', ...new Set(flashcardsData.flatMap(card => card.tags || []))].filter(Boolean);

  // Filter cards based on selection
  const filteredCards = selectedKeyword === 'All' 
    ? flashcardsData 
    : flashcardsData.filter(card => card.tags && card.tags.includes(selectedKeyword));

  // Reset index when keyword changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedKeyword]);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  if (loading) {
    return <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>טוען כרטיסיות מהשרת...</div>;
  }

  if (flashcardsData.length === 0) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>אין נתונים.</div>;
  }

  const currentCard = filteredCards[currentIndex];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>כרטיסיות זיכרון (Flashcards)</h1>
        <p style={{ color: 'var(--text-muted)' }}>שנן עובדות קריטיות למבחן. לחץ על הכרטיס כדי להפוך אותו.</p>
      </header>

      {allKeywords.length > 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', maxWidth: '800px' }}>
          {allKeywords.map(keyword => (
            <button
              key={keyword}
              onClick={() => setSelectedKeyword(keyword)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid var(--accent-aws)',
                background: selectedKeyword === keyword ? 'var(--accent-aws)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedKeyword === keyword ? '#000' : 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: selectedKeyword === keyword ? 'bold' : 'normal',
                fontSize: '0.9rem'
              }}
            >
              {keyword === 'All' ? 'הכל' : keyword}
            </button>
          ))}
        </div>
      )}

      {filteredCards.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>אין כרטיסיות למילת מפתח זו.</div>
      ) : (
        <>

      <div 
        style={{
          width: '100%',
          maxWidth: '600px',
          height: '300px',
          perspective: '1000px',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)'
        }}>
          {/* Front */}
          <div className="glass-panel" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            fontSize: '1.5rem',
            direction: 'ltr'
          }}>
            {currentCard.front}
          </div>
          
          {/* Back */}
          <div className="glass-panel" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: 'var(--accent-aws)',
            direction: 'ltr',
            transform: 'rotateX(180deg)'
          }}>
            {currentCard.back}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={prevCard}>&larr; קודם</button>
        <span style={{ color: 'var(--text-muted)', minWidth: '60px', textAlign: 'center' }}>{currentIndex + 1} / {filteredCards.length}</span>
        <button className="btn btn-primary" onClick={nextCard}>הבא &rarr;</button>
      </div>
      </>
      )}
    </div>
  );
};

export default FlashcardsModule;
