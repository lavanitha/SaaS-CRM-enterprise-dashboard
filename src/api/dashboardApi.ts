import axios from "axios";

// Use environment variable or default to localhost for development
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: baseURL,
});

export const getDashboardStats = async () => {
  const response = await API.get("/dashboard/stats");
  return response.data;
};
