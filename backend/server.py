from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
from bson import ObjectId
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

APPS_SCRIPT_URL = os.environ.get("APPS_SCRIPT_URL", "")

app = FastAPI(title="Cornelia Trompke API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


# ── Models ──────────────────────────────────────────────

class ContactSubmission(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    services: Optional[List[str]] = []
    notes: Optional[str] = None
    send_from: Optional[str] = None
    # Retreat application fields (present only when retreat_id is set)
    retreat_id: Optional[str] = None
    retreat_title: Optional[str] = None
    retreat_date: Optional[str] = None
    retreat_location: Optional[str] = None

class ContactRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    services: Optional[List[str]] = []
    notes: Optional[str] = None
    send_from: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class StatusCheckCreate(BaseModel):
    client_name: str


# ── Routes ───────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Cornelia Trompke API"}


@api_router.post("/contact", response_model=ContactRecord)
async def submit_contact(submission: ContactSubmission):
    """Accept contact form submission — stores in MongoDB and forwards to Google Sheet."""
    record = ContactRecord(**submission.model_dump())
    doc = record.model_dump()

    # 1. Store in MongoDB as backup
    await db.contact_inquiries.insert_one(doc)
    logger.info(f"New contact inquiry from {record.email} via {record.send_from}")

    # 2. Forward to Google Apps Script → Google Sheet
    if APPS_SCRIPT_URL:
        try:
            async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as http:
                payload = submission.model_dump(exclude_none=True)
                await http.post(APPS_SCRIPT_URL, json=payload)
        except Exception as e:
            logger.warning(f"Google Sheet sync failed (non-fatal): {e}")

    return record


@api_router.get("/contact", response_model=List[ContactRecord])
async def get_contacts():
    """Retrieve all contact inquiries (admin use)."""
    docs = await db.contact_inquiries.find({}, {"_id": 0}).to_list(500)
    return docs


@api_router.get("/retreats")
async def get_retreats():
    """Fetch upcoming retreats from Google Sheet via Apps Script. Falls back to static data if unavailable."""
    FALLBACK = [
        {"date": "April 2026",     "location": "Oman — Muscat Region",          "duration": "5 days", "spots": "4 places remaining", "status": "Open"},
        {"date": "September 2026", "location": "Costa Rica — Península de Osa", "duration": "5 days", "spots": "6 places remaining", "status": "Open"},
        {"date": "December 2026",  "location": "Oman — Hajar Mountains",        "duration": "3 days", "spots": "Enquiries welcome",  "status": "Forming"},
    ]
    if not APPS_SCRIPT_URL:
        return {"retreats": FALLBACK, "source": "fallback"}
    try:
        async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as http:
            resp = await http.get(APPS_SCRIPT_URL)
            # If redirected to a login/access-denied page, content-type will be text/html
            if "text/html" in resp.headers.get("content-type", ""):
                logger.warning("Apps Script returned HTML — check deployment access settings")
                return {"retreats": FALLBACK, "source": "fallback_redirect"}
            data = resp.json()
            retreats = data.get("retreats", [])
            return {"retreats": retreats, "source": "google_sheet"}
    except Exception as e:
        logger.warning(f"Failed to fetch retreats from Google Sheet: {e}")
        return {"retreats": FALLBACK, "source": "fallback_error"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    obj = StatusCheck(**input.model_dump())
    doc = obj.model_dump()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return docs


# ── App setup ───────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
