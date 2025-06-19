import axios from "axios";

const baseURL: string = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;
const http = axios.create({
  baseURL,
});

export default http;
