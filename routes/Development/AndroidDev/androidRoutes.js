import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_new_android } from '../../../controllers/development/androidDev/android.controller.js';
import { updating_android } from '../../../controllers/development/androidDev/updateandroid.js';
import { android_bulkUpload } from '../../../controllers/development/androidDev/bulkupload.controller.js';
import { uploadCandidateDataAndroid } from '../../../controllers/development/androidDev/uploadCandidate.controller.js';
import { edit_android } from '../../../controllers/development/androidDev/edit.controller.js';
const androidRouter = Router();
androidRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_android
);

androidRouter.post('/update/:_id', AuthMiddleware, updating_android);

androidRouter.post('/edit/:_id', AuthMiddleware, edit_android);

androidRouter.post('/bulk-upload', AuthMiddleware, android_bulkUpload);

androidRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataAndroid)

// jrSoftEngRouter.post('/update-status', AuthMiddleware, updateStatus)

export default androidRouter;
