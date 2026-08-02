import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // relavant function goes herer
//     }

//     return Promise.reject(error);
//   },
// );
