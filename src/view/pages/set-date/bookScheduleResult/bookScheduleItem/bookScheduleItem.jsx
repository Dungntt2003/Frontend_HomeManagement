import "./bookScheduleItem.scss";
import { formatDate } from "../../../../../components/formatDate";
import formatPhoneNumber from "../../../../../components/formatPhone";
import { Tooltip } from "antd";
function BookScheduleItem(props) {
  // console.log(props.item);
  return (
    <div className="book-item-wrap">
      <table className="book-item-container">
        <tr className="book-item-column">
          {/* <td className="book-item-number">{props.item.id}</td> */}
          <td className="book-item-name">{props.item.user_name}</td>
          <td className="book-item-room">{props.item.name}</td>
          <td className="book-item-phone">
            {formatPhoneNumber(props.item.phone)}
          </td>
          <td className="book-item-date">
            <Tooltip title={props.item.note}>
              {formatDate(props.item.date)}
              <sup>*</sup>
            </Tooltip>
            {/* <div className="book-item-note">{props.item.note}</div> */}
          </td>
          <td className="book-item-accept">
            {props.item.isaccept === true && (
              <div className="book-item-result book-item-accepted">
                <Tooltip title={props.item.result}>
                  Được chấp nhận <sup>*</sup>
                </Tooltip>

                {/* <div className="book-item-schedule"></div> */}
              </div>
            )}
            {props.item.isaccept === false && props.item.result != null && (
              <div className="book-item-result">
                <Tooltip title={props.item.result}>
                  Từ chối <sup>*</sup>
                </Tooltip>
              </div>
            )}
            {props.item.isaccept === false && props.item.result === null && (
              <div className="book-item-result">Chờ xác nhận</div>
            )}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default BookScheduleItem;
