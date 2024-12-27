import { useState } from "react";

const loginUser = async (credentials) => {
  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    return { error: "Invalid credentials" };
  }

  const data = await response.json();
  return data;
};

const useAuthLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    setError(false);

    try {
      const data = await loginUser(credentials);

      setLoading(false);
      setError(false);

      return data;
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, login };
};

export default useAuthLogin;
