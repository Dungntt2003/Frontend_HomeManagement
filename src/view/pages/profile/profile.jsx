import "./profile.scss";
import React from "react";
import { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import "bootstrap/dist/css/bootstrap.css";
import formatDate from "../../../components/formatDate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Profile() {
  const [user, setUser] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const user_id = userInfo.id;

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userApi.getUserById(user_id);
        setUser(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user_id]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChangeImage = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {/* <PlusOutlined /> */}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải ảnh
      </div>
    </button>
  );
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(user);
    const params = {
      Name: user.name,
      Dob: user.dob,
      Gender: user.gender,
      University: user.university,
    };
    const updateAccount = async () => {
      try {
        const response = await userApi.updateUserById(user_id, params);
        console.log(response);
        toast.success("Cập nhập thông tin thành công", {
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
      } catch (err) {
        console.log(err);
      }
    };
    updateAccount();
  };
  return (
    <div className="profile-container">
      <div className="profile-wrap">
        <h2 className="profile-header">THÔNG TIN CÁ NHÂN</h2>
        <div className="profile-body">
          <div className="profile-ava">
            {/* <img src={AvatarDefault} alt="avatar" className="profile-img" /> */}
            <>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChangeImage}
                className="upload-ava"
              >
                {fileList.length > 0 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </>
            <p className="profile-avatar">Ảnh đại diện</p>
          </div>
          <div className="profile-information">
            <form className="profile-info" onSubmit={handleSubmit}>
              <div class="form-row">
                <div class="form-group">
                  <label for="inputEmail4">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    name="email"
                    value={user.email}
                    readOnly
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="inputName">Họ và tên</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="inputName"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputDob">Ngày sinh</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputDob"
                  name="dob"
                  value={formatDate(user.dob)}
                  onChange={handleChange}
                  placeholder="dob"
                  required
                />
              </div>

              <div class="form-group">
                <label for="inputGender">Giới tính</label>
                <select
                  id="inputGender"
                  class="form-control"
                  value={user.gender}
                  name="gender"
                  onChange={handleChange}
                  placeholder="Gender"
                  required
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div class="form-group">
                <label for="inputUniversity">Trường</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputUniversity"
                  placeholder="University"
                  defaultValue={user.university}
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Cập nhập thông tin
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
