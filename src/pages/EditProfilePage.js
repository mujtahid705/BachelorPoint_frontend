import styles from "./AddPost.module.css";
import { Button, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomButton from "../components/ui/CustomButton";

const EditProfilePage = () => {
  const [dp, setDp] = useState("");
  const [imgError, setImgError] = useState("");

  const onFinish = (values) => {
    if (dp.length === 0) {
      setImgError(true);
    } else {
      setImgError(false);
      const data = { ...values, dp };
      console.log("Success:", data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    if (dp.length === 0) {
      setImgError(true);
    } else {
      setImgError(false);
    }
  };

  const addDpHandler = (info) => {
    if (info.fileList.length === 0) return;
    const file = info.file.originFileObj || info.file;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDp(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDpRemove = () => {
    setDp("");
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>Edit Profile</p>
        <div className={styles.formContainer}>
          <Form
            name="basic"
            className={styles.form}
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
              label="Bio"
              name="bio"
              rules={[
                {
                  required: true,
                  message: "Please enter your bio!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Profile Picture"
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
                onChange={addDpHandler}
                onRemove={handleDpRemove}
                beforeUpload={() => false}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
            {imgError && (
              <p className={styles.errorMsg}>
                Please upload your Profile Picture!
              </p>
            )}

            <Form.Item label={null}>
              <Button type="none" htmlType="submit">
                <CustomButton>Update</CustomButton>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
