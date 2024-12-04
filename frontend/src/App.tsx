import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AdminPanel } from "./pages/AdminPanel";
import { BookLog } from "./pages/BookLog";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import { Leaderboard } from "./pages/Leaderboard";
import { Login } from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch("http://localhost:8080/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user info");
          return res.json();
        })
        .then((data) => login(data.user)) // Update Zustand store with user data
        .catch((error) => {
          console.error("Error validating token:", error);
          localStorage.removeItem("authToken");
          logout();
        });
    }
  }, [login, logout]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/log-book" element={<BookLog />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
