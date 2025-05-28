import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from "../../../utils/errors/catchAsync.js";

export const edit_srflutter = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const updateFields = req.body;

  console.log("Editing ID:", _id);
  console.log("New Data:", updateFields);

  const existingDoc = await applicationModel.findById(_id);
  if (!existingDoc) {
    return res.status(404).json({
      statusCode: 404,
      status: false,
      message: "Candidate not found",
    });
  }

  // Update timestamp and updated_by using user_name instead of _id
  updateFields.updated_at = new Date();
  if (req.userDetails?.user_name) {
    updateFields.updated_by = req.userDetails.user_name; // Store username here
  }

  const updatedDoc = await applicationModel.findByIdAndUpdate(
    _id,
    { $set: updateFields },
    { new: true }
  );

  if (!updatedDoc) {
    return res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Failed to update candidate details",
    });
  }

  return res.status(200).json({
    statusCode: 200,
    status: "success",
    message: "Candidate details updated successfully",
    data: updatedDoc,
  });
});
