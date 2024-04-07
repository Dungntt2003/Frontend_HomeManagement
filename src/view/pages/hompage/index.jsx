import HomeItem from "../homeItem";
import "./homepage.scss";
import homeApi from "../../../api/homeApi";
import { useEffect, useState } from "react";
function HomePage() {
  const [homeList, setHomeList] = useState([]);
  useEffect(() => {
    const fetchHomeList = async () => {
      const res = await homeApi.getAllHomes();
      console.log(res.data);
      setHomeList(res.data);
    };
    fetchHomeList();
  }, []);
  const homeItems = homeList.map((item, index) => (
    <HomeItem key={index} home={item} />
  ));
  return (
    <div className="homepage-container">
      <div className="home-item">{homeItems}</div>
    </div>
  );
}

export default HomePage;
