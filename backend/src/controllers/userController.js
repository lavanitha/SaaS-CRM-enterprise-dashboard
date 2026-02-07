import User from "../models/User.js";

export const getCompanyUsers = async (req, res) => {
  const users = await User.find({ company: req.user.company }).select(
    "name email role"
  );
  res.json(users);
};
