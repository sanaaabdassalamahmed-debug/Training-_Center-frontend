import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/");
    }

    fetch("http://127.0.0.1:8000/courses/")
      .then((res) => res.json())
      .then((data) => setCourses(data));

    fetch("http://127.0.0.1:8000/students/")
      .then((res) => res.json())
      .then((data) => setStudents(data));

    fetch("http://127.0.0.1:8000/trainers/")
      .then((res) => res.json())
      .then((data) => setTrainers(data));
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        fontFamily: "Arial",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          backgroundColor: "#1e3a8a",
          padding: "20px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Training Center Dashboard</h2>

        <button
          onClick={logout}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>

      {/* STATISTICS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Total Courses</h2>
          <h1 style={{ color: "#2563eb" }}>{courses.length}</h1>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Total Students</h2>
          <h1 style={{ color: "#16a34a" }}>{students.length}</h1>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Total Trainers</h2>
          <h1 style={{ color: "#dc2626" }}>{trainers.length}</h1>
        </div>
      </div>

      {/* MENU */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "0 30px 30px",
        }}
      >
        <Link
          to="/courses"
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "15px",
            textDecoration: "none",
            color: "#1e3a8a",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Courses
        </Link>

        <Link
          to="/students"
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "15px",
            textDecoration: "none",
            color: "#1e3a8a",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Students
        </Link>

        <Link
          to="/trainers"
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "15px",
            textDecoration: "none",
            color: "#1e3a8a",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Trainers
        </Link>

        <Link
          to="/enroll"
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "15px",
            textDecoration: "none",
            color: "#1e3a8a",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Enroll
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;