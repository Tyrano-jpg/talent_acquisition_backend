import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const updating_srflutter = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const { stage, core_invoice_details, offer_letter, bgv } = req.body;

  console.log("ID passed:", _id);
  console.log("Stage value:", stage);
  console.log("Approval Status:", core_invoice_details);
  console.log("Offer Letter Flag:", offer_letter);
  console.log("BGV Flag:", bgv);

  const isValidUpdate =
    !!stage ||
    !!core_invoice_details ||
    offer_letter === "true" ||
    offer_letter === true ||
    bgv === "done" ||
    bgv === true;

  if (!isValidUpdate) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: "At least one field (stage, approval status, offer_letter, or bgv) must be provided",
    });
  }

  const existingModel = await applicationModel.findById(_id);
  if (!existingModel) {
    return res.status(404).json({
      statusCode: 404,
      status: false,
      message: "Document not found",
    });
  }

  // New check for 'joined' stage!
  if (stage === "joined") {
    const techApproved = existingModel.core_invoice_details?.approval_status?.tech_interview?.approved?.status;
    const piApproved = existingModel.core_invoice_details?.approval_status?.pi_interview?.approved?.status;
    const dateOfJoining = existingModel.date_of_joining;

    if (!techApproved) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: "Tech interview not approved. Cannot set stage to joined.",
      });
    }

    if (!piApproved) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: "PI interview not approved. Cannot set stage to joined.",
      });
    }

    if (!dateOfJoining) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: "Date of joining not set. Cannot set stage to joined.",
      });
    }
  }

  const updateData = { $set: {} };

  // Update stage
  if (stage) {
    updateData.$set.stage = stage;
  }

  // Handle interview status updates based on stage
  if ((stage === "assignment" || stage === "interview") && core_invoice_details?.approval_status) {
    const targetField =
      stage === "assignment"
        ? "core_invoice_details.approval_status.tech_interview"
        : "core_invoice_details.approval_status.pi_interview";

    // Reset all statuses to false
    updateData.$set[`${targetField}.sendForApproval.status`] = false;
    updateData.$set[`${targetField}.approved.status`] = false;
    updateData.$set[`${targetField}.rejected.status`] = false;

    const { sendForApproval, approved, rejected } = core_invoice_details.approval_status;

    if (sendForApproval?.status) {
      updateData.$set[`${targetField}.sendForApproval.status`] = true;
    } else if (approved?.status) {
      updateData.$set[`${targetField}.approved.status`] = true;
    } else if (rejected?.status) {
      updateData.$set[`${targetField}.rejected.status`] = true;
    }
  }

  // Handle offer_letter
  if (offer_letter === "true" || offer_letter === true) {
    updateData.$set.offer_letter = true;
  }

  // Handle bgv
  if (bgv === "done" || bgv === true) {
    updateData.$set.bgv = true;
  }

  // Set updated_by and updated_at
  updateData.$set.updated_at = new Date();
  if (req.userDetails?.user_name) {
    updateData.$set.updated_by = req.userDetails.user_name;
  }

  console.log("Update Data:", updateData);

  const updatedModel = await applicationModel.findOneAndUpdate(
    { _id },
    updateData,
    { new: true }
  );

  if (!updatedModel) {
    return res.status(404).json({
      statusCode: 404,
      status: false,
      message: "Update Unsuccessful",
    });
  }

  return res.status(200).json({
    statusCode: 200,
    status: "success",
    data: updatedModel,
    message: "Update successful",
  });
});
