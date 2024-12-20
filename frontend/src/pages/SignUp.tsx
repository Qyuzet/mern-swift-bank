import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, error, user } = useUserStore();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async () => {
    const response = await signup(email, username, password, phone);
    if (response.success) {
      navigate("/dashboard");
    } else {
      console.log("Signup failed:", response.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2 mb-4 w-80"
      />
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded p-2 mb-4 w-80"
      />
      <input
        placeholder="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2 mb-4 w-80"
      />
      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border rounded p-2 mb-4 w-80"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSignup}
        className="w-80 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900"
      >
        Register
      </button>
    </div>
  );
};

export default SignUp;
