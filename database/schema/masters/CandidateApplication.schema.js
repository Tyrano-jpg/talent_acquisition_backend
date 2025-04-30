import mongoose, { Schema } from "mongoose";

const applicationSchema = new mongoose.Schema({
  sr_no: {
    type: Number,
    unique: true,
  },
  full_name: {
    type: String,
    // required: [true, "Name is required."],
    trim: true,
  },
  email_id: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    // unique: true,
  },
  contact_no: {
    type: Number,
    // required: [true, "Phone Number is required."],
    trim: true,
    // unique: true,
  },

  relevant_experience: {
    type: String,
    trim: true,
  },
  current_org: {
    type: String,
    trim: true
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
    required: true,
  },
  portfolio_link: {
    type: String,
    trim: true,
  },
  applied_date: {
    type: Date,
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
    required: true,
  },
});

const applicationModel = mongoose.model("application", applicationSchema);
export default applicationModel;
