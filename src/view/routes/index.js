import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "../pages/hompage";
import AdminInfo from "../pages/admin-info/admin-info";
import MainLayout from "../../components/layout/main-layout";
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/homepage"} />} />
      <Route path="/homepage" element={<MainLayout component={HomePage} />} />
      <Route path="/about" element={<MainLayout component={AdminInfo} />} />
    </Routes>
  );
}

export default AllRoutes;
