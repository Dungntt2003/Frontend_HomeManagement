import axiosClient from "./axiosClient";

const bookScheduleApi = {
  createBookSchedule: (params) => {
    const url = "/bookSchedule";
    return axiosClient.post(url, params);
  },
};

export default bookScheduleApi;
