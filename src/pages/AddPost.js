import styles from "./AddPost.module.css";
import { Button, Form, Input, Upload, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomButton from "../components/ui/CustomButton";
import usePostRental from "../hooks/usePostRental";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;

const AddPost = () => {
  const navigate = useNavigate();
  const [flatImg, setFlatImg] = useState([]);
  const [imgError, setImgError] = useState("");
  const [gender, setGender] = useState(null);

  const isLoading = useSelector((state) => state.app.isLoading);

  const postRental = usePostRental();

  const onFinish = async (values) => {
    if (flatImg.length === 0) {
      setImgError(true);
    } else {
      setImgError(false);
      const data = {
        ...values,
        rent: parseInt(values.rent),
        images: flatImg,
        gender,
      };
      console.log("Success:", data);

      const res = await postRental(data);
      console.log(res);
      if (res.error) {
        toast.error(res.error.sqlMessage);
      } else {
        toast.success(res.message);
        setTimeout(() => {
          navigate("/rentals");
        }, 2000);
      }
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

  const onGenderChange = (value) => {
    setGender(value);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Add Post</p>

        {isLoading && <LoadingSpinner />}

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
              name="gender"
              label="Looking for (Gender)"
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
              label="Rent (BDT)"
              name="rent"
              rules={[
                {
                  required: true,
                  message: "Please enter the rent!",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Rent must be a number!",
                },
              ]}
            >
              <Input maxLength={8} />
            </Form.Item>

            <Form.Item
              label="Address"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please enter the address!",
                },
              ]}
            >
              <Input />
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
                <CustomButton>Upload</CustomButton>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddPost;
