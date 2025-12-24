import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { BookOpen, Brain, Play, TrendingUp, Sparkles } from 'lucide-react';

import config from '../config';
const { API_URL } = config;

function Dashboard({ onNavigate }) {
    const [chapterData, setChapterData] = useState(null);
    const [concepts, setConcepts] = useState([]);
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [chapterRes, conceptsRes, suggestionsRes] = await Promise.all([
                axios.get(`${API_URL}/content/chapter`),
                axios.get(`${API_URL}/content/concepts`),
                axios.get(`${API_URL}/dialogue/suggestions`)
            ]);

            setChapterData(chapterRes.data.data);
            setConcepts(conceptsRes.data.data);
            setSuggestions(suggestionsRes.data.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container flex-center">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="hero-section text-center mb-3">
                <div className="hero-icon">
                    <Brain size={60} />
                </div>
                <h1 className="hero-title">EduDialogue AI</h1>
                <p className="hero-subtitle">
                    Your AI-powered study companion for Economics
                </p>
                {chapterData?.isSample && (
                    <div className="sample-notice">
                        <p>📝 Using sample content. Add your PDF to <code>data/chapter.pdf</code> for full functionality</p>
                    </div>
                )}
            </div>

            <div className="action-cards grid-2">
                <div className="action-card glass-card fade-in" onClick={() => onNavigate('dialogue')}>
                    <div className="action-icon">
                        <Sparkles size={32} />
                    </div>
                    <h3>AI Dialogue Mode</h3>
                    <p>Ask questions and get instant explanations from your AI study companion</p>
                    <button className="btn btn-primary">
                        Start Learning
                    </button>
                </div>

                <div className="action-card glass-card fade-in" onClick={() => onNavigate('videos')} style={{ animationDelay: '0.1s' }}>
                    <div className="action-icon" style={{ background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-cyan))' }}>
                        <Play size={32} />
                    </div>
                    <h3>Video Summaries</h3>
                    <p>Visual concepts, key points, and exam tips from curated economics videos</p>
                    <button className="btn btn-primary">
                        View Summaries
                    </button>
                </div>
            </div>

            <div className="chapter-overview glass-card mt-3 fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="section-header">
                    <div className="flex" style={{ alignItems: 'center', gap: '12px' }}>
                        <BookOpen size={24} />
                        <h2>{chapterData?.title}</h2>
                    </div>
                    <span className="badge">{chapterData?.pages} {chapterData?.pages === 1 ? 'Page' : 'Pages'}</span>
                </div>

                <div className="chapter-sections">
                    {chapterData?.sections.slice(0, 4).map((section, index) => (
                        <div key={index} className="section-card glass-card" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                            <h4>{section.title}</h4>
                            <p>{section.content[0]?.substring(0, 150)}...</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="concepts-overview glass-card mt-3 fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="section-header">
                    <div className="flex" style={{ alignItems: 'center', gap: '12px' }}>
                        <TrendingUp size={24} />
                        <h2>Key Concepts Covered</h2>
                    </div>
                </div>
                <div className="concepts-cloud">
                    {concepts.map((concept, index) => (
                        <span
                            key={index}
                            className="concept-tag badge"
                            style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                        >
                            {concept}
                        </span>
                    ))}
                </div>
            </div>

            {suggestions && (
                <div className="study-suggestions glass-card mt-3 fade-in" style={{ animationDelay: '0.6s' }}>
                    <h2 className="text-center mb-2">
                        <span className="gradient-text">📚 Recommended Study Focus</span>
                    </h2>
                    <div className="suggestions-grid">
                        {suggestions.suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className={`suggestion-card glass-card priority-${suggestion.priority}`}
                                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                            >
                                <div className="suggestion-header">
                                    <h4>{suggestion.topic}</h4>
                                    <span className={`priority-badge ${suggestion.priority}`}>
                                        {suggestion.priority.toUpperCase()}
                                    </span>
                                </div>
                                <p className="suggestion-reason">{suggestion.reason}</p>
                                <div className="resources">
                                    <strong>Resources:</strong>
                                    <div className="resource-tags">
                                        {suggestion.resources.map((resource, i) => (
                                            <span key={i} className="resource-tag">{resource}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
