import { useState } from 'react'
import InterviewSetup from './components/InterviewSetup'
import InterviewSession from './components/InterviewSession'
import InterviewResults from './components/InterviewResults'
import './App.css'

function App() {
  const [stage, setStage] = useState('setup') // setup, interview, results
  const [sessionData, setSessionData] = useState(null)
  const [evaluationData, setEvaluationData] = useState(null)

  const handleStartInterview = (data) => {
    setSessionData(data)
    setStage('interview')
  }

  const handleInterviewComplete = (evaluation) => {
    setEvaluationData(evaluation)
    setStage('results')
  }

  const handleRestart = () => {
    setSessionData(null)
    setEvaluationData(null)
    setStage('setup')
  }

  return (
    <div className="App">
      {stage === 'setup' && (
        <InterviewSetup onStart={handleStartInterview} />
      )}
      {stage === 'interview' && sessionData && (
        <InterviewSession 
          sessionData={sessionData}
          onComplete={handleInterviewComplete}
        />
      )}
      {stage === 'results' && evaluationData && (
        <InterviewResults 
          evaluation={evaluationData}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default App