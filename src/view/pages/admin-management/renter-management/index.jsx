import "./index.scss";
import React, { useState, useEffect } from "react";
// import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme, List, message } from "antd";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const getItems = (panelStyle) => [
  {
    key: "1",
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>This is panel header 1</div>
        <div>xem chi tiết thành viên</div>
      </div>
    ),
    children: (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

function RenterManagement() {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <div className="renter-container">
      <div className="renter-header">Quản lý từng phòng</div>
      <div className="renter-room-list">
        <Collapse
          bordered={false}
          style={{
            background: token.colorBgContainer,
          }}
          items={getItems(panelStyle)}
        />
      </div>
    </div>
  );
}

export default RenterManagement;
