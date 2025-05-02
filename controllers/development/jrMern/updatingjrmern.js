import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";

import catchAsync from '../../../utils/errors/catchAsync.js';


export const updating_jrmern = catchAsync(async (req, res, next) => {
    const { id } = req.params; 
  const { stage } = req.body; 

  if (!stage) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: 'Stage value is required',
    });
  }

  const updatedModel = await applicationModel.findByIdAndUpdate(
    id,
    { stage },
    { new: true } // return the updated document
  );

  if (!updatedModel) {
    return res.status(404).json({
      statusCode: 404,
      status: false,
      message: 'Update Unsuccessfull',
    });
  }

  return res.status(200).json({
    statusCode: 200,
    status: 'success',
    data: updatedModel,
    message: 'Stage updated successfully',
  });
});
  