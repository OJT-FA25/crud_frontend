import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert, Link } from "@mui/material";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (pw) =>
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    setError("");

    if (!name || !email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email không hợp lệ.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Mật khẩu phải có ít nhất 8 ký tự, gồm 1 chữ in hoa và 1 số.");
      return;
    }

    try {
      await axios.post("https://localhost:7268/api/Auth/register", form);
      navigate("/");
    } catch (err) {
      setError("Đăng ký thất bại. Email có thể đã tồn tại.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Đăng ký tài khoản
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Họ và tên"
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Đăng ký
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Đã có tài khoản?{" "}
          <Link component={RouterLink} to="/" underline="hover">
            Đăng nhập
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}