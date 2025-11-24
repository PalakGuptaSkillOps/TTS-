# 🎯 AI Interview Platform

A voice-based AI interview platform that helps users practice job interviews with AI-powered questions and detailed feedback.

## Features

- 🎤 **Voice-Based Interview**: AI asks questions via text-to-speech, users answer via speech-to-text
- 🤖 **AI-Powered**: Uses Google Gemini AI to generate relevant interview questions based on job title
- 📊 **Detailed Feedback**: Get comprehensive feedback on each answer with scores and improvement suggestions
- 🎨 **Modern UI**: Beautiful, responsive React interface
- ⚡ **Fast Backend**: FastAPI backend with async support

## Tech Stack

### Backend
- Python 3.8+
- FastAPI
- Google Gemini AI
- gTTS (Google Text-to-Speech)
- SpeechRecognition

### Frontend
- React 18
- Vite
- Axios
- Modern CSS

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

6. Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

7. Run the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Enter your desired job title (e.g., "Frontend Developer", "Data Scientist")
3. Choose the number of interview questions (3, 5, 7, or 10)
4. Click "Start Interview"
5. For each question:
   - Listen to the AI-spoken question (click 🔊 to replay)
   - Click 🎤 to start recording your answer
   - Click ⏹️ to stop recording
   - Review the transcription
   - Submit your answer
6. After all questions, view your detailed results with:
   - Overall score
   - Individual question feedback
   - Strengths and weaknesses
   - Improvement suggestions

## API Endpoints

- `POST /api/interview/start` - Start a new interview session
- `GET /api/interview/{session_id}/question/{question_index}/audio` - Get question audio
- `POST /api/interview/transcribe` - Transcribe audio to text
- `POST /api/interview/submit-answer` - Submit an answer
- `POST /api/interview/{session_id}/evaluate` - Get interview evaluation
- `GET /api/interview/{session_id}/status` - Get session status

## Project Structure

```
textToSpeech/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── requirements.txt  # Python dependencies
│   ├── .env.example      # Environment variables template
│   └── .env              # Your API keys (create this)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InterviewSetup.jsx
│   │   │   ├── InterviewSession.jsx
│   │   │   └── InterviewResults.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Troubleshooting

### Microphone not working
- Ensure you've granted microphone permissions in your browser
- Check if your microphone is working in other applications
- Try using HTTPS (some browsers require secure context for microphone access)

### Audio playback issues
- Check your browser's audio settings
- Ensure volume is not muted
- Try a different browser

### API Key errors
- Verify your Gemini API key is correctly set in `.env`
- Ensure the `.env` file is in the `backend` directory
- Check if the API key is valid and has necessary permissions

### CORS errors
- Ensure backend is running on port 8000
- Ensure frontend is running on port 3000
- Check CORS settings in `main.py`

## Future Enhancements

- [ ] User authentication and session history
- [ ] Multiple language support
- [ ] Video recording option
- [ ] Mock technical coding interviews
- [ ] Industry-specific question templates
- [ ] Performance analytics over time
- [ ] Downloadable PDF reports

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.