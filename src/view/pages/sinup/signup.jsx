import "./signup.scss";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input, DatePicker, Select } from "antd";

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
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
            name="email"
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
            name="password"
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
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Hãy nhập lại mật khẩu",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
            name="gender"
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
            name="phone"
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
            name="DatePicker"
            rules={[{ required: true, message: "Hãy chọn năm sinh" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="agreement"
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
      </div>
    </div>
  );
}

export default SignUp;
