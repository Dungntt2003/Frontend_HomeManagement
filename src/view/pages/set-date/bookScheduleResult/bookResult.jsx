import "./bookResult.scss";
import { useEffect, useState } from "react";
import BookScheduleItem from "./bookScheduleItem/bookScheduleItem";
import bookScheduleApi from "../../../../api/bookScheduleApi";

function BookScheduleResult() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const user_id = userInfo.id;
  const [bookSchedules, setBookSchedules] = useState([]);
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await bookScheduleApi.getBookSchedulesByUser(user_id);
        setBookSchedules(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSchedules();
  }, [user_id]);

  const listBookItems = bookSchedules.map((item, index) => (
    <BookScheduleItem item={item} />
  ));

  return (
    <div className="book-list-container">
      <h2 className="book-list-header">KẾT QUẢ ĐẶT LỊCH</h2>
      <div className="book-list-item">{listBookItems}</div>
    </div>
  );
}

export default BookScheduleResult;
