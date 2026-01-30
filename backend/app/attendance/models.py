def attendance_helper(record: dict) -> dict:
    return {
        "employee_id": record["employee_id"],
        "date": record["date"].date(),
        "status": record["status"],
    }
