
import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy.engine import make_url
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

# Absolute path to the backend directory
BACKEND_DIR = Path(__file__).resolve().parent.parent

# Load backend/.env reliably
load_dotenv(BACKEND_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
MYSQL_SSL_CA = os.getenv("MYSQL_SSL_CA")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured")

if not DATABASE_URL.startswith("mysql+pymysql://"):
    raise RuntimeError(
        "DATABASE_URL must start with mysql+pymysql://"
    )

if not MYSQL_SSL_CA:
    raise RuntimeError("MYSQL_SSL_CA is not configured")

# Resolve relative certificate paths from the backend directory
ca_path = Path(MYSQL_SSL_CA)
if not ca_path.is_absolute():
    ca_path = BACKEND_DIR / ca_path

if not ca_path.is_file():
    raise RuntimeError(
        f"MySQL SSL certificate not found: {ca_path}"
    )

parsed_url = make_url(DATABASE_URL)

if "ssl-mode" in parsed_url.query:
    raise RuntimeError(
        "Remove ssl-mode from DATABASE_URL; configure SSL using connect_args."
    )
engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": {
            "ca": str(ca_path),
            "check_hostname": True,
        }
    },
    pool_pre_ping=True,
    pool_recycle=300,
)
Base = declarative_base()
from sqlalchemy.orm import Session

def get_db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()