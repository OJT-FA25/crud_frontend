import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // Lấy danh sách users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("https://localhost:7268/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  // Thêm user
  const addUser = () => {
    if (!name) return;
    axios.post("https://localhost:7268/api/users", { name })
      .then(res => {
        setUsers([...users, res.data]);
        setName("");
      })
      .catch(err => console.error(err));
  };

  // Sửa user
  const updateUser = (id) => {
    axios.put(`https://localhost:7268/api/users/${id}`, { name })
      .then(res => {
        setUsers(users.map(u => u.id === id ? res.data : u));
        setName("");
        setEditId(null);
      })
      .catch(err => console.error(err));
  };

  // Xóa user
  const deleteUser = (id) => {
    axios.delete(`https://localhost:7268/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(u => u.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD (React + .NET + PostgreSQL)</h1>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {editId ? (
        <button onClick={() => updateUser(editId)}>UPDATE</button>
      ) : (
        <button onClick={addUser}>ADD</button>
      )}

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name}
            <button onClick={() => { setEditId(u.id); setName(u.name); }}>FIX</button>
            <button onClick={() => deleteUser(u.id)}>DEL</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;