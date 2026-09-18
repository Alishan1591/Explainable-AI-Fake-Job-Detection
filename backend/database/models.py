from sqlalchemy.sql import func
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey

from database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        index=True,
        nullable=False
    )

    hashed_password = Column(
        String(255),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    salary_range = Column(String(100), nullable=True)
    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
    Integer,
    ForeignKey("users.id"),
    nullable=False,
    index=True
 )

    title = Column(String(255), nullable=False)

    description = Column(Text, nullable=False)

    requirements = Column(Text, nullable=True)

    company_profile = Column(Text, nullable=True)

    benefits = Column(Text, nullable=True)

    location = Column(String(255), nullable=True)

    employment_type = Column(String(100), nullable=True)

    industry = Column(String(255), nullable=True)

    prediction = Column(Integer, nullable=False)

    label = Column(String(50), nullable=False)

    decision_score = Column(Float, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )