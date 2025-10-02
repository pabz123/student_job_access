import React, { useState, useEffect } from "react";

const API = "http://localhost:5000";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch(API + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: "student" })
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      setMessage("Login successful");
    } else {
      setMessage(data.error);
    }
  };

  const fetchJobs = async () => {
    const res = await fetch(API + "/jobs");
    const data = await res.json();
    setJobs(data);
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("resume");
    const formData = new FormData();
    formData.append("resume", fileInput.files[0]);
    const res = await fetch(API + "/jobs/upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>UniConnect React Frontend</h2>

      <h3>Register</h3>
      <form onSubmit={register}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>

      <h3>Login</h3>
      <form onSubmit={login}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <h3>Jobs</h3>
      <ul>
        {jobs.map((job, idx) => (
          <li key={idx}>{job.title} - {job.description}</li>
        ))}
      </ul>

      <h3>Upload Resume</h3>
      <form onSubmit={uploadResume}>
        <input type="file" id="resume" />
        <button type="submit">Upload</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default App;
