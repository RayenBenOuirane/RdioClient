# backend/streamlit_agent_demo.py

import streamlit as st

st.set_page_config(page_title="AI Radio Script Generator", layout="centered")

st.title("🎙️ AI Radio Script Generator")
st.markdown("Test your RAG agent here before frontend integration.")

topic = st.text_input("Enter a topic", "AI in Education")
region = st.text_input("Region", "Europe")
tone = st.selectbox("Tone", ["dynamic", "serious", "fun", "neutral"])
hosts = st.slider("Number of hosts", 1, 3, 2)

if st.button("Generate Script"):
    with st.spinner("Generating..."):
        try:
            st.success("✅ Script generated!")
            st.text_area("🎧 Script Output", script, height=500)
        except Exception as e:
            st.error(f"Error: {str(e)}")
