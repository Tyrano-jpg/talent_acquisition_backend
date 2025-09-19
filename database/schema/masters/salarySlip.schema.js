import mongoose, { Schema } from 'mongoose';

const salary_slipSchema = new mongoose.Schema({
  full_name: {
    type: String,
    trim: true,
  },
  empid: {
    type: String,
    trim: true,
  },
   designation: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  BankName: {
    type: String,
    trim: true,
  },
  accountnumber: {
    type: String,
    trim: true,
  },
  Branch: {
    type: String,
    trim: true,
  },
  doj: {
    type: String,
    trim: true,
  },
  TotalWorkingDays: {
    type: Number,
    trim: true,
    // required: true,
    // default: 'none',
  },
  lop: {
    type: String,
    trim: true,

  },
  paid_Days: {
    type: Number,
    trim: true,
  },
  pay_date: {
    type: String,
    trim: true,
  },
  Gross_salary: {
    type: Number,
    trim: true,
  },
  basic_salary: {
    type: Number,
    trim: true,
  },
  House_Rent_Allowance
    : {
    type: Number,
    trim: true,
  },
  other_earning: {
    type: Number,
    trim: true,
  },
  other_deduction: {
    type: Number,
    trim: true,
  },

  income_tax: {
    type: Number,
    trim: true,
  },
  Provident_Fund

    : {
    type: Number,
    trim: true,
  },
  Gross_earning: {
    type: Number,
    trim: true,
  },
  total_deduction: {
    type: Number,
    trim: true,
  },
  Total_Net_Payable: {
    type: Number,
    trim: true,
  },
  Amount_in_words: {
    type: String,
    trim: true,
  },
  special_Allowance: {
    type: Number,
    trim: true,
  },
  Professional_Tax: {
    type: Number,
    trim: true,
  },

  // Add createdAt for TTL
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30 * 6 // 6 months in seconds
  }

});

const employeesSalarySlip = mongoose.model('SalarySlip', salary_slipSchema);
export default employeesSalarySlip;
