import employeesSalarySlip from "../../../database/schema/masters/salarySlip.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const generate_Salary_Slip = catchAsync(async (req, res) => {
  let data = { ...req.body };

  // Ensure pay_date is stored as a Date object for TTL to work
  if (data.pay_date) {
    data.pay_date = new Date(data.pay_date);
  }

  const savedApplication = await employeesSalarySlip.create(data);

  return res.status(201).json({
    status: true,
    data: savedApplication,
    message: "Salary slip generated successfully!",
  });
});
