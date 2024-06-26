import "./home-detail.scss";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Heart from "react-heart";
import homeApi from "../../../api/homeApi";
import formatMoney from "../../../components/displayMoney";
import { Checkmark } from "react-checkmark";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomeDetail() {
  const [room, setRoom] = useState({});
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(false);
  const [currentImage, setCurrentImage] = useState();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const handleSetImage = (image) => {
    setCurrentImage(image);
  };
  const { id } = useParams();
  useEffect(() => {
    const getDetailRoom = async () => {
      try {
        const res = await homeApi.getAHome(id);
        console.log(res.data[0]);
        setImages(res.data[0].images);
        setCurrentImage(res.data[0].images[0]);
        setRoom(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getDetailRoom();
  }, [id]);
  const handleClick = () => {
    toast.warning("Vui lòng đăng ký tài khoản để đặt lịch", {
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
  };
  return (
    <div className="home-detail-container">
      <div className="home-detail-pic-group">
        <div className="home-detail-pic-main">
          <img
            src={`http://localhost:8000/images/${currentImage}`}
            alt="Anh minh hoa"
            className="home-detail-img"
          />
        </div>
        <div className="home-detail-pic-list">
          {images &&
            images.map((img, index) => {
              return (
                <img
                  src={`http://localhost:8000/images/${img}`}
                  alt="Anh minh hoa"
                  className="home-detail-pic-item"
                  onMouseOver={() => handleSetImage(img)}
                />
              );
            })}
        </div>
      </div>
      <div className="home-detail-content">
        <h2 className="home-detail-name">PHÒNG {room.Name}</h2>
        <p className="home-detail-des">
          Diện tích: {room.Square}m<sup>2</sup> <br />
          Số người tối đa: {room["Max people"]}
          <br />
          Số người ở hiện tại: {room["Number people"]}
          <br />
          {room["Max people"] === room["Number people"] && (
            <div className="home-detail-announce">
              Hiện đã đủ số người, không thể đăng ký
            </div>
          )}
          Giá phòng: <strong>{formatMoney(room.Price)}/tháng</strong> chưa kể
          điện nước <br />
          <table>
            <tr>
              <th className="home-detail-device">Trang thiết bị: </th>
            </tr>
            <tr>
              <td></td>
              <td>Phòng tắm: </td>
              <td>{room.bathroom} cái</td>
            </tr>
            <tr>
              <td></td>
              <td>Nhà vệ sinh: </td>
              <td>{room.toilet} cái</td>
            </tr>
            {room.Refrigerator && (
              <tr>
                <td></td>
                <td>Tủ lạnh: </td>
                <td>
                  <Checkmark size="18px" />
                </td>
              </tr>
            )}
            {room.Launch && (
              <tr>
                <td></td>
                <td>Máy giặt: </td>
                <td>
                  <Checkmark size="18px" />
                </td>
              </tr>
            )}
            {room.Aekon && (
              <tr>
                <td></td>
                <td>Điều hòa: </td>
                <td>
                  <Checkmark size="18px" />
                </td>
              </tr>
            )}
          </table>
          Điện nước theo giá dân (đọc thêm thông tin{" "}
          <Link to="/about">nhà trọ</Link> để biết thêm chi tiết) <br />
          Nếu muốn xem trọ, bạn có thể thực hiện đặt lịch hoặc liên hệ với số
          điện thoại <strong>0398128929</strong> để đặt lịch
        </p>
        <div className="home-detail-icon">
          <div style={{ width: "2rem" }}>
            <Heart isActive={active} onClick={() => setActive(!active)} />
          </div>
          {userInfo ? (
            <>
              <button
                className={
                  room["Max people"] === room["Number people"]
                    ? "home-detail-disabled"
                    : "home-detail-set"
                }
              >
                <Link
                  to={
                    room["Max people"] !== room["Number people"]
                      ? `/bookSchedule/${id}`
                      : ""
                  }
                  className={
                    room["Max people"] === room["Number people"]
                      ? "home-detail-disabled-link home-detail-link"
                      : "home-detail-link"
                  }
                >
                  Đặt lịch
                </Link>
              </button>
            </>
          ) : (
            <>
              <button className="home-detail-set" onClick={handleClick}>
                Đặt lịch
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default HomeDetail;
