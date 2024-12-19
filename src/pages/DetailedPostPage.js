import styles from "./DetailedPostPage.module.css";
import DisplayImage from "../components/detailed post/DisplayImage";
import DisplayInformation from "../components/detailed post/DisplayInformation";
import { useState } from "react";
import { Modal, Button } from "antd";

import img1 from "../assets/apartment1.jpg";
import img2 from "../assets/apartment2.jpg";
import img3 from "../assets/apartment3.jpg";
import img4 from "../assets/apartment4.jpg";

const DUMMY_DATA = {
  id: 1,
  title: "Two Bedroom Apartment",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut felis vitae augue commodo condimentum id quis nunc. Nam mattis ipsum eu augue dictum ullamcorper. In hac habitasse platea dictumst. In hac habitasse platea dictumst. Nunc vel ultrices ligula, ac ultricies quam. Nunc consequat mi nec aliquet porttitor. Phasellus luctus commodo mattis. Donec commodo quam imperdiet ex elementum, sit amet dapibus nisi semper. Curabitur pretium eget felis sed rutrum. Proin ultricies dignissim neque.",
  gender: "Female",
  rent: 21000,
  available_from: "January",
  flatImg: [img1, img2, img3, img4],
  personal_info: {
    name: "Sumaita Shanin",
    email: "sumaita.shanin@g.bracu.ac.bd",
    bracuId: "24241356",
    phone: "+8801973108826",
  },
};

const DetailedPostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <DisplayImage img={DUMMY_DATA.flatImg} />
        </div>

        <DisplayInformation data={DUMMY_DATA} onClick={showModal} />
      </div>

      <Modal
        title="Contact Information"
        open={isModalOpen}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>,
        ]}
      >
        {/* After Checking if the gender of the user matches with the criteria */}
        <p>Name: {DUMMY_DATA.personal_info.name}</p>
        <p>Email: {DUMMY_DATA.personal_info.email}</p>
        <p>Phone: {DUMMY_DATA.personal_info.phone}</p>
      </Modal>
    </>
  );
};

export default DetailedPostPage;
