const express = require('express');
const router = express.Router();
const pdfService = require('../services/pdfService');
const videoService = require('../services/videoService');

/**
 * GET /api/content/chapter
 * Get chapter content
 */
router.get('/chapter', async (req, res) => {
    try {
        const content = await pdfService.getChapterContent();
        res.json({
            success: true,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/content/videos
 * Get video summaries
 */
router.get('/videos', async (req, res) => {
    try {
        const videos = await videoService.getVideoSummaries();
        res.json({
            success: true,
            data: videos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/content/video/:videoId
 * Get specific video details
 */
router.get('/video/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const video = await videoService.getVideoDetails(videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                error: 'Video not found'
            });
        }

        res.json({
            success: true,
            data: video
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/content/exam-tips
 * Get all exam tips from videos
 */
router.get('/exam-tips', async (req, res) => {
    try {
        const tips = await videoService.getAllExamTips();
        res.json({
            success: true,
            data: tips
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/content/concepts
 * Get all main concepts
 */
router.get('/concepts', async (req, res) => {
    try {
        const concepts = await videoService.getAllConcepts();
        res.json({
            success: true,
            data: concepts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/content/search
 * Search chapter content
 */
router.post('/search', async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({
                success: false,
                error: 'Query is required'
            });
        }

        const content = await pdfService.getChapterContent();
        const results = pdfService.searchContent(query, content);

        res.json({
            success: true,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
