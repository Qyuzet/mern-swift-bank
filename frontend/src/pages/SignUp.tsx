import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
      <input
        placeholder="Username/Email"
        className="border rounded p-2 mb-4 w-80"
      />
      <input
        placeholder="Enter Password"
        type="password"
        className="border rounded p-2 mb-4 w-80"
      />
      <input
        placeholder="Phone Number"
        className="border rounded p-2 mb-4 w-80"
      />
      <button
        onClick={() => navigate("/dashboard")}
        className="w-80 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900"
      >
        Register
      </button>
    </div>
  );
};

export default SignUp;
