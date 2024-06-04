import "./index.css";
import React, { useEffect, useState } from "react";
import { Collapse, Tag, Button, Modal } from "antd";
import announcementApi from "../../../../api/announceApi";
import { Link } from "react-router-dom";
import formatDate from "../../../../components/formatDate";

function Overview() {
  const [announce, setAnnounce] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const response = await announcementApi.getAnnouncements();
        setAnnounce(response.data);
        // console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    getAnnouncements();
  }, []);
  const onChange = (key) => {
    console.log(key);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (id) => {
    const deleteAnnouncement = async () => {
      try {
        const response = announcementApi.deleteAnnounce(id);
        console.log(response);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        console.log(err);
      }
    };
    deleteAnnouncement();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = announce.map((item, index) => {
    return {
      key: item.id,
      label: <div className="announce-header-item">{item.title}</div>,
      extra: <Tag color="green">{item.tag}</Tag>,
      children: (
        <div>
          <div>{item.content}</div>
          <p
            style={{
              fontStyle: "italic",
              fontWeight: "600",
              marginTop: "10px",
              marginBottom: 0,
            }}
          >
            Thời gian cập nhật: {formatDate(item.post_date)}
          </p>
          <div className="announce-button-wrap">
            <Link
              to={`/admin/announcement/update-announce/${item.id}`}
              className="header-link"
            >
              <Button type="primary" className="announce-button">
                Cập nhật
              </Button>
            </Link>
            <Button
              type="primary"
              className="announce-button"
              onClick={showModal}
            >
              Xóa
            </Button>
          </div>
          <Modal
            title="Xác nhận xóa"
            open={isModalOpen}
            onOk={() => handleOk(item.id)}
            onCancel={handleCancel}
          >
            <p>
              Xác nhận xóa thông báo <strong>"{item.title}"</strong>
            </p>
          </Modal>
        </div>
      ),
    };
  });

  // console.log(items);
  return (
    <div className="announcement-container">
      <h3 className="announcement-header">Danh sách thông báo</h3>
      <div className="announcement-add-btn">
        <Link to="/admin/announcement/add-new" className="header-link">
          <Button type="primary">Thêm thông báo</Button>
        </Link>
      </div>
      <div className="announcement-list">
        <Collapse
          items={items}
          // defaultActiveKey={["1"]}
          onChange={onChange}
          className="announce-heading"
        />
      </div>
    </div>
  );
}
export default Overview;
