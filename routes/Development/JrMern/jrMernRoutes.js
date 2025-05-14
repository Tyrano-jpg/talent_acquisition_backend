import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { updating_jrmern } from '../../../controllers/development/jrMern/updatingjrmern.js';
import { jrmern_bulkUpload } from '../../../controllers/development/jrMern/bulkupload.controller.js';
import { uploadCandidateData } from '../../../controllers/development/jrMern/uploadCandidate.controller.js';
import { updateStatus } from '../../../controllers/development/jrMern/updateStatus.controller.js';
import { listing_new_jrmern } from '../../../controllers/development/jrMern/jrmern.controller.js';

const jrMernRouter = Router();
console.log('oiwer9wer');

jrMernRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_jrmern
);

jrMernRouter.post('/update/:_id', AuthMiddleware, updating_jrmern);

jrMernRouter.post('/bulk-upload', AuthMiddleware, jrmern_bulkUpload);

jrMernRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateData)

jrMernRouter.post('/update-status', AuthMiddleware, updateStatus)

export default jrMernRouter;
