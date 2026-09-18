from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import engine
from database.models import Base

from schemas import JobPostingRequest
from model_service import predict_job
from fastapi import Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import PredictionHistory
from fastapi import HTTPException
from database.models import User, PredictionHistory
from auth import hash_password, verify_password, create_access_token, get_current_user
from schemas import UserRegisterRequest, UserLoginRequest


import os
from dotenv import load_dotenv

load_dotenv()

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)
Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="Explainable AI Fake Job Detection API",
    description="API for detecting potentially fraudulent job postings with explainable AI.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Explainable AI Fake Job Detection API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/predict")
def predict(
    job: JobPostingRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = predict_job(job)

    prediction_record = PredictionHistory(
        user_id=current_user.id,
        title=job.title,
        description=job.description,
        requirements=job.requirements,
        company_profile=job.company_profile,
        benefits=job.benefits,
        location=job.location,
        employment_type=job.employment_type,
        industry=job.industry,
        prediction=result["prediction"],
        label=result["label"],
        decision_score=result["decision_score"],
        salary_range=job.salary_range,
    )

    db.add(prediction_record)
    db.commit()
    db.refresh(prediction_record)

    return {
        **result,
        "history_id": prediction_record.id,
        "user_id": current_user.id
    }

@app.get("/history")
def get_prediction_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    records = (
        db.query(PredictionHistory)
        .filter(
            PredictionHistory.user_id == current_user.id
        )
        .order_by(
            PredictionHistory.created_at.desc()
        )
        .all()
    )

    return [
        {
            "id": record.id,
            "title": record.title,
            "label": record.label,
            "prediction": record.prediction,
            "decision_score": record.decision_score,
            "location": record.location,
            "employment_type": record.employment_type,
            "industry": record.industry,
            "created_at": record.created_at
        }
        for record in records
    ]

@app.post("/register")
def register(
    user: UserRegisterRequest,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    }

@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == form_data.username)
        .first()
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        form_data.password,
        existing_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={
            "sub": str(existing_user.id),
            "email": existing_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "created_at": current_user.created_at
    }