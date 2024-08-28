import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && shouldIncludeToken(config.url as string)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//トークンを含めるべきURlを判断する関数
const shouldIncludeToken = (url: string) => {
  const endpointsWithoutToken = [
    "/register/",
    "/auth/token/",
    "/auth/token/refresh/",
  ];
  return !endpointsWithoutToken.some((endpoint) => url.includes(endpoint));
};
