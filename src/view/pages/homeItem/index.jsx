import "./homeItem.scss";
import HomeItemImage from "../../../assets/images/t1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToilet,
  faBed,
  faKitchenSet,
} from "@fortawesome/free-solid-svg-icons";

function HomeItem() {
  return (
    <div className="item-wrap">
      <div className="item-container">
        <div className="item-pic">
          <img src={HomeItemImage} alt="anh home" className="item-img" />
        </div>
        <div className="item-content">
          <h4 className="item-name">P306A-B10</h4>
          <p className="item-price">Giá: 2.000.000</p>
          <div className="item-icon">
            <div className="item-icon-item">
              <FontAwesomeIcon icon={faToilet} /> 1
            </div>
            <div className="item-icon-item">
              <FontAwesomeIcon icon={faBed} /> 2
            </div>
            <div className="item-icon-item">
              <FontAwesomeIcon icon={faKitchenSet} /> 1
            </div>
          </div>
        </div>
        <div className="item-group-btn">
          <button className="item-detail">Xem chi tiết</button>
          <button className="item-set-calendar">Đặt lịch</button>
        </div>
      </div>
    </div>
  );
}

export default HomeItem;