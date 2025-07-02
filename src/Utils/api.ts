import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/admin",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "x-csrf-token": Cookies.get("csrf_token"),
  },
});
