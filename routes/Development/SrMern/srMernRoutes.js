import { Router } from 'express';
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from '../../../middlewares/verifyToken.js';
import RolesPermissions from '../../../middlewares/permission.js';
import { listing_new_srmern } from '../../../controllers/development/srMern/new.controller.js';
import { updating_srmern } from '../../../controllers/development/srMern/updatesrmern.js';
import { srmern_bulkUpload } from '../../../controllers/development/srMern/bulkupload.controller.js';
import { uploadCandidateDataSrMern } from '../../../controllers/development/srMern/uploadCandidate.controller.js';
import { updateStatus } from '../../../controllers/development/srMern/updateStatus.controller.js';
import { MulterFunction } from '../../../config/multer/multer.js';
import { edit_srmern } from '../../../controllers/development/srMern/edit.controller.js';
import { downloadCSVFormat } from '../../../controllers/development/srMern/generatecsv.js';

const srMernRouter = Router();

srMernRouter.post(
  '/list',
  AuthMiddleware,
  // RolesPermissions('user', 'add'),
  listing_new_srmern
);

srMernRouter.post('/update/:_id', AuthMiddleware, updating_srmern);

srMernRouter.post('/edit/:_id', AuthMiddleware, edit_srmern);

srMernRouter.post('/bulk-upload', AuthMiddleware, srmern_bulkUpload);

srMernRouter.post('/upload-candidate', MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataSrMern)

srMernRouter.get('/download-csv', AuthMiddleware, downloadCSVFormat)

export default srMernRouter;
