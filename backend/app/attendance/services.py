from datetime import datetime
from app.core.database import attendance_collection

async def mark_attendance(data: dict):
    data["date"] = datetime.combine(data["date"], datetime.min.time())
    return await attendance_collection.insert_one(data)

async def get_attendance_by_employee(employee_id: str):
    return attendance_collection.find({"employee_id": employee_id})

async def get_attendance_by_date(date: str):
    parsed_date = datetime.strptime(date, "%Y-%m-%d")
    parsed_date = datetime.combine(parsed_date, datetime.min.time())
    return attendance_collection.find({"date": parsed_date})