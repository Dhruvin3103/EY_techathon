import os
import json
from typing import TypedDict
from typing_extensions import Annotated, List
import operator
from langchain_groq import ChatGroq
from langchain_cohere import ChatCohere
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv
load_dotenv()

class AgentState(TypedDict):
    generated_prompt: str
    topic: str
    user_level: str
    additional_pref: str
    chapter: str
    subchapter: str
    road_map: str
    ai_output: Annotated[List[str], operator.add]
    feedback: Annotated[List[str], operator.add]

co_api_key = os.getenv("CO_API_KEY")
groq_api_key = os.getenv("GROQ_API_KEY")
openai_api_key = os.getenv("OPENAI_API_KEY")
anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")

# Initialize LLM
llm = ChatGroq(api_key=groq_api_key, temperature=0, model="llama3-8b-8192")
# llm = ChatCohere(model="command-r-plus")


def data_generation_call_llm(topic, user_level, additional_pref, chapter, subchapter):
    # Step 1: Prompt generation
    prompt_generation_prompt = f"""
    You are an expert course creation assistant. Your job is to design a detailed and precise instruction set (prompt) for generating educational content. 

    A user has selected the following subchapter: "{subchapter}". This subchapter is part of the course topic "{topic}". The user's understanding level is "{user_level}".  

    Your task: 
    1. Analyze the subchapter title and the course topic.  
    2. Create a detailed prompt that guides an AI model to generate highly relevant and in-depth educational content for this subchapter.  

    The generated prompt should:
    - Cover all key concepts and ideas related to the subchapter.  
    - Specify examples, practical applications, and, where applicable, code snippets or exercises.  
    - Include a step-by-step explanation for better understanding.  
    - Focus on clarity and ensure the content matches the user's level of understanding ("{user_level}").  
    - Also, every subchapter will have a basic introduction, explanation, examples, and exercises to be practiced by the user.

    Make sure the final prompt is well-structured and clearly specifies all the requirements for generating excellent content.
    Also at the end of the prompt, give a sample JSON format on how the course will be generated.
    """

    final_prompt = f"""
    You are an educator and a course generation assistant. Your goal is to provide clear, structured, and engaging learning materials suitable for the user's level of understanding. 
    You are an expert course content creator. Your task is to generate a structured JSON output that provides detailed and practical educational content for a given subchapter in a course. 
    
    ### Requirements:
    1. **Content Adaptability**: Ensure the content aligns with the user's understanding level (e.g., Beginner, Intermediate, Advanced).
    2. **Dynamic Structure**:
        - If the subchapter involves theoretical concepts, include detailed explanations, practical applications, and examples.
        - If the subchapter involves technical or coding concepts, include code snippets, detailed walkthroughs, and hands-on exercises.
        - For any topic, ensure examples are directly relevant to the subchapter and easy to follow.
    3. **Structured Output**:
        The JSON must contain the following sections as the content_type and their values as content_values and this values should be in text format and if there is code snippet then it should be in code format and description explaining each line of code :
        - `"key_concepts"`: A detailed explanation of the core concepts in the subchapter.
        - `"examples"`: Real-world examples or use cases, including step-by-step instructions or scenarios, if relevant.
        - `"applications"`: Practical applications or benefits of the concepts.
        - `"code_snippets"`: Include when the topic involves programming, technical work, or requires demonstrations. and give a proper codes not just one line codes explain each line of code. and wherever the code you are giving in this format and it should be in one line string format as :  a code snippet as a string and Ensure the following: Escape all special characters properly (e.g., backslashes as \\\\, double quotes as \\"),  Represent newlines as \\n to maintain code formatting., The output JSON should be valid and error-free.
        Provide only the JSON object without any explanations."
        - `"practical_exercise"`: A hands-on task for the user to apply their knowledge.
        - `"explanation_style"`: Indicate whether the explanation should be step-by-step, detailed, or concise.
    4. **Detailed content**: Ensure that  content for whichever section is generated is detailed and covers all the required aspects. like it shouldnt look like basic content.
    5. **Formatting**:
        Ensure the JSON output is well-structured and includes all the required fields even if some sections (like `code_snippets`) are empty.

    Your task is to:
    """

    sample_json_format = """
        {
    "key_concepts": {
        "overview": "A general explanation of the key concepts in the subchapter.",
        "details": [
        {
            "concept_name": "Concept name",
            "description": "Detailed description and explanation of the concept.",
            "examples": [
            {
                "example": "Example explanation for the concept.",
                "outcome": "Expected result or outcome of the example."
            }
            ]
        }
        ]
    },
    "examples": {
        "overview": "An introduction to examples related to the subchapter.",
        "detailed_examples": [
        {
            "example_id": "Example 1",
            "title": "Short title or description of the example",
            "steps": [
            {
                "step_number": 1,
                "description": "Step-by-step explanation of what needs to be done."
            },
            {
                "step_number": 2,
                "description": "Next step with a clear explanation."
            }
            ],
            "expected_result": "The outcome of completing this example."
        }
        ]
    },
    "applications": {
        "overview": "A brief description of how the concept can be applied.",
        "real_world_use_cases": [
        {
            "case_id": "Use case 1",
            "description": "Detailed explanation of how the concept is used in real-life applications.",
            "benefits": "Advantages or importance of the application."
        }
        ]
    },
    "code_snippets": [
        {
        "code_id": "Snippet 1",
        "code": "Actual code example.(this should always be in one line string format)",
        "explanation": "Detailed line-by-line explanation of the code. explain in most detailed manner "
        }
    ],
    "practical_exercise": {
        "exercise_title": "Title of the practical exercise",
        "instructions": [
        {
            "instruction_number": 1,
            "description": "Step-by-step task description."
        },
        {
            "instruction_number": 2,
            "description": "Next task with clear instructions."
        }
        ],
        "expected_outcome": "The expected result after completing the practical exercise."
    },
    "explanation_style": "Detailed, step-by-step, or concise depending on the content's requirement.",
    "additional_notes": {
        "overview": "Any additional important information or notes that help in understanding the topic.",
        "related_topics": [
        {
            "topic": "Related topic 1",
            "description": "A brief description of a related topic for further reading."
        }
        ]
    }
    }

    """
    

    # Step 1: Generate prompt
    def generate_prompt(state):
        response = llm.invoke(prompt_generation_prompt)
        return {"generated_prompt": response.content}
    
    # Step 2: Generate content
    def generate_content(state):
        complete_prompt = final_prompt + "\n\n" +state["generated_prompt"]+ "\n\n" + "Ensure the response is in proper JSON format so it can be rendered on the frontend." + "\n\n" + sample_json_format +"\n\n" + "and make use of the keys mentioned in the JSON format to generate the content dont generate your own keys"
        response = llm.invoke(complete_prompt)
        return {"ai_output": [response.content]}

    # Step 3: Validate content
    def validate_content(state):
        ai_output = state["ai_output"][-1]
        validation_prompt = f"""
        Validate the generated JSON content and ensure it adheres to the specified format : """ + "\n\n" + sample_json_format+"\n\n" + f"""  If any part is invalid, provide feedback and corrections. also if there code_snippets then it should be in one line string format and should be in code format.
        Generated Output:
        {ai_output}
        """
        response = llm.invoke(validation_prompt)
        return {"feedback": [response.content]}

    # Step 4: Format content
    def format_content(state):
        ai_output = state["ai_output"][-1]
        feedback = state["feedback"][-1]
        formatting_prompt = f"""
        Apply the following feedback to the JSON content and ensure it is correctly formatted:
        Feedback: {feedback}
        JSON Content: {ai_output}
        """ + f"""
        sample_json_format = {sample_json_format}
        """
        response = llm.invoke(formatting_prompt)
        return {"ai_output": [response.content]}

    # Define Workflow
    workflow = StateGraph(AgentState)

    workflow.add_node("generate_prompt", generate_prompt)
    workflow.add_node("generate_content", generate_content)
    workflow.add_node("validate_content", validate_content)
    workflow.add_node("format_content", format_content)

    workflow.add_edge("generate_prompt", "generate_content")
    workflow.add_edge("generate_content", "validate_content")
    workflow.add_edge("validate_content", "format_content")

    workflow.set_entry_point("generate_prompt")
    workflow.set_finish_point("format_content")

    # Compile Workflow
    app = workflow.compile()

    # Execute Workflow
    initial_state = {
        "generated_prompt": "",
        "topic": topic,
        "user_level": user_level,
        "additional_pref": additional_pref,
        "chapter": chapter,
        "subchapter": subchapter,
        "road_map": "",
        "ai_output": [],
        "feedback": []
    }

    output = app.invoke(initial_state)
    # json_output = json.dumps(output["ai_output"][-1], indent=4)
    return output["ai_output"][-1]


# Example Usage
# topic = "Web Development"
# user_level = "Beginner"
# additional_pref = "Focus on practical applications for the MERN stack"
# chapter = "Chapter 5: Express.js Fundamentals"
# subchapter = "5.4: Express.js Error Handling and Logging"

# result = data_generation_call_llm(topic, user_level, additional_pref, chapter, subchapter)
# print(result)