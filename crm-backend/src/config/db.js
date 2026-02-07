import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "crm_saas"
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn("⚠️  MongoDB connection failed:", error.message);
    console.warn("⚠️  Running in development mode without database");
  }
};

export default connectDB;
