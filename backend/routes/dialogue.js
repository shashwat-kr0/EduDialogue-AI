const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

/**
 * POST /api/dialogue/ask
 * Ask a question and get AI response
 */
router.post('/ask', async (req, res) => {
    try {
        const { question, context } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                error: 'Question is required'
            });
        }

        const response = await aiService.generateResponse(question, context || {});

        res.json({
            success: true,
            data: {
                question,
                response,
                timestamp: new Date()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/dialogue/history
 * Get conversation history
 */
router.get('/history', (req, res) => {
    try {
        const history = aiService.getHistory();
        res.json({
            success: true,
            data: history
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * DELETE /api/dialogue/history
 * Clear conversation history
 */
router.delete('/history', (req, res) => {
    try {
        aiService.clearHistory();
        res.json({
            success: true,
            message: 'Conversation history cleared'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/dialogue/suggestions
 * Get study suggestions
 */
router.get('/suggestions', async (req, res) => {
    try {
        const suggestions = await aiService.generateStudySuggestions();
        res.json({
            success: true,
            data: suggestions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
