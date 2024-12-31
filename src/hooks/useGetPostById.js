import { useDispatch } from "react-redux";
import { baseUrl } from "../base_url";
import { setIsLoading } from "../redux/appSlice";

const getPostById = async (id) => {
  const token = localStorage.getItem("bp-token");

  const response = await fetch(`${baseUrl}/posts/${id}`, {
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

const useGetPostById = () => {
  const dispatch = useDispatch();

  const getPost = async (id) => {
    dispatch(setIsLoading(true));

    try {
      const data = await getPostById(id);
      dispatch(setIsLoading(false));
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return getPost;
};

export default useGetPostById;
