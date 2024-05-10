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
  getQueSchedules: () => {
    const url = "/bookSchedule/queue";
    return axiosClient.get(url);
  },
  ScheduleAccept: (id, params) => {
    const url = `/bookSchedule/${id}/handle`;
    return axiosClient.put(url, params);
  },
  ScheduleResult: (id, params) => {
    const url = `/bookSchedule/${id}`;
    return axiosClient.put(url, params);
  },
};

export default bookScheduleApi;
