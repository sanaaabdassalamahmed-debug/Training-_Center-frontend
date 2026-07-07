import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://training-center-app-1.onrender.com";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          alert("Account Created Successfully 🔥");
          navigate("/");
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        alert("Server Error ❌");
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f7fb",
        padding:"30px",
        borderRadius:"15px",
        width:"320px",
        maxWidth:"90%",
        boxShadow:"0 4px 15px rgba(0,0,0,0.1)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e3a8a",
            marginBottom: "30px",
          }}
        >
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing:"border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={register}
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
          Sign Up
        </button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have account?{" "}
          <Link to="/" style={{ color: "#2563eb" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;