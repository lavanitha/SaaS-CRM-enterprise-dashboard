import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },

    customerName: {
      type: String,
      required: true
    },

    customerEmail: {
      type: String,
      required: true
    },

    product: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Completed", "Processing", "Pending"],
      default: "Processing"
    },

    // IMPORTANT: keep as String to match existing DB data
    date: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Order", orderSchema);
