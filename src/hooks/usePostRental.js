import { useDispatch } from "react-redux";
import { baseUrl } from "../base_url";
import { setIsLoading } from "../redux/appSlice";

const postRent = async (data) => {
  const token = localStorage.getItem("bp-token");
  const response = await fetch(`${baseUrl}/posts/add`, {
    method: "POST",
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

  const resData = await response.json();
  console.log(resData);
  return resData;
};

const usePostRental = () => {
  const dispatch = useDispatch();

  const postRental = async (postData) => {
    dispatch(setIsLoading(true));

    try {
      const data = await postRent(postData);

      dispatch(setIsLoading(false));

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return postRental;
};

export default usePostRental;
