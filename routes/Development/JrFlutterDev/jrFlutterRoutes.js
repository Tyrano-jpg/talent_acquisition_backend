import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { uploadCandidateDataJrFlutter } from '../../../controllers/development/jrFlutterDev/uploadCandidate.controller.js';
import { updating_jrflutter } from '../../../controllers/development/jrFlutterDev/updatejrflutter.js';
import { jrflutter_bulkUpload } from '../../../controllers/development/jrFlutterDev/bulkupload.controller.js';
import { listing_new_jrflutter } from '../../../controllers/development/jrFlutterDev/jrflutter.controller.js';
import { edit_jrflutter } from '../../../controllers/development/jrFlutterDev/edit.controller.js';
import { downloadCSVJrFlutter } from '../../../controllers/development/jrFlutterDev/generatecsv.js';

const jrFlutterRouter = Router();

jrFlutterRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_jrflutter
);

jrFlutterRouter.post('/update/:_id', AuthMiddleware, updating_jrflutter);

jrFlutterRouter.post('/edit/:_id', AuthMiddleware, edit_jrflutter);

jrFlutterRouter.post('/bulk-upload', AuthMiddleware, jrflutter_bulkUpload);

jrFlutterRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataJrFlutter)

jrFlutterRouter.get('/download-csv', AuthMiddleware, downloadCSVJrFlutter)

export default jrFlutterRouter;
