import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transaction = location.state?.transaction || {
    type: "sent",
    amount: "0",
    recipientPhone: "Unknown",
    recipientName: "Unknown",
    timestamp: new Date().toISOString(),
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Transaction Summary */}
        <div className="bg-gray-100 rounded-lg shadow-md text-center py-8 px-4 mb-6 w-full max-w-md">
          <p className="text-gray-500 text-lg font-medium">
            Transaction Successful!
          </p>
          <p className="text-4xl font-bold text-black my-2">
            ${Number(transaction.amount).toFixed(2)}
          </p>
          <div className="mt-4">
            <p className="text-gray-500 text-lg">Sent to</p>
            <p className="text-xl font-semibold text-black">
              {transaction.recipientName}
            </p>
            <p className="text-md text-gray-600">
              {transaction.recipientPhone}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {new Date(transaction.timestamp).toLocaleString()}
          </p>
        </div>

        {/* Icon */}
        <div className="mb-6">
          <div className="h-20 w-20 flex items-center justify-center rounded-full border-2 border-black">
            <span className="text-5xl font-bold text-black">$</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="w-full px-6 pb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Notifications;
