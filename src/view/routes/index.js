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
import TestImages from "../pages/test-images";
function AllRoutes() {
  const user = localStorage.getItem("user");
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
        path="/bookSchedule/:id/result"
        element={<HeaderOnly component={BookScheduleResult} />}
      />
      <Route path="/announce" element={<MainLayout component={Announce} />} />
      <Route path="/testImages" element={<TestImages />} />
    </Routes>
  );
}

export default AllRoutes;
