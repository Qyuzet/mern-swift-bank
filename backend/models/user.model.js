import mongoose from "mongoose";

// Create a separate schema for transactions within users
const userTransactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    transactions: [userTransactionSchema], // Use the transaction sub-schema
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
