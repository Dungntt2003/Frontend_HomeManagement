function Logout() {
  localStorage.removeItem("user");
  return (
    <div>
      <h1>Bạn đăng xuất thành công</h1>
    </div>
  );
}

export default Logout;
