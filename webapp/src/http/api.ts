import axios, { AxiosRequestConfig } from "axios";

export default function HTTPBuilder(options: AxiosRequestConfig) {
  const baseURL: string = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;
  return axios.create({
    ...options,
    baseURL,
  });
}
