import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";


export const srmern_count = async (req, res) => {
  try {
    const { stack = "sr_mern" } = req.body; // default to 'sr_mern' if not provided

    const stackFilter = { stack };

    const [
      interviewSendForApproval,
      interviewApproved,
      interviewRejected,
      stageNew,
      stageShortlisted,
      assignmentSendForApproval,
      assignmentApproved,
      assignmentRejected,
      bgvTrue,
      offerLetterTrue,
      stageRejected
    ] = await Promise.all([
      // Interview + sendForApproval
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "interview",
        "core_invoice_details.approval_status.sendForApproval.status": true,
      }),

      // Interview + approved
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "interview",
        "core_invoice_details.approval_status.approved.status": true,
      }),

      // Interview + rejected
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "interview",
        "core_invoice_details.approval_status.rejected.status": true,
      }),

      // Stage = new
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "new",
      }),

      // Stage = shortlisted
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "shortlisted",
      }),

      // Assignment + sendForApproval
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "assignment",
        "core_invoice_details.approval_status.sendForApproval.status": true,
      }),

      // Assignment + approved
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "assignment",
        "core_invoice_details.approval_status.approved.status": true,
      }),

      // Assignment + rejected
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "assignment",
        "core_invoice_details.approval_status.rejected.status": true,
      }),

      // BGV
      applicationModel.countDocuments({
        ...stackFilter,
        bgv: true,
      }),

      // Offer Letter
      applicationModel.countDocuments({
        ...stackFilter,
        offer_letter: true,
      }),

      // Stage = rejected
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "rejected",
      }),
    ]);

    res.status(200).json({
      interviewSendForApproval,
      interviewApproved,
      interviewRejected,
      stageNew,
      stageShortlisted,
      assignmentSendForApproval,
      assignmentApproved,
      assignmentRejected,
      bgvTrue,
      offerLetterTrue,
      stageRejected
    });
  } catch (error) {
    console.error("Error fetching application stats:", error);
    res.status(500).json({ error: "Failed to fetch application stats" });
  }
};
