import PageCover from "../components/ui/PageCover";
import RentalCard from "../components/ui/RentalCard";
import styles from "./RentalPage.module.css";

import img from "../assets/cover2.jpg";
import img1 from "../assets/apartment1.jpg";
import img2 from "../assets/apartment2.jpg";
import img3 from "../assets/apartment3.jpg";
import img4 from "../assets/apartment4.jpg";

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

const RentalPage = () => {
  return (
    <>
      <div className={styles.container}>
        <PageCover
          title="Rentals"
          heading="Find all the Flats, Rooms available for rent!"
        />

        <div className={styles.posts}>
          {DUMMY_DATA.map((post, index) => (
            <RentalCard
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
    </>
  );
};

export default RentalPage;
