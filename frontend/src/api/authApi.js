import API from "./axios";

const authApi = {
  login: async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    return res.data;
  }
};

export default authApi;
