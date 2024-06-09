import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "../pages/hompage";
import AdminInfo from "../pages/admin-info/admin-info";
import MainLayout from "../../components/layout/main-layout";
import HomeDetail from "../pages/home-detail/home-detail";
import SetDate from "../pages/set-date/set-date";
import Announce from "../pages/announce/announce";
import SignUp from "../pages/signup/signup";
import SignIn from "../pages/signin/signin";
import HeaderOnly from "../../components/layout/header-only";
import BookScheduleResult from "../pages/set-date/bookScheduleResult/bookResult";
import Profile from "../pages/profile/profile";
import Dashboard from "../pages/admin-management/dashboard";
import Overview from "../pages/admin-management/overview";
import RoomManagement from "../pages/admin-management/room-management";
import RenterManagement from "../pages/admin-management/renter-management";
import UserManagement from "../pages/admin-management/user-management";
import ScheduleManagement from "../pages/admin-management/schedule-management";
import AddNewRoom from "../pages/admin-management/room-management/add-room";
import UpdateRoom from "../pages/admin-management/room-management/update-room";
import UpdateAnnounce from "../pages/admin-management/overview/update-announce";
import AddAnnouncement from "../pages/admin-management/overview/add-announce";
// import RenterDetail from "../pages/admin-management/renter-management/renter-detail";
function AllRoutes() {
  const user = localStorage.getItem("user");
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user1);
  // console.log(user);
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/homepage"} />} />
      <Route
        path="/signup"
        element={
          user ? <Navigate to="/homepage" /> : <MainLayout component={SignUp} />
        }
      />
      <Route
        path="/signin"
        element={
          user ? <Navigate to="/homepage" /> : <MainLayout component={SignIn} />
        }
      />
      <Route path="/homepage" element={<MainLayout component={HomePage} />} />
      <Route path="/about" element={<MainLayout component={AdminInfo} />} />
      <Route
        path="/homeDetail/:id"
        element={<MainLayout component={HomeDetail} />}
      />
      <Route
        path="/bookSchedule/:id"
        element={<MainLayout component={SetDate} />}
      />
      <Route
        path="/bookSchedule/result"
        element={<HeaderOnly component={BookScheduleResult} />}
      />
      <Route path="/announce" element={<MainLayout component={Announce} />} />
      <Route path="/profile" element={<MainLayout component={Profile} />} />
      <Route
        path="/admin/announcement"
        element={<Dashboard component={Overview} />}
      />
      <Route
        path="/admin/announcement/add-new"
        element={<Dashboard component={AddAnnouncement} />}
      />
      <Route
        path="/admin/announcement/update-announce/:id"
        element={<Dashboard component={UpdateAnnounce} />}
      />
      <Route
        path="/admin/room"
        element={<Dashboard component={RoomManagement} />}
      />
      <Route
        path="/admin/renter"
        element={<Dashboard component={RenterManagement} />}
      />
      {/* <Route
        path="/admin/renter/detail"
        element={<Dashboard component={RenterDetail} />}
      /> */}
      <Route
        path="/admin/schedule"
        element={<Dashboard component={ScheduleManagement} />}
      />
      <Route
        path="/admin/user"
        element={<Dashboard component={UserManagement} />}
      />
      <Route
        path="/admin/add-new-room"
        element={<Dashboard component={AddNewRoom} />}
      />
      <Route
        path="/admin/update-room/:id"
        element={<Dashboard component={UpdateRoom} />}
      />
    </Routes>
  );
}

export default AllRoutes;
