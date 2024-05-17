import "./index.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faUser,
  faUserFriends,
  faHome,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer/footer";

function Dashboard(props) {
  return (
    <div className="oval-container">
      <div className="header">
        <Header></Header>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <Link to="/admin/schedule" className="sidebar-link">
                <FontAwesomeIcon className="sidebar-icon" icon={faCalendar} />
                <span className="sidebar-text-link">Đặt lịch</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin/announcement" className="sidebar-link">
                <FontAwesomeIcon className="sidebar-icon" icon={faDashboard} />
                <span className="sidebar-text-link">Thông báo</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin/renter" className="sidebar-link">
                <FontAwesomeIcon
                  className="sidebar-icon"
                  icon={faUserFriends}
                />
                <span className="sidebar-text-link">Sinh viên ở trọ</span>
              </Link>
            </li>

            <li className="sidebar-item">
              <Link to="/admin/room" className="sidebar-link">
                <FontAwesomeIcon className="sidebar-icon" icon={faHome} />

                <span className="sidebar-text-link">Phòng</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin/user" className="sidebar-link">
                <FontAwesomeIcon className="sidebar-icon" icon={faUser} />
                <span className="sidebar-text-link">Người dùng</span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="dashboard-content"
          style={{ marginLeft: "50px", overflow: "auto" }}
        >
          <props.component />
        </div>
      </div>
      {/* <div className="footer">
        <Footer></Footer>
      </div> */}
    </div>
  );
}

export default Dashboard;
