import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import CameraProctor from './CameraProctor'

const API_URL = 'http://localhost:8000'

function InterviewSession({ sessionData, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [audioPlaying, setAudioPlaying] = useState(false)
  
  const recognitionRef = useRef(null)
  const audioRef = useRef(new Audio())
  const cameraRef = useRef(null)

  // Initialize Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      
      // Map language codes to speech recognition locale codes
      const languageLocales = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'zh': 'zh-CN',
        'ja': 'ja-JP',
        'ko': 'ko-KR',
        'ar': 'ar-SA',
        'pt': 'pt-PT',
        'ru': 'ru-RU',
        'it': 'it-IT',
        'bn': 'bn-IN',
        'te': 'te-IN',
        'ta': 'ta-IN',
        'mr': 'mr-IN',
        'gu': 'gu-IN',
        'kn': 'kn-IN',
        'ml': 'ml-IN',
        'pa': 'pa-IN'
      }
      
      const selectedLanguage = sessionData.language || 'en'
      recognitionRef.current.lang = languageLocales[selectedLanguage] || 'en-US'

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }

        if (finalTranscript) {
          setTranscription(prev => prev + finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setStatus('⚠️ Speech recognition error. Please try again.')
        setIsRecording(false)
      }

      recognitionRef.current.onend = () => {
        if (isRecording) {
          setStatus('✅ Recording stopped. Review and submit your answer.')
        }
        setIsRecording(false)
      }
    } else {
      setStatus('⚠️ Speech recognition not supported in this browser. Please use Chrome or Edge.')
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [sessionData.language])

  useEffect(() => {
    // Auto-play question audio when question changes
    playQuestionAudio()
  }, [currentQuestion])

  const playQuestionAudio = async () => {
    try {
      setAudioPlaying(true)
      setStatus('🔊 Playing question...')
      
      const audioUrl = `${API_URL}/api/interview/${sessionData.session_id}/question/${currentQuestion}/audio`
      
      audioRef.current.src = audioUrl
      audioRef.current.onended = () => {
        setAudioPlaying(false)
        setStatus('🎤 Click the microphone to record your answer')
      }
      
      await audioRef.current.play()
    } catch (error) {
      console.error('Error playing audio:', error)
      setAudioPlaying(false)
      setStatus('⚠️ Could not play audio. You can still read and answer the question.')
    }
  }

  const startRecording = () => {
    if (!recognitionRef.current) {
      setStatus('⚠️ Speech recognition not available. Please use Chrome or Edge.')
      return
    }

    try {
      setTranscription('')
      recognitionRef.current.start()
      setIsRecording(true)
      setStatus('🔴 Recording... Speak your answer. Click stop when done.')
      
      if (cameraRef.current?.captureSnapshot) {
        cameraRef.current.captureSnapshot()
      }
    } catch (error) {
      console.error('Error starting recording:', error)
      setStatus('⚠️ Could not start recording. Please try again.')
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
      setStatus('✅ Recording stopped. Review and submit your answer.')
    }
  }

  const handleSubmitAnswer = async () => {
    if (!transcription.trim()) {
      setStatus('⚠️ Please record an answer before submitting')
      return
    }

    setLoading(true)
    setStatus('💾 Saving your answer...')

    try {
      await axios.post(`${API_URL}/api/interview/submit-answer`, {
        session_id: sessionData.session_id,
        question_index: currentQuestion,
        answer_text: transcription
      })

      const newAnswers = [...answers, {
        question: sessionData.questions[currentQuestion],
        answer: transcription
      }]
      setAnswers(newAnswers)

      // Move to next question or finish
      if (currentQuestion < sessionData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setTranscription('')
        setStatus('✅ Answer saved! Moving to next question...')
      } else {
        // Interview complete, get evaluation
        await evaluateInterview()
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      setStatus('⚠️ Failed to submit answer. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const evaluateInterview = async () => {
    setLoading(true)
    setStatus('🤖 AI is evaluating your interview...')

    try {
      setStatus('📝 Getting feedback...')
      const textEvaluation = await axios.post(
        `${API_URL}/api/interview/${sessionData.session_id}/evaluate`
      )
      console.log('Text evaluation received:', textEvaluation.data)

      setStatus('📸 Analyzing your professionalism...')
      
      let behaviorAnalysis = null
      try {
        const snapshotsObj = cameraRef.current?.getSnapshots() || {}
        const snapshotsArray = []
        
        for (const [key, snapshot] of Object.entries(snapshotsObj)) {
          if (snapshot.blob) {
            const base64 = await new Promise(resolve => {
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result)
              reader.readAsDataURL(snapshot.blob)
            })
            snapshotsArray.push({
              data: base64,
              question_index: snapshot.question_index
            })
          }
        }
        
        console.log('Sending snapshots:', snapshotsArray.length)
        
        behaviorAnalysis = await axios.post(
          `${API_URL}/api/interview/${sessionData.session_id}/analyze-behavior`,
          { snapshots: snapshotsArray },
          { timeout: 60000 }
        )
        console.log('Behavioral analysis received:', behaviorAnalysis.data)
      } catch (behaviorError) {
        console.warn('Behavioral analysis failed, continuing with text evaluation only:', behaviorError)
        setStatus('⚠️ Could not analyze behavior, showing text evaluation results...')
      }

      const completionData = {
        evaluation: textEvaluation.data.evaluation,
        job_title: textEvaluation.data.job_title,
        session_id: textEvaluation.data.session_id,
        behavioral_analysis: behaviorAnalysis?.data?.behavioral_analysis || null,
        snapshots_analyzed: behaviorAnalysis?.data?.snapshots_analyzed || 0
      }
      
      console.log('Final completion data:', completionData)
      onComplete(completionData)
    } catch (error) {
      console.error('Error evaluating interview:', error)
      setStatus('⚠️ Failed to evaluate interview. Please try again.')
      setLoading(false)
    }
  }

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const progress = ((currentQuestion + 1) / sessionData.questions.length) * 100

  return (
    <div className="container">
      <CameraProctor 
        ref={cameraRef}
        sessionId={sessionData.session_id} 
        isInterviewActive={!loading && currentQuestion < sessionData.questions.length}
        currentQuestion={currentQuestion}
      />
      
      <h2>📋 Interview Session</h2>
      <p className="subtitle">Job Title: <strong>{sessionData.job_title}</strong></p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
        Question {currentQuestion + 1} of {sessionData.questions.length}
      </p>

      <div className="question-card">
        <h3>Question {currentQuestion + 1}</h3>
        <p className="question-text">{sessionData.questions[currentQuestion]}</p>
      </div>

      <div className="audio-controls">
        <button
          className="icon-button"
          onClick={playQuestionAudio}
          disabled={audioPlaying || loading}
        >
          🔊
        </button>

        <button
          className={`icon-button ${isRecording ? 'recording' : ''}`}
          onClick={handleRecordingToggle}
          disabled={loading || audioPlaying}
        >
          {isRecording ? '⏹️' : '🎤'}
        </button>
      </div>

      {status && (
        <div className={`status-message ${transcription ? 'status-success' : 'status-info'}`}>
          {status}
        </div>
      )}

      {transcription && (
        <div>
          <h3>Your Answer:</h3>
          <div className="transcription-box">
            {transcription}
          </div>

          <button
            onClick={handleSubmitAnswer}
            disabled={loading}
          >
            {currentQuestion < sessionData.questions.length - 1
              ? '✅ Submit & Next Question'
              : '🏁 Submit & Finish Interview'}
          </button>
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>{status}</p>
        </div>
      )}
    </div>
  )
}

export default InterviewSession