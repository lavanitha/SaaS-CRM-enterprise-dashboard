import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  await Order.deleteMany();
  await Customer.deleteMany();

  const customers = await Customer.insertMany([
    {
      name: "John Doe",
      email: "john@example.com",
      totalOrders: 3,
      totalSpent: 12000,
      isReturning: true,
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      totalOrders: 1,
      totalSpent: 4500,
      isReturning: false,
    },
  ]);

  await Order.insertMany([
    {
      orderId: "ORD-1001",
      customerName: customers[0].name,
      customerEmail: customers[0].email,
      product: "Premium Package",
      amount: 5000,
      status: "Completed",
      date: "2024-02-01",
    },
    {
      orderId: "ORD-1002",
      customerName: customers[0].name,
      customerEmail: customers[0].email,
      product: "Enterprise Plan",
      amount: 7000,
      status: "Completed",
      date: "2024-02-03",
    },
    {
      orderId: "ORD-1003",
      customerName: customers[1].name,
      customerEmail: customers[1].email,
      product: "Starter Plan",
      amount: 4500,
      status: "Processing",
      date: "2024-02-05",
    },
    {
      orderId: "ORD-1004",
      customerName: "Bob Johnson",
      customerEmail: "bob@example.com",
      product: "Premium Package",
      amount: 6200,
      status: "Completed",
      date: "2024-02-04",
    },
    {
      orderId: "ORD-1005",
      customerName: "Alice Brown",
      customerEmail: "alice@example.com",
      product: "Enterprise Plan",
      amount: 8900,
      status: "Pending",
      date: "2024-02-06",
    },
  ]);

  console.log("✅ Dashboard seed data inserted");
  process.exit();
};

seedData();
