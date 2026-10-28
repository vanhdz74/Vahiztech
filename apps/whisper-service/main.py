import os
import shutil
import json
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from faster_whisper import WhisperModel
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Cấu hình Gemini API
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)
gemini_model = genai.GenerativeModel("gemini-3.5-flash-lite")

app = FastAPI(title="VihoTask Speech-to-Text & Task AI Engine")

DEVICE = "cuda" if os.getenv("USE_CUDA") == "true" else "cpu"
COMPUTE_TYPE = "float16" if DEVICE == "cuda" else "int8"

print(f"⏳ Loading Whisper large-v3 on {DEVICE} ({COMPUTE_TYPE})...")
model = WhisperModel("large-v3", device=DEVICE, compute_type=COMPUTE_TYPE)
print("✅ Whisper Model Loaded!")

@app.post("/api/v1/process-meeting")
async def process_meeting(
    file: UploadFile = File(...),
    language: str = Form("vi")
):
    temp_path = f"temp_{file.filename}"
    try:
        # 1. Lưu file ghi âm tạm thời
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # 2. Whisper bóc tách giọng nói thành văn bản
        segments, info = model.transcribe(temp_path, language=language, vad_filter=True)
        transcript_text = " ".join([seg.text for seg in segments]).strip()
        
        # 3. Gửi Transcript sang Gemini để bóc tách Task JSON
        tasks = []
        if GEMINI_KEY and transcript_text:
            prompt = f"""
            Đọc văn bản cuộc họp sau và bóc tách thành danh sách công việc (Task).
            Chỉ trả về JSON Array thuần túy (không chứa markdown ```json):
            [
              {{
                "title": "Tên công việc",
                "assignee": "Người nhận việc (nếu có)",
                "priority": "HIGH/MEDIUM/LOW"
              }}
            ]
            
            Văn bản: {transcript_text}
            """
            ai_response = gemini_model.generate_content(prompt)
            clean_json = ai_response.text.replace("```json", "").replace("```", "").strip()
            tasks = json.loads(clean_json)

        return {
            "success": True,
            "duration_seconds": round(info.duration, 2),
            "transcript": transcript_text,
            "extracted_tasks": tasks
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)