import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, BrainCircuit, Settings, Layers, List } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar glass">
      <div>
        <h2 style={{ color: 'var(--accent-aws)', marginBottom: '4px' }}>AWS Prep</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Solutions Architect</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2rem' }}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <LayoutDashboard size={20} />
          <span>לוח בקרה</span>
        </NavLink>
        
        <NavLink 
          to="/study" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <BookOpen size={20} />
          <span>סיכומים וקורס</span>
        </NavLink>

        <NavLink 
          to="/practice" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <BrainCircuit size={20} />
          <span>תרגול ומבחנים</span>
        </NavLink>

        <NavLink 
          to="/flashcards" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <Layers size={20} />
          <span>כרטיסיות זיכרון</span>
        </NavLink>

        <NavLink 
          to="/cheatsheets" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <List size={20} />
          <span>דפי השוואה</span>
        </NavLink>
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button className="nav-item" style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right' }}>
          <Settings size={20} />
          <span>הגדרות</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
