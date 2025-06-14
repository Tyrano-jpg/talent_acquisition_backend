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
import { MulterFunction } from '../../../config/multer/multer.js';
import { edit_srmern } from '../../../controllers/development/srMern/edit.controller.js';
import { downloadCSVSrMern } from '../../../controllers/development/srMern/generatecsv.js';
import { generateAndSendPDFSrMern } from '../../../controllers/development/srMern/offerLetter.controller.js';
const srMernRouter = Router();

srMernRouter.post(
  '/list',
  AuthMiddleware,
  listing_new_srmern
);

srMernRouter.post('/send-letter', AuthMiddleware, generateAndSendPDFSrMern )

srMernRouter.post('/update/:_id', AuthMiddleware, updating_srmern);

srMernRouter.post('/edit/:_id', AuthMiddleware, edit_srmern);

srMernRouter.post('/bulk-upload', AuthMiddleware, srmern_bulkUpload);

srMernRouter.post('/upload-candidate',AuthMiddleware, MulterFunction(`public/upload/pdf`).fields([
  { name: 'resume_file' },
]), uploadCandidateDataSrMern)

srMernRouter.get('/download-csv', AuthMiddleware, downloadCSVSrMern)

export default srMernRouter;
