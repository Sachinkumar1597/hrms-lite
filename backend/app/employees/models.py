def employee_helper(employee: dict) -> dict:
    return {
        "employee_id": employee["employee_id"],
        "full_name": employee["full_name"],
        "email": employee["email"],
        "department": employee["department"],
    }
