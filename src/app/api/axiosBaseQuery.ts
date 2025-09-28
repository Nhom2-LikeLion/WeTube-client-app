import { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import apiClient from "@/lib/apiClient"; 

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body }) => {
    try {
      const result = await apiClient({ url, method, data: body });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
