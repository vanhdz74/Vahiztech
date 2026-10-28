import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Sử dụng mô hình Gemini 3.5 Flash-Lite
model = genai.GenerativeModel("gemini-3.5-flash-lite")

# Hoặc dùng alias tự động cập nhật bản mới nhất:
# model = genai.GenerativeModel("gemini-flash-lite-latest")

response = model.generate_content("Xin chào, kiểm tra kết nối API!")
print(response.text)