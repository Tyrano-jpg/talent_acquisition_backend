import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const updating_jrflutter = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const { stage, core_invoice_details } = req.body;

  console.log("ID passed:", _id);
  console.log("Stage value:", stage);
  console.log("Approval Status:", core_invoice_details);

  if (!stage) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: "Stage value is required",
    });
  }

  // ✅ Find the existing document
  const existingModel = await applicationModel.findById(_id);
  console.log("Existing document:", existingModel);

  if (!existingModel) {
    return res.status(404).json({
      statusCode: 404,
      status: false,
      message: "Document not found",
    });
  }

  // ✅ Update only the status that is received
  const updateData = {
    $set: {
      stage,
    },
  };

  // If approval status is sent, update only the fields that are provided
  if (core_invoice_details?.approval_status) {
    const { sendForApproval, approved, rejected } = core_invoice_details.approval_status;

    if (sendForApproval?.status !== undefined) {
      updateData.$set["core_invoice_details.approval_status.sendForApproval.status"] = sendForApproval.status;
    } else {
      // ✅ Preserve existing state if not explicitly updated
      updateData.$set["core_invoice_details.approval_status.sendForApproval.status"] = existingModel.core_invoice_details.approval_status.sendForApproval.status;
    }

    if (approved?.status !== undefined) {
      updateData.$set["core_invoice_details.approval_status.approved.status"] = approved.status;
    } else {
      updateData.$set["core_invoice_details.approval_status.approved.status"] = existingModel.core_invoice_details.approval_status.approved.status;
    }

    if (rejected?.status !== undefined) {
      updateData.$set["core_invoice_details.approval_status.rejected.status"] = rejected.status;
    } else {
      updateData.$set["core_invoice_details.approval_status.rejected.status"] = existingModel.core_invoice_details.approval_status.rejected.status;
    }
  }

  console.log("Update Data:", updateData);

  // ✅ Perform the update
  const updatedModel = await applicationModel.findOneAndUpdate(
    { _id },
    updateData,
    { new: true }
  );

  console.log("Updated document:", updatedModel);

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
    message: "Stage and approval status updated successfully",
  });
});
