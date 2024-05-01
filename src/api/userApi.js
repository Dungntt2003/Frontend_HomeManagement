import axiosClient from "./axiosClient";

const userApi = {
  getUserById: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  updateUserById: (id, params) => {
    const url = `/users/${id}`;
    return axiosClient.put(url, params);
  },
};

export default userApi;
