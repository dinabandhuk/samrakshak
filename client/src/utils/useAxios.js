import axios from "axios";
import { API_BASE_URL } from "./constants";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    (req) => {
      // const accessToken = localStorage.getItem("access_token");
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ5Y2Y2YTkwOGE3YTBkZTlkNzczNDUiLCJpYXQiOjE3MjU1NTA0NDIsImV4cCI6MTcyNTgwOTY0Mn0.TGzXdm52qCb3haJN_wYeD3S2Y2AUMNrIOuoANiBeMu4";
      if (accessToken) req.headers.Authorization = `Bearer ${accessToken}`;

      if (req.data instanceof FormData)
        req.headers["Content-Type"] = "multipart/form-data";
      else req.headers["Content-Type"] = "application/json";

      req.headers["Access-Control-Allow-Origin"] = "*";
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
