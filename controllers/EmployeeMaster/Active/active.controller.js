import employeesPersonalDetailsModel from "../../../database/schema/masters/EmployeePersonalDetails.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

// 1. Personal Details (CREATE)
export const uploadEmployeePesonalDetailsDataAction = catchAsync(async (req, res) => {
  let data = { ...req.body };

  // Check uniqueness of personal email
  const existingPersonalEmail = await employeesPersonalDetailsModel.findOne({
    email_id: data.email_id,
  });
  if (existingPersonalEmail) {
    return res.status(400).json({
      status: false,
      message: "Personal email already exists.",
    });
  }

  const savedApplication = await employeesPersonalDetailsModel.create(data);
  return res.status(201).json({
    status: true,
    data: savedApplication,
    message: "Employee personal details saved successfully!",
  });
});

// 2. Employment Details (UPDATE)
export const uploadEmploymentDetailsDataAction = catchAsync(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ status: false, message: "Employee ID is required." });
  }

  let { employment_details } = req.body;

  // Parse employment_details JSON string before use
  try {
    employment_details = typeof employment_details === "string" ? JSON.parse(employment_details) : employment_details;
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Invalid employment_details JSON format.",
    });
  }

  // Uniqueness checks excluding current document
  if (employment_details) {
    const { official_email, empid } = employment_details;

    if (official_email) {
      const existingOfficialEmail = await employeesPersonalDetailsModel.findOne({
        "employment_details.official_email": official_email,
        _id: { $ne: id },
      });
      if (existingOfficialEmail) {
        return res.status(400).json({
          status: false,
          message: "Official email already exists.",
        });
      }
    }

    if (empid) {
      const existingEmpId = await employeesPersonalDetailsModel.findOne({
        "employment_details.empid": empid,
        _id: { $ne: id },
      });
      if (existingEmpId) {
        return res.status(400).json({
          status: false,
          message: "Employee ID already exists.",
        });
      }
    }
  }

  // Attach uploaded files to employment_details
  const files = req.files || {};

  if (files.offer_letter?.[0]) {
    employment_details.offer_letter = files.offer_letter[0].filename;
  }
  if (files.relieving_letter?.[0]) {
    employment_details.relieving_letter = files.relieving_letter[0].filename;
  }
  if (files.termination_letter?.[0]) {
    employment_details.termination_letter = files.termination_letter[0].filename;
  }
  if (files.internship_certificate?.[0]) {
    employment_details.internship_certificate = files.internship_certificate[0].filename;
  }
  if (files.experience_letter?.[0]) {
    employment_details.experience_letter = files.experience_letter[0].filename;
  }
  if (files.salary_slip?.[0]) {
    employment_details.salary_slip = files.salary_slip[0].filename;
  }

  // Update document
  const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
    id,
    { $set: { employment_details } },
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

// 3. Bank Details (UPDATE)
export const uploadEmployeeBankDetailsDataAction = catchAsync(async (req, res) => {
  const { id } = req.query;
  let { bank_details } = req.body;

  if (!id) {
    return res.status(400).json({ status: false, message: "Employee ID is required." });
  }
  if (!bank_details) {
    return res.status(400).json({ status: false, message: "bank_details is required." });
  }

  if (typeof bank_details === "string") {
    try {
      bank_details = JSON.parse(bank_details);
      console.log("Parsed Bank Details:", bank_details);
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Invalid format for bank_details. It should be a JSON string.",
      });
    }
  }

  const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
    id,
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

// 4. Leave Policy Details (UPDATE)
export const uploadEmployeeLeavePolicyDetailsDataAction = catchAsync(async (req, res) => {
  const { id } = req.query;
  let { leave_balance_details } = req.body;

  if (!id) {
    return res.status(400).json({ status: false, message: "Employee ID is required." });
  }
  if (!leave_balance_details) {
    return res.status(400).json({ status: false, message: "leave_balance_details is required." });
  }

  if (typeof leave_balance_details === "string") {
    try {
      leave_balance_details = JSON.parse(leave_balance_details);
      console.log("Parsed Leave Balance Details:", leave_balance_details);
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Invalid format for leave_balance_details. It should be a JSON string.",
      });
    }
  }

  const updatedApplication = await employeesPersonalDetailsModel.findByIdAndUpdate(
    id,
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




