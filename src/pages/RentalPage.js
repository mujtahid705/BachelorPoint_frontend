import PageCover from "../components/ui/PageCover";
import RentalCard from "../components/ui/RentalCard";
import styles from "./RentalPage.module.css";
import useGetAllPosts from "../hooks/useGetAllPosts";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { formatPostsData } from "../utils";
import { Input } from "antd";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RentalPage = () => {
  const [posts, setPosts] = useState([]);
  const [approveError, setApproveError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const getAllPosts = useGetAllPosts();

  const isLoading = useSelector((state) => state.app.isLoading);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.app.isLoggedin);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const getPosts = async () => {
    const data = await getAllPosts();

    if (data.error) {
      if (data.error === "Your account is not approved yet!") {
        setApproveError(true);
      }
      toast.error(data.error);
    } else {
      const fData = formatPostsData(data);
      setPosts(fData);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className={styles.container}>
        <PageCover
          title="Rentals"
          heading="Find all the Flats, Rooms available for rent!"
        />

        <div className={styles.filter}>
          <Input
            placeholder="Search by title or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
        </div>

        {approveError && (
          <p
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "1.2rem",
              marginTop: "50px",
            }}
          >
            Your account is not approved yet! Please wait for an admin to
            approve your account.
          </p>
        )}

        <div className={styles.posts}>
          {filteredPosts.map((post, index) => (
            <RentalCard
              key={index}
              id={post.id}
              image={post.images[0]}
              title={post.title}
              description={post.description}
              rent={post.rent}
              location={post.location}
              gender={post.gender}
            />
          ))}
        </div>

        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default RentalPage;
