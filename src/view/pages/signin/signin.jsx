import "./signin.scss";
import { Link } from "react-router-dom";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

function SignIn() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="login-container">
      <div className="login-wrap">
        <h2 className="login-header">Đăng nhập</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="Email"
            rules={[
              {
                required: true,
                message: "Hãy nhập email",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Nhớ tài khoản</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="/">
              Quên mật khẩu
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Đăng nhập
            </Button>
            hay <Link to="/signup">Đăng ký ngay</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
