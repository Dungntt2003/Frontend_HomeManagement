import "./index.scss";
import React from "react";
// import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { List, Carousel, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import homeApi from "../../../../api/homeApi";
import formatMoney from "../../../../components/displayMoney";
import { Checkmark } from "react-checkmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToilet,
  faBed,
  faXmark,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

function RoomManagement() {
  const [room, setRoom] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (id) => {
    console.log(id);
    const deleteRoom = async () => {
      try {
        const response = await homeApi.deleteHome(id);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    deleteRoom();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const response = await homeApi.getAllHomes();
        setRoom(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllRooms();
  }, []);

  const data = room.map((item, index) => {
    return {
      id: item.room_id,
      title: item.Name,
      content: `Số người tối đa: ${item["Max people"]}  
              - Số người hiện tại: ${item["Number people"]} 
              - Diện tích: ${item.Square}  (mét vuông)
              - Giá: ${formatMoney(item.Price)}`,
      image: item.images,
      air_conditioning: item.Aekon,
      refrigerator: item.Refrigerator,
      bathroom: item.bathroom,
      toilet: item.toilet,
      launch: item.Launch,
    };
  });

  // const handleDeleteRoom = (id) => {
  // const deleteRoom = async () => {
  //   try {
  //     const response = await homeApi.deleteHome(id);
  //     console.log(response);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // deleteRoom()
  // };
  return (
    <div className="room-container">
      <h2 className="room-header">Danh sách các phòng</h2>
      <div className="room-add-new">
        <Button type="primary" style={{ backgroundColor: "navy" }}>
          <Link to="/admin/add-new-room" className="room-manage-link">
            Thêm phòng mới
          </Link>
        </Button>
      </div>
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <div>
                  <FontAwesomeIcon icon={faToilet} /> {item.toilet}
                </div>,
                <div>
                  <FontAwesomeIcon icon={faBed} /> {item.bathroom}
                </div>,
                <>
                  {item.refrigerator === true ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "12px" }}>Tủ lạnh</div>
                      <Checkmark size="18px" />
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "12px" }}>Tủ lạnh</div>
                      <FontAwesomeIcon
                        icon={faXmark}
                        style={{ color: "red" }}
                      />
                    </div>
                  )}
                </>,
                <>
                  {item.launch === true ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "12px" }}>Điều hòa</div>
                      <Checkmark size="18px" />
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "12px" }}>Điều hòa</div>
                      <FontAwesomeIcon
                        icon={faXmark}
                        style={{ color: "red" }}
                      />
                    </div>
                  )}
                </>,
                <>
                  {item.air_conditioning === true ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "12px" }}>Điều hòa</div>
                      <Checkmark size="18px" />
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "12px" }}>Điều hòa</div>
                      <FontAwesomeIcon
                        icon={faXmark}
                        style={{ color: "red" }}
                      />
                    </div>
                  )}
                </>,
              ]}
              extra={
                <Carousel style={{ maxWidth: "200px" }}>
                  {item.image.map((value, index) => {
                    return (
                      <div>
                        <img
                          height={160}
                          width={200}
                          alt="logo"
                          src={`http://localhost:8000/images/${value}`}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              }
            >
              <List.Item.Meta
                avatar={
                  <FontAwesomeIcon
                    icon={faHouse}
                    style={{ fontSize: "25px", color: "#7DAFCE" }}
                  />
                }
                title={item.title}
              />
              {item.content}
              <div className="room-manage-btn">
                <div className="room-manage-button">
                  <Button type="primary">
                    <Link
                      to={`/admin/update-room/${item.title}`}
                      className="room-manage-link"
                    >
                      Cập nhật
                    </Link>
                  </Button>
                </div>
                <div className="room-manage-button">
                  <Button type="primary" onClick={showModal}>
                    Xóa
                  </Button>
                </div>
                <Modal
                  title="Xác nhận xóa"
                  open={isModalOpen}
                  onOk={() => handleOk(item.title)}
                  onCancel={handleCancel}
                >
                  <p>Bạn có chắc là thực hiện xóa phòng {item.title}</p>
                </Modal>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default RoomManagement;
