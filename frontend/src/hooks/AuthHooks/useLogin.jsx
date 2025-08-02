import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (name, password) => {
    setLoading(true);
    setMsg(null);
    if (!name || !password) {
      setMsg("Username and password both are mandatory");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/user/login`, {
        name,
        password,
      });
      localStorage.setItem("user", response.data.user);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "LOGIN", payload: response.data.user });
      window.location.href = "/";
    } catch (err) {
      setMsg(err.response?.data?.msg || "an error occured. Please try again");
    }
    setLoading(false);
  };
  return { msg, loading, login };
};
