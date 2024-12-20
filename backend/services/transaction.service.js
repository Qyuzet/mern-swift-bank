import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";

export async function processTransaction(senderId, recipientPhone, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find sender and recipient
    const sender = await User.findById(senderId).session(session);
    const recipient = await User.findOne({ phone: recipientPhone }).session(
      session
    );

    // Validate transaction
    if (!sender || !recipient) {
      throw new Error("Invalid sender or recipient");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient funds");
    }

    // Create transaction record
    const transaction = new Transaction({
      sender: sender._id,
      recipient: recipient._id,
      amount,
      type: "SEND",
      description: `Transfer to ${recipient.username}`,
      status: "COMPLETED",
    });

    // Update balances
    sender.balance -= amount;
    recipient.balance += amount;

    // Create transaction records for users
    const senderTransaction = {
      type: "SEND",
      amount: -amount,
      description: `Sent to ${recipient.username}`,
      date: new Date(),
    };

    const recipientTransaction = {
      type: "RECEIVE",
      amount: amount,
      description: `Received from ${sender.username}`,
      date: new Date(),
    };

    // Add transactions to users' history
    sender.transactions.push(senderTransaction);
    recipient.transactions.push(recipientTransaction);

    // Save all changes
    await transaction.save({ session });
    await sender.save({ session });
    await recipient.save({ session });

    // Commit transaction
    await session.commitTransaction();
    return {
      success: true,
      transaction,
      newBalance: sender.balance,
      recipient,
    };
  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
