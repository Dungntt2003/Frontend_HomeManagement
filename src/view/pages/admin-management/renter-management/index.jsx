import "./index.scss";
import React, { useState, useEffect } from "react";
import { Collapse, theme, List, Avatar, Button, Switch } from "antd";
import inHomeApi from "../../../../api/inRoomApi";
import { formatDate, formatDateV2 } from "../../../../components/formatDate";

function RenterManagement() {
  const [data, setData] = useState([]);

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
          <div>Danh sách sinh viên trọ tại phòng</div>
          <div>
            <List
              itemLayout="horizontal"
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
                          <Button type="primary" size="small">
                            Tiếp tục gia hạn
                          </Button>
                          <Button
                            type="primary"
                            size="small"
                            style={{ marginLeft: "20px" }}
                          >
                            Dừng gia hạn
                          </Button>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
          <div>Danh sách hóa đơn của phòng</div>
          <List
            itemLayout="horizontal"
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
                              Đã thanh toán : <Switch defaultChecked />
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            <div>Ngày đóng : {bill.post_date}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ marginLeft: "20px" }}>
                            <div>
                              Thanh toán : <Switch />
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
      ),

      style: panelStyle,
    };
  });

  return (
    <div className="renter-container">
      <div className="renter-header">Quản lý từng phòng</div>
      <div className="renter-room-list">
        <Collapse
          bordered={false}
          style={{
            background: token.colorBgContainer,
          }}
          items={getItems}
        />
      </div>
    </div>
  );
}

export default RenterManagement;
