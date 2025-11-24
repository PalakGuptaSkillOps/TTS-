import { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

function InterviewSetup({ onStart }) {
  const [jobTitle, setJobTitle] = useState('')
  const [numQuestions, setNumQuestions] = useState(5)
  const [language, setLanguage] = useState('en')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!jobTitle.trim()) {
      setError('Please enter a job title')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_URL}/api/interview/start`, {
        job_title: jobTitle,
        num_questions: numQuestions,
        language: language
      })

      onStart(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to start interview. Please try again.')
      console.error('Error starting interview:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>🎯 AI Interview Platform</h1>
      <p className="subtitle">Practice your interview skills with AI-powered voice interviews</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title / Position</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="numQuestions">Number of Questions</label>
          <select
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            disabled={loading}
          >
            <option value={3}>3 Questions</option>
            <option value={5}>5 Questions</option>
            <option value={7}>7 Questions</option>
            <option value={10}>10 Questions</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="language">Interview Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={loading}
          >
            <option value="en">🇬🇧 English</option>
            <option value="hi">🇮🇳 हिंदी (Hindi)</option>
            <option value="es">🇪🇸 Español (Spanish)</option>
            <option value="fr">🇫🇷 Français (French)</option>
            <option value="de">🇩🇪 Deutsch (German)</option>
            <option value="zh">🇨🇳 中文 (Chinese)</option>
            <option value="ja">🇯🇵 日本語 (Japanese)</option>
            <option value="ko">🇰🇷 한국어 (Korean)</option>
            <option value="ar">🇸🇦 العربية (Arabic)</option>
            <option value="pt">🇵🇹 Português (Portuguese)</option>
            <option value="ru">🇷🇺 Русский (Russian)</option>
            <option value="it">🇮🇹 Italiano (Italian)</option>
            <option value="bn">🇧🇩 বাংলা (Bengali)</option>
            <option value="te">🇮🇳 తెలుగు (Telugu)</option>
            <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
            <option value="mr">🇮🇳 मराठी (Marathi)</option>
            <option value="gu">🇮🇳 ગુજરાતી (Gujarati)</option>
            <option value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</option>
            <option value="ml">🇮🇳 മലയാളം (Malayalam)</option>
            <option value="pa">🇮🇳 ਪੰਜਾਬੀ (Punjabi)</option>
          </select>
        </div>

        {error && (
          <div className="status-message status-error">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? '🔄 Generating Interview...' : '🚀 Start Interview'}
        </button>
      </form>

      <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9ff', borderRadius: '10px' }}>
        <h3>📝 How it works:</h3>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#555' }}>
          <li>Enter your desired job title</li>
          <li>Choose the number of interview questions</li>
          <li>AI will ask questions via voice</li>
          <li>Record your answers using the microphone</li>
          <li>Get detailed feedback on your performance</li>
        </ol>
      </div>
    </div>
  )
}

export default InterviewSetup