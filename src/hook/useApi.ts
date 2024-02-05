import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface Response<T> {
  status: string;
  data: T;
}

export default function useApi<T>(
  func: (
    config?: AxiosRequestConfig<any>
  ) => Promise<AxiosResponse<Response<T>, any>>
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async () => {
    try {
      setLoading(true);
      const response = await func();
      setData(response.data.data);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.message || "Something went wrong");
      } else {
        // Handle other types of errors
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
}
