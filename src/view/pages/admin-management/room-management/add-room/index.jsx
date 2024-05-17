import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Switch, Upload } from "antd";
import "./index.scss";
import homeApi from "../../../../../api/homeApi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddNewRoom() {
  const [id, setId] = useState("");
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const formData = new FormData();
    formData.append("id", id);
    newFileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("successful");
    } catch (error) {
      console.error(error);
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleFinish = (value) => {
    const params = {
      Name: value.room_id,
      numberPeople: 0,
      maxPeople: value.max_people,
      launch: value.launch === undefined ? false : true,
      refrigerator: value.refrigerator === undefined ? false : true,
      aekon: value.air_conditioning === undefined ? false : true,
      square: parseInt(value.square, 10),
      price: value.price,
      toilet: value.toilet,
      bathroom: value.bathroom,
    };
    const createNewRoom = async () => {
      try {
        const response = await homeApi.postHome(params);
        console.log(response);
        toast.success("Tạo phòng mới thành công", {
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
          navigate("/admin/room");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    createNewRoom();
  };
  const handleChangeInput = (e) => {
    setId(e.target.value);
  };
  return (
    <div className="add-new-container">
      <h2 className="add-new-header">Thêm phòng mới</h2>
      <div className="add-new-content">
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            minWidth: 650,
          }}
          onFinish={handleFinish}
        >
          <Form.Item label="Tên phòng" name="room_id">
            <Input value={id} onChange={handleChangeInput} />
          </Form.Item>
          <Form.Item label="Số người tối đa">
            <Form.Item name="max_people" noStyle>
              <InputNumber min={1} max={6} />
            </Form.Item>
            <span
              className="ant-form-text"
              style={{
                marginLeft: 8,
              }}
            >
              người
            </span>
          </Form.Item>
          <Form.Item label="Diện tích">
            <Form.Item name="square" noStyle>
              <InputNumber min={1} max={200} />
            </Form.Item>
            <span
              className="ant-form-text"
              style={{
                marginLeft: 8,
              }}
            >
              mét vuông
            </span>
          </Form.Item>
          <Form.Item label="Giá phòng">
            <Form.Item name="price" noStyle>
              <Input style={{ width: "200px" }} />
            </Form.Item>
            <span
              className="ant-form-text"
              style={{
                marginLeft: 8,
              }}
            >
              VND
            </span>
          </Form.Item>
          <Form.Item label="Phòng tắm">
            <Form.Item name="bathroom" noStyle>
              <InputNumber min={1} />
            </Form.Item>
            <span
              className="ant-form-text"
              style={{
                marginLeft: 8,
              }}
            >
              phòng
            </span>
          </Form.Item>
          <Form.Item label="WC">
            <Form.Item name="toilet" noStyle>
              <InputNumber min={1} />
            </Form.Item>
            <span
              className="ant-form-text"
              style={{
                marginLeft: 8,
              }}
            >
              phòng
            </span>
          </Form.Item>
          <Form.Item label="Máy giặt" valuePropName="checked" name="launch">
            <Switch />
          </Form.Item>
          <Form.Item
            label="Tủ lạnh"
            valuePropName="checked"
            name="refrigerator"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Điều hòa"
            valuePropName="checked"
            name="air_conditioning"
          >
            <Switch />
          </Form.Item>
          <Form.Item label="Tải ảnh">
            {/* <ImgCrop rotationSlider> */}
            <Upload
              // action="http://localhost:8000/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && "+ Upload"}
            </Upload>
            {/* </ImgCrop> */}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ marginLeft: "20px" }}
            >
              Thêm phòng mới
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddNewRoom;
