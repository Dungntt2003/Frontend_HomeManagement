import "./set-date.scss";
import React from "react";
import { Button, Form, Input, DatePicker, Select } from "antd";
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
    console.log("Success:", e);
  };
  return (
    <div className="set-date-container">
      <div>
        <h2 className="set-date-header">Đăng ký thời gian xem phòng 306-B10</h2>
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
        </>
      </div>
    </div>
  );
}

export default SetDate;
