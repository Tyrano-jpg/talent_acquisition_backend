import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const offer_letter_controller = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    applicationModel.find({ offer_letter: true }).skip(skip).limit(limit),
    applicationModel.countDocuments({ offer_letter: true }),
  ]);

  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    count: applications.length,
    data: applications,
  });
});
