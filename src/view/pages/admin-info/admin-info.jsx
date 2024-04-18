import "./admin-info.scss";
import AdminImage from "../../../assets/images/admin-image.jpg";
import Svd from "../../../assets/images/sanvd.jpeg";
import nhash from "../../../assets/images/phongsh.jpg";
import ktx from "../../../assets/images/ktx.jpg";

function AdminInfo() {
  return (
    <div className="admin-info-container">
      <div className="admin-infor-wrap">
        <h2 className="admin-info-header">VỀ NHÀ TRỌ</h2>
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
          <div className="home-wrap">
            <div className="home-body">
              <h4 className="home-name">Nhà trọ Ốc sên</h4>
              <p className="home-detail-info">
                Thời gian hoạt đông: 2/2/2014 <br />
                Tổng số phòng: 80 phòng <br />
                Bao gồm các tòa nhà: B3, B9, B10 <br />
                Giá giao động: 1tr - 2tr/người <br />
                Điện: 2k/số <br />
                Nước: miễn phí <br />
                Quy định: Giữ trật tự, vệ sinh chung, giờ giới nghiêm là 23h.{" "}
                <br />
                Hiện trọ chứa 112 sinh viên đến các từ các trường đại học.
              </p>
            </div>
            <div className="home-img">
              <img src={ktx} alt="anh ktx" className="home-pic" />
            </div>
          </div>
        </div>
        <div className="home-about">
          <div className="home-svd">
            <div className="home-svd-pic">
              <img src={Svd} alt="san van dong" className="home-svd-img" />
            </div>
            <div className="home-svd-des">
              <h4 className="home-svd-header">Sân vận động</h4>
              <p className="home-svd-body">
                Sân vận động trong khu trọ dành cho sinh viên là một không gian
                thể thao đặc biệt, nơi bạn có thể thực hiện các hoạt động thể
                dục và giải trí. Với sân cỏ xanh mát, tiện ích như phòng thay đồ
                và khu vực nghỉ ngơi, sân vận động là nơi lý tưởng để rèn luyện
                sức khỏe và tạo ra những kỷ niệm đáng nhớ. Đồng thời, nó còn là
                nơi gặp gỡ và kết nối với cộng đồng sinh viên, tạo ra một môi
                trường thể thao năng động và sôi động. Hãy đến và trải nghiệm
                niềm vui thể thao tại sân vận động của chúng tôi! <br />
                Chú ý: sân vận động không cho thuê, chỉ dành cho sinh viên trong
                khu trọ và người trong ngõ nhỏ.
              </p>
            </div>
          </div>
          <div className="home-nhasv">
            <div className="home-nhasv-pic">
              <img src={nhash} alt="nha sinh hoat" className="home-nhasv-img" />
            </div>
            <div className="home-nhasv-des">
              <h4 className="home-nhasv-header">Nhà sinh hoạt chung</h4>
              <p className="home-nhasv-body">
                Nhà sinh hoạt trong khu trọ dành cho sinh viên là nơi tạo ra một
                môi trường sống và học tập thuận tiện. Với các tiện ích như
                phòng khách, khu vực làm việc nhóm, nhà bếp và phòng học, sinh
                viên có thể gặp gỡ bạn bè, thực hiện dự án nhóm và tận hưởng
                cuộc sống đại học tại đây. Ngoài ra, nhà sinh hoạt còn tổ chức
                các hoạt động và sự kiện chung, tạo cơ hội cho sinh viên giao
                lưu và phát triển mối quan hệ xã hội. Đây là không gian quan
                trọng trong việc hỗ trợ và tạo điều kiện cho sự phát triển toàn
                diện của sinh viên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminInfo;
