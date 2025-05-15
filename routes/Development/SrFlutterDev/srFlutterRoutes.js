import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { updating_srflutter } from '../../../controllers/development/srFlutterDev/updatesrflutter.js';
import { srflutter_bulkUpload } from '../../../controllers/development/srFlutterDev/bulkupload.controller.js';
import { uploadCandidateDataSrFLutter } from '../../../controllers/development/srFlutterDev/uploadCandidate.controller.js';
import { listing_new_srflutter } from '../../../controllers/development/srFlutterDev/srflutter.controller.js';

const srFlutterRouter = Router();
console.log('oiwer9wer');

srFlutterRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_srflutter
);

srFlutterRouter.post('/update/:_id', AuthMiddleware, updating_srflutter);

srFlutterRouter.post('/bulk-upload', AuthMiddleware, srflutter_bulkUpload);

srFlutterRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataSrFLutter)

// jrSoftEngRouter.post('/update-status', AuthMiddleware, updateStatus)

export default srFlutterRouter;
