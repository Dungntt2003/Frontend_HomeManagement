import axiosClient from "./axiosClient";

const authApi = {
  login: (credentials) => {
    const url = "/login";
    return axiosClient.post(url, credentials);
  },
  register: (credentials) => {
    const url = "/register";
    return axiosClient.post(url, credentials);
  },
};

export default authApi;
