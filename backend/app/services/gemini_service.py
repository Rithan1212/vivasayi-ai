"""Gemini AI service — builds prompts and parses structured responses."""
import json
import re
from typing import Literal

import google.generativeai as genai

from ..config import get_settings
from ..schemas import AdvisoryAnswer
from ..utils.logger import get_logger

settings = get_settings()
logger = get_logger("VIVASAYI.gemini")

if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)


def _build_prompt(question: str, language: Literal["en", "ta"]) -> str:
    lang = "Tamil" if language == "ta" else "English"
    return f"""You are VIVASAYI, an expert agricultural advisor for Indian farmers.
A farmer has asked the following question. Reply ONLY in {lang}.

Farmer's question:
\"\"\"{question}\"\"\"

Respond strictly as JSON with this exact shape and nothing else:
{{
  "problem": "Short one-line description of the problem.",
  "reason": "2-4 sentence explanation of the most likely cause.",
  "solution": "Practical, step-by-step solution the farmer can apply within a week. Include affordable/organic options first.",
  "precautions": ["Short bullet 1", "Short bullet 2", "Short bullet 3", "Short bullet 4"]
}}

Do NOT wrap the JSON in markdown fences. Do NOT include any extra commentary."""


def _parse_json(text: str) -> dict:
    cleaned = re.sub(r"```(json)?", "", text).strip()
    start = cleaned.find("{")
    end = cleaned.rfind("}")
    if start == -1 or end == -1:
        raise ValueError("No JSON object found in model response.")
    return json.loads(cleaned[start : end + 1])


def ask_advisor(question: str, language: Literal["en", "ta"]) -> AdvisoryAnswer:
    if not settings.GEMINI_API_KEY:
        raise RuntimeError(
            "GEMINI_API_KEY is not configured on the server. "
            "Add it to backend/.env and restart."
        )

    model = genai.GenerativeModel(settings.GEMINI_MODEL)
    prompt = _build_prompt(question, language)

    try:
        response = model.generate_content(
            prompt,
            generation_config={"temperature": 0.4, "max_output_tokens": 800},
        )
        text = response.text or ""
        data = _parse_json(text)
        return AdvisoryAnswer(
            problem=str(data.get("problem", "")),
            reason=str(data.get("reason", "")),
            solution=str(data.get("solution", "")),
            precautions=[str(p) for p in (data.get("precautions") or [])][:6],
            language=language,
        )
    except Exception as exc:
        logger.exception("Gemini call failed: %s", exc)
        raise
