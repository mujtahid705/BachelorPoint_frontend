import { useDispatch } from "react-redux";
import { baseUrl } from "../base_url";
import { setIsLoading } from "../redux/appSlice";

const delPost = async (id) => {
  const token = localStorage.getItem("bp-token");

  const response = await fetch(`${baseUrl}/posts/${id}`, {
    method: "DELETE",
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

const useDeletePost = () => {
  const dispatch = useDispatch();

  const deletePost = async (id) => {
    dispatch(setIsLoading(true));

    try {
      const data = await delPost(id);
      dispatch(setIsLoading(false));
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return deletePost;
};

export default useDeletePost;
