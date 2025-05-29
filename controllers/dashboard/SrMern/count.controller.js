import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const stats_count = catchAsync(async (req, res) => {
  const { stack = "sr_mern" } = req.body;

  const result = await applicationModel.aggregate([
    { $match: { stack } },
    {
      $facet: {
        interviewSendForApproval: [
          {
            $match: {
              stage: "interview",
              "core_invoice_details.approval_status.sendForApproval.status": true
            }
          },
          { $count: "count" }
        ],
        interviewApproved: [
          {
            $match: {
              stage: "interview",
              "core_invoice_details.approval_status.approved.status": true
            }
          },
          { $count: "count" }
        ],
        interviewRejected: [
          {
            $match: {
              stage: "interview",
              "core_invoice_details.approval_status.rejected.status": true
            }
          },
          { $count: "count" }
        ],
        stageNew: [
          { $match: { stage: "new" } },
          { $count: "count" }
        ],
        stageShortlisted: [
          { $match: { stage: "shortlisted" } },
          { $count: "count" }
        ],
        assignmentSendForApproval: [
          {
            $match: {
              stage: "assignment",
              "core_invoice_details.approval_status.sendForApproval.status": true
            }
          },
          { $count: "count" }
        ],
        assignmentApproved: [
          {
            $match: {
              stage: "assignment",
              "core_invoice_details.approval_status.approved.status": true
            }
          },
          { $count: "count" }
        ],
        assignmentRejected: [
          {
            $match: {
              stage: "assignment",
              "core_invoice_details.approval_status.rejected.status": true
            }
          },
          { $count: "count" }
        ],
        bgvTrue: [
          { $match: { bgv: true } },
          { $count: "count" }
        ],
        offerLetterTrue: [
          { $match: { offer_letter: true } },
          { $count: "count" }
        ],
        stageRejected: [
          { $match: { stage: "rejected" } },
          { $count: "count" }
        ]
      }
    }
  ]);

  const format = (item) => (item[0]?.count || 0);
  const data = result[0];

  res.status(200).json({
    interviewSendForApproval: format(data.interviewSendForApproval),
    interviewApproved: format(data.interviewApproved),
    interviewRejected: format(data.interviewRejected),
    stageNew: format(data.stageNew),
    stageShortlisted: format(data.stageShortlisted),
    assignmentSendForApproval: format(data.assignmentSendForApproval),
    assignmentApproved: format(data.assignmentApproved),
    assignmentRejected: format(data.assignmentRejected),
    bgvTrue: format(data.bgvTrue),
    offerLetterTrue: format(data.offerLetterTrue),
    stageRejected: format(data.stageRejected),
  });
});
