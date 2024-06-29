import "./index.scss";
import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  Radio,
  Space,
  Select,
  Button,
  DatePicker,
  Input,
} from "antd";
import userApi from "../../../../api/userApi";
import { formatDate } from "../../../../components/formatDate";
import homeApi from "../../../../api/homeApi";
import moment from "moment";
import inHomeApi from "../../../../api/inRoomApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { RangePicker } = DatePicker;
const { Search } = Input;

function UserManagement() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [room, setRoom] = useState();
  const [name, setName] = useState([]);
  const [option, setOption] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState([]);
  const handleChange = (value, index) => {
    console.log(`selected ${value}`);
    setOption(value);
  };
  const handleChangeRoom = (value) => {
    console.log(value);
    setRoom(value);
  };
  const onSearch = (value) => {
    setFilter(
      users.filter((user) => {
        if (value === "") return user;
        else return user.name === value;
      })
    );
  };
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await userApi.getAllCustomers();
        console.log(response);
        setUsers(response.data);
        setFilter(response.data);
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
    const addNewRenter = async () => {
      try {
        const params = {
          room_id: room,
          user_id: index,
          startDate: start,
          endDate: end,
        };
        const response = await inHomeApi.addRenter(params);
        console.log(response);
        toast.success("Chuyển khách ở trọ thành công", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };
    addNewRenter();
  };
  const handleChangeDate = (value) => {
    const startDate = moment(new Date(value[0])).format("YYYY-MM-DD");
    const endDate = moment(new Date(value[1])).format("YYYY-MM-DD");
    setStart(startDate);
    setEnd(endDate);
  };
  return (
    <div className="use-container">
      <div className="user-header">Danh sách người dùng</div>
      <div className="user-search">
        <Search
          placeholder="Nhập tên muốn tìm"
          onSearch={onSearch}
          style={{
            width: "500px",
          }}
        />
      </div>
      <div className="user-list">
        <List
          pagination={{
            position: "bottom",
            align: "end",
            pageSize: 5,
          }}
          dataSource={filter}
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
                            onClick={() => handleConfirm(item.id)}
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
      <ToastContainer />
    </div>
  );
}

export default UserManagement;
