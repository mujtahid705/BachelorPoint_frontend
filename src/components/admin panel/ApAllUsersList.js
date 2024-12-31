import { useState } from "react";
import { Button, Input } from "antd";
import styles from "./ApAllUsersList.module.css";
import useBanUser from "../../hooks/useBanUser";
import toast, { Toaster } from "react-hot-toast";
import useMakeAdmin from "../../hooks/useMakeAdmin";

const DUMMY_USERS = [
  {
    studentId: "1",
    name: "John Doe",
    email: "john@example.com",
    gender: "Male",
  },
  {
    studentId: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    gender: "Female",
  },
  {
    studentId: "3",
    name: "Sam Brown",
    email: "sam@example.com",
    gender: "Male",
  },
];

const ApAllUsersList = ({ users, setReloadTrigger }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const approvedUsers = users.filter((user) => user.status === "approved");

  const filteredData = approvedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentId.toString().includes(searchQuery)
  );

  // Ban User
  const banUser = useBanUser();
  const banUserHandler = async (studentId) => {
    const data = await banUser(studentId);

    if (data.error) {
      toast.error(data.error.sqlMessage);
    } else {
      toast.success(data.message);
      setReloadTrigger((prev) => !prev);
    }
  };

  // Make Admin
  const makeAdmin = useMakeAdmin();
  const makeAdminHandler = async (studentId) => {
    const data = await makeAdmin(studentId);

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
        <h1>All Users</h1>

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
                <th>Type</th>
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
                  <td>{user.type}</td>
                  <td>
                    {user.type !== "admin" && (
                      <Button
                        type="primary"
                        onClick={() => makeAdminHandler(user.studentId)}
                      >
                        Make Admin
                      </Button>
                    )}
                    {"  "}
                    <Button
                      type="primary"
                      danger
                      onClick={() => banUserHandler(user.studentId)}
                    >
                      Ban User
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

export default ApAllUsersList;
