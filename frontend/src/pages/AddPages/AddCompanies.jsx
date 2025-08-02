import { useState } from "react";
import { useAddCompanies } from "../../hooks/useAddCompanies";

const AddCompanies = () => {
  const [CompanyName, setCompanyName] = useState("");
  const [GstNo, setGstNo] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Address, setAddress] = useState("");
  const info = { CompanyName, GstNo, PhoneNo, Address };

  const { loading, msg, addCompanies, successMsg } = useAddCompanies();

  const handleForm = async (e) => {
    e.preventDefault();
    addCompanies([info]);
    setCompanyName("");
    setGstNo("");
    setPhoneNo("");
    setAddress("");
  };

  return (
    <>
      <div className="mx-4 mt-4">
        <p className="h3">Add Companies</p>
        <p className="h6 text-danger">{msg && msg}</p>
        <p className="h6 text-success">{successMsg && successMsg}</p>
        <form onSubmit={handleForm}>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control"
              id="CompanyName"
              placeholder="Company Name"
              required
              value={CompanyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <label htmlFor="CompanyName">Company Name</label>
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control"
              id="GstNo"
              placeholder="GST No"
              value={GstNo}
              onChange={(e) => setGstNo(e.target.value)}
            />
            <label htmlFor="GstNo">GST No</label>
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control"
              id="PhoneNo"
              placeholder="Phone No"
              value={PhoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <label htmlFor="PhoneNo">Phone No</label>
          </div>
          <div className="form-floating">
            <textarea
              type="text"
              className="form-control"
              id="Address"
              placeholder="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ height: "150px" }}
            ></textarea>
            <label htmlFor="Address">Address</label>
          </div>
          <button className="btn btn-primary my-3" disabled={loading}>
            {loading ? "Adding..." : "Add Company"}
          </button>
        </form>
      </div>
      {loading && <div id="loading"></div>}
    </>
  );
};

export default AddCompanies;
