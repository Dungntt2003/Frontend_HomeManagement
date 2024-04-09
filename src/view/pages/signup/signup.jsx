import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Button, Checkbox, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";
import authApi from "../../../api/authApi";
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

function SignUp() {
  const navigate = useNavigate();
  const onFinish = (e) => {
    const selectedDate = e.DatePicker;
    const Dob = moment(selectedDate).format("YYYY-MM-DD");
    const postRequest = async () => {
      const values = {
        Email: e.Email,
        Password: e.Password,
        Name: e.Name,
        Dob: Dob,
        Gender: e.Gender,
        University: e.University,
      };
      try {
        const response = await authApi.register(values);
        console.log(response);
        toast.success("Đăng ký thành công", {
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
          navigate("/signin");
        }, 3000);
      } catch (e) {
        console.log(e);
        toast.error("Đăng ký thất bại", {
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
      }
    };
    postRequest();
  };

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
  return (
    <div className="register-container">
      <div className="register-wrap">
        <h2 className="register-header">Đăng ký tài khoản</h2>
        <Form
          {...formItemLayout}
          name="register"
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
            name="Email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ",
              },
              {
                required: true,
                message: "Hãy nhập email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            dependencies={["Password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Hãy nhập lại mật khẩu",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("Password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="Name"
            label="Họ và tên"
            tooltip="Tên bạn là gì?"
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
            name="Gender"
            label="Giới tính"
            rules={[
              {
                required: true,
                message: "Chọn giới tính",
              },
            ]}
          >
            <Select placeholder="Chọn giới tính">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
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
            name="University"
            label="Đại học"
            rules={[
              {
                required: true,
                message: "Nhập trường bạn đang học",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            label="Năm sinh"
            name="Dob"
            rules={[{ required: true, message: "Hãy chọn năm sinh" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="Agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("cần chấp nhận")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              Tôi đã đọc <Link to="/">thỏa thuận</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
            hay <Link to="/signin">Đăng nhập ngay</Link>
          </Form.Item>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp;
