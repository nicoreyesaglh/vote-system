import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import VotePage from "./pages/VotePage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import "./index.css";
import PublicRoute from "./utils/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route path="/vote" element={<VotePage />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
