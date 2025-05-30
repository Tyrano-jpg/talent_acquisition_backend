import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const offer_letter_controller = catchAsync(async (req, res) => {
  const applications = await applicationModel.find({ offer_letter: true });

  res.status(200).json({
    success: true,
    count: applications.length,
    data: applications,
  });
});
