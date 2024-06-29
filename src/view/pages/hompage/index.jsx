import HomeItem from "../homeItem";
import "./homepage.scss";
import homeApi from "../../../api/homeApi";
import { useEffect, useState } from "react";
import { Checkbox, Collapse } from "antd";

function HomePage() {
  const [homeList, setHomeList] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchHomeList = async () => {
      const res = await homeApi.getAllHomes();
      console.log(res.data);
      setHomeList(res.data);
      setData(res.data);
    };
    fetchHomeList();
  }, []);
  const onChange = (checkedValues) => {
    console.log(checkedValues);
    const filteredData = data.filter((item) => {
      return checkedValues.every((filter) => item[filter] === true);
    });
    setHomeList(filteredData);
  };
  const options = [
    {
      label: "Có điều hòa",
      value: "Aekon",
    },
    {
      label: "Có máy giặt",
      value: "Launch",
    },
    {
      label: "Có tủ lạnh",
      value: "Refrigerator",
    },
  ];
  const homeItems = homeList.map((item, index) => (
    <HomeItem key={index} home={item} />
  ));
  const items = [
    {
      key: "1",
      label: <div style={{ color: "#074979", fontWeight: 600 }}>Bộ lọc</div>,
      children: (
        <>
          <Checkbox.Group options={options} onChange={onChange} />
        </>
      ),
    },
  ];
  return (
    <div className="homepage-container">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Collapse ghost items={items} style={{ minWidth: "400px" }} />
      </div>
      <div className="home-item">{homeItems}</div>
    </div>
  );
}

export default HomePage;
