# 🎙️ AI Radio Project – Powered by Virtual Agents

This project builds an automated AI-powered radio platform that can generate, validate, and broadcast radio content using virtual agents. It includes:
- A FastAPI backend for API and agent orchestration
- A Streamlit interface for testing agents
- Optional React frontend for user interaction
- Docker support for easy deployment

---

## 🚀 Quick Start

### 📦 1. Clone or Download

```bash
git clone https://github.com/your-repo/ai_radio_project.git
cd ai_radio_project
```
### 🐳 2. Run with Docker (Recommended)

#### a. Set your API keys in a `.env` file:

Create a file named `.env` in the root of the project:

```env
ELEVENLABS_API_KEY=optional
GOOGLE_API_KEY=your-key-here
GEMINI_MODEL=gemini-2.0-flash  
```
### b. Build and start the containers:
```env
docker-compose build
docker-compose up
```

