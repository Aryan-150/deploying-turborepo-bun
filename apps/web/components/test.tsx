"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState({});
  const [isUserAdded, setIsUserAdded] = useState(false);

  const addUser = async() => {
    try {
      setIsUserAdded(false);
      await axios.post("http://api.todo.aryanbachchu.tech/user");
      setIsUserAdded(true);
    } catch (error) {
      console.error(error);
      setIsUserAdded(false);
    }
  }

  useEffect(() => {
    const getUsers = async() => {
      const response = await axios.get("http://api.todo.aryanbachchu.tech/users");
      const data = response.data;
      setUsers(data.users);
    }

    getUsers();
  }, [users, isUserAdded])

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
        fontSize: "18px"
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