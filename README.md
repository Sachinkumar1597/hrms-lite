HRMS Lite – Employee & Attendance Management System
-----------------------------------------------------

Live Application
-------------------------

Frontend: https://hrms-lite-rho-seven.vercel.app/  
Backend API: https://hrms-lite-09me.onrender.com

Project Overview

HRMS Lite is a lightweight Human Resource Management System built as part of a full-stack coding assignment.

The application simulates a basic internal HR tool that enables an admin to:

- Manage employee records
- Track daily attendance

This project demonstrates:

- Clean backend API design
- Database modeling and persistence
- Proper server-side validation
- Frontend integration with REST APIs
- Modular and maintainable project structure
- Production-ready usability

The scope is intentionally limited to essential HR operations to ensure stability and clarity without over-engineering.

---


Employee
-------- 

- Add a new employee
- View all employees (with pagination)
- Delete an employee
- Unique Employee ID validation
- Email format validation
- Proper error handling with meaningful messages

Attendance
---------- 

- Mark attendance for an employee
  - Date
  - Status (Present / Absent)
- View attendance records per employee
- Validate employee existence before marking attendance
- Optional: Filter attendance by date (Bonus feature)

---

Tech Stack
----------

Backend
- FastAPI (Python)
- MongoDB Atlas
- Motor (Async MongoDB Driver)
- Pydantic (Data validation)
- Uvicorn (ASGI Server)

Frontend
- React (Vite)
- Axios (API communication)
- React Router DOM
- Custom CSS (Clean & professional UI)

---

API Endpoints
----------------

Employee APIs

- `POST /employees/` → Create employee  
- `GET /employees/` → List all employees  
- `DELETE /employees/{employee_id}` → Delete employee  

Attendance APIs

- `POST /attendance/` → Mark attendance  
- `GET /attendance/{employee_id}` → Get attendance per employee  
- `GET /attendance/date/{date}` → Get attendance by date (Optional)  

---

Validation & Error Handling
---------------------------

The application includes:

- Required field validation
- Email format validation
- Duplicate employee prevention
- Employee existence validation before attendance marking
- Proper HTTP status codes (201, 400, 404)
- Meaningful backend error responses
- Frontend success and error message display

---

Run the Project Locally
-----------------------

Clone the Repository
--------------------

```bash
git clone <repository-url>
cd hrms-lite


# Backend Setup
Activate env

pip install -r requirements.txt

uvicorn app.main:app --reload

API documentation
http://127.0.0.1:8000/docs

# Frontend Setup
cd frontend
npm install
npm run dev