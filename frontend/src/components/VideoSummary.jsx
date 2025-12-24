import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoSummary.css';
import { Video, Clock, Lightbulb, BookOpen, ExternalLink } from 'lucide-react';

import config from '../config';
const { API_URL } = config;

function VideoSummary() {
    const [videos, setVideos] = useState([]);
    const [examTips, setExamTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetchVideoData();
    }, []);

    const fetchVideoData = async () => {
        try {
            const [videosRes, tipsRes] = await Promise.all([
                axios.get(`${API_URL}/content/videos`),
                axios.get(`${API_URL}/content/exam-tips`)
            ]);

            setVideos(videosRes.data.data);
            setExamTips(tipsRes.data.data);
            if (videosRes.data.data.length > 0) {
                setSelectedVideo(videosRes.data.data[0]);
            }
        } catch (error) {
            console.error('Error fetching video data:', error);
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
        <div className="video-summary">
            <div className="video-header text-center mb-3">
                <h1>
                    <Video size={40} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '12px' }} />
                    Video Summaries
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '12px' }}>
                    Key concepts and exam tips from curated economics videos
                </p>
            </div>

            <div className="video-tabs">
                {videos.map((video, index) => (
                    <button
                        key={video.id}
                        className={`video-tab ${selectedVideo?.id === video.id ? 'active' : ''}`}
                        onClick={() => setSelectedVideo(video)}
                    >
                        <Video size={18} />
                        Video {index + 1}
                    </button>
                ))}
            </div>

            {selectedVideo && (
                <div className="video-content fade-in">
                    <div className="glass-card video-main">
                        <div className="video-title-bar">
                            <h2>{selectedVideo.title}</h2>
                            <a
                                href={selectedVideo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <ExternalLink size={18} />
                                Watch Video
                            </a>
                        </div>

                        <div className="concepts-grid mt-2">
                            <div className="concept-card glass-card">
                                <div className="concept-header">
                                    <BookOpen size={24} className="concept-icon" />
                                    <h3>Main Concepts</h3>
                                </div>
                                <ul className="concept-list">
                                    {selectedVideo.summary.mainConcepts.map((concept, index) => (
                                        <li key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <span className="bullet">▸</span>
                                            {concept}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="concept-card glass-card">
                                <div className="concept-header">
                                    <Lightbulb size={24} className="concept-icon" />
                                    <h3>Key Points</h3>
                                </div>
                                <ul className="concept-list">
                                    {selectedVideo.summary.keyPoints.map((point, index) => (
                                        <li key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <span className="bullet">•</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="exam-tips-section glass-card mt-2">
                            <div className="section-header">
                                <div className="flex" style={{ alignItems: 'center', gap: '12px' }}>
                                    <div className="icon-badge">
                                        <Lightbulb size={20} />
                                    </div>
                                    <h3>Exam Tips</h3>
                                </div>
                            </div>
                            <div className="tips-grid">
                                {selectedVideo.summary.examTips.map((tip, index) => (
                                    <div key={index} className="tip-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="tip-number">{index + 1}</div>
                                        <p>{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="timestamps-section glass-card mt-2">
                            <div className="section-header">
                                <div className="flex" style={{ alignItems: 'center', gap: '12px' }}>
                                    <Clock size={20} />
                                    <h3>Video Timeline</h3>
                                </div>
                            </div>
                            <div className="timestamps-list">
                                {selectedVideo.summary.timestamps.map((stamp, index) => (
                                    <div key={index} className="timestamp-item fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                        <span className="time-badge">{stamp.time}</span>
                                        <span className="time-topic">{stamp.topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="all-tips-section mt-3">
                <div className="glass-card">
                    <h2 className="text-center mb-2">
                        <span className="gradient-text">📚 All Exam Tips</span>
                    </h2>
                    <div className="all-tips-grid">
                        {examTips.map((tipObj, index) => (
                            <div key={index} className="all-tip-card glass-card fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                <div className="tip-source">{tipObj.source}</div>
                                <p>{tipObj.tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoSummary;
