//@no-check
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "./config/db.js"; // MongoDB connection
import User from "./models/user.model.js"; // User schema
import cors from "cors";
import getSenderFromToken from "./middleware/auth.js";

import { processTransaction } from "./services/transaction.service.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Enable CORS for frontend (localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173", // You can also use "*" to allow all origins, but be cautious in production
    methods: ["GET", "POST", "PUT", "DELETE"], // Adjust methods based on your needs
    credentials: true, // Allow cookies (if needed)
  })
);

// Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

// Middleware for protected routes (to get user info from token)
const authenticateUser = async (req, res, next) => {
  try {
    const user = await getSenderFromToken(req.header("Authorization")); // Call the auth function
    req.user = user; // Attach user to request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

app.post("/api/send-money", verifyToken, async (req, res) => {
  try {
    const { phone, amount } = req.body;

    // Basic validation
    if (!phone || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number or amount",
      });
    }

    const result = await processTransaction(req.user.id, phone, Number(amount));

    res.status(200).json({
      success: true,
      message: "Transaction completed successfully",
      transaction: result.transaction,
      recipientName: result.recipient.username,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/account", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      username: user.username,
      balance: user.balance,
      transactions: user.transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Sign Up Route
app.post("/api/signup", async (req, res) => {
  const { username, password, phone, email } = req.body;

  // Validate required fields
  if (!username || !password || !email || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      phone,
      email,
      // balance and transactions are already set by the schema defaults
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send user data and token in response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        balance: newUser.balance, // balance is 0 by default
        transactions: newUser.transactions, // empty array by default
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server Error: ${error.message}` });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send user data, balance, and transactions in response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        balance: user.balance, // balance is part of user schema
        transactions: user.transactions, // transactions will be an empty array or filled if transactions exist
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server Error: ${error.message}` });
  }
});

// Protected Route (Example)
app.get("/api/dashboard", verifyToken, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the dashboard!" });
});

// Fetch recent transactions
app.get("/transactions", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Search users
app.get("/api/search-user", verifyToken, async (req, res) => {
  const query = req.query.query || "";
  try {
    const user = await User.findOne({
      $or: [{ username: query }, { phone: query }],
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user: { balance: user.balance, transactionHistory: user.transactions },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Start server function
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB connection is established before starting the server
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
