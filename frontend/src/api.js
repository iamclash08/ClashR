import axios from "axios";

// Base URL of your Django backend (running on port 8000 by default)
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export default api;
