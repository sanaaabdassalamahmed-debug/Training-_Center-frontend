import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Trainers() {
  const API_URL = "https://training-center-app-1.onrender.com";

  const [trainers, setTrainers] = useState([]);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/");
      return;
    }

    fetchTrainers();
  }, [navigate]);

  // GET TRAINERS
  const fetchTrainers = () => {
    fetch(`${API_URL}/trainers/`)
      .then((res) => res.json())
      .then((data) => setTrainers(data))
      .catch((err) => console.log(err));
  };

  // ADD TRAINER
  const addTrainer = () => {
    fetch(`${API_URL}/trainers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        specialty: specialty,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTrainers();
        setName("");
        setSpecialty("");
        alert("Trainer Added Successfully ✅");
      })
      .catch(() => {
        alert("Failed to Add Trainer ❌");
      });
  };

  // DELETE TRAINER
  const deleteTrainer = (id) => {
    fetch(`${API_URL}/trainers/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        fetchTrainers();
      })
      .catch(() => {
        alert("Delete Failed ❌");
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

      <h1 style={{ color: "#1e3a8a" }}>Trainers</h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          maxWidth: "400px",
        }}
      >
        <h2>Add Trainer</h2>

        <input
          type="text"
          placeholder="Trainer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={addTrainer}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Trainer
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{trainer.name}</h2>

            <p>{trainer.specialty}</p>

            <button
              onClick={() => deleteTrainer(trainer.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
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

export default Trainers;