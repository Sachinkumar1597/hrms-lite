import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees/");
      console.log("Employees API response:", res.data);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };


  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    try {
      await api.post("/employees/", form);
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.detail || "Error adding employee");
    }
  };


  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Add Employee</h3>
      <input placeholder="ID" value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })} />
      <input placeholder="Name" value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
      <input placeholder="Email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Department" value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })} />
      <button onClick={addEmployee}>Add</button>

      <h3>Employees</h3>
      {employees.length === 0 && <p>No employees found</p>}

      <ul>
        {employees.map((emp) => (
          <li key={emp.employee_id}>
            {emp.full_name} ({emp.department})
            <button onClick={() => deleteEmployee(emp.employee_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
