import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/appSlice";
import { useState } from "react";

const register = async (userData) => {
  const response = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { error: errorData.error || "An error occurred!" };
  }

  const data = await response.json();
  return data;
};

const useAuthRegister = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const registerUser = async (userData) => {
    dispatch(setIsLoading(true));
    setError(false);

    try {
      const data = await register(userData);

      if (data.error) {
        setError(true);
        dispatch(setIsLoading(false));
        return data;
      }
      dispatch(setIsLoading(false));
      setError(false);

      return data;
    } catch (error) {
      console.error(error);
      setError(true);
      dispatch(setIsLoading(false));
      throw error;
    }
  };

  return { error, registerUser };
};

export default useAuthRegister;
