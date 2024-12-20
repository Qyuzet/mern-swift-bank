import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUserStore(); // Get user state from Zustand
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!user || !user.token) {
        console.error("No user or token found.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/account", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`, // Send token in Authorization header
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Account Data:", data);
          setBalance(data.balance); // Update balance with the response
          setTransactions(data.transactions); // Update transactions with the response
          setLoading(false); // Set loading to false after fetching data
        } else {
          console.error("Failed to fetch account data:", data.message);
        }
      } catch (err) {
        console.error("Error fetching account data:", err);
      }
    };

    fetchAccountData();
  }, [user]); // Dependency on user to trigger when the user is available

  return (
    <div className="flex flex-col h-screen bg-white px-6 py-8">
      {/* Greeting */}
      <h1 className="text-3xl font-bold mb-4">Hi, {user?.username}!</h1>

      {/* Account Balance Section */}
      <div>
        <p className="text-lg font-semibold text-gray-700">Account Balance</p>
        <h2 className="text-4xl font-bold mt-2">
          ${loading ? "Loading..." : balance.toFixed(2)}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Account No: 123456789</p>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-6">
        <button
          onClick={() => navigate("/send-money")}
          className="flex-1 bg-black text-white py-2 mr-2 rounded-md"
        >
          Send Money
        </button>
        <button
          onClick={() => navigate("/receive-money")}
          className="flex-1 bg-gray-100 text-black py-2 rounded-md"
        >
          Receive Money
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
        <ul>
          {loading ? (
            <li className="text-sm text-gray-500">Loading...</li>
          ) : transactions.length === 0 ? (
            <li className="text-sm text-gray-500">No transactions found.</li>
          ) : (
            transactions.map((transaction, index) => (
              <li key={index} className="text-sm font-semibold">
                {new Date(transaction.date).toLocaleDateString()} - $
                {transaction.amount} - {transaction.description}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
