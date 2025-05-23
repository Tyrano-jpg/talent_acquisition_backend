import applicationModel from "../../database/schema/masters/CandidateApplication.schema.js";


export const getHiredApplications = async (req, res) => {
  try {
    const hiredApplications = await applicationModel.find({ stage: "hired" });

    res.status(200).json({
      success: true,
      count: hiredApplications.length,
      data: hiredApplications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hired applications",
      error: error.message
    });
  }
};
