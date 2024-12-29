import { useDispatch } from "react-redux";
import { baseUrl } from "../base_url";
import { setIsLoading } from "../redux/appSlice";

const update = async (data) => {
  const token = localStorage.getItem("bp-token");
  const response = await fetch(`${baseUrl}/users/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errData = await response.json();
    return errData;
  }

  const userData = await response.json();
  return userData;
};

const useUpdateUser = () => {
  const dispatch = useDispatch();

  const updateUser = async (data) => {
    dispatch(setIsLoading(true));
    try {
      const userData = await update(data);

      dispatch(setIsLoading(false));

      return userData;
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      throw error;
    }
  };

  return updateUser;
};

export default useUpdateUser;
