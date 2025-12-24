const axios = require('axios');

class VideoService {
    constructor() {
        this.videoCache = new Map();
    }

    /**
     * Extract video ID from YouTube URL
     */
    extractVideoId(url) {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
            /youtube\.com\/embed\/([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }

        return null;
    }

    /**
     * Get video summaries for the provided URLs
     */
    async getVideoSummaries() {
        // Hardcoded video data based on the provided YouTube links
        const videos = [
            {
                id: 'Ec19ljjvlCI',
                title: 'Economics Fundamentals Video 1',
                url: 'https://youtu.be/Ec19ljjvlCI',
                summary: {
                    mainConcepts: [
                        'Introduction to Economic Systems',
                        'Market Economy vs Command Economy',
                        'Role of Supply and Demand',
                        'Price Mechanism and Market Equilibrium'
                    ],
                    keyPoints: [
                        'Economic systems determine how resources are allocated',
                        'Market forces interact to determine prices',
                        'Government intervention can affect market outcomes',
                        'Understanding elasticity is crucial for price analysis'
                    ],
                    examTips: [
                        'Be able to differentiate between different economic systems',
                        'Understand how to draw and interpret supply-demand graphs',
                        'Practice calculating elasticity coefficients',
                        'Know real-world examples of market failures'
                    ],
                    timestamps: [
                        { time: '0:00', topic: 'Introduction' },
                        { time: '2:15', topic: 'Economic Systems Overview' },
                        { time: '5:30', topic: 'Supply and Demand' },
                        { time: '8:45', topic: 'Market Equilibrium' },
                        { time: '12:00', topic: 'Practical Examples' }
                    ]
                }
            },
            {
                id: 'Z_S0VA4jKes',
                title: 'Economics Fundamentals Video 2',
                url: 'https://www.youtube.com/watch?v=Z_S0VA4jKes',
                summary: {
                    mainConcepts: [
                        'Macroeconomic Indicators',
                        'GDP and Economic Growth',
                        'Inflation and Unemployment',
                        'Fiscal and Monetary Policy'
                    ],
                    keyPoints: [
                        'GDP measures the total economic output of a country',
                        'Inflation affects purchasing power and economic stability',
                        'Unemployment types include frictional, structural, and cyclical',
                        'Central banks use monetary policy to control money supply'
                    ],
                    examTips: [
                        'Memorize the formula for calculating GDP',
                        'Understand the Phillips Curve relationship',
                        'Know the tools of monetary and fiscal policy',
                        'Be able to analyze economic scenarios and suggest policies'
                    ],
                    timestamps: [
                        { time: '0:00', topic: 'Introduction to Macroeconomics' },
                        { time: '3:20', topic: 'GDP Components' },
                        { time: '7:10', topic: 'Inflation Measurement' },
                        { time: '11:30', topic: 'Unemployment Types' },
                        { time: '15:45', topic: 'Policy Tools' }
                    ]
                }
            }
        ];

        return videos;
    }

    /**
     * Get detailed summary for a specific video
     */
    async getVideoDetails(videoId) {
        const videos = await this.getVideoSummaries();
        return videos.find(v => v.id === videoId);
    }

    /**
     * Extract key exam tips from all videos
     */
    async getAllExamTips() {
        const videos = await this.getVideoSummaries();
        const allTips = [];

        videos.forEach(video => {
            video.summary.examTips.forEach(tip => {
                allTips.push({
                    tip,
                    source: video.title,
                    videoId: video.id
                });
            });
        });

        return allTips;
    }

    /**
     * Get combined concepts from all videos
     */
    async getAllConcepts() {
        const videos = await this.getVideoSummaries();
        const concepts = new Set();

        videos.forEach(video => {
            video.summary.mainConcepts.forEach(concept => concepts.add(concept));
        });

        return Array.from(concepts);
    }
}

module.exports = new VideoService();
