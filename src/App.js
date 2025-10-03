import React, { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CRUD Demo - React + .NET + PostgreSQL</h1>

      {!token ? (
        <>
          <h2>Register</h2>
          <RegisterForm />

          <h2>Login</h2>
          <LoginForm setToken={setToken} />
        </>
      ) : (
        <>
          <h2>Users List</h2>
          <UserList token={token} />
        </>
      )}
    </div>
  );
}

export default App;