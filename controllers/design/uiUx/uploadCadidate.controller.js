import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const uploadCandidateDataUiUx = catchAsync(async (req, res) => {
  let data = { ...req.body };

  const resumeFile = req.files?.resume_file;
  if (resumeFile?.length > 0 && resumeFile[0]) {
    data.resume_file = resumeFile[0];
  }

  // Set created_by as user_name instead of _id
  if (req.userDetails?.user_name) {
    data.created_by = req.userDetails.user_name;
    data.created_at = new Date();
  }

  const savedApplication = await applicationModel.create(data);

  return res.status(201).json({
    status: true,
    data: savedApplication,
    message: "Application submitted! Will reach out soon!",
  });
});
