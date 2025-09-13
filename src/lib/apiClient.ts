import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    withCredentials: true, 
});

interface FailedRequest {
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (reason?: Error) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(apiClient(prom as never));
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) =>
            Promise.reject(err instanceof Error ? err : new Error(String(err)))
          );
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiClient.post("/api/auth/refresh-login");
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        const err =
          refreshError instanceof Error
            ? refreshError
            : new Error("Refresh failed");
        processQueue(err);
        console.error("Session expired, logging out.", err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(
      error instanceof Error ? error : new Error("Unknown error")
    );
  }
);

export default apiClient;