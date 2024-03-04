import "./admin-info.scss";
import AdminImage from "../../../assets/images/admin-image.jpg";

function AdminInfo() {
  return (
    <div className="admin-info-container">
      <div className="admin-infor-wrap">
        <h2 className="admin-info-header">ABOUT</h2>
        <div className="admin-info-mission">
          <h3 className="mission-name">Mục tiêu</h3>
          <p className="mission-content">
            Mục tiêu của chúng tôi khi cho thuê nhà hướng đến sinh viên là tạo
            ra một môi trường sống thuận tiện, an toàn và hỗ trợ cho họ trong
            suốt thời gian học tập. Chúng tôi muốn cung cấp những căn phòng chất
            lượng, tiện nghi và tạo nên một cộng đồng sinh viên mạnh mẽ và hỗ
            trợ.
          </p>
        </div>
        <div className="admin-info-homer">
          <div className="homer-wrap">
            <div className="homer-pic">
              <img src={AdminImage} alt="anh admin" className="homer-img" />
            </div>
            <div className="homer-content">
              <h4 className="homer-name">Nguyễn Ngọc Nhi</h4>
              <p className="homer-detail-info">
                17/10/1990 <br />
                số 7 ngõ Kim Ngưu, Hoàng Mai, Hà Nội <br />
                0398128929
              </p>
              <p className="homer-detail-advice">
                Tôi đã cho thuê được 10 năm. Với mong muốn cung cấp phòng thuận
                lợi, giá cả hợp lý cho sinh viên. Thật hạnh phúc khi nhìn thấy
                các em sinh viên được sống và học tập trong 1 môi trường tốt.
              </p>
            </div>
          </div>
        </div>
        <div className="admin-info-home">
          <h4 className="home-name">Nhà trọ Ốc sên</h4>
          <p className="home-detail-info">
            Thời gian hoạt đông: 2/2/2014 <br />
            Tổng số phòng: 50 phòng <br />
            Giá giao động: 1tr - 2tr/người <br />
            Điện: 2k/số <br />
            Nước: miến phí <br />
            Quy định: Giữ trật tự, vệ sinh chung, giờ giới nghiêm là 23h. <br />
            Hiện trọ chứa 112 sinh viên đến các từ các trường đại học.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminInfo;
