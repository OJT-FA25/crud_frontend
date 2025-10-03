import React, { useState } from "react";
import axios from "axios";

function LoginForm({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:7268/api/Auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });
      setToken(res.data.token || "dummy-token"); // backend chưa có JWT thì tạm lưu "dummy-token"
      setMessage("Login successful!");
    } catch (err) {
      setMessage("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /> <br />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} /> <br />
      <button type="submit">LOGIN</button>
      <p>{message}</p>
    </form>
  );
}

export default LoginForm;
