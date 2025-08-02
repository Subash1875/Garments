import { useState, useEffect } from "react";
import { useAddCredentials } from "../../hooks/useAddCredentials";

const AddCredentials = () => {
  const [CompanyName, setCompanyName] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [GstNo, setGstNo] = useState("");
  const [PanNo, setPanNo] = useState("");
  const [Address, setAddress] = useState("");
  const [BankName, setBankName] = useState("");
  const [Branch, setBranch] = useState("");
  const [IFSC_code, setIFSC_code] = useState("");
  const [AccNo, setAccNo] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const { msg, loading, addCredentials, successMsg } = useAddCredentials();

  const data = {
    CompanyName,
    PhoneNo,
    GstNo,
    PanNo,
    Address,
    BankName,
    Branch,
    IFSC_code,
    AccNo,
  };

  const handleForm = async (e) => {
    e.preventDefault();
    await addCredentials(data);
    setCompanyName("");
    setPhoneNo("");
    setGstNo("");
    setPanNo("");
    setAddress("");
    setBankName("");
    setBranch("");
    setAccNo("");
    setIFSC_code("");
  };

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        CompanyName ||
        PhoneNo ||
        GstNo ||
        PanNo ||
        Address ||
        BankName ||
        Branch ||
        IFSC_code ||
        AccNo
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [
    CompanyName,
    PhoneNo,
    GstNo,
    PanNo,
    Address,
    BankName,
    Branch,
    IFSC_code,
    AccNo,
  ]);

  return (
    <>
      <div className="mx-4 my-5">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center justify-content-md-start">
            <div className="col-12">
              <p className="h3">Add Credentials</p>
              <form className="mt-4" onSubmit={handleForm}>
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                    id="companyName"
                    value={CompanyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <label htmlFor="companyName">Company Name</label>
                </div>
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone No"
                    id="phoneNo"
                    value={PhoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                  <label htmlFor="phoneNo">Phone No</label>
                </div>
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="GST No"
                    id="gstNo"
                    value={GstNo}
                    onChange={(e) => setGstNo(e.target.value)}
                  />
                  <label htmlFor="gstNo">GST No</label>
                </div>
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="PAN No"
                    id="panNo"
                    value={PanNo}
                    onChange={(e) => setPanNo(e.target.value)}
                  />
                  <label htmlFor="panNo">PAN No</label>
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control credentials"
                    style={{ height: "150px" }}
                    placeholder="Address"
                    id="address"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                  <label htmlFor="address">Address</label>
                </div>
                <div>
                  <p className="h5">Bank Details</p>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="credentials form-control"
                      placeholder="Bank Name"
                      id="bankName"
                      value={BankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <label htmlFor="bankName">Bank Name</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="credentials form-control"
                      placeholder="Bank Branch"
                      id="bankBranch"
                      value={Branch}
                      onChange={(e) => setBranch(e.target.value)}
                    />
                    <label htmlFor="bankBranch">Bank Branch</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="credentials form-control"
                      placeholder="IFSC Code"
                      id="IFSC_code"
                      value={IFSC_code}
                      onChange={(e) => setIFSC_code(e.target.value)}
                    />
                    <label htmlFor="IFSC_code">IFSC Code</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="credentials form-control"
                      placeholder="ACC No"
                      id="ACCno"
                      value={AccNo}
                      onChange={(e) => setAccNo(e.target.value)}
                    />
                    <label htmlFor="ACCno">ACC No</label>
                  </div>
                </div>
                <div className="my-4">
                  <p className="text-danger">{msg}</p>
                  <p className="text-success">{successMsg}</p>
                  <button className="btn btn-primary" disabled={!isFormValid}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {loading && <div id="loading"></div>}
    </>
  );
};

export default AddCredentials;
