import styles from "./ProfilePage.module.css";
import ProfileCover from "../components/ui/ProfileCover";
import RentalCardProfile from "../components/ui/RentalCardProfile";
import CustomButton from "../components/ui/CustomButton";
import { Link } from "react-router-dom";

import img from "../assets/cover2.jpg";
import img1 from "../assets/apartment1.jpg";
import img2 from "../assets/apartment2.jpg";
import img3 from "../assets/apartment3.jpg";
import img4 from "../assets/apartment4.jpg";
import cover from "../assets/cover2.jpg";
import dp from "../assets/dp1.jpg";
import { useSelector } from "react-redux";

// const USER = {
//   name: "Muhammad Mujtahid",
//   bio: "This is a awesome bio!!",
//   studentId: "+8801973108826",
//   email: "muhammad.mujtahid@g.bracu.ac.bd",
//   dp: dp,
// };

const DUMMY_DATA = [
  {
    id: 0,
    image: img,
    title: "Three Bed Apartment",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    price: "40,000 Taka",
    location: "Road 8, Gulshan, Dhaka",
  },
  {
    id: 1,
    image: img1,
    title: "Fully Furnished Apartment",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    price: "65,000 Taka",
    location: "Road 11, Banani, Dhaka",
  },
  {
    id: 2,
    image: img2,
    title: "Two Bed Apartment",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    price: "25,000 Taka",
    location: "Sector 11, Uttara, Dhaka",
  },
  {
    id: 3,
    image: img3,
    title: "One Bedroom for Rent",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    price: "9,500 Taka",
    location: "Merul Badda, Dhaka",
  },
  {
    id: 4,
    image: img4,
    title: "One Seat in a Bedroom for Rent",
    description: "Its a fully furnished two bed apartment. Size: 1500sqft",
    price: "5,000 Taka",
    location: "Merul Badda, Dhaka",
  },
];

const ProfilePage = () => {
  const user = useSelector((state) => state.app.user);
  return (
    <div>
      {user && (
        <ProfileCover
          name={user.name}
          bio={
            user.bio ? user.bio : "Add a bio to your profile from edit profile!"
          }
          studentId={user.studentId}
          email={user.email}
          dp={user.dp ? user.dp : dp}
          cover={cover}
        />
      )}

      <div className={styles.middleContainer}>
        <p className={styles.title}>Posts:</p>

        <Link className={styles.link} to="edit_profile">
          <CustomButton>Edit Profile</CustomButton>
        </Link>
      </div>

      <div className={styles.posts}>
        {DUMMY_DATA.map((post, index) => (
          <RentalCardProfile
            key={index}
            id={post.id}
            image={post.image}
            title={post.title}
            description={post.description}
            price={post.price}
            location={post.location}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
