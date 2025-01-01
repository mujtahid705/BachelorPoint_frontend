import styles from "./AddPost.module.css";
import { Button, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CustomButton from "../components/ui/CustomButton";
import useUpdateUser from "../hooks/useUpdateUser";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTriggerReload } from "../redux/appSlice";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dp, setDp] = useState("");
  const [imgError, setImgError] = useState("");

  const isLoading = useSelector((state) => state.app.isLoading);

  const isLoggedIn = useSelector((state) => state.app.isLoggedin);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const updateUser = useUpdateUser();
  const onFinish = async (values) => {
    if (dp.length === 0) {
      setImgError(true);
    } else {
      setImgError(false);
      const data = { ...values, dp };
      console.log("Success:", data);
      const res = await updateUser(data);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
        dispatch(setTriggerReload());
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
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
      <div>
        <Toaster />
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Edit Profile</p>

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
