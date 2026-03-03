from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import client
from app.employees.routes import router as employee_router
from app.attendance.routes import router as attendance_router

app = FastAPI(title="HRMS Lite API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
#   allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db():
    print("MongoDB connected")

@app.on_event("shutdown")
async def shutdown_db():
    client.close()
    print("MongoDB disconnected")

app.include_router(employee_router)
app.include_router(attendance_router)
