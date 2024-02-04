import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string;
  job_country: string;
  job_employment_type: string;
  job_highlights?: {
    Qualifications?: string[];
    Responsibilities?: string[];
  };
  job_description: string;
  job_google_link?: string;
}

interface Response<T> {
  status: string;
  data: T;
}

interface QueryParams {
  job_id: string;
}

const useJobDetails = (query: QueryParams) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/job-details`,
    params: query,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.request<Response<Job[]>>(options);
      setJobs(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching data!");
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    jobs,
    isLoading,
    error,
    refetch,
  };
};

export default useJobDetails;
