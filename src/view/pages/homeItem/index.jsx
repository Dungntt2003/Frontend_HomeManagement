import "./homeItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToilet, faBed } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import inHomeApi from "../../../api/inRoomApi";
import formatMoney from "../../../components/displayMoney";
import { formatDate } from "../../../components/formatDate";
import { Tooltip } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function HomeItem(props) {
  const [data, setData] = useState([]);
  const [minDate, setMinDate] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await inHomeApi.getAllInfo();
        setData(
          response.data.filter((item) => item.room_id === props.home.Name)
        );
        // console.log(data);
        if (data.length > 0) {
          const initialDate = new Date(data[0].renter[0].enddate).getTime();

          const minDate = data[0].renter.reduce((min, item) => {
            const itemDate = new Date(item.enddate).getTime();
            return itemDate < min ? itemDate : min;
          }, initialDate);
          // console.log(minDate);
          setMinDate(new Date(minDate));
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (props.home["Max people"] === props.home["Number people"]) {
      getAllData();
    }
  }, [props]);
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
    <div className="item-wrap">
      <div className="item-container">
        <div className="item-pic">
          <img
            src={`http://localhost:8000/images/${props.home.images[0]}`}
            alt="anh home"
            className="item-img"
          />
        </div>
        <div className="item-content">
          <h4 className="item-name">
            {props.home.Name}
            {props.home["Max people"] === props.home["Number people"] && (
              <Tooltip title={`Phòng có chỗ trống vào ${formatDate(minDate)}`}>
                <span className="item-warn">(Đã đủ số người)</span>
              </Tooltip>
            )}
          </h4>
          <p className="item-price">Giá: {formatMoney(props.home.Price)}</p>
          <div className="item-icon">
            <div className="item-icon-item">
              <FontAwesomeIcon icon={faToilet} /> {props.home.toilet}
            </div>
            <div className="item-icon-item">
              <FontAwesomeIcon icon={faBed} /> {props.home.bathroom}
            </div>
          </div>
        </div>
        <div className="item-group-btn">
          <button className="item-detail">
            <Link to={`/homeDetail/${props.home.Name}`} className="item-link">
              Xem chi tiết
            </Link>
          </button>
          {userInfo ? (
            <>
              <button className="item-set-date">
                <Link
                  to={
                    props.home["Max people"] !== props.home["Number people"]
                      ? `/bookSchedule/${props.home.Name}`
                      : ""
                  }
                  className={
                    props.home["Max people"] === props.home["Number people"]
                      ? "item-link-disabled"
                      : "item-link"
                  }
                >
                  Đặt lịch
                </Link>
              </button>
            </>
          ) : (
            <>
              <button className="item-set-date" onClick={handleClick}>
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

export default HomeItem;
