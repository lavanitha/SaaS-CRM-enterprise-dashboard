import Order from "../models/Order.js";
import Customer from "../models/Customer.js";

// Mock data for development
const mockDashboardData = {
  kpis: {
    totalOrders: 1250,
    totalCustomers: 485,
    totalRevenue: 145230,
    returningPercentage: 62
  },
  recentOrders: [
    { _id: "1", orderId: "ORD-001", customerName: "John Doe", amount: 5230, status: "Completed" },
    { _id: "2", orderId: "ORD-002", customerName: "Jane Smith", amount: 3450, status: "Completed" },
    { _id: "3", orderId: "ORD-003", customerName: "Bob Johnson", amount: 4120, status: "Pending" },
    { _id: "4", orderId: "ORD-004", customerName: "Alice Brown", amount: 2890, status: "Processing" },
    { _id: "5", orderId: "ORD-005", customerName: "Carol White", amount: 6540, status: "Completed" }
  ]
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await Customer.countDocuments();

    const revenueResult = await Order.aggregate([
      { $match: { status: "Completed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    const returningCustomers = await Customer.countDocuments({
      isReturning: true
    });

    const returningPercentage =
      totalCustomers === 0
        ? 0
        : Math.round((returningCustomers / totalCustomers) * 100);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      kpis: {
        totalOrders,
        totalCustomers,
        totalRevenue,
        returningPercentage
      },
      recentOrders
    });
  } catch (error) {
    console.warn("Falling back to mock data:", error.message);
    res.json(mockDashboardData);
  }
};
