import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-50 h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Swift Bank Transaction Management
      </h1>
      <p>Total Transactions: 1,250</p>
      <p>Total Amount Processed: $2,000,000</p>
      <h2 className="text-xl mt-4 mb-2">Recent Transactions</h2>
      <ul>
        <li>User123 | $500 | Completed</li>
        <li>User234 | $300 | Failed</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
