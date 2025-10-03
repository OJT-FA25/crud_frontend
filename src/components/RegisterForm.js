import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7268/api/Auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Register successful!");
    } catch (err) {
      setMessage("Register failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /> <br />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /> <br />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} /> <br />
      <button type="submit">REGISTER</button>
      <p>{message}</p>
    </form>
  );
}

export default RegisterForm;
