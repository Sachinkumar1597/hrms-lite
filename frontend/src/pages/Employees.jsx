import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Employees.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error
  const itemsPerPage = 5;

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees/");
      setEmployees(res.data);
    } catch (err) {
      showMessage("Error fetching employees", "error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    try {
      await api.post("/employees/", form);

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      setShowModal(false);
      fetchEmployees();
      showMessage("Employee added successfully", "success");

    } catch (err) {
      showMessage(
        err.response?.data?.detail || "Error adding employee",
        "error"
      );
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
      showMessage("Employee deleted successfully", "success");
    } catch (err) {
      showMessage("Error deleting employee", "error");
    }
  };

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirst, indexOfLast);

  return (
    <div className="page-container">

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="table-header">
        <h2>Employees</h2>
        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          Add Employee
        </button>
      </div>

      <div className="card">
        {employees.length === 0 ? (
          <p className="empty-state">No employees found</p>
        ) : (
          <>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((emp) => (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.full_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      <button
                        className="danger-btn"
                        onClick={() =>
                          deleteEmployee(emp.employee_id)
                        }
                      >
                        Delete
                      </button>
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Employee</h3>

            <input
              placeholder="Employee ID"
              value={form.employee_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  employee_id: e.target.value,
                })
              }
            />

            <input
              placeholder="Full Name"
              value={form.full_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  full_name: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              placeholder="Department"
              value={form.department}
              onChange={(e) =>
                setForm({
                  ...form,
                  department: e.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button
                className="primary-btn"
                onClick={addEmployee}
              >
                Submit
              </button>

              <button
                className="secondary-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}