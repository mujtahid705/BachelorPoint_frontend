import { useDispatch } from "react-redux";
import { baseUrl } from "../base_url";
import { setIsLoading } from "../redux/appSlice";

const edit = async (id, data) => {
  const token = localStorage.getItem("bp-token");

  const response = await fetch(`${baseUrl}/posts/update/${id}`, {
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

  const resData = await response.json();
  return resData;
};

const useEditPost = () => {
  const dispatch = useDispatch();

  const editPost = async (id, data) => {
    dispatch(setIsLoading(true));
    try {
      const resData = await edit(id, data);
      dispatch(setIsLoading(false));
      return resData;
    } catch (err) {
      console.log(err);
    }
  };

  return editPost;
};

export default useEditPost;
