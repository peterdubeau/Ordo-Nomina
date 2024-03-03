import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.REACT_APP_API_DEPLOYMENT}`
    : "http://localhost:3000";

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
