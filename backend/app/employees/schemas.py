from pydantic import BaseModel, EmailStr, Field

class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., min_length=3)
    full_name: str = Field(..., min_length=3)
    email: EmailStr
    department: str = Field(..., min_length=2)

class EmployeeResponse(BaseModel):
    employee_id: str
    full_name: str
    email: str
    department: str
