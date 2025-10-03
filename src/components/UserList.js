import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", passwordHash: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Load danh sách users
  const loadUsers = () => {
    axios.get("https://localhost:7268/api/Users")
      .then((res) => setUsers(res.data))
      .catch(() => console.log("Failed to load users"));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Thêm user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7268/api/Users", newUser, {
        headers: { "Content-Type": "application/json" },
      });
      setNewUser({ name: "", email: "", passwordHash: "" });
      loadUsers();
    } catch {
      alert("Failed to add user");
    }
  };

  // Sửa user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7268/api/Users/${editingUser.id}`, editingUser, {
        headers: { "Content-Type": "application/json" },
      });
      setEditingUser(null);
      loadUsers();
    } catch {
      alert("Failed to update user");
    }
  };

  // Xóa user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete ?")) return;
    try {
      await axios.delete(`https://localhost:7268/api/Users/${id}`);
      loadUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <h3>Users List</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {editingUser && editingUser.id === u.id ? (
              <form onSubmit={handleUpdateUser}>
                <input
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <input
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={editingUser.passwordHash}
                  onChange={(e) => setEditingUser({ ...editingUser, passwordHash: e.target.value })}
                />
                <button type="submit">SAVE</button>
                <button onClick={() => setEditingUser(null)}>CANCEL</button>
              </form>
            ) : (
              <>
                {u.name} - {u.email}
                <button onClick={() => setEditingUser(u)}>FIX</button>
                <button onClick={() => handleDeleteUser(u.id)}>DELETE</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>ADD User</h3>
      <form onSubmit={handleAddUser}>
        <input
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.passwordHash}
          onChange={(e) => setNewUser({ ...newUser, passwordHash: e.target.value })}
        />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}

export default UserList;
