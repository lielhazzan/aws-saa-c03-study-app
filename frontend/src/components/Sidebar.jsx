import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, BrainCircuit, Settings, Layers, List, Lightbulb, Server } from 'lucide-react';

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

        <NavLink 
          to="/tips" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <Lightbulb size={20} />
          <span>טיפים למבחן</span>
        </NavLink>

        <NavLink 
          to="/services" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <Server size={20} />
          <span>מילון שירותים (EN)</span>
        </NavLink>
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          style={{ width: '100%', cursor: 'pointer' }}
        >
          <Settings size={20} />
          <span>הגדרות</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
