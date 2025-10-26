"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://api.todo.aryanbachchu.tech";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async() => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const data = response.data;
      setUsers(data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  const addUser = async() => {
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/user`, {
        username: Math.random().toString(),
        password: Math.random().toString()
      });
      // Refresh the user list after adding
      await fetchUsers();
    } catch (error) {
      console.error("Failed to add user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

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
        cursor: "pointer",
        opacity: isLoading ? 0.6 : 1
      }}
      onClick={addUser}
      disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add User"}
      </button>

      <div style={{
        textAlign: "center"
      }}>
        <pre>
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>
    </div>
  )
}