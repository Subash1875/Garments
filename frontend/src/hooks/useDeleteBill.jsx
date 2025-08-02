import axios from "axios";
import { useState } from "react";

export const useDeleteBill = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(null);
  const deleteBill = async (_id) => {
    setDeleteLoading(true);
    setDeleteMsg(null);
    try {
      await axios.get(`${process.env.REACT_APP_API}/bill/delete/${_id}`, {
        headers: { authorization: localStorage.getItem("token") },
      });
      window.location.href = "/";
    } catch (err) {
      setDeleteMsg(
        err.response?.data?.msg || "an error occured. please try again"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return { deleteBill, deleteLoading, deleteMsg };
};
