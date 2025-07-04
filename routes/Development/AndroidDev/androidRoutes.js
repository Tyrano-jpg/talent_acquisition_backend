import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_new_android } from '../../../controllers/development/androidDev/android.controller.js';
import { updating_android } from '../../../controllers/development/androidDev/updateandroid.js';
import { android_bulkUpload } from '../../../controllers/development/androidDev/bulkupload.controller.js';
import { uploadCandidateDataAndroid } from '../../../controllers/development/androidDev/uploadCandidate.controller.js';
import { edit_android } from '../../../controllers/development/androidDev/edit.controller.js';
import { downloadCSVAndroid } from '../../../controllers/development/androidDev/generatecsv.js';
import { generateAndSendPDFAndroid } from '../../../controllers/development/androidDev/offerLetter.controller.js';
const androidRouter = Router();
androidRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_android
);

androidRouter.post('send-letter', AuthMiddleware, generateAndSendPDFAndroid)

androidRouter.post('/update/:_id', AuthMiddleware, updating_android);

androidRouter.post('/edit/:_id', AuthMiddleware, edit_android);

androidRouter.post('/bulk-upload', AuthMiddleware, android_bulkUpload);

androidRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataAndroid)

androidRouter.get('/download-csv', AuthMiddleware, downloadCSVAndroid)

export default androidRouter;
