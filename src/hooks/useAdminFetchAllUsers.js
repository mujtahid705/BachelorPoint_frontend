import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/appSlice";
import { baseUrl } from "../base_url";

const fetchUsers = async () => {
  const token = localStorage.getItem("bp-token");
  const response = await fetch(`${baseUrl}/users/`, {
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

const useAdminFetchAllUsers = () => {
  const dispatch = useDispatch();

  const fetchAllUsers = async () => {
    dispatch(setIsLoading(true));

    try {
      const data = await fetchUsers();

      dispatch(setIsLoading(false));

      return data;
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      throw error;
    }
  };

  return fetchAllUsers;
};

export default useAdminFetchAllUsers;
