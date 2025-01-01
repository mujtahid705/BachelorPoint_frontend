import styles from "./AddPost.module.css";
import { Button, Form, Input, Upload, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CustomButton from "../components/ui/CustomButton";
import useGetPostById from "../hooks/useGetPostById";
import { formatDisplayImgs, formatPostsData } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import useEditPost from "../hooks/useEditPost";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useSelector } from "react-redux";
import { imgBaseUrl } from "../base_url";

const { TextArea } = Input;
const { Option } = Select;

const EditPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const [flatImg, setFlatImg] = useState([]);
  const [displayImg, setDisplayImg] = useState([]);
  const [imgError, setImgError] = useState("");
  const [gender, setGender] = useState(null);

  const isLoading = useSelector((state) => state.app.isLoading);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const editPost = useEditPost();
  const onFinish = async (values) => {
    if (flatImg.length === 0 || !gender) {
      setImgError(true);
    } else {
      setImgError(false);
      const data = { ...values, images: flatImg, gender };
      console.log("Success:", data);

      const resData = await editPost(id, data);
      console.log(resData);

      if (resData.error) {
        toast.error(resData.error.sqlMessage);
      } else {
        toast.success(resData.message);
        setTimeout(() => {
          navigate("/profile");
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

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFlatImg((prev) => [...prev, reader.result]);
        setDisplayImg((prev) => [...prev, { url: reader.result }]);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("File is not of type Blob:", file);
    }
  };

  const handleBackgroundRemove = (file) => {
    setDisplayImg((prev) => {
      return prev.filter((img) => img.url !== file.url);
    });
  };

  const onGenderChange = (value) => {
    setGender(value);
  };

  const getPost = useGetPostById();
  const postDataFetch = async (id) => {
    const data = await getPost(id);

    if (data.error) {
      console.log(data);
      return;
    }
    const fData = formatPostsData([data]);
    setPostData(...fData);
    form.setFieldsValue({
      title: fData[0].title,
      description: fData[0].description,
      available_from: fData[0].available_from,
      rent: fData[0].rent,
    });
    setFlatImg(fData[0].images || []);
    const fImgs = formatDisplayImgs(fData[0].images);
    setDisplayImg(fImgs);
    setGender(fData[0].gender || null);
  };

  useEffect(() => {
    postDataFetch(id);
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Edit Post</p>

        {isLoading && <LoadingSpinner />}

        <div className={styles.formContainer}>
          <Form
            name="basic"
            form={form}
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
            initialValues={postData}
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
                value={gender}
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
                fileList={displayImg}
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
