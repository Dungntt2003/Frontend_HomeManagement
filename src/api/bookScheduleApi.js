import axiosClient from "./axiosClient";

const bookScheduleApi = {
  createBookSchedule: (params) => {
    const url = "/bookSchedule";
    return axiosClient.post(url, params);
  },
  getBookSchedulesByUser: (user_id) => {
    const url = `/bookSchedule/${user_id}`;
    return axiosClient.get(url);
  },
  getAllSchedule: () => {
    const url = "/bookSchedule";
    return axiosClient.get(url);
  },
};

export default bookScheduleApi;
