import axios from "axios";

export const api = axios.create({
  baseURL: "https://e-compensation-server-production.up.railway.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
