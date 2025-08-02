import { useEffect, useState } from "react";
import { useBill } from "../../hooks/useBill";
import axios from "axios";

const AddBill = () => {
  const { loading, msg, bill, company, companyMsg, getCompanies } = useBill();

  const [companyName, setCompanyName] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceErr, setInvoiceErr] = useState("");
  const [companyErr, setCompanyErr] = useState("");
  const [firstLoading, setFirstLoading] = useState(false);

  useEffect(() => {
    if (company) {
      setGstNo(company.company.GstNo);
      setPhoneNo(company.company.PhoneNo);
      setAddress(company.company.Address);
    }
  }, [company]);

  // State for items array
  const [items, setItems] = useState([]);

  // State for individual item
  const [challanNo, setChallanNo] = useState("");
  const [product, setProduct] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [uom, setUom] = useState("");
  const [qty, setQty] = useState("");
  const [rateEach, setRateEach] = useState("");

  const total = qty * rateEach;

  const addItem = () => {
    const newItem = {
      no: challanNo,
      product,
      HSN: hsnCode,
      UOM: uom,
      qty,
      RatePerEach: rateEach,
      Total: total,
    };

    setItems([...items, newItem]);
    clearItemForm();
  };

  const clearItemForm = () => {
    setChallanNo("");
    setProduct("");
    setHsnCode("");
    setUom("");
    setQty("");
    setRateEach("");
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const company = {
      CompanyName: companyName,
      GstNo: gstNo,
      PhoneNo: phoneNo,
      Address: address,
    };
    await bill(items, company, invoiceNo);
    setCompanyName("");
    setGstNo("");
    setPhoneNo("");
    setAddress("");
    setItems([]);
  };

  const companyDom = () => {
    return companies.map((company, i) => (
      <option value={company} key={i}></option>
    ));
  };

  const handleCompanyDetails = (e) => {
    e.preventDefault();
    setGstNo("");
    setPhoneNo("");
    setAddress("");
    getCompanies(companyName);
  };

  const [companies, setCompanies] = useState([]);

  const handleGetCompanies = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/bill/getCompanies`,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setCompanies(response.data.companies.map((c) => c.CompanyName));
    } catch (err) {
      setCompanyErr(
        err.response?.data?.msg || "an error occured. please try again"
      );
    }
  };

  useEffect(() => {
    handleGetCompanies();
  }, []);

  const handleItemsDelete = (e) => {
    e.target.parentElement.remove();
  };

  const getInvoice = async () => {
    setFirstLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/bill/invoiceno`,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setInvoiceNo(response.data.invoiceNo);
    } catch (err) {
      setInvoiceErr(err.response?.data?.msg);
    } finally {
      setFirstLoading(false);
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <>
      <div className="m-4">
        <p className="h4 my-4">Add bills...</p>
        <form>
          {/* InvoiceNo */}

          <div className="form-floating my-4">
            <input
              className="form-control"
              id="invoiceNo"
              placeholder="Invoice No"
              type="number"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
            <label htmlFor="invoiceNo">Invoice No</label>
          </div>

          <p className="text-danger h6">{invoiceErr}</p>
          <p className="text-danger h6">{companyErr}</p>

          {/* InvoiceNo */}

          {/* CompanyDetails */}
          <p className="h5">Company Details</p>
          <div className="form-floating my-3">
            <input
              list="companyList"
              type="text"
              className="form-control"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
            />
            <label htmlFor="companyName">Company Name</label>
            <datalist id="companyList">
              {companies.length > 0 ? (
                companyDom()
              ) : (
                <p className="text-danger h6 my-3">No Companies Found...</p>
              )}
            </datalist>
          </div>
          <button className="btn btn-secondary" onClick={handleCompanyDetails}>
            Get Company Details
          </button>
          <p className="h6 text-danger">{companyMsg}</p>
          <div className="d-flex justify-content-between">
            <div className="form-floating my-3" style={{ width: "45%" }}>
              <input
                type="text"
                className="form-control"
                id="GstNo"
                placeholder=""
                value={gstNo}
                onChange={(e) => setGstNo(e.target.value)}
              />
              <label htmlFor="GstNo">GST No</label>
            </div>
            <div className="form-floating my-3" style={{ width: "45%" }}>
              <input
                type="text"
                className="form-control"
                id="phoneNo"
                placeholder=""
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <label htmlFor="phoneNo">Phone No</label>
            </div>
          </div>
          <div className="form-floating my-3">
            <textarea
              id="address"
              className="form-control"
              placeholder=""
              style={{ height: "150px" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <label htmlFor="address">Address</label>
          </div>
          {/* CompanyDetails */}
          {/* Bill items */}
          <div>
            <p className="h5 my-3">Bill Items</p>
            <div className="d-flex justify-content-between">
              <div className="form-floating my-3 w-25">
                <input
                  type="Number"
                  className="form-control"
                  id="challanNo"
                  placeholder=""
                  value={challanNo}
                  onChange={(e) => setChallanNo(e.target.value)}
                />
                <label htmlFor="challanNo">Challan No</label>
              </div>
              <div className="form-floating my-3" style={{ width: "73%" }}>
                <input
                  type="text"
                  className="form-control"
                  id="product"
                  placeholder=""
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
                <label htmlFor="product">Product Description</label>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="w-25 form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="hsn"
                  placeholder=""
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                />
                <label htmlFor="hsn">HSN Code</label>
              </div>
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="uom"
                  placeholder=""
                  list="uomList"
                  value={uom}
                  onChange={(e) => setUom(e.target.value)}
                />
                <label htmlFor="uom">UOM</label>
                <datalist id="uomList">
                  <option value="DAZ"></option>
                  <option value="BOX"></option>
                  <option value="PCS"></option>
                </datalist>
              </div>
              <div className="form-floating my-3">
                <input
                  type="number"
                  className="form-control"
                  id="qty"
                  placeholder=""
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                <label htmlFor="qty">QTY</label>
              </div>
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="ratePerEach"
                  placeholder=""
                  value={rateEach}
                  onChange={(e) => setRateEach(e.target.value)}
                />
                <label htmlFor="ratePerEach">Rate/Each in Rs</label>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary my-3"
              onClick={addItem}
            >
              Add Item
            </button>
          </div>

          {/* Display added items */}
          <div>
            <p className="h5 my-3">Added Items</p>
            {items.length > 0 ? (
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    <strong>Challan No</strong> : {item.no} ,
                    <strong>Product</strong> : {item.product} ,
                    <strong>HSN Code</strong> : {item.HSN} ,<strong>UOM</strong>
                    : {item.UOM} ,<strong>Quantity</strong>: {item.qty} ,
                    <strong>Rate Per Each</strong> :{item.RatePerEach} ,
                    <strong>Total</strong> : {item.Total}
                    <i
                      className="fas fa-trash px-3"
                      onClick={handleItemsDelete}
                    ></i>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items added yet</p>
            )}
          </div>

          {/* Bill items */}
          <p className="h6 text-danger">{msg}</p>
          <button
            type="submit"
            className="btn btn-primary my-3"
            onClick={handleForm}
          >
            Add Bill
          </button>
        </form>
      </div>
      {loading && <div id="loading"></div>}
      {firstLoading && <div id="loading"></div>}
    </>
  );
};

export default AddBill;
