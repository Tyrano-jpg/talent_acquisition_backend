import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { listing_newios } from '../../../controllers/development/iosDev/ios.controller.js';
import { updating_ios } from '../../../controllers/development/iosDev/updateios.js';
import { ios_bulkUpload } from '../../../controllers/development/iosDev/bulkupload.controller.js';
import { uploadCandidateDataIOS } from '../../../controllers/development/iosDev/uploadCandidate.Controller.js';
import { edit_ios } from '../../../controllers/development/iosDev/edit.controller.js';
import { downloadCSVIos } from '../../../controllers/development/iosDev/generatecsv.js';
const iosRouter = Router();

iosRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_newios
);

iosRouter.post('/update/:_id', AuthMiddleware, updating_ios);

iosRouter.post('/edit/:_id', AuthMiddleware, edit_ios);

iosRouter.post('/bulk-upload', AuthMiddleware, ios_bulkUpload);

iosRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataIOS)

iosRouter.get('/download-csv', AuthMiddleware, downloadCSVIos)

export default iosRouter;
