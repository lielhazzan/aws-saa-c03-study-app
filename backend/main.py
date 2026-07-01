from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, ExamResult
from pydantic import BaseModel
import json
import os

class ExamResultCreate(BaseModel):
    mode: str
    score: float
    date: str

app = FastAPI(title="AWS Study App API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            # Unpack wrapped JSON (e.g., from MongoDB export)
            if isinstance(data, dict) and "data" in data:
                return data["data"]
            return data
    return []

@app.get("/api/questions")
def get_questions():
    return load_json("questions.json")

@app.get("/api/services")
def get_services():
    return load_json("aws_services.json")

@app.get("/api/flashcards")
def get_flashcards():
    return load_json("flashcards.json")

@app.get("/api/tips")
def get_tips():
    return load_json("tips.json")

# Database Routes
@app.post("/api/results")
def save_result(result: ExamResultCreate, db: Session = Depends(get_db)):
    db_result = ExamResult(mode=result.mode, score=result.score, date=result.date)
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return {"status": "success", "id": db_result.id}

@app.get("/api/results/stats")
def get_stats(db: Session = Depends(get_db)):
    mock_results = db.query(ExamResult).filter(ExamResult.mode == 'mock').all()
    all_results = db.query(ExamResult).all()
    
    avg_score = 0
    if mock_results:
        avg_score = sum([r.score for r in mock_results]) / len(mock_results)
        
    return {
        "average_score": round(avg_score),
        "total_exams": len(all_results)
    }

@app.delete("/api/results")
def clear_results(db: Session = Depends(get_db)):
    db.query(ExamResult).delete()
    db.commit()
    return {"status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
