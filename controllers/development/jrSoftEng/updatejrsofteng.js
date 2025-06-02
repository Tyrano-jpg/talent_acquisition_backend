import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const updating_jrsofteng = catchAsync(async (req, res, next) => {
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

  const updateData = { $set: {} };

  // Optional: update stage
  if (stage) {
    updateData.$set.stage = stage;

    // ✅ Auto-set approval flags when stage is updated
    updateData.$set["core_invoice_details.approval_status.sendForApproval.status"] = true;
    updateData.$set["core_invoice_details.approval_status.approved.status"] = false;
    updateData.$set["core_invoice_details.approval_status.rejected.status"] = false;
  }

  // Optional: update approval status
  if (core_invoice_details?.approval_status) {
    const { sendForApproval, approved, rejected } = core_invoice_details.approval_status;

    if (sendForApproval?.status !== undefined) {
      updateData.$set["core_invoice_details.approval_status.sendForApproval.status"] = sendForApproval.status;
    }

    if (approved?.status !== undefined) {
      updateData.$set["core_invoice_details.approval_status.approved.status"] = approved.status;
    }

    if (rejected?.status !== undefined) {
      updateData.$set["core_invoice_details.approval_status.rejected.status"] = rejected.status;
    }
  }

  // Optional: update offer_letter
  if (offer_letter === "true" || offer_letter === true) {
    updateData.$set.offer_letter = true;
  }

  // Optional: update bgv
  if (bgv === "done" || bgv === true) {
    updateData.$set.bgv = true;
  }

  // ✅ Set updated_by and updated_at
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
