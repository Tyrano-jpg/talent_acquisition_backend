import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const uploadCandidateDataSrMern = catchAsync(async (req, res) => {
  let data = { ...req.body };

  const resumeFile = req.files?.resume_file;
  if (resumeFile?.length > 0 && resumeFile[0]) {
    data.resume_file = resumeFile[0];
  }

  // Set created_by and created_at fields
  if (req.userDetails && req.userDetails._id) {
    data.created_by = req.userDetails._id;
    data.created_at = new Date();
  }

  const savedApplication = await applicationModel.create(data);

  return res.status(201).json({
    status: true,
    data: savedApplication,
    message: "Application submitted! Will reach out soon!",
  });
});
