import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { updating_srflutter } from '../../../controllers/development/srFlutterDev/updatesrflutter.js';
import { srflutter_bulkUpload } from '../../../controllers/development/srFlutterDev/bulkupload.controller.js';
import { uploadCandidateDataSrFLutter } from '../../../controllers/development/srFlutterDev/uploadCandidate.controller.js';
import { listing_new_srflutter } from '../../../controllers/development/srFlutterDev/srflutter.controller.js';
import { edit_srflutter } from '../../../controllers/development/srFlutterDev/edit.controller.js';
import { downloadCSVSrFlutter } from '../../../controllers/development/srFlutterDev/generatecsv.js';

const srFlutterRouter = Router();

srFlutterRouter.post(
  '/list',
  AuthMiddleware,
  listing_new_srflutter
);

srFlutterRouter.post('/update/:_id', AuthMiddleware, updating_srflutter);

srFlutterRouter.post('/edit/:_id', AuthMiddleware, edit_srflutter);

srFlutterRouter.post('/bulk-upload', AuthMiddleware, srflutter_bulkUpload);

srFlutterRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataSrFLutter)

srFlutterRouter.get('/download-csv', AuthMiddleware, downloadCSVSrFlutter)

export default srFlutterRouter;
