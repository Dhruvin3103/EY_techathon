import os
import json
from typing import TypedDict
from typing_extensions import Annotated, List
import requests
import operator
from langchain_groq import ChatGroq
from langchain_anthropic import ChatAnthropic
from langchain_cohere import ChatCohere
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv
load_dotenv()



class AgentState(TypedDict):
    input: str
    topic: str
    user_level: str
    additional_pref: str
    ai_output: Annotated[List[str], operator.add]
    feedback: Annotated[List[str], operator.add]
    
co_api_key = os.getenv("CO_API_KEY")
groq_api_key = os.getenv("GROQ_API_KEY")
openai_api_key = os.getenv("OPENAI_API_KEY")
anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")

llm = ChatGroq(api_key=groq_api_key, temperature=0, model="llama3-8b-8192")
llm = ChatCohere(model="command-r-plus")

def road_map_call_llm(topic, user_level,additional_pref):
    print("called this function")
    prompt = f"""
        You are an educator and a course generation assistant. Your goal is to provide clear, structured, and engaging learning materials suitable for the user's level of understanding.  
        
        Your first task is to generate a detailed learning roadmap for a course on {topic} for a {user_level} learner . The roadmap should be structured to help the user learn the topic effectively and efficiently.
        Topic: {topic}
        User Level: {user_level}
        Additional Preferences: {additional_pref}
        
        Based on the above input, generate a detailed roadmap that includes:
        1. A list of chapters with titles related to {topic} and all which is required to be learn by the user to learn this topic.
        2. Each chapter should have sub-chapters or bullet points outlining key concepts and all the relvant keypoints (include as many sub chapters which are required dont get restrict to particular number of chapter and subchapters) do this in proper detail manner.
        3. The roadmap should be progressively structured, starting with fundamental topics for a {user_level} learner.
        4. Include last chapter as the application chapter or similar based on the topic provided.
        5. Ensure that the output is formatted as follows:
        {{
            "Course_name" : Course name,
            "Course_description" : Course description,
            "Course_tagline" : Course tagline(just a one line tagline),
            "roadmap": {{
                "chapter_1": {{
                    "title": "Chapter 1: Introduction to {topic}",
                    "subchapters": ["1.1: Overview", "1.2: Basic Concepts", ...]
                }},
                "chapter_2": {{
                    "title": "Chapter 2: <chapter title>",
                    "subchapters": ["2.1: <subtopic>", "2.2: <subtopic>", ...]
                }},
                .....
            }}
        }}
        """
    script_validator_msg = """Ensure that the generated content adheres to the following format:
    {
        "Course_name" : Course name,
        "Course_description" : Course description,
        "Course_tagline" : Course tagline(just a one line tagline),
        "roadmap": {
            "chapter_1": {
                "title": "Chapter 1: Introduction to {topic}",
                "subchapters": ["1.1: Basic Concepts", "1.2: Overview",...]
            },
            "chapter_2": {
                "title": "Chapter 2: <chapter title>",
                "subchapters": ["2.1: <subtopic>", "2.2: <subtopic>",...]
            },
            ....
        }
    }
    """
    script_format_msg = """Return the final output in the following JSON format:
    {
        "Course_name" : Course name,
        "Course_description" : Course description,
        "Course_tagline" : Course tagline(just a one line tagline),
        "roadmap": {
            "chapter_1": {
                "title": "Chapter 1: Introduction to {topic}",
                "subchapters": [
                    "1.1: Basic Concepts",
                    "1.2: Overview",...
                ]
            },
            "chapter_2": {
                "title": "Chapter 2: <chapter title>",
                "subchapters": [
                    "2.1: <subtopic>",
                    "2.2: <subtopic>",....
                ]
            },
            ....
        }
    }
    """
    
    def genrate_script(state):
        response = llm.invoke(prompt)
        return {
            "input": prompt,
            "topic": topic,
            "user_level": user_level,
            "additional_pref": additional_pref,
            "ai_output": [response.content]
        }
    
    def script_validator(state):
        complete_prompt = script_validator_msg + "\n\nThe prompt is : \n\n" + state["input"] + "\n\n generated output : \n\n" + state["ai_output"][-1]  
        response = llm.invoke(complete_prompt)
        return {"feedback": [response.content]}
    
    def script_format(state):
        complete_prompt = script_format_msg + "\n\nThe prompt is : \n\n" + state["input"] + "\n\n generated output : \n\n" + state["ai_output"][-1] + "\n\nhere is the feedback which is to implemented : \n\n" + state["feedback"][-1]
        response = llm.invoke(complete_prompt)
        return {"ai_output": [response.content]}
    
    workflow = StateGraph(AgentState)
    
    workflow.add_node("script_agent", genrate_script)
    workflow.add_node("script_validator", script_validator)
    workflow.add_node("script_formatter", script_format)
    
    workflow.add_edge("script_agent", "script_validator")
    workflow.add_edge("script_validator", "script_formatter")
    
    workflow.set_entry_point("script_agent")
    workflow.set_finish_point("script_formatter")
    print("invoking the app")
    app = workflow.compile()
    output = app.invoke({
        "input": "",
        "topic": topic,
        "user_level": user_level,
        "additional_pref": additional_pref,
        "ai_output": [],
        "feedback": []
    })
    
    result = output["ai_output"][-1]
    print(result)
    # # jsonobj = json.dumps(result)
    # json_start = result.find("{")
    # json_end = result.rfind("}") + 1

    # # Extract the JSON substring
    # json_data = result[json_start:json_end]
    # # print(json_data)
    # # Parse the JSON string into a Python dictionary
    # data = json.loads(json_data,strict=False)
    return result


# topic = "Web Development"
# user_level = "Beginner"
# additional_pref = "I want to learn web development specifically MERN STack as i want to become web developer"
# output = road_map_call_llm(topic, user_level, additional_pref)
# print(output)