import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Switch, Upload } from "antd";
import "./index.scss";
import homeApi from "../../../../../api/homeApi";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateRoom() {
  const [fileList, setFileList] = useState([]);
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const navigate = useNavigate();
  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
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

  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await homeApi.getAHome(id);
        setRoom(response.data[0]);
        const listImages = response.data[0].images.map((item, index) => {
          return {
            uid: index,
            name: item,
            status: "done",
            url: `http://localhost:8000/images/${item}`,
          };
        });
        setFileList(listImages);
      } catch (e) {
        console.log(e);
      }
    };
    getRoom();
  }, [id]);
  const handleFinish = (value) => {
    const params = {
      numberPeople: value.number_people,
      maxPeople: value.max_people,
      launch: value.launch === undefined ? false : true,
      refrigerator: value.refrigerator === undefined ? false : true,
      aekon: value.air_conditioning === undefined ? false : true,
      square: parseInt(value.square, 10),
      price: value.price,
      toilet: value.toilet,
      bathroom: value.bathroom,
    };
    const updateRoom = async () => {
      try {
        const response = await homeApi.updateHome(id, params);
        console.log(response);
        toast.success("Cập nhập thành công", {
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
    updateRoom();
  };
  return (
    <div>
      <div className="update-room-container">
        <h2 className="update-room-header">
          Cập nhập thông tin phòng {room.Name}
        </h2>
        <div className="update-room-content">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              minWidth: 700,
            }}
            onFinish={handleFinish}
          >
            <Form.Item label="Số người hiện tại:">
              <Form.Item name="number_people" noStyle>
                <InputNumber
                  min={0}
                  max={room["Max people"]}
                  value={room["Number people"]}
                />
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
            <Form.Item label="Số người tối đa">
              <Form.Item name="max_people" noStyle>
                <InputNumber min={1} max={6} value={room["Max people"]} />
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
                <InputNumber min={1} max={200} value={room.Square} />
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
                <Input style={{ width: "200px" }} value={room.Price} />
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
                <InputNumber min={1} value={room.bathroom} />
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
                <InputNumber min={1} value={room.toilet} />
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
              <Switch value={room.Launch} />
            </Form.Item>
            <Form.Item
              label="Tủ lạnh"
              valuePropName="checked"
              name="refrigerator"
            >
              <Switch value={room.Refrigerator} />
            </Form.Item>
            <Form.Item
              label="Điều hòa"
              valuePropName="checked"
              name="air_conditioning"
            >
              <Switch value={room.Aekon} />
            </Form.Item>
            <Form.Item label="Tải ảnh">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
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
                Cập nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UpdateRoom;
