import client from "./client";

const popular = () =>
  client.get("/search", {
    params: {
      query: "Python developer in Texas, USA",
      page: "1",
      num_pages: "1",
    },
  });

const nearby = () =>
  client.get("/search", {
    params: {
      query: "React Developer",
      page: "1",
      num_pages: "1",
    },
  });

const search = (searchTerm: string) => () =>
  client.get("/search", {
    params: {
      query: searchTerm,
      page: "1",
    },
  });

const details = (jobId: string) => () =>
  client.get("/job-details", {
    params: {
      job_id: jobId,
    },
  });

export default {
  popular,
  nearby,
  details,
  search,
};
