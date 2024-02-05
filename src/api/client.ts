import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
if (!apiKey) {
  throw new Error("API_KEY not found!");
}

const apiClient = axios.create({
  baseURL: "https://jsearch.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
});

export default apiClient;
