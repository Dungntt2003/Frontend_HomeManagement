import "./set-date.scss";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, DatePicker, Select } from "antd";
import bookScheduleApi from "../../../api/bookScheduleApi";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function SetDate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const onFinish = (e) => {
    const selectedDate = e.Time;
    const date = moment(selectedDate).format("YYYY-MM-DD");
    const params = {
      user_id: userInfo.id,
      name: id,
      date: date,
      user_name: e.Name,
      phone: e.Phone,
      note: e.Note,
    };

    const postASchedule = async () => {
      try {
        const res = await bookScheduleApi.createBookSchedule(params);
        console.log(res);
        toast.success("Đăng ký lịch thành công", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
        setTimeout(() => {
          navigate(`/bookSchedule/result`);
        }, 3000);
      } catch (error) {
        console.log(error);
        toast.error("Đăng ký thất bại, vui lòng thử lại", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };
    postASchedule();
  };
  return (
    <div className="set-date-container">
      <div>
        <h2 className="set-date-header">Đăng ký thời gian xem phòng {id}</h2>
        <>
          <Form
            {...formItemLayout}
            name="bookSchedule"
            onFinish={onFinish}
            initialValues={{
              prefix: "86",
            }}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >
            <Form.Item
              name="Name"
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên bạn",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="Phone"
              label="SDT"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập số điện thoại",
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Đặt lịch"
              name="Time"
              rules={[{ required: true, message: "Hãy đặt lịch xem phòng" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="Note"
              label="Ghi chú"
              tooltip="Bạn nên ghi lại thời gian có thể đến xem phòng ngoài lịch đăng ký ở trên"
              rules={[
                {
                  // required: true,
                  message: "Nhập nguyện vọng, lưu ý nếu có",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={800} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Đặt lịch
              </Button>
            </Form.Item>
          </Form>
          <ToastContainer />
        </>
      </div>
    </div>
  );
}

export default SetDate;
