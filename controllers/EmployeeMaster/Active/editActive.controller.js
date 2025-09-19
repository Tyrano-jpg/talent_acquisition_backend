import employeesPersonalDetailsModel from "../../../database/schema/masters/EmployeePersonalDetails.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

// UPDATE: Personal Details
export const editEmployeePersonalDetailsAction = catchAsync(async (req, res) => {
  const { _id } = req.params;
  // console.log(_id,"this is id");
  const updatedData = req.body;
  // console.log(updatedData,"this is updatedData");

  if (!_id) {
    return res.status(400).json({ status: false, message: "Employee _ID is required." });
  }

  // Check uniqueness of personal email if it's being updated
  if (updatedData.email_id) {
    const existingEmail = await employeesPersonalDetailsModel.findOne({
      email_id: updatedData.email_id,
      _id: { $ne: _id },
    });
    // console.log(existingEmail,"this is existing email");
    if (existingEmail) {
      return res.status(400).json({
        status: false,
        message: "Personal email  already exists.",
      });
    }
  }

  const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
    _id,
    { $set: updatedData },
    { new: true }
  );

  if (!updatedApplication) {
    return res.status(404).json({ status: false, message: "Employee not found." });
  }

  return res.status(200).json({
    status: true,
    data: updatedApplication,
    message: "Employee personal details updated successfully!",
  });
});

// UPDATE: Employment Details
export const editEmploymentDetailsDataAction = catchAsync(async (req, res) => {
  const { _id } = req.params;
  let { employment_details } = req.body;

  if (!_id || !employment_details) {
    return res.status(400).json({
      status: false,
      message: "Employee _id and employment_details are required.",
    });
  }

  // Parse JSON if string
  if (typeof employment_details === "string") {
    try {
      employment_details = JSON.parse(employment_details);
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Invalid format for employment_details. It should be JSON.",
      });
    }
  }

  // If certificate uploaded, add path/url
  if (req.file) {
    employment_details.certificate = req.file.path;
  }

  // Check uniqueness for official_email
  if (employment_details.official_email) {
    const existingOfficialEmail = await employeesPersonalDetailsModel.findOne({
      "employment_details.official_email": employment_details.official_email,
      _id: { $ne: _id },
    });
    if (existingOfficialEmail) {
      return res.status(400).json({
        status: false,
        message: "Official email already exists.",
      });
    }
  }

  // Check uniqueness for empid
  if (employment_details.empid) {
    const existingEmpId = await employeesPersonalDetailsModel.findOne({
      "employment_details.empid": employment_details.empid,
      _id: { $ne: _id },
    });
    if (existingEmpId) {
      return res.status(400).json({
        status: false,
        message: "Employee ID already exists.",
      });
    }
  }

  // Build update fields dynamically
  const updateFields = {};
  for (let key in employment_details) {
    updateFields[`employment_details.${key}`] = employment_details[key];
  }

  // const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
  //   _id,
  //   { $set: updateFields },
  //   { new: true }
  // );
// ✅ New
// const updateFields = {};

// merge normal fields
for (let key in employment_details) {
  updateFields[`employment_details.${key}`] = employment_details[key];
}

// merge files (if uploaded)
if (req.files) {
  if (req.files.offer_letter) {
    updateFields["employment_details.offer_letter"] = req.files.offer_letter[0].path;
  }
  if (req.files.relieving_letter) {
    updateFields["employment_details.relieving_letter"] = req.files.relieving_letter[0].path;
  }
  if (req.files.termination_letter) {
    updateFields["employment_details.termination_letter"] = req.files.termination_letter[0].path;
  }
  if (req.files.internship_certificate) {
    updateFields["employment_details.internship_certificate"] = req.files.internship_certificate[0].path;
  }
  if (req.files.experience_letter) {
    updateFields["employment_details.experience_letter"] = req.files.experience_letter[0].path;
  }
  if (req.files.salary_slip) {
    updateFields["employment_details.salary_slip"] = req.files.salary_slip[0].path;
  }
}

const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
  _id,
  { $set: updateFields },
  { new: true }
);

  if (!updatedApplication) {
    return res.status(404).json({ status: false, message: "Employee not found." });
  }

  return res.status(200).json({
    status: true,
    data: updatedApplication,
    message: "Employment details updated successfully!",
  });
});


// UPDATE: Bank Details
export const editEmployeeBankDetailsDataAction = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const { bank_details } = req.body;

  if (!_id || !bank_details) {
    return res.status(400).json({
      status: false,
      message: "Employee _id and bank_details are required.",
    });
  }

  const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
    _id,
    { $set: { bank_details } },
    { new: true }
  );

  if (!updatedApplication) {
    return res.status(404).json({ status: false, message: "Employee not found." });
  }

  return res.status(200).json({
    status: true,
    data: updatedApplication,
    message: "Bank details updated successfully!",
  });
});

// UPDATE: Leave Policy Details
export const editEmployeeLeavePolicyDetailsDataAction = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const { leave_balance_details } = req.body;

  if (!_id || !leave_balance_details) {
    return res.status(400).json({ status: false, message: "Employee _ID and leave_balance_details is required." });
  }

  const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
    _id,
    { $set: { leave_balance_details } },
    { new: true }
  );

  if (!updatedApplication) {
    return res.status(404).json({ status: false, message: "Employee not found." });
  }

  return res.status(200).json({
    status: true,
    data: updatedApplication,
    message: "Leave policy details updated successfully!",
  });
});
