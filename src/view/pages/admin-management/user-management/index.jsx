import "./index.scss";
import React, { useState, useEffect } from "react";
import { Avatar, List, Radio, Space, Select, Button, DatePicker } from "antd";
import userApi from "../../../../api/userApi";
import formatDate from "../../../../components/formatDate";
import homeApi from "../../../../api/homeApi";
import moment from "moment";
const { RangePicker } = DatePicker;

function UserManagement() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [room, setRoom] = useState();
  const [name, setName] = useState([]);
  const [option, setOption] = useState(undefined);
  const [users, setUsers] = useState([]);
  const handleChange = (value, index) => {
    console.log(`selected ${value}`);
    setOption(value);
  };
  const handleChangeRoom = (value) => {
    console.log(value);
    setRoom(value);
  };
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await userApi.getAllCustomers();
        console.log(response);
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomers();
  }, []);
  useEffect(() => {
    const getNameHomes = async () => {
      try {
        const response = await homeApi.getAllHomes();
        // console.log(response);
        setName(
          response.data.map((item, index) => {
            return {
              value: item.room_id,
              label: item.room_id,
            };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getNameHomes();
  }, []);
  const handleConfirm = (index) => {
    console.log(index + 1);
    console.log(room);
  };
  const handleChangeDate = (value) => {
    const startDate = moment(value[0]).format("YYYY-MM-DD");
    const endDate = moment(value[1]).format("YYYY-MM-DD");
    setStart(startDate);
    setEnd(endDate);
  };
  return (
    <div className="use-container">
      <div className="user-header">Danh sách người dùng</div>
      <div className="user-list">
        <List
          pagination={{
            position: "bottom",
            align: "end",
            pageSize: 5,
          }}
          dataSource={users}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={
                  <div>
                    {item.email} - {item.name}
                  </div>
                }
                description={
                  <div className="user-list-info">
                    <div className="user-dob">{formatDate(item.dob)}</div>
                    <div className="user-university">
                      {item.university ? item.university : "Chưa nhập trường"}
                    </div>
                    <div className="user-role">
                      <Select
                        placeholder="Chuyển vai trò"
                        style={{
                          width: 150,
                        }}
                        allowClear
                        onChange={() => handleChange(index)}
                        options={[
                          {
                            value: "renter",
                            label: "Khách thuê trọ",
                          },
                        ]}
                      />
                    </div>
                    {option === index && (
                      <>
                        <div className="user-room">
                          <Select
                            placeholder="Chọn phòng"
                            style={{
                              width: 150,
                            }}
                            allowClear
                            onChange={handleChangeRoom}
                            options={name}
                          />
                        </div>
                        <div className="user-datePick">
                          <RangePicker
                            style={{ width: "250px", marginRight: "6px" }}
                            onChange={handleChangeDate}
                          />
                        </div>
                        <div className="user-confirm">
                          <Button
                            type="primary"
                            onClick={() => handleConfirm(index)}
                          >
                            Xác nhận
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default UserManagement;
