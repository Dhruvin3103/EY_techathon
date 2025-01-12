# Backend Setup for SkillForge AI-Powered Learning Platform

This guide explains how to set up the backend of the platform, which is built using **FastAPI**.

## Prerequisites

Before proceeding, ensure you have the following installed on your system:
- **Python 3.10+**
- **pip** (Python package manager)
- **virtualenv** (for creating isolated environments)

---

## Setup Instructions

### 1. Clone the Repository
Clone the project repository to your local machine if not cloned yet:
```bash
git clone https://github.com/Dhruvin3103/EY_techathon
cd EY_techathon//backend/
```

### 2. Create a Virtual Environment
To isolate the backend dependencies, create a virtual environment:
```bash
python -m venv venv
```
Activate the virtual environment:
- On Linux/Mac:
  ```bash
  source venv/bin/activate
  ```
- On Windows:
  ```bash
  .\venv\Scripts\activate
  ```

### 3. Install Dependencies
Install the required libraries using `requirements.txt`:
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
The backend requires API keys for integration with various services. Add these keys to the `.env` file located in the `backend` directory.

#### Example `.env` file:
```
OPENAI_API_KEY=<your_openai_api_key>
GROQ_API_KEY=<your_groq_api_key>
CO_API_KEY=<your_cohere_api_key>
GEMINI_API_KEY=<your_gemini_api_key>
ANTHROPIC_API_KEY=<your_anthropic_api_key>
LANGSMITH_API_KEY=<your_langsmith_api_key>
ASSEMBLY_AI_API_KEY=<your_assembly_apiu_key>
```

#### Where to Get the API Keys:
- **OpenAI API Key**: [OpenAI API Keys](https://platform.openai.com/signup/)
- **GROQ API Key**: [GROQ API Documentation](https://groq.com/)
- **Cohere API Key (CO)**: [Cohere API Keys](https://dashboard.cohere.ai/)
- **Gemini API Key**: [Gemini API](https://gemini.openai.com/)
- **Anthropic API Key**: [Anthropic API Documentation](https://www.anthropic.com/)
- **Langsmith API Key**: [Langsmith API](https://langsmith.com/)

---

## Running the Backend

1. Ensure the virtual environment is activated:
   ```bash
   source venv/bin/activate  # Linux/Mac
   .\venv\Scripts\activate  # Windows
   ```

2. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```

   - `main` refers to the Python file containing the FastAPI app instance.
   - `app` is the FastAPI instance defined in the `main.py` file.

3. Open your browser and navigate to:
   ```
   http://127.0.0.1:8000
   ```
---

## Folder Structure

```
backend/
|
|-- assessment/                           # will contain the scripts for phase1 
|
|-- course_generation/                    # Contains ai model configuration used for phase 2 
|   |-- chapter_generation.py             # langgraph llm model to generate detail subchapter contents (used groq and gemini)
|   |-- mindMap_geneartion.py             # gemini model which takes the input data from subchapter and yt_summary to generate mindmaps
|   |-- road_map_generation.py            # Langgragh script build with cohere's and groq's llm models to generate roadmaps
|   |-- yt_summarize.py                   # a simple script to extract audio from yt video and summarize it using assembly ai 
|
|-- career/                               # will contain the scripts for phase3 
|
|-- .env.example                          # Example of Environment variable configuration
|
|-- logs.txt                              # contains all the logs of AI models which we runned 
|-- requirements.txt        # Python dependencies
|-- main.py                 # Entry point for FastAPI server
```

---
