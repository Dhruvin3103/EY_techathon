from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from typing import List
from course_generation.road_map_generation import road_map_call_llm
from course_generation.chapter_generation import data_generation_call_llm
import google.generativeai as genai
from dotenv import load_dotenv
import os
from datetime import datetime
load_dotenv()
gemini_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_api_key)
app = FastAPI()

origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000", 
]

chat_sessions = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

# Input models for the requests
class InputData(BaseModel):
    topic: str
    user_level: str
    additional_pref: str
    chapter: str
    subchapter: str

class RoadmapRequest(BaseModel):
    topic: str
    user_level: str
    additional_pref: str
    
class StartChatRequest(BaseModel):
    topic_content: str
    session_id: str

class UserMessage(BaseModel):
    session_id: str
    message: str

class QuizAnswer(BaseModel):
    quiz_type: str
    question: str
    answer: str
    language: str

class BotResponse(BaseModel):
    response: str
    status_code: int

# function to extract the JSON data from the raw response(basically from the ai output generated)
def extract_json(raw_response):
    json_start = raw_response.find("{")
    json_end = raw_response.rfind("}") + 1
    json_data = raw_response[json_start:json_end]
    json_data = json_data.replace('"""', '\\"')
    print(f"The json data extracted is : \n{json_data}")
    data = json.loads(json_data, strict=False)
    return data

# Logging utility
def log_request_response(endpoint: str, request_data: dict, response_data: dict):
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "endpoint": endpoint,
        "request": request_data,
        "response": response_data
    }
    with open("data.txt", "a") as log_file:
        log_file.write("="*92 + "\n") 
        log_file.write(json.dumps(log_entry, indent=4) + "\n")

# Root endpoint to check if the API is running
@app.get("/")
async def read_root():
    response = {
        "status_code": 200,
        "message": "Welcome to the course generation API!",
        "data": None
    }
    log_request_response("/", {}, response)
    return response

# Endpoint to generate content(course for each subchapter)
@app.post("/generate-content/")
async def generate_content(request: InputData):
    try:
        print(f"The input data is {request}")
        result = data_generation_call_llm(
            topic=request.topic,
            user_level=request.user_level,
            additional_pref=request.additional_pref,
            chapter=request.chapter,
            subchapter=request.subchapter
        )
        print(f"The result for the content generation is : \n{result}")
        json_output = extract_json(result)
        print(f"The json output is :\n{json_output}")
        response = {
            "status_code": 200,
            "message": "Content generated successfully",
            "data": json_output
        }
        log_request_response("/generate-content/", request.dict(), response)
        return response
    except Exception as e:
        error_response = {
            "status_code": 500,
            "message": "Error occurred while generating content",
            "error": str(e),
            "data": None
        }
        log_request_response("/generate-content/", request.dict(), error_response)
        raise HTTPException(status_code=500, detail=error_response)

# Endpoint to generate roadmap based on the user details
@app.post("/generate-roadmap/")
async def generate_roadmap(request: RoadmapRequest):
    try:
        print(f"The request is {request}")
        result = road_map_call_llm(
            topic=request.topic,
            user_level=request.user_level,
            additional_pref=request.additional_pref
        )
        print(f"The result for the road_map generation is :\n{result}")
        json_output = extract_json(result)
        print(f"The json output is :\n{json_output}")
        response = {
            "status_code": 200,
            "message": "Roadmap generated successfully",
            "data": json_output
        }
        log_request_response("/generate-roadmap/", request.dict(), response)
        return response
    except Exception as e:
        error_response = {
            "status_code": 500,
            "message": "Error occurred while generating roadmap",
            "error": str(e),
            "data": None
        }
        log_request_response("/generate-roadmap/", request.dict(), error_response)
        raise HTTPException(status_code=500, detail=error_response)

# Endpoint to check the answer of users for particular answer 
@app.post("/check-answer/")
async def check_answer(request: QuizAnswer):
    try:
        print(f"The request is {request}")
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=f"""You are an AI code validation assistant. You will check if the following code is correct, partial, or incorrect based on the question given by user : 
                Please evaluate the code and return the output strictly in the following format:

        {{
            "status": "correct" | "parital" | "incorrect",
            "feedback": "<detailed feedback about the code>"
        }}

        - The "status" should be one of the following: "correct", "partial", or "incorrect".
        - The "feedback" should provide a detailed explanation and any relevant feedback that can help the user improve the code.
        - The response should be a valid JSON object with exactly these fields.
        
        
        and follow the strict format dont do include anything else in the response
            """
        )
        question = request.question
        answer = request.answer
        
        prompt = f"""
        Question: {question}
        Code: 
        {answer}
        The language of the code is: python
        """
        response = model.generate_content(prompt)
        print(response)
        json_output = extract_json(response.text)
        print(f"The json output is :\n{json_output}")
        response_data = {
            "status_code": 200,
            "data": json_output
        }
        log_request_response("/check_answer/", request.dict(), response_data)
        return response_data
    except Exception as e:
        error_response = {
            "status_code": 500,
            "message": "Error occurred while checking answer",
            "error": str(e),
            "data": None
        }
        log_request_response("/check_answer/", request.dict(), error_response)
        raise HTTPException(status_code=500, detail=error_response)
        
# Endpoint to start a chat session
@app.post("/start_chat")
async def start_chat(request: StartChatRequest):
    try:
        topic_content = request.topic_content
        session_id = request.session_id
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=f"You are an AI assistant doubt solver. You very skilled in solving doubts you will be provided with the content from which might have come with the doubt so check the content and understand and address the user's doubt. The content from which user come with doubt is :\n{topic_content}"
        )
        chat = model.start_chat(
            history=[
            ]
        )
        chat_sessions[session_id] = chat
        response = {"status_code": 200,"session_id": session_id}
        log_request_response("/start_chat", request.dict(), response)
        return response
    except Exception as e:
        error_response = {"error": str(e)}
        log_request_response("/start_chat", request.dict(), error_response)
        raise HTTPException(status_code=500, detail=error_response)

# Endpoint to send a user message
@app.post("/chat")
async def chat_with_gemini(user_message: UserMessage):
    try:
        chat = chat_sessions.get(user_message.session_id)
        if not chat:
            error_response = {"error": "Session not found"}
            log_request_response("/chat", user_message.dict(), error_response)
            raise HTTPException(status_code=404, detail="Session not found")
        response = chat.send_message(user_message.message)
        response_data = {
            "data": response.text,
            "status_code": 200
        }
        log_request_response("/chat", user_message.dict(), response_data)
        return response_data
    except Exception as e:
        error_response = {"error": str(e)}
        log_request_response("/chat", user_message.dict(), error_response)
        raise HTTPException(status_code=500, detail=error_response)