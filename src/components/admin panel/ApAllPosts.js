import { useState } from "react";
import { Button, Input } from "antd";
import styles from "./ApAllUsersList.module.css";

import img from "../../assets/cover2.jpg";
import img1 from "../../assets/apartment1.jpg";
import img2 from "../../assets/apartment2.jpg";
import img3 from "../../assets/apartment3.jpg";
import img4 from "../../assets/apartment4.jpg";

const DUMMY_DATA = [
  {
    id: 0,
    image: img,
    title: "Three Bed Apartment",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    rent: "40,000 Taka",
    location: "Road 8, Gulshan, Dhaka",
  },
  {
    id: 1,
    image: img1,
    title: "Fully Furnished Apartment",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    rent: "65,000 Taka",
    location: "Road 11, Banani, Dhaka",
  },
  {
    id: 2,
    image: img2,
    title: "Two Bed Apartment",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    rent: "25,000 Taka",
    location: "Sector 11, Uttara, Dhaka",
  },
  {
    id: 3,
    image: img3,
    title: "One Bedroom for Rent",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    rent: "9,500 Taka",
    location: "Merul Badda, Dhaka",
  },
  {
    id: 4,
    image: img4,
    title: "One Seat in a Bedroom for Rent",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    rent: "5,000 Taka",
    location: "Merul Badda, Dhaka",
  },
];

const ApAllPostsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = DUMMY_DATA.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.id.toString().includes(searchQuery)
  );

  return (
    <div className={styles.container}>
      <h1>All Posts</h1>

      <Input
        placeholder="Search by title or ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />

      <div className={styles.postsContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Rent</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={styles.image}
                  />
                </td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{post.rent}</td>
                <td>{post.location}</td>
                <td>
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

export default ApAllPostsList;
