import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const uploadCandidateDataHr = catchAsync(async (req, res) => {
    var data = { ...req.body };
  
    const resumeFile = req.files?.resume_file;
    let resume_file;
    
    if (resumeFile && resumeFile?.length > 0 && resumeFile?.[0]) {
      resume_file = resumeFile?.[0];
      data.resume_file = resume_file;
    }
  
    const savedApplication = await applicationModel.create(data);
  
    return res.status(201).json({
      status: true,
      data: savedApplication,
      message: "Application submitted! Will reach out soon!",
    });
  });