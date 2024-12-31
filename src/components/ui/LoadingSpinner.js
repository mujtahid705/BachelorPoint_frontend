import { Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Spin size="large" />
      </div>
    </>
  );
};

export default LoadingSpinner;
