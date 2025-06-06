import mongoose, { now, Schema } from 'mongoose';
import { type } from 'os';

const employeesSchema = new mongoose.Schema({
  full_name: {
    type: String,
    trim: true,
  },
  email_id: {
    type: String,
    trim: true,
    unique: true,
  },
  contact_no: {
    type: Number,
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
    required: true,
  },
  notice_period: {
    type: String,
    trim: true,
  },
  interview_assigned_to: {
    type: String,
    trim: true,
    default: 'none',
  },
  relevant_experience: {
    type: Number,
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
    trim: true,
  },
  stage: {
    type: String,
    default: 'new',
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  created_by: {
    type: mongoose.Schema.Types.String,
  },
  created_at: {
    type: Date,
  },
  updated_by: {
    type: mongoose.Schema.Types.String,
  },
  date_of_joining: {
    type: Date,
    default: null,
  },
  bgv: {
    type: Boolean,
    default: false,
  },
  offer_letter: {
    type: Boolean,
    default: false,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  stack: {
    type: String,
    required: true,
  },
  confirmation_letter: {
    type: Boolean,
    default: false
  },
  core_invoice_details: {
    approval_status: {
      tech_interview: {
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
      pi_interview: {
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
  },
});

const employeesModel = mongoose.model('employees', employeesSchema);
export default employeesModel;
