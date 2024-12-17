import React from "react";

const TransactionHistory = () => {
  return (
    <div className="p-8 bg-gray-50 h-screen">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <ul>
        <li className="mb-2">01 Jan 2023 - $50 - Coffee Shop</li>
        <li className="mb-2">02 Jan 2023 - $100 - Payment to John</li>
      </ul>
    </div>
  );
};

export default TransactionHistory;
