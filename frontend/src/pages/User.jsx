import { useParams } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const User = () => {
  const { user } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserData = useCallback(async () => {
    setLoading(true);
    setMsg(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/${user}`, {
        headers: { authorization: localStorage.getItem("token") },
      });
      setUserDetail(response.data.userDetail);
    } catch (err) {
      setMsg(err.response?.data?.msg || "an error occured. please try again");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      <div className="m-4">
        <p className="text-danger">{msg}</p>
        {userDetail && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <span className="h3 user-border-style">
                  {userDetail.user} credentials
                </span>
                <table className="h5 mt-4">
                  <tr>
                    <td>
                      <strong>Company Name</strong>
                    </td>
                    <td>:</td>
                    <td>{userDetail.CompanyName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Phone No</strong>
                    </td>
                    <td>:</td>
                    <td>{userDetail.PhoneNo}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>GST No</strong>
                    </td>
                    <td>:</td>
                    <td>{userDetail.GstNo}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PAN No</strong>
                    </td>
                    <td>:</td>
                    <td>{userDetail.PanNo}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Address</strong>
                    </td>
                    <td>:</td>
                    <td>{userDetail.Address}</td>
                  </tr>
                  <th className="pt-5">Bank Details</th>
                  <tr>
                    <td>
                      <strong>Name</strong>
                    </td>
                    <td>:</td>
                    <td>{userDetail.BankName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Branch</strong>
                    </td>
                    <td>:</td>
                    <td>{userDetail.Branch}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ACC No</strong>
                    </td>
                    <td>:</td>
                    <td>{userDetail.AccNo}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>IFSC Code</strong>
                    </td>
                    <td>:</td>
                    <td>{userDetail.IFSC_code}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        )}
        {!userDetail && (
          <p className="h5">Add credentials to help with your bills</p>
        )}
      </div>
      {loading && <div id="loading"></div>}
    </>
  );
};

export default User;
