import React from "react";

const Transactions = () => {
  const transactions = [
    { id: 1, recipient: "Alice", amount: "$500.00", date: "2024-09-01" },
    { id: 2, recipient: "Bob", amount: "$1,000.00", date: "2024-09-02" },
    { id: 3, recipient: "Charlie", amount: "$250.00", date: "2024-09-03" },
  ];

  return (
    <div className="h-screen bg-gray-50 p-8">
      <div className="bg-gray-800 text-white p-4 rounded-t-md">
        <h1 className="text-2xl font-semibold">Transaction History</h1>
      </div>
      <table className="w-full bg-white shadow-md">
        <thead>
          <tr className="text-gray-600 text-left border-b">
            <th className="p-4">Recipient</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="p-4">{tx.recipient}</td>
              <td className="p-4">{tx.amount}</td>
              <td className="p-4">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
