CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS "Document" (
    id TEXT NOT NULL,
    source TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding vector(768),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Document_pkey" PRIMARY KEY (id)
);