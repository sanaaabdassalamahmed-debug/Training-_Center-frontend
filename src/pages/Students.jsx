import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // CHECK LOGIN + FETCH DATA
  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/");
    }

    fetchStudents();
  }, []);

  // GET STUDENTS
  const fetchStudents = () => {
    fetch("http://127.0.0.1:8000/students/")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ADD STUDENT
  const addStudent = () => {
    if (!name || !email) {
      alert("Please enter all fields");
      return;
    }

    fetch("http://127.0.0.1:8000/students/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Student Added Successfully 🔥");

          // REFRESH DATA
          fetchStudents();

          // CLEAR INPUTS
          setName("");
          setEmail("");
        } else {
          alert("Failed To Add Student ❌");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Server Error ❌");
      });
  };

  // DELETE STUDENT
  const deleteStudent = (id) => {
    fetch(`http://127.0.0.1:8000/students/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        fetchStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      {/* BACK BUTTON */}
      <Link
        to="/dashboard"
        style={{
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: "bold",
        }}
      >
        ⬅ Back To Dashboard
      </Link>

      {/* PAGE TITLE */}
      <h1
        style={{
          color: "#1e3a8a",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        Students Management
      </h1>

      {/* ADD STUDENT FORM */}
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "40px",
          maxWidth: "450px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Add New Student</h2>

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={addStudent}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Student
        </button>
      </div>

      {/* STUDENTS LIST */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {students.map((student) => (
          <div
            key={student.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#1e3a8a" }}>{student.name}</h2>

            <p>{student.email}</p>

            <button
              onClick={() => deleteStudent(student.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;