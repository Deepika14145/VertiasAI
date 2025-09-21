-- Create tables for VeritasAI

-- Users (optional if you want accounts)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analysis results
CREATE TABLE IF NOT EXISTS analysis (
    id SERIAL PRIMARY KEY,
    claim TEXT NOT NULL,
    source_text TEXT,
    verdict VARCHAR(50),
    credibility_score NUMERIC,
    explanation TEXT,
    emotional_tone JSONB,
    claim_category VARCHAR(50),
    political_bias NUMERIC,
    persuasion_techniques JSONB,
    education_tips JSONB,
    evidences JSONB,
    analysis_plot_png BYTEA,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs (optional)
CREATE TABLE IF NOT EXISTS audits (
    id SERIAL PRIMARY KEY,
    analysis_id INT REFERENCES analysis(id) ON DELETE CASCADE,
    raw_request JSONB,
    raw_response JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
