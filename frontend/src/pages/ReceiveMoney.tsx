import React, { useState } from "react";

const ReceiveMoney = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="p-8 bg-gray-50 h-screen">
      <h1 className="text-2xl font-bold mb-4">Receive Money</h1>
      {!showQR ? (
        <>
          <input
            placeholder="Enter Amount"
            className="border p-2 mb-4 rounded w-full"
          />
          <button
            onClick={() => setShowQR(true)}
            className="w-full bg-gray-800 text-white py-2 rounded-md"
          >
            Generate QR Code
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <img src="/placeholder-qr.png" alt="QR Code" className="w-40 mb-4" />
          <p className="text-gray-500">Expires in 04:47</p>
        </div>
      )}
    </div>
  );
};

export default ReceiveMoney;
