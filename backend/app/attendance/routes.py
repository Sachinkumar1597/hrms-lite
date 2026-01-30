from fastapi import APIRouter, HTTPException, status
from app.attendance.schemas import AttendanceCreate
from app.attendance.services import (
    mark_attendance,
    get_attendance_by_employee,
)
from app.attendance.models import attendance_helper
from app.employees.services import get_employee_by_id

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_attendance(attendance: AttendanceCreate):
    employee = await get_employee_by_id(attendance.employee_id)
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
    async for record in await get_attendance_by_employee(employee_id):
        records.append(attendance_helper(record))

    if not records:
        raise HTTPException(
            status_code=404,
            detail="No attendance records found"
        )

    return records
