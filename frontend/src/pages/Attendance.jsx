import { useState } from "react";
import api from "../api/axios";
import "./Attendance.css";

export default function Attendance() {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [viewEmployeeId, setViewEmployeeId] = useState("");
  const [viewDate, setViewDate] = useState("");
  const [records, setRecords] = useState([]);
  const [viewMode, setViewMode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const markAttendance = async () => {
    if (!employeeId || !date) {
      alert("Please enter Employee ID and Date");
      return;
    }

    try {
      await api.post("/attendance/", {
        employee_id: employeeId,
        date: date,
        status: status,
      });

      alert("Attendance marked successfully");
      setEmployeeId("");
      setDate("");
    } catch (err) {
      alert(err.response?.data?.detail || "Error marking attendance");
    }
  };


  const fetchByEmployee = async () => {
    if (!viewEmployeeId) {
      alert("Enter Employee ID");
      return;
    }

    try {
      const res = await api.get(`/attendance/${viewEmployeeId}`);
      // console.log(res);
      setRecords(res.data);
      setViewMode("employee");
      setCurrentPage(1);
    } catch (err) {
      alert("Error fetching attendance");
    }
  };


  const fetchByDate = async () => {
    if (!viewDate) {
      alert("Select date");
      return;
    }

    try {
      const res = await api.get(`/attendance/date/${viewDate}`);
      setRecords(res.data);
      setViewMode("date");
      setCurrentPage(1);
    } catch (err) {
      alert("Error fetching date attendance");
    }
  };

  const totalPages = Math.ceil(records.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRecords = records.slice(indexOfFirst, indexOfLast);

  return (
    <div className="page-container">
      <h2>Attendance</h2>

      <div className="card">
        <h3>Mark Attendance</h3>
        <div className="attendance-form">
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button className="primary-btn" onClick={markAttendance}>
            Submit
          </button>
        </div>
      </div>

      <div className="card">
        <h3>View Attendance</h3>

        <div className="attendance-form">
          <input
            type="text"
            placeholder="Employee ID"
            value={viewEmployeeId}
            onChange={(e) => setViewEmployeeId(e.target.value)}
          />

          <button
            className="secondary-btn"
            onClick={fetchByEmployee}
          >
            View By Employee
          </button>

          <input
            type="date"
            value={viewDate}
            onChange={(e) => setViewDate(e.target.value)}
          />

          <button
            className="secondary-btn"
            onClick={fetchByDate}
          >
            View By Date
          </button>
        </div>
      </div>


      <div className="card">
        {records.length === 0 ? (
          <p className="empty-state">No attendance records found</p>
        ) : (
          <>
            <table className="attendance-table">
              <thead>
                <tr>
                  {viewMode === "employee" && <th>Date</th>}
                  {viewMode === "date" && <th>Employee ID</th>}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((r, i) => (
                  <tr key={i}>
                    {viewMode === "employee" && <td>{r.date}</td>}
                    {viewMode === "date" && <td>{r.employee_id}</td>}
                    <td>
                      <span
                        className={
                          r.status === "Present"
                            ? "status-present"
                            : "status-absent"
                        }
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={
                    currentPage === i + 1
                      ? "page-btn active"
                      : "page-btn"
                  }
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}