"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState({});

  const addUser = async() => {
    try {
      await axios.post("http://api.todo.aryanbachchu.tech/user", {
        username: Math.random().toString(),
        password: Math.random().toString()
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getUsers = async() => {
      const response = await axios.get("http://api.todo.aryanbachchu.tech/users");
      const data = response.data;
      setUsers(data.users);
    }
    getUsers();
  }, [users])

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "10px"
    }}>
      <button style={{
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "black",
        textAlign: "center",
        fontSize: "18px",
        cursor: "pointer"
      }}
      onClick={addUser}
      >
        Add User
      </button>

      <div style={{
        textAlign: "center"
      }}>
        <pre>
          {JSON.stringify(users)}
        </pre>
      </div>
    </div>
  )
}