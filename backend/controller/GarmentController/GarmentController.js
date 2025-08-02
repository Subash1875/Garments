const userCompanies = require("../../models/userCompanies");
const userCredentials = require("../../models/userCredentials");

const AddCredentials = async (req, res) => {
  const { data } = req.body;
  data.user = req.user;
  const userCheck = await userCredentials.findOne({ user: req.user });
  if (!userCheck) {
    try {
      await userCredentials.AddCredentials(data);
      res.status(201).json({ msg: "Credentials added" });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  } else {
    try {
      await userCredentials.UpdateCredentials(data);
      res.status(202).json({ msg: "Credentials updated" });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  }
};

const AddCompanies = async (req, res) => {
  const { info } = req.body;
  const company = info[0];
  const user = req.user;
  const data = {
    user,
    company,
  };
  try {
    const existCompany = await userCompanies.findOne({
      user,
      "company.CompanyName": company.CompanyName,
    });
    if (existCompany) {
      res.status(400).json({ msg: "you have already registered this company" });
      return;
    }
    await userCompanies.create(data);
    res.status(201).json({ msg: "Company added" });
  } catch (err) {
    res.status(400).json({ msg: "an error occured. please try again" });
  }
};

const EditCompany = async (req, res) => {
  const { data } = req.body;
  const user = req.user;
  const { company } = req.params;
  try {
    const updateFields = {};
    for (const key in data) {
      if (
        data.hasOwnProperty(key) &&
        data[key] !== "" &&
        data[key] !== undefined
      ) {
        updateFields[`company.${key}`] = data[key];
      }
    }
    const userCompany = await userCompanies.findOneAndUpdate(
      { "company.CompanyName": company, user },
      { $set: updateFields },
      { new: true, useFindAndModify: false }
    );
    res.status(202).json({ company: userCompany });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  AddCredentials,
  AddCompanies,
  EditCompany,
};
