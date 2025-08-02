const UserCredentials = require("../../models/userCredentials");
const UserCompany = require("../../models/userCompanies");
const Bill = require("../../models/bill");

const newBill = async (req, res) => {
  const { items } = req.body;
  const { company } = req.body;
  const { invoiceNo } = req.body;
  const totalNumbers = [];
  const total = () => {
    items.map((item) => totalNumbers.push(item.Total));
  };
  total();
  let TotalTaxableAmount = 0;
  totalNumbers.map((num) => (TotalTaxableAmount += num));
  const SGST = (2.5 / 100) * TotalTaxableAmount;
  const CGST = (2.5 / 100) * TotalTaxableAmount;
  const ToatalInvoiceAmount = TotalTaxableAmount + SGST + CGST;
  const user = req.user;
  const userCredential = await UserCredentials.findOne({ user });

  const data = {
    invoiceNo,
    user,
    userCredential,
    company,
    items,
    TotalTaxableAmount: Math.floor(TotalTaxableAmount),
    SGST: Math.floor(SGST),
    CGST: Math.floor(CGST),
    ToatalInvoiceAmount: Math.floor(ToatalInvoiceAmount),
  };
  try {
    await Bill.newBill(data);
    res.status(201).json({ msg: "bill added" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await UserCompany.find({ user: req.user }).select(
      "company.CompanyName"
    );
    res.status(200).json({ companies: companies.map((c) => c.company) });
  } catch (err) {
    res.status(400).json({ msg: "an error occured. please try again" });
  }
};

const companyDetails = async (req, res) => {
  const { companyName } = req.body;
  try {
    const company = await UserCompany.findOne({
      user: req.user,
      "company.CompanyName": companyName,
    }).select("company");
    if (!company) {
      res.status(404).json({ msg: "No companies found" });
      return;
    }
    res.status(200).json({ company });
  } catch (err) {
    res.status(400).json({ msg: "an error occured. please try again" });
  }
};

const deleteBill = async (req, res) => {
  const user = req.user;
  const { _id } = req.params;
  try {
    await Bill.findOneAndDelete({ user, _id }, { _id });
    res.status(200).json({ msg: "bill deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const invoiceNo = async (req, res) => {
  const user = req.user;

  try {
    const bill = await Bill.findOne({ user }).sort({ createdAt: -1 });
    let invoiceNo = 1;

    if (bill) {
      invoiceNo = bill.invoiceNo + 1;
    }
    res.status(200).json({ invoiceNo });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  newBill,
  getCompanies,
  companyDetails,
  deleteBill,
  invoiceNo,
};
