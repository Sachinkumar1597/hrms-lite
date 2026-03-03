import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>HRMS Lite</h2>
      <div>
        <Link to="/" style={styles.link}>Employees</Link>
        <Link to="/attendance" style={styles.link}>Attendance</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#1e293b",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  logo: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },
  link: {
    marginLeft: "20px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
  },
};