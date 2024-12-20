import React from "react";

const TransactionHistory = () => {
  return (
    <div className="p-4 bg-white h-screen max-w-md mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      {/* Date Filters */}
      <div className="flex justify-between items-center text-sm mb-4">
        <div>
          <p className="text-gray-500">Start</p>
          <p className="font-semibold">Tue, Oct 24</p>
        </div>
        <div>
          <p className="text-gray-500">End</p>
          <p className="font-semibold">Wed, Oct 25</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4">
        <button className="w-full bg-gray-100 text-gray-600 text-sm font-semibold py-2 rounded mb-2">
          Filter by: Sent/Received
        </button>
        <button className="w-full bg-gray-100 text-gray-400 text-sm py-2 rounded cursor-not-allowed">
          Specify Amount
        </button>
      </div>

      {/* Transaction List */}
      <ul className="text-sm">
        <li className="mb-4">
          <p className="font-bold">01 Jan 2023 - $50 - Payment to John</p>
          <p className="text-gray-500">
            02 Jan 2023 - $100 - Transfer from Jane
          </p>
        </li>
        <li className="mb-4">
          <p className="font-bold">03 Jan 2023 - $150 - Service Payment</p>
          <p className="text-gray-500">
            04 Jan 2023 - $200 - Deposit from Salary
          </p>
        </li>
      </ul>
    </div>
  );
};

export default TransactionHistory;
