const UserCompanies = require("../models/userCompanies");
const UserCredentials = require("../models/userCredentials");
const UserBills = require("../models/bill");

const Index = async (req, res) => {
  res.json({ msg: "Works" });
};

const getUserCompanies = async (req, res) => {
  const user = req.user;
  try {
    const companies = await UserCompanies.find({ user }).select("company");
    res.status(200).json({ companies });
  } catch (err) {
    res.status(404).json({ msg: "No Companies found" });
  }
};

const userDetail = async (req, res) => {
  const { user } = req.params;
  if (user !== req.user) {
    res.status(403).json({ msg: "Invalid URL. please use a valid URL" });
  } else {
    try {
      const userDetail = await UserCredentials.find({ user: req.user });
      if (!userDetail) {
        res.status(404).json({ msg: "You did'nt add your credentials yet." });
        return;
      }
      res.status(200).json({ userDetail: userDetail[0] });
    } catch (err) {
      res.status(400).json({ msg: "an error occured. please try gain" });
    }
  }
};

const getCompanies = async (req, res) => {
  try {
    const companyName = await UserCompanies.find({ user: req.user }).select(
      "company"
    );
    res.status(200).json({ companyName });
  } catch (err) {
    res.status(400).json({ msg: "an error occured. please try again" });
  }
};

const userBills = async (req, res) => {
  const { page, billsPerPage } = req.query;
  const skipCount = (page - 1) * billsPerPage;
  const limitCount = page * billsPerPage;
  const user = req.user;
  try {
    const bills = await UserBills.find({ user })
      .sort("-createdAt")
      .select("company createdAt invoiceNo")
      .skip(skipCount)
      .limit(limitCount);
    res.status(200).json({ bills });
  } catch (err) {
    res.status(400).json({ msg: "an error occured. please try again" });
  }
};

const singleBill = async (req, res) => {
  const { _id } = req.params;
  const user = req.user;
  try {
    const bill = await UserBills.findOne({ _id, user });
    if (bill) {
      res.status(200).json({ bill });
      return;
    }
    res
      .status(403)
      .json({ msg: "Invalid url or you are not allowed to see this page" });
  } catch (err) {
    res.status(400).json({ msg: "an error occured. please try again" });
  }
};

const singleCompany = async (req, res) => {
  const user = req.user;
  const { companyName } = req.params;
  
  try {
    const singleCompany = await UserCompanies.findOne({
      user,
      "company.CompanyName": companyName,
    });    

    if (!singleCompany) {
      res
        .status(403)
        .json({ msg: "Invalid Url or You are not allowed to see this page" });
      return;
    }
    res.status(200).json({ singleCompany });
  } catch (err) {
    res.status(400).json({ msg: "an error occured. please try again" });
  }
};

const singleCompanyBills = async (req, res) => {
  const { companyName } = req.params;
  const { page, billsPerPage } = req.query;
  const skipCount = (page - 1) * billsPerPage;
  const limitCount = page * billsPerPage;
  const user = req.user;
  try {
    const bills = await UserBills.find({
      user,
      "company.CompanyName": companyName,
    })
      .sort("-createdAt")
      .select("company createdAt")
      .skip(skipCount)
      .limit(limitCount);
    res.status(200).json({ bills });
  } catch (err) {
    res.status(400).json({ msg: "an error occured. please try again" });
  }
};

module.exports = {
  Index,
  getUserCompanies,
  userDetail,
  getCompanies,
  userBills,
  singleBill,
  singleCompany,
  singleCompanyBills,
};
