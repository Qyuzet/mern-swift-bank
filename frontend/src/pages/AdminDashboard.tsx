import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await fetch("http://localhost:5000/api/account", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions || []);
        setUserData(data.username || "");
        setUserDetails({ balance: data.balance });
      } else {
        console.error("Error fetching transactions:", data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/search-user?query=${searchInput}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUserDetails(data.user);
      } else {
        console.error("Error searching user:", data.message);
      }
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">
            Swift Bank Transaction Management
          </h1>
          <div className="mt-2">
            <p className="text-sm font-semibold">
              <span>Total Transactions:</span>{" "}
              <span className="font-normal">{transactions.length}</span>
            </p>
            <p className="text-sm text-gray-500">
              Total Amount Processed: <span>$3,500,000</span>
            </p>
          </div>
        </div>
        <img
          src="./swiftbank-logo.png"
          alt="Swift Bank Logo"
          className="h-36"
        />
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        {/* Recent Transactions */}
        <div>
          <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
          <div className="border-b border-gray-200">
            <div className="flex text-sm font-semibold text-gray-600 mb-2">
              <div className="w-1/4">Transaction ID</div>
              <div className="ml-16 w-1/4">User ID</div>
              <div className="w-1/4">Amount</div>
              <div className="w-1/4">Status</div>
            </div>
          </div>
          <ul className="text-sm">
            {transactions.map((transaction, index) => (
              <li className="flex py-1" key={transaction._id}>
                <div className="w-1/4">{transaction._id}</div>
                <div className="ml-16 w-1/4">{"anon"}</div>
                <div className="w-1/4">${transaction.amount}</div>
                <div
                  className={`w-1/4 ${
                    // transaction.status === "Completed"
                    //   ? "text-green-500"
                    //   : transaction.status === "Pending"
                    //   ? "text-yellow-500"
                    //   : "text-red-500"

                    "text-green-500"
                  }`}
                >
                  {/* {transaction.status} */}
                  {"Completed"}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* User Overview Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">Search Users</h2>
          <input
            type="text"
            placeholder="Search by user ID or name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full border rounded-lg p-2 mb-6 text-sm text-gray-600"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            Search
          </button>
          {userDetails && (
            <div>
              <h3 className="text-md font-bold mb-2">User Overview</h3>
              <p className="text-sm">
                Account Balance:{" "}
                <span className="font-semibold">${userDetails.balance}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Transaction History:{" "}
                <span className="text-blue-600">View Details</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
