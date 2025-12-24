import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DialogueMode.css';
import { MessageCircle, Send, Volume2, VolumeX, Sparkles, RotateCcw, Settings, Square, X } from 'lucide-react';

import config from '../config';
const { API_URL } = config;

function DialogueMode() {
    const [messages, setMessages] = useState([]);
    const [inputQuestion, setInputQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [autoSpeak, setAutoSpeak] = useState(true);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [availableVoices, setAvailableVoices] = useState([]);
    const [speechRate, setSpeechRate] = useState(0.95);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        // Welcome message
        setMessages([{
            role: 'assistant',
            content: {
                text: "Hello! I'm your AI study companion for Oligopoly - AQA Economics. Feel free to ask me any questions about oligopoly market structure, concentration ratios, interdependence, collusion and cartels, the kinked demand curve, game theory, or non-price competition. I'm here to help you ace your exam!",
                relatedTopics: ['Getting Started']
            },
            timestamp: new Date()
        }]);
    }, []);

    useEffect(() => {
        // Load available voices
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            setAvailableVoices(voices);

            // Select a high-quality default voice
            const preferredVoice = voices.find(v =>
                v.name.includes('Google UK English Female') ||
                v.name.includes('Samantha') ||
                v.name.includes('Daniel') ||
                v.name.includes('Google US English') ||
                v.name.includes('Google UK English Male')
            ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

            if (preferredVoice) {
                setSelectedVoice(preferredVoice);
            }
        };

        loadVoices();
        // Some browsers load voices asynchronously
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const handleAskQuestion = async () => {
        if (!inputQuestion.trim()) return;

        const userMessage = {
            role: 'user',
            content: inputQuestion,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputQuestion('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_URL}/dialogue/ask`, {
                question: inputQuestion
            });

            const aiMessage = {
                role: 'assistant',
                content: response.data.data.response,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);

            // Auto-speak if enabled
            if (autoSpeak && response.data.data.response.text) {
                speakText(response.data.data.response.text);
            }
        } catch (error) {
            console.error('Error asking question:', error);
            const errorMessage = {
                role: 'assistant',
                content: {
                    text: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running on port 5000.",
                    relatedTopics: []
                },
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);

            // Use selected voice if available
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utterance.rate = speechRate;
            utterance.pitch = 1;
            utterance.volume = 1;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const handleClearHistory = () => {
        setMessages([{
            role: 'assistant',
            content: {
                text: "Conversation cleared! Let's start fresh. What would you like to learn about?",
                relatedTopics: []
            },
            timestamp: new Date()
        }]);
        stopSpeaking();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAskQuestion();
        }
    };

    const suggestedQuestions = [
        "What is oligopoly?",
        "Explain concentration ratios",
        "What is the kinked demand curve?",
        "Explain game theory in oligopoly",
        "What is collusion?"
    ];

    return (
        <div className="dialogue-mode">
            <div className="dialogue-header glass-card">
                <div className="header-content">
                    <div className="header-title">
                        <MessageCircle size={32} />
                        <div>
                            <h2>AI Dialogue Mode</h2>
                            <p className="subtitle">Interactive Q&A with your AI study companion</p>
                        </div>
                    </div>
                    <div className="header-controls">
                        {/* Speaking indicator */}
                        {isSpeaking && (
                            <div className="speaking-indicator">
                                <div className="wave-animation"></div>
                                <span>Speaking...</span>
                            </div>
                        )}

                        {/* Stop button (visible when speaking) */}
                        {isSpeaking && (
                            <button
                                className="btn-icon btn-stop"
                                onClick={stopSpeaking}
                                title="Stop speaking"
                            >
                                <Square size={20} />
                            </button>
                        )}

                        <button
                            className={`btn-icon ${autoSpeak ? 'active' : ''}`}
                            onClick={() => setAutoSpeak(!autoSpeak)}
                            title={autoSpeak ? 'Disable auto-speech' : 'Enable auto-speech'}
                        >
                            {autoSpeak ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </button>
                        <button
                            className={`btn-icon ${showSettings ? 'active' : ''}`}
                            onClick={() => setShowSettings(!showSettings)}
                            title="Voice settings"
                        >
                            <Settings size={20} />
                        </button>
                        <button
                            className="btn-icon"
                            onClick={handleClearHistory}
                            title="Clear conversation"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Voice Settings Panel */}
            {showSettings && (
                <div className="voice-settings glass-card">
                    <div className="settings-header">
                        <h3>Voice Settings</h3>
                        <button
                            className="btn-icon close-settings"
                            onClick={() => setShowSettings(false)}
                            title="Close settings"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="setting-group">
                        <label>Voice</label>
                        <select
                            value={selectedVoice?.name || ''}
                            onChange={(e) => {
                                const voice = availableVoices.find(v => v.name === e.target.value);
                                setSelectedVoice(voice);
                                setShowSettings(false); // Auto-close on selection
                            }}
                        >
                            {availableVoices.map((voice, i) => (
                                <option key={i} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="setting-group">
                        <label>Speed: {speechRate.toFixed(2)}x</label>
                        <input
                            type="range"
                            min="0.5"
                            max="2.0"
                            step="0.05"
                            value={speechRate}
                            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                        />
                        <div className="speed-labels">
                            <span>Slow</span>
                            <span>Normal</span>
                            <span>Fast</span>
                        </div>
                    </div>

                    <button
                        className="btn btn-secondary test-voice-btn"
                        onClick={() => speakText("This is a preview of the selected voice speaking about oligopoly.")}
                        disabled={isSpeaking}
                    >
                        <Volume2 size={18} /> Test Voice
                    </button>
                </div>
            )}

            <div className="dialogue-container">
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role} fade-in`}>
                            <div className="message-content">
                                {msg.role === 'assistant' && (
                                    <div className="ai-avatar">
                                        <Sparkles size={20} />
                                    </div>
                                )}
                                <div className="message-bubble">
                                    <p>{msg.role === 'user' ? msg.content : msg.content.text}</p>
                                    {msg.role === 'assistant' && msg.content.relatedTopics && msg.content.relatedTopics.length > 0 && (
                                        <div className="related-topics">
                                            <strong>Related Topics:</strong>
                                            <div className="topic-tags">
                                                {msg.content.relatedTopics.map((topic, i) => (
                                                    <span key={i} className="badge">{topic}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {msg.role === 'assistant' && (
                                        <button
                                            className="speak-btn"
                                            onClick={() => speakText(msg.content.text)}
                                            disabled={isSpeaking}
                                        >
                                            <Volume2 size={16} /> Speak
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message assistant fade-in">
                            <div className="message-content">
                                <div className="ai-avatar">
                                    <Sparkles size={20} />
                                </div>
                                <div className="message-bubble">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {messages.length === 1 && (
                    <div className="suggested-questions">
                        <p className="suggestions-title">Try asking:</p>
                        <div className="suggestions-grid">
                            {suggestedQuestions.map((q, index) => (
                                <button
                                    key={index}
                                    className="suggestion-card glass-card"
                                    onClick={() => setInputQuestion(q)}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="input-container glass-card">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Ask me anything about economics..."
                        value={inputQuestion}
                        onChange={(e) => setInputQuestion(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                    <button
                        className="btn btn-primary send-btn"
                        onClick={handleAskQuestion}
                        disabled={isLoading || !inputQuestion.trim()}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DialogueMode;
