import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, user } = useUserStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("username:", username);
    const response = await login(username, password);
    console.log("Login response:", response); // Log the full response
    if (response.success) {
      navigate("/dashboard");
    } else {
      console.log("Login failed:", response.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md w-80">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        <input
          placeholder="Username/Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2 mb-4 w-full"
        />
        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2 mb-4 w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900"
        >
          Log In
        </button>
        <div className="flex justify-between mt-4">
          <button className="text-gray-500 hover:text-gray-700">
            Forgot Password
          </button>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
