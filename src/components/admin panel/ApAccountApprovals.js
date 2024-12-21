import { useState } from "react";
import { Button, Input } from "antd";
import styles from "./ApAllUsersList.module.css";

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

const ApAccountApprove = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = DUMMY_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentId.includes(searchQuery)
  );

  return (
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
                  <Button type="primary">Approve</Button>
                  {"  "}
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApAccountApprove;
