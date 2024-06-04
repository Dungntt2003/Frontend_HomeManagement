import axiosClient from "./axiosClient";

const announcementApi = {
  getAnnouncements: () => {
    const url = "/announcement";
    return axiosClient.get(url);
  },
  postAnnounce: (params) => {
    const url = "/announcement";
    return axiosClient.post(url, params);
  },
  updateAnnounce: (params, id) => {
    const url = `/announcement/${id}`;
    return axiosClient.put(url, params);
  },
  getAnnounce: (id) => {
    const url = `/announcement/${id}`;
    return axiosClient.get(url);
  },
  deleteAnnounce: (id) => {
    const url = `/announcement/${id}`;
    return axiosClient.delete(url);
  },
};

export default announcementApi;
