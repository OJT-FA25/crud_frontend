import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert, Link } from "@mui/material";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const res = await axios.post("https://localhost:7268/api/Auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/users");
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Đăng nhập
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Đăng nhập
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Chưa có tài khoản?{" "}
          <Link component={RouterLink} to="/register" underline="hover">
            Đăng ký ngay
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}