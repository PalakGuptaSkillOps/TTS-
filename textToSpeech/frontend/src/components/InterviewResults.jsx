import React, { useEffect } from 'react'

function InterviewResults({ evaluation, onRestart }) {
  useEffect(() => {
    console.log('InterviewResults received evaluation:', evaluation)
  }, [evaluation])

  if (!evaluation) {
    return <div className="container"><p>Loading results...</p></div>
  }

  const { evaluation: evalData, job_title, behavioral_analysis, snapshots_analyzed } = evaluation

  if (!evalData) {
    return <div className="container"><p>Error: No evaluation data available</p></div>
  }

  return (
    <div className="container">
      <h2>🎉 Interview Complete!</h2>
      <p className="subtitle">Position: <strong>{job_title}</strong></p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="score-card">
          <h3>Answer Quality</h3>
          <div className="score-number">{evalData.overall_score}</div>
          <p>out of 100</p>
        </div>

        {behavioral_analysis && behavioral_analysis.overall_behavior_score && (
          <div className="score-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h3>Behavioral Score</h3>
            <div className="score-number">{behavioral_analysis.overall_behavior_score}</div>
            <p>out of 100</p>
            <p style={{ fontSize: '12px', marginTop: '5px', opacity: 0.9 }}>
              📸 {snapshots_analyzed || 0} snapshots analyzed
            </p>
          </div>
        )}
      </div>

      <div className="results-container">
        {behavioral_analysis && behavioral_analysis.overall_behavior_score && (
          <div className="feedback-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <h3 style={{ color: 'white' }}>🎥 Behavioral Analysis</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', marginTop: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>😊 Confidence Level</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{behavioral_analysis.confidence_level}</p>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>💡 Engagement Level</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{behavioral_analysis.engagement_level}</p>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>👁️ Attention & Focus</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{behavioral_analysis.attention_level}</p>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>❤️ Emotional State</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{behavioral_analysis.emotional_state}</p>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>🤝 Body Language</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{behavioral_analysis.body_language_assessment}</p>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>👀 Eye Contact</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{behavioral_analysis.eye_contact_assessment}</p>
              </div>
            </div>

            {behavioral_analysis.detailed_observations && behavioral_analysis.detailed_observations.length > 0 && (
              <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px' }}>
                <h4 style={{ color: 'white', marginBottom: '10px' }}>📋 Detailed Observations</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {behavioral_analysis.detailed_observations.map((obs, i) => (
                    <li key={i} style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.5' }}>
                      • {obs}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {behavioral_analysis.recommendations && behavioral_analysis.recommendations.length > 0 && (
              <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: '10px' }}>
                <h4 style={{ color: 'white', marginBottom: '10px' }}>💫 Behavioral Recommendations</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {behavioral_analysis.recommendations.map((rec, i) => (
                    <li key={i} style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.5' }}>
                      ✓ {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="feedback-card">
          <h3>📊 Overall Assessment</h3>
          <p style={{ color: '#555', lineHeight: '1.6' }}>{evalData.overall_assessment}</p>
        </div>

        <h3>💬 Detailed Feedback</h3>
        {evalData.answer_feedbacks && evalData.answer_feedbacks.length > 0 ? (
        evalData.answer_feedbacks.map((feedback, index) => (
          <div key={index} className="feedback-card">
            <h3 style={{ color: '#333' }}>Question {feedback.question_number}</h3>
            <p style={{ color: '#666', marginBottom: '15px', fontStyle: 'italic' }}>
              "{feedback.question}"
            </p>

            <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
              <strong>Your Answer:</strong>
              <p style={{ color: '#555', marginTop: '8px' }}>{feedback.answer}</p>
            </div>

            <div style={{ 
              display: 'inline-block', 
              background: '#667eea', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '20px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>
              Score: {feedback.score}/100
            </div>

            {feedback.strengths && feedback.strengths.length > 0 && (
              <div className="feedback-section">
                <h4 style={{ color: '#4caf50' }}>✓ Strengths</h4>
                <ul className="feedback-list strengths">
                  {feedback.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.weaknesses && feedback.weaknesses.length > 0 && (
              <div className="feedback-section">
                <h4 style={{ color: '#ff9800' }}>⚠ Areas to Work On</h4>
                <ul className="feedback-list weaknesses">
                  {feedback.weaknesses.map((weakness, i) => (
                    <li key={i}>{weakness}</li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.improvements && feedback.improvements.length > 0 && (
              <div className="feedback-section">
                <h4 style={{ color: '#2196f3' }}>→ Improvement Suggestions</h4>
                <ul className="feedback-list improvements">
                  {feedback.improvements.map((improvement, i) => (
                    <li key={i}>{improvement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
        ) : (
          <p>No detailed feedback available</p>
        )}

        {evalData.key_areas_to_improve && evalData.key_areas_to_improve.length > 0 && (
          <div className="feedback-card" style={{ background: '#fff3e0' }}>
            <h3 style={{ color: '#e65100' }}>🎯 Key Areas to Improve</h3>
            <ul className="feedback-list">
              {evalData.key_areas_to_improve.map((area, index) => (
                <li key={index} style={{ color: '#555' }}>{area}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button onClick={onRestart} style={{ marginTop: '30px' }}>
        🔄 Start New Interview
      </button>
    </div>
  )
}

export default InterviewResults