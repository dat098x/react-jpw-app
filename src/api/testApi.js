import axiosClient from "./axiosClient";

const testApi = {
  getAll: (id) => {
    const url = `/testbook/1/unit/${id}`;
    return axiosClient.get(url);
  },

  getAllUnit: (url) => {
    //const url = `/testbook/1/unit`;
    return axiosClient.get(url);
  },
};

export default testApi;
