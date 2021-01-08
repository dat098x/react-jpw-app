import axiosClient from "./axiosClient";

const testApi = {
  getAll: (params) => {
    const url = "/Questions";
    return axiosClient.get(url, { params });
  },
};

export default testApi;
