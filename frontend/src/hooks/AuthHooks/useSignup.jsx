import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (name, password, password2) => {
    setLoading(true);
    setMsg(null);
    if (!name || !password || !password2) {
      setMsg("Username and password both are mandatory");
      setLoading(false);
      return;
    }
    if (password !== password2) {
      setMsg("Password did'nt match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/user/signup`,
        {
          name,
          password,
        }
      );
      localStorage.setItem("user", response.data.user);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "LOGIN", payload: response.data.user });
      window.location.href = "/";
    } catch (err) {
      setMsg(err.response?.data?.msg || "an error occured. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return { msg, loading, signup };
};
