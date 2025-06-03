import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API URL FRONTEND:", process.env.NEXT_PUBLIC_BASE_URL);
console.log(api.defaults.baseURL);
