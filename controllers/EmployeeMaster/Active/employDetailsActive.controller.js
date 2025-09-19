import employeesPersonalDetailsModel from "../../../database/schema/masters/EmployeePersonalDetails.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const uploadEmploymentDetailsDataAction = catchAsync(async (req, res) => {
  let data = { ...req.body };
  console.log("This is check",req.body);
  const savedApplication = await employeesPersonalDetailsModel.create(data);
 console.log("savedApplication : ",savedApplication)
  return res.status(201).json({
    status: true,
    data: savedApplication,
    message: "Application submitted! Will reach out soon!",
  });
});
