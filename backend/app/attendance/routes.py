from fastapi import APIRouter, HTTPException, status
from app.attendance.schemas import AttendanceCreate
from app.attendance.services import (mark_attendance,get_attendance_by_employee,get_attendance_by_date)
from app.attendance.models import attendance_helper
from app.employees.services import get_employee_by_id

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

@router.get("/date/{date}")
async def attendance_by_date(date: str):
    records = []
    cursor = await get_attendance_by_date(date)
    async for doc in cursor:
        records.append({
            "employee_id": doc["employee_id"],
            "status": doc["status"]
        })
    return records


@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_attendance(attendance: AttendanceCreate):
    employee = await get_employee_by_id(attendance.employee_id)
    # print(employee)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )
    await mark_attendance(attendance.dict())
    return {"message": "Attendance marked successfully"}


@router.get("/{employee_id}")
async def list_attendance(employee_id: str):
    records = []
    # print(records)
    # print(employee_id)
    async for record in await get_attendance_by_employee(employee_id):
        records.append(attendance_helper(record))
    if not records:
        raise HTTPException(
            status_code=404,
            detail="No attendance records found"
        )
    return records