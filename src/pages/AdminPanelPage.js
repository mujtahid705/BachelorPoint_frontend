import styles from "./AdminPanelPage.module.css";
import { useEffect, useState } from "react";
import { Segmented } from "antd";
import ApAllUsersList from "../components/admin panel/ApAllUsersList";
import ApAllPostsList from "../components/admin panel/ApAllPosts";
import ApAccountApprove from "../components/admin panel/ApAccountApprovals";
import useAdminFetchAllUsers from "../hooks/useAdminFetchAllUsers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState("All Users");
  const [users, setUsers] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.app.isLoggedin);

  if (!isLoggedin) navigate("/login");

  const fetchAllUsers = useAdminFetchAllUsers();

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await fetchAllUsers();

      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    };
    if (activeTab === "All Users" || activeTab === "Pending Account Approvals")
      getAllUsers();
  }, [activeTab, reloadTrigger]);

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

      {activeTab === "All Users" && (
        <ApAllUsersList users={users} setReloadTrigger={setReloadTrigger} />
      )}
      {activeTab === "All Posts" && <ApAllPostsList />}
      {activeTab === "Pending Account Approvals" && (
        <ApAccountApprove users={users} setReloadTrigger={setReloadTrigger} />
      )}
    </div>
  );
};

export default AdminPanelPage;
