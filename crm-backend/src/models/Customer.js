import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    isReturning: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
