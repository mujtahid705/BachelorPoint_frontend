import { useDispatch } from "react-redux";
import { baseUrl } from "../base_url";
import { setIsLoading } from "../redux/appSlice";

const getPost = async (type) => {
  const token = localStorage.getItem("bp-token");

  // type => "all" (All posts) type => "self" (Own posts)
  const response = await fetch(`${baseUrl}/posts/${type}`, {
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

const useGetAllPosts = () => {
  const dispatch = useDispatch();

  const getAllPosts = async (type = "all") => {
    dispatch(setIsLoading(true));

    try {
      const data = await getPost(type);
      dispatch(setIsLoading(false));
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return getAllPosts;
};

export default useGetAllPosts;
