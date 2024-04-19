import axiosClient from "./axiosClient";

const testApi = {
  getImages: () => {
    const url = "/upload";
    return axiosClient.get(url);
  },
};

export default testApi;
