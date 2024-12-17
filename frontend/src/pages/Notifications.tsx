import React from "react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  const transactions = [
    { id: 1, type: "received", amount: "Rp 150,000", date: "2024-06-12" },
    { id: 2, type: "sent", amount: "Rp 200,000", date: "2024-06-13" },
  ];

  return (
    <div className="h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>
      </div>

      {/* Content */}
      <div className="p-6">
        {transactions.map((trx) => (
          <div
            key={trx.id}
            className="bg-white p-4 mb-4 rounded-md shadow-sm flex justify-between"
          >
            <div>
              <p
                className={`font-semibold ${
                  trx.type === "received" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trx.type === "received" ? "Received" : "Sent"}: {trx.amount}
              </p>
              <p className="text-gray-500 text-sm">{trx.date}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">
                Transaction #{trx.id}
              </span>
            </div>
          </div>
        ))}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Notifications;
