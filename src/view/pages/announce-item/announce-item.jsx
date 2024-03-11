import "./announce-item.scss";

function AnnounceItem() {
  return (
    <div className="ann-item-container">
      <div className="ann-item-time">
        <h4 className="ann-item-date">5/3/2024</h4>
      </div>
      <div className="ann-item-content">
        <h3 className="ann-item-header">V/v đóng tiền điện tháng 2/2024</h3>
        <div className="ann-item-body">
          Hiện nay đã có thông báo tiền điện trên web, yêu cầu các phòng đọc và
          nộp tiền trước <strong>10/3/2024</strong>. <br />
          Nếu đóng tiền điện muộn sẽ bị cắt điền. <br />
          Mọi ý kiến thắc mắc xin liên hệ với chủ nhà.
        </div>
      </div>
    </div>
  );
}

export default AnnounceItem;
