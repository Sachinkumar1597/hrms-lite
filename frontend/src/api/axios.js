import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-09me.onrender.com",
});

export default api;
