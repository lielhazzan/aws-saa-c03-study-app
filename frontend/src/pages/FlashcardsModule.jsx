import { useState, useEffect, useMemo } from 'react';
import localServicesData from '../data/aws_services.json';
import { Shuffle, ChevronLeft, ChevronRight, RefreshCw, XCircle, CheckCircle } from 'lucide-react';

const FlashcardsModule = () => {
  const [mode, setMode] = useState('words-to-service'); // 'words-to-service' or 'service-to-words'
  const [selectedTopic, setSelectedTopic] = useState('All topics');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState([]);
  const [masteryLevels, setMasteryLevels] = useState({});

  // Topics list
  const topics = ['All topics', ...new Set(localServicesData.map(s => s.category))];

  // Load mastery from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('flashcards_mastery');
    if (stored) {
      try {
        setMasteryLevels(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse mastery levels");
      }
    }
  }, []);

  useEffect(() => {
    // Generate cards based on topic
    let filtered = localServicesData;
    if (selectedTopic !== 'All topics') {
      filtered = localServicesData.filter(s => s.category === selectedTopic);
    }
    
    const formattedCards = filtered.map(service => ({
      topic: service.category,
      service: service.name,
      words: service.examTips && service.examTips.length > 0 ? service.examTips : [service.description],
      mastery: masteryLevels[service.name] || 0
    }));
    
    // Sort so cards with lower mastery appear first (spaced repetition)
    const sortedCards = formattedCards.sort((a, b) => {
      const diff = (a.mastery || 0) - (b.mastery || 0);
      if (diff !== 0) return diff + (Math.random() - 0.5); // Prioritize lower mastery, add slight randomness
      return 0.5 - Math.random();
    });
    
    setCards(sortedCards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedTopic, masteryLevels]);

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleFeedback = (remembered) => {
    const currentCard = cards[currentIndex];
    const currentMastery = masteryLevels[currentCard.service] || 0;
    
    let newMastery = currentMastery;
    if (remembered) {
      newMastery = Math.min(5, currentMastery + 1);
    } else {
      newMastery = 0; // Reset mastery if forgotten
    }
    
    const newMasteryLevels = { ...masteryLevels, [currentCard.service]: newMastery };
    setMasteryLevels(newMasteryLevels);
    localStorage.setItem('flashcards_mastery', JSON.stringify(newMasteryLevels));
    
    // Move to next card
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (cards.length === 0) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>אין נתונים.</div>;
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap', direction: 'ltr' }}>
        
        {/* Topic Dropdown */}
        <select 
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontSize: '1rem',
            minWidth: '200px',
            outline: 'none'
          }}
        >
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        {/* Mode Toggle */}
        <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => { setMode('words-to-service'); setIsFlipped(false); }}
            style={{
              padding: '0.6rem 1.2rem',
              background: mode === 'words-to-service' ? '#48dfcb' : 'var(--bg-card)',
              color: mode === 'words-to-service' ? '#0f172a' : 'var(--text-main)',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Words &rarr; Service
          </button>
          <button 
            onClick={() => { setMode('service-to-words'); setIsFlipped(false); }}
            style={{
              padding: '0.6rem 1.2rem',
              background: mode === 'service-to-words' ? '#48dfcb' : 'var(--bg-card)',
              color: mode === 'service-to-words' ? '#0f172a' : 'var(--text-main)',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Service &rarr; Words
          </button>
        </div>
      </div>

      {/* Card Header (Counter & Topic) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px', marginBottom: '0.5rem', color: 'var(--text-muted)', direction: 'ltr', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{currentIndex + 1} / {cards.length}</span>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--accent-aws)' }}>
            Mastery: {'⭐️'.repeat(currentCard.mastery || 0)}{'☆'.repeat(5 - (currentCard.mastery || 0))}
          </span>
          <span style={{ border: '1px solid var(--border-color)', borderRadius: '20px', padding: '2px 12px', fontSize: '0.85rem' }}>{currentCard.topic}</span>
        </div>
      </div>

      {/* Flashcard */}
      <div 
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '350px',
          perspective: '1000px',
          cursor: 'pointer',
          marginBottom: '2rem',
          direction: 'ltr'
        }}
        onClick={toggleFlip}
      >
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)'
        }}>
          
          {/* FRONT FACE */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#1e2433', // Deep blue from screenshot
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ position: 'absolute', top: '2rem', color: '#48dfcb', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
              {currentCard.topic}
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem', marginTop: '2rem' }}>
              {mode === 'words-to-service' ? (
                currentCard.words.map((word, i) => (
                  <span key={i} style={{ padding: '0.6rem 1.2rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '30px', fontSize: '1.1rem', color: '#fff', backgroundColor: 'rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    {word}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{currentCard.service}</span>
              )}
            </div>

            <span style={{ position: 'absolute', bottom: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
              {mode === 'words-to-service' ? 'which service? · tap ↻' : 'what are the key features? · tap ↻'}
            </span>
          </div>
          
          {/* BACK FACE */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#1e2433',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            transform: 'rotateX(180deg)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem' }}>
              {mode === 'words-to-service' ? (
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{currentCard.service}</span>
              ) : (
                currentCard.words.map((word, i) => (
                  <span key={i} style={{ padding: '0.6rem 1.2rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '30px', fontSize: '1.1rem', color: '#fff', backgroundColor: 'rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    {word}
                  </span>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Controls */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', direction: 'ltr', width: '100%', maxWidth: '800px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {!isFlipped ? (
          <>
            <button 
              onClick={handleShuffle}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.2rem', background: 'var(--bg-card)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Shuffle <Shuffle size={18} />
            </button>

            <button 
              onClick={prevCard}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.2rem', background: 'var(--bg-card)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              <ChevronLeft size={18} /> Prev
            </button>

            <button 
              onClick={toggleFlip}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.2rem', background: '#48dfcb', color: '#0f172a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              <RefreshCw size={18} /> Flip
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => handleFeedback(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', flex: 1, justifyContent: 'center' }}
            >
              <XCircle size={18} /> Forgot
            </button>
            <button 
              onClick={() => handleFeedback(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: '1px solid var(--success)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', flex: 1, justifyContent: 'center' }}
            >
              <CheckCircle size={18} /> Remembered
            </button>
            <button 
              onClick={nextCard}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.2rem', background: 'var(--bg-card)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Skip <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default FlashcardsModule;
