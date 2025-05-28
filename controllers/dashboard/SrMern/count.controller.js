import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";


export const srmern_count = async (req, res) => {
  try {
    const stackFilter = { stack: "sr_mern" };

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
      offerLetterTrue
    ] = await Promise.all([
      // 1. Interview + sendForApproval = true
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "interview",
        "core_invoice_details.approval_status.sendForApproval.status": true,
      }),

      // 2. Interview + approved = true
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "interview",
        "core_invoice_details.approval_status.approved.status": true,
      }),

      // 3. Interview + rejected = true
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "interview",
        "core_invoice_details.approval_status.rejected.status": true,
      }),

      // 4. Stage = "new"
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "new",
      }),

      // 5. Stage = "shortlisted"
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "shortlisted",
      }),

      // 6. Assignment + sendForApproval = true
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "assignment",
        "core_invoice_details.approval_status.sendForApproval.status": true,
      }),

      // 7. Assignment + approved = true
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "assignment",
        "core_invoice_details.approval_status.approved.status": true,
      }),

      // 8. Assignment + rejected = true
      applicationModel.countDocuments({
        ...stackFilter,
        stage: "assignment",
        "core_invoice_details.approval_status.rejected.status": true,
      }),

      // 9. BGV true
      applicationModel.countDocuments({
        ...stackFilter,
        bgv: true,
      }),

      // 10. Offer Letter true
      applicationModel.countDocuments({
        ...stackFilter,
        offer_letter: true,
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
      offerLetterTrue
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch application stats" });
  }
};
