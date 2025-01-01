import styles from "./ProfilePage.module.css";
import ProfileCover from "../components/ui/ProfileCover";
import RentalCardProfile from "../components/ui/RentalCardProfile";
import CustomButton from "../components/ui/CustomButton";
import { Link, useNavigate } from "react-router-dom";

import img from "../assets/cover2.jpg";
import img1 from "../assets/apartment1.jpg";
import img2 from "../assets/apartment2.jpg";
import img3 from "../assets/apartment3.jpg";
import img4 from "../assets/apartment4.jpg";
import cover from "../assets/cover2.jpg";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { imgBaseUrl } from "../base_url";
import useGetAllPosts from "../hooks/useGetAllPosts";
import { useEffect, useState } from "react";
import { formatPostsData } from "../utils";
import { Input } from "antd";
import useDeletePost from "../hooks/useDeletePost";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ProfilePage = () => {
  const [approveError, setApproveError] = useState(false);
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.app.user);
  const [searchQuery, setSearchQuery] = useState("");

  const isLoading = useSelector((state) => state.app.isLoading);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.app.isLoggedin);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // GET own posts
  const getAllPosts = useGetAllPosts();
  const getPosts = async () => {
    const data = await getAllPosts("self");

    if (data.error) {
      if (data.error === "Your account is not approved yet!") {
        setApproveError(true);
      }
      toast.error(data.error);
    } else {
      const fData = formatPostsData(data);
      setPosts(fData);
      console.log(fData);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Delete post
  const deletePost = useDeletePost();

  const deleteHandler = async (id) => {
    const res = await deletePost(id);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      {user && (
        <ProfileCover
          name={user.name}
          bio={
            user.bio ? user.bio : "Add a bio to your profile from edit profile!"
          }
          studentId={user.studentId}
          email={user.email}
          dp={user.dp ? `${imgBaseUrl}/${user.dp}` : dp}
          cover={cover}
        />
      )}

      <div className={styles.middleContainer}>
        <p className={styles.title}>Posts:</p>

        <Link className={styles.link} to="edit_profile">
          <CustomButton>Edit Profile</CustomButton>
        </Link>
      </div>

      <div className={styles.filter}>
        <Input
          placeholder="Search by title or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: "20px", width: "300px" }}
        />
      </div>

      {isLoading && <LoadingSpinner />}

      {posts.length === 0 && <p className={styles.noPost}>No posts to show!</p>}

      {approveError && (
        <p
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "1.2rem",
            marginTop: "50px",
          }}
        >
          Your account is not approved yet! Please wait for an admin to approve
          your account.
        </p>
      )}

      <div className={styles.posts}>
        {filteredPosts.map((post, index) => (
          <RentalCardProfile
            key={index}
            id={post.id}
            image={post.images[0]}
            title={post.title}
            description={post.description}
            price={post.rent}
            location={post.location}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
