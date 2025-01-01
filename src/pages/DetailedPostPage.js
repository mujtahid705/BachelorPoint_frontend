import styles from "./DetailedPostPage.module.css";
import DisplayImage from "../components/detailed post/DisplayImage";
import DisplayInformation from "../components/detailed post/DisplayInformation";
import { useEffect, useState } from "react";
import { Modal, Button } from "antd";

import img1 from "../assets/apartment1.jpg";
import img2 from "../assets/apartment2.jpg";
import img3 from "../assets/apartment3.jpg";
import img4 from "../assets/apartment4.jpg";
import useGetPostById from "../hooks/useGetPostById";
import { formatPostsData } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetContact from "../hooks/useGetContact";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/ui/LoadingSpinner";

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
  const { id } = useParams();
  const isLoading = useSelector((state) => state.app.isLoading);
  const [postData, setPostData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState();

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.app.isLoggedin);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const getPost = useGetPostById();

  const postDataFetch = async (id) => {
    const data = await getPost(id);

    if (data.error) {
      console.log(data);
      return;
    }
    const fData = formatPostsData([data]);
    setPostData(...fData);
  };

  useEffect(() => {
    postDataFetch(id);
  }, []);

  const getContactInfo = useGetContact();
  const showModal = async (id) => {
    const data = await getContactInfo(id);
    if (data.error) {
      toast.error(data.error);
    } else {
      setContactInfo(data);
      console.log(data);
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      {!isLoading && postData.images && (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <DisplayImage img={postData.images} />
          </div>

          <DisplayInformation data={postData} onClick={showModal} />
        </div>
      )}

      {contactInfo && (
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
          <p>Name: {contactInfo.name}</p>
          <p>Phone: {contactInfo.studentId}</p>
          <p>Email: {contactInfo.email}</p>
        </Modal>
      )}
      {isLoading && (
        <div style={{ height: "100vh" }}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default DetailedPostPage;
