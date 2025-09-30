import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response.data.error || "Error occurred");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
