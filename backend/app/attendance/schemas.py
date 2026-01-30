from pydantic import BaseModel, Field
from datetime import date

class AttendanceCreate(BaseModel):
    employee_id: str = Field(..., min_length=3)
    date: date
    status: str = Field(..., pattern="^(Present|Absent)$")

class AttendanceResponse(BaseModel):
    employee_id: str
    date: date
    status: str
