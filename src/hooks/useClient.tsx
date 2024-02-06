import { useEffect, useState } from "react";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const API_BASE_URL = `http://localhost:8000/api/v1`;

export function useClient(accessToken: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const sendRequest = async (
    method: "get" | "post" | "put" | "delete",
    url: string,
    requestData?: any
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      setLoading(true);
      const config = {
        method,
        url: `${API_BASE_URL}/${url}`,
        headers: {
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        data: requestData, // Set requestData directly as data in the config
      };

      if (requestData instanceof FormData) {
        // For FormData, set the Content-Type to 'multipart/form-data'
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        // Set default Content-Type as application/json for other requests
        config.headers["Content-Type"] = "application/json";
      }

      const response = await axios.request(config);
      setData(response.data);
      return response;
    } catch (error: any) {
      console.log(error);
      setError(error);
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  const createClient = (): AxiosInstance => {
    const client = axios.create({
      baseURL: API_BASE_URL,
    });

    client.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return client;
  };

  return { loading, data, error, sendRequest, createClient };
}
