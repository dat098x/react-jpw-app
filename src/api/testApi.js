import axiosClient from "./axiosClient";

const testApi = {
  getAllBook: (bookName) => {
    const url = `/books/${bookName}`;
    return axiosClient.get(url);
  },

  getAllUnit: (url) => {
    //const url = `/testbook/1/unit`;
    return axiosClient.get(url);
  },
};

export default testApi;
