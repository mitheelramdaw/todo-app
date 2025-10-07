#!/bin/sh
echo "⚙️  Backend (FastAPI) is starting..."
echo "📖  Swagger Docs: http://localhost:8000/docs"
echo "----------------------------------------------------"

exec uvicorn main:app --host 0.0.0.0 --port 8000
