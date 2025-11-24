import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

const CameraProctor = forwardRef(({ sessionId, isInterviewActive, currentQuestion, onSnapshotCaptured }, ref) => {
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [snapshotCount, setSnapshotCount] = useState(0)
  const [error, setError] = useState('')
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const snapshotsRef = useRef({})

  useImperativeHandle(ref, () => ({
    getSnapshots: () => snapshotsRef.current,
    captureSnapshot: captureSnapshotForQuestion
  }))

  useEffect(() => {
    if (isInterviewActive) {
      startCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isInterviewActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraEnabled(true)
        setError('')
      }
    } catch (err) {
      console.error('Camera access error:', err)
      setError('Camera access denied. Behavioral analysis will be unavailable.')
      setCameraEnabled(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setCameraEnabled(false)
  }

  const captureSnapshotForQuestion = () => {
    if (!videoRef.current || !canvasRef.current || !cameraEnabled) {
      console.warn('Camera not ready for snapshot')
      return
    }

    try {
      const canvas = canvasRef.current
      const video = videoRef.current
      
      canvas.width = 320
      canvas.height = 240
      
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, 320, 240)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const questionNum = currentQuestion
          snapshotsRef.current[questionNum] = {
            blob: blob,
            timestamp: new Date().toISOString(),
            question_index: questionNum
          }
          
          const newCount = Object.keys(snapshotsRef.current).length
          setSnapshotCount(newCount)
          
          if (onSnapshotCaptured) {
            onSnapshotCaptured(snapshotsRef.current)
          }
        }
      }, 'image/jpeg', 0.5)
      
    } catch (err) {
      console.error('Error capturing snapshot:', err)
    }
  }

  return (
    <div className="camera-proctor">
      <div className="camera-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="camera-preview"
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {cameraEnabled && (
          <div className="camera-status">
            <div className="recording-indicator">
              <span className="recording-dot"></span>
              <span>Recording</span>
            </div>
            <div className="snapshot-count">
              📸 {snapshotCount} snapshots
            </div>
          </div>
        )}
        
        {error && (
          <div className="camera-error">
            ⚠️ {error}
          </div>
        )}
        
        {!cameraEnabled && !error && (
          <div className="camera-loading">
            🎥 Initializing camera...
          </div>
        )}
      </div>
      
      <style jsx>{`
        .camera-proctor {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }

        .camera-container {
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .camera-preview {
          width: 240px;
          height: 180px;
          object-fit: cover;
          display: block;
        }

        .camera-status {
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .recording-indicator {
          background: rgba(220, 38, 38, 0.9);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .recording-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .snapshot-count {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .camera-error {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(220, 38, 38, 0.95);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-size: 12px;
          text-align: center;
          max-width: 200px;
        }

        .camera-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
})

CameraProctor.displayName = 'CameraProctor'
export default CameraProctor