import axiosClient from "./axiosClient";

const homeApi = {
  getAllHomes: () => {
    const url = "/homes";
    return axiosClient.get(url);
  },
  getAHome: (id) => {
    const url = `/homes/${id}`;
    return axiosClient.get(url);
  },
  postHome: (params) => {
    const url = "/homes";
    return axiosClient.post(url, params);
  },
  updateHome: (id, params) => {
    const url = `/homes/${id}`;
    return axiosClient.put(url, params);
  },
  deleteHome: (id) => {
    const url = `/homes/${id}`;
    return axiosClient.delete(url);
  },
};

export default homeApi;
