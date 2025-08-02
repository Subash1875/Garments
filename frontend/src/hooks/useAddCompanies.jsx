import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/AuthHooks/useAuthContext";

export const useAddCompanies = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const addCompanies = async (info) => {
    setLoading(true);
    setMsg(null);
    setSuccessMsg(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/user/add-companies`,
        { info },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setSuccessMsg(response.data.msg);
      window.location.href = `/${user}/companies`;
    } catch (err) {
      setMsg(err.response?.data?.msg || "an error occured please try again");
    }
    setLoading(false);
  };
  return { loading, msg, addCompanies, successMsg };
};
