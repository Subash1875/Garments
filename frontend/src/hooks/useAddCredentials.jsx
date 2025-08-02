import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/AuthHooks/useAuthContext";

export const useAddCredentials = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const addCredentials = async (data) => {
    setLoading(true);
    setMsg(null);
    setSuccessMsg(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/user/add-credentials`,
        { data },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setSuccessMsg(response.data.msg);
      window.location.href = `/${user}`;
    } catch (err) {
      setMsg(err.response?.data?.msg || "an error occured please try again");
    }
    setLoading(false);
  };
  return { loading, msg, addCredentials, successMsg };
};
