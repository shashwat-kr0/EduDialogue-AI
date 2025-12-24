import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import DialogueMode from './components/DialogueMode';
import VideoSummary from './components/VideoSummary';
import { Home, MessageCircle, Video, Menu, X } from 'lucide-react';

function App() {
    const [currentView, setCurrentView] = useState('dashboard');
    const [menuOpen, setMenuOpen] = useState(false);

    const navigation = [
        { id: 'dashboard', label: 'Home', icon: Home },
        { id: 'dialogue', label: 'AI Dialogue', icon: MessageCircle },
        { id: 'videos', label: 'Video Summaries', icon: Video }
    ];

    const handleNavigate = (view) => {
        setCurrentView(view);
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="app">
            <nav className="navbar glass-card">
                <div className="nav-content">
                    <div className="nav-brand">
                        <div className="brand-icon">📚</div>
                        <span className="brand-text">EduDialogue AI</span>
                    </div>

                    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                                    onClick={() => handleNavigate(item.id)}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            <main className="main-content container">
                {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
                {currentView === 'dialogue' && <DialogueMode />}
                {currentView === 'videos' && <VideoSummary />}
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>Built with ❤️ using React & AI | EduDialogue AI © 2024</p>
                    <p className="footer-note">
                        Powered by AI for enhanced learning experiences
                    </p>
                </div>
            </footer>

            <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          margin: var(--spacing-sm) auto;
          max-width: 1400px;
          padding: var(--spacing-md) var(--spacing-lg);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .brand-icon {
          font-size: 2rem;
        }

        .brand-text {
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: var(--spacing-xs);
        }

        .nav-links {
          display: flex;
          gap: var(--spacing-sm);
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue));
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
        }

        .main-content {
          min-height: calc(100vh - 200px);
          padding: var(--spacing-xl) var(--spacing-lg);
        }

        .footer {
          margin-top: var(--spacing-xl);
          padding: var(--spacing-xl) 0;
          text-align: center;
          border-top: 1px solid var(--glass-border);
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-content p {
          margin: var(--spacing-xs) 0;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .footer-note {
          font-size: 0.85rem !important;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background: var(--primary-dark);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-md);
            margin-top: var(--spacing-sm);
            padding: var(--spacing-sm);
            display: none;
          }

          .nav-links.open {
            display: flex;
          }

          .nav-link {
            width: 100%;
            justify-content: center;
          }

          .navbar {
            position: relative;
          }

          .nav-content {
            position: relative;
          }

          .main-content {
            padding: var(--spacing-md);
          }
        }
      `}</style>
        </div>
    );
}

export default App;
