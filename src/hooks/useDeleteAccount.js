import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/appSlice";
import { baseUrl } from "../base_url";

const deleteById = async (id) => {
  const token = localStorage.getItem("bp-token");
  const response = await fetch(`${baseUrl}/users/delete/${id}`, {
    method: "delete",
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
  console.log(data);
  return data;
};

const useDeleteAccount = () => {
  const dispatch = useDispatch();

  const deleteAccount = async (id) => {
    dispatch(setIsLoading(true));

    try {
      const data = await deleteById(id);

      dispatch(setIsLoading(false));

      return data;
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      throw error;
    }
  };

  return deleteAccount;
};

export default useDeleteAccount;
