import { useState } from "react";
import api from "../api/axios";

export default function Attendance() {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState([]);

  const markAttendance = async () => {
    await api.post("/attendance/", {
      employee_id: employeeId,
      date: new Date().toISOString().split("T")[0],
      status: "Present",
    });
    alert("Attendance marked");
  };

  const fetchAttendance = async () => {
    const res = await api.get(`/attendance/${employeeId}`);
    setRecords(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Attendance</h3>

      <input
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />

      <div>
        <button onClick={markAttendance}>Mark Present</button>
        <button onClick={fetchAttendance}>View Attendance</button>
      </div>

      <ul>
        {records.map((r, i) => (
          <li key={i}>{r.date} - {r.status}</li>
        ))}
      </ul>
    </div>
  );
}
