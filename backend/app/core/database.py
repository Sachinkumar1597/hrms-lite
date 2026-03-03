from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import MONGO_URI, DB_NAME

client = AsyncIOMotorClient(MONGO_URI)

database = client[DB_NAME]

employee_collection = database.get_collection("employees")
attendance_collection = database.get_collection("attendance")
