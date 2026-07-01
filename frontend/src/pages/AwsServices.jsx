import { useState, useEffect, useMemo } from 'react';
import { Search, Server, Database, Shield, Globe, Cpu, Layers } from 'lucide-react';

const categoryIcons = {
  'Compute': <Server size={20} />,
  'Storage': <Database size={20} />,
  'Database': <Database size={20} />,
  'Networking': <Globe size={20} />,
  'Security': <Shield size={20} />,
  'Integration': <Layers size={20} />,
  'Management': <Cpu size={20} />
};

const AwsServices = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:8001/api/services')
      .then(res => res.json())
      .then(data => {
        setServicesData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(servicesData.map(s => s.category))];

  const filteredServices = useMemo(() => {
    return servicesData.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  if (loading) {
    return <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>טוען שירותים מהשרת...</div>;
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '3rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>AWS Services Glossary 📖</h1>
        <p style={{ color: 'var(--text-muted)' }}>סיכום ממוקד של שירותי AWS עם נקודות חשובות למבחן (באנגלית).</p>
      </header>

      {/* Search and Filter */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 300px', position: 'relative' }}>
          <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search for a service (e.g. S3, Lambda)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 2.5rem 0.8rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'rgba(0,0,0,0.2)',
              color: 'var(--text-color)',
              fontSize: '1rem',
              direction: 'ltr'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory(cat)}
              style={{ whiteSpace: 'nowrap', padding: '0.5rem 1rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <div key={index} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', direction: 'ltr' }}>
                <h3 style={{ margin: 0, color: 'var(--accent-aws)', fontSize: '1.3rem' }}>{service.name}</h3>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                  {categoryIcons[service.category] || <Server size={14} />}
                  {service.category}
                </span>
              </div>
              
              <p style={{ direction: 'ltr', textAlign: 'left', lineHeight: '1.5', marginBottom: '1.5rem', flexGrow: 1 }}>
                {service.description}
              </p>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-blue)', direction: 'ltr', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  💡 Exam Tips
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {service.examTips.map((tip, i) => (
                    <li key={i} style={{ marginBottom: '0.3rem' }}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No services found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default AwsServices;
