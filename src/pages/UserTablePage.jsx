import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";
import {
  Box, Button, Table, TableBody, TableCell, TableHead, TableRow,
  TextField, Typography, Alert
} from "@mui/material";

export default function UserTablePage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", passwordHash: "" });
  const [error, setError] = useState("");

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async () => {
    if (!newUser.name || !newUser.email || !newUser.passwordHash)
      return setError("Không được để trống trường nào!");
    try {
      await createUser(newUser);
      setNewUser({ name: "", email: "", passwordHash: "" });
      loadUsers();
      setError("");
    } catch {
      setError("Tạo user thất bại!");
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>Danh sách người dùng</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box mb={3} display="flex" gap={2}>
        <TextField label="Tên" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <TextField label="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <TextField label="Mật khẩu" type="password" value={newUser.passwordHash} onChange={(e) => setNewUser({ ...newUser, passwordHash: e.target.value })} />
        <Button variant="contained" onClick={handleCreate}>Thêm</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mật khẩu (hash)</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(u => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.passwordHash}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => handleDelete(u.id)}>Xóa</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
