import "./index.scss";
import React, { useState, useEffect } from "react";
import {
  Collapse,
  theme,
  List,
  Avatar,
  Button,
  Switch,
  Modal,
  DatePicker,
} from "antd";
import inHomeApi from "../../../../api/inRoomApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate, formatDateV2 } from "../../../../components/formatDate";

function RenterManagement() {
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalV2, setModalV2] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (id) => {
    const params = {
      endDate: date,
    };
    const updateRenterDate = async () => {
      try {
        const response = await inHomeApi.updateRenterDate(id, params);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    updateRenterDate();
    setIsModalOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalV2 = () => {
    setModalV2(true);
  };
  const handleOkV2 = (id) => {
    const stopRenterDate = async () => {
      try {
        const response = await inHomeApi.stopRenter(id);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    stopRenterDate();
    setModalV2(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleCancelV2 = () => {
    setModalV2(false);
  };

  const onChange = (date, dateString) => {
    console.log(dateString);
    setDate(dateString);
  };
  useEffect(() => {
    const getRenters = async () => {
      try {
        const response = await inHomeApi.getAllInfo();
        console.log(response);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRenters();
  }, []);

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const getItems = data.map((item, index) => {
    return {
      key: index,
      label: (
        <div>
          <div style={{ fontSize: "18px", color: "#074979" }}>
            {item.room_id}
          </div>
          <div>
            Tổng số người trọ hiện tại: <strong>{item.renter.length}</strong>
          </div>
        </div>
      ),
      children: (
        <div>
          <div style={{ fontSize: "18px" }}>
            Danh sách sinh viên trọ tại phòng
          </div>
          <div>
            <List
              itemLayout="horizontal"
              style={{ padding: "20px" }}
              dataSource={item.renter}
              renderItem={(renter, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={<div>{renter.name}</div>}
                    description={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div>Thời hạn hợp đồng</div>
                          <div style={{ marginLeft: "20px" }}>
                            {formatDate(renter.startdate)} -{" "}
                            {formatDate(renter.enddate)}
                          </div>
                        </div>
                        <div>
                          <Button
                            type="primary"
                            size="small"
                            onClick={showModal}
                          >
                            Thay đổi gia hạn
                          </Button>
                          <Button
                            type="primary"
                            size="small"
                            style={{ marginLeft: "20px" }}
                            onClick={showModalV2}
                          >
                            Dừng gia hạn
                          </Button>
                        </div>
                        <Modal
                          title="Gia hạn"
                          open={isModalOpen}
                          onOk={() => handleOk(renter.id)}
                          onCancel={handleCancel}
                        >
                          <p>Thay đổi gia hạn ở cho {renter.name}</p>
                          <div>
                            {" "}
                            Thời gian gia hạn:{" "}
                            <DatePicker onChange={onChange} />
                          </div>
                        </Modal>

                        <Modal
                          title="Xác nhận"
                          open={modalV2}
                          onOk={() => handleOkV2(renter.id)}
                          onCancel={handleCancelV2}
                        >
                          <p>Dừng gia hạn ở cho {renter.name}</p>
                        </Modal>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
          {item.renter.length > 0 && (
            <div>
              <div style={{ fontSize: "18px" }}>
                Danh sách hóa đơn của phòng
              </div>
              <List
                itemLayout="horizontal"
                style={{ padding: "20px" }}
                dataSource={item.bill}
                renderItem={(bill, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>{formatDateV2(bill.month)}</div>
                          {bill.ispay === true ? (
                            <>
                              <div
                                style={{
                                  marginLeft: "20px",
                                  display: "flex",
                                  alignItems: "cemter",
                                }}
                              >
                                <div>
                                  Đã thanh toán :{" "}
                                  <Switch defaultChecked disabled />
                                </div>
                              </div>
                              <div style={{ marginLeft: "20px" }}>
                                <div>
                                  Ngày đóng : {formatDate(bill.post_date)}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div style={{ marginLeft: "20px" }}>
                                <div>
                                  Thanh toán :{" "}
                                  <Switch onChange={() => onCheck(bill.id)} />
                                </div>
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
          )}
        </div>
      ),

      style: panelStyle,
    };
  });

  const onCheck = (id) => {
    const updateBillForRoom = async () => {
      try {
        const response = await inHomeApi.updateBill(id);
        console.log(response);
        toast.success("Thanh toán thành công", {
          position: "top-center",
          autoClose: 3000,
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
        }, 3000);
      } catch (err) {
        console.log(err);
        toast.error("Thanh toán thất bại", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
      }
    };
    updateBillForRoom();
  };

  return (
    <div className="renter-container">
      <div className="renter-header">Quản lý từng phòng</div>
      <div className="renter-room-list" style={{ marginTop: "20px" }}>
        <Collapse
          bordered={false}
          style={{
            background: token.colorBgContainer,
          }}
          items={getItems}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default RenterManagement;
