import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "../pages/hompage";
import AdminInfo from "../pages/admin-info/admin-info";
import MainLayout from "../../components/layout/main-layout";
import HomeDetail from "../pages/home-detail/home-detail";
import SetDate from "../pages/set-date/set-date";
import Announce from "../pages/announce/announce";
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/homepage"} />} />
      <Route path="/homepage" element={<MainLayout component={HomePage} />} />
      <Route path="/about" element={<MainLayout component={AdminInfo} />} />
      <Route path="/home" element={<MainLayout component={HomeDetail} />} />
      <Route path="/set-date" element={<MainLayout component={SetDate} />} />
      <Route path="/announce" element={<MainLayout component={Announce} />} />
    </Routes>
  );
}

export default AllRoutes;
