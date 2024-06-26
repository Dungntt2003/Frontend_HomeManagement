import "./announce.css";
import { useState, useEffect } from "react";
import announcementApi from "../../../api/announceApi";
import { Collapse, Tag, Select } from "antd";
import { formatDate } from "../../../components/formatDate";

function Announce() {
  const [announce, setAnnounce] = useState([]);
  const [tag, setTag] = useState([]);
  const [data, setData] = useState([]);
  const items = announce.map((item, index) => {
    return {
      key: item.id,
      label: <div className="announce-header-item">{item.title}</div>,
      extra: <Tag color="green">{item.tag}</Tag>,
      children: (
        <div>
          <div>Nội dung: {item.content}</div>
          <div>
            Thời gian: <strong>{formatDate(item.post_date)}</strong>
          </div>
        </div>
      ),
    };
  });

  const handleChooseTag = (value) => {
    if (value === "Tất cả") {
      setAnnounce(data);
      return;
    }
    setAnnounce(data.filter((item) => item.tag === value));
  };

  useEffect(() => {
    const getAnnounce = async () => {
      try {
        const response = await announcementApi.getAnnouncements();
        console.log(response);
        setAnnounce(response.data);
        setData(response.data);
        let tags = [
          ...new Set(response.data.flatMap((item) => item.tag.split(", "))),
        ];
        tags = [...tags, "Tất cả"];
        setTag(
          tags.map((item) => {
            return {
              label: item,
              value: item,
            };
          })
        );
      } catch (e) {
        console.log(e);
      }
    };
    getAnnounce();
  }, []);
  return (
    <div style={{ padding: "30px" }}>
      <div style={{ fontSize: "30px", textAlign: "center", margin: "20px 0" }}>
        Danh sách thông báo
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px 0",
        }}
      >
        <Select
          defaultValue="Tất cả"
          style={{
            width: 150,
          }}
          onChange={handleChooseTag}
          options={tag}
        />
      </div>
      <div>
        <Collapse
          items={items}
          // defaultActiveKey={["1"]}
          // onChange={onChange}
          // className="announce-heading"
        />
      </div>
    </div>
  );
}

export default Announce;
