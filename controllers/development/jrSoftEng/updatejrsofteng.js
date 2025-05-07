import applicationModel from "../../../database/schema/masters/CandidateApplication.schema.js";
import catchAsync from '../../../utils/errors/catchAsync.js';

//test
export const updating_jrsofteng = catchAsync(async (req, res, next) => {
  const { _id } = req.params;  
  const { stage } = req.body;

  console.log('ID passed:', _id);
  console.log('Stage value:', stage);

  if (!stage) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: 'Stage value is required',
    });
  }

  const existingModel = await applicationModel.findById(_id);
  console.log('Existing document:', existingModel);

  if (!existingModel) {
    return res.status(404).json({
      statusCode: 404,
      status: false,
      message: 'Document not found',
    });
  }

  const updatedModel = await applicationModel.findOneAndUpdate(
    { _id },  
    { stage },
    { new: true }  // Ensure that the updated document is returned
  );

  console.log('Updated document:', updatedModel);

  if (!updatedModel) {
    return res.status(404).json({
      statusCode: 404,
      status: false,
      message: 'Update Unsuccessful',
    });
  }

  return res.status(200).json({
    statusCode: 200,
    status: 'success',
    data: updatedModel,
    message: 'Stage updated successfully',
  });
});
