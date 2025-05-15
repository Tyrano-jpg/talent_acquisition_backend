import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { updating_aidev } from '../../../controllers/development/aiDev/updateaidev.controller.js';
import { listing_newaidev } from '../../../controllers/development/aiDev/aidev.controller.js';
const aiDevRouter = Router();
console.log('oiwer9wer');

aiDevRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_newaidev
);

aiDevRouter.post('/update/:_id', AuthMiddleware, updating_aidev);

aiDevRouter.post('/bulk-upload', AuthMiddleware, leadarchitect_bulkUpload);

aiDevRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataLeadArchitect)

// jrSoftEngRouter.post('/update-status', AuthMiddleware, updateStatus)

export default aiDevRouter;
