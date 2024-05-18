import "./index.scss";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { Timeline, List, Select, Input, Button } from "antd";
import bookScheduleApi from "../../../../api/bookScheduleApi";
import formatDate from "../../../../components/formatDate";
import formatPhoneNumber from "../../../../components/formatPhone";

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [queue, setQueue] = useState([]);
  const [id, setId] = useState(0);
  const inputRef = useRef(null);
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

  useEffect(() => {
    const getQueueSchedules = async () => {
      try {
        const response = await bookScheduleApi.getQueSchedules();
        setQueue(response.data);
        setId(response.data[0].id);
      } catch (e) {
        console.log(e);
      }
    };
    getQueueSchedules();
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
  // console.log(scheduleArray);
  const scheduleQueue = queue.map((item, index) => {
    return {
      title:
        item.name +
        " * " +
        item.user_name +
        " * " +
        formatPhoneNumber(item.phone) +
        " * " +
        formatDate(item.date),
      description: item.note,
    };
  });

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    const updateAccept = async () => {
      try {
        const params = {
          accept: value,
        };
        const response = await bookScheduleApi.ScheduleAccept(id, params);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    updateAccept();
  };
  const handleSubmit = () => {
    const inputValue = inputRef.current.input.value;
    console.log("Giá trị của ô input:", inputValue);
    const updateNote = async () => {
      try {
        const params = {
          result: inputValue,
        };
        const response = await bookScheduleApi.ScheduleResult(id, params);
        console.log(response);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    };
    updateNote();
  };
  return (
    <div className="schedule-container">
      <h1 className="schedule-header">Lịch xem phòng</h1>
      <div>
        <Timeline items={scheduleArray} />
      </div>
      <div className="schedule-queue">
        <h2 className="schedule-queue-header">Lịch chờ phê duyệt</h2>
        <div className="schedule-queue-content">
          <List
            itemLayout="horizontal"
            dataSource={scheduleQueue}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
                <div className="schedule-queue-handle">
                  <div className="schedule-queue-select">
                    <Select
                      defaultValue="Phê duyệt"
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "true",
                          label: "Chấp nhận",
                        },
                        {
                          value: "false",
                          label: "Từ chối",
                        },
                      ]}
                    />
                  </div>
                  <form className="schedule-queue-input">
                    <Input
                      placeholder="Nhập thời gian có thể gặp"
                      required
                      ref={inputRef}
                    />
                    <Button
                      type="primary"
                      className="schedule-queue-btn"
                      onClick={handleSubmit}
                    >
                      Xác nhận
                    </Button>
                  </form>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleManagement;
