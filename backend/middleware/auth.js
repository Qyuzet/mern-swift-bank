import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Adjust the path based on your directory structure

// Function to extract sender from token
const getSenderFromToken = async (authHeader) => {
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  // Extract the token from the Authorization header (format: "Bearer <token>")
  const token = authHeader.split(" ")[1]; // Get token after "Bearer"

  if (!token) {
    throw new Error("Token not found");
  }

  try {
    // Verify the token using the secret key and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user based on decoded userId from the JWT payload
    const user = await User.findById(decoded.userId); // Assume the token contains userId

    if (!user) {
      throw new Error("User not found");
    }

    return user; // Return user object
  } catch (error) {
    throw new Error("Invalid token or user not found");
  }
};

export default getSenderFromToken;
