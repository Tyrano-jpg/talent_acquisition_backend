import mongoose, { Schema } from "mongoose";

const applicationSchema = new mongoose.Schema({
  // sr_no: {
  //   type: Number,
  //   // unique: true,
  // },
  full_name: {
    type: String,
    // required: [true, "Name is required."],
    trim: true,
  },
  email_id: {
    type: String,
    // required: [true, "Email is required."],
    trim: true,
    unique: true,
  },
  contact_no: {
    type: Number,
    // required: [true, "Phone Number is required."],
    trim: true,
    // unique: true,
  },
  current_location: {
    type: String,
    trim: true,
  },
  current_company: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    trim: true,
  },
  key_skill: {
    type: [String],
    trim: true,
  },
  notice_period: {
    type: String,
    trim: true,
  },
  relevant_experience: {
    type: String,
    trim: true,
  },
  current_ctc: {
    type: Number,
    trim: true,
  },
  expected_ctc: {
    type: Number,
    trim: true,
  },
  joining_preference: {
    type: String,
    trim: true,
  },
  source: {
    type: String,
    trim: true,
  },
  resume_file: {
    type: Schema.Types.Mixed,
  },
  portfolio_link: {
    type: String,
    trim: true,
  },
  applied_date: {
    type: Date,
    default: Date.now,
    trim: true
  },
  stage: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created_at: {
    type: Date
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
  },
  updated_at: {
    type: Date
  },
  stack: {
    type: String,
    // required: true,
  },
    core_invoice_details: {
    approval_status: {
      sendForApproval: {
        status: { type: Boolean, default: true },
      },
      approved: {
        status: { type: Boolean, default: false },
      },
      rejected: {
        status: { type: Boolean, default: false },
      },
    },
  },
});

const applicationModel = mongoose.model("application", applicationSchema);
export default applicationModel;
