import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://training-center-app-1.onrender.com";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  // GET COURSES
  const fetchCourses = () => {
    fetch(`${API_URL}/courses/`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.log(error));
  };

  // ADD COURSE
  const addCourse = () => {
    fetch(`${API_URL}/courses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then(() => {
        setTitle("");
        setDescription("");
        fetchCourses();
      })
      .catch((error) => console.log(error));
  };

  // DELETE COURSE
  const deleteCourse = (id) => {
    fetch(`${API_URL}/courses/${id}/`, {
      method: "DELETE",
    })
      .then(() => fetchCourses())
      .catch((error) => console.log(error));
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h1>📚 Courses</h1>

        <button
          onClick={() => navigate("/dashboard")}
          style={styles.backBtn}
        >
          ⬅ Back to Dashboard
        </button>
      </div>


      <div style={styles.form}>

        <input
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />

        <button onClick={addCourse} style={styles.addBtn}>
          Add Course
        </button>

      </div>


      <div style={styles.grid}>

        {courses.map((c) => (

          <div key={c.id} style={styles.card}>

            <h3 style={{ color: "#1e3a8a" }}>
              {c.title}
            </h3>

            <p style={{ color: "#555" }}>
              {c.description}
            </p>


            <button
              onClick={() => deleteCourse(c.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Courses;


// ===== STYLES =====

const styles = {

  page: {
    padding: "30px",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "Arial",
  },


  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },


  backBtn: {
    backgroundColor: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },


  form: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },


  input: {
    padding: "10px",
    marginRight: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },


  addBtn: {
    padding: "10px 15px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },


  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },


  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },


  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },

};