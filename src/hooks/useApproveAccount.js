import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/appSlice";
import { baseUrl } from "../base_url";

const approve = async (id) => {
  const token = localStorage.getItem("bp-token");
  const response = await fetch(`${baseUrl}/users/approve/${id}`, {
    method: "get",
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

const useApproveAccount = () => {
  const dispatch = useDispatch();

  const approveAccount = async (id) => {
    dispatch(setIsLoading(true));

    try {
      const data = await approve(id);

      dispatch(setIsLoading(false));

      return data;
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      throw error;
    }
  };

  return approveAccount;
};

export default useApproveAccount;
