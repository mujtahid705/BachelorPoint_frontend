import styles from "./LoginPage.module.css";
import logo from "../assets/logo2.png";
import { Button, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const RegisterPage = () => {
  const [bracuIdImg, setBracuIdImg] = useState("");
  const [imgError, setImgError] = useState("");

  const onFinish = (values) => {
    if (bracuIdImg.length === 0) {
      setImgError(true);
      console.log("YES");
    } else {
      setImgError(false);
      const data = { ...values, idImg: bracuIdImg };
      console.log("Success:", data);
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

  const addBackgroundHandler = (info) => {
    if (info.fileList.length === 0) return;
    const file = info.file.originFileObj || info.file;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBracuIdImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundRemove = () => {
    setBracuIdImg("");
  };

  return (
    <>
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
                label="BracU Student ID"
                name="student_id"
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
                  onChange={addBackgroundHandler}
                  onRemove={handleBackgroundRemove}
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
