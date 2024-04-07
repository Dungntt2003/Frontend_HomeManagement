import "./home-detail.scss";
import Img1 from "../../../assets/images/t1.jpg";
import Img2 from "../../../assets/images/t2.jpg";
import Img3 from "../../../assets/images/t3.jpg";
import Img4 from "../../../assets/images/t4.jpg";
import Img5 from "../../../assets/images/t5.jpg";
import Img6 from "../../../assets/images/t6.jpg";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import Heart from "react-heart";

function HomeDetail() {
  const Images = [Img2, Img3, Img4, Img5, Img6];
  const [active, setActive] = useState(false);
  const [currentImage, setCurrentImage] = useState(Img1);
  const handleSetImage = (image) => {
    setCurrentImage(image);
  };
  const { id } = useParams();
  console.log(id);
  return (
    <div className="home-detail-container">
      <div className="home-detail-pic-group">
        <div className="home-detail-pic-main">
          <img
            src={currentImage}
            alt="Anh minh hoa"
            className="home-detail-img"
          />
        </div>
        <div className="home-detail-pic-list">
          {Images &&
            Images.map((img, index) => {
              return (
                <img
                  src={img}
                  alt="Anh minh hoa"
                  className="home-detail-pic-item"
                  onMouseOver={() => handleSetImage(img)}
                />
              );
            })}
        </div>
      </div>
      <div className="home-detail-content">
        <h2 className="home-detail-name">PHÒNG 306-B10</h2>
        <p className="home-detail-des">
          Diện tích: 20 m<sup>2</sup> <br />
          Số người tối đa(tham khảo): 4 <br />
          Số người ở hiện tại: 2 <br />
          Giá phòng: 4tr/tháng chưa kể điện nước <br />
          Có 1 toilet, 2 giường, tủ lạnh, máy giặt, điều hòa <br />
          Điện nước theo giá dân(đọc thêm thông tin{" "}
          <Link to="/about">nhà trọ</Link> để biết thêm chi tiết) <br />
        </p>
        <div className="home-detail-icon">
          <div style={{ width: "2rem" }}>
            <Heart isActive={active} onClick={() => setActive(!active)} />
          </div>

          <button className="home-detail-set">
            <Link to="/set-date" className="home-detail-link">
              Đặt lịch
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeDetail;
