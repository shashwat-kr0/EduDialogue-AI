const pdfService = require('./pdfService');
const videoService = require('./videoService');

class AIService {
    constructor() {
        this.conversationHistory = [];
        this.useMockAI = process.env.USE_MOCK_AI === 'true';
    }

    /**
     * Generate AI response based on user question
     */
    async generateResponse(userQuestion, context = {}) {
        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: userQuestion,
            timestamp: new Date()
        });

        let response;

        if (this.useMockAI) {
            response = await this.generateMockResponse(userQuestion, context);
        } else {
            // Placeholder for real AI integration (OpenAI/Gemini)
            response = await this.generateMockResponse(userQuestion, context);
        }

        // Add response to history
        this.conversationHistory.push({
            role: 'assistant',
            content: response,
            timestamp: new Date()
        });

        return response;
    }

    /**
     * Generate mock AI response for demo purposes
     */
    async generateMockResponse(question, context) {
        const lowerQuestion = question.toLowerCase();

        // Get chapter content for context
        const chapterContent = await pdfService.getChapterContent();
        const searchResults = pdfService.searchContent(question, chapterContent);

        // Oligopoly market structure
        if (lowerQuestion.includes('oligopoly') || lowerQuestion.includes('what is oligopoly')) {
            return {
                text: "Excellent question! Oligopoly is a market structure dominated by a small number of large firms. Key characteristics include: (1) Few large firms control the market, (2) High barriers to entry prevent new competitors, (3) Firms are interdependent - each firm's actions affect the others, (4) Products may be homogeneous (like oil) or differentiated (like cars). Examples include UK supermarkets (Tesco, Sainsbury's, Asda, Morrisons) and OPEC in the oil market. This interdependence leads to strategic behavior rather than simple price competition.",
                relatedTopics: ['Market Structure', 'Interdependence', 'Barriers to Entry', 'Strategic Behavior'],
                confidence: 0.98
            };
        }

        // Concentration ratios
        if (lowerQuestion.includes('concentration') || lowerQuestion.includes('concentration ratio')) {
            return {
                text: "Great topic! Concentration ratios measure market dominance by the largest firms. The n-firm concentration ratio (CR_n) is the combined market share of the top n firms in an industry. For example, CR4 measures the market share of the top 4 firms. A CR4 above 60% typically indicates an oligopolistic market. A CR4 above 80% suggests a highly concentrated oligopoly. These ratios help economists and regulators assess market power and competition levels in an industry.",
                relatedTopics: ['Market Share', 'Market Concentration', 'Competition Analysis'],
                confidence: 0.96
            };
        }

        // Interdependence
        if (lowerQuestion.includes('interdependen')) {
            return {
                text: "This is crucial to understanding oligopolies! Interdependence means that each firm's decisions directly affect its rivals. When one firm changes price, output, or marketing strategy, competitors must respond strategically. This creates uncertainty - firms must anticipate rivals' reactions before making decisions. Unlike perfect competition where firms are price-takers, or monopoly where there are no rivals, oligopolistic firms engage in strategic thinking. This interdependence explains why oligopolies often avoid price competition and prefer non-price competition instead.",
                relatedTopics: ['Strategic Behavior', 'Game Theory', 'Non-Price Competition'],
                confidence: 0.97
            };
        }

        // Collusion and cartels
        if (lowerQuestion.includes('collusion') || lowerQuestion.includes('cartel')) {
            return {
                text: "Important concept! Collusion occurs when firms cooperate to restrict competition and maximize joint profits. There are two types: (1) Overt collusion - formal agreements like cartels (usually illegal, e.g., price-fixing), and (2) Tacit collusion - informal cooperation without explicit agreements (e.g., price leadership). OPEC is the most famous cartel, controlling oil production to influence global prices. Collusion leads to higher prices and lower output, harming consumers similar to a monopoly. However, cartels are unstable because each firm has an incentive to cheat for individual gain - this is explained by the Prisoner's Dilemma.",
                relatedTopics: ['OPEC', 'Price Fixing', 'Prisoner\'s Dilemma', 'Market Power'],
                confidence: 0.97
            };
        }

        // Kinked demand curve
        if (lowerQuestion.includes('kinked demand') || lowerQuestion.includes('price rigidity') || lowerQuestion.includes('price rigid')) {
            return {
                text: "Excellent exam topic! The kinked demand curve model explains why prices in oligopolies are often stable ('sticky'). The theory: if a firm RAISES its price, rivals won't follow (they'll gain market share), so demand is elastic above the current price. If a firm LOWERS its price, rivals WILL match it (to protect their market share), so demand is inelastic below the current price. This creates a 'kink' at the current price point, with a discontinuous marginal revenue curve. Result: price changes are unprofitable, so firms keep prices stable and compete through non-price methods instead. This explains price rigidity even when costs change.",
                relatedTopics: ['Price Rigidity', 'Demand Elasticity', 'Marginal Revenue', 'Pricing Strategy'],
                confidence: 0.95
            };
        }

        // Game theory
        if (lowerQuestion.includes('game theory') || lowerQuestion.includes('prisoner') || lowerQuestion.includes('dilemma')) {
            return {
                text: "Game theory is essential for understanding oligopoly! It analyzes strategic interactions between firms. The Prisoner's Dilemma is the classic example: two prisoners (or firms) must decide whether to cooperate or cheat. Each has a dominant strategy to cheat, even though both would be better off cooperating. In oligopolies, this explains why collusion is unstable - each firm has an incentive to cheat on agreements (e.g., secretly lower prices) to gain individual advantage, even though collective cooperation would maximize joint profits. This is why cartels often collapse and why competition authorities monitor oligopolistic industries closely.",
                relatedTopics: ['Strategic Behavior', 'Dominant Strategy', 'Collusion Stability', 'Nash Equilibrium'],
                confidence: 0.96
            };
        }

        // Non-price competition
        if (lowerQuestion.includes('non-price') || lowerQuestion.includes('advertising') || lowerQuestion.includes('branding')) {
            return {
                text: "Critical strategy in oligopolies! Instead of competing on price (which triggers damaging price wars), firms use non-price competition: advertising, branding, product differentiation, quality improvements, customer service, and innovation. Why? Price cuts are easily matched by rivals, leading to lower profits for everyone. Non-price methods can build customer loyalty and are harder to copy. Examples: massive advertising budgets in soft drinks (Coca-Cola vs Pepsi), smartphone features (Apple vs Samsung), and loyalty programs in supermarkets. This competition can benefit consumers through innovation but may also raise costs and prices.",
                relatedTopics: ['Product Differentiation', 'Brand Loyalty', 'Innovation', 'Marketing Strategy'],
                confidence: 0.95
            };
        }

        // Contestable markets
        if (lowerQuestion.includes('contestable') || lowerQuestion.includes('barriers to entry') || lowerQuestion.includes('sunk cost')) {
            return {
                text: "Contestability theory adds nuance to oligopoly analysis! A contestable market is one with low barriers to entry and exit, where potential competition matters more than actual competition. Even with few firms currently operating, the THREAT of new entrants can force oligopolies to behave competitively (lower prices, higher output). Key factor: sunk costs - if sunk costs are low (easily recoverable investments), markets are more contestable. Examples: airline routes (planes are mobile assets) vs utilities (high fixed infrastructure). In perfectly contestable markets, firms price at average cost to avoid attracting new rivals, mimicking perfect competition despite few sellers.",
                relatedTopics: ['Barriers to Entry', 'Sunk Costs', 'Hit-and-Run Competition', 'Market Efficiency'],
                confidence: 0.94
            };
        }

        // Use search results if available
        if (searchResults.length > 0) {
            const topResult = searchResults[0];
            return {
                text: `Based on the oligopoly chapter, here's what I found about "${question}": ${topResult.content.slice(0, 2).join(' ')} This topic is covered in the section on "${topResult.section}". Would you like me to elaborate on any specific aspect?`,
                relatedTopics: [topResult.section],
                confidence: 0.85,
                source: 'Chapter Content'
            };
        }

        // Generic helpful response for oligopoly context
        return {
            text: `That's an interesting question about "${question}" in the context of oligopoly! Remember that oligopolies are characterized by interdependence between firms, which creates strategic behavior. Key topics to review include: concentration ratios, collusion and cartels, the kinked demand curve, game theory (Prisoner's Dilemma), non-price competition, and contestable markets. Could you be more specific about which aspect you'd like to explore - perhaps how it relates to real-world examples like OPEC or UK supermarkets?`,
            relatedTopics: ['Oligopoly Characteristics', 'Strategic Behavior', 'Market Analysis'],
            confidence: 0.75,
            needsClarification: true
        };
    }

    /**
     * Generate study suggestions based on weak areas
     */
    async generateStudySuggestions() {
        return {
            suggestions: [
                {
                    topic: 'Supply and Demand Analysis',
                    priority: 'high',
                    reason: 'Fundamental concept appearing in most exams',
                    resources: ['Chapter sections', 'Practice graphs', 'Video 1']
                },
                {
                    topic: 'Elasticity Calculations',
                    priority: 'high',
                    reason: 'Common calculation questions',
                    resources: ['Formula sheet', 'Practice problems']
                },
                {
                    topic: 'GDP and National Income',
                    priority: 'medium',
                    reason: 'Important macroeconomic indicator',
                    resources: ['Chapter content', 'Video 2']
                },
                {
                    topic: 'Market Structures',
                    priority: 'medium',
                    reason: 'Compare and contrast questions likely',
                    resources: ['Comparison tables', 'Real examples']
                }
            ]
        };
    }

    /**
     * Get conversation history
     */
    getHistory() {
        return this.conversationHistory;
    }

    /**
     * Clear conversation history
     */
    clearHistory() {
        this.conversationHistory = [];
    }
}

module.exports = new AIService();
