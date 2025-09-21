# backend/app/db.py
from sqlalchemy import create_engine, Column, Integer, String, Text, Numeric, JSON, LargeBinary, TIMESTAMP, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://admin:admin@localhost:5432/veritasai")

Base = declarative_base()

class Analysis(Base):
    __tablename__ = "analysis"
    id = Column(Integer, primary_key=True, index=True)
    claim = Column(Text, nullable=False)
    source_text = Column(Text)
    verdict = Column(String(50))
    credibility_score = Column(Numeric)
    explanation = Column(Text)
    emotional_tone = Column(JSON)
    claim_category = Column(String(50))
    political_bias = Column(Numeric)
    persuasion_techniques = Column(JSON)
    education_tips = Column(JSON)
    evidences = Column(JSON)
    analysis_plot_png = Column(LargeBinary)
    created_at = Column(TIMESTAMP)

class Audit(Base):
    __tablename__ = "audits"
    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analysis.id"))
    raw_request = Column(JSON)
    raw_response = Column(JSON)
    created_at = Column(TIMESTAMP)
    analysis = relationship("Analysis", backref="audit_logs")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)
