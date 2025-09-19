import mongoose, { Schema } from 'mongoose';

const employeeDetailsSchema = new mongoose.Schema({
  full_name: {
    type: String,
    trim: true,
    required: true,
  },
  email_id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  contact_no: {
    type: Number,
    trim: true,
  },
  dob: {
    type: Date,
    trim: true,
  },
  blood_group: {
    type: String,
    trim: true,
  },
  marital_status: {
    type: String,
    trim: true,
  },
  relationship: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
  },
  guardian_name: {
    type: String,
    trim: true,
  },
  emergency_contact: {
    type: Number,
    trim: true,
  },
  current_address: {
    type: String,
    trim: true,
  },
  aadhar_number: {
    type: Number,
    trim: true,
  },
  pan_number: {
    type: String,
    trim: true,
  },
  uan_number: {
    type: Number,
    trim: true,
  },
  driving_licence: {
    type: String,
    trim: true,
  },
  permanent_address: {
    type: String,
    trim: true,
  },

  // employment Details schema
  employment_details: {
    type: {
      company_name: {
        type: String,
        trim: true,
        required: true,
      },
      official_email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
      },
      empid: {
        type: String,
        trim: true,
        unique: true,
        required: true,
      },
      doj: {
        type: String,
        trim: true,
        match: /^\d{4}-\d{2}-\d{2}$/, // optional: validate format
      },
      dol: {
        type: String,
        trim: true,
        match: /^\d{4}-\d{2}-\d{2}$/,
      },

      previous_doj: {
        type: Date,
        trim: true,
      },
      previous_dol: {
        type: Date,
        trim: true,
      },
      esi_number: {
        type: Number,
        trim: true,
      },
       current_ctc: {
    type: Number,
    trim: true,
  },
      pf_number: {
        type: String,
        trim: true,
      },
      designation: {
        type: String,
        trim: true,
      },
      employeetype: {
        type: String,
        trim: true,
        // default: 'none',
      },
      previous_company_name: {
        type: String,
        trim: true,
      },
      previous_designation: {
        type: String,
        trim: true,
      },
      ctc: {
        type: Number,
        trim: true,
      },
      offer_letter: {
        type: Schema.Types.Mixed,
      },
      relieving_letter: {
        type: Schema.Types.Mixed,
      },
      termination_letter: {
        type: Schema.Types.Mixed,
      },
      internship_certificate: {
        type: Schema.Types.Mixed,
      },
      experience_letter: {
        type: Schema.Types.Mixed,
      },
      salary_slip: {
        type: Schema.Types.Mixed,
      },
    },
    default: null
  },


  // bank details schema
  bank_details: {
    type: {
      BankName: {
        type: String,
        trim: true,
      },
      accountnumber: {
        type: String, // ✅ Fix here
        trim: true,
      },
      Branch: {
        type: String,
        trim: true,
      },
      BankHolderName: {
        type: String,
        trim: true,
      },
      IFSC: {
        type: String,
        trim: true,
      },
    },
    default: null
  },

  // Leave Policy Schema
  leave_balance_details: {
    type: {
      leave_policy: {
        type: String,
        trim: true,
      },
      leave_balance: {
        type: String,
        trim: true,
      },
    },
    default: null
  },

});

const employeesPersonalDetailsModel = mongoose.model('employeeDetails', employeeDetailsSchema);
export default employeesPersonalDetailsModel;
