import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const SingleCompany = () => {
  const { companyName, user } = useParams();
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState();

  const getCompany = useCallback(async () => {
    setMsg(null);
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/${user}/${companyName}`,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setCompany(response.data.singleCompany);
    } catch (err) {
      setMsg(err.response?.data?.msg || "an error occured. please try again");
    } finally {
      setLoading(false);
    }
  }, [companyName, user]);

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  const [page, setPage] = useState(1);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.clientHeight + 1 >
      document.documentElement.scrollTop
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [bills, setBills] = useState([]);

  const getBills = useCallback(async () => {
    setLoading(false);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/${user}/${companyName}/bills?page=${page}&billsPerPage=8`,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setBills((prev) => [...prev, ...response.data.bills]);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [companyName, user, page]);

  useEffect(() => {
    getBills();
  }, [getBills]);

  const BillsDom = () => {
    return bills.map((bill, i) => (
      <div
        className="bills d-flex align-items-center border-bottom px-3 my-2"
        key={i}
      >
        <a href={`/bill/${bill._id}`}>
          <div>
            <p className="h5 companyName">{bill.company.CompanyName}</p>
            <p className="py-2">{bill.createdAt.slice(0, 10)}</p>
          </div>
        </a>
        <span className="ms-auto">{bill.company.Address}</span>
      </div>
    ));
  };

  const [editPage, setEditPage] = useState(false);
  const [GstNo, setGstNo] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Address, setAddress] = useState("");

  useEffect(() => {
    if (company) {
      setGstNo(company.company.GstNo);
      setPhoneNo(company.company.PhoneNo);
      setAddress(company.company.Address);
    }
  }, [company]);

  const handleEditPage = () => {
    if (editPage) {
      setEditPage(false);
    } else {
      setEditPage(true);
    }
  };

  const data = {
    GstNo,
    PhoneNo,
    Address,
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/user/${company.company.CompanyName}/edit-companies`,
        { data },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setCompany(response.data.company);
    } catch (err) {
      setMsg(err.response?.data?.msg || "an error occured. please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-4">
        <p className="h6 text-danger">{msg}</p>
        <div>
          {company && (
            <div className="d-flex">
              <table>
                <tbody>
                  <tr>
                    <td className="h4">{company.company.CompanyName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>GST No</strong>
                    </td>
                    <td>:</td>
                    <td>
                      {editPage ? (
                        <input
                          type="text"
                          value={GstNo}
                          onChange={(e) => setGstNo(e.target.value)}
                        />
                      ) : (
                        company.company.GstNo
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Phone No</strong>
                    </td>
                    <td>:</td>
                    <td>
                      {editPage ? (
                        <input
                          type="text"
                          value={PhoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                        />
                      ) : (
                        company.company.PhoneNo
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Address</strong>
                    </td>
                    <td>:</td>
                    <td>
                      {editPage ? (
                        <textarea
                          value={Address}
                          onChange={(e) => setAddress(e.target.value)}
                          style={{ height: "100px", width: "400px" }}
                        ></textarea>
                      ) : (
                        company.company.Address
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="ms-auto p-4" onClick={handleEditPage}>
                {editPage ? (
                  <i
                    className="fas fa-floppy-disk"
                    onClick={handleEdit}
                    title="Save"
                  ></i>
                ) : (
                  <i className="fas fa-pencil" title="Edit"></i>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          className="d-flex flex-column mx-4 mt-5"
          style={{ paddingBottom: "50px" }}
        >
          {bills.length > 0 ? (
            BillsDom()
          ) : (
            <p className="h5">No bills found for this company</p>
          )}
        </div>
      </div>
      {loading && <div id="loading"></div>}
      {loading && (
        <div className="px-4" style={{ height: "20px" }}>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default SingleCompany;
