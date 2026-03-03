import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "hrms-lite")

if not MONGO_URI:
    raise ValueError("MONGO_URI is not set")