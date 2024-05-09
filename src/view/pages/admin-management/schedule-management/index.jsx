import "./index.scss";
import React from "react";
import { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import bookScheduleApi from "../../../../api/bookScheduleApi";
import formatDate from "../../../../components/formatDate";

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const response = await bookScheduleApi.getAllSchedule();
        // console.log(response);
        setSchedules(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllSchedules();
  }, []);
  const scheduleArray = schedules.map((item, index) => {
    return {
      color: "green",
      children:
        item.name +
        " * " +
        item.user_name +
        " * " +
        item.result +
        " * " +
        formatDate(item.date),
    };
  });
  console.log(scheduleArray);
  return (
    <div className="schedule-container">
      <h1 className="schedule-header">Lịch xem phòng</h1>
      <div>
        <Timeline items={scheduleArray} />
      </div>
    </div>
  );
}

export default ScheduleManagement;
