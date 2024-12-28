import { useDispatch } from "react-redux";
import { baseUrl } from "../base_url";
import { setIsLoading } from "../redux/appSlice";

const banById = async (id) => {
  const token = localStorage.getItem("bp-token");
  const response = await fetch(`${baseUrl}/users/ban/${id}`, {
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

const useBanUser = () => {
  const dispatch = useDispatch();

  const banUser = async (id) => {
    dispatch(setIsLoading(true));

    try {
      const data = await banById(id);

      dispatch(setIsLoading(false));

      return data;
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      throw error;
    }
  };

  return banUser;
};

export default useBanUser;
