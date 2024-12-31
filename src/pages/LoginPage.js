import styles from "./LoginPage.module.css";
import logo from "../assets/logo2.png";
import { Button, Form, Input } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAuthLogin from "../hooks/useAuthLogin";
import { setIsLoggedin } from "../redux/appSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, login } = useAuthLogin();

  const onFinish = async (values) => {
    const data = await login(values);

    if (error || data.error) {
      toast.error(data.error.sqlMessage);
    } else if (data && data.token) {
      toast.success(data.message);
      localStorage.setItem("bp-token", data.token);
      dispatch(setIsLoggedin(true));

      setTimeout(() => {
        navigate("/rentals");
      }, 3000);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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

        <div className={styles.formContainer}>
          <div className={styles.form}>
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
                label="BracU Student ID"
                name="studentId"
                rules={[
                  {
                    required: true,
                    message: "Please enter your student id!",
                  },
                ]}
              >
                <Input />
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

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
