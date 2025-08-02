const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    invoiceNo: { type: Number, required: true },
    user: { type: String, required: true },
    userCredential: {
      CompanyName: String,
      PhoneNo: String,
      GstNo: String,
      PanNo: String,
      Address: String,
      BankName: String,
      Branch: String,
      IFSC_code: String,
      AccNo: String,
    },
    company: {
      CompanyName: String,
      GstNo: String,
      PhoneNo: String,
      Address: String,
    },
    items: [
      {
        no: Number,
        product: String,
        HSN: String,
        UOM: String,
        qty: Number,
        RatePerEach: Number,
        Total: Number,
      },
    ],
    TotalTaxableAmount: Number,
    SGST: Number,
    CGST: Number,
    ToatalInvoiceAmount: Number,
  },
  { timestamps: true }
);

billSchema.statics.newBill = async function (data) {
  try {
    const newBill = new this(data);
    await newBill.save();
  } catch (err) {
    throw new Error(err);
  }
};

const bill = mongoose.model("bills", billSchema);
module.exports = bill;
