import "./index.scss";
import { useState, useEffect } from "react";
import inHomeApi from "../../../../api/inRoomApi";
import { List, Avatar } from "antd";
import { formatDate, formatDateV2 } from "../../../../components/formatDate";

function RenterInfo() {
  const [room, setRoom] = useState("");
  const [renter, setRenter] = useState([]);
  const [bill, setBill] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const user_id = userInfo.id;
  useEffect(() => {
    const getDetailRenter = async () => {
      try {
        const response = await inHomeApi.getRenterDetail(user_id);
        console.log(response);
        setRenter(response.data);
        setRoom(response.data[0].room_id);
      } catch (err) {
        console.log(err);
      }
    };
    const getDetailBill = async () => {
      try {
        const response = await inHomeApi.getBillDetail(user_id);
        console.log(response);
        setBill(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDetailRenter();
    getDetailBill();
  }, [user_id]);
  return (
    <div style={{ padding: "30px" }}>
      <h1
        className="renter-info-container"
        style={{
          fontSize: "30px",
          fontWeight: "400",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        DANH SÁCH PHÒNG {room}
      </h1>
      <div
        className="renter-info-wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "50%", borderRight: "1px solid black" }}>
          <h4
            style={{ textAlign: "center", fontSize: "20px", fontWeight: "400" }}
          >
            Danh sách bạn cùng phòng
          </h4>
          <List
            itemLayout="horizontal"
            style={{ padding: "20px" }}
            dataSource={renter}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={<div>{item.name}</div>}
                  description={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        className="renter-info-uni"
                        style={{ minWidth: "30%" }}
                      >
                        Trường: {item.university}
                      </div>
                      <div
                        className="renter-info-start-date"
                        style={{ minWidth: "30%" }}
                      >
                        Bắt đầu: {formatDate(item.startdate)}
                      </div>
                      <div
                        className="renter-info-end-date"
                        style={{ minWidth: "30%" }}
                      >
                        Kết thúc: {formatDate(item.enddate)}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <div style={{ width: "50%" }}>
          <h4
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            Danh sách thanh toán hóa đơn
          </h4>
          <List
            itemLayout="horizontal"
            style={{ padding: "20px" }}
            dataSource={bill}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div>
                      <div> Tháng: {formatDateV2(item.month)}</div>
                      <div>
                        {item.ispay ? (
                          <div>
                            Thời gian thanh toán: {formatDate(item.post_date)}
                          </div>
                        ) : (
                          <div>chưa thanh toán</div>
                        )}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default RenterInfo;
