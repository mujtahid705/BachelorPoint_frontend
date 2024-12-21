import styles from "./AdminPanelPage.module.css";
import { useState } from "react";
import { Segmented } from "antd";
import ApAllUsersList from "../components/admin panel/ApAllUsersList";
import ApAllPostsList from "../components/admin panel/ApAllPosts";
import ApAccountApprove from "../components/admin panel/ApAccountApprovals";

const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState("All Users");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Panel</h1>

      <div className={styles.tabs}>
        <Segmented
          options={["All Users", "All Posts", "Pending Account Approvals"]}
          onChange={(value) => {
            setActiveTab(value);
          }}
        />
      </div>

      {activeTab === "All Users" && <ApAllUsersList />}
      {activeTab === "All Posts" && <ApAllPostsList />}
      {activeTab === "Pending Account Approvals" && <ApAccountApprove />}
    </div>
  );
};

export default AdminPanelPage;
