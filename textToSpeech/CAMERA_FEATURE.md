# 🎥 Camera Proctoring & AI Behavioral Analysis

## Overview
Your interview platform now includes **AI-powered behavioral analysis** using camera snapshots and Google's Gemini Vision AI.

---

## ✨ Features

### 1. **Automatic Camera Capture**
- 📸 Captures random snapshots every 15-30 seconds during interview
- 🔴 Live camera preview in top-right corner
- 📊 Real-time snapshot counter
- 🔒 Privacy-first: Photos deleted after analysis

### 2. **AI Behavioral Analysis**
Gemini Vision AI evaluates:
- 😊 **Confidence Level**: Posture, facial expressions
- 💡 **Engagement Level**: Attentiveness, interest
- 👁️ **Attention & Focus**: Eye contact, distractions
- ❤️ **Emotional State**: Calm, nervous, enthusiastic
- 🤝 **Body Language**: Gestures, professionalism
- 👀 **Eye Contact**: Maintaining camera focus

### 3. **Comprehensive Report**
- Two separate scores: Answer Quality + Behavioral Score
- Detailed observations for each snapshot
- Personalized recommendations
- Multi-language support (all 20 languages)

---

## 🚀 How It Works

### During Interview:
1. **Camera Permission**: Browser requests camera access
2. **Live Preview**: Small camera window appears (top-right)
3. **Random Snapshots**: System captures photos automatically
4. **Counter Updates**: Shows number of snapshots taken

### After Interview:
1. **Text Evaluation**: AI evaluates your answers
2. **Behavioral Analysis**: AI analyzes all snapshots using Gemini Vision
3. **Combined Report**: Shows both scores and detailed feedback
4. **Auto-Cleanup**: All photos deleted (privacy protected)

---

## 🛡️ Privacy & Security

✅ **No Permanent Storage**: Photos deleted immediately after analysis  
✅ **Local Processing**: Only sent to Google's Gemini Vision API  
✅ **User Control**: Can deny camera access (behavioral score won't be available)  
✅ **Transparent**: User sees camera feed at all times  

---

## 📱 Browser Compatibility

| Browser | Camera | Speech Recognition |
|---------|--------|-------------------|
| Chrome | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Safari | ✅ | ⚠️ Limited |
| Firefox | ✅ | ❌ |

**Recommended**: Chrome or Edge for full functionality

---

## 🔧 Technical Details

### Backend Endpoints:
```
POST /api/interview/{session_id}/upload-snapshot
  - Receives camera snapshots during interview
  - Stores temporarily in session

POST /api/interview/{session_id}/analyze-behavior
  - Sends all snapshots to Gemini Vision API
  - Returns comprehensive behavioral analysis
  - Deletes all photos after analysis
```

### Frontend Components:
- `CameraProctor.jsx`: Handles camera access and snapshot capture
- `InterviewSession.jsx`: Integrated camera during interview
- `InterviewResults.jsx`: Displays behavioral analysis

### AI Model:
- **Model**: `gemini-2.0-flash-exp` (Gemini Vision)
- **Max Snapshots**: 10 per interview (token optimization)
- **Analysis Time**: ~5-10 seconds for 10 images

---

## 🎯 Use Cases

1. **Remote Interviews**: Monitor candidate engagement remotely
2. **Proctoring**: Detect distraction or cheating patterns
3. **Soft Skills Assessment**: Evaluate communication skills
4. **Training**: Help candidates improve body language
5. **Research**: Analyze interview anxiety patterns

---

## 🚨 Troubleshooting

### Camera Not Working?
1. Check browser permissions (Settings > Privacy > Camera)
2. Ensure no other app is using camera
3. Try different browser (Chrome recommended)
4. Reload page and allow permission when prompted

### No Behavioral Score?
- Camera permission denied → Analysis skipped
- Interview still works, just no behavioral data
- Message shown: "Enable camera access for future interviews"

### Low Quality Snapshots?
- Ensure good lighting
- Position camera at eye level
- Maintain 1-2 feet distance from screen
- Avoid backlight (window behind you)

---

## 🔮 Future Enhancements

- [ ] Real-time emotion tracking during answers
- [ ] Voice tone analysis (stress, confidence)
- [ ] Multi-person detection (prevent cheating)
- [ ] Attention heatmap visualization
- [ ] Export behavioral report as PDF
- [ ] Comparison with successful candidates

---

## 💡 Tips for Best Results

### For Candidates:
✅ Sit in well-lit room  
✅ Look at camera when answering  
✅ Maintain good posture  
✅ Minimize distractions in background  
✅ Test camera before interview  

### For Interviewers:
✅ Inform candidates about camera analysis  
✅ Provide privacy policy  
✅ Use for supplementary insights only  
✅ Combine with answer quality for holistic view  
✅ Consider cultural differences in body language  

---

## 📊 Example Output

```json
{
  "overall_behavior_score": 87,
  "confidence_level": "High - maintained steady posture",
  "engagement_level": "Excellent - showed enthusiasm",
  "attention_level": "Very Good - minimal distraction",
  "emotional_state": "Calm with moments of enthusiasm",
  "body_language_assessment": "Professional gestures",
  "eye_contact_assessment": "Strong - 85% camera focus",
  "detailed_observations": [
    "Snapshot 1-3: Started slightly nervous",
    "Snapshot 4-6: Became more confident",
    "Snapshot 7-10: Maintained engagement"
  ],
  "recommendations": [
    "Excellent non-verbal communication",
    "Could improve eye contact consistency",
    "Strong professional presence"
  ]
}
```

---

## 🆘 Support

If you encounter issues:
1. Check console logs (F12 in browser)
2. Verify backend is running (`http://localhost:8000`)
3. Ensure Gemini API key is configured
4. Test with simple 2-3 question interview first

---

**Made with ❤️ using Google Gemini Vision AI**