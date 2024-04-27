import "./bookResult.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";

function BookScheduleResult() {
  return (
    <div>
      <h2 className="book-result">
        Hiện đang chờ kết quả từ chủ trọ, bạn vui lòng quay lại sau để xem kết
        quả
      </h2>
      <h4 className="book-result-thank">
        Trân trọng và cảm ơn
        {/* <FontAwesomeIcon icon={faFaceLaugh} className="book-result-icon" /> */}
      </h4>
    </div>
  );
}

export default BookScheduleResult;
