from app.core.database import employee_collection

async def create_employee(data: dict):
    return await employee_collection.insert_one(data)

async def get_employee_by_id(employee_id: str):
    return await employee_collection.find_one({"employee_id": employee_id})

async def get_all_employees():
    return employee_collection.find()

async def delete_employee(employee_id: str):
    return await employee_collection.delete_one({"employee_id": employee_id})
