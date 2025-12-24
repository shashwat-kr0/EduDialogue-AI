const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

class PDFService {
    constructor() {
        this.contentCache = null;
    }

    /**
     * Extract text content from PDF file
     */
    async extractPDFContent(pdfPath) {
        try {
            const dataBuffer = fs.readFileSync(pdfPath);
            const data = await pdf(dataBuffer);

            return {
                text: data.text,
                pages: data.numpages,
                info: data.info
            };
        } catch (error) {
            console.error('Error extracting PDF:', error);
            throw new Error('Failed to extract PDF content');
        }
    }

    /**
     * Process and structure PDF content for AI consumption
     */
    processContent(rawText) {
        // Split into sections and clean up
        const lines = rawText.split('\n').filter(line => line.trim() !== '');

        // Basic structure extraction
        const sections = [];
        let currentSection = { title: 'Introduction', content: [] };

        lines.forEach(line => {
            // Detect section headers (simple heuristic: all caps or numbered)
            if (line.match(/^[A-Z\s]{10,}$/) || line.match(/^\d+\./)) {
                if (currentSection.content.length > 0) {
                    sections.push({ ...currentSection });
                }
                currentSection = { title: line.trim(), content: [] };
            } else {
                currentSection.content.push(line.trim());
            }
        });

        if (currentSection.content.length > 0) {
            sections.push(currentSection);
        }

        return sections;
    }

    /**
     * Get chapter content (from file or cache)
     */
    async getChapterContent() {
        if (this.contentCache) {
            return this.contentCache;
        }

        const pdfPath = path.join(__dirname, '../../data/chapter.pdf');

        // Check if PDF exists
        if (!fs.existsSync(pdfPath)) {
            // Return sample content if PDF not found
            return this.getSampleContent();
        }

        try {
            const extracted = await this.extractPDFContent(pdfPath);
            const processed = this.processContent(extracted.text);

            this.contentCache = {
                title: 'Economics Chapter',
                pages: extracted.pages,
                sections: processed,
                rawText: extracted.text
            };

            return this.contentCache;
        } catch (error) {
            console.error('Error getting chapter content:', error);
            return this.getSampleContent();
        }
    }

    /**
     * Get sample content for demo purposes
     */
    getSampleContent() {
        return {
            title: 'Oligopoly - AQA Economics',
            pages: 9,
            sections: [
                {
                    title: 'What is Oligopoly?',
                    content: [
                        'Oligopoly is a market structure characterized by a small number of large firms that dominate the market.',
                        'Key characteristics include: few large firms, high barriers to entry, interdependence between firms, and products may be homogeneous or differentiated.',
                        'Examples include the UK supermarket industry (Tesco, Sainsbury\'s, Asda, Morrisons) and OPEC in the oil market.'
                    ]
                },
                {
                    title: 'Concentration Ratios',
                    content: [
                        'Concentration ratios measure the market share of the largest firms in an industry.',
                        'The n-firm concentration ratio is the combined market share of the top n firms.',
                        'A high concentration ratio (e.g., CR4 > 60%) indicates an oligopolistic market structure.',
                        'Concentration ratios help assess the degree of competition and market power in an industry.'
                    ]
                },
                {
                    title: 'Interdependence and Strategic Behavior',
                    content: [
                        'Firms in an oligopoly are interdependent - the actions of one firm directly affect the others.',
                        'This interdependence leads to strategic behavior where firms must consider rivals\' reactions when making decisions.',
                        'Firms may compete on price, but non-price competition is more common to avoid price wars.',
                        'Game theory, particularly the Prisoner\'s Dilemma, helps explain strategic interactions between oligopolistic firms.'
                    ]
                },
                {
                    title: 'Collusion and Cartels',
                    content: [
                        'Collusion occurs when firms cooperate to restrict competition and increase profits.',
                        'Overt collusion involves formal agreements (cartels) - often illegal in most countries.',
                        'Tacit collusion involves informal cooperation without explicit agreements, such as price leadership.',
                        'OPEC is a famous example of a cartel that controls oil production to influence prices.',
                        'Collusion can lead to higher prices and reduced consumer welfare, similar to monopoly outcomes.'
                    ]
                },
                {
                    title: 'The Kinked Demand Curve',
                    content: [
                        'The kinked demand curve model explains price rigidity in oligopolistic markets.',
                        'The model assumes if a firm raises prices, rivals will not follow, causing a large loss in market share.',
                        'If a firm lowers prices, rivals will match the decrease to maintain their market share.',
                        'This creates a "kink" in the demand curve at the current price, making price changes unprofitable.',
                        'The model helps explain why prices in oligopolies tend to remain stable even when costs change.'
                    ]
                },
                {
                    title: 'Non-Price Competition',
                    content: [
                        'Oligopolies often compete through advertising, branding, product differentiation, and quality improvements.',
                        'Non-price competition allows firms to gain market share without triggering destructive price wars.',
                        'Heavy advertising spending is common in oligopolistic industries like soft drinks and telecommunications.',
                        'Innovation and product development are key competitive strategies in technology oligopolies.'
                    ]
                },
                {
                    title: 'Game Theory and the Prisoner\'s Dilemma',
                    content: [
                        'Game theory analyzes strategic interactions between firms in an oligopoly.',
                        'The Prisoner\'s Dilemma illustrates why firms may not cooperate even when it would benefit both.',
                        'Each firm has an incentive to cheat on collusive agreements to gain individual advantage.',
                        'The dominant strategy often leads to competitive outcomes rather than cooperative ones.',
                        'Understanding game theory helps predict firm behavior in oligopolistic markets.'
                    ]
                },
                {
                    title: 'Contestable Markets',
                    content: [
                        'Contestable markets are those with low barriers to entry and exit, allowing potential competition.',
                        'Even if only a few firms operate in the market, the threat of new entrants can discipline behavior.',
                        'In perfectly contestable markets, firms behave competitively to avoid attracting new rivals.',
                        'Sunk costs are a key barrier - contestability is higher when sunk costs are low.'
                    ]
                }
            ],
            rawText: 'Oligopoly chapter content from AQA Economics covering market structure, concentration ratios, interdependence, collusion, cartels, game theory, kinked demand curve, and non-price competition.',
            isSample: true
        };
    }

    /**
     * Search content for relevant information
     */
    searchContent(query, content) {
        const searchTerms = query.toLowerCase().split(' ');
        const results = [];

        content.sections.forEach(section => {
            const sectionText = section.content.join(' ').toLowerCase();
            const relevance = searchTerms.filter(term =>
                sectionText.includes(term) || section.title.toLowerCase().includes(term)
            ).length;

            if (relevance > 0) {
                results.push({
                    section: section.title,
                    content: section.content,
                    relevance
                });
            }
        });

        return results.sort((a, b) => b.relevance - a.relevance);
    }
}

module.exports = new PDFService();
