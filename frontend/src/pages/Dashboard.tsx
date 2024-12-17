import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-50 h-screen">
      <h1 className="text-2xl font-bold mb-4">Hi, Rick!</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <p className="text-gray-500">Account Balance</p>
        <h2 className="text-4xl font-bold">$1,245.78</h2>
      </div>
      <button
        onClick={() => navigate("/send-money")}
        className="w-full bg-gray-800 text-white py-2 mb-2 rounded-md"
      >
        Send Money
      </button>
      <button
        onClick={() => navigate("/receive-money")}
        className="w-full bg-gray-800 text-white py-2 rounded-md"
      >
        Receive Money
      </button>
    </div>
  );
};

export default Dashboard;
