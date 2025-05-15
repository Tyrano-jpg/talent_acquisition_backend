import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_new_srsofteng } from '../../../controllers/development/srSoftEng/srsofteng.controller.js';
import { updating_srsofteng } from '../../../controllers/development/srSoftEng/updatesrsofteng.js';
import { srsofteng_bulkUpload } from '../../../controllers/development/srSoftEng/bulkupload.controller.js';
import { uploadCandidateDataSrSoftEng } from '../../../controllers/development/srSoftEng/uploadCandidate.controller.js';

const srSoftEngRouter = Router();
console.log('oiwer9wer');

srSoftEngRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_srsofteng
);

srSoftEngRouter.post('/update/:_id', AuthMiddleware, updating_srsofteng);

srSoftEngRouter.post('/bulk-upload', AuthMiddleware, srsofteng_bulkUpload);

srSoftEngRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataSrSoftEng)

// jrSoftEngRouter.post('/update-status', AuthMiddleware, updateStatus)

export default srSoftEngRouter;
