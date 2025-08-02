import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDeleteBill } from "../hooks/useDeleteBill";
import numberToWords from "../hooks/useAmountToWords";

const BillDetails = () => {
  const { _id } = useParams();
  const [bill, setBill] = useState();
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { deleteBill, deleteLoading, deleteMsg } = useDeleteBill();

  const getBill = useCallback(async () => {
    setMsg(null);
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/bill/${_id}`,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      setBill(response.data.bill);
    } catch (err) {
      setMsg(err.response?.data?.msg || "an error occured. please try again");
    } finally {
      setLoading(false);
    }
  }, [_id]);

  useEffect(() => {
    getBill();
  }, [getBill]);

  const [popup, setPopup] = useState(false);

  const handleDeletePopup = () => {
    if (popup) {
      setPopup(false);
    } else {
      setPopup(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteBill(_id);
    setPopup(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="p-4">
        <p className="h6 my-3 text-danger">{msg}</p>
        <p className="h6 my-3 text-danger">{deleteMsg}</p>
        {bill && (
          <div className="w-100 my-4 d-flex justify-content-between no-print">
            <i
              className="fa fa-print print-icon rounded-circle"
              title="Print this bill"
              onClick={handlePrint}
            ></i>
            <i
              className="fas fa-trash bill-delete-icon rounded-circle"
              title="Delete this bill"
              onClick={handleDeletePopup}
            ></i>
          </div>
        )}
        {bill && (
          <div
            className={popup ? "bill-delete-popup" : "bill-delete-popup d-none"}
          >
            <div className="bill-delete-container border rounded bg-white shadow shadow-lg p-3 pt-4">
              <div className="h5">Delete</div>
              <p>Are you sure you want to delete this bill...?</p>
              <div className="mt-5 d-flex justify-content-around">
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <button
                  className="btn border mx-2 cancel-btn rounded-4 px-4"
                  onClick={handleDeletePopup}
                >
                  Cancel
                </button>
                <form>
                  <button
                    className="btn btn-danger rounded-4 px-4"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-center">
          {bill ? (
            <div>
              {/* bill container */}
              <div id="main-bill-container">
                <div id="bill-container" className="border p-2">
                  <div className="border-bottom">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>GST No : </strong>
                        <span>
                          {bill.userCredential && bill.userCredential.GstNo}
                        </span>
                        <br />
                        <strong>PAN No : </strong>
                        <span>
                          {bill.userCredential && bill.userCredential.PanNo}
                        </span>
                      </div>
                      <div>
                        <strong>Cell : </strong>
                        <span>
                          {bill.userCredential && bill.userCredential.PhoneNo}
                        </span>
                      </div>
                    </div>

                    <div className="text-center mt-2">
                      <div className="h3">
                        {bill.userCredential && bill.userCredential.CompanyName}
                      </div>
                      <p>
                        {bill.userCredential && bill.userCredential.Address}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between border-top border-bottom py-2">
                      <div>
                        <strong>Invoice No : </strong>
                        <span>{bill.invoiceNo}</span>
                      </div>
                      <div>
                        <strong>Invoice Date : </strong>
                        <span>{`${bill.createdAt.slice(
                          8,
                          10
                        )}-${bill.createdAt.slice(5, 7)}-${bill.createdAt.slice(
                          0,
                          4
                        )}`}</span>
                      </div>
                    </div>

                    <div className="py-2">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <strong>Name</strong>
                            </td>
                            <td>:</td>
                            <td>{bill.company.CompanyName}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Address</strong>
                            </td>
                            <td>:</td>
                            <td>{bill.company.Address}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>GSTIN</strong>
                            </td>
                            <td>:</td>
                            <td>{bill.company.GstNo}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Phone No</strong>
                            </td>
                            <td>:</td>
                            <td>{bill.company.PhoneNo}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="border-top border-bottom mt-3">
                      <table border={2} id="table">
                        <thead>
                          <tr>
                            <th className="table-border">Challan No</th>
                            <th className="table-border">
                              Product Description
                            </th>
                            <th className="table-border">HSN / SAC Code</th>
                            <th className="table-border">UOM</th>
                            <th className="table-border">QTY</th>
                            <th className="table-border">Rate / Each in Rs</th>
                            <th className="table-border">
                              Total Taxable Amount in Rs
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {bill.items.map((data, i) => (
                            <tr key={i}>
                              <td className="table-border">{data.no}</td>
                              <td className="table-border">{data.product}</td>
                              <td className="table-border">{data.HSN}</td>
                              <td className="table-border">{data.UOM}</td>
                              <td className="table-border">{data.qty}</td>
                              <td className="table-border text-end">
                                {data.RatePerEach}
                              </td>
                              <td className="table-border text-end">
                                {Math.floor(data.Total)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3 d-flex border">
                      <div className="w-50 d-flex flex-column">
                        <div className="p-2">
                          <strong>Amount in words : </strong>
                          <span>
                            {numberToWords(
                              bill.TotalTaxableAmount + bill.CGST + bill.SGST
                            )}{" "}
                            Rupees
                          </span>
                        </div>
                        <div className="p-2 border mt-auto">
                          <strong>Terms and conditions : </strong>
                          <br />
                          <span style={{ fontSize: "10px" }}>
                            Certified that all the particulars given above are
                            true & correct. The amounts indicated represents the
                            once actually.
                          </span>
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="border p-2 d-flex">
                          <strong>Total Taxable Amount : </strong>
                          <span className="ms-auto">
                            {bill.TotalTaxableAmount}
                          </span>
                        </div>
                        <div className="border p-2 d-flex">
                          <strong>SGST : </strong>
                          <span>2.5%</span>
                          <span className="ms-auto">{bill.SGST}</span>
                        </div>
                        <div className="border p-2 d-flex">
                          <strong>CGST : </strong>
                          <span>2.5%</span>
                          <span className="ms-auto">{bill.CGST}</span>
                        </div>
                        <div className="border p-2 d-flex">
                          <strong>Total GST : </strong>
                          <span className="ms-auto">
                            {bill.CGST + bill.SGST}
                          </span>
                        </div>
                        <div className="border p-2 d-flex">
                          <strong>Total Invoice Amount : </strong>
                          <span className="ms-auto">
                            {bill.TotalTaxableAmount + bill.CGST + bill.SGST}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex">
                      <div className="border" style={{ width: "17%" }}>
                        <div className="p-2 border h-100">
                          <strong>Declaration : </strong>
                          <br />
                          <span style={{ fontSize: "10px" }}>
                            Certified that all the particulars given above are
                            true & correct. The amounts indicated represents the
                            once actually.
                          </span>
                        </div>
                      </div>
                      <div
                        className="border d-flex flex-column align-items-center"
                        style={{ width: "33%" }}
                      >
                        <p className="h6">Bank Details</p>
                        <p className="h4 mt-2">
                          {bill.userCredential && bill.userCredential.BankName}
                        </p>
                        <p className="h6">
                          {bill.userCredential && bill.userCredential.Branch}
                        </p>
                        <div>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>IFSC Code</strong>
                                </td>
                                <td>:</td>
                                <td>
                                  {bill.userCredential &&
                                    bill.userCredential.IFSC_code}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>ACC No</strong>
                                </td>
                                <td>:</td>
                                <td>
                                  {bill.userCredential &&
                                    bill.userCredential.AccNo}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="w-50 border d-flex flex-column justify-content-center align-items-center">
                        <p className="h4">
                          For
                          <strong className="px-2">
                            {bill.userCredential &&
                              bill.userCredential.CompanyName}
                          </strong>
                        </p>
                        <p className="h4 pt-5">Authorised Signatory</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* bill container */}
            </div>
          ) : (
            <p>No bills found</p>
          )}
        </div>
      </div>

      {loading && <div id="loading"></div>}
      {deleteLoading && <div id="loading"></div>}
    </>
  );
};

export default BillDetails;
