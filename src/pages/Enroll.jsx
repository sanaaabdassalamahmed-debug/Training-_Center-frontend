import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Enroll() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/students/")
      .then((res) => res.json())
      .then((data) => setStudents(data));

    fetch("http://127.0.0.1:8000/courses/")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const enrollStudent = () => {
    fetch("http://127.0.0.1:8000/enroll/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: studentId,
        course_id: courseId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setMessage("Student Enrolled Successfully 🔥");
      })
      .catch(() => {
        setMessage("Enrollment Failed ❌");
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
      <Link to="/dashboard">⬅ Back</Link>

      <h1 style={{ color: "#1e3a8a" }}>Enroll Student</h1>

      <select
        onChange={(e) => setStudentId(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          display: "block",
        }}
      >
        <option>Select Student</option>

        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setCourseId(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          display: "block",
        }}
      >
        <option>Select Course</option>

        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      <button
        onClick={enrollStudent}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Enroll Now
      </button>

      <h3>{message}</h3>
    </div>
  );
}

export default Enroll;