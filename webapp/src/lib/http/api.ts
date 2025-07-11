import { useAuth } from "@clerk/nextjs";
import axios, { AxiosError } from "axios";

const baseURL: string = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;
const http = axios.create({
  baseURL,
});

http.interceptors.response.use(
  r => r,
  (error: AxiosError) => {
    if (error.status === 401 || error.status === 403) {
      window.location.href = "/sign-in";
    } else {
      return Promise.reject(error);
    }
  }
);

export default http;

export const useApi = () => {
  const { getToken } = useAuth();

  const instance = http;

  instance.interceptors.request.use(async config => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
  return instance;
};
