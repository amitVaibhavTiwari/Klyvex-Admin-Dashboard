import axios from "axios";

// axios instance
export const customFetch = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URI,
  });
};
