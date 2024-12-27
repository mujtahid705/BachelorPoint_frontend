import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/appSlice";

const getSelfData = async () => {
  const token = localStorage.getItem("bp-token");
  const response = await fetch("http://localhost:5000/api/users/self", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }

  const data = await response.json();
  return data;
};

const useInitialize = () => {
  const dispatch = useDispatch();

  const initialize = async () => {
    dispatch(setIsLoading(true));

    try {
      const data = await getSelfData();

      dispatch(setIsLoading(false));

      return data;
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      throw error;
    }
  };

  return initialize;
};

export default useInitialize;
