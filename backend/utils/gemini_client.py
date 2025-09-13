import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("AIzaSyAv289f8cR2vgVQqb9-YzORGaY3vDVurYg"))
model = genai.GenerativeModel("gemini-1.5-flash-latest")

def get_model():
    return model
