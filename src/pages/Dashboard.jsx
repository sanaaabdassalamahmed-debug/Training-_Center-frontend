import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const API_URL = "https://training-center-app-1.onrender.com";

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/");
      return;
    }

    // Get Courses
    fetch(`${API_URL}/courses/`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.log(error));

    // Get Students
    fetch(`${API_URL}/students/`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.log(error));

    // Get Trainers
    fetch(`${API_URL}/trainers/`)
      .then((res) => res.json())
      .then((data) => setTrainers(data))
      .catch((error) => console.log(error));

  }, [navigate]);


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

        <h2>
          Training Center Dashboard
        </h2>


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
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "30px",
        }}
      >


        <div style={cardStyle}>
          <h2>Total Courses</h2>
          <h1 style={{color:"#2563eb"}}>
            {courses.length}
          </h1>
        </div>



        <div style={cardStyle}>
          <h2>Total Students</h2>
          <h1 style={{color:"#16a34a"}}>
            {students.length}
          </h1>
        </div>



        <div style={cardStyle}>
          <h2>Total Trainers</h2>
          <h1 style={{color:"#dc2626"}}>
            {trainers.length}
          </h1>
        </div>


      </div>





      {/* MENU */}

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit, minmax(220px,1fr))",
          gap:"20px",
          padding:"0 30px 30px"
        }}
      >


        <MenuLink 
        to="/courses"
        title="Courses"
        />


        <MenuLink
        to="/students"
        title="Students"
        />


        <MenuLink
        to="/trainers"
        title="Trainers"
        />


        <MenuLink
        to="/enroll"
        title="Enroll"
        />


      </div>


    </div>
  );
}




const cardStyle = {

  backgroundColor:"white",
  padding:"30px",
  borderRadius:"15px",
  textAlign:"center",
  boxShadow:"0 4px 10px rgba(0,0,0,0.1)"

};



function MenuLink({to,title}){

  return (

    <Link
      to={to}
      style={{

        backgroundColor:"white",
        padding:"40px",
        borderRadius:"15px",
        textDecoration:"none",
        color:"#1e3a8a",
        textAlign:"center",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
        fontSize:"22px",
        fontWeight:"bold"

      }}
    >

      {title}

    </Link>

  );

}



export default Dashboard;