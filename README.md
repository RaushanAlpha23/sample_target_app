# AI Copilot Test Target App

This is a deliberately buggy application used to test the diagnostic capabilities of an AI operations copilot.

## Setup & Run (Zero Infra)

Ensure you have Python 3.11 and Node.js installed. 

### 1. Start the Backend
Open a terminal in the `sample_target_app/backend` directory:
```bash
python -m venv venv
# Activate the venv (Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate)
pip install -r requirements.txt
python seed.py
uvicorn main:app --reload