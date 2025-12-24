# EduDialogue AI - Interactive Study Tool

An AI-powered interactive study tool inspired by NotebookLM, designed for economics education with features like AI dialogue mode and video summaries.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

## ✨ Features

### 🤖 AI Dialogue Mode
- **Interactive Q&A**: Ask questions about economics topics and get instant AI-powered explanations
- **Context-Aware Responses**: AI understands your chapter content and provides relevant answers
- **Text-to-Speech**: Listen to responses with built-in audio playback
- **Conversation History**: Track your learning progress with conversation logs
- **Suggested Questions**: Get started with pre-made questions

### 📺 Video Summaries
- **Key Concepts**: Visual cards highlighting main concepts from economics videos
- **Exam Tips**: Curated tips and strategies for exam preparation
- **Video Timeline**: Timestamped navigation for quick topic reference
- **Multiple Videos**: Support for multiple video sources

### 📚 Chapter Content
- **PDF Processing**: Automatic extraction and structuring of chapter content
- **Smart Search**: Find relevant information quickly
- **Section Overview**: Organized sections for easy navigation

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Modern, stunning visual effects
- **Smooth Animations**: Professional micro-interactions
- **Dark Theme**: Eye-friendly color palette with purple and blue gradients
- **Responsive**: Works perfectly on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "EduDialogue AI"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend Application** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   App will open at `http://localhost:3000`

## 📖 Usage

### Adding Your Chapter PDF

1. Download your economics chapter PDF
2. Place it in the `data/` folder with the name `chapter.pdf`
3. Restart the backend server

The application will automatically extract and process the content.

### Using AI Dialogue Mode

1. Click on "AI Dialogue Mode" from the dashboard
2. Type your question in the input field
3. Press Enter or click Send
4. Listen to the response using the "Speak" button
5. Continue the conversation with follow-up questions

### Viewing Video Summaries

1. Click on "Video Summaries" from the dashboard
2. Browse through different videos using the tabs
3. Review key concepts, exam tips, and timestamps
4. Click "Watch Video" to view the original content

## 🔧 Configuration

### Environment Variables

Backend configuration in `backend/.env`:

```env
PORT=5000
USE_MOCK_AI=true
# Optional: Add API keys for real AI integration
# OPENAI_API_KEY=your_key_here
# GOOGLE_AI_API_KEY=your_key_here
```

### Upgrading to Real AI

To use OpenAI or Google Gemini instead of mock responses:

1. Get an API key from [OpenAI](https://platform.openai.com/) or [Google AI](https://makersuite.google.com/)
2. Add the key to `backend/.env`
3. Set `USE_MOCK_AI=false`
4. Modify `backend/services/aiService.js` to integrate the real API

## 📁 Project Structure

```
EduDialogue AI/
├── backend/
│   ├── server.js              # Express server
│   ├── routes/
│   │   ├── content.js         # Content API routes
│   │   └── dialogue.js        # Dialogue API routes
│   ├── services/
│   │   ├── pdfService.js      # PDF processing
│   │   ├── videoService.js    # Video data
│   │   └── aiService.js       # AI responses
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx  # Main dashboard
│   │   │   ├── DialogueMode.jsx # Q&A interface
│   │   │   └── VideoSummary.jsx # Video summaries
│   │   ├── App.jsx            # Main app
│   │   └── App.css            # Global styles
│   └── package.json
├── data/
│   └── chapter.pdf            # Your economics chapter
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **Express.js**: Web server framework
- **pdf-parse**: PDF content extraction
- **Axios**: HTTP client
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI framework
- **Lucide React**: Icon library
- **Axios**: API communication
- **Web Speech API**: Text-to-speech

### Design
- **Glassmorphism**: Modern UI aesthetic
- **CSS Animations**: Smooth transitions
- **Responsive Design**: Mobile-first approach
- **Google Fonts**: Inter & Outfit fonts

## 🎯 Features in Detail

### Mock AI Intelligence

The application includes intelligent mock AI responses that:
- Recognize economics topics (GDP, inflation, supply/demand, etc.)
- Provide context-aware explanations
- Suggest related topics for deeper learning
- Maintain conversation history

### Video Data Processing

Pre-configured summaries for economics videos including:
- Main concepts extraction
- Key points highlighting
- Exam-focused tips
- Timestamped navigation

### PDF Content Processing

Automatic processing that:
- Extracts text from PDFs
- Identifies sections and headings
- Structures content for AI consumption
- Provides search functionality

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📝 License

MIT License - feel free to use this project for educational purposes.

## 🙏 Acknowledgments

- Inspired by Google's NotebookLM
- Built with modern web technologies
- Designed for students and educators

## 📞 Support

For issues or questions, please check:
- Backend running on port 5000
- Frontend running on port 3000
- PDF file placed correctly in `data/` folder
- All dependencies installed

---

**Happy Learning! 🎓✨**
