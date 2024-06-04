import "./index.css";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input, Select, Space, Divider } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import announceApi from "../../../../../api/announceApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let index = 0;

const { TextArea } = Input;
function AddAnnouncement() {
  const [items, setItems] = useState(["Tiền điện", "Nghỉ lễ"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const onFinish = (values) => {
    const params = {
      title: values.title,
      content: values.content,
      tag: values.Tag,
    };
    const postAnnounce = async () => {
      try {
        const response = await announceApi.postAnnounce(params);
        console.log(response);
        toast.success("Thêm thông báo thành công", {
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
          navigate("/admin/announcement");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    postAnnounce();
  };

  return (
    <div className="add-announce-container">
      <div className="add-announce-heading">Thêm thông báo mới</div>
      <div className="add-announce-content">
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          className="add-announce-form"
          name="add-new-announcement"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Hãy nhập tiêu đề thông báo" }]}
          >
            <TextArea rows={1} placeholder="Nhập tiêu đề" />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: "Hãy nhập nội dung thông báo" }]}
          >
            <TextArea rows={5} placeholder=" Nhập nội dung" />
          </Form.Item>
          <Form.Item
            label="Nhãn"
            name="Tag"
            rules={[{ required: true, message: "Hãy chọn nhãn cho thông báo" }]}
          >
            <Select
              style={{
                width: 300,
              }}
              placeholder="Chọn nhãn"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    style={{
                      padding: "0 8px 4px",
                    }}
                  >
                    <Input
                      placeholder="Thêm nhãn"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button
                      type="text"
                      //   icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Thêm nhãn
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddAnnouncement;
