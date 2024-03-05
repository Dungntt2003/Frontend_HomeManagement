import "./set-date.scss";
import React from "react";
import { DatePicker, Form, Input, Button } from "antd";

function SetDate() {
  const { TextArea } = Input;
  return (
    <div className="set-date-container">
      <div>
        <h2 className="set-date-header">Đăng ký thời gian xem phòng 306-B10</h2>
        <>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item label="Họ và tên ">
              <Input />
            </Form.Item>
            <Form.Item label="Ngày sinh ">
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại ">
              <Input />
            </Form.Item>
            <Form.Item label="Chọn ngày ">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Nguyện vọng ">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      </div>
    </div>
  );
}

export default SetDate;
