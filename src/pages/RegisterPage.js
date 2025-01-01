import styles from "./LoginPage.module.css";
import logo from "../assets/logo2.png";
import { Button, Form, Input, Upload, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import useAuthRegister from "../hooks/useAuthRegister";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Option } = Select;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { error, registerUser } = useAuthRegister();
  const [gender, setGender] = useState("");
  const [bracuIdImg, setBracuIdImg] = useState("");
  const [imgError, setImgError] = useState("");

  const isLoggedIn = useSelector((state) => state.app.isLoggedin);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/rentals");
    }
  }, [isLoggedIn]);

  const onFinish = async (values) => {
    if (bracuIdImg.length === 0) {
      setImgError(true);
    } else {
      setImgError(false);
      const data = { ...values, gender, idCard: bracuIdImg };
      console.log("Success:", data);

      // Call the registerUser function from useAuthRegister
      const resData = await registerUser(data);
      console.log(resData, "RES DATA");
      console.log(error, "ERROR");

      if (error || resData.error) {
        toast.error(resData.error);
      } else {
        toast.success(resData.message);
      }
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    if (bracuIdImg.length === 0) {
      setImgError(true);
    } else {
      setImgError(false);
    }
  };

  const addIDHandler = (info) => {
    if (info.fileList.length === 0) return;
    console.log(info.fileList);
    const file = info.file.originFileObj || info.file;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBracuIdImg(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(file);
      setBracuIdImg(file);
    }
  };

  const handleIDRemove = () => {
    setBracuIdImg("");
  };

  const onGenderChange = (value) => {
    setGender(value);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={logo} alt="logo" />
        </div>

        <div className={styles.formContainerReg}>
          <div className={styles.form}>
            <p className={styles.title}>Register</p>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Gsuit Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select gender"
                  onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="BracU Student ID"
                name="studentId"
                rules={[
                  {
                    required: true,
                    pattern: /^\d{8}$/,
                    message: "Please enter your student id!",
                  },
                ]}
              >
                <Input maxLength={8} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="BracU Id Card Image"
                valuePropName="file"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  onChange={addIDHandler}
                  onRemove={handleIDRemove}
                  beforeUpload={() => false}
                  showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: true,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
              </Form.Item>
              {imgError && (
                <p className={styles.errorMsg}>
                  Please upload your BracU ID Card!
                </p>
              )}

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
