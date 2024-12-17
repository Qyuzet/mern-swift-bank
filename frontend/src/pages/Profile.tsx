import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            User Info
          </h2>
          <p className="text-gray-600 mb-2">
            <strong>Name:</strong> John Doe
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> johndoe@example.com
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Phone:</strong> +1 234 567 890
          </p>
        </div>

        {/* Settings */}
        <button
          onClick={() => alert("Settings Updated!")}
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          Update Settings
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
