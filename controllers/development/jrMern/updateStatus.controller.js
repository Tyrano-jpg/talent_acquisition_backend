import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";

// Controller: updateApprovalStatus
export const updateStatus = async (req, res) => {
    try {
      const { status } = req.body; // This will be either "approved", "rejected", or "send for approval"
      const { id } = req.params;
  
      // Construct the update object
      const updateObject = {
        "core_invoice_details.approval_status.sendForApproval.status": status === "send for approval",
        "core_invoice_details.approval_status.approved.status": status === "approved",
        "core_invoice_details.approval_status.rejected.status": status === "rejected",
      };
  
      // Update the document
      const updatedApplication = await applicationModel.findByIdAndUpdate(
        id,
        { $set: updateObject },
        { new: true }
      );
  
      if (!updatedApplication) {
        return res.status(404).json({ message: "Application not found." });
      }
  
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: `Status updated to ${status}.`,
        data: updatedApplication,
      });
    } catch (error) {
      console.error("Error updating status:", error.message);
      res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Failed to update status.",
      });
    }
  };
  