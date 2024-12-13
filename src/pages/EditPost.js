import styles from "./AddPost.module.css";
import { Button, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomButton from "../components/ui/CustomButton";

const { TextArea } = Input;

const EditPost = () => {
  const [flatImg, setFlatImg] = useState([]);
  const [imgError, setImgError] = useState("");

  const onFinish = (values) => {
    if (flatImg.length === 0) {
      setImgError(true);
    } else {
      setImgError(false);
      const data = { ...values, flatImg: flatImg };
      console.log("Success:", data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    if (flatImg.length === 0) {
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
        setFlatImg((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundRemove = (file) => {
    setFlatImg((prev) => {
      const newFileList = prev.filter((img) => img !== file.thumbUrl);
      return newFileList;
    });
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>Edit Post</p>

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
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter post title!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter post description!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Available From (Month)"
              name="available_from"
              rules={[
                {
                  required: true,
                  message: "Please enter when it is available!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Rent (BDT)"
              name="rent"
              rules={[
                {
                  required: true,
                  message: "Please enter the rent!",
                },
              ]}
            >
              <Input maxLength={8} />
            </Form.Item>

            <Form.Item
              label="Add Images"
              valuePropName="file"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Upload
                listType="picture-card"
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
                    message: "Please upload your Images!",
                  },
                ]}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
            {imgError && <p className={styles.errorMsg}>Please add images!</p>}

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

export default EditPost;
