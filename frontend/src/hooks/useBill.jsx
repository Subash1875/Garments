import axios from "axios";
import { useState } from "react";

export const useBill = () => {
  const [loading, setloading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [companyMsg, setCompanyMsg] = useState(null);

  const bill = async (items, company, invoiceNo) => {
    setMsg(null);
    setloading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/bill/new-bill`,
        { items, company, invoiceNo },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      window.location.href = "/";
    } catch (err) {
      setMsg(err.response?.data?.msg || "an error occured. please try again");
    } finally {
      setloading(false);
    }
  };

  const [company, setCompany] = useState();

  const getCompanies = async (companyName) => {
    setloading(true);
    setCompanyMsg(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/bill/companyDetails`,
        { companyName },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setCompany(response.data.company);
    } catch (err) {
      setCompanyMsg(err.response?.data?.msg || "No companies found");
    } finally {
      setloading(false);
    }
  };

  return {
    bill,
    loading,
    msg,
    companyMsg,
    getCompanies,
    company,
  };
};
