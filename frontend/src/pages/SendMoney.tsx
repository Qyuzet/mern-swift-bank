import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const [step, setStep] = useState("input");
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center p-8 bg-gray-50">
      {step === "input" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Send Money</h1>
          <input
            placeholder="Recipient's Account/Phone"
            className="border p-2 mb-4 rounded w-full"
          />
          <input
            placeholder="Amount"
            className="border p-2 mb-4 rounded w-full"
          />
          <button
            onClick={() => setStep("confirm")}
            className="w-full bg-gray-800 text-white py-2 rounded-md"
          >
            Check Destination
          </button>
        </>
      )}
      {step === "confirm" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Confirm Transaction</h1>
          <p className="text-lg mb-4">Account is ready to send.</p>
          <button
            onClick={() => navigate("/send-success")}
            className="w-full bg-green-600 text-white py-2 rounded-md"
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
};

export default SendMoney;
