import "./homeItem.scss";
import HomeItemImage from "../../../assets/images/t1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToilet, faBed } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import formatMoney from "../../../components/displayMoney";
function HomeItem(props) {
  return (
    <div className="item-wrap">
      <div className="item-container">
        <div className="item-pic">
          <img src={HomeItemImage} alt="anh home" className="item-img" />
        </div>
        <div className="item-content">
          <h4 className="item-name">{props.home.Name}</h4>
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
          <button className="item-set-calendar">
            <Link to={`/bookSchedule/${props.home.Name}`} className="item-link">
              Đặt lịch
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeItem;
