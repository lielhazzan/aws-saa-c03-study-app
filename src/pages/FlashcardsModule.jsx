import { useState } from 'react';
import flashcardsData from '../data/flashcards.json';

const FlashcardsModule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    }, 150);
  };

  const currentCard = flashcardsData[currentIndex];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>כרטיסיות זיכרון (Flashcards)</h1>
        <p style={{ color: 'var(--text-muted)' }}>שנן עובדות קריטיות למבחן. לחץ על הכרטיס כדי להפוך אותו.</p>
      </header>

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
        <span style={{ color: 'var(--text-muted)', minWidth: '60px', textAlign: 'center' }}>{currentIndex + 1} / {flashcardsData.length}</span>
        <button className="btn btn-primary" onClick={nextCard}>הבא &rarr;</button>
      </div>
    </div>
  );
};

export default FlashcardsModule;
