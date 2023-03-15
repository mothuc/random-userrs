import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://randomuser.me/api/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
