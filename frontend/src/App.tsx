//@ts-nocheck
import React, { useEffect } from "react";
import useUserStore from "./store/user.ts"; // Import the user store
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import ReceiveMoney from "./pages/ReceiveMoney";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./pages/SignUp";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  const { user, loadUserFromStorage } = useUserStore();

  useEffect(() => {
    // Load user from localStorage when the app starts
    loadUserFromStorage();
  }, [loadUserFromStorage]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/receive-money" element={<ReceiveMoney />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
