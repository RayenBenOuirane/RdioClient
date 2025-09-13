# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import agents  # ✅ Explicit path from root
  # Import your agent routes (if any)

app = FastAPI(
    title="AI Radio Backend",
    version="0.1.0"
)

# Allow frontend dev environments
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your routers
app.include_router(agents.router, prefix="/agents", tags=["Agent API"])

# Optional root route
@app.get("/")
def read_root():
    return {"message": "AI Radio backend is running!"}
