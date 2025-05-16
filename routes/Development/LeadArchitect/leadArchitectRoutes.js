import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { updating_leadarchitect } from '../../../controllers/development/leadArchitect/updateleadarchitect.js';
import { leadarchitect_bulkUpload } from '../../../controllers/development/leadArchitect/bulkupload.controller.js';
import { uploadCandidateDataLeadArchitect } from '../../../controllers/development/leadArchitect/uploadCandidate.Controller.js';
import { listing_newleadarchitect } from '../../../controllers/development/leadArchitect/leadarchitect.controller.js';
import { edit_leadarchitect } from '../../../controllers/development/leadArchitect/edit.controller.js';
const leadArchitectRouter = Router();
console.log('oiwer9wer');

leadArchitectRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_newleadarchitect
);

leadArchitectRouter.post('/update/:_id', AuthMiddleware, updating_leadarchitect);

leadArchitectRouter.post('/edit/:_id', AuthMiddleware, edit_leadarchitect);

leadArchitectRouter.post('/bulk-upload', AuthMiddleware, leadarchitect_bulkUpload);

leadArchitectRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataLeadArchitect)

// jrSoftEngRouter.post('/update-status', AuthMiddleware, updateStatus)

export default leadArchitectRouter;
