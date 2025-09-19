import catchAsync from "../../../utils/errors/catchAsync.js";
import mongoose from "mongoose";

export const getSalarySlipsByEmpId = catchAsync(async (req, res) => {
  const { empid } = req.params;

  if (!empid) {
    return res.status(400).json({
      success: false,
      message: "Employee empid is required.",
    });
  }

  try {
    const result = await mongoose.connection.collection("salaryslips").aggregate([
      {
        $match: { empid: empid },
      },
      {
        $lookup: {
          from: "employeedetails", // 👈 2nd collection ka naam
          localField: "empid",     // 👈 salaryslips.empid
          foreignField: "employment_details.empid", // 👈 employeedetails.employment_details.empid
          as: "employee_info",     // 👈 Merged data yaha aayega
        },
      },
      {
        $unwind: {
          path: "$employee_info",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]).toArray();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching salary slips with employee info:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching salary slips.",
    });
  }
});
