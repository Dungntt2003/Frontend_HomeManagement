import "./signin.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import authApi from "../../../api/authApi";

function SignIn() {
  const getName = (name) => {
    const nameParts = name.split("@");
    const result = nameParts[0];
    return result;
  };
  const navigate = useNavigate();
  const [alert, setAlert] = useState("null");
  const onFinish = (values) => {
    const sendPostRequest = async () => {
      try {
        const response = await authApi.login(values);

        const userInfo = {
          email: values.Email,
          name: getName(values.Email),
          id: response.data.id,
          isHost: response.data.isHost,
          isRenter: response.data.isRenter,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        setAlert("true");
        setTimeout(() => {
          if (!response.data.isHost) navigate("/homepage");
          else navigate("/admin/schedule");
        }, 3000);
      } catch (e) {
        console.log(e);
        setAlert("false");
      }
    };
    sendPostRequest();
  };
  return (
    <div className="login-container">
      <div className="login-wrap">
        {alert === "true" && (
          <Alert
            message="Đăng nhập thành công"
            closable
            type="success"
            showIcon
          />
        )}
        {alert === "false" && (
          <Alert message="Sai mật khẩu" closable type="error" showIcon />
        )}
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
            name="Password"
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
