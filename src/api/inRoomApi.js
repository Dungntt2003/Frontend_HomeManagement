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
  getAllInfo: () => {
    const url = "/inRoom";
    return axiosClient.get(url);
  },
  updateBill: (id) => {
    const url = `/inRoom/bill/${id}`;
    return axiosClient.put(url);
  },
  stopRenter: (id) => {
    const url = `/inRoom/stopRent/${id}`;
    return axiosClient.put(url);
  },
  updateRenter: (id, params) => {
    const url = `/inRoom/${id}`;
    return axiosClient.put(url, params);
  },
};

export default inHomeApi;
