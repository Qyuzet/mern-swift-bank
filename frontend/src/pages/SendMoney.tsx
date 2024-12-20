import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user";

const SendMoney = () => {
  const [step, setStep] = useState("input");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleSendMoney = async () => {
    if (!phone || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid phone number and amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/send-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone, amount: Number(amount) }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to notifications with transaction details including recipient info
        navigate("/notifications", {
          state: {
            transaction: {
              type: "sent",
              amount: amount,
              recipientPhone: phone,
              recipientName: data.recipientName || "Unknown", // Get recipient name from backend
              timestamp: new Date().toISOString(),
            },
          },
        });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(`Error processing the transaction: ${err.message}`);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Send Money</h1>
      <input
        placeholder="Recipient's Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
      />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        onClick={handleSendMoney}
        className="w-full bg-gray-800 text-white py-2 rounded-md"
      >
        Send Money
      </button>
    </div>
  );
};

export default SendMoney;
