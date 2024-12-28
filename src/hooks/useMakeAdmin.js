import { useDispatch } from "react-redux";
import { baseUrl } from "../base_url";
import { setIsLoading } from "../redux/appSlice";

const adminRequest = async (id) => {
  const token = localStorage.getItem("bp-token");
  const response = await fetch(`${baseUrl}/users/makeAdmin/${id}`, {
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

const useMakeAdmin = () => {
  const dispatch = useDispatch();

  const makeAdmin = async (id) => {
    dispatch(setIsLoading(true));

    try {
      const data = await adminRequest(id);

      dispatch(setIsLoading(false));

      return data;
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      throw error;
    }
  };

  return makeAdmin;
};

export default useMakeAdmin;
