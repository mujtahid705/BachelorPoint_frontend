import { useDispatch } from "react-redux";
import { baseUrl } from "../base_url";
import { setIsLoading } from "../redux/appSlice";

const getContact = async (id) => {
  const token = localStorage.getItem("bp-token");

  const response = await fetch(`${baseUrl}/users/contact/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response.json();
    return errData;
  }

  const data = await response.json();
  return data;
};

const useGetContact = () => {
  const dispatch = useDispatch();

  const getContactInfo = async (id) => {
    dispatch(setIsLoading(true));

    try {
      const data = await getContact(id);
      dispatch(setIsLoading(false));
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return getContactInfo;
};

export default useGetContact;
