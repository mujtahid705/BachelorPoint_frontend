import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import styles from "./ApAllUsersList.module.css";
import { imgBaseUrl } from "../../base_url";
import useApproveAccount from "../../hooks/useApproveAccount";
import toast, { Toaster } from "react-hot-toast";
import useDeleteAccount from "../../hooks/useDeleteAccount";

const ApAccountApprove = ({ users, setReloadTrigger }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const notApprovedUsers = users.filter(
    (user) => user.status === "not approved"
  );

  const filteredData = notApprovedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentId.toString().includes(searchQuery)
  );

  // Approving accounts
  const approveAccount = useApproveAccount();
  const approveUserHandler = async (id) => {
    const data = await approveAccount(id);

    if (data.error) {
      toast.error(data.error.sqlMessage);
    } else {
      toast.success(data.message);
      setReloadTrigger((prev) => !prev);
    }
  };

  // Deleting accounts
  const deleteAccount = useDeleteAccount();
  const deleteAccountHandler = async (id) => {
    const data = await deleteAccount(id);

    if (data.error) {
      toast.error(data.error.sqlMessage);
    } else {
      toast.success(data.message);
      setReloadTrigger((prev) => !prev);
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className={styles.container}>
        <h1>Pending Account Approvals</h1>

        <Input
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: "20px", width: "300px" }}
        />

        <div className={styles.usersContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>ID Card Picture</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user.studentId}>
                  <td>{user.studentId}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <img
                      className={styles.idImg}
                      src={`${imgBaseUrl}/${user.idCard}`}
                      alt="id_card"
                    />
                  </td>
                  <td>
                    <Button
                      type="primary"
                      onClick={() => approveUserHandler(user.studentId)}
                    >
                      Approve
                    </Button>
                    {"  "}
                    <Button
                      type="primary"
                      danger
                      onClick={() => deleteAccountHandler(user.studentId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApAccountApprove;
