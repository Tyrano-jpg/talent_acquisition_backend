import { Router } from 'express';
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { updating_jrmern } from '../../../controllers/development/jrMern/updatingjrmern.js';
import { jrmern_bulkUpload } from '../../../controllers/development/jrMern/bulkupload.controller.js';
import { uploadCandidateData, uploadCandidateDataJrMern } from '../../../controllers/development/jrMern/uploadCandidate.controller.js';
import { listing_new_jrmern } from '../../../controllers/development/jrMern/jrmern.controller.js';
import { edit_jrmern } from '../../../controllers/development/jrMern/edit.controller.js';
import { downloadCSVJrMern } from '../../../controllers/development/jrMern/generatecsv.js';

const jrMernRouter = Router();

jrMernRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_jrmern
);

jrMernRouter.post('/update/:_id', AuthMiddleware, updating_jrmern);

jrMernRouter.post('/edit/:_id', AuthMiddleware, edit_jrmern);

jrMernRouter.post('/bulk-upload', AuthMiddleware, jrmern_bulkUpload);

jrMernRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataJrMern)

jrMernRouter.get('/download-csv', AuthMiddleware, downloadCSVJrMern)

// jrMernRouter.post('/update-status', AuthMiddleware, updateStatus)

export default jrMernRouter;
