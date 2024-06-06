import axiosClient from "./axiosClient";

const inHomeApi = {
  addRenter: (params) => {
    const url = "/inRoom";
    return axiosClient.post(url, params);
  },
  updateRenterDate: (id, params) => {
    const url = `/inRoom/${id}`;
    return axiosClient.put(url, params);
  },
};

export default inHomeApi;