from fastapi import APIRouter, HTTPException, status
from app.employees.schemas import EmployeeCreate
from app.employees.services import (
    create_employee,
    get_employee_by_id,
    get_all_employees,
    delete_employee,
)
from app.employees.models import employee_helper

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_employee(employee: EmployeeCreate):
    existing = await get_employee_by_id(employee.employee_id)
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Employee with this ID already exists"
        )

    await create_employee(employee.dict())
    return {"message": "Employee created successfully"}

@router.get("/")
async def list_employees():
    employees = []
    async for emp in await get_all_employees():
        employees.append(employee_helper(emp))
    return employees

@router.delete("/{employee_id}")
async def remove_employee(employee_id: str):
    result = await delete_employee(employee_id)
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )
    return {"message": "Employee deleted successfully"}
